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
    const [cart, setCart] = useLocalStorage<Cart>('cart', {})
    const { layoutId, setLayoutId } = useContext()

    function addProduct(product: Product) {
        setCart(prev => ({ ...prev, [product.id]: { amount: (cart[product.id]?.amount ?? 0) + 1, product } }))
        setLayoutId(product.id + '-' + cart[product.id]?.amount)
    }
    function removeProduct(id: string) {
        delete cart[id]
    }
    function readCart(cart: Cart): [Product, number][] {
        if (Object.keys(cart).length === 0) { return [] }
        return Object.entries(cart).map(([id, { product, amount }]) => ([product, amount]))
    }
    function createLayoutId(id: string) {
        return String(id + '-' + cart[id]?.amount)
    }
    return [readCart(cart), addProduct, removeProduct, { rawCart: cart, layoutId, createLayoutId }] as const
}