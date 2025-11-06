import "./App.css";

import "microfrontend/microfrontend.min.css";

// import HeadingContent from "./Compoenets/HeadingContent";
// import { NachsendungForm } from "./Compoenets/Nachsendung";

// import { Form2 } from "./Compoenets/Form2";

import "./App.css";
import Test5 from "./Compoenets/TestComponent/Test5";
import Test6 from "./Compoenets/TestComponent/Test6";
import { useState } from "react";
import Test7 from "./Compoenets/TestComponent/Test7";

function App() {
  // const [selected, setSelected] = useState<"privat" | "geschäftlich">("privat");
    const [selected, setSelected] = useState<"c1" | "c2" | "c3">("c1");




  return (
    <>
      {/* <div className="container">
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

      </div> */}
    <div>
      <div>
        <label>
          <input
            type="radio"
            name="comp"
            value="c1"
            checked={selected === "c1"}
            onChange={() => setSelected("c1")}
          />
          Comp 1
        </label>

        <label>
          <input
            type="radio"
            name="comp"
            value="c2"
            checked={selected === "c2"}
            onChange={() => setSelected("c2")}
          />
          Comp 2
        </label>

        <label>
          <input
            type="radio"
            name="comp"
            value="c3"
            checked={selected === "c3"}
            onChange={() => setSelected("c3")}
          />
          Comp 3
        </label>
      </div>

      <div style={{marginTop:20}}>
        {selected === "c1" && <Test5 />}
        {selected === "c2" && <Test6 />}
        {selected === "c3" && <Test7 />}
      </div>
    </div>

    


    </>
  );
}
export default App;
