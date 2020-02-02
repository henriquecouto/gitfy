import { db } from "./firebase";
import { getLoggedUser } from "./auth";

export const addData = async (collection, data) => {
  // return;
  try {
    const { uid } = getLoggedUser();
    await db.collection(collection).add({
      ...data,
      user: uid,
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
  const { uid } = getLoggedUser();
  const unsubscribe = db
    .collection("projects")
    .where("user", "==", uid)
    .limit(limit)
    .orderBy("registrationDate", "desc")
    .onSnapshot(snapshot => onSnapshot(snapshot, callback));
  return unsubscribe;
};

export const loadCommit = (callback, { commitId }) => {
  const unsubscribe = db
    .collection("commits")
    .doc(commitId)
    .onSnapshot(v => callback(v.data()));
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
    const { uid } = getLoggedUser();
    const unsubscribe = db
      .collection("commits")
      .where("user", "==", uid)
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

export const loadBranch = (callback, { branchId }) => {
  const unsubscribe = db
    .collection("branchs")
    .doc(branchId)
    .onSnapshot(v => callback(v.data()));
  return unsubscribe;
};

export const loadProject = (callback, { projectId }) => {
  const unsubscribe = db
    .collection("projects")
    .doc(projectId)
    .onSnapshot(v => callback(v.data()));
  return unsubscribe;
};
