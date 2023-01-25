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
        <div className='flex flex-col gap-4'>
            <div>More like this</div>
            <div className="grid grid-cols-4 grid-flow-row gap-2 text-white">
                {products.map(product => <Link key={product.id} to={`/product/${product.id}`} className="bg-black rounded-xl relative flex flex-col group hover:z-40">
                    <img src={product.pictureUrl} loading="lazy" className="aspect-square object-cover rounded-lg bg-slate-400" />
                    <div className="absolute bottom-4 right-4 z-30 group-hover:translate-y-[330%] transition-transform bg-black px-2 rounded-full">
                        $ {product.price}
                    </div>
                    <div className="absolute border-b border-b-white left-0 bottom-0 w-full rounded-lg bg-black pt-8 p-4 -z-10 group-hover:translate-y-[calc(100%-1rem)] group-hover: transition-transform translate-x-0">
                        <p>{product.name}</p>
                        <p>{product.colors.join(' • ')}</p>
                    </div>
                </Link>)}
            </div>
        </div>
    </Page>
}

type product = {
    id: string
    name: string
    price: number
    colors: string[]
    pictureUrl: string
}

const products: product[] = new Array(4).fill({
    name: 'Product',
    price: 1000.0,
    colors: ['red', 'blue', 'black'],
    pictureUrl: 'https://placeimg.com/640/480/arch'
},).map(p => ({ ...p, id: String(Math.random()) }))