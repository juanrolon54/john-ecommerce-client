import { Link, useLocation } from 'react-router-dom'
import useToggle from 'usehooks-ts/dist/esm/useToggle/useToggle'
import { motion } from 'framer-motion'
import Brand from './Brand'

export default () => {
    const loc = useLocation()
    const [visible, toggle] = useToggle(false)
    const fromBrowser = loc.pathname.split('/').filter(s => s.length > 0).length > 0 ? 'left' : 'right'

    return <div className='bg-black text-white absolute top-0 left-0 right-0 flex items-center h-12 gap-4 z-50 px-16'>
        <Link to='/' state={{ dir: 'left' }}><Brand className='rounded-full bg-white text-black px-4' /></Link>
        <div className='group relative hover:z-10'>
            <Link to='/browser' state={{ dir: fromBrowser }}>Products</Link>
            {/* <div className='border-b border-b-white absolute p-2 -translate-x-2 pr-16 -translate-y-[100%] -z-10 group-hover:translate-y-0 grid transition-transform hover:scale-100 bg-black gap-2 rounded-lg'>
                {['cap', 'lenses', 'tshirts', 'shorts', 'footwear'].map(type => <Link to="/browser" state={{ dir: loc.pathname.split('/').filter(s => s.length > 0).length > 0 ? 'left' : 'right' }} key={type}>
                    {type}
                </Link>)}
            </div> */}
        </div>
        <div className='flex-1' />
        <button onClick={toggle}>Cart</button>
        {visible && <motion.div layoutId={'product-detail-' + 1 + '-img'} initial={{ x: window.innerWidth }} animate={{ x: 0 }} className='border border-black bg-black fixed top-16 right-8 aspect-square p-16 rounded-xl'></motion.div>}
        <div>Login</div>
        <div className="bg-white px-2 rounded-full text-black">SignUp</div>
    </div>
}