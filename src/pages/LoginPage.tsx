import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success(response.data.message);
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F4FF] px-6 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl shadow-violet-100"
      >
        <Link to="/" className="heading-font text-3xl font-bold text-violet-600">
            Signetly✨
        </Link>

        <h1 className="heading-font mt-8 text-4xl font-bold text-slate-900">
          Welcome back
        </h1>

        <p className="mt-2 text-slate-500">
          Login to continue managing your documents.
        </p>

        <div className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-[#F7F4FF] px-5 py-4 outline-none focus:border-violet-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-[#F7F4FF] px-5 py-4 outline-none focus:border-violet-400"
          />
        </div>

        <button
          type="submit"
          className="mt-7 w-full rounded-2xl bg-violet-500 px-6 py-4 font-bold text-white shadow-lg shadow-violet-200 hover:bg-violet-600"
        >
          Login
        </button>

        <p className="mt-6 text-center text-slate-500">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-bold text-rose-500">
            Create one
          </Link>
        </p>
      </form>
    </main>
  );
}

export default LoginPage;