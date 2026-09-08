import { useEffect } from 'react'

/**
 * Locks page scroll while an overlay is open, compensating for the scrollbar
 * width so the page behind does not shift.
 *
 * The lock is applied to <html> as well as <body>: the viewport scrolls on the
 * root element here, so locking the body alone leaves the page scrollable
 * behind the overlay.
 */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return

    const html = document.documentElement
    const { body } = document
    const gap = window.innerWidth - html.clientWidth

    const previous = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
    }

    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`

    return () => {
      html.style.overflow = previous.htmlOverflow
      body.style.overflow = previous.bodyOverflow
      body.style.paddingRight = previous.bodyPaddingRight
    }
  }, [active])
}
