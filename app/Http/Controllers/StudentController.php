<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudent;
use App\Http\Resources\ClubCollection;
use App\Http\Resources\StudentCollection;
use App\Http\Resources\StudentResource;
use App\Student;
use App\Club;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index()
    {
        return  new StudentCollection(Student::with('club')->get());
    }

    public function show($id)
    {
        $student = Student::with('club')->find($id);


        if (!$student) {
            return response()->json([
                'error' => 404,
                'message' => 'Not found'
            ], 404);
        }

        return new StudentResource($student);
    }

    public function store(StoreStudent $request)
    {

        $student = new Student();
        $student->fill($request->all());
        $student->save();

        return response()->json([
            'id' => $student->id,
            'created_at' => $student->created_at,
        ], 201);
    }

    public function update(StoreStudent $request, $id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json([
                'error' => 404,
                'message' => 'Not found'
            ], 404);
        }

        $student->update($request->all());

        return response()->json(null, 204);
    }

    public function destroy(Request $request, $id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json([
                'error' => 404,
                'message' => 'Not found'
            ], 404);
        }
        $student->delete();

        return response()->json(null, 204);
    }

    public function editStudent($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json([
                'error' => 404,
                'message' => 'Not found'
            ], 404);
        }

        return response()->json([
            'student' => new StudentResource($student),
            'clubs' => new ClubCollection(Club::all())
        ], 201);
    }
}
