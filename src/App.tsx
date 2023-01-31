import { cloneElement } from 'react'
import { Landing, NotFound, Browser, Product, Checkout } from './pages'
import { NavBar } from './components'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useRoutes } from 'react-router-dom'

function App() {
  const routes = useRoutes([
    { path: '/', element: <Landing /> },
    { path: '/browser', element: <Browser /> },
    { path: '/product/:id', element: <Product /> },
    { path: '/checkout', element: <Checkout /> },
    { path: '*', element: <NotFound /> },
  ])
  const location = useLocation()
  if (!routes) return null

  return (
    <div className='relative h-screen w-screen overflow-hidden bg-slate-100 font-light'>
      <NavBar />
      <div className='absolute inset-0 top-12 flex overflow-hidden'>
        <AnimatePresence initial={false}>
          {cloneElement(routes, { key: location.pathname })}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
