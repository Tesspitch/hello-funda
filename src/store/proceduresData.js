

import ngIcon from '../assets/icons/ng.svg';
import suctionIcon from '../assets/icons/suction.svg';
import foleyIcon from '../assets/icons/foley.svg';

export const proceduresMetaData = [
    {
        id: "suction",
        num: 1,
        icon: suctionIcon,
        name: "Suction",
        nameTh: "การดูดเสมหะ",
        desc: "ฝึกการดูแลทางเดินหายใจโดยการดูดเสมหะอย่างถูกต้องและปลอดภัย",
        color: "#4A90E2",
        bgLight: "#eff6ff",
        videos: [
            { title: "Open Suction", path: "https://youtu.be/76CmfJXWC3s" },
            { title: "Mouth care", path: "https://youtu.be/gSbmR71O2LY" }
        ]
    },
    {
        id: "ng_tube",
        num: 2,
        icon: ngIcon,
        name: "NG Tube",
        nameTh: "การใส่สายยางให้อาหารทางจมูก",
        desc: "ฝึกการใส่สายยางให้อาหารทางจมูกอย่างถูกต้องและปลอดภัย",
        color: "#48BB78",
        bgLight: "#f0fdf4",
        videos: [
            { title: "NG Tube", path: "https://youtu.be/L9q_c6M6bdQ" }
        ]
    },
    {
        id: "foley_catheter",
        num: 3,
        icon: foleyIcon,
        name: "Foley Catheter",
        nameTh: "การใส่สายสวนปัสสาวะ",
        desc: "ฝึกการใส่สายสวนปัสสาวะโดยใช้สายสวนปัสสาวะอย่างถูกต้องและปลอดภัย",
        color: "#F56565",
        bgLight: "#fef2f2",
        videos: [
            { title: "Foley Catheter", path: "https://youtu.be/aH6QjJwSdrI" }
        ]
    },
];

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
import clean_water from "../assets/img/suction/clean_water.webp"


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
import savlon from "../assets/img/foley/savlon.webp"






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

// ข้อมูลชื่ออุปกรณ์กลาง เพื่อให้แก้ไขที่เดียว
export const EQUIPMENT_NAMES = {
    MATTRESS_PROTECTOR: "ผ้ารองกันเปื้อน",
    STERILE_GLOVE: "ถุงมือ Sterile 1 คู่",
    STERILE_GLOVE_2_PAIRS: "ถุงมือ Sterile 2 คู่",
    CLEAN_GLOVE: "ถุงมือสะอาด 2 คู่",
    CLEAN_GLOVE_1_PAIR: "ถุงมือสะอาด 1 คู่",
    NSS_09: "0.9% NSS",
    NSS: "0.9% NSS",
    COTTON_BUD: "ไม้พันสำลี 5 ก้าน",
    AMBU_BAG: "Ambu Bag และ สาย",
    SYRINGE_5CC: "Syringe 5 cc",
    SYRINGE: "Syringe",
    ACEPTO_SYRINGE: "Acepto Syringe",
    FLOW_METER: "Flow Meter",
    TISSUE: "ทิชชู่",
    NIPPLE: "Nipple",
    STERILE_WATER_10CC: "Sterile water 10 cc",
    CLEAN_WATER: "น้ำสะอาด",
    HAND_GEL_WASH: "เจลแอลกอฮอล์ล้างมือ",
    NG_LINE: "สาย NG",
    SUCTION_LINE: "สาย Suction 2 สาย",
    COTTON_BALL_5: "สำลีแห้ง 5 ก้อน",
    STETHOSCOPE: "Stethoscope",
    KIDNEY_BASIN: "ชามรูปไต",
    GLASS: "แก้วน้ำ 1 แก้ว",
    GLASS_2: "แก้วน้ำ 2 แก้ว",
    ALCOHOL_70: "70% Alcohol",
    TRAY: "ถาดสี่เหลี่ยม",
    KY_JELLY: "KY Jelly",
    MICROPORE: "Micropore",
    URINE_BAG: "Urine Bag",
    EYE_PAD: "ผ้าปิดตา",
    NEEDLE: "เข็มเบอร์ 18",
    SYRINGE_10CC: "Syringe 10 cc",
    TRANSPORT: "Transpor",
    RUBBER_APRON: "ผ้ายางกันเปื้อน",
    URINE_CATHETER_LINE: "สายสวนปัสสาวะ",
    URINE_CATHETER_SET: "ชุดสวนปัสสาวะ",
    FLASHLIGHT: "ไฟฉาย",
    SAVLOC: "น้ำยาทำความสะอาด"
};

