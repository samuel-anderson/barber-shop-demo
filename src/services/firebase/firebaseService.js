import {
  fetchCollection,
  addDocument,
  deleteDocument,
  updateDocument,
  fecthStorage,
} from "../../util/firebase";

export const getStorage = async (professionalIds) => {
  const ids = professionalIds.payload.map((obj) => obj.id);

  const items = await fecthStorage(ids);
  return items;
};
export const getCollection = async (collectionName, documentName) => {
  const items = await fetchCollection(collectionName, documentName);
  return items;
};

export const createDocument = async (collectionName, document) => {
  await addDocument(collectionName, document);
};

export const updateDoc = async (
  collectionName,
  documentId,
  updatedDocument
) => {
  await updateDocument(collectionName, documentId, updatedDocument);
};

export const removeDocument = async (collectionName, id) => {
  await deleteDocument(collectionName, id);
};
