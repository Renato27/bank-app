<?php

namespace App\Repositories\Contracts;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface TransactionRespositoryInterface
{
    public function createTransaction(array $data): Model;

    public function getTransactions(): Collection;

    public function getTransaction(int $id): ?Model;

    public function updateTransaction(int $id, array $data): ?Model;

    public function deleteTransaction(int $id): bool;

    public function getTransactionsByUser(int $userId): ?Collection;

    public function getTransactionsByUserAndStatus(int $userId, string $status): ?Collection;

    public function getTransactionsByStatus(string $status): ?Collection;
}
