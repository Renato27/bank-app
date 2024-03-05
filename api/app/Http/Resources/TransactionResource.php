<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => $this->user->username ?? null,
            'amount' => $this->amount,
            'status' => $this->status,
            'type' => $this->transactionType->name ?? null,
            'image' => $this->image,
            'description' => $this->description,
            'date' => $this->created_at,
        ];
    }
}
