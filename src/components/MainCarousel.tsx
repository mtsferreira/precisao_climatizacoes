import { useState, useCallback } from 'react'
import HeroText from './HeroText'
import PhotoSection from './PhotoSection'
import FeatureCards from './FeatureCards'
import WhatsAppCTA from './WhatsAppCTA'
import { photoSections } from '../data/photoSections'
import { COLORS } from '../constants/theme'
import { useIsMobile } from '../hooks/useIsMobile'

export default function MainCarousel() {
  const [current, setCurrent] = useState(0)
  const isMobile = useIsMobile()

  // ============================================================
  // SLIDES DO CARROSSEL — ordem: Hero → Sessões de Fotos → Cards → WhatsApp
  // Para adicionar um novo slide: importe o componente e adicione ao array
  // ============================================================
  const slides = [
    <HeroText key="hero" />,
    ...photoSections.map((section, idx) => (
      // A primeira seção (Início) é o slide 0, então as fotos começam no slide 1
      <PhotoSection key={section.id} section={section} isActive={current === idx + 1} />
    )),
    <FeatureCards key="cards" />,
    <WhatsAppCTA key="whatsapp" />,
  ]

  const total = slides.length

  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total])
  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total])

  // Labels para os dots de navegação
  const slideLabels = [
    'Início',
    ...photoSections.map(s => s.title),
    'Diferenciais',
    'Contato',
  ]

  const arrowStyle = (side: 'left' | 'right') => ({
    position: 'absolute' as const,
    top: '50%',
    [side]: isMobile ? 6 : 14,
    transform: 'translateY(-50%)',
    zIndex: 20,
    background: 'rgba(8,77,110,0.55)',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: isMobile ? 36 : 44,
    height: isMobile ? 36 : 44,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: isMobile ? 20 : 26,
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  })

  return (
    // ===== CARROSSEL PRINCIPAL (Efeito de Fade para ajustar a altura suavemente) =====
    <div style={{ position: 'relative', overflowX: 'hidden', width: '100%' }}>
      {/* Contêiner das páginas */}
      <div style={{ position: 'relative', width: '100%', minHeight: 400 }}>
        {slides.map((slide, i) => {
          const isActive = current === i
          return (
            <div
              key={i}
              style={{
                position: isActive ? 'relative' : 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: isActive ? 'auto' : '100%',
                overflow: isActive ? 'visible' : 'hidden',
                opacity: isActive ? 1 : 0,
                visibility: isActive ? 'visible' : 'hidden',
                transition: 'opacity 0.4s ease, visibility 0.4s ease',
                zIndex: isActive ? 5 : 1,
              }}
            >
              {slide}
            </div>
          )
        })}
      </div>

      {/* Botão anterior */}
      <button onClick={prev} style={arrowStyle('left')} aria-label="Slide anterior">
        ‹
      </button>

      {/* Botão próximo */}
      <button onClick={next} style={arrowStyle('right')} aria-label="Próximo slide">
        ›
      </button>

      {/* Dots de navegação */}
      <div
        style={{
          position: 'absolute',
          bottom: 14,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
          zIndex: 20,
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            title={slideLabels[i]}
            aria-label={`Ir para: ${slideLabels[i]}`}
            style={{
              width: current === i ? 28 : 8,
              height: 8,
              borderRadius: 4,
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              backgroundColor: current === i ? COLORS.accent : 'rgba(255,255,255,0.5)',
              transition: 'all 0.25s ease',
              boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
