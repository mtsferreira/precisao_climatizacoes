import { COLORS, CONTACT } from '../constants/theme'
import { useIsMobile } from '../hooks/useIsMobile'

export default function Footer() {
    const isMobile = useIsMobile()
    const waLink = `https://wa.me/${CONTACT.whatsappNumber}`

    return (
        // ===== RODAPÉ =====
        <footer
            style={{
                backgroundColor: COLORS.primaryDark,
                color: 'rgba(255,255,255,0.75)',
                fontFamily: 'Inter, sans-serif',
                padding: isMobile ? '10px 20px' : '32px 48px',
                textAlign: 'center',
            }}
        >
            <p
                style={{
                    fontFamily: '"Times New Roman", serif',
                    color: COLORS.white,
                    fontSize: isMobile ? '1.1rem' : '1.2rem',
                    marginBottom: 8,
                    letterSpacing: '0.04em',
                }}
            >
                PRECISÃO CLIMATIZAÇÕES
            </p>
            {/* <p style={{ fontSize: '0.88rem', marginBottom: 6 }}>{CONTACT.city}</p> */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap', marginBottom: 16 }}>
                <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: COLORS.whatsapp, textDecoration: 'none', fontSize: '0.88rem' }}
                >
                    {CONTACT.whatsappDisplay}
                </a>
                <a
                    href={`mailto:${CONTACT.email}`}
                    style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.88rem' }}
                >
                    {CONTACT.email}
                </a>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>
                © {new Date().getFullYear()} Precisão Climatizações · Todos os direitos reservados
            </p>
        </footer>
    )
}
