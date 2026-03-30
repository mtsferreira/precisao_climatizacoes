import { useCallback, useState } from 'react'
import { COLORS } from '../constants/theme'
import { photoSections } from '../data/photoSections'
import { useIsMobile } from '../hooks/useIsMobile'
import PhotoSection from './PhotoSection'

export default function MainCarousel() {
    const [current, setCurrent] = useState(0)
    const isMobile = useIsMobile()

    // Estados para controle do gesto de deslizar (swipe)
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)

    // Configurações das sessões
    const slides = photoSections.map((section, idx) => (
        <PhotoSection key={section.id} section={section} isActive={current === idx} />
    ))

    const total = slides.length
    const slideLabels = photoSections.map((s) => s.title)

    // Navegação
    const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total])
    const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total])

    // ============================================================
    // LÓGICA DE GESTOS (SWIPE)
    // ============================================================
    const minSwipeDistance = 50 // distância mínima em pixels para ativar a troca

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return

        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance

        if (isLeftSwipe) {
            next()
        } else if (isRightSwipe) {
            prev()
        }
    }

    // ============================================================
    // ESTILOS
    // ============================================================
    const arrowStyle = (side: 'left' | 'right') => ({
        position: 'absolute' as const,
        top: '50%',
        [side]: isMobile ? 6 : 14,
        transform: 'translateY(-50%)',
        zIndex: 20,
        background: 'rgba(128, 128, 128, 0.55)',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        width: isMobile ? 30 : 40,
        height: isMobile ? 90 : 80,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: isMobile ? 20 : 26,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    })

    return (
        <div
            // Handlers de toque injetados no container principal
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                backgroundColor: COLORS.lightBg,
                marginTop: '-40px',
                borderRadius: '50% 50% 0 0 / 30px 30px 0 0',
                paddingTop: '40px',
                paddingBottom: '32px',
                zIndex: 10,
                boxShadow: '0 -10px 30px rgba(0,0,0,0.08)',
                // touchAction: 'pan-y' permite scroll vertical mas captura o horizontal para o JS
                touchAction: 'pan-y',
            }}
        >
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

            {/* Setas (Aparecem em ambos, mas o swipe agora funciona também) */}
            <button onClick={prev} style={arrowStyle('left')} aria-label="Foto anterior">
                ‹
            </button>

            <button onClick={next} style={arrowStyle('right')} aria-label="Próxima foto">
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
                            backgroundColor: current === i ? COLORS.accent : 'rgba(8,77,110,0.3)',
                            transition: 'all 0.25s ease',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
