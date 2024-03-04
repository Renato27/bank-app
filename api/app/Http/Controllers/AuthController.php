<?php

namespace App\Http\Controllers;

use App\Enums\UserTypeEnum;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');
        $token = JWTAuth::attempt($credentials);

        if (!$token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function register(Request $request)
    {
        $user = User::create([
            'username' => $request->username,
            'password' => bcrypt($request->password),
        ]);

        $user->userType()->associate(\App\Models\UserType::where('name', UserTypeEnum::CUSTOMER)->first());
        $user->save();

        $token = JWTAuth::fromUser($user);

        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60
        ]);
    }
}
