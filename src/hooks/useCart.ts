import { useLocalStorage } from "usehooks-ts"
import { Product } from "../firebase/Products"

type Cart = {
    [id: string]: CartItem
}
type CartItem = {
    product: Product, amount: number
}

export default () => {
    const [cart, setCart] = useLocalStorage<Cart>('cart', {})
    function addProduct(product: Product) {
        // if (cart[product.id] === undefined) {
        //     setCart(prev => ({ ...prev, [product.id]: { amount: 1, product } }))
        // } else {

        // }
        setCart(prev => ({ ...prev, [product.id]: { amount: (cart[product.id]?.amount ?? 0) + 1, product } }))
    }
    function removeProduct(id: string) {
        delete cart[id]
    }
    function readCart(cart: Cart): [Product, number][] {
        return Object.entries(cart).map(([id, { product, amount }]) => ([product, amount]))
    }
    return [readCart(cart), addProduct, removeProduct] as const
}