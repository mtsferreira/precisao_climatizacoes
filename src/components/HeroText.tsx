import { COLORS } from '../constants/theme'
import { useIsMobile } from '../hooks/useIsMobile'

// ============================================================
// SLIDE: TEXTO DE APRESENTAÇÃO
// Altere o conteúdo do texto aqui
// ============================================================

export default function HeroText() {
    const isMobile = useIsMobile()

    return (
        // ===== HERO — APRESENTAÇÃO DA EMPRESA =====
        <div
            style={{
                minHeight: isMobile ? 'auto' : '80vh',
                background: `linear-gradient(135deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 60%, ${COLORS.primaryLight} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isMobile ? '48px 20px' : '64px 80px',
            }}
        >
            <div
                style={{
                    maxWidth: 760,
                    width: '100%',
                }}
            >
                {/* Título chamativo */}
                <p
                    style={{
                        fontFamily: '"Times New Roman", serif',
                        color: COLORS.accent,
                        fontSize: isMobile ? '1.1rem' : '1.3rem',
                        fontStyle: 'italic',
                        marginBottom: 8,
                        letterSpacing: '0.04em',
                    }}
                >
                    Ar limpo é saúde ...
                </p>
                <h2
                    style={{
                        fontFamily: '"Times New Roman", serif',
                        color: COLORS.white,
                        fontSize: isMobile ? '1.7rem' : '2.2rem',
                        marginBottom: 28,
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                    }}
                >
                    Por Precisão Climatizações
                </h2>

                {/* Corpo do texto */}
                <div
                    style={{
                        backgroundColor: 'rgba(255,255,255,0.08)',
                        borderLeft: `4px solid ${COLORS.accent}`,
                        borderRadius: '0 8px 8px 0',
                        padding: isMobile ? '20px 18px' : '28px 32px',
                    }}
                >
                    {[
                        'Olá! Tudo bem com você?',
                        'Nós trabalhamos na área de serviços de climatização em geral, e, assim como você, sabemos quão importante é ter um equipamento bem cuidado, pois resultará, além da qualidade do ar no ambiente, vida útil do equipamento, economia no consumo de energia e muitos outros.',
                        'Pensando nisso, nós da Precisão Climatizações dispomos de um trabalho sério, que vem evoluindo, porque nos colocamos no lugar do cliente, em tudo que ele espera de uma boa manutenção sem incômodo com boas condições e grande satisfação.',
                        'Atuamos também nas áreas civis, elétricas e hidráulicas, tudo isso em um só lugar para sua comodidade.',
                        'Estamos prontos para atendê-los 24 horas por dia, é só chamar!',
                    ].map((para, i) => (
                        <p
                            key={i}
                            style={{
                                color: i === 0 ? COLORS.accent : 'rgba(255,255,255,0.92)',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: isMobile ? '0.95rem' : '1.05rem',
                                lineHeight: 1.75,
                                marginBottom: i < 4 ? 16 : 0,
                                fontWeight: i === 0 ? 600 : 400,
                            }}
                        >
                            {para}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}
