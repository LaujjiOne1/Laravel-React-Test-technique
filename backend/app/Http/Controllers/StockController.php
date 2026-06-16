<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StockController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 15);
        $stocks = Stock::with('product')->paginate($perPage);

        return response()->json($stocks);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantite' => 'required|integer|min:0',
            'emplacement' => 'required|string|max:255',
        ]);

        $stock = Stock::create($validated);
        $stock->load('product');

        return response()->json($stock, 201);
    }

    public function show(Stock $stock): JsonResponse
    {
        $stock->load('product');
        return response()->json($stock);
    }

    public function update(Request $request, Stock $stock): JsonResponse
    {
        $validated = $request->validate([
            'product_id' => 'sometimes|required|exists:products,id',
            'quantite' => 'sometimes|required|integer|min:0',
            'emplacement' => 'sometimes|required|string|max:255',
        ]);

        $stock->update($validated);
        $stock->load('product');

        return response()->json($stock);
    }

    public function destroy(Stock $stock): JsonResponse
    {
        $stock->delete();

        return response()->json([
            'message' => 'Stock deleted successfully',
        ], 200);
    }
}
