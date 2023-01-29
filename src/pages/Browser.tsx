import { useEffect } from 'react'
import { useState } from 'react'
import { Page, SearchBar } from '../components'
import { Link } from 'react-router-dom'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { useContext } from '../context'
import Products from '../firebase/Products'
import assets from '../assets/assets'

import { ImCoinDollar, ImSortAlphaAsc, ImSortAlphaDesc, ImSortAmountDesc, ImSortAmountAsc, ImSearch, ImCross } from 'react-icons/im'
import { FieldPath, orderBy, query, where } from 'firebase/firestore'

export default () => {
    const { filters: savedJSONFilters, setFilters: saveFilters } = useContext()
    const savedFilters = JSON.parse(savedJSONFilters)

    const [selectedCategories, setSelectedCategories] = useState<string[]>(savedFilters?.selectedCategories ?? [])
    function flipFlop(cat: string) {
        return () => {
            setSearchValue('')
            setSelectedCategories(prev => prev.includes(cat) ? [...prev].filter(p => p !== cat).slice(0, 10) : [cat, ...prev].slice(0, 10))
        }
    }

    const [selectedOrder, setSelectedOrder] = useState<string>(savedFilters?.selectedOrder ?? "price_asc")
    const icons: { [key: string]: JSX.Element } = {
        price_asc: <><ImSortAmountAsc /></>,
        price_desc: <><ImSortAmountDesc /></>,
        name_asc: <><ImSortAlphaAsc /></>,
        name_desc: <><ImSortAlphaDesc /></>,
    }

    const [searchValue, setSearchValue] = useState<string>(savedFilters?.searchValueTrimmed ?? '')
    const searchValueTrimmed = searchValue.trim().split(' ').map(word => word.length > 0 ? word[0].toUpperCase() + word.slice(1) : word).join('')

    let productsQuery =
        searchValue.trim() !== '' ?
            query(Products, where('name', '>=', searchValueTrimmed), where('name', '<=', searchValueTrimmed + '\uf8ff'))
            : selectedCategories.length > 0 ?
                query(Products,
                    where('categories', 'array-contains-any', selectedCategories),
                    orderBy(selectedOrder.split('_')[0], selectedOrder.split('_')[1] as 'asc' | 'desc'),
                )
                : query(Products,
                    orderBy(selectedOrder.split('_')[0], selectedOrder.split('_')[1] as 'asc' | 'desc')
                )

    const { data: products, isLoading } = useFirestoreQueryData(['products', JSON.stringify([...selectedCategories].sort()), selectedOrder, searchValueTrimmed], productsQuery, {}, { keepPreviousData: true })

    useEffect(() => {
        saveFilters(JSON.stringify({
            selectedCategories: [...selectedCategories].sort(),
            selectedOrder,
            searchValueTrimmed
        }))
    }, [selectedOrder, selectedCategories, searchValueTrimmed])

    return (
        <Page
            className='relative grid grid-cols-4 gap-8 select-none'
            scrollRestoring={!isLoading}>
            <div className='sticky top-2 flex h-fit flex-col gap-4'>
                <div className='relative flex items-center'>
                    <SearchBar className='border border-black ' value={searchValue} onChange={(e) => {
                        setSearchValue(e.target.value)
                        setSelectedCategories([])
                    }} />
                    <button className='z-50 absolute right-2'>{searchValueTrimmed !== '' ? <ImCross onClick={() => setSearchValue('')} /> : <ImSearch />}</button>
                </div>
                <div className='grid grid-cols-4 gap-2 bg-black rounded-2xl'>
                    {Object.entries(icons).map(([action, icon]) =>
                        <button onClick={() => setSelectedOrder(action)} key={action} className='rounded-2xl aspect-square relative text-white'>
                            <span className={` flex justify-center ${selectedOrder === action ? '-translate-y-2 translate-x-2 absolute inset-0 flex items-center transition-all' : ''}`}>{icon}</span>
                            {selectedOrder === action && <motion.div animate={{ x: 8, y: -8 }} layoutId='browser-order' className='mix-blend-difference absolute inset-0 bg-white rounded-2xl z-50 border border-black' />}
                        </button>
                    )}
                </div>
                <motion.div layout className='flex h-fit flex-col gap-2 border border-black bg-black text-white rounded-2xl'>
                    <div className='flex empty:hidden translate-x-2 -translate-y-2 flex-wrap gap-2 justify-end'>
                        {[...assets.categories].sort((a, b) => a.length - b.length).filter((cat) => !selectedCategories.includes(cat)).map((category) => (
                            <motion.button onClick={flipFlop(category)} layoutId={'browser-filters-' + category} key={category} className='z-40 w-fit rounded-full border border-black bg-white text-black px-2'>
                                {category}
                            </motion.button>
                        ))}
                    </div>
                    <motion.div layout initial={{ x: 8, y: -8 }} className='flex empty:hidden flex-wrap justify-evenly gap-2 rounded-2xl border border-black bg-white p-2'>
                        {assets.colors.filter((color) => !selectedCategories.includes(color)).map((color) => (
                            <motion.button
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
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <motion.div
                                        layoutId={'product-detail-' + id + '-description'}
                                        className='flex flex-col bg-black rounded-2xl'
                                    >
                                        <div className='relative'>
                                            <motion.div
                                                animate={{ x: 8, y: -8 }}
                                                whileHover={{ x: 12, y: -12 }}>
                                                <motion.img
                                                    layoutId={'product-detail-' + id + '-img'}
                                                    srcSet={picture + ', ' + 'https://via.placeholder.com/512/512'}
                                                    alt={name}
                                                    referrerPolicy='no-referrer'
                                                    loading='lazy'
                                                    className='aspect-square h-full w-full rounded-2xl border border-black bg-slate-200 object-cover'
                                                />
                                            </motion.div>
                                        </div>
                                        <div className='flex justify-between p-2 pl-4'>
                                            <div className=''>
                                                <p>{name}</p>
                                            </div>
                                            <div className='rounded-full bg-white text-black px-2 border border-black translate-x-4 font-semibold'>
                                                $ {price}
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </Link>
                        ))
                    }
                    {products?.length === 0 && <span className='bg-black text-white px-2 w-fit'>No results</span>}
                </motion.div>
            </div>
        </Page >
    )
}

const parameters = new Array(21).fill('parameter')
