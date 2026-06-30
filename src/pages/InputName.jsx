import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/useGameStore";
import bg from '../assets/img/background1.png';
import logo from '../assets/icons/hellofunda.svg';

export default function InputName() {
    const [inputId, setInputId] = useState("");
    const [showModal, setShowModal] = useState(false);
    const setPlayerId = useGameStore((state) => state.setPlayerId);
    const navigate = useNavigate();

    const handleSave = () => {
        if (!inputId.trim()) return;
        setShowModal(true);
    };

    const handleConfirm = () => {
        setPlayerId(inputId.trim());
        navigate("/select");
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSave();
    };

    return (
        <div
            className="relative w-full h-screen h-[100dvh] overflow-hidden bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${bg})` }}
        >
            {/* Blur Overlay */}
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[6px] z-0"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 mb-10">

                {/* โลโก้ hellofunda */}
                <div className="animate-logo-float">
                    <img
                        src={logo}
                        alt="Hello Funda"
                        className="w-[280px] sm:w-[380px] md:w-[480px] lg:w-[550px] drop-shadow-[0_4px_10px_rgba(255,255,255,0.7)]"
                    />
                </div>

                {/* กล่อง Input + ปุ่ม Save */}
                <div className="flex flex-col items-center w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]">
                    {/* Input */}
                    <input
                        type="text"
                        value={inputId}
                        onChange={(e) => setInputId(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="STUDENT ID ..."
                        className="input-cute w-full uppercase"
                    />

                    {/* ปุ่ม Save */}
                    <button
                        onClick={handleSave}
                        disabled={!inputId.trim()}
                        className="btn-cute w-full uppercase tracking-wider"
                    >
                        SAVE
                    </button>
                </div>
            </div>

            {/* ========================================= */}
            {/* === Confirm Modal Popup === */}
            {/* ========================================= */}
            {showModal && (
                <div className="modal-overlay" onClick={handleCancel}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>

                        <p className="modal-title">ยืนยันรหัสนิสิต</p>

                        <p className="modal-id">{inputId.trim()}</p>

                        <p className="modal-subtitle">รหัสนี้ถูกต้องใช่มั้ย?</p>

                        <div className="modal-buttons">
                            <button className="modal-btn modal-btn-cancel" onClick={handleCancel}>
                                แก้ไข
                            </button>
                            <button className="modal-btn modal-btn-confirm" onClick={handleConfirm}>
                                ยืนยัน
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}