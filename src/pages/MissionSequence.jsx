import { useState, useEffect, useRef } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import bg from '../assets/img/background1.png';
import { useGameStore } from "../store/useGameStore";
import { sequenceData, timeConfig } from "../store/proceduresData";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function MissionSequence() {
    const location = useLocation();
    const navigate = useNavigate();
    const stateData = location.state;
    const proc = stateData?.proc;
    const diffId = stateData?.diffId;

    const player = useGameStore((state) => state.player);
    const updateMissionSequenceResult = useGameStore((state) => state.updateMissionSequenceResult);

    const [isLoading, setIsLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const [availableSteps, setAvailableSteps] = useState([]);
    const [selectedSteps, setSelectedSteps] = useState([]);

    // Timer State
    const initialTime = (proc && diffId && timeConfig[proc.id]?.[diffId]?.sequence)
        ? timeConfig[proc.id][diffId].sequence * 60
        : 180;
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({ type: 'error', title: '', message: '' });

    // Initialization
    useEffect(() => {
        if (!proc) return;

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 20) + 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);

                // Shuffle sequence data
                const originalData = sequenceData[proc.id] || [];
                const shuffled = [...originalData].sort(() => Math.random() - 0.5);

                // Add a unique key for drag and drop to avoid React key issues
                setAvailableSteps(shuffled.map(item => ({ ...item, dndId: `dnd-${item.id}` })));

                setTimeout(() => setIsLoading(false), 400);
            }
            setLoadingProgress(progress);
        }, 150);

        return () => clearInterval(interval);
    }, [proc]);

    // Timer Effect
    const endTimeRef = useRef(null);
    useEffect(() => {
        if (!proc || isSubmitted || timeLeft <= 0 || isLoading) {
            if (isSubmitted || timeLeft <= 0) endTimeRef.current = null;
            return;
        }

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
        }, 500);

        return () => clearInterval(timerId);
    }, [isSubmitted, proc, isLoading]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    if (!proc) {
        return <Navigate to="/select" replace />;
    }

    const handleTimeUp = () => {
        setIsSubmitted(true);
        if (updateMissionSequenceResult) {
            updateMissionSequenceResult(proc.id, diffId, 0);
        }
        setScore(0);
        setModalInfo({
            type: 'timeout',
            title: 'หมดเวลาแล้ว!',
            message: 'เวลาในการจัดลำดับหมดลงแล้ว ระบบจะนำคุณไปยังส่วนต่อไป'
        });
        setShowModal(true);
    };

    // --- Interaction Logic ---
    const handleAddStep = (step) => {
        if (isSubmitted) return;
        setAvailableSteps(availableSteps.filter(s => s.id !== step.id));
        setSelectedSteps([...selectedSteps, step]);
    };

    const handleRemoveStep = (step) => {
        if (isSubmitted) return;
        setSelectedSteps(selectedSteps.filter(s => s.id !== step.id));
        setAvailableSteps([...availableSteps, step]);
    };

    const onDragEnd = (result) => {
        if (isSubmitted) return;
        if (!result.destination) return;

        const items = Array.from(selectedSteps);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setSelectedSteps(items);
    };

    // --- Submit Logic ---
    const handleSubmitClick = () => {
        if (selectedSteps.length === 0) return;
        setModalInfo({
            type: 'confirm',
            title: 'ยืนยันการจัดลำดับ?',
            message: 'คุณต้องการส่งคำตอบลำดับขั้นตอน และดูผลลัพธ์หรือไม่?'
        });
        setShowModal(true);
    };

    const confirmSubmit = () => {
        const originalData = sequenceData[proc.id] || [];
        const totalSteps = originalData.length;

        let correctCount = 0;
        // Verify correctness by checking if the id at index matches original id at index
        selectedSteps.forEach((step, index) => {
            if (originalData[index] && step.id === originalData[index].id) {
                correctCount++;
            }
        });

        // Add verification flags for UI display
        const verifiedSteps = selectedSteps.map((step, index) => ({
            ...step,
            isVerified: true,
            isCorrect: originalData[index] && step.id === originalData[index].id
        }));
        setSelectedSteps(verifiedSteps);

        let calculatedScore = totalSteps > 0 ? Math.round((correctCount / totalSteps) * 40) : 0;

        setScore(calculatedScore);
        setIsSubmitted(true);

        if (updateMissionSequenceResult) {
            updateMissionSequenceResult(proc.id, diffId, calculatedScore);
        }

        setShowModal(false);
        navigate("/quiz", { state: { type: 'post', proc, diffId } });
    };

    const handleModalClose = () => {
        setShowModal(false);
        navigate("/quiz", { state: { type: 'post', proc, diffId } });
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
            {isLoading && (
                <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white/90 backdrop-blur-md px-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 mb-6 border-4 border-blue-100 border-t-[#3b82f6] rounded-full animate-spin shadow-sm"></div>
                    <h2 className="text-2xl font-bold text-[#1e3a8a] mb-2 text-center">กำลังเตรียมภารกิจจัดลำดับ...</h2>
                    <p className="text-gray-500 mb-6 text-center text-sm md:text-base">รอสักครู่ ระบบกำลังจัดเตรียมข้อมูลขั้นตอนการทำหัตถการ</p>
                    <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                        <div
                            className="h-full bg-gradient-to-r from-[#4A90E2] to-[#3b82f6] transition-all duration-300"
                            style={{ width: `${loadingProgress}%` }}
                        ></div>
                    </div>
                    <p className="mt-2 text-sm font-bold text-[#3b82f6]">{loadingProgress}%</p>
                </div>
            )}

            {/* Modal Overlay */}
            {showModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-jiggle">
                        <div className="flex justify-center mb-4 text-blue-500">
                            {modalInfo.type === 'confirm' ? (
                                <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            ) : modalInfo.type === 'timeout' ? (
                                <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            ) : (
                                <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
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
                                    className="w-full py-3.5 rounded-xl font-bold text-white bg-blue-500 hover:bg-blue-600 transition-colors shadow-md"
                                >
                                    ยืนยัน
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleModalClose}
                                className="w-full py-3.5 rounded-xl font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95 bg-blue-500 hover:bg-blue-600"
                            >
                                ไปต่อ
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center pt-24 pb-10 px-4 w-full max-w-6xl mx-auto h-full">

                {/* Top Info Bar */}
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

                {/* Main UI Frame */}
                <div className={`bg-white rounded-[32px] shadow-xl w-full p-6 md:p-8 flex flex-col relative overflow-hidden border transition-colors duration-300 ${timeLeft <= 10 && !isSubmitted ? 'border-red-400 shadow-red-200/50' : 'border-blue-50'} flex-1`}>

                    {timeLeft <= 10 && !isSubmitted && (
                        <div className="absolute inset-0 pointer-events-none z-0 bg-red-500/5 animate-pulse rounded-[32px]"></div>
                    )}

                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-[#1e3a8a] mb-1">Mission 2 : จัดลำดับขั้นตอน</h2>
                            <p className="text-gray-600 text-sm font-medium">กดคลิกเพื่อเลือกขั้นตอน หรือลากสลับตำแหน่งให้ถูกต้อง</p>
                        </div>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold border shadow-sm transition-all z-10 ${timeLeft <= 10 && !isSubmitted
                            ? 'bg-red-50 text-white border-red-600 bg-red-500 animate-timer-urgent scale-110'
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

                    {/* Drag and Drop Context */}
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[500px]">

                            {/* Left Column: Available Steps */}
                            <div className="bg-[#f8fafc] rounded-2xl p-4 md:p-5 border border-blue-50 flex flex-col h-full">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-[#3b82f6] font-bold text-lg">ขั้นตอนที่รอจัดเรียง ({availableSteps.length})</h3>
                                </div>
                                <div className="flex-1 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar flex flex-col gap-3">
                                    {availableSteps.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-gray-400 py-10">
                                            <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            <span className="font-medium text-sm">เลือกขั้นตอนครบแล้ว</span>
                                        </div>
                                    ) : (
                                        availableSteps.map((step) => (
                                            <div
                                                key={step.dndId}
                                                onClick={() => handleAddStep(step)}
                                                className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:border-blue-400 hover:shadow-md transition-all group flex items-start gap-3"
                                            >
                                                <div className="bg-blue-50 text-blue-500 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                                    +
                                                </div>
                                                <p className="text-gray-700 text-sm leading-relaxed">{step.text}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Right Column: Ordered Steps */}
                            <div className="bg-[#f8fafc] rounded-2xl p-4 md:p-5 border border-blue-50 flex flex-col h-full">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-[#3b82f6] font-bold text-lg">ลำดับขั้นตอน ({selectedSteps.length})</h3>
                                    {!isSubmitted && selectedSteps.length > 0 && (
                                        <button
                                            onClick={() => {
                                                setAvailableSteps([...availableSteps, ...selectedSteps]);
                                                setSelectedSteps([]);
                                            }}
                                            className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-full border border-red-100 hover:bg-red-100 transition-colors"
                                        >
                                            <span className="flex items-center gap-1">เคลียร์ทั้งหมด <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></span>
                                        </button>
                                    )}
                                </div>

                                <Droppable droppableId="selected-list">
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={`flex-1 border-2 border-dashed rounded-xl p-3 flex flex-col gap-2 overflow-y-auto max-h-[500px] custom-scrollbar transition-colors ${snapshot.isDraggingOver ? 'bg-blue-50 border-blue-400' : 'bg-white border-blue-200'
                                                }`}
                                        >
                                            {selectedSteps.length === 0 && !snapshot.isDraggingOver ? (
                                                <div className="h-full flex flex-col items-center justify-center text-gray-400 py-10 pointer-events-none">
                                                    <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                                    <span className="font-medium text-sm">คลิกที่ขั้นตอนเพื่อนำมาจัดเรียง</span>
                                                </div>
                                            ) : null}

                                            {selectedSteps.map((step, index) => (
                                                <Draggable
                                                    key={step.dndId}
                                                    draggableId={step.dndId}
                                                    index={index}
                                                    isDragDisabled={isSubmitted}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            onClick={() => handleRemoveStep(step)}
                                                            className={`relative bg-white p-3 md:p-4 rounded-xl border flex items-center gap-3 transition-shadow ${snapshot.isDragging ? 'shadow-lg border-blue-500 rotate-1 z-50' : 'shadow-sm border-gray-200 hover:border-red-300'
                                                                } ${isSubmitted ? 'cursor-default pointer-events-none' : 'cursor-grab active:cursor-grabbing'}`}
                                                            style={{
                                                                ...provided.draggableProps.style,
                                                                userSelect: 'none'
                                                            }}
                                                        >
                                                            {/* Step Number Badge */}
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm ${isSubmitted
                                                                ? (step.isCorrect ? 'bg-green-100 text-green-600 border border-green-200' : 'bg-red-100 text-red-600 border border-red-200')
                                                                : 'bg-blue-100 text-blue-700'
                                                                }`}>
                                                                {index + 1}
                                                            </div>

                                                            <p className="text-gray-700 text-sm leading-relaxed flex-1">{step.text}</p>

                                                            {/* Status/Action Icon */}
                                                            {!isSubmitted ? (
                                                                <div className="text-gray-300 hover:text-red-500 transition-colors px-1 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleRemoveStep(step); }}>
                                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center justify-center">
                                                                    {step.isCorrect ? (
                                                                        <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                                    ) : (
                                                                        <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>

                                <div className="mt-4 flex flex-col items-center gap-2">
                                    {!isSubmitted ? (
                                        <button
                                            onClick={handleSubmitClick}
                                            disabled={selectedSteps.length === 0 || timeLeft <= 0}
                                            className={`mt-3 w-full py-3.5 rounded-xl font-bold shadow-md transform transition-all ${selectedSteps.length > 0 && timeLeft > 0
                                                ? 'bg-gradient-to-r from-[#4A90E2] to-[#3b82f6] text-white hover:shadow-lg hover:-translate-y-0.5'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            ส่งคำตอบ
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleModalClose}
                                            className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-xl font-bold shadow-md transform transition-all flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> ไปยังหน้าต่อไป
                                        </button>
                                    )}
                                </div>

                            </div>
                        </div>
                    </DragDropContext>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
            `}} />
        </div>
    );
}