import "./App.css";

import "microfrontend/microfrontend.min.css";
import { useState } from "react";

import HeadingContent from "./Compoenets/HeadingContent";
import { NachsendungForm } from "./Compoenets/Nachsendung";

import { Form2 } from "./Compoenets/Form2";

import "./App.css";

function App() {
  const [selected, setSelected] = useState<"privat" | "geschäftlich">("privat");

  return (
    <>
      <div className="container">
        <div className="headercontainer">
          <HeadingContent></HeadingContent>
        </div>
        <div className="formcontainer">
          <div className="fw-bold">Art der Nachsendung *</div>
          <div className="toggle-container">
            <button
              className={`toggle-button ${selected === "privat" ? "active" : ""
                }`}
              onClick={() => setSelected("privat")}
            >
              privat
            </button>
            <button
              className={`toggle-button ${selected === "geschäftlich" ? "active" : ""
                }`}
              onClick={() => setSelected("geschäftlich")}
            >
              geschäftlich
            </button>
          </div>
          {selected == "privat" ? (
          
             <>
              <NachsendungForm></NachsendungForm>
            </>
          ) : (
            <>
              <Form2></Form2>
            </>
          )}
     
        </div>

      </div>

    </>
  );
}
export default App;
