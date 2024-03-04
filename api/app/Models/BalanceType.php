<?php

namespace App\Models;

use App\Enums\BalanceTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BalanceType extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
    ];

    public function getType(): BalanceTypeEnum
    {
        return BalanceTypeEnum::from($this->name);
    }

    public function balances()
    {
        return $this->hasMany(Balance::class);
    }
}
