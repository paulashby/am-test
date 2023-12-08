import client from "../../sanity.client";

export default async function removeDocumentByType(docType) {
    client
    .delete({ query: `*[_type == '${docType}']` })
    .then(console.log)
    .catch(console.error)
}