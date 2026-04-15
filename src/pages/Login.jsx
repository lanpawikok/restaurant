import { useContext, useState } from "react";
import { HiX } from "react-icons/hi";
import { IoRestaurantSharp, IoMailOutline, IoLockClosedOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
    const [formValue, setFormValue] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { checkLogin } = useContext(AuthContext);

    function handleSubmitForm() {
        if (formValue.email == "" || formValue.password == "") {
            setError("Pastikan email dan password terisi.");
        } else {
            setError("");
            authLogin();
        }
    }

    async function authLogin() {
        setLoading(true);
        const url = "https://api.escuelajs.co/api/v1/auth/login";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formValue),
            });
            if (!response.ok) throw new Error(`Response status: ${response.status}`);
            const result = await response.json();
            checkLogin();
            localStorage.setItem("access_token", result.access_token);
            localStorage.setItem("refresh_token", result.refresh_token);
            navigate("/cart");
        } catch (error) {
            setError("Email atau password salah, coba lagi.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#FAF7F2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'DM Sans, sans-serif',
            padding: '20px',
        }}>
            <div style={{ width: '100%', maxWidth: '420px' }}>

                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{
                        width: '56px', height: '56px',
                        background: '#1C1C1C', borderRadius: '4px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 16px',
                    }}>
                        <IoRestaurantSharp style={{ fontSize: '24px', color: '#C9A84C' }} />
                    </div>
                    <h1 style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '2rem', fontWeight: '900',
                        color: '#1C1C1C', marginBottom: '6px',
                    }}>
                        Selamat Datang
                    </h1>
                    <p style={{ color: '#999', fontSize: '13px', letterSpacing: '0.5px' }}>
                        Masuk untuk melanjutkan pesanan Anda
                    </p>
                </div>

                {/* Error Toast */}
                {error && (
                    <div style={{
                        background: '#FEF2F2',
                        border: '1px solid #FECACA',
                        borderLeft: '4px solid #B85C38',
                        borderRadius: '2px',
                        padding: '12px 16px',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <HiX style={{ color: '#B85C38', fontSize: '16px', flexShrink: 0 }} />
                            <p style={{ fontSize: '13px', color: '#B85C38', fontWeight: '500' }}>{error}</p>
                        </div>
                        <button
                            onClick={() => setError("")}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B85C38', fontSize: '16px' }}
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Form Card */}
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: '4px',
                    padding: '36px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                }}>
                    {/* Email */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block', fontSize: '11px',
                            letterSpacing: '2px', textTransform: 'uppercase',
                            color: '#666', fontWeight: '600', marginBottom: '8px',
                        }}>
                            Email
                        </label>
                        <div style={{ position: 'relative' }}>
                            <IoMailOutline style={{
                                position: 'absolute', left: '14px', top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#999', fontSize: '16px',
                            }} />
                            <input
                                type="email"
                                placeholder="nama@email.com"
                                onKeyUp={(e) => setFormValue({ ...formValue, email: e.target.value })}
                                style={{
                                    width: '100%', padding: '12px 14px 12px 40px',
                                    border: '1.5px solid #E8E2D9', borderRadius: '2px',
                                    fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
                                    color: '#1C1C1C', background: '#FAF7F2',
                                    outline: 'none', boxSizing: 'border-box',
                                    transition: 'border-color 0.2s',
                                }}
                                onFocus={e => e.target.style.borderColor = '#C9A84C'}
                                onBlur={e => e.target.style.borderColor = '#E8E2D9'}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: '28px' }}>
                        <label style={{
                            display: 'block', fontSize: '11px',
                            letterSpacing: '2px', textTransform: 'uppercase',
                            color: '#666', fontWeight: '600', marginBottom: '8px',
                        }}>
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <IoLockClosedOutline style={{
                                position: 'absolute', left: '14px', top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#999', fontSize: '16px',
                            }} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                onKeyUp={(e) => setFormValue({ ...formValue, password: e.target.value })}
                                style={{
                                    width: '100%', padding: '12px 14px 12px 40px',
                                    border: '1.5px solid #E8E2D9', borderRadius: '2px',
                                    fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
                                    color: '#1C1C1C', background: '#FAF7F2',
                                    outline: 'none', boxSizing: 'border-box',
                                    transition: 'border-color 0.2s',
                                }}
                                onFocus={e => e.target.style.borderColor = '#C9A84C'}
                                onBlur={e => e.target.style.borderColor = '#E8E2D9'}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmitForm}
                        disabled={loading}
                        style={{
                            width: '100%', padding: '14px',
                            background: loading ? '#999' : '#1C1C1C',
                            color: '#FAF7F2', border: 'none',
                            borderRadius: '2px', fontFamily: 'DM Sans, sans-serif',
                            fontWeight: '700', fontSize: '13px',
                            letterSpacing: '2px', textTransform: 'uppercase',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'background 0.2s',
                        }}
                        onMouseOver={e => { if (!loading) e.currentTarget.style.background = '#C9A84C'; }}
                        onMouseOut={e => { if (!loading) e.currentTarget.style.background = '#1C1C1C'; }}
                    >
                        {loading ? 'Memproses...' : 'Masuk →'}
                    </button>
                </div>

                {/* Footer */}
                <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '12px', color: '#999' }}>
                    © 2026 Resto Makanan. All rights reserved.
                </p>
            </div>
        </div>
    );
}