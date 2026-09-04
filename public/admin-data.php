<?php
header('Content-Type: application/json');

// Must match the SHA-256 hash of the Admin panel password in src/pages/Admin.tsx.
// Kept server-side only — never shipped to the browser.
$adminPasswordHash = '3797054a712620c7e65f6dedc44bafa22ee01daa960d9e656128757b3c88d25b';

$allowedTypes = ['products', 'partners', 'news', 'careers'];
$dataDir = __DIR__ . '/data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

function respond($arr, $code = 200) {
    http_response_code($code);
    echo json_encode($arr);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $type = $_GET['type'] ?? '';
    if (!in_array($type, $allowedTypes, true)) {
        respond(['success' => false, 'message' => 'Invalid type'], 400);
    }
    $file = "$dataDir/$type.json";
    if (!file_exists($file)) {
        respond(['success' => true, 'data' => null]);
    }
    respond(['success' => true, 'data' => json_decode(file_get_contents($file))]);
}

if ($method === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true);
    if (!$body) {
        respond(['success' => false, 'message' => 'Invalid request body'], 400);
    }

    $type = $body['type'] ?? '';
    $password = $body['password'] ?? '';
    $action = $body['action'] ?? 'save';

    if (!in_array($type, $allowedTypes, true)) {
        respond(['success' => false, 'message' => 'Invalid type'], 400);
    }
    if (!hash_equals($adminPasswordHash, hash('sha256', $password))) {
        respond(['success' => false, 'message' => 'Unauthorized'], 401);
    }

    $file = "$dataDir/$type.json";

    if ($action === 'reset') {
        if (file_exists($file)) {
            unlink($file);
        }
        respond(['success' => true]);
    }

    if (!array_key_exists('data', $body)) {
        respond(['success' => false, 'message' => 'Missing data'], 400);
    }

    $tmpFile = "$file.tmp";
    file_put_contents($tmpFile, json_encode($body['data'], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
    rename($tmpFile, $file);

    respond(['success' => true]);
}

respond(['success' => false, 'message' => 'Method not allowed'], 405);
