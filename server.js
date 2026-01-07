import express, { json } from "express";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 3000;

const INVOKE_URL = process.env.CLOVA_CHATBOT_INVOKE_URL;
const SECRET_KEY = process.env.CLOVA_CHATBOT_SECRET;

// 암호화 부분
function makeSignature(requestBodyString, secretKey) {
  return crypto
    .createHmac("sha256", secretKey)
    .update(requestBodyString, "utf8")
    .digest("base64");
}

app.use(express.static("public"));
app.use(json());

app.post("/chat", async (request, response) => {
  try {
    const { message } = request.body || {};

    const bodyToClova = {
      version: "v2",
      userId: "1",
      bubbles: [
        {
          type: "text",
          data: { description: message },
        },
      ],
      timestamp: Date.now(),
      event: "send",
    };

    const requestBodyString = JSON.stringify(bodyToClova);
    const signature = makeSignature(requestBodyString, SECRET_KEY);

    const clovaResponse = await fetch(INVOKE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "X-NCP-CHATBOT_SIGNATURE": signature,
      },
      body: requestBodyString,
    });

    //  {
    //   "userId": "{userId}",
    //   "timestamp": 1664169457884, // 사람이 읽도록 바꿔야 함
    //   "bubbles": [
    //     {
    //       "type": "text",
    //       "data": {
    //         "description": "Chatbot Answer",
    //       }}
    //    ]
    //  }

    const responseData = await clovaResponse.json();

    console.log("clova response:", responseData);

    const botMessage = responseData?.bubbles[0]?.data?.description;
    const botTimestamp = responseData?.timestamp;

    const data = {
      message: botMessage,
      timestamp: botTimestamp,
    };

    return response.json(data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () =>
  console.log(`Express 서버가 http://localhost:${PORT} 에서 대기중`)
);
