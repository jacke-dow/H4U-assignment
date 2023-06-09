import styles from "./App.module.css";
import { useState } from "react";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    dob: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Submit the form data to the server
      saveFormData(formData);
      // Reset the form
      setFormData({
        name: "",
        email: "",
        address: "",
        phone: "",
        dob: "",
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate name
    if (!formData.name) {
      errors.name = "Name is required";
    } else if (/[!@#$%^&*(),.?":{}|<>]/.test(formData.name)) {
      errors.name = "Name should not contain special characters";
    }

    // Validate email
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    // Validate address
    if (!formData.address) {
      errors.address = "Address is required";
    }

    // Validate phone
    if (!formData.phone) {
      errors.phone = "Phone is required";
    } else if (!/^[1-9]\d{9}$/.test(formData.phone)) {
      errors.phone = "Invalid phone number";
    }

    // Validate dob
    if (!formData.dob) {
      errors.dob = "Date of birth is required";
    } else if (!/^\d{2}-\d{2}-\d{4}$/.test(formData.dob)) {
      errors.dob = "Invalid date format (DD-MM-YYYY)";
    }

    return errors;
  };

  const saveFormData = (data) => {
    // Send the form data to the server
    fetch("http://localhost:5000/api/formData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the server response
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <span>{errors.address}</span>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span>{errors.phone}</span>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
        {errors.dob && <span>{errors.dob}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default App;
