import { useState, useEffect } from "react";
import "./App.css";
import { w3cwebsocket as WebSocket } from "websocket";

const client = new WebSocket("ws://localhost:8080/stream");

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message.data]);
    };
    client.onclose = () => {
      console.log("WebSocket Client Disconnected");
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    const message = event.target.elements.message.value;
    client.send(message);
  };

  return (
    <div className="App">
      <h1>Streaming Application</h1>
      <form onSubmit={sendMessage}>
        <input type="text" name="message" />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