// ข้อมูลอุปกรณ์สำหรับแต่ละหัตถการ
export const equipmentData = {
    suction: [
        { id: 1, name: EQUIPMENT_NAMES.MATTRESS_PROTECTOR, img: mattress_protector, isCorrect: false },
        { id: 2, name: EQUIPMENT_NAMES.STERILE_GLOVE, img: sterile_glove, isCorrect: true },  //
        { id: 3, name: EQUIPMENT_NAMES.CLEAN_GLOVE, img: clean_glove, isCorrect: true },   // 
        { id: 4, name: EQUIPMENT_NAMES.NSS_09, img: nss, isCorrect: true },  //
        { id: 5, name: EQUIPMENT_NAMES.COTTON_BUD, img: cotton_bud, isCorrect: true },  //
        { id: 6, name: EQUIPMENT_NAMES.AMBU_BAG, img: ambu_bag, isCorrect: true },   //
        { id: 7, name: EQUIPMENT_NAMES.SYRINGE_5CC, img: syring5cc, isCorrect: true },  //
        { id: 8, name: EQUIPMENT_NAMES.ACEPTO_SYRINGE, img: acepto_syring, isCorrect: false },
        { id: 9, name: EQUIPMENT_NAMES.FLOW_METER, img: flow_meter, isCorrect: true },  //
        { id: 10, name: EQUIPMENT_NAMES.TISSUE, img: tissue, isCorrect: false },
        { id: 11, name: EQUIPMENT_NAMES.NIPPLE, img: chada, isCorrect: true },
        { id: 12, name: EQUIPMENT_NAMES.CLEAN_WATER, img: clean_water, isCorrect: true },  //
        { id: 13, name: EQUIPMENT_NAMES.HAND_GEL_WASH, img: handgel, isCorrect: true },  // 
        { id: 14, name: EQUIPMENT_NAMES.NG_LINE, img: ng_line, isCorrect: false },
        { id: 15, name: EQUIPMENT_NAMES.SUCTION_LINE, img: suction_line, isCorrect: true },  //
        { id: 16, name: EQUIPMENT_NAMES.COTTON_BALL_5, img: cotton_ball, isCorrect: true },  //
        { id: 17, name: EQUIPMENT_NAMES.STETHOSCOPE, img: stethoscope, isCorrect: true },  //
        { id: 18, name: EQUIPMENT_NAMES.KIDNEY_BASIN, img: kidney_basin, isCorrect: true }, //
        { id: 19, name: EQUIPMENT_NAMES.GLASS, img: glass, isCorrect: true },  //
        { id: 20, name: EQUIPMENT_NAMES.ALCOHOL_70, img: alcohol_70, isCorrect: true }  //
    ],
    foley_catheter: [
        { id: 1, name: EQUIPMENT_NAMES.STERILE_GLOVE_2_PAIRS, img: sterile_glove, isCorrect: true },  //
        { id: 2, name: EQUIPMENT_NAMES.CLEAN_GLOVE_1_PAIR, img: clean_glove, isCorrect: true },   //
        { id: 3, name: EQUIPMENT_NAMES.SYRINGE_5CC, img: syring5cc, isCorrect: false },
        { id: 4, name: EQUIPMENT_NAMES.STERILE_WATER_10CC, img: sterile_water, isCorrect: true },    //
        { id: 5, name: EQUIPMENT_NAMES.HAND_GEL_WASH, img: handgel, isCorrect: true },    //
        { id: 6, name: EQUIPMENT_NAMES.KIDNEY_BASIN, img: kidney_basin, isCorrect: true },   //
        { id: 7, name: EQUIPMENT_NAMES.MATTRESS_PROTECTOR, img: mattress_protector, isCorrect: false },
        { id: 8, name: EQUIPMENT_NAMES.TRAY, img: tray, isCorrect: false },
        { id: 9, name: EQUIPMENT_NAMES.KY_JELLY, img: ky, isCorrect: true },  //
        { id: 10, name: EQUIPMENT_NAMES.MICROPORE, img: micropore, isCorrect: false },
        { id: 11, name: EQUIPMENT_NAMES.URINE_BAG, img: urine_bag, isCorrect: true },
        { id: 12, name: EQUIPMENT_NAMES.NSS, img: nss, isCorrect: false },
        { id: 13, name: EQUIPMENT_NAMES.EYE_PAD, img: fd, isCorrect: true },
        { id: 14, name: EQUIPMENT_NAMES.NEEDLE, img: needle, isCorrect: true },
        { id: 15, name: EQUIPMENT_NAMES.SYRINGE_10CC, img: syring_10_cc, isCorrect: true },
        { id: 16, name: EQUIPMENT_NAMES.TISSUE, img: tissue, isCorrect: false },
        { id: 17, name: EQUIPMENT_NAMES.TRANSPORT, img: transport, isCorrect: true },
        { id: 18, name: EQUIPMENT_NAMES.RUBBER_APRON, img: ma, isCorrect: true },
        { id: 19, name: EQUIPMENT_NAMES.URINE_CATHETER_LINE, img: uc, isCorrect: true },
        { id: 20, name: EQUIPMENT_NAMES.SAVLOC, img: savlon, isCorrect: true },
        { id: 21, name: EQUIPMENT_NAMES.URINE_CATHETER_SET, img: ucs, isCorrect: true }
    ],
    ng_tube: [
        { id: 1, name: EQUIPMENT_NAMES.STERILE_GLOVE, img: sterile_glove, isCorrect: true },
        { id: 2, name: EQUIPMENT_NAMES.NSS_09, img: nss, isCorrect: true },
        { id: 3, name: EQUIPMENT_NAMES.COTTON_BUD, img: cotton_bud, isCorrect: true },
        { id: 4, name: EQUIPMENT_NAMES.SYRINGE_5CC, img: syring5cc, isCorrect: false },
        { id: 5, name: EQUIPMENT_NAMES.STERILE_WATER_10CC, img: sterile_water, isCorrect: false },
        { id: 6, name: EQUIPMENT_NAMES.HAND_GEL_WASH, img: handgel, isCorrect: true },
        { id: 7, name: EQUIPMENT_NAMES.COTTON_BALL_5, img: cotton_ball, isCorrect: false },
        { id: 8, name: EQUIPMENT_NAMES.STETHOSCOPE, img: stethoscope, isCorrect: true },
        { id: 9, name: EQUIPMENT_NAMES.KIDNEY_BASIN, img: kidney_basin, isCorrect: true },
        { id: 10, name: EQUIPMENT_NAMES.GLASS_2, img: glass, isCorrect: true },
        { id: 11, name: EQUIPMENT_NAMES.ALCOHOL_70, img: alcohol_70, isCorrect: false },
        { id: 12, name: EQUIPMENT_NAMES.ACEPTO_SYRINGE, img: acepto_syring, isCorrect: true },
        { id: 13, name: EQUIPMENT_NAMES.NG_LINE, img: ng_line, isCorrect: true },
        { id: 14, name: EQUIPMENT_NAMES.MATTRESS_PROTECTOR, img: mattress_protector, isCorrect: true },
        { id: 15, name: EQUIPMENT_NAMES.TISSUE, img: tissue, isCorrect: true },
        { id: 16, name: EQUIPMENT_NAMES.TRAY, img: tray, isCorrect: true },
        { id: 17, name: EQUIPMENT_NAMES.FLASHLIGHT, img: flashlight, isCorrect: true },
        { id: 18, name: EQUIPMENT_NAMES.KY_JELLY, img: ky, isCorrect: true },
        { id: 19, name: EQUIPMENT_NAMES.MICROPORE, img: micropore, isCorrect: true },
        { id: 20, name: EQUIPMENT_NAMES.URINE_BAG, img: urine_bag, isCorrect: false }
    ]
};

