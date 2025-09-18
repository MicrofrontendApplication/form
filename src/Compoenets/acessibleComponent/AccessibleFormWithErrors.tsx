import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email: string;
  password: string;
}

const AccessibleFormWithErrors: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit} action="#" method="post">
      {/* Email Input */}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
       
            // aria-required="true"
            // aria-describedby="email-error"
          placeholder="Enter your email"
        />

          <div id="email-error" role="alert" aria-live="polite">
            {errors.email}
          </div>
       
      </div>

      {/* Password Input */}
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
         
          // aria-required="true"
          // aria-describedby="password-error"
          // placeholder="Enter your password"
        />
      
          <small id="password-error" role="alert" aria-live="assertive">
            {errors.password}
          </small>
      
      </div>

      {/* Submit Button */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AccessibleFormWithErrors;
