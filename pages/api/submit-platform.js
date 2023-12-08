import { setArrayItem } from "@/sanity/queries/forms/sanity.query.ArrayItem";

export default async function handler(req, res) {
    
    const data = req.body;
    
    if (/^(?:[\- A-Za-z\d&]+)$/.test(data.name)) {
        if (data.isNew) {
            // Add platform to data source
            // setSelectItem("Platform", platform.name);
            const {isNew, ...platformSettings} = data;
            const platform = {
                userCount: 1,
                isQuarantined: true,
                ...platformSettings
            };
            const resp = await setArrayItem(platform, "7dd1abef-65e6-4e3e-960a-10cd0e9b4779");
            
        } else {
            // Increment user count for given platform
            console.log("Increment user count for given platform");
        }
    } else {
        // Can we send an email or write to a log
        console.error("Invalid platform name");            
    }
    // res.status(200).json({ id });
}
