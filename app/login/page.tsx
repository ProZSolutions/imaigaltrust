"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaUserShield,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Forgot Password + OTP state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");


const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

 const [showResetModal, setShowResetModal] = useState(false);

//OTP hide state
  const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  if (!mounted) return null;

  // Login submit
  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) router.push("/admin");
      else alert(result.message || "Login failed");
    } catch (err) {
      console.error(err);
      alert("Server error, try again later");
    } finally {
      setLoading(false);
    }
  };

  //  Send OTP
  const sendOtp = async () => {
if (!forgotEmail) return toast.error("Enter your email");
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message || "Failed to send OTP");

      toast.success(data.message || "OTP sent to your email!");
      setShowForgotModal(false);
      setShowOtpModal(true);
    } catch (err) {
      console.error(err);
      alert("Server error, try again later");
    }
  };

  // Submit OTP
 const submitOtp = () => {
if (!otp) return toast.error("Enter OTP");
toast.success("OTP verified successfully!");
  setShowOtpModal(false);
  setShowResetModal(true); 
};

const resetPassword = async () => {
  if (!newPassword || !confirmPassword) return alert("Enter all fields");
  if (newPassword !== confirmPassword) return alert("Passwords do not match");

  try {
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: forgotEmail, newPassword }),
    });

    const data = await res.json();

    if (!res.ok) return alert(data.message || "Failed to reset password");

    alert(data.message); 
    setShowResetPasswordModal(false);
    setNewPassword("");
    setConfirmPassword("");
  } catch (err) {
    console.error(err);
    alert("Server error, try again later");
  }
};

  return (
    <div className="min-h-screen bg-[#F0FDF4] flex items-center justify-center p-6 poppins-font">
      <div className="w-full max-w-[500px] relative">
        {/* Login Card */}
        <div className="bg-white rounded-[2rem] shadow-lg overflow-hidden border border-white/40">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#166534] via-[#15803d] to-[#14532D] p-6 text-center relative">
            <div className="relative z-10 flex justify-center mb-3">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-xl rotate-[8deg] hover:rotate-0 transition-all duration-500">
                <FaUserShield className="text-2xl text-[#166534]" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
            <p className="text-green-50 text-xs font-medium">Sign in to your account</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div>
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Email Address
                </label>
                <div className="relative mt-1">
                  <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className={`w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-xl outline-none transition
                    ${errors.email ? "border-red-400" : "border-gray-200 focus:border-[#166534]"}`}
                    {...register("email", { required: "Email is required" })}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                <div className="relative mt-1">
                  <FaLock className="absolute left-4 top-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#166534]"
                    {...register("password", { required: "Password is required" })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs font-semibold text-[#166534]"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#166534] hover:bg-[#14532D] text-white font-bold py-3 rounded-xl transition shadow-lg"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
    <div className="relative w-full max-w-md mx-4 bg-white rounded-3xl shadow-2xl p-8">

      {/* Close Button */}
      <button
        onClick={() => setShowForgotModal(false)}
        className="absolute top-5 right-5 text-gray-400 hover:text-red-500 transition"
      >
        ✕
      </button>

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
        <p className="text-gray-500 text-sm mt-2">
          Enter your registered email to receive an OTP.
        </p>
      </div>

      {/* Email Field */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Email Address
        </label>
        <input
          type="email"
          placeholder="name@example.com"
          value={forgotEmail}
          onChange={(e) => setForgotEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2  outline-none transition"
        />
      </div>

      {/* Button */}
      <button
        onClick={sendOtp}
        className="w-full py-3 bg-gradient-to-r from-green-900 to-green-900 text-white font-semibold rounded-lg  transition"
      >
        Send OTP
      </button>

    </div>
  </div>
)}

      {/* OTP Modal */}
      {showOtpModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md transition">
    <div className="bg-white p-8 rounded-3xl max-w-md w-full relative shadow-2xl border border-gray-100">

      <button
        onClick={() => setShowOtpModal(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
      >
        ✕
      </button>

      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Enter OTP
      </h2>

      <div className="flex justify-center gap-3 mb-5">
  {[0,1,2,3,4,5].map((i) => (
    <input
      key={i}
      type="text"
      maxLength={1}
      value={otp[i] || ""}
      onChange={(e) => {
        const value = e.target.value;
        const newOtp = otp.split("");
        newOtp[i] = value;
        setOtp(newOtp.join(""));

        const next = e.currentTarget.nextElementSibling as HTMLInputElement | null;
        if (value && next) {
          next.focus();
        }
      }}
      onKeyDown={(e) => {
        const prev = e.currentTarget.previousElementSibling as HTMLInputElement | null;
        if (e.key === "Backspace" && !otp[i] && prev) {
          prev.focus();
        }
      }}
      className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/30 transition"
    />
  ))}
</div>

      <button
        onClick={submitOtp}
        className="w-full bg-[#166534] hover:bg-[#14532d] text-white py-3 rounded-xl font-medium shadow-md transition duration-200"
      >
        Submit OTP
      </button>

    </div>
  </div>
)}


{/* Reset Password Modal */}
      {showResetModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
    <div className="bg-white p-8 rounded-3xl max-w-md w-full relative shadow-2xl border border-gray-100">

      <button
        onClick={() => setShowResetModal(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
      >
        ✕
      </button>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Reset Password</h2>
        <p className="text-sm text-gray-500 mt-1">
          Create a new secure password for your account
        </p>
      </div>

     <div className="relative mb-4">
  <input
    type={showNewPassword ? "text" : "password"}
    placeholder="New Password"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/30 transition"
  />

  <button
    type="button"
    onClick={() => setShowNewPassword(!showNewPassword)}
    className="absolute right-4 top-3 text-gray-400 hover:text-gray-700"
  >
    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>

<div className="relative mb-6">
  <input
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/30 transition"
  />

  <button
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className="absolute right-4 top-3 text-gray-400 hover:text-gray-700"
  >
    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>

      <button
        onClick={async () => {
          if (!newPassword || !confirmPassword)
           return toast.error("Fill all fields");
          if (newPassword !== confirmPassword)
            return toast.error("Passwords do not match");

          try {
            const res = await fetch("/api/reset-password", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: forgotEmail, newPassword }),
            });

            const data = await res.json();

            if (!res.ok) return alert(data.message || "Failed to reset password");

            toast.success(data.message);

            setShowResetModal(false);
            setNewPassword("");
            setConfirmPassword("");
            setForgotEmail("");
          } catch (err) {
            console.error(err);
            toast.error("Server error, try again later");
          }
        }}
        className="w-full bg-gradient-to-r from-[#166534] to-[#14532D] hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-md transition"
      >
        Reset Password
      </button>

    </div>
  </div>
)}

{/* New Password Modal */}
{showResetPasswordModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="bg-white p-8 rounded-2xl max-w-md w-full relative">
      <button
        onClick={() => setShowResetPasswordModal(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>

      <h2 className="text-xl font-bold text-center mb-2">Reset Password</h2>

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full p-3 border border-gray-200 rounded-xl mb-4 outline-none focus:border-[#166534]"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full p-3 border border-gray-200 rounded-xl mb-4 outline-none focus:border-[#166534]"
      />

      <button
        onClick={resetPassword}
        className="w-full bg-[#166534] text-white py-3 rounded-xl"
      >
        Reset Password
      </button>
    </div>
  </div>
)}
    <Toaster />
    </div>
  );
}