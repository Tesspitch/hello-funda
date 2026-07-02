import { useEffect } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useGameStore } from "../store/useGameStore";
import bg from '../assets/img/background1.png';

export default function SimulationScore() {
    const location = useLocation();
    const navigate = useNavigate();

    const { proc, diffId } = location.state || {};

    const procedures = useGameStore(state => state.procedures);
    const updateProcedureResult = useGameStore(state => state.updateProcedureResult);

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

    // เวลาที่ใช้ไป
    const timeSpent = procedureData.equipmentTimeSpent || 0;

    useEffect(() => {
        if (procedureData.status !== "completed") {
            updateProcedureResult(proc.id, diffId, totalScore, timeSpent);
        }
    }, [proc.id, diffId, totalScore, timeSpent, procedureData.status, updateProcedureResult]);

    const isPass = totalScore >= 60;

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 py-10" style={{ backgroundImage: `url(${bg})` }}>
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">

                {/* Header */}
                <div className="p-8 text-white text-center relative" style={{ backgroundColor: proc.color }}>
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-pattern"></div>
                    <div className="flex justify-center mb-4 relative z-10">
                        {isPass ? (
                            <svg className="w-16 h-16 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                            </svg>
                        ) : (
                            <svg className="w-16 h-16 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.866 8.21 8.21 0 0 0 3 2.48Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                            </svg>
                        )}
                    </div>
                    <h1 className="text-3xl font-bold relative z-10 mb-2">
                        {proc.name}
                    </h1>
                    <p className="text-lg opacity-90 relative z-10">{isPass ? "ยินดีด้วย! คุณผ่านการทดสอบ" : "พยายามอีกนิด! คุณทำได้"}</p>
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

                    {/* Dashboard Button */}
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="mt-6 w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1"
                        style={{ backgroundColor: proc.color }}
                    >
                        กลับสู่หน้าหลัก (Dashboard)
                    </button>
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