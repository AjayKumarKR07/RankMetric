import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Mail,
  Loader2,
  ChartNoAxesColumnIcon,
  KeyRound,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // ===========================
  // Send OTP
  // ===========================

  const handleSendOtp = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(
          data.message || "Failed to send OTP"
        );
      }

      setOtpSent(true);

      alert(
        "📧 OTP sent successfully. Please check your email."
      );

    } catch (error: any) {
      console.error(
        "Send OTP Error:",
        error
      );

      alert(
        error.message ||
          "Failed to send OTP. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Verify OTP
  // ===========================

  const handleVerifyOtp = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(
          data.message || "OTP verification failed"
        );
      }

      // Save JWT
      localStorage.setItem(
        "token",
        data.token
      );

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      console.log(
        "OTP Login Successful:",
        data.user
      );

      // Go to dashboard
      navigate("/dashboard");

    } catch (error: any) {
      console.error(
        "Verify OTP Error:",
        error
      );

      alert(
        error.message ||
          "Invalid OTP. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Logo */}

        <div className="text-center mb-8">

          <Link
            to="/"
            className="flex items-center justify-center gap-2 group mb-10"
          >
            <ChartNoAxesColumnIcon />

            <span className="text-xl tracking-tight text-foreground">
              RankFlow
            </span>

          </Link>

        </div>


        {/* Login Card */}

        <div className="bg-card border border-border rounded-2xl p-8">

          <div className="text-center py-5">

            <h1 className="text-2xl text-foreground">
              Welcome to RankFlow
            </h1>

            <p className="text-muted-foreground text-sm mt-1">
              Sign in securely with your email OTP
            </p>

          </div>


          {/* ===========================
              Email Form
          =========================== */}

          {!otpSent && (

            <form
              onSubmit={handleSendOtp}
              className="space-y-5"
            >

              <label>

                <div className="block text-sm text-foreground mb-1.5">
                  Email
                </div>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 rounded-lg bg-muted/60 border border-border text-foreground placeholder-muted-foreground outline-none focus:border-primary/50 transition-colors text-sm"
                  />

                </div>

              </label>


              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >

                {loading ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  "Send OTP"
                )}

              </button>

            </form>

          )}


          {/* ===========================
              OTP Verification Form
          =========================== */}

          {otpSent && (

            <form
              onSubmit={handleVerifyOtp}
              className="space-y-5"
            >

              <div className="text-center text-sm text-muted-foreground mb-4">

                OTP sent to

                <div className="text-foreground font-medium mt-1">
                  {email}
                </div>

              </div>


              <label>

                <div className="block text-sm text-foreground mb-1.5">
                  Enter 6-digit OTP
                </div>

                <div className="relative">

                  <KeyRound
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    value={otp}
                    onChange={(e) =>
                      setOtp(
                        e.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                    placeholder="Enter OTP"
                    className="w-full pl-11 pr-4 py-3 rounded-lg bg-muted/60 border border-border text-foreground placeholder-muted-foreground outline-none focus:border-primary/50 transition-colors text-sm tracking-widest"
                  />

                </div>

              </label>


              <button
                type="submit"
                disabled={
                  loading ||
                  otp.length !== 6
                }
                className="w-full py-3 mt-5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >

                {loading ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  "Verify OTP & Continue"
                )}

              </button>


              {/* Change Email */}

              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setOtp("");
                }}
                className="w-full text-sm text-primary hover:underline"
              >
                Change Email
              </button>

            </form>

          )}

        </div>


        <p className="text-center text-sm text-muted-foreground mt-6">
          No password required. New users are automatically registered.
        </p>

      </div>

    </div>
  );
}