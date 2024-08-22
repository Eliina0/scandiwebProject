<?php
require_once 'Product.php';

class DVD extends Product {
    private $size;

    public function __construct($sku, $name, $price, $size) {
        parent::__construct($sku, $name, $price, 'DVD');
        $this->size = $size;
    }

    public function setSize($size) { 
        $this->size = $size; 
    }
    public function getSize() { 
        return $this->size; 
    }

    public function save() {
        $pdo = Database::getInstance()->getPdo();
        $stmt = $pdo->prepare('INSERT INTO products (sku, name, price, type, size) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([$this->sku, $this->name, $this->price, $this->type, $this->size]);
    }
}
?>
