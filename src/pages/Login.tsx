import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  // LOGIN STATE
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // SIGNUP STATE
  const [signupName, setSignupName] = useState("");
  const [signupAge, setSignupAge] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  // LOGIN HANDLER
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      alert("Please fill all details.");
      return;
    }
    navigate("/dashboard");
  };

  // SIGNUP HANDLER  ✅ UPDATED
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!signupName || !signupEmail || !signupPassword) {
      alert("Please fill all fields!");
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Account created!");

    // ✅ Redirect to SURVEY page after signup
    navigate("/patient-survey");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-sky-100 to-sky-200 flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-16">

        {/* ---------------- LEFT SIDE ---------------- */}
        <div className="flex-1 text-left">

          {/* Logo & App Name */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-4xl font-bold">♥</span>
            </div>

            <h1 className="text-6xl font-bold text-sky-700 tracking-tight leading-none">
              LifeConnect
            </h1>
          </div>

          {/* Description */}
          <p className="text-gray-600 max-w-md text-lg leading-relaxed mb-10">
            A next-gen emergency intelligence platform connecting patients,
            hospitals, ambulances with real-time secure access.
          </p>

          {/* Highlights */}
          <div className="flex gap-12 text-xl font-semibold text-sky-700">

            <div>
              <span className="text-3xl font-bold">24/7</span>
              <p className="text-gray-500 text-sm">Availability</p>
            </div>

            <div>
              <span className="text-3xl font-bold">Instant</span>
              <p className="text-gray-500 text-sm">Response</p>
            </div>

            <div>
              <span className="text-3xl font-bold">Secure</span>
              <p className="text-gray-500 text-sm">Encrypted Data</p>
            </div>

          </div>
        </div>

        {/* ---------------- RIGHT FORM CARD ---------------- */}
        <div className="flex-1">
          <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-sky-100">

            <h2 className="text-3xl font-semibold mb-6 text-gray-800">
              Get Started
            </h2>

            {/* TABS */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-8 shadow-inner">
              <button
                className={`flex-1 py-2 text-center font-medium rounded-lg transition-all duration-300 ${
                  activeTab === "login"
                    ? "bg-white shadow text-gray-900"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>

              <button
                className={`flex-1 py-2 text-center font-medium rounded-lg transition-all duration-300 ${
                  activeTab === "signup"
                    ? "bg-white shadow text-gray-900"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("signup")}
              >
                Sign Up
              </button>
            </div>

            {/* ------------------ LOGIN FORM ------------------ */}
            {activeTab === "login" && (
              <form onSubmit={handleLogin} className="animate-fadeIn">

                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-700 
                     placeholder-gray-400 focus:border-sky-500 
                     focus:ring-2 focus:ring-sky-300 outline-none transition"
                  placeholder="your @email.com"
                  onChange={(e) => setLoginEmail(e.target.value)}
                />

                <label className="block font-medium mb-1 mt-4">Password</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-700 
                     placeholder-gray-400 focus:border-sky-500 
                     focus:ring-2 focus:ring-sky-300 outline-none transition"
                  placeholder="••••••••"
                  onChange={(e) => setLoginPassword(e.target.value)}
                />

                <button className="mt-6 w-full bg-sky-600 text-white py-3 rounded-xl text-lg font-medium shadow hover:bg-sky-700 transition">
                  Login
                </button>
              </form>
            )}

            {/* ------------------ SIGNUP FORM ------------------ */}
            {activeTab === "signup" && (
              <form onSubmit={handleSignup} className="animate-fadeIn">

                <label className="block font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-700 
                     placeholder-gray-400 focus:border-sky-500 
                     focus:ring-2 focus:ring-sky-300 outline-none transition"
                  placeholder="John Doe"
                  onChange={(e) => setSignupName(e.target.value)}
                />

                <label className="block font-medium mb-1 mt-4">Age</label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-700 
                     placeholder-gray-400 focus:border-sky-500 
                     focus:ring-2 focus:ring-sky-300 outline-none transition"
                  placeholder="25"
                  onChange={(e) => setSignupAge(e.target.value)}
                />

                <label className="block font-medium mb-1 mt-4">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-700 
                     placeholder-gray-400 focus:border-sky-500 
                     focus:ring-2 focus:ring-sky-300 outline-none transition"
                  placeholder="your @email.com"
                  onChange={(e) => setSignupEmail(e.target.value)}
                />

                <label className="block font-medium mb-1 mt-4">Password</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-700 
                     placeholder-gray-400 focus:border-sky-500 
                     focus:ring-2 focus:ring-sky-300 outline-none transition"
                  onChange={(e) => setSignupPassword(e.target.value)}
                />

                <label className="block font-medium mb-1 mt-4">Confirm Password</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-700 
                     placeholder-gray-400 focus:border-sky-500 
                     focus:ring-2 focus:ring-300 outline-none transition"
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                />

                <button className="mt-6 w-full bg-sky-600 text-white py-3 rounded-xl text-lg font-medium shadow hover:bg-sky-700 transition">
                  Create Account
                </button>
              </form>
            )}

            {/* EMERGENCY ACCESS */}
            <div className="my-8 border-t"></div>
            <button
              className="w-full py-3 border text-red-500 border-red-400 rounded-lg hover:bg-red-50 font-medium transition"
              onClick={() => navigate("/accident-report")}
            >
              ⚠ Emergency Access (No Login Required)
            </button>

          </div>
        </div>
      </div>

      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Login;