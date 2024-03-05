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

export async function refreshToken() {
    try {
      const response = await axios.post(`${API_URL}/refresh`);
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      return access_token;
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      return null;
    }
  }