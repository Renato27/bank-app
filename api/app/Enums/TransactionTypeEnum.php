<?php

namespace App\Enums;

enum TransactionTypeEnum: string {
    case CREDIT = 'credit';
    case DEBIT = 'debit';

    public function getLabel(): string {
        return match ($this) {
            self::CREDIT => 'Credit',
            self::DEBIT => 'Debit',
        };
    }
}