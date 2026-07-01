import { create } from 'zustand';


const initialGameState = {
    player: {
        id: "",
        name: "น้องพยาบาล",
        level: 1,
        totalCoins: 0,
    },

    procedures: {
        suction: {
            id: "suction",
            name: "Suction",
            status: "pending",
            equipmentStatus: "not_done",
            equipmentScore: 0,
            equipmentTimeSpent: 0,
            score: 0,
            timeSpentSeconds: 0,
            badgeEarned: false
        },
        foley_catheter: {
            id: "foley_catheter",
            name: "Foley Catheter",
            status: "pending",
            equipmentStatus: "not_done",
            equipmentScore: 0,
            equipmentTimeSpent: 0,
            score: 0,
            timeSpentSeconds: 0,
            badgeEarned: false
        },
        ng_tube: {
            id: "ng_tube",
            name: "NG Tube",
            status: "pending",
            equipmentStatus: "not_done",
            equipmentScore: 0,
            equipmentTimeSpent: 0,
            score: 0,
            timeSpentSeconds: 0,
            badgeEarned: false
        }
    }
};

// 2. สร้าง Store สำหรับให้ Component ต่างๆ เรียกใช้และอัปเดตข้อมูล
export const useGameStore = create((set) => ({
    ...initialGameState,

    // --- ฟังก์ชันสำหรับรับ Input เพื่ออัปเดตข้อมูล ---

    // ฟังก์ชันสำหรับบันทึกผลของ MissionEquipment
    updateMissionEquipmentResult: (procedureId, newScore, timeSpent) =>
        set((state) => ({
            procedures: {
                ...state.procedures,
                [procedureId]: {
                    ...state.procedures[procedureId],
                    equipmentStatus: "pass",
                    equipmentScore: newScore,
                    equipmentTimeSpent: timeSpent,
                }
            }
        })),

    // เมื่อเล่นจบ 1 หัตถการ ให้ส่งข้อมูลมาอัปเดตผ่านฟังก์ชันนี้
    updateProcedureResult: (procedureId, newScore, timeSpent) =>
        set((state) => ({
            procedures: {
                ...state.procedures,
                [procedureId]: {
                    ...state.procedures[procedureId],
                    status: "completed",
                    score: newScore,
                    timeSpentSeconds: timeSpent,
                    // สมมติว่าได้คะแนนเกิน 80 จะได้เหรียญยืนยัน (badge)
                    badgeEarned: newScore >= 80 ? true : false,
                }
            }
        })),

    // ฟังก์ชันเพิ่มเหรียญ (Coins)
    addCoins: (amount) =>
        set((state) => ({
            player: {
                ...state.player,
                totalCoins: state.player.totalCoins + amount
            }
        })),

    // ฟังก์ชันสำหรับบันทึก Player ID
    setPlayerId: (id) =>
        set((state) => ({
            player: {
                ...state.player,
                id: id,
            }
        })),

    // ฟังก์ชันสำหรับรีเซ็ตข้อมูลทั้งหมดกลับเป็นค่าเริ่มต้น (เช่น ตอนเริ่มเกมใหม่)
    resetGame: () => set(initialGameState)
}));