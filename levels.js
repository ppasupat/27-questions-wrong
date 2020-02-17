// ################################
// Utilities

function randRange(a, b) {
  if (b === undefined)
    return Math.floor(Math.random() * a);
  return Math.floor(Math.random() * (b - a) + a);
}

function randChoice(stuff) {
  return stuff[randRange(stuff.length)];
}

function randTwoChoices(stuff) {
  let a = randRange(stuff.length), b = randRange(stuff.length - 1);
  if (b >= a) b++;
  return [stuff[a], stuff[b]];
}

// Shuffle in-place
function randShuffle(stuff) {
  let n = stuff.length;
  for (let i = n - 1; i >= 0; i--) {
    let j = randRange(i + 1);
    let tmp = stuff[i]; stuff[i] = stuff[j]; stuff[j] = tmp;
  }
  return stuff;
}

// ################################
// Level generators

/*
A level generator is a function with no argument that returns
the following object:
  {
    question: something appendable to question-pane,
    answers: array of [is_correct, answer],
    message: (optional) message for wrong answer,
  }.
No need to shuffle the answers.

A good template:
    ["<span class=emp></span>", "", ""],
*/

// Mapping level name --> generator
const LGs = {};

// Simple arithmetic
LGs['simple_arith'] = function () {
  let a = randChoice([1, 2, 3, 4, 5]);
  let b = randChoice([1, 2, 3, 4, 5]);
  let d = randChoice([-1, 1]);
  return {
    question: $('<p>').append("" + a + " + " + b),
    answers: [
      [true, "" + (a + b)],
      [false, "" + (a + b + d)],
    ],
  };
};
LGs['simple_arith_parity'] = function () {
  let a = randChoice([1, 2, 3, 4, 5]);
  let b = randChoice([1, 2, 3, 4, 5]);
  let c = randChoice([1, 2, 3, 4, 5]);
  let d = a + b + c;
  return {
    question: $('<p>').append("" + a + " + " + b + " + " + c),
    answers: [
      [true, d % 2 == 0 ? "คู่" : "คี่"],
      [false, d % 2 == 0 ? "คี่" : "คู่"],
    ],
  };
};

// Thai province
LGs['province'] = function () {
  let a = randChoice([
    ["เชียงใหม่", "เชียงเก่า"],
    ["กระบี่", "กระบอง"],
    ["แม่ฮ่องสอน", "พ่อฮ่องสอน"],
    ["ร้อยเอ็ด", "ร้อยสอง"],
    ["เลย", "เลย์"],
    ["นครปฐม", "นครมัธยม"],
    ["อ่างทอง", "อ่างเงิน"],
    ["ยะลา", "ละยา"],
    ["ระยอง", "ยะรอง"],
    ["สมุทรสาคร", "สมุทรสาคู"],
    ["สระแก้ว", "สระน้ำ"],
  ]);
  return {
    question: $('<p>').append("ข้อใดเป็นชื่อ<span class=emp>จังหวัด</span>"),
    answers: [[true, a[0]], [false, a[1]]],
  };
}

// Country
LGs['country'] = function () {
  let a = randChoice([
    ["ฝรั่งเศส", "เศษฝรั่ง"],
    ["เยอรมัน", "เยอรเผือก"],
    ["อินเดีย", "เอาท์เดีย"],
    ["เกาหลีใต้", "เกาหลีตะวันออก"],
    ["อิรัก", "อิชัง"],
    ["เปรู", "เรปู"],
    ["เยเมน", "เยเนม"],
    ["มาลี", "มานี"],
    ["จอร์แดน", "จอแบน"],
    ["ลาว", "ราว"],
    ["ปานามา", "ปามานา"],
    ["บรูไน", "บรูนอก"],
  ]);
  return {
    question: $('<p>').append("ข้อใดเป็นชื่อ<span class=emp>ประเทศ</span>"),
    answers: [[true, a[0]], [false, a[1]]],
  };
}

