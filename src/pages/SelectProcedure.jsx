import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/useGameStore";
import { timeConfig } from "../store/proceduresData";
import bg from '../assets/img/background1.png';
import logo from '../assets/icons/hellofunda.svg';
import { proceduresMetaData as procedures } from "../store/proceduresData";

const difficulties = [
    { id: "intermediate", label: "Intermediate", stars: 2, color: "#ecc94b", activeBg: "#fffff0" },
    { id: "advance", label: "Advance", stars: 3, color: "#f56565", activeBg: "#fff5f5" },
];

function ProcedureCard({ proc, selectedDifficulty, onSelectDifficulty, onStart }) {
    return (
        <div className="proc-card" style={{ borderColor: proc.bgLight }}>

            {/* Badge หมายเลข */}
            <div className="proc-card-badge" style={{ backgroundColor: proc.color }}>
                {proc.num}
            </div>

            {/* ไอคอน */}
            <div className="proc-card-icon-wrap">
                <img src={proc.icon} alt={proc.name} className="proc-card-icon" />
            </div>

            {/* ชื่อหัตถการ */}
            <h2 className="proc-card-name" style={{ color: proc.color }}>
                {proc.name}
            </h2>
            <p className="proc-card-name-th">
                {proc.nameTh}
            </p>

            {/* คำอธิบาย */}
            <p className="proc-card-desc">
                {proc.desc}
            </p>

            {/* เลือกระดับความยาก */}
            <div className="proc-card-diff-container">
                <p className="proc-card-diff-label">เลือกระดับความยาก</p>
                <div className="proc-card-diff-group">
                    {difficulties.map((diff) => {
                        const isActive = selectedDifficulty === diff.id;
                        return (
                            <button
                                key={diff.id}
                                className={`proc-card-diff-btn ${isActive ? 'active' : ''}`}
                                style={{
                                    borderColor: isActive ? diff.color : "#e2e8f0",
                                    backgroundColor: isActive ? diff.activeBg : "#ffffff",
                                    boxShadow: isActive ? `0 4px 12px ${diff.color}30` : 'none',
                                }}
                                onClick={() => onSelectDifficulty(diff.id)}
                            >
                                <div className="proc-card-diff-text" style={{ color: diff.color }}>
                                    {diff.label}
                                </div>
                                <div className="proc-card-diff-stars flex justify-center gap-0.5" style={{ color: diff.color }}>
                                    {Array.from({ length: diff.stars }).map((_, i) => (
                                        <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                    ))}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ปุ่มเริ่มฝึก */}
            <button
                className="proc-card-start-btn"
                style={{
                    backgroundColor: proc.color,
                    boxShadow: selectedDifficulty ? `0 8px 20px ${proc.color}40` : 'none'
                }}
                disabled={!selectedDifficulty}
                onClick={onStart}
            >
                เริ่มฝึก <span className="ml-1 text-xl leading-none font-medium">›</span>
            </button>
        </div>
    );
}

export default function SelectProcedure() {
    const player = useGameStore((state) => state.player);
    const navigate = useNavigate();

    // เก็บหัตถการและระดับความยากที่กำลังเลือก
    const [selectedProcId, setSelectedProcId] = useState(null);
    const [selectedDiffId, setSelectedDiffId] = useState(null);

    // State สำหรับ Modal ยืนยัน
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [pendingSelection, setPendingSelection] = useState(null);

    const handleSelectDiff = (procId, diffId) => {
        if (selectedProcId === procId && selectedDiffId === diffId) {
            setSelectedProcId(null);
            setSelectedDiffId(null);
        } else {
            setSelectedProcId(procId);
            setSelectedDiffId(diffId);
        }
    };

    const handleStartClick = (procId) => {
        const selectedProc = procedures.find(p => p.id === procId);
        setPendingSelection({ proc: selectedProc, diffId: selectedDiffId });
        setShowConfirmModal(true);
    };

    const handleConfirmStart = () => {
        if (!pendingSelection) return;
        
        console.log("Procedure Selected & Started:", {
            userId: player?.id,
            procedureId: pendingSelection.proc.id,
            difficultyId: pendingSelection.diffId
        });
        
        navigate("/quiz", {
            state: {
                type: 'pre',
                proc: pendingSelection.proc,
                diffId: pendingSelection.diffId
            }
        });
    };

    const handleCancelStart = () => {
        setShowConfirmModal(false);
        setPendingSelection(null);
    };

    return (
        <div className="proc-page-wrapper" style={{ backgroundImage: `url(${bg})` }}>

            {/* Content */}
            <div className="proc-page-content">

                {/* โลโก้ */}
                <div className="proc-page-logo-wrap">
                    <img
                        src={logo}
                        alt="Hello Funda"
                        className="proc-page-logo animate-logo-float"
                    />
                </div>

                {/* User Info & Dashboard Button */}
                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-4">
                    {/* Clickable User ID Label */}
                    {player?.id && (
                        <div
                            onClick={() => navigate('/dashboard')}
                            className="proc-page-user-label !mb-0 cursor-pointer transition-all hover:scale-105 hover:shadow-md border-2 border-transparent hover:border-[#FB8682] flex items-center gap-2"
                            title="คลิกเพื่อดูผลคะแนนของคุณ"
                        >
                            <span>Student ID: <span>{player.id}</span></span>

                        </div>
                    )}
                </div>

                {/* Cards Container */}
                <div className="proc-cards-layout">
                    {procedures.map((proc) => (
                        <div key={proc.id} className="proc-card-wrapper">
                            <ProcedureCard
                                proc={proc}
                                selectedDifficulty={selectedProcId === proc.id ? selectedDiffId : ""}
                                onSelectDifficulty={(diffId) => handleSelectDiff(proc.id, diffId)}
                                onStart={() => handleStartClick(proc.id)}
                            />
                        </div>
                    ))}
                </div>

            </div>

            {/* Confirm Modal Popup */}
            {showConfirmModal && pendingSelection && (
                <div className="modal-overlay" onClick={handleCancelStart}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>

                        <p className="modal-title">ยืนยันการเริ่มฝึก</p>

                        <div className="mb-4 text-left p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-inner">
                            <p className="font-bold text-lg mb-1" style={{ color: pendingSelection.proc.color }}>
                                {pendingSelection.proc.name}
                            </p>
                            <p className="text-sm text-gray-600 mb-3">
                                ระดับ: {difficulties.find(d => d.id === pendingSelection.diffId)?.label}
                            </p>

                            <p className="text-sm font-semibold text-gray-700 mb-1">เวลาที่กำหนด:</p>
                            <ul className="text-sm text-gray-600 list-disc list-inside">
                                <li>เลือกอุปกรณ์: <span className="font-bold text-red-500">{timeConfig[pendingSelection.proc.id][pendingSelection.diffId].equipment} นาที</span></li>
                                <li>เรียงลำดับหัตถการ: <span className="font-bold text-red-500">{timeConfig[pendingSelection.proc.id][pendingSelection.diffId].sequence} นาที</span></li>
                            </ul>
                        </div>

                        <p className="modal-subtitle mb-6">พร้อมที่จะเริ่มจับเวลาแล้วใช่ไหม?</p>

                        <div className="modal-buttons">
                            <button className="modal-btn modal-btn-cancel" onClick={handleCancelStart}>
                                ยกเลิก
                            </button>
                            <button className="modal-btn modal-btn-confirm" onClick={handleConfirmStart}>
                                ลุยเลย!
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
