<?php

namespace Database\Seeders;

use App\Enums\BalanceTypeEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BalanceTypeSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $balanceType = new \App\Models\BalanceType();
        $balanceType->name = BalanceTypeEnum::CREDIT;
        $balanceType->save();

        $balanceType = new \App\Models\BalanceType();
        $balanceType->name = BalanceTypeEnum::DEBIT;
        $balanceType->save();
    }
}
