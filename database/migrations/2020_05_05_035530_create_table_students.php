<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateTableStudents extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('name', 255)->index();
            $table->unsignedInteger('club_id');
            $table->foreign('club_id')->references('id')->on('clubs');
            $table->timestamps();
        });

        DB::statement('ALTER TABLE students AUTO_INCREMENT = 1001');

        DB::table('students')->insert([
            ['name' => 'Aminah Haasan', 'club_id' => '4'],
            ['name' => 'Lee Chong Wai', 'club_id' => '1'],
            ['name' => 'Kavitha Kaur', 'club_id' => '1'],
            ['name' => 'Adam Sinclair', 'club_id' => '1'],
            ['name' => 'Lili Chua', 'club_id' => '3'],

        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
}
