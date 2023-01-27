import { useEffect } from 'react'
import { Page, SearchBar } from "../components"
import { Link } from 'react-router-dom'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { motion } from 'framer-motion'
import Products from '../firebase/Products'

export default () => {
    const { data: products, isLoading } = useFirestoreQueryData(["products"], Products)

    return <Page className="grid gap-8 grid-cols-4 relative">
        <div className="bg-black text-white sticky top-0 p-2 rounded-3xl min-h-[calc(100vh-8rem)] h-fit flex flex-col gap-4">
            <SearchBar autoFocus />
            <p className="-mb-2">type</p>
            <div className="bg-white rounded-2xl flex flex-wrap gap-2 p-2">
                {['cap', 'lenses', 'tShirts', 'shorts', 'footwear']
                    .map(type => <div key={type} className="px-4 pl-8 bg-black rounded-full w-fit">{type}</div>)}
            </div>
            <p className="-mb-2">color</p>
            <div className="bg-white rounded-2xl flex flex-wrap gap-2 p-2">
                {['white', 'red', 'blue', 'black', 'gray'].map(color => <div key={color} className="px-4 pl-8 bg-black rounded-full w-fit">{color}</div>)}
            </div>
        </div>
        <div className="col-span-3 flex flex-col gap-8 text-white pb-32">
            <div className="flex flex-wrap gap-2">
                {parameters.map(parameter => <div key={Math.random()} className="px-4 pl-8 bg-black rounded-full">{parameter}</div>)}
            </div>
            <div className="grid grid-cols-3 grid-flow-row gap-4 h-max">
                {!isLoading && products?.map(({ id, name, picture, price }) => <Link key={id} to={`/product/${id}`} className="h-full w-full">
                    <motion.div layoutId={'product-detail-' + id + '-description'} className="rounded-t-3xl rounded-b-lg bg-black flex flex-col">
                        <div className='relative'>
                            <motion.img layoutId={'product-detail-' + id + '-img'} src={picture} alt={name} crossOrigin='anonymous' referrerPolicy='no-referrer' loading="lazy" className="aspect-square object-cover rounded-3xl bg-slate-400 w-full h-full border border-black" />
                            <div className="absolute bottom-4 right-4 bg-black px-2 rounded-full">
                                $ {price}
                            </div>
                        </div>
                        <div className='p-4'>
                            <p>{name}</p>
                        </div>
                    </motion.div>
                </Link>)}
            </div>
        </div>
    </Page >
}

const parameters = new Array(21).fill('parameter')