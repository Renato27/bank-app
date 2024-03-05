<?php

namespace App\Repositories;

use App\Enums\TransactionStatusEnum;
use App\Enums\TransactionTypeEnum;
use App\Http\Requests\TransactionsFilterRequest;
use App\Models\TransactionType;
use App\Repositories\Contracts\TransactionRespositoryInterface;
use App\Traits\BaseEloquentRepositoryTrait;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\Facades\JWTAuth;

class TransactionRespositoryImplementation implements TransactionRespositoryInterface
{
    use BaseEloquentRepositoryTrait;

    public function createTransaction(array $data): Model
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $data['user_id'] = $user->id;
            $type = isset($data['type']) ? $data['type'] : '';
            $amount = $data['amount'];
            $credits = $this->getTransactionsByTypeAndUser($user->id, 'credit')->sum('amount');
            $debits = $this->getTransactionsByTypeAndUser($user->id, 'debit')->sum('amount');

            $currentBalance = $credits - $debits;

            if ($type == 'debit' && $currentBalance < $amount) throw new HttpException(400, 'Insufficient funds');

            $transaction = $this->create($data);

            $this->associateTransactionType($transaction, $data);

            if ($type == 'debit') {
                $transaction->status = TransactionStatusEnum::from('accepted')->value;
                $transaction->save();
            }

            return $transaction;
        } catch (\Throwable $th) {
            throw new HttpException(400, $th->getMessage());
        }
    }

    private function associateTransactionType(Model $transaction, array $data): void
    {
        $transaction->transactionType()->associate(\App\Models\TransactionType::where('name', $data['type'])->first());
        $transaction->save();
    }

    public function getTransactions(TransactionsFilterRequest $request = null): LengthAwarePaginator
    {
        if ($request) {
            return $this->where($request->getSearchCallback())->paginate(10);
        }
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

    public function getTransactionsByUser(int $userId): ?LengthAwarePaginator
    {
        return $this->where(['user_id' => $userId])->paginate(10);
    }

    public function getTransactionsByUserAndStatus(int $userId, string $status): ?LengthAwarePaginator
    {
        return $this->where(['user_id' => $userId, 'status' => $status])->paginate(10);
    }

    public function getTransactionsByTypeAndUser(int $userId, string $type): ?LengthAwarePaginator
    {
        $transactionType = TransactionType::where('name', $type)->first();
        $status = TransactionStatusEnum::from('accepted')->value;
        return $transactionType->transactions()->where(['user_id' => $userId, 'status' => $status])->paginate(10);
    }

    public function getTransactionsByStatus(string $status): ?LengthAwarePaginator
    {
        return $this->where(['status' => $status])->paginate(10);
    }
}
