import { useState } from 'react'
import { COLORS } from '../constants/theme'
import { useIsMobile } from '../hooks/useIsMobile'

// ============================================================
// CARDS DE DIFERENCIAIS
// Para adicionar/remover cards: edite o array `cards` abaixo
// ============================================================

const cards = [
    {
        icon: '⏰',
        title: 'Horário de Atendimento',
        text: 'Segunda a sábado, das 08:00 às 18:00. Entre em contato e agende o melhor horário para você!',
    },
    {
        icon: '💰',
        title: 'Preço Justo',
        text: 'Orçamento gratuito e sem surpresas. Trabalhamos com transparência e valores acessíveis.',
    },
    {
        icon: '⚡',
        title: 'Instalação Rápida',
        text: 'Serviço ágil e eficiente. Concluímos sua instalação no menor tempo possível, sem abrir mão da qualidade.',
    },
    {
        icon: '✅',
        title: 'Serviço com Garantia',
        text: 'Todos os nossos serviços são garantidos. Sua satisfação e tranquilidade são nossa prioridade.',
    },
    {
        icon: '📍',
        title: 'Curitiba - PR',
        text: 'Atendemos Curitiba e região. Estamos perto de você para qualquer necessidade de climatização.',
    },
]

interface CardProps {
    icon: string
    title: string
    text: string
    isMobile: boolean
}

function Card({ icon, title, text, isMobile }: CardProps) {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                backgroundColor: hovered ? COLORS.primary : COLORS.white,
                borderRadius: 12,
                padding: isMobile ? '10px 10px' : '28px 24px',
                boxShadow: hovered ? '0 8px 24px rgba(8,77,110,0.3)' : '0 2px 10px rgba(8,77,110,0.1)',
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 12,
            }}
        >
            <span style={{ fontSize: 36 }}>{icon}</span>
            <h3
                style={{
                    fontFamily: '"Times New Roman", serif',
                    color: hovered ? COLORS.white : COLORS.primary,
                    fontSize: '1.1rem',
                    margin: 0,
                    transition: 'color 0.25s',
                }}
            >
                {title}
            </h3>
            <p
                style={{
                    fontFamily: 'Inter, sans-serif',
                    color: hovered ? 'rgba(255,255,255,0.85)' : COLORS.textMuted,
                    fontSize: '0.92rem',
                    lineHeight: 1.6,
                    margin: 0,
                    transition: 'color 0.25s',
                }}
            >
                {text}
            </p>
        </div>
    )
}

export default function FeatureCards() {
    const isMobile = useIsMobile()

    const cols = isMobile ? 1 : 3

    return (
        // ===== SEÇÃO DE DIFERENCIAIS =====
        <div
            style={{
                minHeight: isMobile ? 'auto' : '80vh',
                backgroundColor: COLORS.softBg,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: isMobile ? '72px 16px 64px' : '96px 48px 80px',
                position: 'relative',
                marginTop: '-40px',
                borderTopLeftRadius: '32px',
                borderTopRightRadius: '32px',
                zIndex: 11,
                boxShadow: '0 -10px 30px rgba(0,0,0,0.05)',
            }}
        >
            {/* Título da seção */}
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <h2
                    style={{
                        fontFamily: '"Times New Roman", serif',
                        color: COLORS.primary,
                        fontSize: isMobile ? '1.7rem' : '2.1rem',
                        marginBottom: 10,
                    }}
                >
                    Por que nos escolher?
                </h2>
                <p
                    style={{
                        fontFamily: 'Inter, sans-serif',
                        color: COLORS.textMuted,
                        fontSize: isMobile ? '0.95rem' : '1.05rem',
                    }}
                >
                    Qualidade, agilidade e confiança em cada atendimento.
                </p>
            </div>

            {/* Grid de cards */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gap: isMobile ? 16 : 20,
                    maxWidth: 1000,
                    width: '100%',
                }}
            >
                {cards.map((card, i) => (
                    <Card key={i} {...card} isMobile={isMobile} />
                ))}
            </div>
        </div>
    )
}
