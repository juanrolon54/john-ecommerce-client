import { motion, HTMLMotionProps } from 'framer-motion'
import { ForwardRefComponent } from 'framer-motion'

export default function (props: HTMLMotionProps<"input">) {
    return <motion.input
        {...props}
        layoutId='search-bar'
        type='text'
        className='border z-50 border-black w-full text-black rounded-full px-2 outline-none active:outline-none focus:ring-0 border-x-0 border-t-0 bg-white h-8'
        placeholder='Search'
    />
}