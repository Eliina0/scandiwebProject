<?php
require_once 'Product.php';

class Book extends Product {
    private $weight;

    public function __construct($sku, $name, $price, $weight) {
        parent::__construct($sku, $name, $price, 'Book');
        $this->weight = $weight;
    }

    public function setWeight($weight) { 
        $this->weight = $weight; 
    }
    public function getWeight() { 
        return $this->weight; 
    }

    public function save() {
        $pdo = Database::getInstance()->getPdo();
        $stmt = $pdo->prepare('INSERT INTO products (sku, name, price, type, weight) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([$this->sku, $this->name, $this->price, $this->type, $this->weight]);
    }
}
?>
