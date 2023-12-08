export default {
  name: "selectMenu",
  title: "Select Menu",
  type: "document",
  fields: [
    { title: "Name", name: "name", type: "string" },
    {
      title: "Select Items",
      name: "selectItems",

      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "selectItem" }],
        },
      ],
    },
  ],
}
