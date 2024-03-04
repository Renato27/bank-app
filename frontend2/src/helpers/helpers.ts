import { DataType } from "../pages/types/balance-type";

export const mockData = (qtd: number, type?: string) => {
    const data: DataType[] = [];
    for (let i = 0; i < qtd; i++) {
        data.push({
            id: i,
            value: i * 1000,
            date: new Date().toDateString(),
            description: `Description ${i}`,
            type: type ?? i % 2 === 0 ? 'credit' : 'debit'
        });
    }
    return data;
}