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

    public static function getValues(): array {
        return array_map(fn($case) => $case->value, self::cases());
    }
}