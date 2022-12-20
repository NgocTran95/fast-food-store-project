import { collection, DocumentData, FieldValue, onSnapshot, orderBy, query, Query, where, WhereFilterOp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./config";

export interface condition {
    operator: WhereFilterOp;
    compareValue: string;
}

export interface userType {
    email: string,
    displayName: string,
    password?: string,
    uid: string,
    providerId: string | null,
    createAt: FieldValue,
}

export const useFireStoreGetUser = (condition : condition) => {
    const [users, setUsers] = useState<userType[]>([])
    useEffect(() => {
        if (!condition.compareValue.length) {
            return
        }
        const collectionRef: Query<DocumentData> = query(
            collection(db, 'users'),
            where('users', condition.operator, condition.compareValue),
            orderBy('createAt', 'asc'),
        )
        const unscribed = onSnapshot(collectionRef, (snapshot) => {
            const documents : userType[] = snapshot.docs.map((doc) => ({
                email: doc.data().email,
                displayName: doc.data().displayName,
                password: doc.data().password,
                uid: doc.data().uid,
                providerId: doc.data().providerId,
                createAt: doc.data().createAt
            }))
            setUsers(documents)
        })
        return (() => {
            unscribed()
        })
    }, [condition])
    return users
}