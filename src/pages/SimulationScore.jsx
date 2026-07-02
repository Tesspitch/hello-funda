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
                    <div className="text-6xl mb-4 relative z-10">{isPass ? '🏆' : '💪'}</div>
                    <h1 className="text-3xl font-bold relative z-10 mb-2">
                        {isPass ? "ยินดีด้วย! คุณผ่านการทดสอบ" : "พยายามอีกนิด! คุณทำได้"}
                    </h1>
                    <p className="text-lg opacity-90 relative z-10">{proc.nameTh}</p>
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
                        <ScoreCard title="Pre-test" score={preScore} max={10} icon="📝" />
                        <ScoreCard title="เตรียมอุปกรณ์" score={eqScore} max={40} icon="🛠️" />
                        <ScoreCard title="ลำดับขั้นตอน" score={seqScore} max={40} icon="🔢" />
                        <ScoreCard title="Post-test" score={postScore} max={10} icon="🎓" />
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
                <div className="text-green-500 text-xl font-bold">
                    ✓
                </div>
            )}
        </div>
    );
}