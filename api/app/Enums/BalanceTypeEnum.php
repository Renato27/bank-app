<?php

namespace App\Enums;

enum BalanceTypeEnum: string {
    case CREDIT = 'credit';
    case DEBIT = 'debit';

    public function getLabel(): string {
        return match ($this) {
            self::CREDIT => 'Credit',
            self::DEBIT => 'Debit',
        };
    }
}