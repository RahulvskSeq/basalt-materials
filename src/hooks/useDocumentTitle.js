import { useEffect } from 'react'

const BRAND = 'BASALT'
const DEFAULT_TITLE = 'BASALT — Surface. Structure. Precision.'

/** Sets a per-route document title. Routes always supply their own. */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${BRAND}` : DEFAULT_TITLE
  }, [title])
}
