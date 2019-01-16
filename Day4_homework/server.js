const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("view"));

app.get("/randomquestion", (req, res) => {
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
        <a href="vote/${tempRandom}/no"><button>No</button></a>
        <a href="vote/${tempRandom}/yes"><button>Yes</button></a>
        <br><a href="/${tempRandom}"><button>See question</button></a>
        `);
    }
});

app.get("/question/:questionId", async (req, res) => {
    const { questionId } = req.params;
    let questions = [];
    try {
        questions = JSON.parse(fs.readFileSync("view/database.json"));
    } catch (error) {
        // console.log(error);
    }
    const selectedQuestion = questions.filter((item) => item.id.toString() === questionId)[0];
    if (selectedQuestion) {
        const yesPercent = Math.round(selectedQuestion.yes / (selectedQuestion.yes + selectedQuestion.no) * 100).toFixed(2);
        const noPercent = 100 - yesPercent;
        res.send(`
        <h1>${selectedQuestion.content}</h1>
        <p>${selectedQuestion.yes + selectedQuestion.no}</p>
        <p>Yes: ${yesPercent}</p>
        <p>No: ${noPercent}</p>`)
    } else res.status(404).end("question not found")
})

app.get("/vote/:questionId/:answer", (req, res) => {
    const { questionId } = req.params;
    const { answer } = req.params;

    let questions = [];
    try {
        questions = JSON.parse(fs.readFileSync("view/database.json"));
    } catch (error) {
        // console.log(error);
    }
    // const question = questions.filter(item => item.id === questionId)[0];
    questions.forEach((item, index) => {
        if(item.id == questionId) {
            switch(answer) {
                case "yes": questions[questionId].yes ++; break;
                case "no": questions[questionId].no ++; break;
            }
        }
        fs.writeFileSync("view/database.json", JSON.stringify(questions));
    });
    res.redirect("/");
});

app.get("/", (req, res) => {
    res.send(`
    <h1>Welcome</h1>
    <a href="ask"><button>Ask a question</button></a>
    <a href="randomquestion"><button>Get a random question</button></a>
    `)
});

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