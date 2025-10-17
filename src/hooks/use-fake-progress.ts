import { useEffect, useRef, useState } from "react"

/**
 * Progresse de 0 -> 90% pendant le "loading".
 * Appelle set(100) quand on stoppe.
 */
export function useFakeProgress(active: boolean) {
  const [value, setValue] = useState(0)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (!active) {
      setValue(100)
      // reset un peu après l'affichage du 100%
      const t = window.setTimeout(() => setValue(0), 400)
      return () => window.clearTimeout(t)
    }

    setValue(0)
    const tick = () => {
      setValue((v) => {
        // ralentit avec l'approche de 90%
        const inc = Math.max(0.5, (90 - v) / 10)
        const next = Math.min(90, v + inc)
        return next
      })
      timer.current = window.setTimeout(tick, 120) as unknown as number
    }
    tick()

    return () => {
      if (timer.current) window.clearTimeout(timer.current)
      timer.current = null
    }
  }, [active])

  return value
}
