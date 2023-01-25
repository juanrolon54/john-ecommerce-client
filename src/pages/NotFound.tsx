import { Page } from '../components'

import { Link } from 'react-router-dom'

export default () => {
    return <Page className="grid place-items-center" id="not_found">
        <div className='flex flex-col items-center'>
            The page you're looking for doesn't exist
            <Link to='/' state={{ dir: 'left' }} className='text-white bg-black rounded-full px-4'>Go back to LandingPage.</Link>
        </div>
    </Page>
}