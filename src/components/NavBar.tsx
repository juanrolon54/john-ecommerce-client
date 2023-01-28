import { Link, useLocation } from 'react-router-dom'
import useToggle from 'usehooks-ts/dist/esm/useToggle/useToggle'
import { motion } from 'framer-motion'
import Brand from './Brand'

export default () => {
    const loc = useLocation()
    const [visible, toggle] = useToggle(false)
    const fromBrowser =
        loc.pathname.split('/').filter((s) => s.length > 0).length > 0
            ? 'left'
            : 'right'

    return (
        <div className='absolute top-0 left-0 right-0 z-50 flex h-12 items-center gap-4 bg-black px-4  text-white'>
            <Link to='/' state={{ dir: 'left' }}>
                <Brand className='rounded-full bg-white px-4 text-black' />
            </Link>
            <div className='group relative hover:z-10'>
                <Link to='/browser' state={{ dir: fromBrowser }}>
                    Products
                </Link>
                {/* <div className='border-b border-b-white absolute p-2 -translate-x-2 pr-16 -translate-y-[100%] -z-10 group-hover:translate-y-0 grid transition-transform hover:scale-100 bg-black gap-2 rounded-lg'>
                {['cap', 'lenses', 'tshirts', 'shorts', 'footwear'].map(type => <Link to="/browser" state={{ dir: loc.pathname.split('/').filter(s => s.length > 0).length > 0 ? 'left' : 'right' }} key={type}>
                    {type}
                </Link>)}
            </div> */}
            </div>
            <div className='flex-1' />
            <button onClick={toggle}>Cart</button>
            {visible && (
                <motion.div
                    layoutId={'product-detail-' + 1 + '-img'}
                    initial={{ x: window.innerWidth }}
                    animate={{ x: 0 }}
                    className='fixed top-16 right-8 aspect-square rounded-xl border border-black bg-black p-16'
                ></motion.div>
            )}
            <div>Login</div>
            <div className='rounded-full bg-white px-2 text-black'>SignUp</div>
        </div>
    )
}
