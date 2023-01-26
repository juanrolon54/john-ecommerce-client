import { useEffect, useLayoutEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { motion } from 'framer-motion'

import { Page } from '../components'

export default () => {
    const params = useParams()
    if (!params.id) return null
    const ref = useRef<HTMLDivElement>(null)

    // const product = useQuery('asos-product-detail-' + params.id, () => asos.product.detail(params.id || ""))

    return <Page className='flex flex-col gap-8'>
        <Link to='/browser' state={{ dir: 'left' }} className='absolute top-6'>Go back</Link>
        <div className="flex gap-4">
            <motion.div layoutId={'asos-product-detail-' + params.id + '-img'} className='bg-slate-400 rounded-lg aspect-square h-[60vh]'></motion.div>
            <motion.div layoutId={'asos-product-detail-' + params.id + '-description'} className='bg-black rounded-lg p-4 text-white flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <div>TITLE</div>
                </div>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, veniam repudiandae pariatur labore consequatur molestias porro repellat iure culpa odio alias laboriosam eveniet consectetur accusamus, animi obcaecati consequuntur a quibusdam?</div>
                <div className='flex-1' />
                <div>Colors</div>
                <div className="flex gap-4 items-baseline">
                    <div>$ 100000</div>
                    <div className='flex-1' />
                    <div>Add to cart</div>
                    <div className='p-2 bg-white text-black rounded-lg w-fit'>BUY NOW</div>
                </div>
            </motion.div>
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