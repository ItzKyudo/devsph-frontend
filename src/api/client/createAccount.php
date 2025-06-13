<?php
header('Content-Type: application/json');
require_once '/src/api/db_connection/db_connection.php';

try {
    $data = json_decode(file_get_contents('php://input'), true);

    $firstname = trim($data['firstname'] ?? '');
    $lastname = trim($data['lastname'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';
    $confpassword = $data['confpassword'] ?? '';



    if (!$firstname || !$lastname || !$email || !$password || !$confpassword) {
        http_response_code(400);
        echo json_encode(['error' => 'All fields are required.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email format.']);
        exit;
    }

    if ($password !== $confpassword) {
        http_response_code(400);
        echo json_encode(['error' => 'Passwords do not match.']);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $conn = getConn();

    $check = $conn->prepare("SELECT email FROM accounts WHERE email = ?");
    $check->execute([$email]);

    if ($check->rowCount() > 0) {
        http_response_code(409);
        echo json_encode(['error' => 'Email already registered.']);
        exit;
    }

    $user_id = uniqid('user_', true); // Generates a semi-unique ID like 'user_64e93b34a85cd2.88783084'
    $created_at = $updated_at = date('Y-m-d H:i:s');

    try {
        $stmt = $conn->prepare("
            INSERT INTO accounts (
                user_id, first_name, last_name, email, password,
                created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        ");

        $stmt->execute([
            $user_id, $firstname, $lastname, $email, $hashedPassword,
            $created_at, $updated_at
        ]);
        
        echo json_encode(['success' => 'Account created successfully.']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Insert failed: ' . $e->getMessage()]);
        exit;
    }


    echo json_encode(['success' => 'Account created successfully.']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>
