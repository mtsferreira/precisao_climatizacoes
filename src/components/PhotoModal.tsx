import { useState, useEffect, useCallback } from 'react'
import { COLORS } from '../constants/theme'
import { useIsMobile } from '../hooks/useIsMobile'

interface PhotoModalProps {
  images: string[]
  title: string
  startIndex: number
  onClose: () => void
}

export default function PhotoModal({ images, title, startIndex, onClose }: PhotoModalProps) {
  const [current, setCurrent] = useState(startIndex)
  const isMobile = useIsMobile()

  const prev = useCallback(() => setCurrent(c => (c - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setCurrent(c => (c + 1) % images.length), [images.length])

  // Fechar com ESC / navegar com setas do teclado
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, prev, next])

  // Bloquear scroll do body enquanto modal está aberto
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const arrowBtn = (onClick: () => void, label: string, side: 'left' | 'right') => (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        position: 'absolute',
        top: '50%',
        [side]: isMobile ? 8 : 20,
        transform: 'translateY(-50%)',
        background: 'rgba(255,255,255,0.15)',
        border: '1px solid rgba(255,255,255,0.3)',
        borderRadius: '50%',
        width: isMobile ? 40 : 52,
        height: isMobile ? 40 : 52,
        color: '#fff',
        fontSize: isMobile ? 22 : 28,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
      }}
    >
      {side === 'left' ? '‹' : '›'}
    </button>
  )

  return (
    // Overlay escuro
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.94)',
        zIndex: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Header do modal */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '12px 16px' : '16px 28px',
          background: 'rgba(8,77,110,0.6)',
        }}
      >
        <span style={{ color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: isMobile ? '0.9rem' : '1rem' }}>
          {title} — {current + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          aria-label="Fechar"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: 28,
            cursor: 'pointer',
            lineHeight: 1,
            padding: '0 4px',
          }}
        >
          ×
        </button>
      </div>

      {/* Imagem principal */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          flex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '8px' : '16px',
          minHeight: 0, // Necessário para o flex-child não estourar a tela mantendo a foto inteira
        }}
      >
        <img
          src={images[current]}
          alt={`${title} - foto ${current + 1}`}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        />
        {arrowBtn(prev, 'Foto anterior', 'left')}
        {arrowBtn(next, 'Próxima foto', 'right')}
      </div>

      {/* Miniaturas */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          display: 'flex',
          overflowX: 'auto',
          gap: 8,
          padding: '10px 16px',
          background: 'rgba(0,0,0,0.5)',
          justifyContent: images.length <= 6 ? 'center' : 'flex-start',
        }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`miniatura ${i + 1}`}
            onClick={() => setCurrent(i)}
            style={{
              width: isMobile ? 54 : 70,
              height: isMobile ? 40 : 52,
              objectFit: 'cover',
              borderRadius: 4,
              cursor: 'pointer',
              flexShrink: 0,
              border: i === current ? `2px solid ${COLORS.accent}` : '2px solid transparent',
              opacity: i === current ? 1 : 0.6,
              transition: 'opacity 0.2s, border-color 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  )
}
