<?php
require_once 'Database.php';

class ProductRepository {
    public static function getProducts() {
        $pdo = Database::getInstance()->getPdo();
        $stmt = $pdo->query('SELECT * FROM products');
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function deleteProductsBySku(array $skus) {
        $pdo = Database::getInstance()->getPdo();
        
        $placeholders = implode(',', array_fill(0, count($skus), '?'));
        $stmt = $pdo->prepare("DELETE FROM products WHERE sku IN ($placeholders)");
        
        $stmt->execute($skus);
        
        return $stmt->rowCount(); 
    }
}
?>
