import Products from '../firebase/Products'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'

export default () => {
    const response = useCollectionDataOnce(Products)
    return response
}
