import { Badge } from "flowbite-react";
import { IoRestaurantSharp } from "react-icons/io5";
import { IoBagOutline, IoPersonOutline, IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";

export default function NavbarComp() {
    const { isLogin, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();

    function handleClickLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav style={{
            background: '#1C1C1C',
            padding: '0 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
            fontFamily: 'DM Sans, sans-serif',
        }}>

            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <IoRestaurantSharp style={{ fontSize: '22px', color: '#C9A84C' }} />
                <span style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    color: '#FAF7F2',
                    letterSpacing: '0.5px',
                }}>
                    Resto Makanan
                </span>
            </Link>

            {/* Nav Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                <Link to="/" style={{
                    color: 'rgba(250,247,242,0.6)', textDecoration: 'none',
                    fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase',
                    fontWeight: '500', transition: 'color 0.2s',
                }}
                    onMouseOver={e => e.target.style.color = '#C9A84C'}
                    onMouseOut={e => e.target.style.color = 'rgba(250,247,242,0.6)'}
                >
                    Beranda
                </Link>
                <Link to="/products" style={{
                    color: 'rgba(250,247,242,0.6)', textDecoration: 'none',
                    fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase',
                    fontWeight: '500', transition: 'color 0.2s',
                }}
                    onMouseOver={e => e.target.style.color = '#C9A84C'}
                    onMouseOut={e => e.target.style.color = 'rgba(250,247,242,0.6)'}
                >
                    Menu
                </Link>
            </div>

            {/* Right Side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

                {/* Cart */}
                <Link to="/cart" style={{ position: 'relative', textDecoration: 'none' }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '40px', height: '40px',
                        border: '1.5px solid rgba(250,247,242,0.2)',
                        borderRadius: '2px', transition: 'border-color 0.2s',
                        cursor: 'pointer',
                    }}
                        onMouseOver={e => e.currentTarget.style.borderColor = '#C9A84C'}
                        onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(250,247,242,0.2)'}
                    >
                        <IoBagOutline style={{ fontSize: '18px', color: '#FAF7F2' }} />
                    </div>
                    {cart.length > 0 && (
                        <div style={{
                            position: 'absolute', top: '-6px', right: '-6px',
                            background: '#B85C38', color: '#FAF7F2',
                            width: '18px', height: '18px', borderRadius: '50%',
                            fontSize: '10px', fontWeight: '700',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            {cart.length}
                        </div>
                    )}
                </Link>

                {/* Profile */}
                <Link to="/profile" style={{ textDecoration: 'none' }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '40px', height: '40px',
                        border: '1.5px solid rgba(250,247,242,0.2)',
                        borderRadius: '2px', transition: 'border-color 0.2s',
                        cursor: 'pointer',
                    }}
                        onMouseOver={e => e.currentTarget.style.borderColor = '#C9A84C'}
                        onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(250,247,242,0.2)'}
                    >
                        <IoPersonOutline style={{ fontSize: '18px', color: '#FAF7F2' }} />
                    </div>
                </Link>

                {/* Logout */}
                {isLogin != null && (
                    <button
                        onClick={handleClickLogout}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            background: 'transparent',
                            border: '1.5px solid #B85C38',
                            color: '#B85C38', padding: '8px 16px',
                            borderRadius: '2px', cursor: 'pointer',
                            fontSize: '12px', letterSpacing: '1.5px',
                            textTransform: 'uppercase', fontWeight: '600',
                            fontFamily: 'DM Sans, sans-serif',
                            transition: 'all 0.2s',
                        }}
                        onMouseOver={e => { e.currentTarget.style.background = '#B85C38'; e.currentTarget.style.color = '#FAF7F2'; }}
                        onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#B85C38'; }}
                    >
                        <IoLogOutOutline style={{ fontSize: '16px' }} />
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}