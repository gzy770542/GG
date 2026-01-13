<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<div style='font-family: sans-serif; padding: 20px;'>";
echo "<h1>Database & Table Installer</h1>";

// 1. Load Config
if (file_exists('config.php')) {
    require_once 'config.php';
    echo "<p>✅ <b>config.php</b> found.</p>";
} else {
    die("<p style='color:red;'>❌ <b>config.php</b> NOT found.</p>");
}

// 2. Connect
try {
    $dsn = "mysql:host=" . $db_config['host'] . ";dbname=" . $db_config['dbname'] . ";charset=" . $db_config['charset'];
    $pdo = new PDO($dsn, $db_config['user'], $db_config['pass']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "<h3 style='color:green'>✅ Database Connected Successfully!</h3>";
} catch (PDOException $e) {
    die("<h3 style='color:red'>❌ Connection FAILED</h3><p>" . $e->getMessage() . "</p>");
}

echo "<hr>";

// --- RESET LOGIC ---
if (isset($_GET['reset'])) {
    $pdo->exec("DROP TABLE IF EXISTS contacts");
    $pdo->exec("DROP TABLE IF EXISTS cv_submissions");
    echo "<p style='color:orange; font-weight:bold;'>⚠️ Tables Dropped! Recreating...</p>";
}
// -------------------

// 3. Check & Create Tables
$tables = [
    'contacts' => "CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        category VARCHAR(50) NOT NULL,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )",
    'cv_submissions' => "CREATE TABLE IF NOT EXISTS cv_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        filename VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )"
];

echo "<h2>Checking Tables...</h2>";

foreach ($tables as $name => $sql) {
    try {
        // Check if table exists
        $stmt = $pdo->query("SHOW TABLES LIKE '$name'");
        if ($stmt->rowCount() > 0) {
            echo "<p>✅ Table <b>$name</b> exists.</p>";
        } else {
            // Create table
            $pdo->exec($sql);
            echo "<p style='color:blue'>🆕 Table <b>$name</b> created successfully!</p>";
        }
    } catch (PDOException $e) {
        echo "<p style='color:red'>❌ Error checking/creating table <b>$name</b>: " . $e->getMessage() . "</p>";
    }
}

echo "<hr>";
echo "<h3>Final Verification</h3>";
echo "<p>If all ticks above are GREEN (or BLUE), your database is 100% ready.</p>";
echo "<br>";
echo "<a href='?reset=1' style='background:red; color:white; padding:10px 20px; text-decoration:none; font-weight:bold; border-radius:5px;'>⚠️ Click Here to FIX / UPDATE Tables (Resets Data)</a>";
echo "<p><b>Next Step:</b> You can now test the form submissions on your website!</p>";
echo "</div>";
?>