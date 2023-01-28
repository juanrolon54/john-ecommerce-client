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
            className='relative grid grid-cols-4 gap-8 select-none'
            scrollRestoring={!isLoading}>
            <div className='sticky top-2 flex h-fit flex-col gap-4'>
                <SearchBar className='border border-black ' />
                <div className='grid grid-cols-4 gap-2'>
                    {['A', 'B', 'C', 'D'].map(item => <div className='rounded-2xl bg-white border border-black aspect-square'></div>)}
                </div>
                <motion.div layout className='flex h-fit flex-col gap-2 border border-black bg-black text-white'>
                    <div className='flex translate-x-2 -translate-y-2 flex-wrap gap-2 justify-end'>
                        {assets.categories.sort((a, b) => a.length - b.length).filter((cat) => !selectedCategories.includes(cat)).map((category) => (
                            <motion.button onClick={flipFlop(category)} layoutId={'browser-filters-' + category} key={category} className='z-40 w-fit rounded-full border border-black bg-white text-black px-2'>
                                {category}
                            </motion.button>
                        ))}
                    </div>
                    <motion.div layout initial={{ x: 8, y: -8 }} className='flex flex-wrap justify-evenly gap-2 rounded-2xl border border-black bg-white p-2'>
                        {assets.colors.filter((color) => !selectedCategories.includes(color)).map((color) => (
                            <motion.div
                                onClick={flipFlop(color)}
                                layoutId={'browser-filters-' + color}
                                key={color}
                                style={{ backgroundColor: color }}
                                className='h-6 w-6 overflow-hidden rounded-full border border-black px-2 text-black'
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </div>
            <div className='col-span-3 flex flex-col pb-32 text-white'>
                <div className="flex flex-wrap gap-2 h-fit mb-8 empty:mb-0">
                    {selectedCategories.length > 0 && <button onClick={() => setSelectedCategories([])} className='text-black font-semibold'>clear</button>}
                    {selectedCategories.map(category =>
                        assets.colors.includes(category) ?
                            <motion.div
                                onClick={flipFlop(category)}
                                layoutId={'browser-filters-' + category}
                                key={category}
                                style={{ backgroundColor: category }}
                                className='h-6 w-6 overflow-hidden rounded-full border border-black px-2 text-black'
                            />
                            :
                            <motion.button onClick={flipFlop(category)} layoutId={'browser-filters-' + category} key={category}
                                className='z-40 w-fit rounded-full border border-black bg-white text-black px-2'>
                                {category}
                            </motion.button>
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
