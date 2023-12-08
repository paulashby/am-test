import client from "../../sanity.client";

export default async function setSelectItem(menuName, itemName) {
    client
    .patch("fc7904fb-8645-4873-8fd4-f50280b85a47")
    .setIfMissing({menuName: []})
    .append(menuName, [{name: itemName, isQuarantined: true}])
    .commit({autoGenerateArrayKeys: true})
}