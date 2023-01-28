import { motion, HTMLMotionProps } from 'framer-motion'
import { ForwardRefComponent } from 'framer-motion'

export default function (props: HTMLMotionProps<'input'>) {
    return (
        <motion.input
            layoutId='search-bar'
            type='text'
            placeholder='Search'
            {...props}
            className={
                props.className +
                ' z-50 h-8 w-full rounded-full border border-black bg-white px-2 text-black outline-none focus:ring-0 active:outline-none'
            }
        />
    )
}
