import { Page } from '../components'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import type { HTMLAttributes, DetailedHTMLProps } from 'react'

export default () => {
    return (
        <Page className='grid gap-8'>
            <div className='grid h-[75vh] grid-cols-2 grid-rows-3 gap-2'>
                <Link
                    to='/browser'
                    state={{ dir: 'right' }}
                    className='col-span-2 row-span-2 border border-black bg-white p-4 text-8xl font-semibold tracking-widest'
                >
                    amazing
                </Link>
                <div className='rounded-lg bg-black p-4'>Cta1</div>
                <div className='rounded-lg bg-black p-4'>Cta2</div>
            </div>
            <div className='grid grid-cols-5 gap-2 text-white'>
                <div className='aspect-square rounded-lg bg-black p-4'>titulo</div>
            </div>
        </Page>
    )
}
