export type DataType = {
    id?: number;
    value: number;
    date?: string;
    description: string;
    type: BalanceType;
    image?: string;
}

export type BalanceType = 'credit' | 'debit';
   