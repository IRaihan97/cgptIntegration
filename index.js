//👇🏻index.js
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
import {ChatGPTAPIBrowser} from "chatgpt"

//Here we are configuring express to use body-parser as middle-ware.


const app = express();
const PORT = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const fullMessage = `List me all the 32-bit colors`;

const api = new ChatGPTAPIBrowser({
    email: "antimatrixquarter@gmail.com",
    password: "Antimatrix2023",
    isGoogleLogin: true,
    minimize: true
});

async function startChatGptSession(){
    // use puppeteer to bypass cloudflare (headful because of captchas)
    await api.initSession();
}


async function chatgptFunction(message) {
    const result = await api.sendMessage(message);
    let chatgptResult = await result.response;
    console.log(chatgptResult);
    return chatgptResult
}


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

app.post("/gpt", (req, res) => {
    console.log(JSON.stringify(req.body))
    let resultMessage = chatgptFunction(JSON.stringify(req.body.msg))
    if(resultMessage){
        res.json({
            ChatGPTResponse: resultMessage
        })
    }
});

app.listen(PORT, startChatGptSession(), () => {
    console.log(`Server listening on ${PORT}`);
});