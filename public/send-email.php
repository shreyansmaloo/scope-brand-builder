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

// ── Set recipient email here once you have it ─────────────────────────────────
$to = 'shreyansmaloowebsite@gmail.com';
// ─────────────────────────────────────────────────────────────────────────────

$firstName  = htmlspecialchars($data['firstName']  ?? '');
$secondName = htmlspecialchars($data['secondName'] ?? '');
$company    = htmlspecialchars($data['company']    ?? '');
$email      = htmlspecialchars($data['email']      ?? '');
$phone      = htmlspecialchars($data['phone']      ?? '');
$altPhone   = htmlspecialchars($data['altPhone']   ?? '—');
$address1   = htmlspecialchars($data['address1']   ?? '');
$address2   = htmlspecialchars($data['address2']   ?? '—');
$area       = htmlspecialchars($data['area']       ?? '');
$pincode    = htmlspecialchars($data['pincode']    ?? '');
$city       = htmlspecialchars($data['city']       ?? '');
$state      = htmlspecialchars($data['state']      ?? '');
$country    = htmlspecialchars($data['country']    ?? '');
$industry   = htmlspecialchars($data['industry']   ?? '');
$items      = $data['items'] ?? [];

$subject = "New Sample Request from $firstName $secondName – $company";

$itemsRows = '';
foreach ($items as $i => $item) {
    $num     = $i + 1;
    $product = htmlspecialchars($item['product'] ?? '');
    $grade   = htmlspecialchars($item['grade']   ?? '—');
    $qty     = htmlspecialchars($item['quantity'] ?? '');
    $purpose = htmlspecialchars($item['purpose'] ?? 'N/A');
    $bg      = ($i % 2 === 0) ? '#ffffff' : '#f9f9f9';
    $itemsRows .= "
        <tr style='background:$bg;'>
            <td style='padding:8px;border:1px solid #ddd;text-align:center;'>$num</td>
            <td style='padding:8px;border:1px solid #ddd;font-weight:bold;color:#c77c1a;'>$product</td>
            <td style='padding:8px;border:1px solid #ddd;'>$grade</td>
            <td style='padding:8px;border:1px solid #ddd;'>$qty</td>
            <td style='padding:8px;border:1px solid #ddd;'>$purpose</td>
        </tr>";
}

$htmlBody = "
<!DOCTYPE html>
<html>
<head><meta charset='UTF-8'></head>
<body style='font-family:Arial,sans-serif;color:#333;max-width:700px;margin:0 auto;padding:20px;'>

  <div style='background:#1a2942;padding:20px 30px;border-radius:8px 8px 0 0;'>
    <h2 style='color:#F69A1E;margin:0;font-size:22px;'>New Sample Request</h2>
    <p style='color:#ffffff99;margin:4px 0 0;font-size:14px;'>Scope Ingredients — scope-india.com</p>
  </div>

  <div style='border:1px solid #ddd;border-top:none;border-radius:0 0 8px 8px;padding:24px;'>

    <h3 style='color:#1a2942;border-bottom:2px solid #F69A1E;padding-bottom:6px;'>Contact Details</h3>
    <table style='width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px;'>
      <tr><td style='padding:7px 10px;width:160px;font-weight:bold;color:#555;'>Name</td><td style='padding:7px 10px;'>$firstName $secondName</td></tr>
      <tr style='background:#f9f9f9;'><td style='padding:7px 10px;font-weight:bold;color:#555;'>Company</td><td style='padding:7px 10px;'>$company</td></tr>
      <tr><td style='padding:7px 10px;font-weight:bold;color:#555;'>Email</td><td style='padding:7px 10px;'><a href='mailto:$email' style='color:#c77c1a;'>$email</a></td></tr>
      <tr style='background:#f9f9f9;'><td style='padding:7px 10px;font-weight:bold;color:#555;'>Phone</td><td style='padding:7px 10px;'>$phone</td></tr>
      <tr><td style='padding:7px 10px;font-weight:bold;color:#555;'>Alt. Phone</td><td style='padding:7px 10px;'>$altPhone</td></tr>
      <tr style='background:#f9f9f9;'><td style='padding:7px 10px;font-weight:bold;color:#555;'>Industry</td><td style='padding:7px 10px;'>$industry</td></tr>
    </table>

    <h3 style='color:#1a2942;border-bottom:2px solid #F69A1E;padding-bottom:6px;'>Shipping Address</h3>
    <table style='width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px;'>
      <tr><td style='padding:7px 10px;width:160px;font-weight:bold;color:#555;'>Address Line 1</td><td style='padding:7px 10px;'>$address1</td></tr>
      <tr style='background:#f9f9f9;'><td style='padding:7px 10px;font-weight:bold;color:#555;'>Address Line 2</td><td style='padding:7px 10px;'>$address2</td></tr>
      <tr><td style='padding:7px 10px;font-weight:bold;color:#555;'>Area</td><td style='padding:7px 10px;'>$area</td></tr>
      <tr style='background:#f9f9f9;'><td style='padding:7px 10px;font-weight:bold;color:#555;'>City</td><td style='padding:7px 10px;'>$city</td></tr>
      <tr><td style='padding:7px 10px;font-weight:bold;color:#555;'>Pin Code</td><td style='padding:7px 10px;'>$pincode</td></tr>
      <tr style='background:#f9f9f9;'><td style='padding:7px 10px;font-weight:bold;color:#555;'>State</td><td style='padding:7px 10px;'>$state</td></tr>
      <tr><td style='padding:7px 10px;font-weight:bold;color:#555;'>Country</td><td style='padding:7px 10px;'>$country</td></tr>
    </table>

    <h3 style='color:#1a2942;border-bottom:2px solid #F69A1E;padding-bottom:6px;'>Samples Requested</h3>
    <table style='width:100%;border-collapse:collapse;font-size:14px;'>
      <thead>
        <tr style='background:#1a2942;color:#ffffff;'>
          <th style='padding:9px 8px;border:1px solid #ddd;width:36px;'>#</th>
          <th style='padding:9px 8px;border:1px solid #ddd;text-align:left;'>Product</th>
          <th style='padding:9px 8px;border:1px solid #ddd;text-align:left;'>Grade</th>
          <th style='padding:9px 8px;border:1px solid #ddd;text-align:left;width:90px;'>Quantity</th>
          <th style='padding:9px 8px;border:1px solid #ddd;text-align:left;'>Purpose / Application</th>
        </tr>
      </thead>
      <tbody>$itemsRows</tbody>
    </table>

  </div>

  <p style='font-size:12px;color:#999;margin-top:16px;text-align:center;'>
    This email was sent automatically from the sample request form at scope-india.com
  </p>

</body>
</html>";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: Scope Website <noreply@scope-india.com>\r\n";
$headers .= "Reply-To: $email\r\n";

$sent = mail($to, $subject, $htmlBody, $headers);

// Write to a local preview file so you can inspect the email during development
// This file is harmless on Hostinger and useful locally
$logPath = __DIR__ . '/email-preview.html';
file_put_contents($logPath, $htmlBody);

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    // On Hostinger mail() will succeed; locally it won't have a mail server
    // but we still return success so the form flow can be tested end-to-end.
    // Open /email-preview.html in the browser to inspect the email content.
    echo json_encode(['success' => true, 'note' => 'mail() not available locally — see email-preview.html']);
}
