import { Page } from "../components"
import useCart from "../hooks/useCart"
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ImPlus, ImCross } from "react-icons/im"

export default function Checkout() {
    const [cart, addCart, deleteCart, { getItemValue, totalCartValue }] = useCart()

    return <Page className="bg-slate-800 ">
        <div className="flex flex-col gap-8 text-slate-50 px-32">
            <p className="text-4xl font-semibold">End your journey.</p>

            <div className='flex flex-col gap-2'>
                <AnimatePresence mode='popLayout'>
                    {cart.reverse().map(([product, amount]) =>
                        <motion.div className="grid grid-cols-2 gap-4" layout
                            key={product.id}
                            initial={{ x: '110%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '110%' }}
                            transition={{ type: 'spring', damping: 100, stiffness: 1000 }}
                            whileHover={{ x: -4 }} >
                            <motion.div className='bg-white border border-black rounded-2xl text-black pr-2 flex items-center gap-2'>
                                <Link key={product.id} to={`/product/${product.id}`}>
                                    <img
                                        className='rounded-[15px] border border-black aspect-square h-16'
                                        srcSet={product.picture + ', ' + 'https://via.placeholder.com/512/512'}
                                        loading='lazy'
                                    />
                                </Link>
                                <div className='flex flex-col px-2'>
                                    <span className='font-semibold'>{product.name}<span className="font-normal"> x{amount}</span></span>
                                    <span>${product.price}</span>
                                </div>
                                <div className='flex-1' />
                                <div className='grid grid-rows-3 grid-cols-1'>
                                    <button onClick={() => { deleteCart(product.id) }}><ImCross /></button>
                                    <div />
                                    <button onClick={() => { addCart(product) }}><ImPlus /></button>
                                </div>
                            </motion.div>
                            <div className="w-full h-full text-3xl flex items-center" key={product.id + '-2'}>
                                $ {getItemValue(product.id)}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <p className="text-4xl font-semibold">TOTAL: ${totalCartValue}</p>
        </div>
    </Page>
}