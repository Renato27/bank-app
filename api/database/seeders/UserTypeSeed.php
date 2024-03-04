<?php

namespace Database\Seeders;

use App\Enums\UserTypeEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTypeSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userType = new \App\Models\UserType();
        $userType->name = UserTypeEnum::ADMIN;
        $userType->save();

        $userType = new \App\Models\UserType();
        $userType->name = UserTypeEnum::CUSTOMER;
        $userType->save();
    }
}
