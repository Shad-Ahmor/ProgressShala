import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

export default function AccountCreate({ onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Please fill all required fields");
      return;
    }

    // ⭐ Send data up — NO API CALL
    onSuccess({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        maxWidth: "400px",
        padding: "20px",
        background: "rgba(255,255,255,0.05)",
        borderRadius: "12px",
      }}
    >
      <TextField
        fullWidth
        required
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        required
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        required
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        required
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        margin="normal"
      />



      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      <Button
        fullWidth
        variant="contained"
        type="submit"
        sx={{ mt: 2, py: 1.2 }}
      >
        Continue
      </Button>
    </form>
  );
}