// Geography Trivia
LGs['geography_trivia'] = function () {
  let qa = randChoice([
    ["ยอดเขาที่<span class=emp>สูง</span>ที่สุดในโลก", "เอเวอเรสต์", "ดอยสุเทพ"],
    ["มหาสมุทรที่<span class=emp>ใหญ่</span>ที่สุดในโลก", "แปซิฟิก", "แอตแลนติก"],
    ["มหาสมุทรที่<span class=emp>เล็ก</span>ที่สุดในโลก", "อาร์กติก", "อินเดีย"],
    ["น้ำตกที่<span class=emp>กว้าง</span>ที่สุดในโลก", "ไนแอการา", "เจ็ดสาวน้อย"],
    ["แม่น้ำที่<span class=emp>ยาว</span>ที่สุดในโลก", "ไนล์", "แอมะซอน"],
    ["ทวีปที่<span class=emp>ใหญ่</span>ที่สุดในโลก", "เอเชีย", "แอฟริกา"],
    ["ทวีปที่<span class=emp>เล็ก</span>ที่สุดในโลก", "ออสเตรเลีย", "แอนตาร์กติกา"],
    ["ร่องสมุทรที่<span class=emp>ลึก</span>ที่สุดในโลก", "มาเรียนา", "มินดาเนา"],
  ]);
  return {
    question: $('<p>').append(qa[0]),
    answers: [[true, qa[1]], [false, qa[2]]],
  };
}

// Misnomer Trivia
LGs['misnomer_trivia'] = function () {
  let qa = randChoice([
    ["<span class=emp>สงครามร้อยปี</span><br><span class=tiny>(อังกฤษ - ฝรั่งเศส)</span><br>ยาวกี่ปี", "116 ปี", "100 ปี"],
    ["<span class=emp>Thousand Islands</span><br><span class=tiny>(อเมริกา - แคนาดา)</span><br>มีกี่เกาะ ", "1864 เกาะ", "1000 เกาะ"],
    ["<span class=emp>เลขอารบิก</span>แต่แรกมาจากชาติใด", "อินเดีย", "จีน"],
    ["<span class=emp>French Horn</span> มาจากชาติใด", "เยอรมัน", "อินเดีย"],
    ["<span class=emp>หมากฮอสจีน</span>มาจากชาติใด", "เยอรมัน", "อินเดีย"],
    ["<span class=emp>กระเพาะปลา</span>เป็นอวัยวะอะไร", "ถุงลม", "ไต"],
    ["<span class=emp>ปูอัด</span>ทำมาจากอะไร", "ปลา", "กุ้ง"],
  ]);
  return {
    question: $('<p>').append(qa[0]),
    answers: [[true, qa[1]], [false, qa[2]]],
  };
}

// Blue whale
LGs['blue_whale'] = function () {
  return {
    question: "สิ่งมีชีวิตอะไรที่ใหญ่ที่สุด",
    answers: [[true, "วาฬสีน้ำเงิน"], [false, "วาฬสีน้ำเงินชุบแป้งทอด"]],
    message: ["ถ้าชุบแป้งทอด", "ก็ไม่มีชีวิตแล้วสิ"],
  };
}

// Crow color
LGs['crow_color'] = function () {
  let qas = randTwoChoices([
    ["red", "สีแดง", "กาชาด"],
    ["orange", "สีส้ม", "การ์ฟีลด์"],
    ["gold", "สีเหลือง", "กาสาวพัสตร์"],
    ["brown", "สีน้ำตาล", "กาแฟนม"],
    ["green", "สีเขียว", "กาฝาก"],
    ["gray", "สีเทา", "กาน้ำเหล็ก"],
    ["black", "สีดำ", "กาปกติ"],
  ])
  return {
    question: $('<p>').append('กาอะไร')
      .append($('<span>').css('color', qas[0][0]).text(qas[0][1])),
    answers: [[true, qas[0][2]], [false, qas[1][2]]],
  };
}

