export type DataType = {
    id?: number;
    user?: string;
    amount: number;
    date?: string;
    description: string;
    type: BalanceType;
    image?: string;
    status?: string;
}

export type BalanceType = 'credit' | 'debit';
   