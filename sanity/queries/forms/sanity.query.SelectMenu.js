import { groq } from "next-sanity";
import client from "../../sanity.client";

export default async function getSelectMenuOptions(menuName) {
    return client.fetch(
        groq`
            *[_type == 'selectMenu' && name == $menuName]
                {
                    selectItems[]->{
                        name,
                        isQuarantined
                    }
                }`,
        {menuName},
        {cache: 'no-store'}
    );
}