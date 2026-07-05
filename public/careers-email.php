<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

$body = file_get_contents('php://input');
$data = json_decode($body, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request body']);
    exit();
}

// ── Recipient ─────────────────────────────────────────────────────────────────
$to = 'hr@spokemedia.com';
// ─────────────────────────────────────────────────────────────────────────────

$name       = htmlspecialchars($data['name']       ?? '');
$email      = htmlspecialchars($data['email']      ?? '');
$phone      = htmlspecialchars($data['phone']      ?? '');
$role       = htmlspecialchars($data['role']       ?? '');
$experience = htmlspecialchars($data['experience'] ?? '');
$message    = nl2br(htmlspecialchars($data['message'] ?? ''));

$subject = "New Job Application: $role – $name";

$htmlBody = "
<!DOCTYPE html>
<html>
<head><meta charset='UTF-8'></head>
<body style='font-family:Arial,sans-serif;color:#333;max-width:700px;margin:0 auto;padding:20px;'>

  <div style='background:#1a2942;padding:20px 30px;border-radius:8px 8px 0 0;'>
    <h2 style='color:#F69A1E;margin:0;font-size:22px;'>New Job Application</h2>
    <p style='color:#ffffff99;margin:4px 0 0;font-size:14px;'>Scope Ingredients — scope-india.com/careers</p>
  </div>

  <div style='border:1px solid #ddd;border-top:none;border-radius:0 0 8px 8px;padding:24px;'>

    <h3 style='color:#1a2942;border-bottom:2px solid #F69A1E;padding-bottom:6px;'>Applicant Details</h3>
    <table style='width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px;'>
      <tr><td style='padding:7px 10px;width:160px;font-weight:bold;color:#555;'>Name</td><td style='padding:7px 10px;'>$name</td></tr>
      <tr style='background:#f9f9f9;'><td style='padding:7px 10px;font-weight:bold;color:#555;'>Email</td><td style='padding:7px 10px;'><a href='mailto:$email' style='color:#c77c1a;'>$email</a></td></tr>
      <tr><td style='padding:7px 10px;font-weight:bold;color:#555;'>Phone</td><td style='padding:7px 10px;'>$phone</td></tr>
      <tr style='background:#f9f9f9;'><td style='padding:7px 10px;font-weight:bold;color:#555;'>Role Applied</td><td style='padding:7px 10px;font-weight:bold;color:#1a2942;'>$role</td></tr>
      <tr><td style='padding:7px 10px;font-weight:bold;color:#555;'>Experience</td><td style='padding:7px 10px;'>$experience</td></tr>
    </table>

    " . ($message ? "
    <h3 style='color:#1a2942;border-bottom:2px solid #F69A1E;padding-bottom:6px;'>Cover Note</h3>
    <div style='background:#f9f9f9;border-left:3px solid #F69A1E;padding:12px 16px;font-size:14px;line-height:1.6;border-radius:0 4px 4px 0;'>$message</div>
    " : "") . "

  </div>

  <p style='font-size:12px;color:#999;margin-top:16px;text-align:center;'>
    This email was sent automatically from the careers form at scope-india.com
  </p>

</body>
</html>";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: Scope Website <noreply@scope-india.com>\r\n";
$headers .= "Reply-To: $email\r\n";

$sent = mail($to, $subject, $htmlBody, $headers);

$logPath = __DIR__ . '/careers-email-preview.html';
file_put_contents($logPath, $htmlBody);

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => true, 'note' => 'mail() not available locally — see careers-email-preview.html']);
}
