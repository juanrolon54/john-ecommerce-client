import { useEffect, useLayoutEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Cart, Page } from '../components'
import { useFirestoreDocumentData } from '@react-query-firebase/firestore'

import { doc } from 'firebase/firestore'
import Products from '../firebase/Products'

export default () => {
    const params = useParams()
    if (!params.id) return null

    const { data: product, isLoading } = useFirestoreDocumentData(["product", params.id], doc(Products, params.id))

    return <Page className='flex flex-col gap-8' scrollRestoring={!isLoading}>
        <Link to='/browser' state={{ dir: 'left' }} className=''>Go back</Link>
        <div className="grid grid-cols-5 gap-4 ">
            <div className='z-40 flex flex-col gap-2 col-span-2'>
                <motion.img referrerPolicy='no-referrer' srcSet={product?.picture + ', ' + 'https://via.placeholder.com/512/512'} loading='lazy' alt={product?.name} layoutId={'product-detail-' + params.id + '-img'}
                    className='border border-black bg-slate-200 rounded-2xl aspect-square' />
            </div>
            <div className='flex flex-col col-span-3'>
                <div className='flex text-6xl font-semi h-24 '>{product?.name}</div>
                <motion.div layoutId={'product-detail-' + params.id + '-description'} className='flex flex-1 bg-black text-white gap-4 rounded-2xl '>
                    <div className='flex flex-col gap-4 flex-1'>
                        <div className='p-4'>
                            <p>{product?.abstract}</p><br />
                            <p>{product?.article}</p>
                        </div>
                        <div className='flex-1' />
                        <div className='flex gap-4 items-baseline text-xl'>
                            <motion.div animate={{ x: 8, y: -8 }} whileHover={{ x: 12, y: -12 }} whileTap={{ x: 0, y: 0 }} className='tracking-tighter bg-white py-2 px-4 rounded-full text-black translate-x-4 z-50 border border-black'>$ {product?.price}</motion.div>
                            <div className='flex-1' />
                            <div className='flex gap-4 items-baseline'>
                                {product !== undefined && <Cart.add product={product} />}
                                <motion.button animate={{ x: 8, y: -8 }} whileHover={{ x: 12, y: -12 }} whileTap={{ x: 0, y: 0 }} className='py-2 px-4  bg-white text-black w-fit border border-black rounded-full'>BUY NOW</motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            <div className='flex gap-2 w-full justify-start text-xl flex-wrap col-span-5'>
                {product?.categories.map(category => <motion.div key={category} className='rounded-full px-2 bg-white text-black border border-black'>{category}</motion.div>)}
                {product?.specification && Object.entries(product.specification)
                    .map(([key, value]) => <div key={key} className='bg-black text-white rounded-full border border-black flex gap-1 pl-2'>{key}<span className=' bg-white text-black rounded-full px-2'>{value}</span></div>)}
            </div>
        </div >
        {/* <div className='flex flex-col gap-4'>
            <div>More like this</div>
            <div className="grid grid-cols-4 grid-flow-row gap-2 text-white">
                {Array.from(Array(4)).map((product: number, index) => <Link key={index} to={`/product/${index}`} className="h-full w-full">
                    <motion.div layoutId={'asos-product-detail-' + index + '-description'} className="rounded-xl bg-black flex flex-col overflow-hidden">
                        <div className='relative'>
                            <motion.img layoutId={'asos-product-detail-' + index + '-img'} src={index} crossOrigin='anonymous' referrerPolicy='no-referrer' loading="lazy" className="aspect-square object-cover rounded-lg bg-slate-400 w-full h-full border" />
                            <div className="absolute bottom-4 right-4 bg-black px-2 rounded-full">
                                $ {index}
                            </div>
                        </div>
                        <div className='w-full rounded-lg bg-black pt-8 p-4'>
                            <p>{index}</p>
                        </div>
                    </motion.div>
                </Link>)}
            </div>
        </div> */}
    </Page >
}