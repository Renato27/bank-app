<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('refresh', [AuthController::class, 'refresh']);

Route::middleware('jwt.verify')->group(function () {
    Route::apiResource('transactions', TransactionController::class);
    Route::get('debit-transactions/{userId}', [TransactionController::class, 'debitTransactions']);
    Route::get('credit-transactions/{userId}', [TransactionController::class, 'creditTransactions']);
    Route::get('transactions-by-user/{userId}', [TransactionController::class, 'showByUser']);
    Route::get('transactions-by-user/{userId}/{status}', [TransactionController::class, 'showByUserAndStatus']);
});
