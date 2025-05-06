// src/pages/Register.jsx
import { useState } from "react";
import axios from "../utils/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      alert("Registered successfully!");
    } catch (err) {
      alert(err.response.data.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          className="w-full p-2 border"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full p-2 border"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 border"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
