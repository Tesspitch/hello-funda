

////////////////////
////  SUCTION  ////
//////////////////
/// TRUE ///
import sterile_glove from "../assets/img/suction/1_sterile_glove.webp";         // NG               // FOLEY
import clean_glove from "../assets/img/suction/2_clean_glove.webp";                                 // FOLEY 
import nss from "../assets/img/suction/3_nns.webp";                             // NG
import cotton_bud from "../assets/img/suction/4_5cotton.webp";                  // NG
import ambu_bag from "../assets/img/suction/5_ambubag.webp";
import syring5cc from "../assets/img/suction/6_syring5cc.webp";                 // NG  // FALSE     // FOLEY  // FALSE
import flow_meter from "../assets/img/suction/7_flowmeter.webp";
import chada from "../assets/img/suction/8_chada.webp";
import sterile_water from "../assets/img/suction/9_sterile_water.webp";         // NG  // FALSE     // FOLEY  
import handgel from "../assets/img/suction/10_handgel.webp";                    // NG               // FOLEY
import suction_line from "../assets/img/suction/11_suction_line.webp";
import cotton_ball from "../assets/img/suction/12_5_hard_cotton.webp";          // NG  // FALSE
import stethoscope from "../assets/img/suction/13_stethoscope.webp";            // NG
import kidney_basin from "../assets/img/suction/14_kidney_basin.webp";          // NG               // FOLEY
import glass from "../assets/img/suction/15_glass.webp";                        // NG
import alcohol_70 from "../assets/img/suction/16_70_alcohol.webp";              // NG  // FALSE


////////////////////
//// NG TUBE //////
//////////////////
/// TRUE ///
import acepto_syring from "../assets/img/ng/1_acepto_syring.webp";              // SUCTION  // FALSE
import ng_line from "../assets/img/ng/2_ng_line.webp";                          // SUCTION  // FALSE
import mattress_protector from "../assets/img/ng/4_mattress_protector.webp";     // SUCTION  // FALSE       // FOLEY //FALSE
import tissue from "../assets/img/ng/5_tissue.webp";                            // SUCTION  // FALSE
import tray from "../assets/img/ng/6_tray.webp";                                                            // FOLEY  // FALSE
import flashlight from "../assets/img/ng/7_flashlight.webp";
import ky from "../assets/img/ng/8_ky.webp";                                                                // FOLEY
import micropore from "../assets/img/ng/9_micropore.webp"                                                  // FOLEY  // FALSE


/////////////////////////////
////// FOLEY CATHETER //////
///////////////////////////
/// TRUE ///
import urine_bag from "../assets/img/foley/urine_bag.webp";
import ucs from "../assets/img/foley/UCS.webp";
import fd from "../assets/img/foley/fd.webp";
import needle from "../assets/img/foley/needle.webp";
import syring_10_cc from "../assets/img/foley/syring_10.webp";
import transport from "../assets/img/foley/transport.webp";
import uc from "../assets/img/foley/uc.webp";
import ma from "../assets/img/foley/ma.webp";






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

