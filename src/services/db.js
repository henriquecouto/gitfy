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

const onSnapshot = (snapshot, next) => {
  const result = snapshot.docs.map(v => ({ id: v.id, ...v.data() }));
  return next(result);
};

export const loadProjects = (callback, { limit }) => {
  const unsubscribe = db
    .collection("projects")
    .where("user", "==", "1")
    .limit(limit)
    .orderBy("registrationDate", "desc")
    .onSnapshot(snapshot => onSnapshot(snapshot, callback));
  return unsubscribe;
};

export const loadCommits = (callback, { projectId, branchId, limit }) => {
  if (projectId && branchId) {
    const unsubscribe = db
      .collection("commits")
      .where("projectId", "==", projectId)
      .where("branchId", "==", branchId)
      .limit(limit)
      .orderBy("registrationDate", "desc")
      .onSnapshot(snapshot => onSnapshot(snapshot, callback));
    return unsubscribe;
  } else {
    const unsubscribe = db
      .collection("commits")
      .limit(limit)
      .orderBy("registrationDate", "desc")
      .onSnapshot(snapshot => onSnapshot(snapshot, callback));
    return unsubscribe;
  }
};

export const loadBranchs = (callback, { projectId }) => {
  const unsubscribe = db
    .collection("branchs")
    .where("projectId", "==", projectId)
    .onSnapshot(snapshot => onSnapshot(snapshot, callback));
  return unsubscribe;
};
