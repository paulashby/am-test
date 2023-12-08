export default {
    name: "form",
    title: "Form",
    type: "document",
    fields: [
        { title: "Name", name: "name", type: "string" },
        { title: "Slug", name: "slug", type: "slug" },
        {
            title: 'Campaign',
            name: 'utm_campaign',
            type: 'reference',
            to: [{type: 'utm_campaign'}]
        },
    ],
}
    