"use client";
import React, { useState } from "react";
import { postReq } from "@/app/api/requests";

export default function PostgresTest() {

    const [formName, setFormName] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    

    async function handleSubmit(e) {   
        e.preventDefault();     
        await postReq("prog-add-form", formName)
        .then (() => {
            setSuccessMessage("Done");
        });        
    }
    
    return (
        <>
        <div>{successMessage}</div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="textField">Email</label>
                <input type="text" id="textField" style={{color: "#000"}} name="formName" value={formName} onChange={e => setFormName(e.target.value)} required />
            </div>
            <input type="submit" value="Add form" style={{padding: "0.5rem 1rem", margin: 20, "background": "#0f9333", color: "#fff", "borderRadius": "20px"}} onClick={handleSubmit} />
        </form>
        </>
    );
}