const express = require("express");
const app = express();
app.use(express.static(__dirname + "/html-css"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/html-css/index.html")
})


app.listen("6969", (error) => {
    if(error) console.log(error)
    else console.log("Server started succesfully")
});