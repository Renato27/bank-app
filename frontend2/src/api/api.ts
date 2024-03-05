import axios from "axios";
import { createUrlWithUserId } from "../helpers/helpers";
import { DataType } from "../pages/types/balance-type";

const API_URL = process.env.REACT_APP_API_URL || '';

export async function checkList(page?: string, paramsUrl?: string) {
    const params = `?page=${page}&search=${paramsUrl}`
    return await axios.get(`${API_URL}/transactions${params}`).then(response => {
        return response.data.data;
    }).catch(error => {
        throw error;
    })
}

export async function checkById(id: string) {
    return await axios.get(`${API_URL}/transactions/${id}`).then(response => {
        return response.data.data;
    }).catch(error => {
        throw error;
    })
}

export async function checksByUser(page?: string, paramsUrl?: string) {
    const url = createUrlWithUserId(`${API_URL}/transactions`);
    const params = `?page=${page}&search=${paramsUrl}`
    return await axios.get(`${url}${params}`).then(response => {
        return response.data.data;
    }).catch(error => {
        throw error;
    })
}


export async function transactionsByUser(page?: string, paramsUrl?: string) {
    const url = createUrlWithUserId(`${API_URL}/transactions-by-user`);
    const params = `?page=${page}&search=${paramsUrl}`
    return await axios.get(`${url}${params}`).then(response => {
        return response.data.data;
    }).catch(error => {
        throw error;
    })
}

export async function transactionsByUserAndStatus(status: string, page?: string, paramsUrl?: string) {
    const url = createUrlWithUserId(`${API_URL}/transactions-by-user`);
    const params = `?page=${page}&search=${paramsUrl}`
    return await axios.get(`${url}/${status}${params}`).then(response => {
        return response.data.data;
    }).catch(error => {
        throw error;
    })
}

export async function debitTransactionsByUser(page?: string, paramsUrl?: string) {
    const url = createUrlWithUserId(`${API_URL}/debit-transactions`);
    const params = `?page=${page}&search=${paramsUrl}`
    return await axios.get(`${url}${params}`).then(response => {
        return response.data.data;
    }).catch(error => {
        throw error;
    })
}

export async function creditTransactionsByUser(page?: string, paramsUrl?: string) {
    const url = createUrlWithUserId(`${API_URL}/credit-transactions`);
    const params = `?page=${page}&search=${paramsUrl}`
    return await axios.get(`${url}${params}`).then(response => {
        return response.data.data;
    }).catch(error => {
        throw error;
    })
}

export async function updateTransaction(id: string, data?: object) {
    return await axios.put(`${API_URL}/transactions/${id}`, data).then(response => {
        return response.data.data;
    }).catch(error => {
        throw error;
    })
}

export async function createTransaction(data: DataType) {
    return await axios.post(`${API_URL}/transactions`, data).then(response => {
        return response.data.data;
    }).catch(error => {
        throw error;
    })
}