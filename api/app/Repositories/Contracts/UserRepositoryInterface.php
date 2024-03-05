<?php

namespace App\Repositories\Contracts;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface UserRepositoryInterface
{
    public function createUser(array $data): Model;

    public function getUsers(): Collection;

    public function getUser(int $id): ?Model;

    public function updateUser(int $id, array $data): ?Model;

    public function deleteUser(int $id): bool;
}
