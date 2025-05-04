<?php
session_start();
$conn = new mysqli("localhost", "your_user", "your_pass", "your_db");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();

$result = $stmt->get_result();
if ($user = $result->fetch_assoc()) {
    if (password_verify($password, $user['password'])) {
        $_SESSION['username'] = $username;
        header("draft_2(COPY)"); //  Replace with final draft 
        exit();
    }
}

echo "Invalid username or password";
?>
