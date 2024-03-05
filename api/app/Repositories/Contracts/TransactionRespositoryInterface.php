<?php

namespace App\Repositories\Contracts;

use App\Http\Requests\TransactionsFilterRequest;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

interface TransactionRespositoryInterface
{
    public function createTransaction(array $data): Model;

    public function getTransactions(TransactionsFilterRequest $request = null): LengthAwarePaginator;

    public function getTransaction(int $id): ?Model;

    public function updateTransaction(int $id, array $data): ?Model;

    public function deleteTransaction(int $id): bool;

    public function getTransactionsByUser(int $userId): ?LengthAwarePaginator;

    public function getTransactionsByUserAndStatus(int $userId, string $status): ?LengthAwarePaginator;

    public function getTransactionsByStatus(string $status): ?LengthAwarePaginator;
}
