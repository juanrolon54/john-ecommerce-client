import Brand from './Brand'
import { HTMLAttributes } from 'react'

export default (props: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div {...props} className={props.className + ' h-16 bg-black text-white'}>
            <Brand />
        </div>
    )
}
