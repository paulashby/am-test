"use client";
import setSelectItem from "../../../sanity/queries/forms/sanity.query.SelectItem";
import removeDocumentByType from "../../../sanity/queries/forms/sanity.query.RemoveDocumentByType";

export default function TestButton() {
  return (
    <>
        <button onClick={e => removeDocumentByType("selectMenu")} style={{margin: 20}}>Remove Select Menu</button>
        <button onClick={e => removeDocumentByType("selectItem")} style={{margin: 20}}>Remove Select Items</button>
    </>
  );
}