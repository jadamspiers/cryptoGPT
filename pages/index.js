import Head from "next/head";
import { useState } from "react";
import ChatPage from "./chat-page/components/ChatPage";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error ||
          new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    // <div>
    //   <Head>
    //     <title>Crypto GPT</title>
    //     <link rel="icon" href="/dog.png" />
    //   </Head>

    //   <main className={styles.main}>
    //     <img src="/dog.png" className={styles.icon} />
    //     <h3>Crypto GPT</h3>
    //     <form onSubmit={onSubmit}>
    //       <input
    //         type="text"
    //         name="animal"
    //         placeholder="Enter a query for price of any crypto"
    //         value={animalInput}
    //         onChange={(e) => setAnimalInput(e.target.value)}
    //       />
    //       <input type="submit" value="Submit" />
    //     </form>
    //     <div className={styles.result}>{result}</div>
    //   </main>
    // </div>
    <div>
      <ChatPage />
    </div>
  );
}
