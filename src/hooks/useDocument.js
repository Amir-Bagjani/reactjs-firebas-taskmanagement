import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"

export const useDocument = (collection, id) => {
    const [error, setError] = useState(null)
    const [document, setDocument] = useState(null)

    //realtime data for document
    useEffect(() => {
        const ref = projectFirestore.collection(collection).doc(id)

        const unsub = ref.onSnapshot(snapshot => {
            if(snapshot.data()){
                setError(null)
                setDocument({...snapshot.data(), id:snapshot.id})
            }
            else{
                setError(`no such document existsx`)
            }
        }, err => {
            console.log(err.message)
            setError(`failed to get document`)
        })

        return () => unsub()

    },[id, collection])


    return { error, document }
}