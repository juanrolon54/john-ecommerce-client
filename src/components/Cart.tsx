import { motion, MotionProps, HTMLMotionProps } from 'framer-motion'
import { HTMLAttributes } from 'react'
import { useLocalStorage, useReadLocalStorage, useToggle } from 'usehooks-ts'
import { ImCart } from 'react-icons/im'
import type { Product } from '../firebase/Products'
import type { MouseEvent } from 'react'
// TODO

interface MutationProps extends HTMLMotionProps<"button"> {
    product: Product
}

type CartItem = { amount: number, product: Product }


export default {
    switch(props: HTMLAttributes<HTMLDivElement>) {
        const items = useReadLocalStorage<Product[]>('cart')
        const lastItem = items?.[items?.length - 1]
        return <div {...props}>
            <ImCart />
        </div>
    },
    widget() {
        const [items, setItems] = useLocalStorage<Product[]>('cart', [])
        const indexedItems: CartItem[] = items.reduce((prev: CartItem[], curr) => {
            if (prev.some(cart => cart.product.id === curr.id)) {
                return prev.map(item => item.product.id !== curr.id ? item : { ...item, amount: item.amount + 1 })
            } else {
                return [...prev, { product: curr, amount: 1 }]
            }
        }, [])

        return <div>{indexedItems.map(item => <div>{item.product.name}:{item.amount}</div>)}</div>
    },
    add(props: MutationProps) {
        const [items, setItems] = useLocalStorage<Product[]>('cart', [])

        function onClickHandler(e: MouseEvent<HTMLButtonElement>) {
            e.stopPropagation()
            setItems([...items, props.product])
        }

        return <motion.button whileTap={{ scale: 1.25 }} onClick={onClickHandler} {...props}>
            <ImCart />
        </motion.button>
    },
}
