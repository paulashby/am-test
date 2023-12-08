export default {
    name: "formSubmission",
    title: "Form Submission",
    type: "document",
    fields: [
        { title: "Name", name: "name", type: "string" },
        {
            title: 'Submitted Form',
            name: 'form',
            type: 'reference',
            to: [{type: 'form'}]
        },
        {
            title: 'utm_source',
            name: 'utm_source',
            type: 'reference',
            to: [{type: 'utm_source'}]
        },
        { title: "utm_medium", name: "utm_medium", type: "string" },
        { title: "utm_content", name: "utm_content", type: "string" },
        { title: "utm_term", name: "utm_term", type: "string" },
    ],
}