export const sequenceData = {
    suction: [
        {
            partName: "Part 1 Mouth Care",
            steps: [
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
                { id: 11, text: "ถอดถุงมือและสาย Suction ทิ้งลงในถังขยะติดเชื้อ" }
            ]
        },
        {
            partName: "Part 2 Open Suction",
            steps: [
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
            ]
        }
    ],
    foley_catheter: [
        {
            partName: "Part 1 เตรียมการใส่สายสวนปัสสาวะ",
            steps: [
                { id: 1, text: "ตรวจสอบแผนการรักษา" },
                { id: 2, text: "แนะนำตัว ตรวจสอบชื่อผู้รับบริการ และบอกวัตถุประสงค์ของการใส่สายสวนปัสสาวะ" },
                { id: 3, text: "ล้างมือให้สะอาด" },
                { id: 4, text: "เตรียมอุปกรณ์ให้ครบถ้วน" },
                { id: 5, text: "จัดสิ่งแวดล้อมและกั้นม่าน" },
                { id: 6, text: "จัดท่าเพศหญิง ท่า dorsal recumbent position" },
                { id: 7, text: "วางชุดสวนปัสสาวะไว้ปลายเตียงระหว่างขาผู้รับบริการ" },
                { id: 8, text: "วางชามรูปไตหรือถุงสำหรับทิ้งขยะไว้ข้างเท้าผู้รับบริการ โดยไม่อยู่ในตำแหน่งที่ข้ามบริเวณสะอาด" },
                { id: 9, text: "เปิดชุดสวนปัสสาวะ" },
                { id: 10, text: "รินน้ำยาทำความสะอาดลงในถ้วยที่บรรจุสำลีสำหรับชำระ และแบ่งสำลีไว้ 1 ก้อนในขันรองรับน้ำปัสสาวะ" },
                { id: 11, text: "สวมถุงมือปราศจากเชื้อ คู่ที่ 1" },
                { id: 12, text: "ทำความสะอาดอวัยวะสืบพันธุ์" },
                { id: 13, text: "สำลีชุบน้ำยาทำความสะอาด เช็ดบริเวณหัวหน่าวขึ้นไปหน้าท้องโดยเช็ดไปในทิศทางเดียว" },
                { id: 14, text: "สำลีชุบน้ำยาทำความสะอาด เช็ดบริเวณ Labia majora ด้านไกลตัว ไปทางต้นขา" },
                { id: 15, text: "สำลีชุบน้ำยาทำความสะอาด เช็ดบริเวณ Labia majora ด้านใกล้ตัว ไปทางต้นขา" },
                { id: 16, text: "สำลีชุบน้ำยาทำความสะอาด เช็ดบริเวณ Labia minora ด้านไกลตัว โดยเช็ดจากบนลงล่าง" },
                { id: 17, text: "สำลีชุบน้ำยาทำความสะอาด เช็ดบริเวณ Labia minora ด้านใกล้ตัว โดยเช็ดจากบนลงล่าง" },
                { id: 18, text: "สำลีชุบน้ำยาทำความสะอาด เช็ดผ่านคลิตอริส-รูเปิดท่อปัสสาวะ-ช่องคลอด-ทวารหนัก โดยใช้มือข้างที่ไม่ถนัดแหวกแคมเล็กจึงจะเห็นรูเปิดท่อปัสสาวะ" },
                { id: 19, text: "ยกถ้วยปัสสาวะออกมาวางไว้นอกบริเวณชุดสวน และถอดถุงมือทิ้ง" }

            ]
        },
        {
            partName: "Part 2 ใส่สายสวนปัสสาวะ",
            steps: [
                { id: 20, text: "บีบสารหล่อลื่นไว้บนก๊อส เปิดสายสวนปัสสาวะ ถุงรองรับน้ำปัสสาวะ ไว้ในชุดด้วยวิธีปราศจากเชื้อ" },
                { id: 21, text: "นำ Syring ที่บรรจุ sterile water 10 cc วางไว้บริเวณปลายผ้าชุดสวนให้ห่างจากอุปกรณ์อื่นๆ เพื่อป้องกันการปนเปื้อนเชื้อ" },
                { id: 22, text: "สวมถุงมือปราศจากเชื้อ คู่ที่ 2" },
                { id: 23, text: "หล่อลื่นสายสวนด้วย K-Y jelly และนำสายสวนที่หล่อลื่นแล้ววางไว้ในขันที่รองรับน้ำปัสสาวะ" },
                { id: 24, text: "คลี่ผ้าสี่เหลี่ยมเจาะกลางคลุมลงบนอวัยวะสืบพันธุ์ภายนอก" },
                { id: 25, text: "ใช้มือข้างที่ไม่ถนัดแหวกแคมเล็ก ใช้มือข้างที่ถนัดจับสำลีก้อนที่แยกไว้ในขันรองรับปัสสาวะเช็ดบริเวณรูเปิดท่อปัสสาวะ" },
                { id: 26, text: "ใช้มือข้างที่ถนัดหยิบสายสวน โดยหันปลายด้านมนพร้อมที่จะสอดเข้าไปในท่อปัสสาวะ" },
                { id: 27, text: "ก่อนใส่สายให้บอกผู้รับบริการให้ผ่อนคลายโดยหายใจเข้าออกลึกๆ ช้าๆ แล้วค่อยๆ ดันสายสวนเข้าไปอย่างนุ่มนวล" },
                { id: 28, text: "ใช้ Syring ที่บรรจุน้ำกลั่นปราศจากเชื้อ 10 มิลลิลิตร ปลดหัวเข็มออกแล้วใส่เข้าไปในสายสวนหางที่มีท่อเล็กๆ อยู่หลังจากนั้นดึงสายสวนกลับเบาๆจนรู้สึกว่าตึงมือ" }
            ]
        },
        {
            partName: "Part 3 หลังการใส่สายสวนปัสสาวะ",
            steps: [
                { id: 29, text: "ติดพลาสเตอร์ทรานสปอร์ยึดตรงสายสวนบริเวณหน้าท้อง (เพศหญิง)" },
                { id: 30, text: "ดูแลสายสวนไม่ให้หักพับ และแขวนถุงรองรับน้ำปัสสาวะไว้ต่ำกว่าระดับกระเพาะปัสสาวะ" },
                { id: 31, text: "ถอดถุงมือที่ใช้สวนปัสสาวะออก" },
                { id: 32, text: "ใส่ถุงมือสะอาดและเก็บอุปกรณ์ออกจากเตียง จากนั้นถอดถุงมือ" },
                { id: 33, text: "เปิดตา และจัดท่าให้ผู้รับบริการรู้สึกสุขสบาย พร้อมทั้งสอบถามความรู้สึกของผู้รับบริการ" },
                { id: 34, text: "เก็บอุปกรณ์ทั้งหมดเพื่อทำความสะอาด และล้างมือ" },
                { id: 35, text: "บันทึกขนาดและชนิดของสายสวน และปริมาณน้ำที่โป่งบอลลูน การสวนปัสสาวะ ความรู้สึกของผู้รับบริการ ปริมาณและลักษณะของปัสสาวะ ลงชื่อผู้ใส่สายสวน และวันที่ใส่" }
            ]
        }
    ],
    ng_tube: [
        {
            partName: "Part 1 ก่อนใส่สาย",
            steps: [
                { id: 1, text: "ตรวจสอบคำสั่งการรักษา" },
                { id: 2, text: "แนะนำตัว ตรวจสอบชื่อผู้รับบริการ และอธิบายหลักการ เหตุผลในการใส่สายให้อาหารทางสายยาง พร้อมให้โอกาสซักถาม" },
                { id: 3, text: "ล้างมือก่อนเตรียมอุปกรณ์" },
                { id: 4, text: "นำอุปกรณ์ที่เตรียมไว้ที่โต๊ะข้างเตียง หรือ Overbed พร้อมเข้าหาผู้ป่วยด้านที่ถนัด" },
                { id: 5, text: "จัดสิ่งแวดล้อมและกั้นม่าน" },
                { id: 6, text: "จัดท่าให้ผู้ป่วยนอนศีรษะสูง High fowler position" },
                { id: 7, text: "ปูผ้ากันเปื้อนบริเวณอกและวางกระดาษชำระไว้บริเวณไหล่หรือมือของผู้รับบริการ" },
                { id: 8, text: "ตรวจสอบรูจมูกที่ต้องการใส่สาย" },
                { id: 9, text: "ใช้ไม้พันสำลีชุบ 0.9% ทำความสะอาดรูจมูก" },

            ]
        },
        {
            partName: "Part 2 ขั้นตอนใส่สาย",
            steps: [
                { id: 10, text: "ตัดพลาสเตอร์สำหรับยึดสายและ Mark สาย" },
                { id: 11, text: "เปิด Asepto syringe set" },
                { id: 12, text: "แกะ Guaze และสาย NG ลงใน Set Asepto syringe" },
                { id: 13, text: "บีบ KY jelly ใส่ใน Guaze" },
                { id: 14, text: "สวมถุงมือปราศจากเชื้อ (sterile) และเตรียม Asepto syringe ให้พร้อมใช้งาน" },
                { id: 15, text: "วัดตำแหน่งของสาย NG แบบ NEX พร้อมจำตำแหน่งหรือทำเครื่องหมายไว้โดยใช้ Micropore" },
                { id: 16, text: "หล่อลื่นสายจากปลายสายขึ้นมา 2-4 นิ้ว" },
                { id: 17, text: "ค่อยๆใส่สาย NG เข้าทางจมูก เบาๆช้าๆ ดันเข้าตามจังหวะการกลืน พร้อมให้ผู้ป่วยจิบน้ำขณะกลืน" },
                { id: 18, text: "หลังจากที่ผู้ป่วยเกิด Gag reflex ให้ผู้ป่วยก้มหน้าลงเล็กน้อยแล้วค่อยๆดันสายจนถึงตำแหน่งที่ระบุไว้" },

            ]
        },
        {
            partName: "Part 3 หลังใส่สาย",
            steps: [
                { id: 19, text: "ตรวจสอบสายโดยการเอาปลายสายจุ่มแก้วน้ำ หรือใช้ Asepto syringe ดันลมเข้าไป 10 cc พร้อมใช้ Stethoscopes ฟังเสียงบริเวณกระเพาะอาหาร" },
                { id: 20, text: "ใช้ Micropore ยึดสายไว้บริเวณจมูก" },
                { id: 21, text: "เก็บอุปกรณ์ให้เรียบร้อย" }
            ]
        }
    ]

}