// ข้อมูลอุปกรณ์สำหรับแต่ละหัตถการ
export const equipmentData = {
    suction: [
        { id: 1, name: "ผ้ารองกันเปื้อน", img: mattress_protector, isCorrect: false },
        { id: 2, name: "ถุงมือ Sterile", img: sterile_glove, isCorrect: true },
        { id: 3, name: "ถุงมือสะอาด", img: clean_glove, isCorrect: true },
        { id: 4, name: "0.9% NSS", img: nss, isCorrect: true },
        { id: 5, name: "ไม้พันสำลี 5 ก้าน", img: cotton_bud, isCorrect: true },
        { id: 6, name: "Ambu Bag", img: ambu_bag, isCorrect: true },
        { id: 7, name: "Syring 5 cc", img: syring5cc, isCorrect: true },
        { id: 8, name: "Acepto Syring", img: acepto_syring, isCorrect: false },
        { id: 9, name: "Flow Meter", img: flow_meter, isCorrect: true },
        { id: 10, name: "ทิชชู่", img: tissue, isCorrect: false },
        { id: 11, name: "Nipple", img: chada, isCorrect: true },
        { id: 12, name: "Sterile water 10 cc", img: sterile_water, isCorrect: true },
        { id: 13, name: "เจลแอลกอฮอล์ล้างมือ", img: handgel, isCorrect: true },
        { id: 14, name: "สาย NG", img: ng_line, isCorrect: false },
        { id: 15, name: "สาย Suction", img: suction_line, isCorrect: true },
        { id: 16, name: "สำลีแห้ง 5 ก้อน", img: cotton_ball, isCorrect: true },
        { id: 17, name: "Stethoscope", img: stethoscope, isCorrect: true },
        { id: 18, name: "ถาดรูปไต", img: kidney_basin, isCorrect: true },
        { id: 19, name: "แก้วน้ำ", img: glass, isCorrect: true },
        { id: 20, name: "70% Alcohol", img: alcohol_70, isCorrect: true }
    ],
    foley_catheter: [
        { id: 1, name: "ถุงมือ Sterile 2 คู่", img: sterile_glove, isCorrect: true },
        { id: 2, name: "ถุงมือสะอาด 1 คู่", img: clean_glove, isCorrect: true },
        { id: 3, name: "Syring 5 CC", img: syring5cc, isCorrect: false },
        { id: 4, name: "น้ำ Sterile", img: sterile_water, isCorrect: true },
        { id: 5, name: "เจลแอลกอฮอล์", img: handgel, isCorrect: true },
        { id: 6, name: "ถาดรูปไต", img: kidney_basin, isCorrect: true },
        { id: 7, name: "ผ้ารองกันเปื้อน", img: mattress_protector, isCorrect: false },
        { id: 8, name: "ถาดสี่เหลี่ยม", img: tray, isCorrect: false },
        { id: 9, name: "เจลหล่อลื่น", img: ky, isCorrect: true },
        { id: 10, name: "Micropore", img: micropore, isCorrect: false },
        { id: 11, name: "Urine Bag", img: urine_bag, isCorrect: true },
        { id: 12, name: "สายสวนปัสสาวะ", img: ucs, isCorrect: true },
        { id: 13, name: "NSS", img: nss, isCorrect: true },
        { id: 14, name: "ผ้าปิดตา", img: fd, isCorrect: true },
        { id: 15, name: "เข็ม", img: needle, isCorrect: true },
        { id: 16, name: "Syring 10 CC", img: syring_10_cc, isCorrect: true },
        { id: 17, name: "ทิชชู่", img: tissue, isCorrect: false },
        { id: 18, name: "Transport", img: transport, isCorrect: true },
        { id: 19, name: "ผ้ายางกันเปื้อน", img: ma, isCorrect: true },
        { id: 20, name: "ชุดสวนปัสสาวะ", img: uc, isCorrect: true },
    ],
    ng_tube: [
        { id: 1, name: "ถุงมือ Sterile", img: sterile_glove, isCorrect: true },
        { id: 2, name: "0.9% NSS", img: nss, isCorrect: true },
        { id: 3, name: "สำลีก้าน", img: cotton_bud, isCorrect: true },
        { id: 4, name: "Syring 5CC", img: syring5cc, isCorrect: false },
        { id: 5, name: "Sterile water 10 CC", img: sterile_water, isCorrect: false },
        { id: 6, name: "เจลแอลกอฮอล์ล้างมือ", img: handgel, isCorrect: true },
        { id: 7, name: "สำลีก้อน", img: cotton_ball, isCorrect: false },
        { id: 8, name: "Stethoscope", img: stethoscope, isCorrect: true },
        { id: 9, name: "ชามรูปใต", img: kidney_basin, isCorrect: true },
        { id: 10, name: "แก้วน้ำ 2 แก้ว", img: glass, isCorrect: true },
        { id: 11, name: "70% alcohol", img: alcohol_70, isCorrect: false },
        { id: 12, name: "Acepto Syring", img: acepto_syring, isCorrect: true },
        { id: 13, name: "สาย NG", img: ng_line, isCorrect: true },
        { id: 14, name: "ผ้ารองกันเปื้อน", img: mattress_protector, isCorrect: true },
        { id: 15, name: "ทิชชู่", img: tissue, isCorrect: true },
        { id: 16, name: "ถาดสี่เหลี่ยม", img: tray, isCorrect: true },
        { id: 17, name: "ไฟฉาย", img: flashlight, isCorrect: true },
        { id: 18, name: "เจลหล่อลื่น", img: ky, isCorrect: true },
        { id: 19, name: "Micropore", img: micropore, isCorrect: true },                 // Foley  // False
        { id: 20, name: "Urine Bag", img: urine_bag, isCorrect: false }
    ]
};

