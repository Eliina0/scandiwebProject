<?php
abstract class Product {
    protected  $sku;
    protected  $name;
    protected  $price;
    protected  $type;

    public function __construct($sku, $name, $price, $type) {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
        $this->type = $type;
    }

    public function setSku($sku) { $this->sku = $sku; }
    public function getSku() { return $this->sku; }

    public function setName($name) { $this->name = $name; }
    public function getName() { return $this->name; }

    public function setPrice($price) { $this->price = $price; }
    public function getPrice() { return $this->price; }

    abstract public function save();
}
?>
