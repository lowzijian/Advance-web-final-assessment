<?php

namespace App\Http\Controllers;

use App\Club;
use App\Http\Requests\StoreClub;
use App\Http\Resources\ClubCollection;
use App\Http\Resources\ClubResource;
use Illuminate\Http\Request;

class ClubController extends Controller
{
    public function index()
    {
        return  new ClubCollection(Club::all());
    }

    public function show($id)
    {
        $club = Club::with('students')->find($id);


        if (!$club) {
            return response()->json([
                'error' => 404,
                'message' => 'Not found'
            ], 404);
        }

        return new ClubResource($club);
    }

    public function store(StoreClub $request)
    {

        $club = new Club();
        $club->fill($request->all());
        $club->save();

        return response()->json([
            'id' => $club->id,
            'created_at' => $club->created_at,
        ], 201);
    }

    public function update(StoreClub $request, $id)
    {
        $club = Club::find($id);

        if (!$club) {
            return response()->json([
                'error' => 404,
                'message' => 'Not found'
            ], 404);
        }

        $club->update($request->all());

        return response()->json(null, 204);
    }

    public function destroy(Request $request, $id)
    {
        $club = Club::find($id);

        if (!$club) {
            return response()->json([
                'error' => 404,
                'message' => 'Not found'
            ], 404);
        }
        $club->delete();

        return response()->json(null, 204);
    }
}
