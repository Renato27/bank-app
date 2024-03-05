<?php

namespace Database\Seeders;

use App\Enums\TransactionTypeEnum;
use Illuminate\Database\Seeder;

class TransactionTypeSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $transactionType = new \App\Models\TransactionType();
        $transactionType->name = TransactionTypeEnum::CREDIT;
        $transactionType->save();

        $transactionType = new \App\Models\TransactionType();
        $transactionType->name = TransactionTypeEnum::DEBIT;
        $transactionType->save();
    }
}
