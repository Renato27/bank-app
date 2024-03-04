<?php

namespace App\Enums;

enum UserTypeEnum: string {
    case ADMIN = 'admin';
    case CUSTOMER = 'customer';

    public function getLabel(): string {
        return match ($this) {
            self::ADMIN => 'Admin',
            self::CUSTOMER => 'Customer',
        };
    }
}