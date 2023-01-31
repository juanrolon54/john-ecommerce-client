import {
    createContext,
    useEffect,
    useState,
    ReactNode,
    useContext as useReactContext,
    Dispatch,
    SetStateAction,
} from 'react'

type value = {
    scrolls: scrolls
    setScrolls: Dispatch<SetStateAction<scrolls>>
    filters: string
    setFilters: Dispatch<SetStateAction<string>>
    cartLayoutId: string
    setCartLayoutId: Dispatch<SetStateAction<string>>
    setCartVisibility: Dispatch<SetStateAction<boolean>>
    cartVisibility: boolean
}

type scrolls = {
    [pathname: string]: number
}

export const context = createContext<value | null>(null)

export function ContextProvider(props: { children: ReactNode }) {
    const [scrolls, setScrolls] = useState<scrolls>({})

    const [filters, setFilters] = useState<string>('{}')

    const [cartLayoutId, setCartLayoutId] = useState<string>('')

    const [cartVisibility, setCartVisibility] = useState<boolean>(false)

    return (
        <context.Provider value={{ scrolls, setScrolls, filters, setFilters, cartLayoutId, setCartLayoutId, cartVisibility, setCartVisibility }}>
            {props.children}
        </context.Provider>
    )
}

export function useContext() {
    const values = useReactContext(context)
    return values as value
}
