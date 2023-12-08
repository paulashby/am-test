export async function postReq(endpoint, data) {
    return await fetch(`/api/${endpoint}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "Application/json"
        }
    })
    .then((response) => {
        if (!response.ok) {
            console.error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
    });
}

export async function getReq(endpoint) {
    const response = await fetch(`/api/${endpoint}`);
    return await response.json();
}