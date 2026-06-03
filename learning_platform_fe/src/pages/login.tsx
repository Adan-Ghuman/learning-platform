import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const { data } = await api.post("/login", { email, password });
            localStorage.setItem("token", data.token);
            navigate("/");
            // Force reload or state update to reflect auth state across app
            window.location.reload();
        } catch (err: any) {
            setError(err.response?.data?.error || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grow flex items-center justify-center p-4">
            <div className="max-w-md w-full p-8 border border-border-subtle bg-surface rounded-xl shadow-lg">
                <h1 className="text-3xl font-display font-medium mb-6 text-center text-ink tracking-tight">Welcome Back</h1>
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6 border border-red-200 text-sm font-medium text-center">
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-ink-light uppercase tracking-wider">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary p-3 rounded-md transition-all duration-200"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-ink-light uppercase tracking-wider">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary p-3 rounded-md transition-all duration-200"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-surface py-3 rounded-md font-semibold tracking-wide hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-2"
                    >
                        {loading ? "Signing in..." : "Login"}
                    </button>
                </form>
                <div className="mt-8 text-sm text-ink-light border-t border-border-subtle pt-6 flex flex-col items-center">
                    {/* DEV ONLY: Demo accounts - remove in production */}
                    <p className="mb-4 text-center text-ink-light font-bold uppercase tracking-wider text-xs">Demo Accounts</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                        <button
                            type="button"
                            onClick={() => {
                                setEmail("john@example.com");
                                setPassword("password123");
                            }}
                            className="flex flex-col items-center p-3 border border-border-subtle rounded-md hover:bg-surface-alt hover:border-primary transition-all duration-200 text-ink shadow-sm active:scale-95"
                        >
                            <span className="font-bold mb-1 font-display">John Doe</span>
                            <span className="text-xs text-ink-light mb-1">john@example.com</span>
                            <span className="text-xs text-ink-light opacity-70">password123</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setEmail("sarah@example.com");
                                setPassword("password123");
                            }}
                            className="flex flex-col items-center p-3 border border-border-subtle rounded-md hover:bg-surface-alt hover:border-primary transition-all duration-200 text-ink shadow-sm active:scale-95"
                        >
                            <span className="font-bold mb-1 font-display">Sarah Smith</span>
                            <span className="text-xs text-ink-light mb-1">sarah@example.com</span>
                            <span className="text-xs text-ink-light opacity-70">password123</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setEmail("mike@example.com");
                                setPassword("password123");
                            }}
                            className="flex flex-col items-center p-3 border border-border-subtle rounded-md hover:bg-surface-alt hover:border-primary transition-all duration-200 text-ink shadow-sm active:scale-95"
                        >
                            <span className="font-bold mb-1 font-display">Mike Johnson</span>
                            <span className="text-xs text-ink-light mb-1">mike@example.com</span>
                            <span className="text-xs text-ink-light opacity-70">password123</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
