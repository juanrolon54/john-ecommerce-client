import { Link, useLocation } from 'react-router-dom'
import type { HTMLAttributes } from 'react'

export default () => {
    const loc = useLocation()

    return <div className='bg-black text-white absolute top-0 left-0 right-0 flex items-center h-12 gap-4 z-50 px-16'>
        <Link to='/' state={{ dir: 'left' }}>BRAND</Link>
        <div className='group relative hover:z-10'>
            <Link to='/browser' state={{ dir: loc.pathname.split('/').filter(s => s.length > 0).length > 0 ? 'left' : 'right' }}>Products</Link>
            {/* <div className='border-b border-b-white absolute p-2 -translate-x-2 pr-16 -translate-y-[100%] -z-10 group-hover:translate-y-0 grid transition-transform hover:scale-100 bg-black gap-2 rounded-lg'>
                {['cap', 'lenses', 'tshirts', 'shorts', 'footwear'].map(type => <Link to="/browser" state={{ dir: loc.pathname.split('/').filter(s => s.length > 0).length > 0 ? 'left' : 'right' }} key={type}>
                    {type}
                </Link>)}
            </div> */}
        </div>
        <Link to='/browser'><Search className='flex-1' /></Link>
        <div className='flex-1' />
        <div>Cart</div>
        <div>Login</div>
        <div className="bg-white px-2 rounded-full text-black">SignUp</div>
    </div>
}

const Search = (props: HTMLAttributes<HTMLFormElement>) => {

    return <form {...props}>
        <input type='text' className='bg-transparent w-full outline-none active:outline-none focus:ring-0 border-x-0 border-t-0 focus:border-b-white border-b-2 border-b-white h-6 p-0' placeholder="Search" />
    </form>
}