export const sequenceData = {
    suction: [
        { id: 1, text: "ตรวจสอบแผนการรักษา" },
        { id: 2, text: "แนะนำตัว ตรวจสอบชื่อผู้รับบริการ และบอกวัตถุประสงค์ของการดูดเสมหะ" },
        { id: 3, text: "เตรียมอุปกรณ์ดูดเสมหะ เทน้ำสะอาดใส่แก้ว และเตรียมอุปกรณ์ทำความสะอาดปาก (ไม้พันสำลีชุบ NSS, น้ำสะอาด, Syring, ชามรูปไต) สำลีชุบแอลกอฮอร์ 5 ก้อน ให้กับผู้ช่วยเหลือ" },
        { id: 4, text: "จัดสิ่งแวดล้อมและกั้นม่าน" },
        { id: 5, text: "จัดท่าผู้ป่วยให้นอนหงายศีรษะสูงเล็กน้อย" },
        { id: 6, text: "ล้างมือให้สะอาดทั้งผู้ดูดเสมหะและผู้ช่วย" },
        { id: 7, text: "ฟังเสียงปอดเพื่อประเมินคนไข้" },
        { id: 8, text: "สวมถุงมือสะอาด และต่อสาย Suction" },
        { id: 9, text: "ผู้ดูดเสมหะเปิดเครื่อง Suction และปรับแรงดันให้เหมาะสมกับผู้ป่วย" },
        { id: 10, text: "ดูดเสมหะในปากและทำความสะอาดปาก (Mouts care)" },
        { id: 11, text: "ถอดถุงมือและสาย Suction ทิ้งลงในถังขยะติดเชื้อ (Open suction)" },
        { id: 12, text: "ผู้ดูดเสมหะสวมถุงมือ Sterile ข้างที่ถนัด ยื่นซองถุงมือให้ผู้ช่วย และให้ผู้ช่วยเหลือเปิดซองสาย Suction" },
        { id: 13, text: "ผู้ดูดเสมหะหยิบสาย Suction ออกมาต่อกับสายเครื่อง Suction และปรับแรงดันให้เหมาะสมกับผู้ป่วย" },
        { id: 14, text: "ผู้ช่วยเหลือต่อสายออกซิเจนเข้ากับ Ambu bag ปรับอัตราการไหล 10 ลิตร/นาที" },
        { id: 15, text: "ผู้ช่วยเหลือปลดข้อต่อเครื่องช่วยหายใจออกจากท่อทางเดินหายใจเทียม" },
        { id: 16, text: "ผู้ช่วยเหลือใช้สำลีแอลกอฮอร์เช็ดรอบๆ ปลายท่อทางเดินหายใจเทียมครั้งที่ 1" },
        { id: 17, text: "ผู้ช่วยเหลือใช้สำลีแอลกอฮอร์เช็ดรอบๆ Ambu bag" },
        { id: 18, text: "เริ่มดูดเสมหะ ใส่สาย Suction เข้าไปในท่อทางเดินหายใจเทียมอย่างนุ่มนวลตามความลึกที่เหมาะสม" },
        { id: 19, text: "ปล่อยมือที่หักสายหรือปิดรูข้อต่อสาย Suction เพื่อดูดเสมหะออกมา ในขณะเดียวกันให้หมุนสาย Suction และถอยออกมาเรื่อยๆ ดูดแต่ละครั้งประมาณ 10 – 15 วินาที" },
        { id: 20, text: "หลังจากดูดเสมหะแต่ละครั้ง ให้ผู้ช่วยเหลือบีบ Ambu bag 4 - 5 ครั้ง" },
        { id: 21, text: "หลังจากทางเดินหายใจโล่งแล้ว ให้ล้างสาย Suction ในน้ำสะอาดที่เตรียมไว้" },
        { id: 22, text: "ผู้ช่วยเหลือใช้สำลีแอลกอฮอร์เช็ดรอบๆ ปลายท่อทางเดินหายใจเทียมครั้งที่ 2" },
        { id: 23, text: "ผู้ช่วยเหลือใช้สำลีแอลกอฮอร์เช็ดรอบๆ ปลายข้อต่อเครื่องช่วยหายใจ" },
        { id: 24, text: "ต่อเครื่องช่วยหายใจกับท่อทางเดินหายใจเทียม และสังเกตการทำงานของเครื่องช่วยหายใจ" },
        { id: 25, text: "ผู้ช่วยเหลือใช้สำลีเช็ดข้อต่อของ Ambu bag ปิดออกซิเจนและเก็บอุปกรณ์" },
        { id: 26, text: "ฟังเสียงปอดเพื่อประเมินคนไข้ จัดท่าคนไข้ให้สุขสบาย" },
        { id: 27, text: "เก็บอุปกรณ์และล้างมือให้สะอาด" }
    ],
    foley_catheter: [

    ],
    ng_tube: [

    ]

}

