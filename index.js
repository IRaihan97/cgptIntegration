//👇🏻index.js
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require("express");
const cors = require("cors");
import {ChatGPTAPIBrowser} from "chatgpt"

const app = express();
const PORT = 4000;

const fullMessage = `List me all the 32-bit colors`;



async function chatgptFunction(message) {
    let chatgptResult = "";
    // use puppeteer to bypass cloudflare (headful because of captchas)
    const api = new ChatGPTAPIBrowser({
        email: "antimatrixquarter@gmail.com",
        password: "Antimatrix2023",
    });
    //👇🏻 Open up the login screen on the browser
    await api.initSession();
    const result = await api.sendMessage(message);
    chatgptResult = result.response;
    console.log(chatgptResult);
}


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

app.get("/gpt", (req, res) => {
    chatgptFunction(fullMessage)
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});