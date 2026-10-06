import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { User, Mail, Shield } from "lucide-react";

export default function Settings() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [showCurrent, setShowCurrent] = useState(false);
const [showNew, setShowNew] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      email,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("✅ Profile updated successfully!");

    window.location.reload();
  };

  const handlePasswordUpdate = async () => {
  if (!currentPassword || !newPassword || !confirmPassword) {
    alert("Please fill all password fields.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("New password and confirm password do not match.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        currentPassword,
        newPassword,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("✅ Password updated successfully!");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("❌ Failed to update password.");
  }
};

  return (
    <div className="min-h-screen pt-24 max-w-5xl mx-auto px-6">

      <h1 className="text-3xl font-bold mb-8">
        Account Settings
      </h1>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">

        {/* Profile Header */}

        <div className="flex items-center gap-4 mb-10">

          <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
            {name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {name}
            </h2>

            <p className="text-gray-500">
              {email}
            </p>
          </div>

        </div>

        {/* Name */}

        <div className="mb-6">

          <label className="flex items-center gap-2 mb-2 font-semibold">
            <User size={18} />
            Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Email */}

        <div className="mb-6">

          <label className="flex items-center gap-2 mb-2 font-semibold">
            <Mail size={18} />
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Plan */}

        <div className="mb-8 rounded-xl border border-gray-300 dark:border-gray-700 p-5">

          <div className="flex items-center gap-3">

            <Shield className="text-blue-600" />

            <div>

              <div className="font-semibold">
                Current Plan
              </div>

              <div className="text-gray-500">
                {user.plan || "Free"}
              </div>

            </div>

          </div>

        </div>


        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Change Password
          </h2>

          <div className="space-y-5">

            <div>
              <label className="block mb-2 font-medium">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 pr-12 bg-transparent"
                />

                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">New Password</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 pr-12 bg-transparent"
                />

                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 pr-12 bg-transparent"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Buttons */}

        <div className="mt-8 flex flex-col items-center gap-5">

          {/* Update Password */}

          <button
            onClick={handlePasswordUpdate}
            className="rounded-xl bg-red-600 px-10 py-3 text-white font-semibold hover:bg-red-700 transition"
          >
            Update Password
          </button>

          {/* Save Profile */}

          <button
            onClick={handleSave}
            className="w-full rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}
