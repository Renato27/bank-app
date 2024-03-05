<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransactionsFilterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'search' => 'nullable',
        ];
    }

    public function getSearchCallback()
    {
        return function($query){

            $terms = $this->only('search');

            foreach ($terms as  $value) {
                if ($value) {
                    $query->whereHas('transactionType', function ($q) use ($value) {
                        $q->where('name', 'LIKE', '%' . $value . '%');
                    })
                    ->orWhereHas('user', function ($q) use ($value) {
                        $q->where('username', 'LIKE', '%' . $value . '%');
                    })
                    ->orWhere('status', 'LIKE', '%' . $value . '%')
                    ->orWhere('description', 'LIKE', '%' . $value . '%')
                    ->orWhere('amount', 'LIKE', '%' . $value . '%');
                }
            }
        };
    }
}
