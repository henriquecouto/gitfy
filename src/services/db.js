import { db } from "./firebase";

export const addData = async (collection, data) => {
  try {
    await db.collection(collection).add({
      ...data,
      user: "1",
      registrationDate: new Date()
    });
    return { status: true };
  } catch (error) {
    return { etatus: false, error };
  }
};

export const loadProjects = (callback, { limit }) => {
  const unsubscribe = db
    .collection("projects")
    .where("user", "==", "1")
    .limit(limit)
    .orderBy("registrationDate", "desc")
    .onSnapshot(snapshot => {
      const result = snapshot.docs.map(v => ({ id: v.id, ...v.data() }));
      callback(result);
    });
  return unsubscribe;
};

export const loadCommits = (callback, { projectId, branchId, limit }) => {
  const unsubscribe = db
    .collection("commits")
    .where("projectId", "==", projectId)
    .where("branchId", "==", branchId)
    .limit(limit)
    .orderBy("registrationDate", "desc")
    .onSnapshot(snapshot => {
      const result = snapshot.docs.map(v => ({ id: v.id, ...v.data() }));
      callback(result);
    });
  return unsubscribe;
};

export const loadBranchs = (callback, { projectId }) => {
  const unsubscribe = db
    .collection("branchs")
    .where("projectId", "==", projectId)
    .onSnapshot(snapshot => {
      const result = snapshot.docs.map(v => ({ id: v.id, ...v.data() }));
      callback(result);
    });
  return unsubscribe;
};
