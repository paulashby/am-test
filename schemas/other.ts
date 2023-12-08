import { defineField } from "sanity";
import { BiUser } from "react-icons/bi";

const other = {
  name: "other",
  title: "Other",
  type: "document",
  icon: BiUser,
  fields: [
	defineField({
      name: "thing",
      title: "Thing",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    {
        name: "count",
        title: "Count",
        type: "number",
      }
    ]
};

export default other;