import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import type { HTMLMotionProps } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { useContextScroll } from '../hooks'

export default (props: HTMLMotionProps<"div">) => {
    const loc = useLocation()
    const [scroll, setScroll] = useContextScroll(loc.pathname)
    const ref = useRef<HTMLDivElement>(null)

    const directions = {
        'left': -1,
        'right': 1
    }
    // @ts-ignore
    const dir = directions[loc.state?.dir] ?? 1
    const restoreScroll = () => {
        // console.log('scrollHeight:', ref.current?.clientHeight, 'savedScroll:', scroll)
        if (ref.current) {
            if (scroll <= (ref.current.scrollHeight - ref.current.clientHeight)) {
                ref.current.scrollTop = scroll
            } else {
                console.log('redone', scroll, (ref.current?.scrollHeight || 0) - (ref.current?.clientHeight || 0))
                ref.current.scrollTop = (ref.current?.scrollHeight || 0) - (ref.current?.clientHeight || 0)

                // ref.current.scrollTop = (ref.current?.scrollHeight - ref.current?.clientHeight)
                setTimeout(restoreScroll, 0)
            }
        } else {
            setTimeout(restoreScroll, 0)
        }
    }

    useLayoutEffect(() => {
        if (ref.current) ref.current.scrollTop = scroll
    }, [])
    return <motion.div
        {...props}
        onScroll={() => { setScroll(ref.current?.scrollTop || 0) }}
        className={props.className + ' absolute top-0 left-0 right-0 h-page p-page overflow-x-hidden overflow-y-scroll'}
        ref={ref}
        initial={{ x: window.innerWidth * dir - 64 }}
        animate={{ x: 0 }}
        exit={{ x: -window.innerWidth * dir }}
        transition={{ ease: 'anticipate', duration: 0.3 }}
    >
        {props.children}
    </motion.div>
}