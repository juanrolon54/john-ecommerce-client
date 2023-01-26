import { doc } from 'firebase/firestore'
import Products from "../firebase/Products"
import { useDocumentDataOnce } from "react-firebase-hooks/firestore"

export default (id: string) => {
    const document = useDocumentDataOnce(doc(Products, id))
    return document
}
