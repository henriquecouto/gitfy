import { db } from "./firebase";

export const loadData = (callback, filters = { limit: 20 }) => {
  const unsubscribe = db
    .collection("projects")
    .where("user", "==", "1")
    .limit(filters.limit)
    .orderBy("registrationDate", "desc")
    .onSnapshot(snapshot => {
      const result = snapshot.docs.map(v => ({ id: v.id, ...v.data() }));
      callback(result);
    });
  return unsubscribe;
};
