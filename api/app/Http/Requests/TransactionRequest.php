<?php

namespace App\Http\Requests;

use App\Enums\TransactionTypeEnum;
use App\Rules\Base64Validator;
use Illuminate\Foundation\Http\FormRequest;

class TransactionRequest extends FormRequest
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
        $rules = [
            'amount' => ['required', 'regex:/^\d+(\.\d{1,2})?$/'],
            'description' => 'required|string|max:255',
            'type' => 'required|in:'.implode(',', TransactionTypeEnum::getValues()),
        ];

        $type = $this->input('type');

        if ($type == 'credit'){
            $rules['image'] = ['required', new Base64Validator];
        }else{
            $rules['date'] = 'required|date';
        }

        return $rules;
    }
}
