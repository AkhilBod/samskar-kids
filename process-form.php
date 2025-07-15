<?php
// Configure recipient email
$to_email = "your-email@example.com"; // Replace with your email address

// Get form data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$program = $_POST['program'] ?? '';
$message = $_POST['message'] ?? '';

// Validate form data
if (empty($name) || empty($email) || empty($phone) || empty($program) || empty($message)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid email format']);
    exit;
}

// Prepare email content
$subject = "New Inquiry from Samskar Kids Website";
$email_content = "New contact form submission:\n\n";
$email_content .= "Name: " . $name . "\n";
$email_content .= "Email: " . $email . "\n";
$email_content .= "Phone: " . $phone . "\n";
$email_content .= "Program: " . $program . "\n";
$email_content .= "Message:\n" . $message . "\n";

// Headers
$headers = "From: " . $email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to_email, $subject, $email_content, $headers)) {
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Thank you for your message. We will get back to you soon!']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to send message. Please try again later.']);
}
?>
