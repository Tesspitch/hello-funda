

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
import ucs from "../assets/img/foley/ucs.webp";
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
        { id: 11, name: "ชฎา", img: chada, isCorrect: true },
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

    ],
    foley_catheter: [

    ],
    ng_tube: [

    ]

}