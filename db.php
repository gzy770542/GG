<?php
require_once 'config.php';

$host = $db_config['host'];
$db   = $db_config['dbname'];
$user = $db_config['user'];
$pass = $db_config['pass'];
$charset = $db_config['charset'];

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
  $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
  die("Database connection failed: " . $e->getMessage());
}
