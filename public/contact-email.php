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

// ── Set recipient email here ──────────────────────────────────────────────────
$to = 'contact@scope-india.com';
// ─────────────────────────────────────────────────────────────────────────────

$name     = htmlspecialchars($data['name']     ?? '');
$company  = htmlspecialchars($data['company']  ?? '');
$email    = htmlspecialchars($data['email']    ?? '');
$phone    = htmlspecialchars($data['phone']    ?? '—');
$industry = htmlspecialchars($data['industry'] ?? '—');
$subject  = htmlspecialchars($data['subject']  ?? 'Contact Form Enquiry');
$message  = nl2br(htmlspecialchars($data['message'] ?? ''));

$emailSubject = "New Contact Enquiry: $subject – $name";

$htmlBody = "
<!DOCTYPE html>
<html>
<head><meta charset='UTF-8'></head>
<body style='font-family:Arial,sans-serif;color:#333;max-width:700px;margin:0 auto;padding:20px;'>

  <div style='background:#1a2942;padding:20px 30px;border-radius:8px 8px 0 0;'>
    <h2 style='color:#F69A1E;margin:0;font-size:22px;'>New Contact Enquiry</h2>
    <p style='color:#ffffff99;margin:4px 0 0;font-size:14px;'>Scope Ingredients — scope-india.com</p>
  </div>

  <div style='border:1px solid #ddd;border-top:none;border-radius:0 0 8px 8px;padding:24px;'>

    <h3 style='color:#1a2942;border-bottom:2px solid #F69A1E;padding-bottom:6px;'>Sender Details</h3>
    <table style='width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px;'>
      <tr><td style='padding:7px 10px;width:140px;font-weight:bold;color:#555;'>Name</td><td style='padding:7px 10px;'>$name</td></tr>
      <tr style='background:#f9f9f9;'><td style='padding:7px 10px;font-weight:bold;color:#555;'>Company</td><td style='padding:7px 10px;'>$company</td></tr>
      <tr><td style='padding:7px 10px;font-weight:bold;color:#555;'>Email</td><td style='padding:7px 10px;'><a href='mailto:$email' style='color:#c77c1a;'>$email</a></td></tr>
      <tr style='background:#f9f9f9;'><td style='padding:7px 10px;font-weight:bold;color:#555;'>Phone</td><td style='padding:7px 10px;'>$phone</td></tr>
      <tr><td style='padding:7px 10px;font-weight:bold;color:#555;'>Industry</td><td style='padding:7px 10px;'>$industry</td></tr>
    </table>

    <h3 style='color:#1a2942;border-bottom:2px solid #F69A1E;padding-bottom:6px;'>Message</h3>
    <table style='width:100%;border-collapse:collapse;font-size:14px;'>
      <tr><td style='padding:7px 10px;width:140px;font-weight:bold;color:#555;'>Subject</td><td style='padding:7px 10px;'>$subject</td></tr>
      <tr style='background:#f9f9f9;'><td style='padding:7px 10px;font-weight:bold;color:#555;vertical-align:top;'>Message</td><td style='padding:7px 10px;line-height:1.6;'>$message</td></tr>
    </table>

  </div>

  <p style='font-size:12px;color:#999;margin-top:16px;text-align:center;'>
    This email was sent automatically from the contact form at scope-india.com
  </p>

</body>
</html>";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: Scope Website <noreply@scope-india.com>\r\n";
$headers .= "Reply-To: $email\r\n";

$sent = mail($to, $emailSubject, $htmlBody, $headers);

$logPath = __DIR__ . '/contact-email-preview.html';
file_put_contents($logPath, $htmlBody);

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => true, 'note' => 'mail() not available locally — see contact-email-preview.html']);
}
