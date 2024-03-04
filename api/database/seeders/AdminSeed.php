<?php

namespace Database\Seeders;

use App\Enums\UserTypeEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = new \App\Models\User();
        $user->username = 'admin';
        $user->password = 'admin123';
        $user->userType()->associate(\App\Models\UserType::where('name', UserTypeEnum::ADMIN)->first());
        $user->save();
    }
}
