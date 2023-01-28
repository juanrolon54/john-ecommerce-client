import { useContext } from '../context'
import { useState, useEffect } from 'react'

export default (pathname: string) => {
    const { scrolls, setScrolls } = useContext()

    return [
        scrolls[pathname] || 0,
        (scroll: number) => setScrolls((prev) => ({ ...prev, [pathname]: scroll })),
    ] as const
}
