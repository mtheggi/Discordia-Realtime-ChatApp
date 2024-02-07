// export const baseUrl = "http://localhost:8080/api"
export const baseUrl = "https://discordia-realtime-chat-app.vercel.app/api";
export const postRequest = async (url, body) => {
    console.log(url);

    console.log("body ? ", body);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: body
    })
    const data = await response.json();
    if (!response.ok) {
        let message
        if (data?.message) {
            message = data.message;

        } else {
            message = data;
        }
        return { error: true, message }
    }
    return data

}
export const getRequest = async (url) => {

    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
        let message;
        if (data?.message) {
            message = data.message;
        } else {
            /*message will be the entire data object parsed from the response body.
             This could be an error object provided by the server, or it could be undefined if the response body is empty.
            */
            message = data;

        }
        return { error: true, message }
    }

    return data;


}
