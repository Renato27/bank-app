<?php

namespace App\Repositories;

use App\Enums\UserTypeEnum;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Traits\BaseEloquentRepositoryTrait;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class UserRepositoryImplementation implements UserRepositoryInterface
{
    use BaseEloquentRepositoryTrait;

    public function createUser(array $data): Model
    {
        $user = $this->create([
            'username' => $data['username'],
            'password' => bcrypt($data['password']),
        ]);

        $user->userType()->associate(\App\Models\UserType::where('name', UserTypeEnum::CUSTOMER)->first());
        $user->save();

        return $user;
    }

    public function getUsers(): Collection
    {
        return $this->getAll();
    
    }

    public function getUser(int $id): ?Model
    {
        return $this->find($id);
    }

    public function updateUser(int $id, array $data): ?Model
    {
        return $this->update($id, $data);
    }

    public function deleteUser(int $id): bool
    {
        return $this->delete($id);
    }
}
{
}
{
}
