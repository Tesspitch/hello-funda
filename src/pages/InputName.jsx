import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/useGameStore";
import bg from '../assets/img/background1.png';
import nurse from '../assets/img/nurse.svg';
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
            className="relative w-full h-screen h-[100dvh] overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bg})` }}
        >

            {/* ========================================= */}
            {/* === MOBILE / TABLET (< lg): Stack แนวตั้ง === */}
            {/* ========================================= */}
            <div className="flex lg:hidden flex-col items-center justify-center h-full px-4 gap-8">

                {/* โลโก้ hellofunda */}
                <img
                    src={logo}
                    alt="Hello Funda"
                    className="w-[260px] sm:w-[340px] md:w-[420px] drop-shadow-[0_4px_10px_rgba(255,255,255,0.7)] animate-logo-float translate-x-4"
                />

                {/* กล่อง Input + ปุ่ม Save */}
                <div className="flex flex-col items-center gap-8 w-full max-w-[240px]">

                    {/* Input */}
                    <input
                        type="text"
                        value={inputId}
                        onChange={(e) => setInputId(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="STUDENT ID ..."
                        className="input-cute w-full"
                    />

                    {/* ปุ่ม Save */}
                    <button
                        onClick={handleSave}
                        disabled={!inputId.trim()}
                        className="btn-cute w-full"
                    >
                        SAVE
                    </button>
                </div>
            </div>

            {/* ========================================= */}
            {/* === DESKTOP (lg+): Layout ซ้าย-ขวา === */}
            {/* ========================================= */}

            {/* ตัวละครพยาบาล: ซ้ายของกึ่งกลาง, ขอบล่างล้นจอ */}
            <div className="hidden lg:flex absolute bottom-[-8%] left-[8%] xl:left-[10%] h-full items-end pointer-events-none">
                <img
                    src={nurse}
                    alt="nurse"
                    className="h-[105vh] xl:h-[115vh] w-auto object-contain drop-shadow-[0_4px_10px_rgba(255,255,255,0.7)] animate-nurse-breathe"
                />
            </div>

            {/* โลโก้ + ฟอร์ม: ขวาของกึ่งกลาง, จัดกลางแนวตั้ง */}
            <div className="hidden lg:flex absolute top-1/2 right-[18%] xl:right-[18%] -translate-y-1/2 flex-col items-center gap-6">

                {/* โลโก้ hellofunda */}
                <img
                    src={logo}
                    alt="Hello Funda"
                    className="w-[400px] xl:w-[500px] 2xl:w-[580px] drop-shadow-[0_4px_10px_rgba(255,255,255,0.7)] animate-logo-float"
                />

                {/* กล่องฟอร์ม */}
                <div className="flex flex-col items-center gap-8 w-[380px] xl:w-[420px] bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white/30">

                    {/* Label */}
                    <label className="text-white text-xl xl:text-2xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] tracking-wide">
                        กรอกรหัสนักศึกษา
                    </label>

                    {/* Input */}
                    <input
                        type="text"
                        value={inputId}
                        onChange={(e) => setInputId(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Student ID..."
                        className="input-cute w-full"
                    />

                    {/* ปุ่ม Save */}
                    <button
                        onClick={handleSave}
                        disabled={!inputId.trim()}
                        className="btn-cute w-full"
                    >
                        Save
                    </button>
                </div>
            </div>

            {/* ========================================= */}
            {/* === Confirm Modal Popup === */}
            {/* ========================================= */}
            {showModal && (
                <div className="modal-overlay" onClick={handleCancel}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>

                        <p className="modal-title">ยืนยันรหัสนักศึกษา</p>

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