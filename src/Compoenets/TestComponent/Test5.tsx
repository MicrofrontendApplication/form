import  { useState } from "react";

function Test5() {
  const [formData, setFormData] = useState({
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Simulate form submission
    // alert("Form submitted! Chrome save address popup should appear if eligible.");
    // Here you would normally send formData to your backend
  };

  return (
    <form onSubmit={handleSubmit} >
      <label htmlFor="name">Full Name:</label><br />
      <input
        type="text"
        id="name"
        name="name"
        // autoComplete="name"
        required
        value={formData.name}
        onChange={handleChange}
      /><br /><br />

      <label htmlFor="address1">Street Address Line 1:</label><br />
      <input
        type="text"
        id="address1"
        name="address1"
        // autoComplete="address-line1"
        required
        value={formData.address1}
        onChange={handleChange}
      /><br /><br />

      <label htmlFor="address2">Street Address Line 2:</label><br />
      <input
        type="text"
        id="address2"
        name="address2"
        // autoComplete="address-line2"
        value={formData.address2}
        onChange={handleChange}
      /><br /><br />

      <label htmlFor="city">City:</label><br />
      <input
        type="text"
        id="city"
        name="city"
        // autoComplete="address-level2"
        required
        value={formData.city}
        onChange={handleChange}
      /><br /><br />

      <label htmlFor="state">State/Region:</label><br />
      <input
        type="text"
        id="state"
        name="state"
        // autoComplete="address-level1"
        required
        value={formData.state}
        onChange={handleChange}
      /><br /><br />

      <label htmlFor="zip">Postal Code:</label><br />
      <input
        type="text"
        id="zip"
        name="zip"
        // autoComplete="postal-code"
        required
        value={formData.zip}
        onChange={handleChange}
      /><br /><br />

      <label htmlFor="country">Country:</label><br />
      <input
        type="text"
        id="country"
        name="country"
        // autoComplete="country"
        required
        value={formData.country}
        onChange={handleChange}
      /><br /><br />

      <button type="submit">Submit</button>
    </form>
  );
}

export default Test5;
