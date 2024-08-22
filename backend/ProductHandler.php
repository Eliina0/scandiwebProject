<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With,Authorization,Content-Type');
header('Access-Control-Max-Age: 86400');

if (strtolower($_SERVER['REQUEST_METHOD']) == 'options') {
    exit();
}

require_once './classes/ProductType.php';
require_once './classes/ProductRepository.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    try {
        $products = ProductRepository::getProducts();
        echo json_encode(['success' => true, 'data' => $products]);
    } catch (Exception $e) {
        error_log($e->getMessage());
        echo json_encode(['success' => false, 'error' => 'An error occurred while retrieving products.']);
    }
    exit;
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['productType'])) {
        echo json_encode(['error' => 'Product type is required']);
        exit;
    }

    try {
        $product = ProductType::createProduct($data['productType'], $data);
        $product->save();
        echo json_encode(['success' => 'Product saved successfully']);
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
    exit;
}


if ($method === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['skus']) || !is_array($data['skus'])) {
        echo json_encode(['error' => 'Invalid data provided']);
        exit;
    }

    try {
        $deletedCount = ProductRepository::deleteProductsBySku($data['skus']);
        echo json_encode(['success' => true, 'deleted' => $deletedCount]);
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
    exit;
}
?>
