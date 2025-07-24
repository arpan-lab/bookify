import React from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await firebase.singinUserWithEmailAndPass(email, password);
      navigate("/");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await firebase.signinWithGoogle();
      navigate("/");
    } catch (err) {
      alert("Google Sign-In failed.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <label>Email</label>
          <input name="email" type="email" className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input name="password" type="password" className="form-control" required />
        </div>
        <button className="btn btn-primary w-100" type="submit">Login</button>
        <button className="btn btn-danger w-100 mt-2" type="button" onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
      </form>
      <p className="text-center mt-3">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default LoginPage;
