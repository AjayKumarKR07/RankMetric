import { Link, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function Pricing() {
    const navigate = useNavigate();

    const handleUpgradeToPro = async () => {
        try {
            const storedUser = localStorage.getItem("user");

            if (!storedUser) {
                alert("Please login or register first to upgrade to Pro.");
                navigate("/login");
                return;
            }

            const currentUser = JSON.parse(storedUser);

            if (currentUser.plan === "pro") {
                alert("⭐ Your Pro plan is already active.");
                return;
            }

            const response = await fetch(
                "http://localhost:5000/api/payment/create-order",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || "Failed to create payment order");
            }

            const options = {
                key: data.key,
                amount: data.order.amount,
                currency: data.order.currency,
                name: "RankFlow",
                description: "RankFlow Pro Plan",
                order_id: data.order.id,
                handler: async function (response: any) {
                    try {
                        console.log("Razorpay payment response:", response);

                        const storedUser = localStorage.getItem("user");

                        if (!storedUser) {
                            throw new Error("Please login to activate Pro.");
                        }

                        const currentUser = JSON.parse(storedUser);

                        const verifyResponse = await fetch(
                            "http://localhost:5000/api/payment/verify",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature,
                                    email: currentUser.email,
                                }),
                            }
                        );

                        const verifyData = await verifyResponse.json();

                        if (!verifyData.success) {
                            throw new Error(
                                verifyData.message || "Payment verification failed"
                            );
                        }

                        console.log("Payment verified:", verifyData);

                        if (verifyData.user) {
                            localStorage.setItem(
                                "user",
                                JSON.stringify(verifyData.user)
                            );
                        }

                        alert(
                            "🎉 Payment verified successfully! Welcome to RankFlow Pro."
                        );

                        window.location.reload();
                    } catch (error: any) {
                        console.error("Payment verification error:", error);

                        alert(
                            error.message ||
                            "Payment completed, but verification failed."
                        );
                    }
                },
                theme: {
                    color: "#2563eb",
                },
            };

            const Razorpay = (window as any).Razorpay;

            if (!Razorpay) {
                alert("Razorpay Checkout failed to load.");
                return;
            }

            const razorpay = new Razorpay(options);

            razorpay.open();
        } catch (error: any) {
            console.error("Payment error:", error);

            alert(
                error.message ||
                "Something went wrong while starting the payment."
            );
        }
    };

    const handleStartFree = () => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
  navigate("/dashboard");
} else {
  navigate("/login");
}
};

    return (
        <section className="relative py-28 overflow-hidden">
            <div className="absolute inset-0 -z-10 overflow-hidden">

    <div className="absolute top-20 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[150px]" />

    <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px]" />

</div>
            <div className="bg-dot-pattern absolute inset-0 -z-1 opacity-10"></div>
            <div className="max-w-5xl w-full mx-auto px-4 ">
                <div className="text-center mb-14">
                    <h2 className="text-5xl font-bold mb-5">
                        Simple <span className="gradient-text">Pricing</span>
                    </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Start free. Upgrade when you need more.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {/* Free */}
                    <div className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 flex flex-col transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]">
                        <h3 className="text-xl font-semibold mb-1 text-foreground">Free</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-bold text-foreground">$0</span>
                            <span className="text-muted-foreground">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                            {[
    "3 website analyses per account",
    "Full SEO report",
    "AI SEO recommendations",
    "Keyword analysis",
    "Export PDF report",
].map((item) => (
                                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CheckCircle size={16} className="text-primary shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <button
  onClick={handleStartFree}
  className="block w-full py-3 rounded-2xl bg-blue-600 text-white text-center font-medium hover:bg-blue-700 transition-all duration-300"
>
  🚀 Start Free
</button>
                    </div>

                    {/* Pro */}
                   <div className="relative rounded-3xl border-2 border-blue-500 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl p-8 flex flex-col transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_60px_rgba(59,130,246,0.35)]">
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium" style={{ color: "var(--background)" }}>
                            ⭐ Most Popular
                        </div>
                        <h3 className="text-xl font-semibold mb-1 text-foreground">Pro</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-bold text-primary">₹100</span>
                            <span className="text-muted-foreground">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                            {["Unlimited analyses", "Priority processing", "Competitor analysis", "Historical tracking", "API access", "Email reports"].map((item) => (
                                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CheckCircle
    size={18}
    className="text-green-500 shrink-0"
/>
                                    {item}
                                </li>
                            ))}
                        </ul>
                      {(() => {
  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser
    ? JSON.parse(storedUser)
    : null;

  const isPro = currentUser?.plan === "pro";


  const daysRemaining = currentUser?.proExpiresAt
  ? Math.ceil(
      (new Date(currentUser.proExpiresAt).getTime() - Date.now()) /
        (1000 * 60 * 60 * 24)
    )
  : 0;

const canRenew =
  isPro &&
  daysRemaining <= 7;

  const expiryDate =
    isPro && currentUser?.proExpiresAt
      ? new Date(currentUser.proExpiresAt).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        )
      : null;

  return (
    <div className="space-y-2">

      <button
        onClick={isPro ? undefined : handleUpgradeToPro}
        disabled={isPro}
        className={`w-full py-3 rounded-2xl text-white font-medium transition-all duration-300 ${
          isPro
            ? "bg-green-600 cursor-default"
            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105"
        }`}
      >
        {isPro
          ? "⭐ Pro Active"
          : "🚀 Upgrade to Pro"}
      </button>

      {isPro && expiryDate && (
        <p className="text-sm text-center text-muted-foreground">
          Pro active until {expiryDate}
        </p>
      )}
      {isPro && canRenew && (
  <button
    onClick={handleUpgradeToPro}
    className="w-full py-3 mt-2 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:scale-105 transition-all duration-300"
  >
    🔄 Renew Pro — ₹100
  </button>
)}

    </div>
  );
})()}
                    </div>
                </div>
            </div>
        </section>
    );
}
