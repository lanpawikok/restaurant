import { Modal } from "flowbite-react";
import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ModalCartComp({ handleCloseModal, openModal, item }) {
    const [qty, setQty] = useState(1);
    const { updateCart } = useContext(CartContext);
    const { isLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    function updateQty(type) {
        if (type == "+") {
            setQty((prev) => prev + 1);
        } else {
            if (qty > 1) {
                setQty((prev) => prev - 1);
            }
        }
    }

    function handleCart(item, qty) {
        if (isLogin == null) {
            navigate("/login");
        }
        updateCart(item, qty);
        handleCloseModal();
    }

    return (
        <Modal dismissible show={openModal} onClose={() => handleCloseModal()}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', background: '#FAF7F2', borderRadius: '4px', overflow: 'hidden' }}>

                {/* Header */}
                <div style={{
                    background: '#1C1C1C',
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <div>
                        <p style={{ color: '#C9A84C', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '4px' }}>
                            Tambah Pesanan
                        </p>
                        <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#FAF7F2', fontSize: '1.3rem', fontWeight: '700', margin: 0 }}>
                            Keranjang
                        </h3>
                    </div>
                    <button
                        onClick={handleCloseModal}
                        style={{
                            background: 'rgba(250,247,242,0.1)',
                            border: 'none', color: '#FAF7F2',
                            width: '32px', height: '32px',
                            borderRadius: '2px', cursor: 'pointer',
                            fontSize: '16px', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            transition: 'background 0.2s',
                        }}
                        onMouseOver={e => e.currentTarget.style.background = 'rgba(201,168,76,0.3)'}
                        onMouseOut={e => e.currentTarget.style.background = 'rgba(250,247,242,0.1)'}
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '24px' }}>

                    {/* Item info */}
                    <div style={{
                        display: 'flex', gap: '16px', alignItems: 'center',
                        background: '#FFFFFF',
                        borderRadius: '4px',
                        padding: '16px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        marginBottom: '24px',
                    }}>
                        <img
                            src={item.strMealThumb || ''}
                            alt={item.strMeal}
                            style={{
                                width: '90px', height: '90px',
                                objectFit: 'cover', borderRadius: '4px',
                                flexShrink: 0,
                            }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{
                                color: '#7A8C6E', fontSize: '10px',
                                letterSpacing: '2px', textTransform: 'uppercase',
                                marginBottom: '4px',
                            }}>
                                {item.strCategory} · {item.strArea}
                            </p>
                            <h4 style={{
                                fontFamily: 'Playfair Display, serif',
                                fontSize: '1.1rem', fontWeight: '700',
                                color: '#1C1C1C', marginBottom: '8px',
                                lineHeight: '1.3',
                            }}>
                                {item.strMeal}
                            </h4>
                            <p style={{
                                fontFamily: 'Playfair Display, serif',
                                fontSize: '1.2rem', fontWeight: '700',
                                color: '#B85C38',
                            }}>
                                Rp {item.price?.toLocaleString('id-ID')}
                            </p>
                        </div>
                    </div>

                    {/* Qty control */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: '#999' }}>
                            Jumlah
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1.5px solid #1C1C1C', borderRadius: '2px', overflow: 'hidden' }}>
                            <button
                                onClick={() => updateQty("-")}
                                style={{
                                    background: '#1C1C1C', color: '#FAF7F2',
                                    border: 'none', width: '40px', height: '40px',
                                    fontSize: '18px', cursor: 'pointer',
                                    transition: 'background 0.2s',
                                }}
                                onMouseOver={e => e.currentTarget.style.background = '#C9A84C'}
                                onMouseOut={e => e.currentTarget.style.background = '#1C1C1C'}
                            >
                                −
                            </button>
                            <span style={{
                                width: '48px', textAlign: 'center',
                                fontFamily: 'Playfair Display, serif',
                                fontSize: '1.1rem', fontWeight: '700',
                                color: '#1C1C1C',
                            }}>
                                {qty}
                            </span>
                            <button
                                onClick={() => updateQty("+")}
                                style={{
                                    background: '#1C1C1C', color: '#FAF7F2',
                                    border: 'none', width: '40px', height: '40px',
                                    fontSize: '18px', cursor: 'pointer',
                                    transition: 'background 0.2s',
                                }}
                                onMouseOver={e => e.currentTarget.style.background = '#C9A84C'}
                                onMouseOut={e => e.currentTarget.style.background = '#1C1C1C'}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Total */}
                    <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', marginTop: '20px',
                        paddingTop: '16px', borderTop: '1px solid #E8E2D9',
                    }}>
                        <p style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: '#999' }}>Total</p>
                        <p style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: '1.4rem', fontWeight: '700', color: '#1C1C1C',
                        }}>
                            Rp {(item.price * qty)?.toLocaleString('id-ID')}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    padding: '16px 24px 24px',
                    display: 'flex', gap: '12px',
                }}>
                    <button
                        onClick={handleCloseModal}
                        style={{
                            flex: 1, background: 'transparent',
                            border: '1.5px solid #1C1C1C', color: '#1C1C1C',
                            padding: '12px', borderRadius: '2px',
                            fontFamily: 'DM Sans, sans-serif',
                            fontWeight: '600', fontSize: '13px',
                            letterSpacing: '1px', textTransform: 'uppercase',
                            cursor: 'pointer', transition: 'all 0.2s',
                        }}
                        onMouseOver={e => { e.currentTarget.style.background = '#1C1C1C'; e.currentTarget.style.color = '#FAF7F2'; }}
                        onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1C1C1C'; }}
                    >
                        Batal
                    </button>
                    <button
                        onClick={() => handleCart(item, qty)}
                        style={{
                            flex: 2, background: '#C9A84C',
                            border: 'none', color: '#1C1C1C',
                            padding: '12px', borderRadius: '2px',
                            fontFamily: 'DM Sans, sans-serif',
                            fontWeight: '700', fontSize: '13px',
                            letterSpacing: '1px', textTransform: 'uppercase',
                            cursor: 'pointer', transition: 'background 0.2s',
                        }}
                        onMouseOver={e => e.currentTarget.style.background = '#B8962A'}
                        onMouseOut={e => e.currentTarget.style.background = '#C9A84C'}
                    >
                        + Tambah ke Keranjang
                    </button>
                </div>

            </div>
        </Modal>
    );
}