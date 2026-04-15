import { Link } from "react-router-dom";

export default function CardComp({ item }) {
    return (
        <Link to={`/meal/${item.idMeal}`}>
            <div style={{
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative',
                height: '260px',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
                onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.2)';
                }}
                onMouseOut={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
                }}
            >
                {/* Gambar */}
                <img
                    src={item.strMealThumb}
                    alt={item.strMeal}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                    }}
                />

                {/* Overlay gradient */}
                <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(to top, rgba(28,28,28,0.95) 0%, rgba(28,28,28,0.4) 60%, transparent 100%)',
                    padding: '24px 16px 16px',
                }} />

                {/* Badge area */}
                <div style={{
                    position: 'absolute',
                    top: '12px', right: '12px',
                    background: '#C9A84C',
                    color: '#1C1C1C',
                    fontSize: '10px',
                    fontWeight: '700',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    borderRadius: '2px',
                    fontFamily: 'DM Sans, sans-serif',
                }}>
                    {item.strArea || 'Special'}
                </div>

                {/* Teks bawah */}
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                    <p style={{
                        color: 'rgba(250,247,242,0.6)',
                        fontSize: '10px',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        fontFamily: 'DM Sans, sans-serif',
                        marginBottom: '4px',
                    }}>
                        {item.strCategory}
                    </p>
                    <h5 style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        color: '#FAF7F2',
                        lineHeight: '1.3',
                    }}>
                        {item.strMeal}
                    </h5>
                </div>
            </div>
        </Link>
    );
}