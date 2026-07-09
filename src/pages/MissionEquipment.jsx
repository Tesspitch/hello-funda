import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useGameStore } from "../store/useGameStore";
import { useState, useEffect, useRef, useMemo } from "react";
import bg from '../assets/img/background1.png';
import { equipmentData, timeConfig } from "../store/proceduresData";

export default function MissionEquipment() {
    const location = useLocation();
    const navigate = useNavigate();
    const player = useGameStore((state) => state.player);
    const updateMissionEquipmentResult = useGameStore((state) => state.updateMissionEquipmentResult);

    // ดึงข้อมูลที่ส่งมาจากหน้า SelectProcedure
    const stateData = location.state;
    const proc = stateData?.proc;
    const diffId = stateData?.diffId;

    const [selectedItems, setSelectedItems] = useState([]);
    const selectedItemsRef = useRef([]);
    useEffect(() => {
        selectedItemsRef.current = selectedItems;
    }, [selectedItems]);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isChecked, setIsChecked] = useState(false); // added isChecked state
    const [score, setScore] = useState(0);
    const [mistakesCount, setMistakesCount] = useState(0);

    const [isLoadingImages, setIsLoadingImages] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);

    // Get time from config (minutes to seconds), fallback to 120 (2 mins) if not found
    const initialTime = (proc && diffId && timeConfig[proc.id]?.[diffId]?.equipment)
        ? timeConfig[proc.id][diffId].equipment * 60
        : 120;

    // Timer State
    const [timeLeft, setTimeLeft] = useState(initialTime);

    // ดึงรายการอุปกรณ์ตามหัตถการที่เลือก โดยรวมอุปกรณ์ทั้งหมดจากทุกหัตถการเข้าด้วยกัน
    const { currentEquipmentList, totalCorrectNeeded } = useMemo(() => {
        if (!proc) return { currentEquipmentList: [], totalCorrectNeeded: 0 };
        
        const allEquipments = [];
        const seenNames = new Set();
        
        // 1. รวมอุปกรณ์ทั้งหมด (ไม่ให้ซ้ำชื่อ)
        Object.values(equipmentData).forEach(eqList => {
            eqList.forEach(eq => {
                if (!seenNames.has(eq.name)) {
                    seenNames.add(eq.name);
                    allEquipments.push({
                        name: eq.name,
                        img: eq.img,
                        icon: eq.icon
                    });
                }
            });
        });

        // 2. หาว่ามีชิ้นไหนบ้างที่ถูกต้องสำหรับหัตถการนี้
        const correctEquipmentsForProc = (equipmentData[proc.id] || [])
            .filter(e => e.isCorrect !== false)
            .map(e => e.name);

        // 3. กำหนด isCorrect ใหม่ และสร้าง id ใหม่
        const combinedEquipments = allEquipments.map((eq, index) => ({
            ...eq,
            id: index + 1,
            isCorrect: correctEquipmentsForProc.includes(eq.name)
        }));

        // 4. สุ่มลำดับ (Randomize)
        const shuffled = combinedEquipments.sort(() => Math.random() - 0.5);

        return {
            currentEquipmentList: shuffled,
            totalCorrectNeeded: correctEquipmentsForProc.length
        };
    }, [proc]);

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({ type: 'error', title: '', message: '' });

    // Image Preloading Effect
    useEffect(() => {
        if (!proc) return;

        if (!currentEquipmentList.length) {
            setIsLoadingImages(false);
            return;
        }

        let loadedCount = 0;
        const totalImages = currentEquipmentList.filter(item => item.img).length;

        if (totalImages === 0) {
            setIsLoadingImages(false);
            return;
        }

        const promises = currentEquipmentList
            .filter(item => item.img)
            .map(item => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = item.img;
                    img.onload = () => {
                        loadedCount++;
                        setLoadingProgress(Math.round((loadedCount / totalImages) * 100));
                        resolve();
                    };
                    img.onerror = () => {
                        loadedCount++;
                        setLoadingProgress(Math.round((loadedCount / totalImages) * 100));
                        resolve();
                    };
                });
            });

        Promise.all(promises).then(() => {
            setTimeout(() => {
                setIsLoadingImages(false);
            }, 400);
        });
    }, [proc]);

    // Timer Effect
    const endTimeRef = useRef(null);

    useEffect(() => {
        if (!proc || isSubmitted || timeLeft <= 0 || isLoadingImages) {
            // เคลียร์ค่า endTime ถ้าเวลาหมดหรือส่งคำตอบแล้ว
            if (isSubmitted || timeLeft <= 0) endTimeRef.current = null;
            return;
        }

        // ตั้งค่า endTime เมื่อเริ่มต้นจับเวลาเป็นครั้งแรก (อิงจากเวลาปัจจุบัน)
        if (!endTimeRef.current) {
            endTimeRef.current = Date.now() + timeLeft * 1000;
        }

        const timerId = setInterval(() => {
            const remaining = Math.round((endTimeRef.current - Date.now()) / 1000);
            
            if (remaining <= 0) {
                clearInterval(timerId);
                setTimeLeft(0);
                handleTimeUp();
            } else {
                setTimeLeft(remaining);
            }
        }, 500); // อัปเดตทุก 500ms เพื่อความแม่นยำและตอบสนองได้ดีขึ้นเมื่อสลับ tab

        return () => clearInterval(timerId);
    }, [isSubmitted, proc, isLoadingImages]);

    // Format time function
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    // ถ้าไม่มีข้อมูล (ผู้ใช้พิมพ์ URL เข้ามาตรงๆ) ให้เด้งกลับไปหน้าเลือกหัตถการ
    if (!proc) {
        return <Navigate to="/select" replace />;
    }

    const handleTimeUp = () => {
        let correctCount = 0;
        let wrongCount = 0;

        const currentSelected = selectedItemsRef.current;

        const evaluatedItems = currentSelected.map((item) => {
            if (item.isCorrect !== false) correctCount++;
            else wrongCount++;
            return { ...item, isVerified: true };
        });

        setSelectedItems(evaluatedItems);

        // คำนวณคะแนนเต็ม 40 (หักลบจำนวนที่เลือกผิด)
        let calculatedScore = totalCorrectNeeded > 0 ? Math.round(((correctCount - wrongCount) / totalCorrectNeeded) * 40) : 0;
        calculatedScore = Math.max(0, Math.min(40, calculatedScore));

        setScore(calculatedScore);
        setIsChecked(true);
        setIsSubmitted(true);
        
        const requiredEqNames = equipmentData[proc.id]?.filter(e => e.isCorrect !== false).map(e => e.name) || [];
        const missingEquipments = requiredEqNames.filter(reqName => !currentSelected.some(sel => sel.name === reqName));
        const extraEquipments = currentSelected.filter(sel => sel.isCorrect === false).map(e => e.name);

        if (updateMissionEquipmentResult) {
            updateMissionEquipmentResult(proc.id, diffId, calculatedScore, initialTime, missingEquipments, extraEquipments);
        }
        
        setModalInfo({
            type: 'timeout',
            title: 'หมดเวลาแล้ว!',
            message: 'เวลาในการเตรียมอุปกรณ์หมดลงแล้ว ระบบได้ทำการส่งคำตอบเท่าที่คุณเลือกไว้ ไปสู่ขั้นตอนถัดไปกันเลย'
        });
        setShowModal(true);
    };

    const toggleItem = (item) => {
        if (isSubmitted || timeLeft <= 0 || isLoadingImages) return; // ล็อคไม่ให้แก้ถ้าส่งแล้ว หมดเวลา หรือกำลังโหลดภาพ

        const isSelected = selectedItems.find((i) => i.id === item.id);
        if (isSelected) {
            setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const handleSubmit = () => {
        if (selectedItems.length === 0) return;

        setModalInfo({
            type: 'confirm',
            title: 'ยืนยันการส่งอุปกรณ์?',
            message: 'คุณต้องการยืนยันการจัดเตรียมอุปกรณ์ และไปยังขั้นตอนต่อไปหรือไม่?'
        });
        setShowModal(true);
    };

    const confirmSubmit = () => {
        let correctCount = 0;
        let wrongCount = 0;

        const evaluatedItems = selectedItems.map((item) => {
            if (item.isCorrect !== false) correctCount++;
            else wrongCount++;
            return { ...item, isVerified: true };
        });

        setSelectedItems(evaluatedItems);

        // คำนวณคะแนนเต็ม 40 (หักลบจำนวนที่เลือกผิด)
        let calculatedScore = totalCorrectNeeded > 0 ? Math.round(((correctCount - wrongCount) / totalCorrectNeeded) * 40) : 0;
        calculatedScore = Math.max(0, Math.min(40, calculatedScore));

        setScore(calculatedScore);
        setIsChecked(true);
        setIsSubmitted(true);

        const timeSpent = initialTime - timeLeft;
        
        const requiredEqNames = equipmentData[proc.id]?.filter(e => e.isCorrect !== false).map(e => e.name) || [];
        const missingEquipments = requiredEqNames.filter(reqName => !selectedItems.some(sel => sel.name === reqName));
        const extraEquipments = selectedItems.filter(sel => sel.isCorrect === false).map(e => e.name);

        if (updateMissionEquipmentResult) {
            updateMissionEquipmentResult(proc.id, diffId, calculatedScore, timeSpent, missingEquipments, extraEquipments);

            console.log("Mission Equipment Completed!", {
                userId: player?.id,
                procedureId: proc.id,
                equipmentScore: calculatedScore,
                timeSpent: timeSpent,
                status: "pass"
            });
        }

        setShowModal(false);
        navigate("/mission-sequence", { state: { proc, diffId }, replace: true });
    };

    const handleModalClose = () => {
        setShowModal(false);
        navigate("/mission-sequence", { state: { proc, diffId }, replace: true });
    };

    return (
        <div
            className="min-h-screen w-full relative flex flex-col font-sans"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Loading Overlay */}
            {isLoadingImages && (
                <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white/90 backdrop-blur-md px-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 mb-6 border-4 rounded-full animate-spin shadow-sm" style={{ borderColor: proc.bgLight, borderTopColor: proc.color }}></div>
                    <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: proc.color }}>กำลังเตรียมอุปกรณ์...</h2>
                    <p className="text-gray-500 mb-6 text-center text-sm md:text-base">รอสักครู่ ระบบกำลังจัดเตรียมภาพอุปกรณ์ให้ครบถ้วน</p>
                    <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                        <div
                            className="h-full transition-all duration-300"
                            style={{ width: `${loadingProgress}%`, backgroundColor: proc.color }}
                        ></div>
                    </div>
                    <p className="mt-2 text-sm font-bold" style={{ color: proc.color }}>{loadingProgress}%</p>
                </div>
            )}

            {/* Modal Overlay */}
            {showModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-jiggle">
                        <div className="flex justify-center mb-4">
                            {modalInfo.type === 'confirm' ? (
                                <span className="text-5xl drop-shadow-sm">❓</span>
                            ) : (
                                <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            )}
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-800">{modalInfo.title}</h3>
                        <p className="text-gray-600 mb-6">{modalInfo.message}</p>

                        {modalInfo.type === 'confirm' ? (
                            <div className="flex w-full gap-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-full py-3.5 rounded-xl font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    onClick={confirmSubmit}
                                    className="w-full py-3.5 rounded-xl font-bold text-white transition-all shadow-md hover:brightness-110"
                                    style={{ backgroundColor: proc.color }}
                                >
                                    ยืนยัน
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleModalClose}
                                className="w-full py-3.5 rounded-xl font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95 hover:brightness-110"
                                style={{ backgroundColor: proc.color }}
                            >
                                ไปต่อ
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Overlay */}
            {/* <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div> */}

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center pt-24 pb-10 px-4 w-full max-w-5xl mx-auto h-full">

                {/* Top Info Bar: Name, ID, Level */}
                <div className="w-full flex justify-between items-center bg-white/95 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm mb-4 border-2" style={{ borderColor: proc.color }}>
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-bold" style={{ color: proc.color }}>{proc.name}</span>
                        <span className="text-gray-500 font-medium hidden md:inline">({proc.nameTh})</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-end gap-2 md:gap-4">
                        <span className="px-3 py-1 rounded-full text-xs md:text-sm font-bold bg-gray-100 text-gray-700">
                            Level: {diffId === 'intermediate' ? 'Intermediate' : 'Advance'}
                        </span>
                        {player?.id && (
                            <span className="px-3 py-1 rounded-full text-xs md:text-sm font-bold bg-orange-100 text-orange-600">
                                ID: {player.id}
                            </span>
                        )}
                    </div>
                </div>

                {/* Main UI Frame (Matching the screenshot) */}
                <div className={`bg-white rounded-[32px] shadow-xl w-full p-6 md:p-8 flex flex-col relative overflow-hidden border transition-colors duration-300 ${timeLeft <= 10 && !isSubmitted ? 'border-red-400 shadow-red-200/50' : ''}`} style={{ borderColor: timeLeft <= 10 && !isSubmitted ? undefined : proc.bgLight }}>

                    {/* Urgent Screen Flash Effect */}
                    {timeLeft <= 10 && !isSubmitted && (
                        <div className="absolute inset-0 pointer-events-none z-0 bg-red-500/5 animate-pulse rounded-[32px]"></div>
                    )}

                    {/* Header: Title and Timer */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-1" style={{ color: proc.color }}>Mission 1 : เลือกอุปกรณ์ให้ครบ</h2>
                            <p className="text-gray-600 text-sm font-medium">เลือกอุปกรณ์ที่ต้องใช้ในหัตถการให้ครบถ้วน</p>
                        </div>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold border shadow-sm transition-all z-10 ${timeLeft <= 10 && !isSubmitted
                            ? 'bg-red-500 text-white border-red-600 animate-timer-urgent scale-110'
                            : timeLeft <= 30 && !isSubmitted
                                ? 'bg-red-50 text-red-600 border-red-200 animate-pulse'
                                : ''
                            }`}
                            style={timeLeft > 30 || isSubmitted ? { backgroundColor: proc.bgLight, color: proc.color, borderColor: proc.color } : {}}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                        </div>
                    </div>

                    {/* Columns Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 flex-1">

                        {/* Left Column: All Equipment */}
                        <div className="bg-[#f8fafc] rounded-2xl p-5 border flex flex-col" style={{ borderColor: proc.bgLight }}>
                            <h3 className="font-bold mb-4 text-lg" style={{ color: proc.color }}>อุปกรณ์ทั้งหมด</h3>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar content-start">
                                {currentEquipmentList.map((item) => {
                                    const isSelected = selectedItems.some((i) => i.id === item.id);
                                    return (
                                        <div
                                            key={item.id}
                                            onClick={() => toggleItem(item)}
                                            className={`relative flex flex-col items-center justify-center p-4 rounded-2xl shadow-sm border cursor-pointer transition-all ${isSelected ? 'scale-[0.98]' : 'bg-white border-gray-100 hover:shadow-md'}`}
                                            style={isSelected ? { backgroundColor: proc.bgLight, borderColor: proc.color } : {}}
                                            onMouseEnter={(e) => {
                                                if (!isSelected) e.currentTarget.style.borderColor = proc.color;
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isSelected) e.currentTarget.style.borderColor = '#f3f4f6'; // border-gray-100
                                            }}
                                        >
                                            {/* Checkbox badge */}
                                            <div className={`absolute top-2 right-2 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'text-white' : 'border-gray-300'}`}
                                                style={isSelected ? { borderColor: proc.color, backgroundColor: proc.color } : {}}
                                            >
                                                {isSelected && <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                                            </div>

                                            <div className="w-16 h-16 mb-3 flex items-center justify-center rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                                                {item.img ? (
                                                    <img src={item.img} alt={item.name} className="w-full h-full object-contain p-1" />
                                                ) : (
                                                    <span className="text-4xl">{item.icon}</span>
                                                )}
                                            </div>
                                            <span className="text-gray-700 font-bold text-xs text-center leading-tight line-clamp-2">{item.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right Column: Selected Equipment (Drag Drop Area) */}
                        <div className="bg-[#f8fafc] rounded-2xl p-5 border flex flex-col" style={{ borderColor: proc.bgLight }}>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg" style={{ color: proc.color }}>อุปกรณ์ที่เลือก</h3>
                                {!isSubmitted && selectedItems.length > 0 && (
                                    <button
                                        onClick={() => {
                                            setSelectedItems([]);
                                            setIsChecked(false);
                                            setScore(0);
                                        }}
                                        className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-full border border-red-100 hover:bg-red-100 transition-colors"
                                    >
                                        <span className="flex items-center gap-1">เคลียร์ทั้งหมด <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></span>
                                    </button>
                                )}
                            </div>

                            <div className="flex-1 border-2 border-dashed rounded-xl bg-white flex flex-col items-center justify-center p-4 min-h-[250px]" style={{ borderColor: proc.color }}>
                                <div className="w-full h-full bg-gray-50 rounded-xl border border-gray-200 p-4 shadow-inner relative flex flex-wrap content-start gap-3 overflow-y-auto">
                                    {selectedItems.length === 0 ? (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                            <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                            <span className="font-medium text-sm">คลิกที่อุปกรณ์เพื่อนำมาจัดเตรียม</span>
                                        </div>
                                    ) : (
                                        selectedItems.map((item) => (
                                            <div key={item.id} className="w-16 h-16 bg-white border border-gray-200 shadow-sm rounded-lg flex flex-col items-center justify-center relative animate-bounce-short overflow-hidden p-1">
                                                <span className="text-3xl w-full h-full flex items-center justify-center">
                                                    {item.img ? (
                                                        <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                                                    ) : (
                                                        item.icon
                                                    )}
                                                </span>
                                                {/* Verification Badge */}
                                                {(item.isVerified || isSubmitted) && (
                                                    <div className="absolute -top-1 -right-1 filter drop-shadow-sm animate-pop-in flex items-center justify-center">
                                                        {item.isCorrect !== false ? (
                                                            <svg className="w-5 h-5 text-green-500 bg-white rounded-full" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                        ) : (
                                                            <svg className="w-5 h-5 text-red-500 bg-white rounded-full" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 flex flex-col items-center gap-2">
                                <div className="px-8 py-2.5 rounded-full font-bold text-sm min-w-[150px] text-center border" style={{ backgroundColor: proc.bgLight, color: proc.color, borderColor: proc.color }}>
                                    {selectedItems.length} ชิ้นที่ถูกเลือก
                                </div>


                                {/* Submit Button */}
                                {!isSubmitted ? (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={selectedItems.length === 0 || timeLeft <= 0}
                                        className={`mt-3 w-full py-3.5 rounded-xl font-bold shadow-md transform transition-all ${selectedItems.length > 0 && timeLeft > 0 ? 'text-white hover:shadow-lg hover:-translate-y-0.5 hover:brightness-110' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                        style={selectedItems.length > 0 && timeLeft > 0 ? { backgroundColor: proc.color } : {}}
                                    >
                                        ส่งคำตอบ
                                    </button>
                                ) : (
                                    <button
                                        className="mt-3 w-full bg-gray-100 border border-gray-200 text-gray-500 py-3.5 rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-2"
                                        disabled
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> ผ่านภารกิจแล้ว
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Footer: Tip */}
                    <div className="flex justify-between items-end mt-2">
                        <div className="flex items-center gap-3 bg-[#f0fdf4] text-green-700 px-6 py-3 rounded-2xl border border-green-100 shadow-sm w-fit">

                            <span className="font-bold">Tip : เลือกให้ครบจะได้คะแนนเต็มนะ!</span>
                        </div>


                    </div>

                </div>

            </div>

            {/* Styles for scrollbar in this component */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
                @keyframes bounce-short {
                    0% { transform: scale(0.8); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
                .animate-bounce-short {
                    animation: bounce-short 0.3s ease-out forwards;
                }
            `}} />
        </div>
    );
}