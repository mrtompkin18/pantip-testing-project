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
    const { bingoCase1, bingoCase2, bingoCase3, bingoCase4 } = bingoWinCase(bingoTemplate);

    //นำลิตส์ตัวเลขมาตรวจกับคำตอบ
    const isBinggoCase1 = bingoCase1.toString() === getOnlyIncludeNumber(bingoCase1, numberList).toString();
    const isBingoCase2 = bingoCase2.toString() === getOnlyIncludeNumber(bingoCase2, numberList).toString();
    const isBinggoCase3 = bingoCase3.reduce((acc, anwser) => acc || anwser.toString() === getOnlyIncludeNumber(anwser, numberList).toString(), false);
    const isBinggoCase4 = bingoCase4.reduce((acc, anwser) => acc || anwser.toString() === getOnlyIncludeNumber(anwser, numberList).toString(), false);

    let isBingo = false;
    if (isBinggoCase1
        || isBingoCase2
        || isBinggoCase3
        || isBinggoCase4
    ) {
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

function bingoWinCase(bingoTemplate) {
    var i = 0, arrSize = bingoTemplate.length;
    var bingoCase1 = [], bingoCase2 = [], bingoCase3 = [], bingoCase4 = []
    for (i; i < arrSize; i++) {
        bingoCase1.push(bingoTemplate[i][i]);
        bingoCase2.push(bingoTemplate[i][(arrSize - 1) - i]);
        var case3temp = [], case4temp = [];
        for (var j = 0; j < arrSize; j++) {
            case3temp.push(bingoTemplate[i][j]);
            case4temp.push(bingoTemplate[j][i]);
        }
        bingoCase3.push(case3temp);
        bingoCase4.push(case4temp);
    }
    return { bingoCase1, bingoCase2, bingoCase3, bingoCase4 }
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