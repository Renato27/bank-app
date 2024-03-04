import axios from "axios";
import { AuthType } from "../components/auth/types/auth-type";

const API_URL = process.env.REACT_APP_API_URL || '';

export async function login(data: AuthType) {
    return await axios.post(`${API_URL}/login`, data).then(response => {
        return response.data;
    }).catch(error => {
        throw error;
    })
}

export async function signup(data: AuthType) {
    return await axios.post(`${API_URL}/register`, data).then(response => {
        return response.data;
    }).catch(error => {
        throw error;
    })
}