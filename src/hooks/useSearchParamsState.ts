import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

type Return = [
    string,
    (key: string) => void
]

export default (key: string): Return => {
    const [currentSearchParams, setSearchParams] = useSearchParams()

    const updateSearchParams = (value: string) => {
        let newSearchParams = new URLSearchParams((window.location.href.match(/\?.*/) || [''])[0])
        newSearchParams.set(key, value)
        setSearchParams(newSearchParams)
    }

    // const updateSearchParams = (value: string) => {
    //     let newSearchParams = new URLSearchParams()
    //     newSearchParams.set(key, value)
    //     new URLSearchParams((window.location.href.match(/\?.*/) || [''])[0]).forEach((prevValue, prevKey) => prevKey !== key && newSearchParams.append(prevKey, prevValue))

    //     setSearchParams(newSearchParams)
    // }

    return [currentSearchParams.get(key) || '', updateSearchParams]
}