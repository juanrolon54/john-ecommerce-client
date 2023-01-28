import { HTMLAttributes } from 'react'
export default (props: HTMLAttributes<HTMLDivElement>) => (
    <div {...props}>
        <span className='font-black'>AI</span>
        <span className='font-light tracking-tighter'>marketplace</span>
    </div>
)
