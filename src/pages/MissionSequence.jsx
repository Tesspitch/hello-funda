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

    const [currentPartIndex, setCurrentPartIndex] = useState(0);
    const [allSelectedSteps, setAllSelectedSteps] = useState({});

    const sequenceStateRef = useRef({ selectedSteps: [], allSelectedSteps: {}, currentPartIndex: 0 });
    useEffect(() => {
        sequenceStateRef.current = { selectedSteps, allSelectedSteps, currentPartIndex };
    }, [selectedSteps, allSelectedSteps, currentPartIndex]);

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

                // Shuffle sequence data for the FIRST PART
                const parts = sequenceData[proc.id] || [];
                if (parts.length > 0) {
                    const originalData = parts[0].steps || [];
                    const shuffled = [...originalData].sort(() => Math.random() - 0.5);

                    // Add a unique key for drag and drop to avoid React key issues
                    setAvailableSteps(shuffled.map(item => ({ ...item, dndId: `dnd-${item.id}` })));
                    setSelectedSteps([]);
                    setCurrentPartIndex(0);
                    setAllSelectedSteps({});
                }

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
        const { selectedSteps: currentSelected, allSelectedSteps: currentAll, currentPartIndex: currentIdx } = sequenceStateRef.current;

        const finalAllSelected = { ...currentAll, [currentIdx]: currentSelected };
        setAllSelectedSteps(finalAllSelected);

        const parts = sequenceData[proc.id] || [];
        let correctCount = 0;
        let totalSteps = 0;

        const verifiedSelectedSteps = {};
        
        parts.forEach((part, pIndex) => {
            const originalSteps = part.steps || [];
            totalSteps += originalSteps.length;
            const userSteps = finalAllSelected[pIndex] || [];

            const verified = userSteps.map((step, sIndex) => {
                const isCorrect = originalSteps[sIndex] && step.id === originalSteps[sIndex].id;
                if (isCorrect) correctCount++;
                return { ...step, isVerified: true, isCorrect };
            });
            verifiedSelectedSteps[pIndex] = verified;
        });

        setSelectedSteps(verifiedSelectedSteps[currentIdx] || []);
        setAllSelectedSteps(verifiedSelectedSteps);

        let calculatedScore = totalSteps > 0 ? Math.round((correctCount / totalSteps) * 40) : 0;

        setScore(calculatedScore);
        setIsSubmitted(true);

        if (updateMissionSequenceResult) {
            updateMissionSequenceResult(proc.id, diffId, calculatedScore, initialTime);
        }

        setModalInfo({
            type: 'timeout',
            title: 'หมดเวลาแล้ว!',
            message: 'เวลาในการจัดลำดับหมดลงแล้ว ระบบได้ทำการส่งคำตอบเท่าที่คุณจัดลำดับไว้ ไปสู่ขั้นตอนถัดไปกันเลย'
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
    const handleNextPart = () => {
        setAllSelectedSteps(prev => ({ ...prev, [currentPartIndex]: selectedSteps }));
        const nextIndex = currentPartIndex + 1;
        const parts = sequenceData[proc.id] || [];
        if (nextIndex < parts.length) {
            const nextOriginal = parts[nextIndex].steps || [];
            const savedNextSteps = allSelectedSteps[nextIndex];
            if (savedNextSteps) {
                setSelectedSteps(savedNextSteps);
                const savedIds = savedNextSteps.map(s => s.id);
                const nextAvailable = nextOriginal
                    .filter(s => !savedIds.includes(s.id))
                    .map(item => ({ ...item, dndId: `dnd-${item.id}` }));
                setAvailableSteps(nextAvailable);
            } else {
                const shuffled = [...nextOriginal].sort(() => Math.random() - 0.5);
                setAvailableSteps(shuffled.map(item => ({ ...item, dndId: `dnd-${item.id}` })));
                setSelectedSteps([]);
            }
            setCurrentPartIndex(nextIndex);
        }
    };

    const handlePrevPart = () => {
        setAllSelectedSteps(prev => ({ ...prev, [currentPartIndex]: selectedSteps }));
        const prevIndex = currentPartIndex - 1;
        if (prevIndex >= 0) {
            const parts = sequenceData[proc.id] || [];
            const prevOriginal = parts[prevIndex].steps || [];
            const savedPrevSteps = allSelectedSteps[prevIndex] || [];
            setSelectedSteps(savedPrevSteps);
            const savedIds = savedPrevSteps.map(s => s.id);
            const prevAvailable = prevOriginal
                .filter(s => !savedIds.includes(s.id))
                .map(item => ({ ...item, dndId: `dnd-${item.id}` }));
            setAvailableSteps(prevAvailable);
            setCurrentPartIndex(prevIndex);
        }
    };

    const handleSubmitClick = () => {
        if (availableSteps.length > 0) return;
        setModalInfo({
            type: 'confirm',
            title: 'ยืนยันการจัดลำดับ?',
            message: 'คุณต้องการส่งคำตอบลำดับขั้นตอนทั้งหมด และดูผลลัพธ์หรือไม่?'
        });
        setShowModal(true);
    };

    const confirmSubmit = () => {
        const finalAllSelected = { ...allSelectedSteps, [currentPartIndex]: selectedSteps };
        setAllSelectedSteps(finalAllSelected);

        const parts = sequenceData[proc.id] || [];
        let correctCount = 0;
        let totalSteps = 0;

        const verifiedSelectedSteps = {};
        
        parts.forEach((part, pIndex) => {
            const originalSteps = part.steps || [];
            totalSteps += originalSteps.length;
            const userSteps = finalAllSelected[pIndex] || [];

            const verified = userSteps.map((step, sIndex) => {
                const isCorrect = originalSteps[sIndex] && step.id === originalSteps[sIndex].id;
                if (isCorrect) correctCount++;
                return { ...step, isVerified: true, isCorrect };
            });
            verifiedSelectedSteps[pIndex] = verified;
        });

        setSelectedSteps(verifiedSelectedSteps[currentPartIndex] || []);
        setAllSelectedSteps(verifiedSelectedSteps);

        let calculatedScore = totalSteps > 0 ? Math.round((correctCount / totalSteps) * 40) : 0;

        setScore(calculatedScore);
        setIsSubmitted(true);

        if (updateMissionSequenceResult) {
            const timeSpent = initialTime - timeLeft;
            updateMissionSequenceResult(proc.id, diffId, calculatedScore, timeSpent);
        }

        setShowModal(false);
        navigate("/quiz", { state: { type: 'post', proc, diffId }, replace: true });
    };

    const handleModalClose = () => {
        setShowModal(false);
        navigate("/quiz", { state: { type: 'post', proc, diffId }, replace: true });
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
                    <div className="w-16 h-16 md:w-20 md:h-20 mb-6 border-4 rounded-full animate-spin shadow-sm" style={{ borderColor: proc.bgLight, borderTopColor: proc.color }}></div>
                    <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: proc.color }}>กำลังเตรียมภารกิจจัดลำดับ...</h2>
                    <p className="text-gray-500 mb-6 text-center text-sm md:text-base">รอสักครู่ ระบบกำลังจัดเตรียมข้อมูลขั้นตอนการทำหัตถการ</p>
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
                <div className={`bg-white rounded-[32px] shadow-xl w-full p-6 md:p-8 flex flex-col relative overflow-hidden border transition-colors duration-300 ${timeLeft <= 10 && !isSubmitted ? 'border-red-400 shadow-red-200/50' : ''} flex-1`} style={{ borderColor: timeLeft <= 10 && !isSubmitted ? undefined : proc.bgLight }}>

                    {timeLeft <= 10 && !isSubmitted && (
                        <div className="absolute inset-0 pointer-events-none z-0 bg-red-500/5 animate-pulse rounded-[32px]"></div>
                    )}

                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-1" style={{ color: proc.color }}>Mission 2 : จัดลำดับขั้นตอน</h2>
                            <p className="text-gray-600 text-sm font-medium">
                                <span className="font-bold" style={{ color: proc.color }}>{sequenceData[proc.id]?.[currentPartIndex]?.partName || `Part ${currentPartIndex + 1}`}</span> - กดคลิกเพื่อเลือกขั้นตอน หรือลากสลับตำแหน่งให้ถูกต้อง
                            </p>
                        </div>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold border shadow-sm transition-all z-10 ${timeLeft <= 10 && !isSubmitted
                            ? 'text-white border-red-600 bg-red-500 animate-timer-urgent scale-110'
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

                    {/* Drag and Drop Context */}
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[500px]">

                            {/* Left Column: Available Steps */}
                            <div className="bg-[#f8fafc] rounded-2xl p-4 md:p-5 border flex flex-col h-full" style={{ borderColor: proc.bgLight }}>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-lg" style={{ color: proc.color }}>ขั้นตอนที่รอจัดเรียง ({availableSteps.length})</h3>
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
                                                className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-all flex items-start gap-3"
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.borderColor = proc.color;
                                                    const icon = e.currentTarget.querySelector('.add-icon');
                                                    if (icon) {
                                                        icon.style.backgroundColor = proc.color;
                                                        icon.style.color = '#ffffff';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.borderColor = '#e5e7eb';
                                                    const icon = e.currentTarget.querySelector('.add-icon');
                                                    if (icon) {
                                                        icon.style.backgroundColor = proc.bgLight;
                                                        icon.style.color = proc.color;
                                                    }
                                                }}
                                            >
                                                <div className="add-icon w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 transition-colors"
                                                     style={{ backgroundColor: proc.bgLight, color: proc.color }}>
                                                    +
                                                </div>
                                                <p className="text-gray-700 text-sm leading-relaxed">{step.text}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Right Column: Ordered Steps */}
                            <div className="bg-[#f8fafc] rounded-2xl p-4 md:p-5 border flex flex-col h-full" style={{ borderColor: proc.bgLight }}>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-lg" style={{ color: proc.color }}>ลำดับขั้นตอน ({selectedSteps.length})</h3>
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
                                            className={`flex-1 border-2 border-dashed rounded-xl p-3 flex flex-col gap-2 overflow-y-auto max-h-[500px] custom-scrollbar transition-colors ${snapshot.isDraggingOver ? '' : 'bg-white'}`}
                                            style={{
                                                borderColor: snapshot.isDraggingOver ? proc.color : '#e2e8f0',
                                                backgroundColor: snapshot.isDraggingOver ? proc.bgLight : 'white'
                                            }}
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
                                                            className={`relative bg-white p-3 md:p-4 rounded-xl border flex items-center gap-3 transition-shadow ${snapshot.isDragging ? 'shadow-lg rotate-1 z-50' : 'shadow-sm border-gray-200 hover:shadow-md'
                                                                } ${isSubmitted ? 'cursor-default pointer-events-none' : 'cursor-grab active:cursor-grabbing'}`}
                                                            style={{
                                                                ...provided.draggableProps.style,
                                                                userSelect: 'none',
                                                                borderColor: snapshot.isDragging ? proc.color : undefined
                                                            }}
                                                        >
                                                            {/* Step Number Badge */}
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm ${isSubmitted
                                                                ? (step.isCorrect ? 'bg-green-100 text-green-600 border border-green-200' : 'bg-red-100 text-red-600 border border-red-200')
                                                                : ''
                                                                }`}
                                                                style={!isSubmitted ? { backgroundColor: proc.bgLight, color: proc.color } : {}}
                                                            >
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

                                <div className="mt-4 flex flex-col items-center gap-2 w-full">
                                    {!isSubmitted ? (
                                        <div className="flex w-full gap-2 mt-3">
                                            {currentPartIndex > 0 && (
                                                <button
                                                    onClick={handlePrevPart}
                                                    className="w-1/3 py-3.5 rounded-xl font-bold shadow-md transform transition-all bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-lg hover:-translate-y-0.5"
                                                >
                                                    ย้อนกลับ
                                                </button>
                                            )}
                                            
                                            {currentPartIndex < (sequenceData[proc.id]?.length || 1) - 1 ? (
                                                <button
                                                    onClick={handleNextPart}
                                                    disabled={availableSteps.length > 0 || timeLeft <= 0}
                                                    className={`flex-1 py-3.5 rounded-xl font-bold shadow-md transform transition-all ${availableSteps.length === 0 && timeLeft > 0
                                                        ? 'text-white hover:shadow-lg hover:-translate-y-0.5 hover:brightness-110'
                                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                        }`}
                                                    style={availableSteps.length === 0 && timeLeft > 0 ? { backgroundColor: proc.color } : {}}
                                                >
                                                    ส่วนต่อไป
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={handleSubmitClick}
                                                    disabled={availableSteps.length > 0 || timeLeft <= 0}
                                                    className={`flex-1 py-3.5 rounded-xl font-bold shadow-md transform transition-all ${availableSteps.length === 0 && timeLeft > 0
                                                        ? 'text-white hover:shadow-lg hover:-translate-y-0.5 hover:brightness-110'
                                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                        }`}
                                                    style={availableSteps.length === 0 && timeLeft > 0 ? { backgroundColor: proc.color } : {}}
                                                >
                                                    ส่งคำตอบ
                                                </button>
                                            )}
                                        </div>
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