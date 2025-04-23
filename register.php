<?php
$conn = new mysqli("localhost", "your_user", "your_pass", "your_db");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$sql = "INSERT INTO users (username, password) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $password);

if ($stmt->execute()) {
    echo "Account created. <a href='login.html'>Login here</a>";
} else {
    echo "Error: Username may already exist.";
}
?>
