<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class Base64Validator implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $pattern = '/^data:image\/(jpeg|png|jpg|gif|svg\+xml);base64,/';
        if (preg_match($pattern, $value, $matches)) {
            $value = substr($value, strpos($value, ',') + 1);
        } else {
            $fail('The ' . $attribute . ' must be a valid image file.');
        }

        $imageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg'];
        $image = base64_decode($value);
        $f = finfo_open();
        $result = finfo_buffer($f, $image, FILEINFO_MIME_TYPE);
        if(!in_array($result, $imageTypes)){
            $fail('The ' . $attribute . ' must be a valid image file.');
        }
    }
}
