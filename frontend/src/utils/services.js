export const baseUrl= "http://localhost:3000/api" 

export const postRequest= async(url , body ) => {
    console.log(url);

    console.log("body ? ",body);
    const response = await fetch(url, {
        method : "POST" ,
        headers: {
            "content-type" : "application/json" 
        },
        body:body
    })
    const data = await response.json(); 
    if(!response.ok){
        let message 
        if(data?.message){
            message = data.message; 

        }else {
            // custom messages
            message= data ;
            
        }
        return {error:true , message}
    }


    return data 

}