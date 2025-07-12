import { Configuration, OpenAIApi } from "openai";
import readline from "readline";
import fs from "fs";


// config open ai user
const configuration = new Configuration({
    // please sing-in to file keyApi.txt end paste you openAI key
    apiKey: JSON.parse(fs.readFileSync('keyApi.txt' ,'utf-t8')["openAiKey"]).apiKey,
});
const openai = new OpenAIApi(configuration);


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// main funk 
async function chat() {
    while (true) {
        // promt user
        const userInput = await new Promise(resolve => rl.question("You: ", resolve));
        if (userInput.toLowerCase() === 'exit') {
            console.log("Exiting chat...");
            rl.close();
            break;
        }
        // funk to request open ai
        try {
            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userInput }],
            });
            const botReply = response.data.choices[0].message.content;
            console.log(`Bot: ${botReply}`);
        } catch (error) { // if script haved problem
            console.error("Error:", error.response ? error.response.data : error.message);
        }
    }
}

chat();
