
const backend_url = "http://localhost:3000/userdata"

const api = {
    create : {  
        url : `${backend_url}/create`,
        method : "POST"
    },

    getall : {
        url : `${backend_url}/getall`,
        method : "GET"
    },

    update : {
        url : `${backend_url}/update`,
        method : "PUT"
    },

    delete : {
         url : `${backend_url}/delete`,
        method : "DELETE"
    },

    getone : {
         url : `${backend_url}/getone`,
        method : "GET"
    }
}

export default api;