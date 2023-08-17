import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
//Declarando variáveis
const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/", async (request, response) => {
  const { chats } = request.body;

  const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Você é um terapeuta chamado Sigmoid, e busca padrões comportamentais nas falas dos usuários e costuma usar a abordagem do psicanalista Freud para detectar e explicar esses padrões. Sempre busque por palavras chaves nas mensagens do usuário e responda utilizando-as. Sempre costuma se apresentar para o usuário no início da conversa.",
      },
      ...chats,
    ],
    temperature: 0.3,
    frequency_penalty: -0.5,
  });

  response.json({
    output: result.data.choices[0].message,
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