export const quizData = {
    suction: [
        {
            id: 1, question: "ข้อใดเป็นข้อบ่งชี้ที่เหมาะสมที่สุดในการทำ Open suction ?",
            options: [
                "ผู้ป่วยมีเสมหะเล็กน้อย แต่สามารถไอขับเสมหะได้เอง",
                "ผู้ป่วยมีค่า SpO₂ ปกติ และไม่มีเสียงครืดคราดในทางเดินหายใจ",
                "ผู้ป่วยต้องการดูดเสมหะเพราะรู้สึกไม่สบายคอ",
                "ได้ยินเสียงเสมหะในทางเดินหายใจ ร่วมกับผู้ป่วยไอขับเสมหะไม่ได้"
            ],
            correctAnswer: 3
        },
        {
            id: 2, question: "ก่อนทำการดูดเสมหะ พยาบาลควรปฏิบัติสิ่งใดเป็นอันดับแรก ?",
            options: [
                "เริ่มดูดเสมหะทันที",
                "ประเมินผู้ป่วยและอธิบายวัตถุประสงค์",
                "ให้ผู้ป่วยรับประทานน้ำ",
                "จัดท่าผู้ป่วย"
            ],
            correctAnswer: 1
        },
        {
            id: 3, question: "ขณะสอดสายดูดเสมหะควรทำอย่างไร ?",
            options: [
                "เปิดแรงดูดตลอดเวลา",
                "สอดสายโดยไม่เปิดแรงดูด",
                "หมุนสายขณะสอดเข้า",
                "สอดสายพร้อมดูดเสมหะทันที"
            ],
            correctAnswer: 1
        },
        {
            id: 4, question: "ระยะเวลาที่เหมาะสมในการดูดเสมหะแต่ละครั้งคือข้อใด ?",
            options: [
                "ไม่เกิน 10–15 วินาที",
                "20–30 วินาที",
                "30–45 วินาที",
                "1 นาที"
            ],
            correctAnswer: 0
        },
        {
            id: 5, question: "หากผู้ป่วยมีค่า SpO₂ ลดลงมากระหว่างดูดเสมหะ พยาบาลควรทำอย่างไร ?",
            options: [
                "หยุดการดูดเสมหะทันที และให้ออกซิเจนแก่ผู้ป่วยก่อนประเมินอาการซ้ำ",
                "เพิ่มแรงดันของเครื่องดูดเสมหะเพื่อดูดเสมหะให้หมดเร็วขึ้น",
                "ดูดเสมหะต่อจนเสร็จ แล้วจึงให้ออกซิเจนแก่ผู้ป่วย",
                "ล้างสายดูดเสมหะด้วยน้ำกลั่นปลอดเชื้อก่อนดำเนินการต่อ"
            ],
            correctAnswer: 0
        },
        {
            id: 6, question: "การดูดเสมหะ (Open  suction) ในผู้ใหญ่ ควรใช้แรงดันของเครื่องดูดเสมหะประมาณเท่าใด ?",
            options: [
                "80–120 mmHg",
                "150–200 mmHg",
                "220–250 mmHg",
                "250–300 mmHg"
            ],
            correctAnswer: 0
        },
        {
            id: 7, question: "ขณะทำ Open suction ในผู้ป่วยที่ใช้เครื่องช่วยหายใจ เหตุผลสำคัญที่ต้องให้ออกซิเจน 100% ก่อนทำหัตถการคือข้อใด ?",
            options: [
                "ลดการเกิดภาวะหัวใจเต้นช้า",
                "เพิ่มประสิทธิภาพการขับเสมหะ",
                "ลดความเสี่ยงต่อภาวะพร่องออกซิเจนระหว่างการดูดเสมหะ",
                "ลดการระคายเคืองของเยื่อบุหลอดลม"
            ],
            correctAnswer: 2
        },
        {
            id: 8, question: "ผู้ป่วยใส่ท่อช่วยหายใจได้รับการดูดเสมหะแล้ว 2 ครั้ง แต่ยังมีเสียงเสมหะชัดเจน พยาบาลควรปฏิบัติอย่างไร ?",
            options: [
                "ดูดเสมหะต่อเนื่องจนกว่าเสียงเสมหะจะหายไป",
                "ให้ออกซิเจน พักผู้ป่วยตามความเหมาะสม แล้วประเมินก่อนพิจารณาดูดเสมหะซ้ำ",
                "เพิ่มแรงดูดเป็นค่าสูงสุดก่อนดูดซ้ำ",
                "หยุดการดูดเสมหะและไม่ต้องประเมินเพิ่มเติม"
            ],
            correctAnswer: 1
        },
        {
            id: 9, question: "ข้อใดเป็นภาวะแทรกซ้อนที่อาจเกิดขึ้นจากการดูดเสมหะนานเกินไป ?",
            options: [
                "ความดันโลหิตสูงจากการได้รับออกซิเจนมากเกินไป",
                "ภาวะพร่องออกซิเจนและหัวใจเต้นผิดจังหวะ",
                "ระดับน้ำตาลในเลือดสูงเฉียบพลัน",
                "ปัสสาวะออกน้อยลง"
            ],
            correctAnswer: 1
        },
        {
            id: 10, question: "ก่อนเริ่มทำ Open Suction พยาบาลตรวจสอบแรงดูดของเครื่องดูดเสมหะ เหตุผลสำคัญที่สุดคือข้อใด ?",
            options: [
                "เพื่อยืดอายุการใช้งานของเครื่องดูดเสมหะ",
                "เพื่อให้ดูดเสมหะได้รวดเร็วที่สุด",
                "เพื่อให้แรงดูดเหมาะสม ลดการบาดเจ็บของเยื่อบุทางเดินหายใจ และดูดเสมหะได้อย่างมีประสิทธิภาพ",
                "เพื่อป้องกันการอุดตันของสายดูดเสมหะ"
            ],
            correctAnswer: 2
        }
    ],

    foley_catheter: [
        {
            id: 1, question: "ข้อใดคือข้อบ่งชี้ของการใส่สายสวนปัสสาวะ ?",
            options: [
                "ผู้ป่วยสามารถปัสสาวะได้เองตามปกติ แต่ต้องการความสะดวกในการขับถ่าย",
                "ผู้ป่วยมีภาวะปัสสาวะคั่ง ไม่สามารถปัสสาวะได้เอง หรือต้องติดตามปริมาณปัสสาวะอย่างใกล้ชิด",
                "ผู้ป่วยต้องการหลีกเลี่ยงการลุกไปห้องน้ำในเวลากลางคืน",
                "ผู้ป่วยมีภาวะกลั้นปัสสาวะไม่อยู่เพียงอย่างเดียว โดยไม่มีข้อบ่งชี้ทางการแพทย์อื่น"
            ],
            correctAnswer: 1
        },
        {
            id: 2, question: "ขณะใส่สายสวนปัสสาวะแบบคาสายให้ผู้ป่วยชาย นักศึกษาสอดสายสวนเข้าไปประมาณ 15 เซนติเมตร ผู้ป่วยบ่นปวดมากและรู้สึกต้านอย่างชัดเจน แต่ยังไม่มีปัสสาวะไหลออก การปฏิบัติที่เหมาะสมที่สุดคือข้อใด ?",
            options: [
                "หยุดการสอดสายสวนทันที ประเมินสาเหตุของแรงต้าน ให้ผู้ป่วยผ่อนคลายหรือหายใจลึก หากยังมีแรงต้านไม่ควรฝืนใส่ และแจ้งแพทย์หรือผู้มีประสบการณ์",
                "เติมน้ำในบอลลูนทันทีเพื่อป้องกันสายสวนหลุด แล้วประเมินอาการภายหลัง",
                "ดันสายสวนต่ออย่างนุ่มนวลจนกว่าจะมีปัสสาวะไหล เพราะอาจติดที่หูรูดของท่อปัสสาวะ",
                "ถอนสายสวนออกทั้งหมด แล้วใช้สายสวนเส้นเดิมใส่ใหม่ทันที"
            ],
            correctAnswer: 0
        },
        {
            id: 3, question: "หลังใส่สายสวนปัสสาวะแบบคาสาย (Indwelling urinary catheter) พยาบาลควรแนะนำผู้ป่วยข้อใดเพื่อช่วยลดความเสี่ยงต่อการติดเชื้อทางเดินปัสสาวะ ?",
            options: [
                "วางถุงรองรับปัสสาวะบนเตียงเพื่อให้สังเกตปริมาณได้ง่าย",
                "ดื่มน้ำให้น้อยลงเพื่อลดการขับปัสสาวะ",
                "ถอดสายสวนออกเองเมื่อรู้สึกปัสสาวะได้",
                "ดื่มน้ำให้เพียงพอตามข้อบ่งชี้ทางการรักษา และหลีกเลี่ยงการดึงรั้งสายสวน"
            ],
            correctAnswer: 3
        },
        {
            id: 4, question: "หลังใส่สายสวนปัสสาวะแบบคาสาย พยาบาลควรแนะนำผู้ป่วยเกี่ยวกับการรับประทานอาหารและการดื่มน้ำอย่างไร ?",
            options: [
                "ดื่มน้ำให้เพียงพอประมาณ 2–3 ลิตรต่อวัน หากไม่มีข้อห้ามจากโรคประจำตัว และรับประทานอาหารที่มีกากใยเพียงพอ",
                "จำกัดการดื่มน้ำให้ไม่เกิน 500 มิลลิลิตรต่อวัน เพื่อลดการคั่งของปัสสาวะ",
                "งดรับประทานผักและผลไม้ เพราะทำให้ปัสสาวะออกมาก",
                "รับประทานอาหารรสเค็มมากขึ้น เพื่อกระตุ้นการขับปัสสาวะ"
            ],
            correctAnswer: 0
        },
        {
            id: 5, question: "ข้อใดเป็นภาวะแทรกซ้อนที่พบบ่อยที่สุด ?",
            options: [
                "นิ่วในไต",
                "การติดเชื้อทางเดินปัสสาวะ",
                "ไตวายเฉียบพลัน",
                "มะเร็งกระเพาะปัสสาวะ"
            ],
            correctAnswer: 1
        },
        {
            id: 6, question: "ข้อใดเป็น ข้อห้ามสำคัญ ของการใส่สายสวนปัสสาวะทางท่อปัสสาวะ (Urethral catheterization) ?",
            options: [
                "ผู้ป่วยปัสสาวะไม่ออกเฉียบพลัน",
                "ผู้ป่วยต้องติดตามปริมาณปัสสาวะอย่างใกล้ชิด",
                "ผู้ป่วยสงสัยว่ามีการบาดเจ็บของท่อปัสสาวะจากอุบัติเหตุ",
                "ผู้ป่วยต้องผ่าตัดใหญ่"
            ],
            correctAnswer: 2
        },
        {
            id: 7, question: "ข้อใดคือขนาดของสายสวนปัสสาวะที่เหมาะสม ?",
            options: [
                "เด็กใช้ขนาด 8-10 Fr. ผู้หญิงใช้ขนาด 12-14 Fr. ผู้ชายใช้ขนาด 14-18 Fr.",
                "เด็กใช้ขนาด 6-10 Fr. ผู้หญิงใช้ขนาด 12-16 Fr. ผู้ชายใช้ขนาด 14-20 Fr.",
                "เด็กใช้ขนาด 6-12 Fr. ผู้หญิงใช้ขนาด 10-14 Fr. ผู้ชายใช้ขนาด 16-18 Fr.",
                "เด็กใช้ขนาด 8 Fr. ผู้หญิงใช้ขนาด 16-18 Fr. ผู้ชายใช้ขนาด 18-20 Fr."
            ],
            correctAnswer: 0
        },
        {
            id: 8, question: "การจัดท่าที่เหมาะสมสำหรับการใส่สายสวนปัสสาวะในผู้ป่วยชายคือข้อใด ?",
            options: [
                "ท่านอนหงายชันเข่า (dorsal recumbent)",
                "ท่านอนหงายราบ (supine position)",
                "นอนหงายชันเข่าขึ้น กางขาออก (Lithotomy position)",
                "ท่านอนหงาย หัวต่ำ (Trendelenburg position)"
            ],
            correctAnswer: 1
        },
        {
            id: 9, question: "หลังใส่สายสวนปัสสาวะแบบคาสาย (Foley catheter) เสร็จเรียบร้อย การยึดสายสวนข้อใดเหมาะสมที่สุด ?",
            options: [
                "ผู้ชายและผู้หญิง ยึดสายสวนบริเวณต้นขาด้านในเหมือนกัน เพื่อป้องกันสายเลื่อน",
                "ผู้ชายยึดสายสวนบริเวณหน้าท้องส่วนล่าง ส่วนผู้หญิงยึดสายสวนบริเวณหน้าท้องส่วนล่างเช่นเดียวกัน",
                "ยึดตึงใส่ส่วนไว้ที่ต้นขาด้านใน ในเพศชายที่ต้องใส่สวนเป็นเวลานานให้ติดไว้ที่หน้าท้อง",
                "ผู้ชายและผู้หญิง ยึดสายสวนบริเวณหน้าท้องเหมือนกัน"
            ],
            correctAnswer: 2
        },
        {
            id: 10, question: "หลังทำความสะอาดอวัยวะสืบพันธุ์ด้วยเทคนิคปราศจากเชื้อแล้ว พยาบาลใส่สารหล่อลื่นและสอดสายสวนจนปัสสาวะไหลออก ขั้นตอนใดต่อไปนี้ถูกต้องที่สุด ?",
            options: [
                "เติมน้ำเข้าบอลลูนทันที แล้วดึงสายสวนจนรู้สึกต้าน",
                "ดันสายสวนเข้าไปอีก 2–5 เซนติเมตร เติมน้ำเข้าบอลลูนตามปริมาตรที่กำหนด แล้วดึงสายสวนเบา ๆ จนรู้สึกต้าน",
                "ดึงสายสวนออกประมาณ 2 เซนติเมตร เติมน้ำเข้าบอลลูน แล้วดันกลับเข้าไป",
                "หนีบสายสวนก่อนเติมน้ำเข้าบอลลูน เพื่อป้องกันปัสสาวะไหล"
            ],
            correctAnswer: 1
        }
    ],
    ng_tube: [
        {
            id: 1, question: "ข้อใดเป็นข้อบ่งชี้ที่เหมาะสมที่สุดสำหรับการใส่สายให้อาหารทางสายยาง (NG Tube) ?",
            options: [
                "ผู้ป่วยรับประทานอาหารได้น้อยเนื่องจากเบื่ออาหาร",
                "ผู้ป่วยรู้สึกคลื่นไส้หลังรับประทานอาหาร",
                "ผู้ป่วยไม่สามารถกลืนอาหารได้จากภาวะหลอดเลือดสมอง",
                "ผู้ป่วยมีไข้สูง"
            ],
            correctAnswer: 2
        },
        {
            id: 2, question: "เหตุใดจึงต้องตรวจสอบความโล่งของรูจมูกก่อนใส่สาย NG ?",
            options: [
                "เพื่อป้องกันการติดเชื้อ",
                "เพื่อเลือกข้างที่สายสามารถผ่านได้สะดวกและลดการบาดเจ็บ",
                "เพื่อป้องกันผู้ป่วยจาม",
                "เพื่อให้วัดตำแหน่งสายได้ง่ายขึ้น"
            ],
            correctAnswer: 1
        },
        {
            id: 3, question: "การวัดตำแหน่งสายด้วยวิธี NEX มีวัตถุประสงค์สำคัญที่สุดข้อใด ?",
            options: [
                "เพื่อป้องกันสายอุดตัน",
                "เพื่อกำหนดความยาวสายให้ปลายสายอยู่ในกระเพาะอาหาร",
                "เพื่อช่วยให้ผู้ป่วยกลืนง่าย",
                "เพื่อให้ยึดสายได้สะดวก"
            ],
            correctAnswer: 1
        },
        {
            id: 4, question: "การจัดให้ผู้ป่วยอยู่ในท่าศีรษะสูงก่อนใส่สาย NG มีประโยชน์สำคัญที่สุดข้อใด ?",
            options: [
                "ลดการเกิดเลือดออกในโพรงจมูก",
                "ลดความเสี่ยงต่อการสำลักและช่วยให้สายผ่านหลอดอาหารได้ง่ายขึ้น",
                "ช่วยให้วัดตำแหน่งสายได้แม่นยำ",
                "ลดการระคายเคืองจาก KY jelly"
            ],
            correctAnswer: 1
        },
        {
            id: 5, question: "หากผู้ป่วยรู้สึกเจ็บบริเวณโพรงจมูกขณะใส่สาย แต่ยังไม่มีอาการไอหรือหายใจลำบาก พยาบาลควรปฏิบัติอย่างไร ?",
            options: [
                "ดันสายต่ออย่างรวดเร็ว",
                "ถอนสายออกทันที",
                "หยุดชั่วคราว ประเมินผู้ป่วย และใส่สายอย่างนุ่มนวลต่อเมื่อเหมาะสม",
                "เปลี่ยนเป็นใส่ทางปาก"
            ],
            correctAnswer: 2
        },
        {
            id: 6, question: "หลังใส่สาย NG จนถึงตำแหน่งที่วัดไว้ ผู้ป่วยเกิดอาการไอรุนแรง หายใจลำบาก และพูดไม่ได้ การปฏิบัติที่เหมาะสมที่สุดคือข้อใด ?",
            options: [
                "ยึดสายไว้แล้วสังเกตอาการ",
                "ถอนสายออกทันทีและประเมินทางเดินหายใจของผู้ป่วย",
                "ให้ผู้ป่วยดื่มน้ำเพื่อช่วยให้สายลงกระเพาะอาหาร",
                "ตรวจสอบตำแหน่งสายด้วยการดันลม"
            ],
            correctAnswer: 1
        },
        {
            id: 7, question: "เหตุใดจึงต้องตรวจสอบตำแหน่งสาย NG ทุกครั้งก่อนให้อาหารหรือยา ?",
            options: [
                "เพื่อประเมินว่าสายอุดตันหรือไม่",
                "เพื่อป้องกันการให้อาหารเข้าสู่ทางเดินหายใจจากการที่สายเคลื่อนผิดตำแหน่ง",
                "เพื่อป้องกันผู้ป่วยคลื่นไส้",
                "เพื่อยืดอายุการใช้งานของสาย"
            ],
            correctAnswer: 1
        },
        {
            id: 8, question: "ผู้ป่วยดึงสาย NG หลุดออกมาประมาณ 8 เซนติเมตร แต่ยังไม่มีอาการผิดปกติ พยาบาลควรทำอย่างไร ?",
            options: [
                "ดันสายกลับเข้าไปจนถึงตำแหน่งเดิม",
                "ยึดสายไว้และเริ่มให้อาหาร",
                "ตรวจสอบตำแหน่งสาย หากมีการเลื่อนหลุดหรือไม่อยู่ในตำแหน่งเดิมให้เปลี่ยนสายใหม่",
                "ล้างสายด้วยน้ำก่อนใช้งาน"
            ],
            correctAnswer: 2
        },
        {
            id: 9, question: "ข้อใดเป็นข้อมูลที่ควรบันทึกหลังใส่สาย NG ครบถ้วนที่สุด ?",
            options: [
                "วัน เวลา ขนาดสาย ความลึกของสาย วิธีตรวจสอบตำแหน่ง ผลการตรวจสอบ และการตอบสนองของผู้ป่วย",
                "เวลาและชื่อผู้ปฏิบัติ",
                "ขนาดสายและชื่อผู้ป่วย",
                "เวลาและจำนวนอุปกรณ์ที่ใช้"
            ],
            correctAnswer: 0
        },
        {
            id: 10, question: "หลังใส่สาย NG และตรวจสอบตำแหน่งเรียบร้อยแล้ว ผู้ป่วยจะได้รับอาหารทางสายยาง การจัดท่าที่เหมาะสมที่สุดคือข้อใด ?",
            options: [
                "นอนราบ",
                "นอนคว่ำ",
                "ยกศีรษะสูงประมาณ 30–45 องศา ระหว่างให้อาหารและคงไว้หลังให้อาหารตามแนวทางปฏิบัติ",
                "นอนตะแคงซ้าย"
            ],
            correctAnswer: 2
        }
    ]
};

