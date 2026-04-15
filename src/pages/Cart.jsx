import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { FaTrash } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const { cart, updateQtyProduct, deleteProduct, deleteAll } = useContext(CartContext);
    const navigate = useNavigate();

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    function handleCheckOut() {
        navigate("/payment");
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#FAF7F2',
            fontFamily: 'DM Sans, sans-serif',
            padding: '40px 20px',
        }}>
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>

                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <p style={{
                        color: '#C9A84C', fontSize: '11px',
                        letterSpacing: '3px', textTransform: 'uppercase',
                        marginBottom: '6px',
                    }}>
                        Pesanan Anda
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <h1 style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: '2rem', fontWeight: '700', color: '#1C1C1C',
                        }}>
                            Keranjang
                        </h1>
                        {cart.length > 0 && (
                            <button
                                onClick={deleteAll}
                                style={{
                                    background: 'transparent', border: '1.5px solid #B85C38',
                                    color: '#B85C38', padding: '8px 16px', borderRadius: '2px',
                                    fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase',
                                    fontWeight: '600', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                                    transition: 'all 0.2s',
                                }}
                                onMouseOver={e => { e.currentTarget.style.background = '#B85C38'; e.currentTarget.style.color = '#FAF7F2'; }}
                                onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#B85C38'; }}
                            >
                                Hapus Semua
                            </button>
                        )}
                    </div>
                </div>

                {/* Empty State */}
                {cart.length === 0 && (
                    <div style={{
                        textAlign: 'center', padding: '80px 20px',
                        background: '#FFFFFF', borderRadius: '4px',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    }}>
                        <IoBagOutline style={{ fontSize: '48px', color: '#E8E2D9', marginBottom: '16px' }} />
                        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: '#1C1C1C', marginBottom: '8px' }}>
                            Keranjang Kosong
                        </h3>
                        <p style={{ color: '#999', fontSize: '13px', marginBottom: '24px' }}>
                            Belum ada makanan yang ditambahkan
                        </p>
                        <button
                            onClick={() => navigate("/products")}
                            style={{
                                background: '#1C1C1C', color: '#FAF7F2',
                                border: 'none', padding: '12px 28px', borderRadius: '2px',
                                fontFamily: 'DM Sans, sans-serif', fontWeight: '600',
                                fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase',
                                cursor: 'pointer', transition: 'background 0.2s',
                            }}
                            onMouseOver={e => e.currentTarget.style.background = '#C9A84C'}
                            onMouseOut={e => e.currentTarget.style.background = '#1C1C1C'}
                        >
                            Lihat Menu →
                        </button>
                    </div>
                )}

                {/* Cart Items */}
                {cart.length > 0 && (
                    <div style={{
                        background: '#FFFFFF', borderRadius: '4px',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                        overflow: 'hidden', marginBottom: '24px',
                    }}>
                        {cart.map((item, index) => (
                            <div key={index} style={{
                                padding: '20px 24px',
                                borderBottom: index < cart.length - 1 ? '1px solid #F0EAE0' : 'none',
                                display: 'flex', alignItems: 'center', gap: '16px',
                            }}>
                                {/* Gambar */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{
                                        width: '72px', height: '72px',
                                        objectFit: 'cover', borderRadius: '4px', flexShrink: 0,
                                    }}
                                />

                                {/* Info */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <h4 style={{
                                        fontFamily: 'Playfair Display, serif',
                                        fontSize: '1rem', fontWeight: '700',
                                        color: '#1C1C1C', marginBottom: '4px',
                                    }}>
                                        {item.title}
                                    </h4>
                                    <p style={{ fontSize: '13px', color: '#B85C38', fontWeight: '600' }}>
                                        Rp {(item.price * item.qty).toLocaleString('id-ID')}
                                    </p>
                                </div>

                                {/* Qty Controls */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1.5px solid #1C1C1C', borderRadius: '2px', overflow: 'hidden' }}>
                                    <button
                                        onClick={() => updateQtyProduct(item.id, "-")}
                                        style={{
                                            background: '#1C1C1C', color: '#FAF7F2',
                                            border: 'none', width: '32px', height: '32px',
                                            fontSize: '16px', cursor: 'pointer',
                                            transition: 'background 0.2s',
                                        }}
                                        onMouseOver={e => e.currentTarget.style.background = '#C9A84C'}
                                        onMouseOut={e => e.currentTarget.style.background = '#1C1C1C'}
                                    >
                                        −
                                    </button>
                                    <span style={{
                                        width: '36px', textAlign: 'center',
                                        fontFamily: 'Playfair Display, serif',
                                        fontSize: '0.95rem', fontWeight: '700', color: '#1C1C1C',
                                    }}>
                                        {item.qty}
                                    </span>
                                    <button
                                        onClick={() => updateQtyProduct(item.id, "+")}
                                        style={{
                                            background: '#1C1C1C', color: '#FAF7F2',
                                            border: 'none', width: '32px', height: '32px',
                                            fontSize: '16px', cursor: 'pointer',
                                            transition: 'background 0.2s',
                                        }}
                                        onMouseOver={e => e.currentTarget.style.background = '#C9A84C'}
                                        onMouseOut={e => e.currentTarget.style.background = '#1C1C1C'}
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Delete */}
                                <button
                                    onClick={() => deleteProduct(item.id)}
                                    style={{
                                        background: 'transparent', border: 'none',
                                        cursor: 'pointer', padding: '8px',
                                        color: '#CCC', transition: 'color 0.2s',
                                    }}
                                    onMouseOver={e => e.currentTarget.style.color = '#B85C38'}
                                    onMouseOut={e => e.currentTarget.style.color = '#CCC'}
                                >
                                    <FaTrash style={{ fontSize: '14px' }} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Summary & Checkout */}
                {cart.length > 0 && (
                    <div style={{
                        background: '#1C1C1C', borderRadius: '4px',
                        padding: '24px', display: 'flex',
                        justifyContent: 'space-between', alignItems: 'center',
                    }}>
                        <div>
                            <p style={{ color: 'rgba(250,247,242,0.5)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>
                                Total Pembayaran
                            </p>
                            <p style={{
                                fontFamily: 'Playfair Display, serif',
                                fontSize: '1.6rem', fontWeight: '700', color: '#C9A84C',
                            }}>
                                Rp {total.toLocaleString('id-ID')}
                            </p>
                        </div>
                        <button
                            onClick={handleCheckOut}
                            style={{
                                background: '#C9A84C', color: '#1C1C1C',
                                border: 'none', padding: '14px 32px', borderRadius: '2px',
                                fontFamily: 'DM Sans, sans-serif', fontWeight: '700',
                                fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase',
                                cursor: 'pointer', transition: 'background 0.2s',
                            }}
                            onMouseOver={e => e.currentTarget.style.background = '#FAF7F2'}
                            onMouseOut={e => e.currentTarget.style.background = '#C9A84C'}
                        >
                            Checkout →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}