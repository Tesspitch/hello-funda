import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useGameStore } from "../store/useGameStore";
import bg from '../assets/img/background1.png';
import { submitGameResult } from "../utils/googleSheetsAPI";
import { ethicsData } from "../store/proceduresData";
import { toPng } from "html-to-image";

export default function SimulationScore() {
    const location = useLocation();
    const navigate = useNavigate();

    const { proc, diffId } = location.state || {};

    const procedures = useGameStore(state => state.procedures);
    const updateProcedureResult = useGameStore(state => state.updateProcedureResult);
    const playerId = useGameStore(state => state.player.id);

    // ถ้าไม่มีข้อมูล ให้เด้งกลับไปหน้าแรก
    if (!proc || !diffId) {
        return <Navigate to="/select" replace />;
    }

    const procedureData = procedures[proc.id]?.[diffId] || {};

    const preScore = procedureData.preTestScore || 0;
    const eqScore = procedureData.equipmentScore || 0;
    const seqScore = procedureData.sequenceScore || 0;
    const postScore = procedureData.postTestScore || 0;
    const totalScore = preScore + eqScore + seqScore + postScore;

    // เวลาที่ใช้ไปในแต่ละด่าน
    const equipmentTimeSpent = procedureData.equipmentTimeSpent || 0;
    const sequenceTimeSpent = procedureData.sequenceTimeSpent || 0;
    const totalTimeSpent = equipmentTimeSpent + sequenceTimeSpent;

    const hasSubmittedRef = useRef(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showEthics, setShowEthics] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);

    const procEthics = proc ? ethicsData[proc.id] : null;
    const captureRef = useRef(null);

    const handleDownloadImage = async () => {
        if (!captureRef.current) return;
        setIsDownloading(true);
        try {
            // Give it a small delay for styling to stabilize
            await new Promise(resolve => setTimeout(resolve, 100));

            const dataUrl = await toPng(captureRef.current, {
                pixelRatio: 2,
                backgroundColor: '#ffffff',
                cacheBust: false, // Don't use cacheBust to avoid Vite dev server CORS issues
                filter: (node) => {
                    return !(node.hasAttribute && node.hasAttribute('data-html2canvas-ignore'));
                }
            });

            const link = document.createElement('a');
            link.download = `score-${playerId || 'result'}.png`;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error capturing image:', error);
            const errMsg = error instanceof Error ? error.message : (typeof error === 'string' ? error : JSON.stringify(error));
            alert('เกิดข้อผิดพลาดในการบันทึกภาพ: ' + errMsg);
        } finally {
            setIsDownloading(false);
        }
    };

    useEffect(() => {
        if (procedureData.status !== "completed" && !hasSubmittedRef.current) {
            hasSubmittedRef.current = true;
            setIsSubmitting(true);
            updateProcedureResult(proc.id, diffId, totalScore, totalTimeSpent);

            // ส่งข้อมูลไปยัง Google Apps Script
            const payload = {
                studentId: playerId || "Unknown",
                procedureId: proc.id,
                procedureName: proc.name,
                difficulty: diffId,
                preTestScore: preScore,
                equipmentScore: eqScore,
                sequenceScore: seqScore,
                postTestScore: postScore,
                totalScore: totalScore,
                equipmentTimeSpent: equipmentTimeSpent,
                sequenceTimeSpent: sequenceTimeSpent,
                totalTimeSpent: totalTimeSpent,
                isPass: totalScore >= 60
            };

            // โค้ดส่งข้อมูลจะไปอยู่ในไฟล์ googleSheetsAPI.js แทน
            submitGameResult(payload)
                .then(res => {
                    console.log("Data sent to Google Sheets successfully:", res);
                    setIsSubmitting(false);
                })
                .catch(err => {
                    console.error("Failed to send data to Google Sheets:", err);
                    setIsSubmitting(false);
                });
        }
    }, [proc.id, diffId, totalScore, totalTimeSpent, procedureData.status, updateProcedureResult, playerId, proc.name, preScore, eqScore, seqScore, postScore, equipmentTimeSpent, sequenceTimeSpent]);

    const isPass = totalScore >= 60;

    if (showEthics && procEthics && procEthics.length > 0) {
        return (
            <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 py-10" style={{ backgroundImage: `url(${bg})` }}>
                <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col animate-pop-in">
                    <div className="p-8 text-white text-center relative" style={{ backgroundColor: proc.color }}>
                        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-pattern"></div>
                        <h2 className="text-3xl font-bold relative z-10 mb-2">
                            เกร็ดความรู้
                        </h2>
                        <p className="text-lg opacity-90 relative z-10">สิ่งสำคัญที่พึงระลึกเสมอ</p>
                        <div className="mt-4 relative z-10">
                            <span className="bg-opacity-20 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm">
                                รหัสนิสิต: {playerId || "ไม่ระบุ"}
                            </span>
                        </div>
                    </div>
                    <div className="p-8 flex flex-col gap-8">
                        <div className="bg-white px-6 py-10 sm:px-12 sm:py-12 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative flex flex-col items-center">

                            {/* Decorative Icon */}
                            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white mb-6 shadow-md relative z-10" style={{ backgroundColor: proc.color }}>
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>

                            <div className="w-full relative">
                                {/* Quote Icon Top Left */}
                                <span className="absolute -top-6 -left-4 text-7xl font-serif leading-none select-none opacity-20" style={{ color: proc.color }}>"</span>

                                {procEthics.map((text, idx) => (
                                    <p key={idx} className="text-gray-700 leading-[2.2rem] text-lg sm:text-[1.1rem] font-medium text-center relative z-10">
                                        {text}
                                    </p>
                                ))}

                                {/* Quote Icon Bottom Right */}
                                <span className="absolute -bottom-12 -right-4 text-7xl font-serif leading-none select-none opacity-20" style={{ color: proc.color }}>"</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowEthics(false)}
                            className="mt-4 w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1 active:scale-95"
                            style={{ backgroundColor: proc.color }}
                        >
                            รับทราบ และดูสรุปผลคะแนน
                        </button>
                    </div>
                </div>
            </div>

        );
    }

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 py-10" style={{ backgroundImage: `url(${bg})` }}>
            {isSubmitting && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-sm transition-opacity">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm w-full text-center mx-4 animate-pulse">
                        <div className="w-16 h-16 border-4 rounded-full animate-spin mb-6" style={{ borderColor: proc.bgLight, borderTopColor: proc.color }}></div>
                        <h2 className="text-2xl font-bold mb-2" style={{ color: proc.color }}>กำลังบันทึกข้อมูล...</h2>
                        <p className="text-gray-500">กรุณารอสักครู่ ระบบกำลังส่งข้อมูลไปยังระบบส่วนกลาง</p>
                    </div>
                </div>
            )}

            <div ref={captureRef} className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">

                {/* Header */}
                <div className="p-8 pb-16 text-white text-center relative" style={{ backgroundColor: proc.color }}>
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-pattern"></div>
                    <div className="flex justify-center mb-4 relative z-10">
                        {isPass ? (
                            <span className="text-6xl">🏆</span>
                        ) : (
                            <span className="text-6xl">🔥</span>
                        )}
                    </div>
                    <h1 className="text-3xl font-bold relative z-10 mb-2">
                        {proc.name}
                    </h1>
                    <p className="text-lg opacity-90 relative z-10">{isPass ? "ยินดีด้วย! คุณผ่านการทดสอบ" : "พยายามอีกนิด! คุณทำได้"}</p>
                    <div className="mt-4 relative z-10">
                        <span className="bg-opacity-20 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm">
                            รหัสนิสิต: {playerId || "ไม่ระบุ"}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-10 flex flex-col gap-6">

                    {/* Total Score Circle */}
                    <div className="flex justify-center -mt-16 relative z-20 mb-4">
                        <div className="w-32 h-32 rounded-full bg-white shadow-lg border-4 flex flex-col items-center justify-center" style={{ borderColor: proc.color }}>
                            <span className="text-4xl font-black" style={{ color: proc.color }}>{totalScore}</span>
                            <span className="text-sm text-gray-500 font-bold">/ 100</span>
                        </div>
                    </div>

                    {/* Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ScoreCard title="Pre-test" score={preScore} max={10} icon={
                            <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        } />
                        <ScoreCard title="เตรียมอุปกรณ์" score={eqScore} max={40} icon={
                            <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        } />
                        <ScoreCard title="ลำดับขั้นตอน" score={seqScore} max={40} icon={
                            <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
                        } />
                        <ScoreCard title="Post-test" score={postScore} max={10} icon={
                            <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                        } />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-6" data-html2canvas-ignore="true">
                        <button
                            onClick={handleDownloadImage}
                            disabled={isDownloading}
                            className={`flex-1 py-4 rounded-xl font-bold text-lg border-2 shadow-sm transform transition-all flex items-center justify-center gap-2 ${isDownloading
                                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-gray-50 hover:-translate-y-1'
                                }`}
                            style={!isDownloading ? { borderColor: proc.color } : {}}
                        >
                            {isDownloading ? (
                                <>
                                    <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                    กำลังบันทึก...
                                </>
                            ) : (
                                <>
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>
                                    บันทึกผล
                                </>
                            )}
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex-1 py-4 rounded-xl font-bold text-lg text-white shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1 flex items-center justify-center"
                            style={{ backgroundColor: proc.color }}
                        >
                            กลับสู่หน้าหลัก
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ScoreCard({ title, score, max, icon }) {
    const percentage = (score / max) * 100;

    return (
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
            <div className="text-3xl bg-white w-12 h-12 rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
                {icon}
            </div>
            <div className="flex-1">
                <p className="text-gray-500 text-sm font-bold mb-1">{title}</p>
                <div className="flex items-end gap-1">
                    <span className="text-2xl font-black text-gray-800 leading-none">{score}</span>
                    <span className="text-gray-400 font-medium text-sm leading-none mb-1">/ {max}</span>
                </div>
            </div>
            {percentage === 100 && (
                <div className="text-green-500 w-6 h-6 flex-shrink-0">
                    <svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                </div>
            )}
        </div>
    );
}