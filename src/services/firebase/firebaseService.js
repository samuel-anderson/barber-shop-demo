import {
  fetchCollection,
  addDocument,
  deleteDocument,
  updateDocument,
  fecthStorage,
  fetchDocObject,
  updateProfessionalDocument,
  updateAppointmentDocument,
  filterAppointmentDocument,
} from "../../util/firebase";

export const getStorage = async (professionals) => {
  const ids = professionals.map((obj) => obj.id);

  const items = await fecthStorage(ids);
  return items;
};
export const getCollection = async (collectionName, documentName) => {
  const items = await fetchCollection(collectionName, documentName);
  return items;
};

export const getDocObject = async (
  collectionName,
  documentName,
  documentKey
) => {
  const items = await fetchDocObject(collectionName, documentName, documentKey);
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

export const updateProfessionalDoc = async (
  collectionName,
  documentId,
  updatedDocument
) => {
  await updateProfessionalDocument(collectionName, documentId, updatedDocument);
};

export const updateAppointmentDoc = async (
  collectionName,
  documentId,
  docFields
) => {
  await updateAppointmentDocument(collectionName, documentId, docFields);
};

export const filterAppointmentDoc = async (
  collectionName,
  documentId,
  docFields
) => {
  await filterAppointmentDocument(collectionName, documentId, docFields);
};
