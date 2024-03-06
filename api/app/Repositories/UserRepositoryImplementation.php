<?php

namespace App\Repositories;

use App\Enums\UserTypeEnum;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Traits\BaseEloquentRepositoryTrait;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UserRepositoryImplementation implements UserRepositoryInterface
{
    use BaseEloquentRepositoryTrait;

    public function createUser(array $data): Model
    {
        try {

            $user = $this->where(['username' => $data['username']])->first();

            if($user) throw new HttpException(400, 'User already exists');

            $user = $this->create([
                'username' => $data['username'],
                'password' => bcrypt($data['password']),
            ]);
    
            $user->userType()->associate(\App\Models\UserType::where('name', UserTypeEnum::CUSTOMER)->first());
            $user->save();
    
            return $user;
        } catch (\Throwable $th) {
            throw new HttpException(400, $th->getMessage());
        }
       
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
