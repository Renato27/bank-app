<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionRequest;
use App\Http\Requests\TransactionsFilterRequest;
use App\Http\Resources\TransactionResource;
use App\Repositories\Contracts\TransactionRespositoryInterface;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(TransactionsFilterRequest $request)
    {
        try {
            $transactions = app(TransactionRespositoryInterface::class)->getTransactions($request);
            return TransactionResource::collection($transactions);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TransactionRequest $request)
    {
        try {
            $request->validated();
            $data = $request->all();
            $transaction = app(TransactionRespositoryInterface::class)->createTransaction($data);
            return new TransactionResource($transaction);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $transactions = app(TransactionRespositoryInterface::class)->getTransaction($id);
            return new TransactionResource($transactions);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
    
    public function showByUser(string $userId)
    {
        try {
            $transactions = app(TransactionRespositoryInterface::class)->getTransactionsByUser($userId);
            return TransactionResource::collection($transactions);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function showByUserAndStatus(string $userId, string $status)
    {
        try {
            $transactions = app(TransactionRespositoryInterface::class)->getTransactionsByUserAndStatus($userId, $status);
            return TransactionResource::collection($transactions);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $data = $request->all();
            $transaction = app(TransactionRespositoryInterface::class)->updateTransaction($id, $data);
            return new TransactionResource($transaction);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function debitTransactions(string $userId)
    {
        try {
            $transactions = app(TransactionRespositoryInterface::class)->getTransactionsByTypeAndUser($userId, 'debit');
            return TransactionResource::collection($transactions);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function creditTransactions(string $userId)
    {
        try {
            $transactions = app(TransactionRespositoryInterface::class)->getTransactionsByTypeAndUser($userId, 'credit');
            return TransactionResource::collection($transactions);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
