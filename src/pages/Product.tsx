import { useEffect, useLayoutEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Page } from '../components'
import { useFirestoreDocumentData } from '@react-query-firebase/firestore'

import { doc } from 'firebase/firestore'
import Products from '../firebase/Products'

export default () => {
    const params = useParams()
    if (!params.id) return null

    const { data: product, isLoading } = useFirestoreDocumentData(["product", params.id], doc(Products, params.id))

    return <Page className='flex flex-col gap-8'>
        <Link to='/browser' state={{ dir: 'left' }} className='absolute top-6'>Go back</Link>
        <div className="flex gap-4">
            <motion.img referrerPolicy='no-referrer' src={product?.picture} alt={product?.name} layoutId={'product-detail-' + params.id + '-img'} className='border border-black bg-slate-200 rounded-2xl aspect-square h-[60vh]'></motion.img>
            <div className='flex-1 flex flex-col gap-4'>
                <div className='flex text-6xl font-semi min-h-[60px]'>
                    <div>{product?.name}</div>
                </div>
                <motion.div layoutId={'product-detail-' + params.id + '-description'} className='flex-1 bg-black rounded-lg p-4 text-white flex flex-col gap-4'>
                    <div className='flex gap-2 w-full justify-end'>
                        {product?.categories.map(category => <div className='rounded-full px-2 bg-white text-black'>{category}</div>)}
                    </div>
                    <div>{product?.abstract}</div>
                    <div>{product?.article}</div>
                    <div className='flex-1' />
                    <div className="flex gap-4 items-baseline text-xl">
                        <div className='font-semibold underline tracking-tighter'>$ {product?.price}</div>
                        <div className='flex-1' />
                        <div>Add to cart</div>
                        <div className='p-2 bg-white text-black rounded-lg w-fit'>BUY NOW</div>
                    </div>
                </motion.div></div>
        </div>
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
    </Page>
}