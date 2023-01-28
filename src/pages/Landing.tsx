import { Page } from '../components'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import type { HTMLAttributes, DetailedHTMLProps } from 'react'

export default () => {
    return <Page className="grid gap-8">
        <div className="grid grid-cols-2 grid-rows-3 gap-2 h-[75vh]">
            <Link to='/browser' state={{ dir: "right" }} className="p-4 border border-black col-span-2 row-span-2 bg-white text-8xl tracking-widest font-semibold">amazing</Link>
            <div className="p-4 bg-black rounded-lg">Cta1</div>
            <div className="p-4 bg-black rounded-lg">Cta2</div>
        </div>
        <div className="grid grid-cols-5 gap-2 text-white">
            <div className="bg-black rounded-lg p-4 aspect-square">titulo</div>
        </div>
    </Page>
}