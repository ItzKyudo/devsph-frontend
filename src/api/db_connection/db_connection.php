<?php
function getConn() {
    $host = "127.0.0.1";
    $user = "root";
    $password = "";
    $dbName = "devsph";

    try {
        $conn = new PDO("mysql:host=$host;dbname=$dbName;charset=utf8", $user, $password);
        // Set error mode to exception for better debugging
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch (PDOException $e) {
        // Handle connection error
        die("Connection failed: " . $e->getMessage());
    }
}
?>
