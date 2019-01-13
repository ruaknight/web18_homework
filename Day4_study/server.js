const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.get("/", (req, res) => {
    let questions = [];
    try {
        questions = JSON.parse(fs.readFileSync("view/database.json"));
    } catch (error) {
        // console.log(error);
    }
    if(questions.length === 0) {
        res.send("question list empty");
    } else {
        let tempRandom = Math.floor(Math.random() * questions.length);
        const randomQuestion = questions[tempRandom];
        // res.send("<h1>" + randomQuestion.content + "</h1>");
        res.send(`
        <h1>${randomQuestion.content}</h1>
        <a href="vote/no/${tempRandom}"><button>No</button></a>
        <a href="vote/yes/${tempRandom}"><button>Yes</button></a>
        `);
    }
});

app.get("/vote/yes/:questionId", (req, res) => {
    const { questionId } = req.params;
    let questions = [];
    try {
        questions = JSON.parse(fs.readFileSync("view/database.json"));
    } catch (error) {
        // console.log(error);
    }
    // const question = questions.filter(item => item.id === questionId)[0];
    questions.forEach((item, index) => {
        if(item.id == questionId) {
            questions[index].yes +=1;
        }
        fs.writeFileSync("view/database.json", JSON.stringify(questions));
    });
    res.redirect("/");
})


app.get("/vote/no/:questionId", (req, res) => {
    const { questionId } = req.params;
    let questions = [];
    try {
        questions = JSON.parse(fs.readFileSync("view/database.json"));
    } catch (error) {
        // console.log(error);
    }
    // const question = questions.filter(item => item.id === questionId)[0];
    questions.forEach((item, index) => {
        if(item.id == questionId) {
            questions[index].no +=1;
        }
        fs.writeFileSync("view/database.json", JSON.stringify(questions));
    });
    res.redirect("/");
})

app.post("/askquestion", (req, res) => {
    const { questionContent } = req.body;

    let questions = [];
    try {
        questions = JSON.parse(fs.readFileSync("view/database.json"));
    } catch (error) {
        console.log(error);
    }
    
    const newQuestion = {
        id: questions.length,
        content: questionContent,
        yes: 0,
        no: 0,
    }

    questions.push(newQuestion);
    fs.writeFileSync("view/database.json", JSON.stringify(questions));
    res.redirect("/");
});

app.get("/ask", (req, res) => {
    res.sendFile(__dirname + "/view/ask.html")
});

app.listen("1234", (error) => {
    if(error) console.log(error);
    else(console.log("server stated"))
});