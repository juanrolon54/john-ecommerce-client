import { useEffect } from 'react'
import { useState } from 'react'
import { Page, SearchBar } from '../components'
import { Link } from 'react-router-dom'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { motion } from 'framer-motion'
import Products from '../firebase/Products'
import assets from '../assets/assets'

export default () => {
    const { data: products, isLoading } = useFirestoreQueryData(
        ['products'],
        Products,
    )
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    function flipFlop(cat: string) {
        return () => {
            setSelectedCategories(prev => prev.includes(cat) ? [...prev].filter(p => p !== cat) : [...prev, cat])
        }
    }


    return (
        <Page
            className='relative grid grid-cols-4 gap-8'
            scrollRestoring={!isLoading}>
            <div className='sticky top-2 flex h-fit flex-col gap-2'>
                <SearchBar className='border border-black ' />
                <div className='flex h-fit flex-col gap-2 border border-black bg-black text-white'>
                    <p className='px-4 pt-1'>type</p>
                    <div className='flex translate-x-2 -translate-y-2 flex-wrap gap-2 justify-end'>
                        {assets.categories.sort((a, b) => a.length - b.length).filter((cat) => !selectedCategories.includes(cat)).map((category) => (
                            <motion.div onClick={flipFlop(category)} layoutId={'browser-filters-' + category} key={category} className='w-fit rounded-full border border-black bg-white text-black px-2'>
                                {category}
                            </motion.div>
                        ))}
                    </div>
                    <p className='px-4'>color</p>
                    <motion.div layout initial={{ x: 8, y: -8 }} className='flex flex-wrap justify-evenly gap-2 rounded-2xl border border-black bg-white p-2'>
                        {assets.colors.map((color) => (
                            <motion.div
                                layout
                                key={color}
                                style={{ backgroundColor: color }}
                                className='h-6 w-6 overflow-hidden rounded-full border border-black px-2 text-black transition-all'
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
            <div className='col-span-3 flex flex-col gap-8 pb-32 text-white'>
                <div className="flex flex-wrap gap-2 h-fit">
                    {selectedCategories.map(category =>
                        <motion.div onClick={flipFlop(category)} layoutId={'browser-filters-' + category} key={category} className='w-fit rounded-full border border-black bg-white text-black px-2'>
                            {category}
                        </motion.div>
                    )}
                </div>
                <motion.div layout className='grid h-max grid-flow-row grid-cols-3 gap-6'>
                    {!isLoading &&
                        products?.map(({ id, name, picture, price }) => (
                            <Link key={id} to={`/product/${id}`} className='h-full w-full'>
                                <motion.div
                                    layoutId={'product-detail-' + id + '-description'}
                                    className='flex flex-col bg-black'>
                                    <div className='relative'>
                                        <motion.div
                                            animate={{ x: 8, y: -8 }}
                                            whileHover={{ x: 12, y: -12 }}>
                                            <motion.img
                                                layoutId={'product-detail-' + id + '-img'}
                                                src={picture}
                                                alt={name}
                                                referrerPolicy='no-referrer'
                                                loading='lazy'
                                                className='aspect-square h-full w-full rounded-2xl border border-black bg-slate-200 object-cover'
                                            />
                                            <div className='absolute bottom-4 right-4 rounded-full bg-black px-2'>
                                                $ {price}
                                            </div>
                                        </motion.div>
                                    </div>
                                    <div className='p-4'>
                                        <p>{name}</p>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                </motion.div>
            </div>
        </Page>
    )
}

const parameters = new Array(21).fill('parameter')
