<?php

namespace App\Enums;

enum TransactionStatusEnum: string {
    case PENDING = 'pending';
    case ACCEPTED = 'accepted';
    case REJECTED = 'rejected';

    public function getLabel(): string {
        return match ($this) {
            self::PENDING => 'Pending',
            self::ACCEPTED => 'Accepted',
            self::REJECTED => 'Rejected',
        };
    }

    public static function getValues(): array {
        return array_map(fn($case) => $case->value, self::cases());
    }
    
}