// Fish pun
LGs['fish_pun'] = function () {
  let qas = randTwoChoices([
    ["สุภาพ", "ปลาคาร์พ"],
    ["ขี้เกียจ", "ปลาวาฬ"],
    ["เหนื่อย", "ปลาร้า"],
    ["ครูชอบ", "ปาเจรา"],
    ["มีสองหน้า", "ปลาทูน่า"],
    ["ผู้ชายกลัว", "ปลาปักเป้า"],
    ["มีสามหน้า", "ปลากระป๋องสามแม่ครัว"],
    ["ครองถิ่น", "ปลาเก๋า"],
    ["อึไม่ออก", "ปลาไส้ตัน"],
    ["เป็นลูกไก่", "ปลาช่อน"],
  ]);
  return {
    question: $('<p>').append('ปลาอะไร')
      .append($('<span class=emp>').text(qas[0][0])),
    answers: [[true, qas[0][1]], [false, qas[1][1]]],
  };
}

// Water pun
LGs['water_pun'] = function() {
  let qa = randChoice([
    ["น้ำกลัวอะไร", "รุ้ง", "ลม"],
    ["อะไรกลัวน้ำ", "ลม", "รุ้ง"],
  ]);
  return {
    question: $('<p>').append(qa[0]),
    answers: [[true, qa[1]], [false, qa[2]]],
  };
}

// Letter before
LGs['letter_before_eng'] = function() {
  let a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let b = randRange(2, a.length);
  return {
    question: $('<p>').append('พยัญชนะก่อน <span class=emp>' + a[b] + '</span>'),
    answers: [[true, a[b-1]], [false, a[b-2]]],
  };
}
LGs['letter_before_thai'] = function() {
  let a = "กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ";
  let b = randRange(2, a.length);
  return {
    question: $('<p>').append('พยัญชนะก่อน <span class=emp>' + a[b] + '</span>'),
    answers: [[true, a[b-1]], [false, a[b-2]]],
  };
}

// Shirt color
LGs['shirt_color'] = function () {
  let qas = randTwoChoices([
    ["จันทร์", "แดง"],
    ["อังคาร", "ขาว / เหลือง"],
    ["พุธ", "ชมพู / ส้ม"],
    ["พฤหัส", "ดำ / ม่วง"],
    ["ศุกร์", "เทา / ดำ"],
    ["เสาร์", "เขียว"],
    ["อาทิตย์", "น้ำเงิน / ฟ้า"],
  ]);
  return {
    question: $('<p>')
      .append($('<span class=emp>').text('วัน' + qas[0][0]))
      .append('<br>ไม่ควรใส่เสื้อสีอะไร'),
    answers: [[true, qas[0][1]], [false, qas[1][1]]],
  };
}

// Fruit
LGs['x3_fruit'] = function () {
  let corrects = randTwoChoices([
    "มะก่อ", "มะขวิด", "มะงั่ว", "มะดัน",
    "มะดูก", "มะตูม", "มะไฟ", "มะยม",
    "มะปริง", "มะปี๊ด", "มะพลับ", "มะพูด",
    "มะเฟือง", "มะแฟน", "มะเม่า", "มะริด",
    "มะหวด", "มะหลอด", "มะหาด", "มะพร้าว", "มะนาวไม่รู้โห่",
  ]);
  let wrong = randChoice([
    "มะกะโรนี", "มะงุมมะงาหรา", "มะเดหวี", "มะโต",
    "มะมี่", "มะแม", "มะเรื่อง", "มะตะบะ", "มะล่องก่องแก่ง",
    "มะโรง", "มะลิ่ม", "มะเส็ง", "มะเหงก", "มะเมีย",
  ]);
  return {
    question: $('<p>').append("ข้อใดเป็นชื่อ<span class=emp>ผลไม้</span>"),
    answers: [[true, corrects[0]], [true, corrects[1]], [false, wrong]],
  };
}