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
            preTestScore: 0,
            equipmentStatus: "not_done",
            equipmentScore: 0,
            equipmentTimeSpent: 0,
            sequenceScore: 0,
            postTestScore: 0,
            score: 0,
            timeSpentSeconds: 0,
            badgeEarned: false
        },
        foley_catheter: {
            id: "foley_catheter",
            name: "Foley Catheter",
            status: "pending",
            preTestScore: 0,
            equipmentStatus: "not_done",
            equipmentScore: 0,
            equipmentTimeSpent: 0,
            sequenceScore: 0,
            postTestScore: 0,
            score: 0,
            timeSpentSeconds: 0,
            badgeEarned: false
        },
        ng_tube: {
            id: "ng_tube",
            name: "NG Tube",
            status: "pending",
            preTestScore: 0,
            equipmentStatus: "not_done",
            equipmentScore: 0,
            equipmentTimeSpent: 0,
            sequenceScore: 0,
            postTestScore: 0,
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
        set((state) => {
            console.log(`[Store] Mission Equipment Score for ${procedureId}: ${newScore}/40 (Time: ${timeSpent}s)`);
            return {
                procedures: {
                    ...state.procedures,
                    [procedureId]: {
                        ...state.procedures[procedureId],
                        equipmentStatus: "pass",
                        equipmentScore: newScore,
                        equipmentTimeSpent: timeSpent,
                    }
                }
            };
        }),

    // ฟังก์ชันสำหรับบันทึกคะแนน Pre-test
    updatePreTestResult: (procedureId, newScore) =>
        set((state) => {
            console.log(`[Store] Pre-test Score for ${procedureId}: ${newScore}/10`);
            return {
                procedures: {
                    ...state.procedures,
                    [procedureId]: {
                        ...state.procedures[procedureId],
                        preTestScore: newScore,
                    }
                }
            };
        }),

    // ฟังก์ชันสำหรับบันทึกคะแนน Mission Sequence
    updateMissionSequenceResult: (procedureId, newScore) =>
        set((state) => {
            console.log(`[Store] Mission Sequence Score for ${procedureId}: ${newScore}/40`);
            return {
                procedures: {
                    ...state.procedures,
                    [procedureId]: {
                        ...state.procedures[procedureId],
                        sequenceScore: newScore,
                    }
                }
            };
        }),

    // ฟังก์ชันสำหรับบันทึกคะแนน Post-test (Quiz)
    updatePostTestResult: (procedureId, newScore) =>
        set((state) => {
            console.log(`[Store] Post-test Score for ${procedureId}: ${newScore}/10`);
            return {
                procedures: {
                    ...state.procedures,
                    [procedureId]: {
                        ...state.procedures[procedureId],
                        postTestScore: newScore,
                    }
                }
            };
        }),


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