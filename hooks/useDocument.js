import { useState, useEffect } from "react";
import { db } from "../firebase/config";

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  // realtime document data
  useEffect(() => {
    const ref = db.collection(collection).doc(id);
    setIsPending(true);

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        // need to make sure the doc exists & has data
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setIsPending(false);
          setError(null);
        } else {
          setIsPending(false);
          setError("No such document exists");
        }
      },
      (err) => {
        console.log(err.message);
        setError("failed to get document");
      }
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [collection, id]);

  return { document, isPending, error };
};
