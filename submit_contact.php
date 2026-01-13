<?php
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $name = $_POST['name'] ?? '';
  $email = $_POST['email'] ?? '';
  $phone = $_POST['phone'] ?? '';
  $category = $_POST['category'] ?? '';
  $other = $_POST['other'] ?? '';

  $message = $_POST['message'] ?? '';

  // Optional: Basic validation
  if (empty($name) || empty($email) || empty($phone) || empty($category)) {
    echo "Please fill in all required fields.";
    exit;
  }

  // If "Other" is selected, use user input from the other field
  $finalCategory = ($category === 'Other') ? $other : $category;

  try {
    $stmt = $pdo->prepare("INSERT INTO contacts (name, email, phone, category, message) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$name, $email, $phone, $finalCategory, $message]);
    echo "Success! Your contact request has been submitted.";
  } catch (PDOException $e) {
    // Log error instead of showing to user in production
    error_log("Database error: " . $e->getMessage());
    http_response_code(500);
    echo "An error occurred while submitting your request.";
  }
} else {
  echo "Invalid request method.";
}
