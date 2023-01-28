import { motion, MotionProps } from 'framer-motion'
import { HTMLAttributes } from 'react'
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts'
// TODO

export default {
    widget() {
        const [items, setItems] = useLocalStorage('cart', [])
        return <div></div>
    },
    mutation(props: MotionProps) {
        const items = useReadLocalStorage('cart')

        function onClickHandler() { }
        return <motion.div {...props} onClick={onClickHandler}></motion.div>
    },
}
