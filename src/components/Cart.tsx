import { motion, MotionProps, HTMLMotionProps } from 'framer-motion'
import { HTMLAttributes } from 'react'
import { useLocalStorage, useReadLocalStorage, useToggle } from 'usehooks-ts'
import { ImCart } from 'react-icons/im'
import type { Product } from '../firebase/Products'
import type { MouseEvent } from 'react'
import useCart from '../hooks/useCart'
// TODO

interface MutationProps extends HTMLMotionProps<"button"> {
    product: Product
}

type CartItem = { amount: number, product: Product }


export default {
    switch(props: HTMLAttributes<HTMLDivElement>) {
        const [cart] = useCart()
        return <div {...props} className={'flex items-center gap-2 ' + props.className}>
            <span className=''>{cart.length}</span>
            <ImCart className='' />
        </div>
    },
    widget() {
        const [cart, addCart, deleteCart] = useCart()

        // const indexedItems: CartItem[] = items.reduce((prev: CartItem[], curr) => {
        //     if (prev.some(cart => cart.product.id === curr.id)) {
        //         return prev.map(item => item.product.id !== curr.id ? item : { ...item, amount: item.amount + 1 })
        //     } else {
        //         return [...prev, { product: curr, amount: 1 }]
        //     }
        // }, [])
        console.log(cart)
        return <div>{cart.map(([product, amount]) => <div>{product.name}:{amount}</div>)}</div>
    },
    add(props: MutationProps) {
        const [cart, addCart] = useCart()

        function onClickHandler(e: MouseEvent<HTMLButtonElement>) {
            e.stopPropagation()
            addCart(props.product)
        }

        return <motion.button whileTap={{ scale: 1.25 }} onClick={onClickHandler} {...props}>
            <ImCart />
        </motion.button>
    },
}
