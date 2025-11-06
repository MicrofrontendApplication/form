import "./App.css";

import "microfrontend/microfrontend.min.css";
import { useState } from "react";

import HeadingContent from "./Compoenets/HeadingContent";
import { NachsendungForm } from "./Compoenets/Nachsendung";

import { Form2 } from "./Compoenets/Form2";

import "./App.css";

function App() {
  const [selected, setSelected] = useState<"privat" | "geschäftlich">("privat");


  const [address, setAddress] = useState({
    strasse: "",
    stadt: "",
    plz: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevent SPA navigation

    // copy values to hidden form
    (document.getElementById("native-strasse") as HTMLInputElement).value =
      address.strasse;
    (document.getElementById("native-stadt") as HTMLInputElement).value =
      address.stadt;
    (document.getElementById("native-plz") as HTMLInputElement).value =
      address.plz;

    // submit hidden form to trigger Chrome popup
    (document.getElementById("nativeForm") as HTMLFormElement)?.submit();
  };
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


      <div style={{ maxWidth: "400px", margin: "50px auto" }}>
        <h1>Adresse speichern Demo</h1>
        <form onSubmit={handleSubmit} autoComplete="on">
          <div>
            <label>Straße:</label>
            <input
              name="strasse"
              autoComplete="address-line1"
              value={address.strasse}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Stadt:</label>
            <input
              name="stadt"
              autoComplete="address-level2"
              value={address.stadt}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>PLZ:</label>
            <input
              name="plz"
              autoComplete="postal-code"
              value={address.plz}
              onChange={handleChange}
            />
          </div>
          <button type="submit" style={{ marginTop: "10px" }}>
            Speichern
          </button>
        </form>

        {/* Hidden native form to trigger Chrome save popup */}
        <form
          id="nativeForm"
          method="POST"
          action="https://httpbin.org/post"
          style={{ display: "none" }}
          autoComplete="on"
        >
          <input id="native-strasse" name="address-line1" />
          <input id="native-stadt" name="address-level2" />
          <input id="native-plz" name="postal-code" />
        </form>
      </div>
    </>
  );
}
export default App;
