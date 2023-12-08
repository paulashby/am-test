import { createDocument } from "@/sanity/queries/forms/sanity.query.document";

export async function POST(request) {
    const body = await request.json();
    const { name, form, utm_source } = body; 
    const newSubmission = {
        name,
        form,
        utm_source
    }
    await createDocument("formSubmission", newSubmission);

    return new Response(JSON.stringify({ ok: true }));
}