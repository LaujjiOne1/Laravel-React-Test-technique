<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Stock;
use Illuminate\Database\Seeder;

class StockSeeder extends Seeder
{
    public function run(): void
    {
        Stock::truncate();

        $products = Product::all();

        foreach ($products as $product) {
            Stock::create([
                'product_id' => $product->id,
                'quantite' => rand(5, 50),
                'emplacement' => 'Warehouse A - Shelf ' . rand(1, 10),
            ]);

            Stock::create([
                'product_id' => $product->id,
                'quantite' => rand(2, 30),
                'emplacement' => 'Warehouse B - Shelf ' . rand(1, 10),
            ]);

            if (rand(0, 1)) {
                Stock::create([
                    'product_id' => $product->id,
                    'quantite' => rand(1, 20),
                    'emplacement' => 'Store - Display ' . rand(1, 5),
                ]);
            }
        }
    }
}
