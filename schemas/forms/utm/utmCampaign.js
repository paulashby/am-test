export default {
    name: "utm_campaign",
    title: "UTM Campaign",
    type: "document",
    fields: [
        { title: "Name", name: "name", type: "string" },
        { title: "Slug", name: "slug", type: "slug" },
        {
            title: 'Start date',
            name: 'startDate',
            type: 'date'
        },
        {
            title: 'End date',
            name: 'endDate',
            type: 'date'
        },
    ],
}
    