import { unsetArrayItem } from "@/sanity/queries/forms/sanity.query.ArrayItem";

export default async function handler(req, res) {
    
    const data = req.body;
    
    if (/^(?:[\- A-Za-z\d&]+)$/.test(data.name)) {
        const resp = await unsetArrayItem(data.name, "7dd1abef-65e6-4e3e-960a-10cd0e9b4779");
    } else {
        console.log("Invalid platform name");            
    }
    res.status(200).json({ message: "Bonjour" })

}
