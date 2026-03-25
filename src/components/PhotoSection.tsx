import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { COLORS } from '../constants/theme'
import type { PhotoSectionData } from '../data/photoSections'
import { useIsMobile } from '../hooks/useIsMobile'
import PhotoModal from './PhotoModal'

interface PhotoSectionProps {
    section: PhotoSectionData
    isActive?: boolean
}

export default function PhotoSection({ section, isActive }: PhotoSectionProps) {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalStartIndex, setModalStartIndex] = useState(0)
    const isMobile = useIsMobile()

    const highlighted = section.images.slice(0, section.highlightCount)

    const openModal = (index: number) => {
        setModalStartIndex(index)
        setModalOpen(true)
    }

    // Fecha o modal se o usuário mudar de slide no carrossel
    useEffect(() => {
        if (isActive === false && modalOpen) {
            setModalOpen(false)
        }
    }, [isActive, modalOpen])

    // Configuração do Grid Dinâmico
    const gridStyles: React.CSSProperties = isMobile
        ? {
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)', // 2 colunas no mobile
              gap: 12,
              maxWidth: 280, // Conteúdo mais fino para não bater nos botões
              margin: '0 auto 28px',
          }
        : {
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)', // 3 colunas no desktop
              gap: 16,
              maxWidth: 960,
              margin: '0 auto 28px',
          }

    return (
        // ===== SESSÃO DE FOTOS =====
        <div
            style={{
                minHeight: '100%',
                backgroundColor: COLORS.lightBg,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: isMobile ? '40px 45px' : '52px 60px',
            }}
        >
            {/* Título e descrição */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <h2
                    style={{
                        fontFamily: '"Times New Roman", serif',
                        color: COLORS.primary,
                        fontSize: isMobile ? '1.6rem' : '2rem',
                        marginBottom: 12,
                    }}
                >
                    {section.title}
                </h2>
                <p
                    style={{
                        color: COLORS.textMuted,
                        fontFamily: 'Inter, sans-serif',
                        fontSize: isMobile ? '0.95rem' : '1.05rem',
                        maxWidth: 640,
                        margin: '0 auto',
                        lineHeight: 1.7,
                    }}
                >
                    {section.description}
                </p>
            </div>

            {/* Grid de Fotos */}
            <div style={gridStyles}>
                {highlighted.map((img, i) => {
                    const isLastAndMobile = isMobile && i === 2 // Terceira foto no mobile

                    return (
                        <div
                            key={i}
                            onClick={() => openModal(i)}
                            style={{
                                cursor: 'pointer',
                                borderRadius: 10,
                                overflow: 'hidden',
                                aspectRatio: '4/3',
                                boxShadow: '0 3px 10px rgba(8,77,110,0.15)',
                                // Lógica do Triângulo Invertido:
                                // Se for a 3ª foto no mobile, ela ocupa as 2 colunas e centraliza
                                gridColumn: isLastAndMobile ? 'span 2' : 'auto',
                                width: isLastAndMobile ? '50%' : '100%',
                                justifySelf: isLastAndMobile ? 'center' : 'stretch',
                            }}
                        >
                            <img src={img} alt="foto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    )
                })}
            </div>
            {/* Botão ver todas */}
            {section.images.length > 0 && (
                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={() => openModal(0)}
                        style={{
                            backgroundColor: COLORS.primary,
                            color: COLORS.white,
                            border: 'none',
                            borderRadius: 6,
                            padding: isMobile ? '11px 24px' : '13px 32px',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            letterSpacing: '0.03em',
                            boxShadow: '0 4px 14px rgba(8,77,110,0.25)',
                        }}
                    >
                        Ver Todas as Fotos ({section.images.length})
                    </button>
                </div>
            )}

            {/* Modal lightbox renderizado via Portal para corrigir bug de posição fixa dentro do carrossel */}
            {modalOpen &&
                createPortal(
                    <PhotoModal
                        images={section.images}
                        title={section.title}
                        startIndex={modalStartIndex}
                        onClose={() => setModalOpen(false)}
                    />,
                    document.body
                )}
        </div>
    )
}
