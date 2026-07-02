import { useState, useEffect } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useGameStore } from "../store/useGameStore";
import { quizData } from "../store/proceduresData";
import bg from '../assets/img/background1.png';

export default function QuizPhase() {
    const location = useLocation();
    const navigate = useNavigate();

    const { type, proc, diffId } = location.state || {};

    const updatePreTestResult = useGameStore(state => state.updatePreTestResult);
    const updatePostTestResult = useGameStore(state => state.updatePostTestResult);

    const questions = proc ? (quizData[proc.id] || []) : [];

    const [currentIndex, setCurrentIndex] = useState(0);
    // เก็บคำตอบของแต่ละข้อไว้ใน Array เพื่อให้สามารถย้อนกลับมาแก้ได้
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));

    // สถานะว่าเริ่มทำแบบทดสอบหรือยัง
    const [hasStarted, setHasStarted] = useState(false);

    const isPreTest = type === 'pre';
    
    // Loading State for Post-test
    const [isLoading, setIsLoading] = useState(!isPreTest);
    const [loadingProgress, setLoadingProgress] = useState(0);

    useEffect(() => {
        if (!isPreTest && proc) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.floor(Math.random() * 20) + 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 400);
                }
                setLoadingProgress(progress);
            }, 150);
            return () => clearInterval(interval);
        }
    }, [isPreTest, proc]);

    // ถ้าไม่มีข้อมูล ให้เด้งกลับไปหน้าแรก
    if (!proc || !type || questions.length === 0) {
        return <Navigate to="/select" replace />;
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 py-8" style={{ backgroundImage: `url(${bg})` }}>
                <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white/90 backdrop-blur-md px-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 mb-6 border-4 border-gray-100 rounded-full animate-spin shadow-sm" style={{ borderTopColor: proc.color }}></div>
                    <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: proc.color }}>ประมวลผลภารกิจและเตรียมแบบทดสอบ...</h2>
                    <p className="text-gray-500 mb-6 text-center text-sm md:text-base">รอสักครู่ ระบบกำลังจัดเตรียมแบบทดสอบหลังเรียน</p>
                    <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                        <div
                            className="h-full transition-all duration-300"
                            style={{ width: `${loadingProgress}%`, backgroundColor: proc.color }}
                        ></div>
                    </div>
                    <p className="mt-2 text-sm font-bold" style={{ color: proc.color }}>{loadingProgress}%</p>
                </div>
            </div>
        );
    }

    if (!hasStarted) {
        return (
            <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 py-8" style={{ backgroundImage: `url(${bg})` }}>
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col items-center justify-center font-sans border border-gray-100 text-center p-8 md:p-10 animate-jiggle">
                    <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6 shadow-inner text-blue-500">
                        {isPreTest ? (
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        ) : (
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                        )}
                    </div>
                    
                    <h1 className="text-2xl md:text-3xl font-bold mb-3 leading-tight" style={{ color: proc.color }}>
                        เตรียมพร้อมสำหรับ
                        <br />
                        {isPreTest ? "แบบทดสอบก่อนเรียน" : "แบบทดสอบหลังเรียน"}
                    </h1>
                    
                    <div className="bg-gray-50 rounded-xl p-4 w-full mb-8 border border-gray-100">
                        <p className="text-gray-700 font-medium mb-1">
                            หัตถการ: <span style={{ color: proc.color }}>{proc.name}</span>
                        </p>
                        <p className="text-gray-500 text-sm mb-3">
                            ({proc.nameTh})
                        </p>
                        <div className="h-px w-full bg-gray-200 mb-3"></div>
                        <p className="text-gray-800 font-bold">
                            จำนวน {questions.length} ข้อ
                        </p>
                    </div>

                    <button
                        onClick={() => setHasStarted(true)}
                        className="w-full py-4 rounded-2xl font-bold text-lg text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
                        style={{ backgroundColor: proc.color }}
                    >
                        <span>เริ่มทำแบบทดสอบเลย</span>
                        <span className="text-2xl leading-none">›</span>
                    </button>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentIndex];
    const isLastQuestion = currentIndex === questions.length - 1;

    const handleSelectOption = (index) => {
        const newAnswers = [...answers];
        newAnswers[currentIndex] = index;
        setAnswers(newAnswers);
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (isLastQuestion) {
            // จบแบบทดสอบ คำนวณคะแนนทั้งหมดรวดเดียว
            let calculatedScore = 0;
            answers.forEach((ans, idx) => {
                if (ans === questions[idx].correctAnswer) {
                    calculatedScore += 2; // 5 ข้อ ข้อละ 2 คะแนน รวม 10
                }
            });

            if (isPreTest) {
                updatePreTestResult(proc.id, diffId, calculatedScore);
                navigate("/mission-equipment", { state: { proc, diffId } });
            } else {
                updatePostTestResult(proc.id, diffId, calculatedScore);
                navigate("/simulation-score", { state: { proc, diffId } });
            }
        } else {
            setCurrentIndex(prev => prev + 1);
        }
    };

    // Helper: สร้างสีโปร่งใสจาก Hex (เช่น ทำให้พื้นหลังปุ่มจางลงแต่ใช้โทนสีเดิม)
    const hexToRgba = (hex, alpha) => {
        if (!hex) return `rgba(74, 144, 226, ${alpha})`; // Fallback color
        let r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 py-8" style={{ backgroundImage: `url(${bg})` }}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col font-sans border border-gray-100">
                
                {/* Header Section */}
                <div className="p-5 md:p-6 flex flex-col" style={{ backgroundColor: hexToRgba(proc.color, 0.03) }}>
                    
                    <h1 className="text-lg md:text-xl font-bold mb-4" style={{ color: proc.color }}>
                        {isPreTest ? "แบบทดสอบก่อนเรียน" : "แบบทดสอบหลังเรียน"} : {proc.name}
                    </h1>

                    {/* Progress Section */}
                    <div className="flex items-center gap-4">
                        <span className="text-gray-700 font-bold whitespace-nowrap text-xs md:text-sm">
                            ข้อที่ {currentIndex + 1} / {questions.length}
                        </span>
                        <div className="bg-gray-200 h-2 flex-1 rounded-full overflow-hidden">
                            <div 
                                className="h-full rounded-full transition-all duration-300"
                                style={{ 
                                    width: `${((currentIndex + 1) / questions.length) * 100}%`,
                                    backgroundColor: proc.color
                                }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="h-px w-full bg-gray-100"></div>

                {/* Question & Options */}
                <div className="p-5 md:p-6 flex-1 flex flex-col">
                    
                    <div className="mb-6">
                        <h2 className="text-lg md:text-xl font-bold text-gray-800 leading-relaxed">
                            {currentQ.question}
                        </h2>
                    </div>

                    <div className="flex flex-col gap-3 flex-1 justify-center mb-8">
                        {currentQ.options.map((option, index) => {
                            const isSelected = answers[currentIndex] === index;
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleSelectOption(index)}
                                    className={`text-left p-3 md:p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between gap-3 ${
                                        isSelected 
                                            ? 'shadow-md transform scale-[1.01]' 
                                            : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                                    }`}
                                    style={{
                                        borderColor: isSelected ? hexToRgba(proc.color, 0.3) : '',
                                        backgroundColor: isSelected ? hexToRgba(proc.color, 0.08) : '',
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div 
                                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 transition-colors text-base shadow-sm`}
                                            style={{
                                                backgroundColor: isSelected ? proc.color : '#f1f5f9',
                                                color: isSelected ? '#ffffff' : '#475569'
                                            }}
                                        >
                                            {String.fromCharCode(65 + index)}
                                        </div>
                                        <span className={`text-base md:text-lg ${isSelected ? 'font-bold' : 'text-gray-700'}`}
                                              style={{ color: isSelected ? proc.color : '' }}
                                        >
                                            {option}
                                        </span>
                                    </div>
                                    
                                    {/* Optional: Checkmark icon for selected */}
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                                         style={{ backgroundColor: proc.color }}
                                    >
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center mt-auto gap-4">
                        <button
                            onClick={handleBack}
                            className={`flex-1 py-3.5 md:py-4 rounded-2xl font-bold text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 transition-colors ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={currentIndex === 0}
                        >
                            ย้อนกลับ
                        </button>
                        
                        <button
                            onClick={handleNext}
                            disabled={answers[currentIndex] === null}
                            className={`flex-1 py-3.5 md:py-4 rounded-2xl font-bold text-white shadow-md transition-all ${answers[currentIndex] === null ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-lg'}`}
                            style={{ 
                                backgroundColor: answers[currentIndex] !== null ? proc.color : '#cbd5e1',
                                boxShadow: answers[currentIndex] !== null ? `0 10px 15px -3px ${hexToRgba(proc.color, 0.4)}` : ''
                            }}
                        >
                            {isLastQuestion ? 'ส่งคำตอบ' : 'ถัดไป'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}