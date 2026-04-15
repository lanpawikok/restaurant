export default function CardCommerceComp({ item, handleOpenModal }) {
    return (
        <div style={{
            borderRadius: '4px',
            overflow: 'hidden',
            background: '#FFFFFF',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
        }}
            onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
            }}
            onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
            }}
        >
            {/* Gambar */}
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                    src={item.strMealThumb}
                    alt={item.strMeal}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                    onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.target.style.transform = 'scale(1)'}
                />
                {/* Badge kategori */}
                <div style={{
                    position: 'absolute', top: '12px', left: '12px',
                    background: 'rgba(28,28,28,0.85)',
                    color: '#C9A84C',
                    fontSize: '10px', fontWeight: '600',
                    letterSpacing: '1.5px', textTransform: 'uppercase',
                    padding: '4px 10px', borderRadius: '2px',
                    fontFamily: 'DM Sans, sans-serif',
                }}>
                    {item.strCategory}
                </div>
            </div>

            {/* Konten */}
            <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                    <p style={{
                        color: '#7A8C6E', fontSize: '10px',
                        letterSpacing: '2px', textTransform: 'uppercase',
                        fontFamily: 'DM Sans, sans-serif', marginBottom: '4px',
                    }}>
                        {item.strArea}
                    </p>
                    <h5 style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '1.05rem', fontWeight: '700',
                        color: '#1C1C1C', lineHeight: '1.3',
                    }}>
                        {item.strMeal}
                    </h5>
                </div>

                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} style={{ width: '14px', height: '14px', color: '#C9A84C' }} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                    <span style={{ fontSize: '11px', color: '#999', fontFamily: 'DM Sans, sans-serif', marginLeft: '4px' }}>5.0</span>
                </div>

                {/* Harga & tombol */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <div>
                        <p style={{ fontSize: '11px', color: '#999', fontFamily: 'DM Sans, sans-serif' }}>Harga</p>
                        <p style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: '1.4rem', fontWeight: '700', color: '#1C1C1C',
                        }}>
                            Rp {item.price.toLocaleString('id-ID')}
                        </p>
                    </div>
                    <button
                        onClick={() => handleOpenModal(item)}
                        style={{
                            background: '#1C1C1C', color: '#FAF7F2',
                            border: 'none', padding: '10px 16px',
                            borderRadius: '2px', fontFamily: 'DM Sans, sans-serif',
                            fontWeight: '600', fontSize: '12px',
                            letterSpacing: '1px', textTransform: 'uppercase',
                            cursor: 'pointer', transition: 'background 0.2s',
                        }}
                        onMouseOver={e => e.target.style.background = '#C9A84C'}
                        onMouseOut={e => e.target.style.background = '#1C1C1C'}
                    >
                        + Pesan
                    </button>
                </div>
            </div>
        </div>
    );
}