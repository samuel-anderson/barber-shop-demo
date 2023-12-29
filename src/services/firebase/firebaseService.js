import {
  fetchCollection,
  addDocument,
  deleteDocument,
  updateDocument,
  fetchDocument,
  fecthStorage,
} from "../../util/firebase";

export const getStorage = async (professionalIds) => {
  const ids = professionalIds.payload.map((obj) => obj.id);

  const items = await fecthStorage(ids);
  return items;
};
export const getCollection = async (collectionName) => {
  const items = await fetchCollection(collectionName);
  return items;
};

export const getDocument = async (documentName) => {
  const document = await fetchDocument(documentName);
  return document;
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
