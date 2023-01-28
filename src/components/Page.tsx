import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import type { HTMLMotionProps } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { useContextScroll } from '../hooks'
import Footer from './Footer'

interface PageProps extends HTMLMotionProps<'div'> {
    scrollRestoring?: boolean
}

export default (props: PageProps) => {
    const loc = useLocation()
    const [scroll, setScroll] = useContextScroll(loc.pathname)
    const ref = useRef<HTMLDivElement>(null)

    const directions = {
        left: -1,
        right: 1,
    }

    // @ts-ignore
    const dir = directions[loc.state?.dir] ?? 1
    const scrollRestoring = props.scrollRestoring ?? true

    useEffect(() => {
        if (ref.current && scrollRestoring) {
            ref.current.scrollTop = scroll
        }
    }, [props.scrollRestoring])
    return (
        <motion.div
            {...props}
            onScroll={() => {
                setScroll(ref.current?.scrollTop || 0)
            }}
            className={
                ' h-page absolute top-0 left-0 right-0 overflow-x-hidden overflow-y-scroll'
            }
            ref={ref}
            initial={{ x: (window.innerWidth * dir) - 64 }}
            animate={{ x: 0 }}
            exit={{ x: -window.innerWidth * dir }}
            transition={{ type: 'spring', damping: 100, stiffness: 1000 }}
        >
            <div className={props.className + ' min-h-page p-page'}>
                <>{props.children}</>
            </div>
            <Footer className='grid place-content-center' />
        </motion.div>
    )
}
