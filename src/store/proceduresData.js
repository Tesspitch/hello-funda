// ข้อมูลอุปกรณ์สำหรับแต่ละหัตถการ (ใช้ Emoji เป็น Placeholder ไปก่อน)
export const equipmentData = {
    suction: [
        { id: 1, name: "Sterile glove", icon: "🧤", isCorrect: true },
        { id: 2, name: "Suction catheter", icon: "🥢", isCorrect: true },
        { id: 3, name: "Yankauer", icon: "🪄", isCorrect: false },
        { id: 4, name: "Suction set", icon: "⚙️", isCorrect: true },
        { id: 5, name: "0.9% NSS", icon: "💧", isCorrect: true },
        { id: 6, name: "Gauze", icon: "🩹", isCorrect: false },
        { id: 7, name: "Kidney tray", icon: "🧫", isCorrect: true },
        { id: 8, name: "Adhesive tape", icon: "🩹", isCorrect: false },
        { id: 9, name: "Sterile water", icon: "💦", isCorrect: true },
        { id: 10, name: "Waste bag", icon: "🗑️", isCorrect: true }
    ],
    foley_catheter: [
        { id: 11, name: "Foley Catheter", icon: "🥢" },
        { id: 12, name: "Urine bag", icon: "🛍️" },
        { id: 13, name: "Sterile glove", icon: "🧤" },
        { id: 14, name: "Syringe 10ml", icon: "💉" },
        { id: 15, name: "Sterile water", icon: "💦" },
        { id: 16, name: "K-Y Jelly", icon: "🧴" },
        { id: 17, name: "Savlon/Betadine", icon: "🩸" },
        { id: 18, name: "Cotton balls", icon: "☁️" },
        { id: 19, name: "Forceps", icon: "✂️" },
        { id: 20, name: "Kidney tray", icon: "🧫" }
    ],
    ng_tube: [
        { id: 21, name: "NG Tube", icon: "🥢" },
        { id: 22, name: "Syringe 50ml", icon: "💉" },
        { id: 23, name: "Stethoscope", icon: "🩺" },
        { id: 24, name: "K-Y Jelly", icon: "🧴" },
        { id: 25, name: "Clean glove", icon: "🧤" },
        { id: 26, name: "Adhesive tape", icon: "🩹" },
        { id: 27, name: "Glass of water", icon: "🥛" },
        { id: 28, name: "Flashlight", icon: "🔦" },
        { id: 29, name: "Towel", icon: "🧣" },
        { id: 30, name: "Kidney tray", icon: "🧫" }
    ]
};

// ตั้งเวลา (นาที) สำหรับแต่ละหัตถการและระดับความยาก
// equipment = เวลาเลือกอุปกรณ์, sequence = เวลาเรียงลำดับหัตถการ
export const timeConfig = {
    ng_tube: {
        intermediate: { equipment: 4, sequence: 8 },
        advance: { equipment: 2, sequence: 6 }
    },
    suction: {
        intermediate: { equipment: 5, sequence: 12 },
        advance: { equipment: 3, sequence: 8 }
    },
    foley_catheter: {
        intermediate: { equipment: 5, sequence: 12 },
        advance: { equipment: 3, sequence: 8 }
    }
};
