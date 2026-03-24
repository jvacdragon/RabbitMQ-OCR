import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [notifications, setNotifications] = useState(0);
  const [file, setFile] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const file = e.target.file.files[0];
    setFile(file);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        //const result = await response.json();
        console.log("File uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  }
  return (
    <div className="App">
      <p>Notificações: {notifications}</p>

      <form onSubmit={handleSubmit}>
        <input type="file" name="file" id="file" />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
