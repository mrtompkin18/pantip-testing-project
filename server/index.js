var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());

app.post("/play_bingo", (req, res) => {
    const { card, number_lists } = req.body;

    const numberList = number_lists.split(",").map(value => parseInt(value));
    const cardList = card.split(",").map(value => parseInt(value));

    if (isDuplicate(cardList)) {
        return res.status(400).json({ message: "Duplicated number." })
    }

    if (!cardList || cardList.length !== 25) {
        return res.status(400).json({ message: "Limited to 25 numbers only." })
    }

    //สร้าง tempate ของ บิงโก 5x5
    const bingoTemplate = generateBingoTemplate(cardList);

    //คำตอบเคสชนะบิงโกสำหรับทุกเคส
    const bingoCase1 = case1(bingoTemplate);
    const bingoCase2 = case2(bingoTemplate);
    const bingoCase3 = case3(bingoTemplate);
    const bingoCase4 = case4(bingoTemplate);

    //นำลิตส์ตัวเลขมาตรวจกับคำตอบ
    let isBingo = false;
    if (bingoCase1.toString() === getOnlyIncludeNumber(bingoCase1, numberList).toString() ||
        bingoCase2.toString() === getOnlyIncludeNumber(bingoCase2, numberList).toString() ||
        bingoCase3.reduce((acc, anwser) => acc || anwser.toString() === getOnlyIncludeNumber(anwser, numberList).toString(), false) ||
        bingoCase4.reduce((acc, anwser) => acc || anwser.toString() === getOnlyIncludeNumber(anwser, numberList).toString(), false)) {
        isBingo = true;
    }

    res.status(200).json({ isBingo });
});

function isDuplicate(list) {
    return list.filter((item, index) => list.indexOf(item) !== index).length > 0
}

function getOnlyIncludeNumber(awnser, catedidate) {
    return awnser.filter(val => catedidate.includes(val))
}

function case1(bingoTemplate) {
    var arr = [], i = 0, arrSize = bingoTemplate.length;
    for (i; i < arrSize; i++)
        arr.push(bingoTemplate[i][i]);
    return arr;
}

function case2(bingoTemplate) {
    var arr = [], i = 0, arrSize = bingoTemplate.length;
    for (i; i < arrSize; i++)
        arr.push(bingoTemplate[i][(arrSize - 1) - i]);
    return arr;
}

function case3(bingoTemplate) {
    var arr = [], arrSize = bingoTemplate.length;
    for (var i = 0; i < arrSize; i++) {
        var arr2 = [];
        for (var j = 0; j < arrSize; j++) {
            arr2.push(bingoTemplate[i][j]);
        }
        arr.push(arr2);
    }
    return arr;
}

function case4(bingoTemplate) {
    var arr = [], arrSize = bingoTemplate.length;
    for (var i = 0; i < arrSize; i++) {
        var arr2 = [];
        for (var j = 0; j < arrSize; j++) {
            arr2.push(bingoTemplate[j][i]);
        }
        arr.push(arr2);
    }
    return arr;
}

function generateBingoTemplate(list) {
    var acc = 0;
    var arr = [];
    for (var i = 0; i < list.length; i = i + 5) {
        arr.push(list.slice(i, acc = acc + 5))
    }

    return arr;
}

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server running on port " + port)
})