import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useGameStore } from "../store/useGameStore";
import { useState, useEffect } from "react";
import bg from '../assets/img/background1.png';
import { equipmentData, timeConfig } from "../store/proceduresData";

export default function MissionEquipment() {
    const location = useLocation();
    const navigate = useNavigate();
    const player = useGameStore((state) => state.player);

    // ดึงข้อมูลที่ส่งมาจากหน้า SelectProcedure
    const stateData = location.state;
    const proc = stateData?.proc;
    const diffId = stateData?.diffId;

    const [selectedItems, setSelectedItems] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isChecked, setIsChecked] = useState(false); // added isChecked state
    const [score, setScore] = useState(0);

    // Get time from config (minutes to seconds), fallback to 120 (2 mins) if not found
    const initialTime = (proc && diffId && timeConfig[proc.id]?.[diffId]?.equipment)
        ? timeConfig[proc.id][diffId].equipment * 60
        : 120;

    // Timer State
    const [timeLeft, setTimeLeft] = useState(initialTime);

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({ type: 'error', title: '', message: '' });

    // Timer Effect
    useEffect(() => {
        if (!proc || isSubmitted || timeLeft <= 0) return;

        const timerId = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerId);
                    handleTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, isSubmitted, proc]);

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

    // ดึงรายการอุปกรณ์ตามหัตถการที่เลือก (ดึงจาก equipmentData)
    const currentEquipmentList = equipmentData[proc.id] || [];
    const totalCorrectNeeded = currentEquipmentList.filter(i => i.isCorrect !== false).length;

    const handleTimeUp = () => {
        setModalInfo({
            type: 'error',
            title: 'หมดเวลาแล้ว! ⏰',
            message: 'เวลาในการเตรียมอุปกรณ์หมดลงแล้ว ลองพยายามใหม่อีกครั้งนะความเร็วก็สำคัญ!'
        });
        setShowModal(true);
    };

    const toggleItem = (item) => {
        if (isSubmitted || timeLeft <= 0) return; // ล็อคไม่ให้แก้ถ้าส่งแล้วหรือหมดเวลา

        const isSelected = selectedItems.find((i) => i.id === item.id);
        if (isSelected) {
            setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const handleSubmit = () => {
        if (selectedItems.length === 0) return;

        let correctCount = 0;
        let hasError = false;

        const evaluatedItems = selectedItems.map((item) => {
            if (item.isCorrect !== false) {
                correctCount++;
            } else {
                hasError = true;
            }
            return { ...item, isVerified: true }; // ทำเครื่องหมายว่าไอเทมนี้ถูกตรวจแล้ว
        });

        setSelectedItems(evaluatedItems);

        // อัปเดตคะแนนและสถานะการตรวจทุกครั้งที่กดส่ง
        setScore(correctCount * 10);
        setIsChecked(true);

        const isAllCorrect = !hasError && correctCount === totalCorrectNeeded;

        if (isAllCorrect) {
            setIsSubmitted(true); // ล็อคหน้าจอ
            setModalInfo({
                type: 'success',
                title: '🎉 ยอดเยี่ยมมาก!',
                message: 'คุณเตรียมอุปกรณ์ได้ถูกต้องและครบถ้วน! พร้อมสำหรับภารกิจต่อไปแล้ว'
            });
            setShowModal(true);
        } else {
            // ตอบผิด ให้ลองใหม่ได้ ไม่ล็อคหน้าจอ
            setModalInfo({
                type: 'error',
                title: 'อ๊ะ! ยังไม่ถูกต้อง 😅',
                message: `มีอุปกรณ์ที่ถูกต้องแล้ว ${correctCount} ชิ้น ชิ้นที่ผิดจะถูกนำออกอัตโนมัติ ลองเลือกใหม่ดูนะ!`
            });
            setShowModal(true);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        if (modalInfo.type === 'success') {
            // ถ้ายอดเยี่ยมแล้ว ไปหน้าต่อไป
            navigate("/mission-sequence", { state: { proc, diffId } });
        } else if (timeLeft <= 0) {
            // ถ้าหมดเวลา ให้เริ่มใหม่
            setTimeLeft(initialTime);
            setSelectedItems([]);
            setIsChecked(false);
            setScore(0);
        } else {
            // ตอบผิด เมื่อปิด Modal ให้เคลียร์ชิ้นที่ผิดออกทันที
            if (isChecked) {
                setSelectedItems(selectedItems.filter((i) => i.isCorrect !== false));
                // ไม่ต้องเซ็ต setIsChecked(false) เพราะเราใช้ item.isVerified เป็นตัวแสดงผลแทนแล้ว
            }
        }
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
            {/* Modal Overlay */}
            {showModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-jiggle">
                        <div className="text-6xl mb-4">
                            {modalInfo.type === 'success' ? '⭐' : '🤔'}
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-800">{modalInfo.title}</h3>
                        <p className="text-gray-600 mb-6">{modalInfo.message}</p>

                        <button
                            onClick={handleModalClose}
                            className={`w-full py-3.5 rounded-xl font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95 ${modalInfo.type === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-[#FB8682] hover:bg-[#f4605b]'}`}
                        >
                            {modalInfo.type === 'success' ? 'ไปต่อ' : 'ลองใหม่'}
                        </button>
                    </div>
                </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>

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
                <div className={`bg-white rounded-[32px] shadow-xl w-full p-6 md:p-8 flex flex-col relative overflow-hidden border transition-colors duration-300 ${timeLeft <= 10 && !isSubmitted ? 'border-red-400 shadow-red-200/50' : 'border-blue-50'}`}>
                    
                    {/* Urgent Screen Flash Effect */}
                    {timeLeft <= 10 && !isSubmitted && (
                        <div className="absolute inset-0 pointer-events-none z-0 bg-red-500/5 animate-pulse rounded-[32px]"></div>
                    )}

                    {/* Header: Title and Timer */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-[#1e3a8a] mb-1">Mission 1 : เลือกอุปกรณ์ให้ครบ</h2>
                            <p className="text-gray-600 text-sm font-medium">เลือกอุปกรณ์ที่ต้องใช้ในหัตถการให้ครบถ้วน</p>
                        </div>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold border shadow-sm transition-all z-10 ${
                            timeLeft <= 10 && !isSubmitted
                                ? 'bg-red-500 text-white border-red-600 animate-timer-urgent scale-110'
                                : timeLeft <= 30 && !isSubmitted
                                    ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' 
                                    : 'bg-blue-50 text-[#1e3a8a] border-blue-100'
                        }`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                        </div>
                    </div>

                    {/* Columns Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 flex-1">

                        {/* Left Column: All Equipment */}
                        <div className="bg-[#f8fafc] rounded-2xl p-5 border border-blue-50 flex flex-col">
                            <h3 className="text-[#3b82f6] font-bold mb-4 text-lg">อุปกรณ์ทั้งหมด</h3>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar content-start">
                                {currentEquipmentList.map((item) => {
                                    const isSelected = selectedItems.some((i) => i.id === item.id);
                                    return (
                                        <div
                                            key={item.id}
                                            onClick={() => toggleItem(item)}
                                            className={`relative flex flex-col items-center justify-center p-4 rounded-2xl shadow-sm border cursor-pointer transition-all ${isSelected ? 'bg-blue-50 border-blue-400 scale-[0.98]' : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-md'}`}
                                        >
                                            {/* Checkbox badge */}
                                            <div className={`absolute top-2 right-2 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300'}`}>
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
                        <div className="bg-[#f8fafc] rounded-2xl p-5 border border-blue-50 flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-[#3b82f6] font-bold text-lg">อุปกรณ์ที่เลือก</h3>
                                {!isSubmitted && selectedItems.length > 0 && (
                                    <button
                                        onClick={() => {
                                            setSelectedItems([]);
                                            setIsChecked(false);
                                            setScore(0);
                                        }}
                                        className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-full border border-red-100 hover:bg-red-100 transition-colors"
                                    >
                                        เคลียร์ทั้งหมด 🗑️
                                    </button>
                                )}
                            </div>

                            <div className="flex-1 border-2 border-dashed border-blue-300 rounded-xl bg-white flex flex-col items-center justify-center p-4 min-h-[250px]">
                                <div className="w-full h-full bg-gray-50 rounded-xl border border-gray-200 p-4 shadow-inner relative flex flex-wrap content-start gap-3 overflow-y-auto">
                                    {selectedItems.length === 0 ? (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                            <span className="text-3xl mb-2">📥</span>
                                            <span className="font-medium text-sm">คลิกที่อุปกรณ์ด้านซ้ายเพื่อนำมาจัดเตรียม</span>
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
                                                    <div className="absolute -top-2 -right-2 text-xl filter drop-shadow-sm animate-pop-in">
                                                        {item.isCorrect !== false ? "✅" : "❌"}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 flex flex-col items-center gap-2">
                                <div className="bg-blue-50 text-[#3b82f6] px-8 py-2.5 rounded-full font-bold text-sm min-w-[150px] text-center border border-blue-100">
                                    {selectedItems.length} / {totalCorrectNeeded} ชิ้นที่ถูกเลือก
                                </div>
                                <div className="font-bold text-gray-700 mt-1 text-lg flex items-center justify-between w-full px-2">
                                    <span>คะแนน</span>
                                    <span className="text-3xl ml-2 text-green-600">{score}</span>
                                </div>

                                {/* Submit Button */}
                                {!isSubmitted ? (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={selectedItems.length === 0 || timeLeft <= 0}
                                        className={`mt-3 w-full py-3.5 rounded-xl font-bold shadow-md transform transition-all ${selectedItems.length > 0 && timeLeft > 0 ? 'bg-gradient-to-r from-[#4A90E2] to-[#3b82f6] text-white hover:shadow-lg hover:-translate-y-0.5' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                    >
                                        ส่งคำตอบเพื่อตรวจสอบ
                                    </button>
                                ) : (
                                    <button
                                        className="mt-3 w-full bg-gray-100 border border-gray-200 text-gray-500 py-3.5 rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-2"
                                        disabled
                                    >
                                        <span>✓</span> ผ่านภารกิจแล้ว
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