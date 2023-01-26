import { DocumentReference, DocumentSnapshot, collection } from 'firebase/firestore'
import type { FirestoreDataConverter, WithFieldValue, DocumentData, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore'
import firebase from '.'

type Product = {
    id: string
    ref: DocumentReference
    abstract: string
    article: string
    categories: string[]
    name: string
    picture: string
    price: number
    quantity: number
    rating: number
    specification: {
        [key: string]: string
    }
    state: string
    reviews: any
}

const postConverter: FirestoreDataConverter<Product> = {
    toFirestore(post: WithFieldValue<Product>): DocumentData {
        return {
            abstract: post.abstract,
            article: post.article,
            categories: post.categories,
            name: post.name,
            picture: post.picture,
            price: post.price,
            quantity: post.quantity,
            rating: post.rating,
            specification: post.specification,
            state: post.state,
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Product {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            ref: snapshot.ref,
            abstract: data.abstract,
            article: data.article,
            categories: data.categories,
            name: data.name,
            picture: data.picture,
            price: data.price,
            quantity: data.quantity,
            rating: data.rating,
            specification: data.specification,
            state: data.state,
            reviews: data.reviews,
        };
    },
};

export default collection(firebase.store, 'products').withConverter(postConverter);
