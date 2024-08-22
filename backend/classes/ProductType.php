<?php
require_once 'Product.php';
require_once 'DVD.php';
require_once 'Book.php';
require_once 'Furniture.php';

class ProductType {
    public static function createProduct($type, $data) {
       // echo $type;
        $className = ucfirst(strtolower($type));
        if (class_exists($className)) {
            $constructorParams = [
                $data['sku'],
                $data['name'],
                $data['price']
            ];

            if ($type === 'DVD') {
                $constructorParams[] = $data['size'];
            } elseif ($type === 'Book') {
                $constructorParams[] = $data['weight'];
            } elseif ($type === 'Furniture') {
                $constructorParams = array_merge($constructorParams, [
                    $data['height'],
                    $data['width'],
                    $data['length']
                ]);
            }

            $product = new $className(...$constructorParams);
            return $product;
        }

        throw new Exception('Invalid product type');
    }
}
?>