import { COLORS, CONTACT } from '../constants/theme'
import { useIsMobile } from '../hooks/useIsMobile'

function WhatsappIcon({ size = 32 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.12 1.533 5.845L0 24l6.335-1.51A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.797 9.797 0 01-5.028-1.383l-.36-.214-3.732.889.936-3.632-.235-.374A9.79 9.79 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z" />
        </svg>
    )
}

export default function WhatsAppCTA() {
    const isMobile = useIsMobile()
    const waLink = `https://wa.me/${CONTACT.whatsappNumber}`

    return (
        // ===== CALL TO ACTION — WHATSAPP =====
        <div
            style={{
                minHeight: isMobile ? 'auto' : '70vh',
                background: `linear-gradient(135deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 100%)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isMobile ? '30px 10px 30px' : '10px 40px 40px',
                textAlign: 'center',
                position: 'relative',
                marginTop: '-40px',
                zIndex: 12,
                boxShadow: '0 -10px 30px rgba(0,0,0,0.15)',
            }}
        >
            {/* Ícone grande do WhatsApp */}
            <div style={{ color: COLORS.whatsapp, marginBottom: 24 }}>
                <WhatsappIcon size={isMobile ? 64 : 80} />
            </div>

            {/* Headline principal */}
            <h2
                style={{
                    fontFamily: '"Times New Roman", serif',
                    color: COLORS.white,
                    fontSize: isMobile ? '1.8rem' : '2.6rem',
                    maxWidth: 680,
                    lineHeight: 1.3,
                    marginBottom: 16,
                    fontWeight: 700,
                }}
            >
                Faça já seu orçamento pelo nosso WhatsApp!
            </h2>

            <p
                style={{
                    fontFamily: 'Inter, sans-serif',
                    color: 'rgba(255,255,255,0.82)',
                    fontSize: isMobile ? '1rem' : '1.15rem',
                    maxWidth: 500,
                    lineHeight: 1.7,
                    marginBottom: 40,
                }}
            >
                Atendimento rápido e sem burocracia. Entre em contato agora e receba seu orçamento gratuito!
            </p>

            {/* Botão CTA */}
            <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    backgroundColor: COLORS.whatsapp,
                    color: COLORS.white,
                    textDecoration: 'none',
                    borderRadius: 8,
                    padding: isMobile ? '16px 28px' : '18px 40px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: isMobile ? '1.05rem' : '1.2rem',
                    fontWeight: 700,
                    boxShadow: '0 6px 20px rgba(37,211,102,0.35)',
                    letterSpacing: '0.02em',
                }}
            >
                <WhatsappIcon size={24} />
                Falar no WhatsApp
            </a>

            {/* Número de contato */}
            <p
                style={{
                    marginTop: 20,
                    fontFamily: 'Inter, sans-serif',
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.95rem',
                }}
            >
                {CONTACT.whatsappDisplay} · {CONTACT.city}
            </p>
        </div>
    )
}
