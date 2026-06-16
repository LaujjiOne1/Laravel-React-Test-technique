<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::truncate();

        $products = [
            [
                'name' => 'Laptop Premium',
                'description' => 'High-performance laptop with 16GB RAM and 512GB SSD',
                'price' => 1299.99,
                'sku' => 'SKU-LAPTOP-001',
            ],
            [
                'name' => 'Wireless Mouse',
                'description' => 'Ergonomic wireless mouse with 2.4GHz connectivity',
                'price' => 29.99,
                'sku' => 'SKU-MOUSE-001',
            ],
            [
                'name' => 'USB-C Cable',
                'description' => 'High-speed USB-C 3.1 cable 2 meters',
                'price' => 15.99,
                'sku' => 'SKU-CABLE-001',
            ],
            [
                'name' => 'Monitor 27" 4K',
                'description' => '27-inch 4K Ultra HD display with HDR',
                'price' => 499.99,
                'sku' => 'SKU-MONITOR-001',
            ],
            [
                'name' => 'Keyboard Mechanical',
                'description' => 'RGB Mechanical keyboard with Cherry MX switches',
                'price' => 149.99,
                'sku' => 'SKU-KEYBOARD-001',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
