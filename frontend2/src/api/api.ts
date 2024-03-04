import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || '';

export async function balanceByUser(userId: number) {
    return await axios.get(`${API_URL}/balance/${userId}`).then(response => {
        return response.data;
    }).catch(error => {
        
    }).finally(() => {
        return 0;
    })
}


export async function transactionsByUser(userId: number) {
    return await axios.get(`${API_URL}/transactions/${userId}`).then(response => {
        return response.data;
    }).catch(error => {
        throw error;
    }).finally(() => {
        return 0;
    })
}

export async function debitTransactionsByUser(userId: number) {
    return await axios.get(`${API_URL}/debit-transactions/${userId}`).then(response => {
        return response.data;
    }).catch(error => {
        throw error;
    }).finally(() => {
        return 0;
    })
}

export async function creditTransactionsByUser(userId: number) {
    return await axios.get(`${API_URL}/credit-transactions/${userId}`).then(response => {
        return response.data;
    }).catch(error => {
        throw error;
    }).finally(() => {
        return 0;
    })
}