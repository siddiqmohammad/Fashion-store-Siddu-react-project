import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!user.name.trim() || !user.email.trim() || !user.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (user.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setSaving(true);
      const email = user.email.trim().toLowerCase();
      const existing = await api.get("/users", { params: { email } });

      if (existing.data.length > 0) {
        setError("An account with this email already exists.");
        return;
      }

      await api.post("/users", {
        name: user.name.trim(),
        email,
        password: user.password,
        role: "user"
      });

      alert("Registration successful. You can now login as a customer.");
      navigate("/login");
    } catch {
      setError("Registration failed. Please make sure JSON Server is running.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="auth-container">
      <div className="auth-card">
        <p className="eyebrow">WELCOME TO SIDDU'S THREAD</p>
        <h1>Create account</h1>
        <p className="auth-subtitle">Create a customer account and explore the collection.</p>

        <form onSubmit={handleSubmit}>
          <label>Name<input type="text" name="name" placeholder="Enter your name" value={user.name} onChange={handleChange} autoComplete="name" /></label>
          <label>Email<input type="email" name="email" placeholder="you@example.com" value={user.email} onChange={handleChange} autoComplete="email" /></label>
          <label>Password<input type="password" name="password" placeholder="Minimum 6 characters" value={user.password} onChange={handleChange} autoComplete="new-password" /></label>
          {error && <p className="auth-error">{error}</p>}
          <button className="primary-btn wide auth-btn" disabled={saving}>{saving ? "Creating account..." : "Create Account"}</button>
        </form>

        <p className="auth-footer">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </main>
  );
}
