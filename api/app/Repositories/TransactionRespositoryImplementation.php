<?php

namespace App\Repositories;

use App\Enums\TransactionStatusEnum;
use App\Repositories\Contracts\TransactionRespositoryInterface;
use App\Traits\BaseEloquentRepositoryTrait;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Facades\JWTAuth;

class TransactionRespositoryImplementation implements TransactionRespositoryInterface
{
    use BaseEloquentRepositoryTrait;

    public function createTransaction(array $data): Model
    {
        $user = JWTAuth::parseToken()->authenticate();
        $data['user_id'] = $user->id;
        $transaction = $this->create($data);

        if(isset($data['type'])) {
            $this->associateTransactionType($transaction, $data);
        }

        return $transaction;
        
    }

    private function associateTransactionType(Model $transaction, array $data): void
    {
        $transaction->transactionType()->associate(\App\Models\TransactionType::where('name', $data['type'])->first());
        $transaction->save();
    }

    public function getTransactions(): Collection
    {
        return $this->getAll();
    
    }

    public function getTransaction(int $id): ?Model
    {
        return $this->find($id);
    }

    public function updateTransaction(int $id, array $data): ?Model
    {
        return $this->update($id, $data);
    }

    public function deleteTransaction(int $id): bool
    {
        return $this->delete($id);
    }

    public function getTransactionsByUser(int $userId): ?Collection
    {
        return $this->where(['user_id' => $userId])->get();
    }

    public function getTransactionsByUserAndStatus(int $userId, string $status): ?Collection
    {
        return $this->where(['user_id' => $userId, 'status' => $status])->get();
    }

    public function getTransactionsByTypeAndUser(int $userId, string $type): ?Collection
    {
        $transaction = $this->where(['user_id' => $userId])->first();
        return $transaction->transactionTypes()->where('name', $type)->get();
    }

    public function getTransactionsByStatus(string $status): ?Collection
    {
        return $this->where(['status' => $status])->get();
    }
}
