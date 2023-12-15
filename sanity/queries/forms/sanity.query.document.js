import client from "../../sanity.client";

export async function createDocument(_type, item) {
    console.log("createDocument");
    return client.transaction()
    .create({
        _type,
        _id: `${_type}.`,
        ...item})
    .commit()
    .catch((error) => {
        console.log("ERROR: ", error);
    });
}