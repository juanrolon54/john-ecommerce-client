import { useEffect } from 'react'
import { Page } from "../components"
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { motion } from 'framer-motion'

export default () => {
    // const list = useQuery('asos-product-list', () => asos.product.list({ offset: 0, categoryId: 4209, limit: 30, sort: 'freshness' }))

    return <Page className="grid gap-8 grid-cols-4 relative">
        <div className="bg-black text-white sticky top-0 p-2 rounded-lg min-h-[calc(100vh-8rem)] h-fit flex flex-col gap-4">
            <form>
                <input type='text' className='bg-transparent w-full outline-none active:outline-none focus:ring-0 border-x-0 border-t-0 focus:border-b-white border-b-2 border-b-white h-6 p-0' placeholder='Search?' />
            </form>
            <p className="-mb-2">type</p>
            <div className="bg-white rounded-lg flex flex-wrap gap-2 p-2">
                {['cap', 'lenses', 'tShirts', 'shorts', 'footwear']
                    .map(type => <div key={type} className="px-4 pl-8 bg-black rounded-full w-fit">{type}</div>)}
            </div>
            <p className="-mb-2">color</p>
            <div className="bg-white rounded-lg flex flex-wrap gap-2 p-2">
                {['white', 'red', 'blue', 'black', 'gray']
                    .map(color => <div key={color} className="px-4 pl-8 bg-black rounded-full w-fit">{color}</div>)}
            </div>
        </div>
        <div className="col-span-3 flex flex-col gap-8 text-white">
            <div className="flex flex-wrap gap-2">
                {parameters.map(parameter => <div key={Math.random()} className="px-4 pl-8 bg-black rounded-full">{parameter}</div>)}
            </div>
            <div className="grid grid-cols-3 grid-flow-row gap-4 h-max">
                {Array.from(Array(30)).map((product: number, index) => <Link key={index} to={`/product/${index}`} className="h-full w-full">
                    <motion.div layoutId={'asos-product-detail-' + index + '-description'} className="rounded-xl bg-black flex flex-col overflow-hidden">
                        <div className='relative'>
                            <motion.img layoutId={'asos-product-detail-' + index + '-img'} /* src={String(index)}*/ crossOrigin='anonymous' referrerPolicy='no-referrer' loading="lazy" className="aspect-square object-cover rounded-lg bg-slate-400 w-full h-full border" />
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
        </div>
    </Page >
}

const parameters = new Array(21).fill('parameter')