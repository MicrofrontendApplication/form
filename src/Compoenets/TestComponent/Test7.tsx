import  { useState } from "react";

function Test7() {
  const [formData, setFormData] = useState({
    name: "",
    strasse: "",
    hausnummer: "",
    ort: "",
    bundesland: "",
    plz: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // alert("Formular abgesendet! Popup zum Speichern der Adresse sollte NICHT erscheinen.");
    // Normalerweise würde man hier formData an den Server senden.
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label><br />
      <input
        type="text"
        id="name"
        name="name"
        // autoComplete="name"
        placeholder="Vor- und Nachname"
        value={formData.name}
        onChange={handleChange}
      /><br /><br />

      <label htmlFor="strasse">Straße:</label><br />
      <input
        type="text"
        id="strasse"
        name="strasse"
        // autoComplete="address-line1"
        placeholder="Straßenname"
        value={formData.strasse}
        onChange={handleChange}
      /><br /><br />

      <label htmlFor="hausnummer">Hausnummer:</label><br />
      <input
        type="text"
        id="hausnummer"
        name="hausnummer"
        // autoComplete="address-line2"
        placeholder="Hausnummer"
        value={formData.hausnummer}
        onChange={handleChange}
      /><br /><br />

      <label htmlFor="ort">Ort:</label><br />
      <input
        type="text"
        id="ort"
        name="ort"
        // autoComplete="address-level1"
        placeholder="Stadt oder Ort"
        value={formData.ort}
        onChange={handleChange}
      /><br /><br />

      <label htmlFor="bundesland">Bundesland:</label><br />
      <input
        type="text"
        id="bundesland"
        name="bundesland"
        // autoComplete="address-level2"
        placeholder="Bundesland"
        value={formData.bundesland}
        onChange={handleChange}
      /><br /><br />

      <label htmlFor="plz">PLZ (Postleitzahl):</label><br />
      <input
        type="text"
        id="plz"
        name="plz"
        // autoComplete="postal-code"
        placeholder="Postleitzahl"
        value={formData.plz}
        onChange={handleChange}
      /><br /><br />

      <button type="submit">Submit</button>
    </form>
  );
}

export default Test7;
