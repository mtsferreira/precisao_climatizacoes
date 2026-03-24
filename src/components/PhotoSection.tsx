import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import PhotoModal from './PhotoModal'
import type { PhotoSectionData } from '../data/photoSections'
import { COLORS } from '../constants/theme'
import { useIsMobile } from '../hooks/useIsMobile'

interface PhotoSectionProps {
  section: PhotoSectionData
  isActive?: boolean
}

export default function PhotoSection({ section, isActive }: PhotoSectionProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalStartIndex, setModalStartIndex] = useState(0)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
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

  const cols = isMobile ? 1 : Math.min(highlighted.length, 3)

  return (
    // ===== SESSÃO DE FOTOS =====
    <div
      style={{
        minHeight: isMobile ? 'auto' : '80vh',
        backgroundColor: COLORS.lightBg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: isMobile ? '40px 16px' : '52px 48px',
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

      {/* Fotos em destaque */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: isMobile ? 12 : 16,
          maxWidth: 960,
          margin: '0 auto 28px',
          width: '100%',
        }}
      >
        {highlighted.map((img, i) => (
          <div
            key={i}
            onClick={() => openModal(i)}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              cursor: 'pointer',
              borderRadius: 10,
              overflow: 'hidden',
              aspectRatio: '4/3',
              boxShadow:
                hoveredIdx === i
                  ? '0 8px 24px rgba(8,77,110,0.28)'
                  : '0 3px 10px rgba(8,77,110,0.15)',
              transform: hoveredIdx === i ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform 0.22s ease, box-shadow 0.22s ease',
            }}
          >
            <img
              src={img}
              alt={`${section.title} - foto ${i + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}
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
      {modalOpen && createPortal(
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
