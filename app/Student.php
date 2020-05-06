<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'name',
        'club_id',
    ];

    public function club()
    {
        return $this->belongsTo(Club::class);
    }
}
