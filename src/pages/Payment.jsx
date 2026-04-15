import { useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { IoReceiptOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

export default function Payment() {
    const { cart, deleteAll, setPaymentSuccess } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!cart || cart.length === 0) {
            navigate("/");
        }
    }, []);

    const totalProductPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const appFee = totalProductPrice * 0.11;
    const totalPay = totalProductPrice + appFee;

    function handleFinishPayment() {
        deleteAll();
        setPaymentSuccess(true);
        navigate("/");
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#FAF7F2',
            fontFamily: 'DM Sans, sans-serif',
            padding: '40px 20px',
        }}>
            <div style={{ maxWidth: '680px', margin: '0 auto' }}>

                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <p style={{
                        color: '#C9A84C', fontSize: '11px',
                        letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px',
                    }}>
                        Konfirmasi
                    </p>
                    <h1 style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '2rem', fontWeight: '700', color: '#1C1C1C',
                    }}>
                        Checkout
                    </h1>
                </div>

                {/* Order Items */}
                <div style={{
                    background: '#FFFFFF', borderRadius: '4px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    overflow: 'hidden', marginBottom: '16px',
                }}>
                    {/* Section Title */}
                    <div style={{
                        padding: '16px 24px',
                        borderBottom: '1px solid #F0EAE0',
                        display: 'flex', alignItems: 'center', gap: '8px',
                    }}>
                        <IoReceiptOutline style={{ color: '#C9A84C', fontSize: '18px' }} />
                        <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600', color: '#666' }}>
                            Ringkasan Pesanan
                        </p>
                    </div>

                    {cart.map((item, index) => (
                        <div key={item.id} style={{
                            padding: '16px 24px',
                            borderBottom: index < cart.length - 1 ? '1px solid #F0EAE0' : 'none',
                            display: 'flex', alignItems: 'center', gap: '16px',
                        }}>
                            <img
                                src={item.image}
                                alt={item.title}
                                style={{
                                    width: '64px', height: '64px',
                                    objectFit: 'cover', borderRadius: '4px', flexShrink: 0,
                                }}
                            />
                            <div style={{ flex: 1 }}>
                                <h4 style={{
                                    fontFamily: 'Playfair Display, serif',
                                    fontSize: '0.95rem', fontWeight: '700',
                                    color: '#1C1C1C', marginBottom: '4px',
                                }}>
                                    {item.title}
                                </h4>
                                <p style={{ fontSize: '12px', color: '#999' }}>x{item.qty}</p>
                            </div>
                            <p style={{
                                fontFamily: 'Playfair Display, serif',
                                fontSize: '1rem', fontWeight: '700', color: '#1C1C1C',
                            }}>
                                Rp {(item.price * item.qty).toLocaleString('id-ID')}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Payment Detail */}
                <div style={{
                    background: '#FFFFFF', borderRadius: '4px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    overflow: 'hidden', marginBottom: '24px',
                }}>
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid #F0EAE0' }}>
                        <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600', color: '#666' }}>
                            Detail Pembayaran
                        </p>
                    </div>

                    <div style={{ padding: '20px 24px' }}>
                        {/* Total Produk */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ fontSize: '13px', color: '#666' }}>Total Harga Produk</span>
                            <span style={{ fontSize: '13px', color: '#1C1C1C', fontWeight: '500' }}>
                                Rp {totalProductPrice.toLocaleString('id-ID')}
                            </span>
                        </div>

                        {/* Biaya App */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <span style={{ fontSize: '13px', color: '#666' }}>Biaya Aplikasi (11%)</span>
                            <span style={{ fontSize: '13px', color: '#B85C38', fontWeight: '500' }}>
                                + Rp {appFee.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                            </span>
                        </div>

                        {/* Divider */}
                        <div style={{ borderTop: '1.5px dashed #E8E2D9', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '700', color: '#1C1C1C' }}>
                                Total Bayar
                            </span>
                            <span style={{
                                fontFamily: 'Playfair Display, serif',
                                fontSize: '1.4rem', fontWeight: '700', color: '#C9A84C',
                            }}>
                                Rp {totalPay.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div style={{
                    background: '#1C1C1C', borderRadius: '4px',
                    padding: '24px', display: 'flex',
                    justifyContent: 'space-between', alignItems: 'center',
                }}>
                    <div>
                        <p style={{ color: 'rgba(250,247,242,0.5)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>
                            Siap Dibayar
                        </p>
                        <p style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: '1.5rem', fontWeight: '700', color: '#C9A84C',
                        }}>
                            Rp {totalPay.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                        </p>
                    </div>
                    <button
                        onClick={handleFinishPayment}
                        style={{
                            background: '#C9A84C', color: '#1C1C1C',
                            border: 'none', padding: '14px 28px', borderRadius: '2px',
                            fontFamily: 'DM Sans, sans-serif', fontWeight: '700',
                            fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase',
                            cursor: 'pointer', transition: 'background 0.2s',
                            display: 'flex', alignItems: 'center', gap: '8px',
                        }}
                        onMouseOver={e => e.currentTarget.style.background = '#FAF7F2'}
                        onMouseOut={e => e.currentTarget.style.background = '#C9A84C'}
                    >
                        <IoCheckmarkCircleOutline style={{ fontSize: '18px' }} />
                        Selesaikan Pembayaran
                    </button>
                </div>

            </div>
        </div>
    );
}