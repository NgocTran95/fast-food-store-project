import { collection, DocumentData, FieldValue, onSnapshot, orderBy, query, Query, where, WhereFilterOp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Review } from "../features/single_product/services";
import { db } from "./config";

export interface condition {
    operator: WhereFilterOp;
    compareValue: string;
}



// export interface ReviewData extends Review {
//     createAt: FieldValue;
// }

// export const useFireStoreGetReviews = (condition : condition) => {
//     const [reviews, setReviews] = useState<ReviewData[]>([])
//     useEffect(() => {
//         if (!condition.compareValue.length) {
//             return
//         }
//         const collectionRef: Query<DocumentData> = query(
//             collection(db, 'reviews'),
//             where('uid', condition.operator, condition.compareValue),
//             orderBy('createAt', 'asc'),
//         )
//         const unscribed = onSnapshot(collectionRef, (snapshot) => {
//             const documents : ReviewData[] = snapshot.docs.map((doc) => ({
//                 uid: doc.data().uid,
//                 name: doc.data().name,
//                 email: doc.data().email,
//                 comment: doc.data().comment,
//                 rating: doc.data().rating,
//                 createAt: doc.data().createAt
//             }))
//             setReviews(documents)
//         })
//         return (() => {
//             unscribed()
//         })
//     }, [condition])
//     return reviews
// }