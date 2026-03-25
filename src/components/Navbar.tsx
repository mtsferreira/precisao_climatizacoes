import { useState } from 'react'
import { COLORS, CONTACT } from '../constants/theme'
import { useIsMobile } from '../hooks/useIsMobile'

function WhatsappIcon({ size = 18 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.12 1.533 5.845L0 24l6.335-1.51A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.797 9.797 0 01-5.028-1.383l-.36-.214-3.732.889.936-3.632-.235-.374A9.79 9.79 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z" />
        </svg>
    )
}

function EmailIcon({ size = 18 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    )
}

// ============================================================
// NAVBAR — altere CONTACT em src/constants/theme.ts para
//          mudar número de WhatsApp e e-mail
// ============================================================
export default function Navbar() {
    const isMobile = useIsMobile()
    const [waHovered, setWaHovered] = useState(false)
    const waLink = `https://wa.me/${CONTACT.whatsappNumber}`

    return (
        <nav
            style={{
                backgroundColor: COLORS.white,
                boxShadow: '0 2px 10px rgba(8,77,110,0.12)',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                padding: isMobile ? '10px 16px' : '10px 32px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: 'center',
                    justifyContent: isMobile ? 'center' : 'space-between',
                    maxWidth: 1200,
                    margin: '0 auto',
                    gap: isMobile ? 12 : 0,
                    textAlign: isMobile ? 'center' : 'left',
                }}
            >
                {/* Título e slogan */}
                <div>
                    <h1
                        style={{
                            fontFamily: '"Times New Roman", serif',
                            color: COLORS.primary,
                            margin: 0,
                            fontSize: isMobile ? '1.25rem' : '1.55rem',
                            fontWeight: 700,
                            letterSpacing: '0.05em',
                        }}
                    >
                        PRECISÃO CLIMATIZAÇÕES
                    </h1>
                    <h2
                        style={{
                            fontFamily: 'Satisfy, cursive',
                            color: COLORS.primaryLight,
                            margin: 0,
                            fontSize: isMobile ? '0.85rem' : '0.95rem',
                            fontWeight: 400,
                        }}
                    >
                        Resultado de Dedicação e Trabalho
                    </h2>
                </div>

                {/* Contatos */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: isMobile ? 8 : 22,
                        flexWrap: 'wrap',
                    }}
                >
                    {/* WhatsApp */}
                    <a
                        id="navbar-whatsapp"
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setWaHovered(true)}
                        onMouseLeave={() => setWaHovered(false)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 7,
                            color: waHovered ? COLORS.whatsappDark : COLORS.whatsapp,
                            textDecoration: 'none',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: isMobile ? '0.85rem' : '0.92rem',
                            fontWeight: 600,
                            transition: 'color 0.2s',
                        }}
                    >
                        <WhatsappIcon size={isMobile ? 20 : 22} />
                        <span>{isMobile ? '(41) 99776-4683' : CONTACT.whatsappDisplay}</span>
                    </a>

                    {/* Email */}
                    <a
                        id="navbar-email"
                        href={`mailto:${CONTACT.email}`}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            color: COLORS.primary,
                            textDecoration: 'none',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: isMobile ? '0.78rem' : '0.85rem',
                            fontWeight: 500,
                        }}
                    >
                        <EmailIcon size={isMobile ? 20 : 22} />

                        <span
                            style={{
                                wordBreak: 'break-all',
                            }}
                        >
                            {CONTACT.email}
                        </span>
                    </a>
                </div>
            </div>
        </nav>
    )
}
