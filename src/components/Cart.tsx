import { motion, MotionProps, HTMLMotionProps, ForwardRefComponent } from 'framer-motion'
import { HTMLAttributes, useState, useEffect } from 'react'
import { ImCart } from 'react-icons/im'
import type { Product } from '../firebase/Products'
import type { MouseEvent, ReactNode } from 'react'
import useCart from '../hooks/useCart'

// TODO

interface MutationProps extends HTMLMotionProps<"button"> {
    product: Product
}

type CartItem = { amount: number, product: Product }


export default {
    widget() {
        const [cart, addCart, deleteCart] = useCart()

        return <div>{cart.map(([product, amount]) => <div>{product.name}:{amount}</div>)}</div>
    },
    switch(props: HTMLMotionProps<'div'>) {
        const [cart, , , { layoutId }] = useCart()
        const [carts, setCarts] = useState<ReactNode[]>([])

        useEffect(() => {
            if (layoutId !== '') setCarts(prev => [...prev,
            <motion.div
                onAnimationComplete={() => setCarts((prev) => [...prev].slice(1))}
                key={layoutId} layoutId={layoutId}
                className='absolute w-fit h-fit inset-0 border border-black text-black bg-white rounded-full p-2 '><ImCart /></motion.div>
            ])

        }, [layoutId])

        return <motion.div {...props} className={'flex items-center gap-4  ' + props.className}>
            <span>{cart.length}</span>
            <div className='relative h-8 w-8'>
                <motion.div key='ramiroNieto' className='absolute w-fit h-fit inset-0 border border-black text-black bg-white rounded-full p-2 '><ImCart /></motion.div>
                {carts}
            </div>
        </motion.div>
    },
    add(props: MutationProps) {
        const [cart, addCart, , { createLayoutId }] = useCart()
        const [carts, setCarts] = useState<ReactNode[]>([])

        function onClickHandler(e: MouseEvent<HTMLButtonElement>) {
            e.stopPropagation()
            addCart(props.product)
            setCarts((prev) => ([...prev,
            <motion.div
                key={createLayoutId(props.product.id || '')}
                layoutId={createLayoutId(props.product.id || '')}
                className='absolute border border-black bg-white rounded-full p-2 inset-0 text-black'
            >
                <ImCart />
            </motion.div>]))
            setTimeout(() => { setCarts((prev) => ([...prev].slice(1))) }, 0)
        }

        return <motion.button animate={{ x: 8, y: -8 }} whileHover={{ x: 12, y: -12 }} whileTap={{ x: 0, y: 0 }} onMouseDown={onClickHandler} {...props}>
            <ImCart />
            {carts}
        </motion.button>
    },
}
