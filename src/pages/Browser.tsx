import { useEffect } from 'react'
import { Page, SearchBar } from "../components"
import { Link } from 'react-router-dom'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { motion } from 'framer-motion'
import Products from '../firebase/Products'
import assets from '../assets/assets'

export default () => {
    const { data: products, isLoading } = useFirestoreQueryData(["products"], Products)

    return <Page className="grid gap-8 grid-cols-4 relative" scrollRestoring={!isLoading}>
        <div className='flex flex-col gap-2 sticky top-2 h-fit'>
            <SearchBar className='border border-black ' />
            <div className="bg-black text-white border border-black rounded-lg h-fit flex flex-col gap-2 ">
                <p className="px-4 pt-1">type</p>
                <div className="bg-white translate-x-2 -translate-y-2 border border-black rounded-2xl flex flex-wrap gap-2 p-2">
                    {assets.categories
                        .map(type => <div key={type} className="px-4 pl-8 bg-black rounded-full w-fit">{type}</div>)}
                </div>
                <p className="px-4">color</p>
                <div className="bg-white translate-x-2 -translate-y-2 border border-black rounded-2xl flex flex-wrap justify-evenly gap-2 p-2">
                    {assets.colors.map(color =>
                        <div
                            key={color}
                            style={{ backgroundColor: color }}
                            className="rounded-full overflow-hidden text-black border-black border w-6 px-2 h-6 transition-all"
                        />)
                    }
                </div>
            </div>
        </div>
        <div className="col-span-3 flex flex-col gap-8 text-white pb-32">
            {/* <div className="flex flex-wrap gap-2">
                {parameters.map(parameter => <div key={Math.random()} className="px-4 pl-8 bg-black rounded-full">{parameter}</div>)}
            </div> */}
            <div className="grid grid-cols-3 grid-flow-row gap-6 h-max">
                {!isLoading && products?.map(({ id, name, picture, price }) => <Link key={id} to={`/product/${id}`} className="h-full w-full">
                    <motion.div layoutId={'product-detail-' + id + '-description'} className="rounded-lg bg-black flex flex-col">
                        <div className='relative'>
                            <motion.div initial={{ x: 8, y: -8 }} whileHover={{ x: -12, y: -12 }}>
                                <motion.img layoutId={'product-detail-' + id + '-img'} src={picture} alt={name} referrerPolicy='no-referrer' loading="lazy"
                                    className="aspect-square object-cover rounded-2xl bg-slate-200 w-full h-full border border-black" />
                                <div className="absolute bottom-4 right-4 bg-black px-2 rounded-full">
                                    $ {price}
                                </div>
                            </motion.div>
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