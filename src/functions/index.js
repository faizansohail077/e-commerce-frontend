import axios from 'axios'

export const createOrUpdateUser = async (authtoken) => {
    return await axios({
        url: 'http://localhost:8000/api/auth/signup',
        method: 'POST',
        headers: {
            authtoken: authtoken
        }
    })
}

export const currentAdmin = async (authtoken) => {
    return await axios({
        method: 'POST',
        url: 'http://localhost:8000/api/auth/current-admin',
        headers: {
            authToken: authtoken
        }
    })
}


export const callUser = async (authtoken) => {
    return await axios({
        url: 'http://localhost:8000/api/auth/currentUser',
        method: 'POST',
        headers: {
            authtoken: authtoken
        }
    })
}