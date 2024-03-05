<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionResource;
use App\Repositories\Contracts\TransactionRespositoryInterface;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $transactions = app(TransactionRespositoryInterface::class)->getTransactions();
            return TransactionResource::collection($transactions);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->all();
            $transaction = app(TransactionRespositoryInterface::class)->createTransaction($data);
            return new TransactionResource($transaction);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
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
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function showByUser(string $userId)
    {
        try {
            $transactions = app(TransactionRespositoryInterface::class)->getTransactionsByUser($userId);
            return TransactionResource::collection($transactions);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function showByUserAndStatus(string $userId, string $status)
    {
        try {
            $transactions = app(TransactionRespositoryInterface::class)->getTransactionsByUserAndStatus($userId, $status);
            return TransactionResource::collection($transactions);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
