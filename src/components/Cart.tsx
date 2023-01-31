import { motion, MotionProps, HTMLMotionProps, ForwardRefComponent, AnimatePresence } from 'framer-motion'
import { HTMLAttributes, useState, useEffect, useRef } from 'react'
import { ImCart, ImCross, ImPlus } from 'react-icons/im'
import type { Product } from '../firebase/Products'
import type { MouseEvent, ReactNode } from 'react'
import useCart from '../hooks/useCart'
import { Link } from 'react-router-dom'
import { useContext } from '../context'

// TODO

interface MutationProps extends HTMLMotionProps<"button"> {
    product: Product
}

type CartItem = { amount: number, product: Product }


export default {
    widget() {
        const { cartVisibility, setCartVisibility } = useContext()
        const [cart, addCart, deleteCart] = useCart()
        const ref = useRef<HTMLDivElement>(null)
        const prevAmount = useRef<number>(0)

        useEffect(() => {
            let cartLength = cart.reduce((p, c) => p + c[1], 0)
            if (cartLength > prevAmount.current) {
                ref.current?.scrollIntoView()
            }

            if (prevAmount.current === 1 && cartLength === 0) {
                setCartVisibility(false)
            }
            prevAmount.current = cartLength
        }, [cart])

        return <div className='flex flex-col bg-slate-100 rounded-2xl w-[30vw] max-h-[30vw] border-black border text-black'>
            <button onClick={() => {
                setCartVisibility(false)
                deleteCart('all')
            }} className='m-2 px-2 w-fit'>Empty Cart</button>
            <div className='overflow-y-scroll h-full p-2 flex-1 overflow-x-clip'>
                <div className='flex flex-col gap-2'>
                    <AnimatePresence mode='popLayout'>
                        {cart.reverse().map(([product, amount]) =>
                            <motion.div
                                layout
                                key={product.id}
                                initial={{ x: '110%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '110%' }}
                                transition={{ type: 'spring', damping: 100, stiffness: 1000 }}
                                whileHover={{ x: -4 }} className='bg-white border border-black rounded-2xl text-black pr-2 flex items-center gap-2'>
                                <Link key={product.id} to={`/product/${product.id}`}>
                                    <img
                                        className='rounded-[15px] border border-black aspect-square h-16'
                                        srcSet={product.picture + ', ' + 'https://via.placeholder.com/512/512'}
                                        loading='lazy'
                                    />
                                </Link>
                                <div className='flex flex-col px-2'>
                                    <span className='font-semibold'>{product.name}</span>
                                    <div className='flex justify-between text-slate-600'>
                                        <span>${product.price}</span>
                                        <span>x{amount}</span>
                                    </div>
                                </div>
                                <div className='flex-1' />
                                <div className='grid grid-rows-3 grid-cols-1'>
                                    <button onClick={() => { addCart(product) }}><ImPlus /></button>
                                    <div />
                                    <button onClick={() => { deleteCart(product.id) }}><ImCross /></button>
                                </div>
                            </motion.div>
                        )}
                        {cart.length === 0 && <motion.div
                            layout
                            key='emptyBoi'
                            initial={{ x: '110%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '110%' }}
                            transition={{ type: 'spring', damping: 100, stiffness: 1000 }}
                            className='bg-white border border-black rounded-full text-black flex justify-center items-center'>
                            Cart is empty. Go fill it up.
                        </motion.div>}
                    </AnimatePresence>
                </div>
            </div>
            {cart.length > 0 && <div className='flex justify-between'>
                <Link to='/checkout' className='bg-white border border-black rounded-full px-2 text-black m-2 w-fit' onClick={() => { setCartVisibility(false) }}>Checkout</Link>
                <button onClick={() => { setCartVisibility(false) }} className='bg-white border border-black rounded-full px-2 text-black m-2 w-fit'>Close</button>
            </div>}
        </div >
    },
    switch(props: HTMLMotionProps<'div'>) {
        const [cart, , , { layoutId }] = useCart()
        const [carts, setCarts] = useState<ReactNode[]>([])

        useEffect(() => {
            if (layoutId !== '') setCarts(prev => [...prev,
            <motion.div
                onAnimationComplete={() => { setCarts((prev) => [...prev].slice(1)) }}
                layoutId={layoutId}
                className='absolute w-fit h-fit inset-0 border border-black text-black bg-white rounded-full p-2 '><ImCart /></motion.div>
            ])

        }, [layoutId])

        return <motion.div whileHover={{ x: 4, y: -4 }} whileTap={{ x: 0, y: 0 }} {...props} className={'flex items-center gap-4  ' + props.className}>
            <span>{cart.length > 1 && cart.reduce((p, c) => p + c[1], 0)}</span>
            <div className='relative h-8 w-8'>
                <motion.div key='ramiroNieto' className='absolute w-fit h-fit inset-0 border border-black text-black bg-white rounded-full p-2 '><ImCart /></motion.div>
                {carts.map((cart, i) => <div key={i}>{cart}</div>)}
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
