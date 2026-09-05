import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      const response = await api.get("/users", {
        params: { email: email.trim().toLowerCase(), password }
      });

      if (response.data.length > 0) {
        localStorage.setItem("user", JSON.stringify(response.data[0]));
        const destination = location.state?.from?.pathname || "/";
        navigate(destination, { replace: true });
      } else {
        setError("Invalid email or password.");
      }
    } catch {
      setError("Login failed. Please make sure JSON Server is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-container">
      <div className="auth-card">
        <p className="eyebrow">SIDDU'S THREAD MEMBERS</p>
        <h1>Welcome back</h1>
        <p className="auth-subtitle">Shop curated looks. Admins can manage the collection.</p>

        <form onSubmit={handleSubmit}>
          <label>Email<input type="email" placeholder="you@example.com" value={email} onChange={e => {setEmail(e.target.value);setError("");}} autoComplete="email" /></label>
          <label>Password<input type="password" placeholder="Enter your password" value={password} onChange={e => {setPassword(e.target.value);setError("");}} autoComplete="current-password" /></label>
          {error && <p className="auth-error">{error}</p>}
          <button className="primary-btn wide auth-btn" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </form>

        <p className="auth-footer">New to Siddu's Thread? <Link to="/register">Create an account</Link></p>
      </div>
    </main>
  );
}
