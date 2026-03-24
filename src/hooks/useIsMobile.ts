import { useState, useEffect } from 'react'

/**
 * Hook de responsividade.
 * Retorna true se a largura da janela for menor que `breakpoint` (padrão: 768px).
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  )

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [breakpoint])

  return isMobile
}
