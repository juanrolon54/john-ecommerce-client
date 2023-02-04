import { useLocalStorage } from "usehooks-ts"
import { Product } from "../firebase/Products"
import { useState } from 'react'
import { useContext } from "../context"

type Cart = {
    [id: string]: CartItem
}
type CartItem = {
    product: Product, amount: number
}

export default () => {
    // const [localCart, setLocalCart] = useLocalStorage<Cart>('cart', {})
    // const [cart, setCart] = useState<Cart>(localCart || {})
    // useEffect(() => {
    //     setLocalCart(cart)
    // }, [cart])
    const [cart, setCart] = useLocalStorage<Cart>('cart', {})
    const { cartLayoutId: layoutId, setCartLayoutId: setLayoutId } = useContext()

    function addProduct(product: Product) {
        setCart(prev => ({ ...prev, [product.id]: { amount: (cart[product.id]?.amount ?? 0) + 1, product } }))
        setLayoutId(product.id + '-' + cart[product.id]?.amount)
    }
    function removeProduct(id: string | 'all') {
        if (id !== 'all') {
            setCart(prev => {
                if (prev[id] && prev[id].amount > 1) {
                    prev[id].amount -= 1
                    return prev
                }
                delete prev[id]
                return prev
            })
            return
        }
        setCart({})
    }
    function readCart(cart: Cart): [Product, number][] {
        if (Object.keys(cart).length === 0) { return [] }
        return Object.entries(cart).map(([id, { product, amount }]) => ([product, amount]))
    }
    function createLayoutId(id: string) {
        return String(id + '-' + cart[id]?.amount)
    }
    function getTotalCartValue(cart: Cart): string {
        return (Math.round(readCart(cart).reduce((p, c) => p + c[1] * c[0].price, 0) * 100) / 100).toFixed(2)
    }

    function getItemValue(id: string): string {
        if (cart[id] === undefined) return '0.00'
        let { product, amount } = cart[id]
        return (Math.round(product.price * amount * 100) / 100).toFixed(2)

    }
    return [readCart(cart), addProduct, removeProduct, { rawCart: cart, layoutId, createLayoutId, totalCartValue: getTotalCartValue(cart), getItemValue }] as const
}