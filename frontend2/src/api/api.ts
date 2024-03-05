import axios from "axios";
import { createUrlWithUserId } from "../helpers/helpers";
import { DataType } from "../pages/types/balance-type";

const API_URL = process.env.REACT_APP_API_URL || '';

export async function checkList() {
    return await axios.get(`${API_URL}/transactions`).then(response => {
        return response.data.data;
    }).catch(error => {
        
    }).finally(() => {
        return 0;
    })
}

export async function checkById(id: string) {
    return await axios.get(`${API_URL}/transactions/${id}`).then(response => {
        return response.data.data;
    }).catch(error => {
        
    }).finally(() => {
        return 0;
    })
}

export async function checksByUser() {
    const url = createUrlWithUserId(`${API_URL}/transactions`);
    return await axios.get(url).then(response => {
        return response.data.data;
    }).catch(error => {
        
    }).finally(() => {
        return 0;
    })
}


export async function transactionsByUser() {
    const url = createUrlWithUserId(`${API_URL}/transactions-by-user`);
    return await axios.get(url).then(response => {
        return response.data.data;
    }).catch(error => {
        throw error;
    }).finally(() => {
        return 0;
    })
}

export async function transactionsByUserAndStatus(status: string) {
    const url = createUrlWithUserId(`${API_URL}/transactions-by-user`);
    return await axios.get(`${url}/${status}`).then(response => {
        return response.data.data;
    }).catch(error => {
        throw error;
    }).finally(() => {
        return 0;
    })
}

export async function debitTransactionsByUser() {
    const url = createUrlWithUserId(`${API_URL}/debit-transactions`);
    return await axios.get(url).then(response => {
        return response.data.data;
    }).catch(error => {
        throw error;
    }).finally(() => {
        return 0;
    })
}

export async function creditTransactionsByUser() {
    const url = createUrlWithUserId(`${API_URL}/credit-transactions`);
    return await axios.get(url).then(response => {
        return response.data.data;
    }).catch(error => {
        throw error;
    }).finally(() => {
        return 0;
    })
}

export async function updateTransaction(id: string, data?: unknown) {
    return await axios.put(`${API_URL}/transactions/${id}`, data).then(response => {
        return response.data.data;
    }).catch(error => {
        throw error;
    }).finally(() => {
        return 0;
    })
}

export async function createTransaction(data: DataType) {
    return await axios.post(`${API_URL}/transactions`, data).then(response => {
        return response.data.data;
    }).catch(error => {
        throw error;
    }).finally(() => {
        return 0;
    })
}