export const quizData = {
    suction: [
        { id: 1, question: "[Mock] ข้อใดคือวัตถุประสงค์หลักของการดูดเสมหะ (Suction)?", options: ["เพื่อเพิ่มความชุ่มชื้นในทางเดินหายใจ", "เพื่อนำเสมหะออกจากทางเดินหายใจ", "เพื่อขยายหลอดลม", "เพื่อลดอาการเจ็บคอ"], correctAnswer: 1 },
        { id: 2, question: "[Mock] แรงดันที่เหมาะสมในการดูดเสมหะสำหรับผู้ใหญ่คือเท่าใด?", options: ["50 - 80 mmHg", "80 - 100 mmHg", "100 - 120 mmHg", "120 - 150 mmHg"], correctAnswer: 2 },
        { id: 3, question: "[Mock] ระยะเวลาในการดูดเสมหะแต่ละครั้ง ไม่ควรเกินกี่วินาที?", options: ["5 - 10 วินาที", "10 - 15 วินาที", "15 - 20 วินาที", "20 - 30 วินาที"], correctAnswer: 1 },
        { id: 4, question: "[Mock] ข้อใดคือภาวะแทรกซ้อนที่อาจเกิดขึ้นได้จากการดูดเสมหะผิดวิธี?", options: ["ภาวะออกซิเจนในเลือดต่ำ (Hypoxia)", "เยื่อบุทางเดินหายใจได้รับบาดเจ็บ", "หัวใจเต้นผิดจังหวะ", "ถูกทุกข้อ"], correctAnswer: 3 },
        { id: 5, question: "[Mock] อุปกรณ์ใดที่ไม่จำเป็นต้องใช้แบบปราศจากเชื้อ (Sterile) ในการทำ Open Suction?", options: ["สาย Suction", "ถุงมือข้างที่จับสาย Suction", "น้ำหล่อลื่นหรือ NSS สำหรับล้างสาย", "ถุงมือข้างที่จับสายต่อเครื่อง Suction"], correctAnswer: 3 }
    ],
    foley_catheter: [
        { id: 1, question: "[Mock] การสวนปัสสาวะ (Foley Catheter) ข้อใดกล่าวถูกต้องที่สุด?", options: ["ทำเพื่อลดไข้", "ทำเพื่อระบายน้ำปัสสาวะออกจากกระเพาะปัสสาวะ", "ทำเพื่อเก็บตัวอย่างอุจจาระ", "ทำเพื่อล้างไต"], correctAnswer: 1 },
        { id: 2, question: "[Mock] ท่าที่เหมาะสมสำหรับผู้ป่วยหญิงในการสวนปัสสาวะคือท่าใด?", options: ["ท่านอนตะแคงซ้าย", "ท่านอนคว่ำ", "ท่านอนหงายชันเข่าแยกขา (Dorsal recumbent)", "ท่านอนหงายราบ"], correctAnswer: 2 },
        { id: 3, question: "[Mock] สารน้ำที่ใช้ในการ Blossom balloon ของสายสวนปัสสาวะคืออะไร?", options: ["0.9% NSS", "Sterile water", "Tap water", "Alcohol 70%"], correctAnswer: 1 },
        { id: 4, question: "[Mock] หลักการทำความสะอาดอวัยวะสืบพันธุ์ก่อนสวนปัสสาวะ ควรเช็ดอย่างไร?", options: ["เช็ดจากล่างขึ้นบน", "เช็ดจากบนลงล่างตามแนวตรงกลางแล้วค่อยเช็ดด้านข้าง", "เช็ดวนเป็นวงกลม", "เช็ดจากด้านข้างเข้าหาตรงกลาง"], correctAnswer: 1 },
        { id: 5, question: "[Mock] ข้อใดคือข้อห้าม (Contraindication) ของการสวนปัสสาวะทางท่อปัสสาวะ?", options: ["มีแผลไฟไหม้บริเวณหน้าท้อง", "สงสัยว่ามีท่อปัสสาวะฉีกขาด", "มีไข้สูง", "กระเพาะปัสสาวะอักเสบ"], correctAnswer: 1 }
    ],
    ng_tube: [
        { id: 1, question: "[Mock] วัตถุประสงค์ของการใส่สายยางให้อาหารทางจมูก (NG Tube) คืออะไร?", options: ["เพื่อให้สารน้ำทางหลอดเลือด", "เพื่อให้ผู้ป่วยหายใจได้ดีขึ้น", "เพื่อให้อาหารและยาแก่ผู้ป่วยที่ไม่สามารถรับประทานทางปากได้", "เพื่อระบายเสมหะออกจากกระเพาะ"], correctAnswer: 2 },
        { id: 2, question: "[Mock] การวัดความยาวของสาย NG Tube ควรวัดอย่างไร?", options: ["จากปลายจมูกถึงติ่งหู แล้วจากติ่งหูถึงปลายกระดูกลิ้นปี่ (Xiphoid process)", "จากหน้าผากถึงสะดือ", "จากปลายคางถึงลิ้นปี่", "จากปลายจมูกถึงสะดือ"], correctAnswer: 0 },
        { id: 3, question: "[Mock] ท่านอนที่เหมาะสมในการใส่สาย NG Tube คือท่าใด?", options: ["ท่านอนศีรษะสูง 15-30 องศา", "ท่านอนศีรษะสูง 45-90 องศา (Fowler's position)", "ท่านอนราบ", "ท่านอนตะแคงขวา"], correctAnswer: 1 },
        { id: 4, question: "[Mock] วิธีทดสอบว่าสาย NG Tube อยู่ในกระเพาะอาหารอย่างถูกต้องคือวิธีใด?", options: ["ดูด content ออกมาทดสอบค่า pH", "ดันลมเข้าไปแล้วฟังเสียงด้วย Stethoscope ที่บริเวณกระเพาะอาหาร", "เอาปลายสายจุ่มน้ำแล้วดูฟองอากาศ (ถ้ามีฟองแปลว่าอยู่ในหลอดลม)", "ถูกต้องทุกข้อ"], correctAnswer: 3 },
        { id: 5, question: "[Mock] หากขณะใส่สาย NG Tube ผู้ป่วยมีอาการไออย่างรุนแรง หน้าเขียว ควรทำอย่างไร?", options: ["ดันสายเข้าไปให้เร็วขึ้น", "หยุดพักชั่วคราวแล้วให้ผู้ป่วยกลืนน้ำ", "ถอดสายออกทันที", "ปรับท่าผู้ป่วยให้นอนราบ"], correctAnswer: 2 }
    ]
};