export const ethicsData = {
    suction: [
        "เคารพสิทธิผู้ป่วย อธิบายวัตถุประสงค์และขอความยินยอมจากผู้ป่วยหรือญาติก่อนทำหัตถการทุกครั้ง หากผู้ป่วยสามารถรับรู้และสื่อสารได้ คำนึงถึงความปลอดภัยและไม่ก่ออันตราย ปฏิบัติตามหลักปลอดเชื้อ หากเกิดความผิดพลาดระหว่างการทำหัตถการ ต้องรายงานเหตุการณ์ตามความเป็นจริง ไม่ปกปิดข้อมูล"
    ],
    foley_catheter: [
        "การใส่สายสวนปัสสาวะเป็นหัตถการที่เกี่ยวข้องกับอวัยวะส่วนบุคคล พยาบาลจึงต้องเคารพศักดิ์ศรีและสิทธิของผู้ป่วย โดยอธิบายขั้นตอนและขอความยินยอมก่อนทำหัตถการ รักษาความเป็นส่วนตัวด้วยการปิดม่านหรือใช้ผ้าคลุม เปิดเผยเฉพาะบริเวณที่จำเป็น ใช้เทคนิคปราศจากเชื้อเพื่อความปลอดภัย และรักษาความลับของข้อมูลผู้ป่วยตลอดการดูแล เพราะการพยาบาลที่ดีไม่ใช่เพียงทำหัตถการได้ถูกต้อง แต่ต้องดูแลผู้ป่วยด้วยความเคารพและคำนึงถึงคุณค่าความเป็นมนุษย์ในทุกขั้นตอน"
    ],
    ng_tube: [
        "ระหว่างการใส่สายNG ควรอธิบายขั้นตอนให้ผู้ป่วยทราบ และปฏิบัติด้วยความนุ่มนวล สังเกตอาการของผู้ป่วยอย่างต่อเนื่อง และหากผู้ป่วยมีอาการไอรุนแรง หายใจลำบาก หรือไม่สุขสบาย ควรหยุดและประเมินอาการก่อนดำเนินการต่อ ทั้งนี้เพื่อคำนึงถึงความปลอดภัยเคารพศักดิ์ศรี และคุณค่าความเป็นมนุษย์ของผู้ป่วย"
    ]
};