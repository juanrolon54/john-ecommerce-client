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
}

type scrolls = {
    [pathname: string]: number
}

export const context = createContext<value | null>(null)

export function ContextProvider(props: { children: ReactNode }) {
    const [scrolls, setScrolls] = useState<scrolls>({})

    const [filters, setFilters] = useState<string>('{}')

    return (
        <context.Provider value={{ scrolls, setScrolls, filters, setFilters }}>
            {props.children}
        </context.Provider>
    )
}

export function useContext() {
    const values = useReactContext(context)
    return values as value
}
