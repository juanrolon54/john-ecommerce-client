import { motion, HTMLMotionProps } from 'framer-motion'
import { ForwardRefComponent } from 'framer-motion'

export default function (props: HTMLMotionProps<"input">) {
    return <motion.input
        layoutId='search-bar'
        type='text'
        placeholder='Search'
        {...props}
        className={props.className + ' border z-50 border-black w-full text-black rounded-full px-2 outline-none active:outline-none focus:ring-0 bg-white h-8'}
    />
}