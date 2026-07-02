/**
 * ฟังก์ชันสำหรับส่งข้อมูล JSON ไปยัง Google Apps Script (Google Sheets)
 * @param {string} scriptUrl - URL ของ Google Apps Script (Web App URL) ที่ได้จากการ Deploy
 * @param {object} payload - ข้อมูล (JSON Object) ที่ต้องการส่งไปบันทึก
 * @returns {Promise<any>} - ผลลัพธ์จากการ fetch
 */
export const sendDataToGoogleSheet = async (scriptUrl, payload) => {
    try {
        // แนะนำให้ส่งเป็น text/plain เพื่อป้องกันปัญหา CORS Preflight ในบางกรณี
        // แต่ข้อมูลใน body ยังคงเป็น JSON String เหมือนเดิม
        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error sending data to Google Sheet:", error);
        throw error;
    }
};

// TODO: นำ URL ของ Web App จาก Google Apps Script มาใส่ที่นี่
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwKbuy86FiUSlvf3LR6Hfh9us9vaJ0y7YvNHbTCjV1PbnK53nJZ4JrRJeq8sYgiSIe1_Q/exec";

/**
 * ฟังก์ชันส่งผลการเล่นเกมไปยัง Google Sheets
 * @param {object} payload - ข้อมูลผลการเล่นทั้งหมดที่ต้องการบันทึก
 */
export const submitGameResult = async (payload) => {
    console.log("📊 เตรียมส่งข้อมูลคะแนนไปยัง Google Sheets:");
    console.table({
        "รหัสนิสิต": payload.studentId,
        "ชื่อหัตถการ": payload.procedureName,
        "ระดับความยาก": payload.difficulty,
        "คะแนน Pre-test": payload.preTestScore,
        "คะแนนเตรียมอุปกรณ์": payload.equipmentScore,
        "คะแนนจัดเรียงลำดับ": payload.sequenceScore,
        "คะแนน Post-test": payload.postTestScore,
        "คะแนนรวมทั้งหมด": payload.totalScore,
        "เวลาที่ใช้ (เตรียมอุปกรณ์)": `${payload.equipmentTimeSpent} วินาที`,
        "เวลาที่ใช้ (จัดลำดับ)": `${payload.sequenceTimeSpent} วินาที`,
        "เวลาที่ใช้ (รวม)": `${payload.totalTimeSpent} วินาที`,
        "ผลลัพธ์": payload.isPass ? "ผ่าน" : "ไม่ผ่าน"
    });
    console.log("Payload JSON ฉบับเต็ม:", payload);

    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === "https://script.google.com/macros/s/AKfycbwKbuy86FiUSlvf3LR6Hfh9us9vaJ0y7YvNHbTCjV1PbnK53nJZ4JrRJeq8sYgiSIe1_Q/exec") {
        console.warn("⚠️ [Mock] ส่งข้อมูลสำเร็จจำลอง (กรุณาใส่ GOOGLE_SCRIPT_URL ใน googleSheetsAPI.js):", payload);
        return Promise.resolve({ status: "success", mock: true });
    }

    try {
        const result = await sendDataToGoogleSheet(GOOGLE_SCRIPT_URL, payload);
        console.log("✅ ส่งข้อมูลไปยัง Google Apps Script (GAS) สำเร็จเรียบร้อยแล้ว!", result);
        return result;
    } catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการส่งข้อมูลไปยัง GAS:", error);
        throw error;
    }
};
