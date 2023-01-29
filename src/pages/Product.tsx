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

    return <Page className='flex flex-col gap-8' scrollRestoring={!isLoading}>
        <Link to='/browser' state={{ dir: 'left' }} className=''>Go back</Link>
        <div className="flex gap-4 relative h-[calc(60vh+1rem)]">
            <div className='absolute translate-x-4 -translate-y-4 left-0 bottom-0 aspect-square h-[60vh] z-40'>
                <motion.img referrerPolicy='no-referrer' srcSet={product?.picture + ', ' + 'https://via.placeholder.com/512/512'} loading='lazy' alt={product?.name} layoutId={'product-detail-' + params.id + '-img'}
                    className='absolute border border-black bg-slate-200 rounded-2xl aspect-square h-[60vh] left-0 bottom-0' />
            </div>
            <div className='flex flex-col bottom-0 flex-1'>
                <div className='pl-[calc(60vh+3rem)] flex text-6xl font-semi h-24 leading-normal'>{product?.name}</div>
                <motion.div layoutId={'product-detail-' + params.id + '-description'} className='pl-[calc(60vh+3rem)] flex-1 flex bg-black text-white gap-4 rounded-2xl '>
                    <div className='flex flex-col gap-4 p-2 flex-1'>
                        <div>{product?.abstract}</div>
                        <div>{product?.article}</div>
                        <div className='flex-1' />
                        <div className='flex gap-4 items-baseline text-xl'>
                            <div className='font-semibold tracking-tighter bg-white py-2 px-4 rounded-full text-black -translate-x-16 z-50 border border-black'>$ {product?.price}</div>
                            <div className='flex-1' />
                            <div className='flex gap-2 translate-x-6 items-baseline'>
                                <div>Add to cart</div>
                                <div className='py-2 px-4 bg-white text-black w-fit border border-black rounded-full'>BUY NOW</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div >
        <div className='flex gap-2 w-full justify-start text-xl flex-wrap'>
            {product?.categories.map(category => <motion.div key={category} className='rounded-full px-2 bg-white text-black border border-black'>{category}</motion.div>)}
            {product?.specification && Object.entries(product.specification)
                .map(([key, value]) => <div key={key} className='bg-black text-white rounded-full border border-black flex gap-1 pl-2'>{key}<span className=' bg-white text-black rounded-full px-2'>{value}</span></div>)}
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
    </Page >
}