import { useState, useEffect, useContext } from "react";
import BannerComp from "./components/BannerComp";
import CardList from "./components/CardList";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { Modal, ModalBody } from "flowbite-react";
import { CartContext } from "./contexts/CartContext";
import { FcApproval } from "react-icons/fc";

export default function App() {
  const { paymentSuccess, setPaymentSuccess } = useContext(CartContext);
  const [openModal, setOpenModal] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getDataCategories() {
    const url = "https://www.themealdb.com/api/json/v1/1/search.php?f=a";
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      const result = await response.json();
      const meals = result.meals;
      if (!meals) return;
      setCategoryProducts(meals.slice(0, 4));
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getDataProducts() {
    const url = "https://www.themealdb.com/api/json/v1/1/search.php?f=b";
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      const result = await response.json();
      const meals = result.meals;
      if (!meals) return;
      const mealsWithPrice = meals.slice(0, 4).map((meal) => ({
        ...meal,
        price: Math.floor(Math.random() * 90000) + 10000,
      }));
      setProducts(mealsWithPrice);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getDataCategories();
    getDataProducts();
    if (paymentSuccess) {
      setOpenModal(true);
      setPaymentSuccess(false);
    }
  }, [paymentSuccess]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: '#FAF7F2' }}>
        <div className="text-center">
          <Spinner size="xl" />
          <p className="mt-4 text-gray-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>Menyiapkan menu...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Modal Payment Success */}
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <ModalBody style={{ padding: 0 }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', borderRadius: '4px', overflow: 'hidden' }}>

            {/* Header */}
            <div style={{
              background: '#1C1C1C', padding: '24px',
              textAlign: 'center', position: 'relative',
            }}>
              <button
                onClick={() => setOpenModal(false)}
                style={{
                  position: 'absolute', top: '12px', right: '12px',
                  background: 'rgba(250,247,242,0.1)', border: 'none',
                  color: '#FAF7F2', width: '28px', height: '28px',
                  borderRadius: '2px', cursor: 'pointer', fontSize: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(201,168,76,0.3)'}
                onMouseOut={e => e.currentTarget.style.background = 'rgba(250,247,242,0.1)'}
              >
                ✕
              </button>
              <p style={{ color: '#C9A84C', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Konfirmasi
              </p>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', fontWeight: '700', color: '#FAF7F2', margin: 0 }}>
                Pembayaran
              </h3>
            </div>

            {/* Body */}
            <div style={{ background: '#FAF7F2', padding: '36px 24px', textAlign: 'center' }}>
              <FcApproval style={{ fontSize: '72px', marginBottom: '16px',display: 'block',margin: '0 auto 16px auto', }} />

              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.4rem', fontWeight: '700',
                color: '#1C1C1C', marginBottom: '8px',
              }}>
                Pembayaran Berhasil!
              </h3>
              <p style={{ color: '#999', fontSize: '13px', lineHeight: '1.6', marginBottom: '24px' }}>
                Pesanan Anda telah dikonfirmasi.<br />Terima kasih telah memesan di Resto Makanan.
              </p>

              {/* Divider dekoratif */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ flex: 1, height: '1px', background: '#E8E2D9' }} />
                <span style={{ color: '#C9A84C', fontSize: '16px' }}>✦</span>
                <div style={{ flex: 1, height: '1px', background: '#E8E2D9' }} />
              </div>

              <button
                onClick={() => setOpenModal(false)}
                style={{
                  background: '#1C1C1C', color: '#FAF7F2',
                  border: 'none', padding: '12px 32px', borderRadius: '2px',
                  fontFamily: 'DM Sans, sans-serif', fontWeight: '700',
                  fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'background 0.2s',
                }}
                onMouseOver={e => e.currentTarget.style.background = '#C9A84C'}
                onMouseOut={e => e.currentTarget.style.background = '#1C1C1C'}
              >
                Kembali ke Beranda
              </button>
            </div>

          </div>
        </ModalBody>
      </Modal>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1C1C1C 0%, #2D1B0E 60%, #B85C38 100%)',
        minHeight: '420px', display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexDirection: 'column', textAlign: 'center',
        padding: '60px 20px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.2)', top: '-100px', right: '-100px' }} />
        <div style={{ position: 'absolute', width: '250px', height: '250px', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.15)', bottom: '-80px', left: '-60px' }} />

        <p style={{ color: '#C9A84C', letterSpacing: '4px', fontSize: '12px', fontFamily: 'DM Sans, sans-serif', marginBottom: '16px', textTransform: 'uppercase' }}>
          🍽 Selamat Datang
        </p>
        <h1 style={{
          fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: '900', color: '#FAF7F2', lineHeight: '1.1',
          marginBottom: '20px', maxWidth: '600px',
        }}>
          Cita Rasa Dunia,<br />
          <span style={{ color: '#C9A84C' }}>Satu Meja</span>
        </h1>
        <p style={{ color: 'rgba(250,247,242,0.6)', fontFamily: 'DM Sans, sans-serif', fontSize: '16px', maxWidth: '400px', marginBottom: '32px', lineHeight: '1.6' }}>
          Nikmati koleksi hidangan autentik dari berbagai penjuru dunia, dibuat dengan bahan terbaik.
        </p>
        <Link to="/products">
          <button style={{
            background: '#C9A84C', color: '#1C1C1C', border: 'none',
            padding: '14px 36px', borderRadius: '2px', fontFamily: 'DM Sans, sans-serif',
            fontWeight: '600', fontSize: '14px', letterSpacing: '1px',
            cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.2s',
          }}
            onMouseOver={e => e.target.style.background = '#B8962A'}
            onMouseOut={e => e.target.style.background = '#C9A84C'}
          >
            Lihat Menu Lengkap →
          </button>
        </Link>
      </div>

      {/* Category Section */}
      <div style={{ background: '#FAF7F2', padding: '60px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '36px' }}>
            <p style={{ color: '#C9A84C', letterSpacing: '3px', fontSize: '11px', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif', marginBottom: '8px' }}>
              Pilihan Hari Ini
            </p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: '700', color: '#1C1C1C' }}>
              Menu Spesial
            </h2>
          </div>
          <CardList data={categoryProducts} type={"category"} />
        </div>
      </div>

      {/* Popular Products Section */}
      <div style={{ background: '#FAF7F2', padding: '60px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <CardList data={products} type={"product"}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px' }}>
              <div>
                <p style={{ color: '#C9A84C', letterSpacing: '3px', fontSize: '11px', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif', marginBottom: '8px' }}>
                  Terlaris
                </p>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: '700', color: '#1C1C1C' }}>
                  Daftar Produk Populer
                </h2>
              </div>
              <Link to="/products">
                <button style={{
                  background: 'transparent', color: '#1C1C1C',
                  border: '1.5px solid #1C1C1C', padding: '10px 24px',
                  borderRadius: '2px', fontFamily: 'DM Sans, sans-serif',
                  fontWeight: '500', fontSize: '13px', letterSpacing: '1px',
                  cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.2s',
                }}
                  onMouseOver={e => { e.target.style.background = '#1C1C1C'; e.target.style.color = '#FAF7F2'; }}
                  onMouseOut={e => { e.target.style.background = 'transparent'; e.target.style.color = '#1C1C1C'; }}
                >
                  Selengkapnya →
                </button>
              </Link>
            </div>
          </CardList>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#1C1C1C', padding: '40px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Playfair Display, serif', color: '#C9A84C', fontSize: '1.5rem', marginBottom: '8px' }}>Resto Makanan</p>
        <p style={{ color: 'rgba(250,247,242,0.4)', fontSize: '12px', fontFamily: 'DM Sans, sans-serif' }}>© 2026 Resto Makanan. All rights reserved.</p>
      </div>
    </>
  );
}