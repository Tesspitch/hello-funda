import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/useGameStore";
import bg from '../assets/img/background1.png';
import logo from '../assets/icons/hellofunda.svg';
import ngIcon from '../assets/icons/ng.svg';
import suctionIcon from '../assets/icons/suction.svg';
import foleyIcon from '../assets/icons/foley.svg';

const procedures = [
    {
        id: "suction",
        num: 1,
        icon: suctionIcon,
        name: "Suction",
        nameTh: "การดูดเสมหะ",
        desc: "ฝึกการดูแลทางเดินหายใจโดยการดูดเสมหะอย่างถูกต้องและปลอดภัย",
        color: "#4A90E2",
        bgLight: "#eff6ff"
    },
    {
        id: "ng_tube",
        num: 2,
        icon: ngIcon,
        name: "NG Tube",
        nameTh: "การใส่สายยางให้อาหารทางจมูก",
        desc: "ฝึกการใส่สายยางให้อาหารทางจมูกอย่างถูกต้องและปลอดภัย",
        color: "#48BB78",
        bgLight: "#f0fdf4"
    },
    {
        id: "foley_catheter",
        num: 3,
        icon: foleyIcon,
        name: "Foley Catheter",
        nameTh: "การสวนปัสสาวะ",
        desc: "ฝึกการสวนปัสสาวะโดยใช้สายสวนปัสสาวะอย่างถูกต้องและปลอดภัย",
        color: "#F56565",
        bgLight: "#fef2f2"
    },
];

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
                                <div className="proc-card-diff-stars" style={{ color: diff.color }}>
                                    {"★".repeat(diff.stars)}
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

    const handleSelectDiff = (procId, diffId) => {
        if (selectedProcId === procId && selectedDiffId === diffId) {
            setSelectedProcId(null);
            setSelectedDiffId(null);
        } else {
            setSelectedProcId(procId);
            setSelectedDiffId(diffId);
        }
    };

    const handleStart = (procId) => {
        const selectedProc = procedures.find(p => p.id === procId);
        navigate("/mission-equipment", { 
            state: { 
                proc: selectedProc, 
                diffId: selectedDiffId 
            } 
        });
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

                {/* User ID Label */}
                {player?.id && (
                    <div className="proc-page-user-label">
                        Student ID: <span>{player.id}</span>
                    </div>
                )}

                {/* Cards Container */}
                <div className="proc-cards-layout">
                    {procedures.map((proc) => (
                        <div key={proc.id} className="proc-card-wrapper">
                            <ProcedureCard
                                proc={proc}
                                selectedDifficulty={selectedProcId === proc.id ? selectedDiffId : ""}
                                onSelectDifficulty={(diffId) => handleSelectDiff(proc.id, diffId)}
                                onStart={() => handleStart(proc.id)}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
