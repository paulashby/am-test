"use client";
import React, { useState } from "react";
import { useSearchParams } from 'next/navigation';

import { postReq } from "@/app/api/requests";

export default function UTM() {
    const searchParams = useSearchParams();
    const mode = searchParams?.get("mode");
    const [active, setActive] = useState(mode ? true : false);
    const [activeTab, setActiveTab] = useState(mode && mode === "business" ? "business" : "retail");
    const [showSuccess, setShowSuccess] = useState(false);
    const formSlugs = searchParams?.getAll("fm");
    const campaign = searchParams?.get("cn");

    const data = {
        name: `formSubmission_${new Date().toISOString()}`, 
        form: {
            _ref: "11bec16d-d255-4818-ba37-4c6d66f045f7",
            _type: "reference"
        },
        utm_source: {
            _ref: "73812ea5-796a-4568-9dd7-4f78db622802",
            _type: "reference"
        }
    }

    async function handleClick() {        
        await postReq("utm", data)
        .then (() => {
            setShowSuccess(true);
        });        
    }
    
    return (
        <>
        {showSuccess && <p>Success</p>}
        <button onClick={handleClick} style={{padding: "0.5rem 1rem", margin: 20, "background": "#0f9333", color: "#fff", "borderRadius": "20px"}}>Add UTM record</button>
        </>
    );
}