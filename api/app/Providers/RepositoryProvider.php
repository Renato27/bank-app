<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(\App\Repositories\Contracts\TransactionRespositoryInterface::class, function($app){
            return new \App\Repositories\TransactionRespositoryImplementation(new \App\Models\Transaction());
        });

        $this->app->singleton(\App\Repositories\Contracts\UserRepositoryInterface::class, function($app){
            return new \App\Repositories\UserRepositoryImplementation(new \App\Models\User());
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
