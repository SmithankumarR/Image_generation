import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  // console.log(import.meta.env.VITE_Open_AI_Key);
  const [prompt, setPrompt] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    setImgUrl(res.data.data[0].url);
  };
  return (
    <div className="app-main ">
      <h3 className="app-title">Generate an Image using OpenAI</h3>
      <input
        type="text"
        className="app-input"
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type something to generate an image"
      />
      <button className="btn" onClick={generateImage}>
        Generate Image
      </button>
      <div>
        {
          imgUrl.length > 0 ? <img  className="app-img" src={imgUrl} alt="searchedImg" /> :
            <></>
        }
      </div>
    </div>
  );
}

export default App;
