<?php
class Database {
    private static $instance = null;
    private $pdo;

    private function __construct($host, $db, $user, $pass) {
        $this->pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Database('localhost', '_productlist', 'root', '');
        }

        return self::$instance;
    }

    public function getPdo() {
        return $this->pdo;
    }
}
?>
