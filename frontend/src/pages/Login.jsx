import { useState } from "react";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import {
  auth,
  googleProvider,
} from "../firebase";

const Login = () => {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      console.log(
        "Logged In:",
        userCredential.user
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result =
        await signInWithPopup(
          auth,
          googleProvider
        );

      console.log(
        "Google Login:",
        result.user
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          Churn CRM
        </h1>

        <p className="text-gray-300 text-center mb-8">
          AI Powered Customer Intelligence
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all p-4 rounded-xl text-white font-semibold"
          >
            Login
          </button>
        </form>

        <div className="my-6 text-center text-gray-400">
          OR
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-black p-4 rounded-xl font-semibold hover:bg-gray-200 transition-all"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;