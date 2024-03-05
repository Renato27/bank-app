<?php

namespace App\Models;

use App\Enums\TransactionTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TransactionType extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
    ];

    public function getType(): TransactionTypeEnum
    {
        return TransactionTypeEnum::from($this->name);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
