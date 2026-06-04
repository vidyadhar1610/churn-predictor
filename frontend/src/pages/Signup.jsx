import { useState } from "react";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import { auth } from "../firebase";

const Signup = () => {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      await sendEmailVerification(
        userCredential.user
      );

      alert(
        "Verification email sent"
      );

      console.log(
        "User Created:",
        userCredential.user
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          Create Account
        </h1>

        <p className="text-gray-300 text-center mb-8">
          Join the AI Churn CRM Platform
        </p>

        <form
          onSubmit={handleSignup}
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
            className="w-full bg-purple-600 hover:bg-purple-700 transition-all p-4 rounded-xl text-white font-semibold"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;