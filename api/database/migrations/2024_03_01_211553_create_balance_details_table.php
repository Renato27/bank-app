<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('balance_details', function (Blueprint $table) {
            $table->id();
            $table->decimal('amount', 8, 2);
            $table->string('description')->nullable();
            $table->foreignId('balance_id')->constrained();
            $table->foreignId('balance_type_id')->constrained();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('balance_details');
    }
};
