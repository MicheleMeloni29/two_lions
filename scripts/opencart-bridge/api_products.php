<?php
/**
 * Two Lions - OpenCart 4 & 3 Headless REST API Bridge
 * 
 * Posiziona questo file nella cartella principale di OpenCart (dove si trova config.php)
 * sul server di shop.twolionsinternational.com
 * 
 * Endpoint: https://shop.twolionsinternational.com/api_products.php
 */

declare(strict_types=1);

// ==========================================
// 1. CONFIGURAZIONE CHIAVE SEGRETA & CORS
// ==========================================
define('API_SECRET_KEY', 'TwoLions_LiveSecret_2026_KeySecure');

// Intestazioni CORS e tipo di contenuto
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

// Gestione preflight OPTIONS
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ==========================================
// 2. VERIFICA AUTENTICAZIONE (Token Bearer o ?key=)
// ==========================================
$authHeader = '';
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $authHeader = trim($_SERVER['HTTP_AUTHORIZATION']);
} elseif (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
    $authHeader = trim($_SERVER['REDIRECT_HTTP_AUTHORIZATION']);
} elseif (function_exists('apache_request_headers')) {
    $headers = apache_request_headers();
    if (isset($headers['Authorization'])) {
        $authHeader = trim($headers['Authorization']);
    } elseif (isset($headers['authorization'])) {
        $authHeader = trim($headers['authorization']);
    }
}

$providedKey = '';
if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
    $providedKey = $matches[1];
} elseif (isset($_GET['key'])) {
    $providedKey = (string)$_GET['key'];
}

if ($providedKey !== API_SECRET_KEY) {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'error'   => 'Unauthorized: Invalid or missing API key'
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// ==========================================
// 3. CARICAMENTO CONFIGURAZIONE OPENCART
// ==========================================
$configFile = __DIR__ . '/config.php';
if (!file_exists($configFile)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error'   => 'config.php non trovato. Assicurati che api_products.php sia nella root di OpenCart.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

require_once $configFile;

// Rilevamento costanti DB OpenCart
$dbHost = defined('DB_HOSTNAME') ? DB_HOSTNAME : 'localhost';
$dbPort = defined('DB_PORT') ? (int)DB_PORT : 3306;
$dbUser = defined('DB_USERNAME') ? DB_USERNAME : '';
$dbPass = defined('DB_PASSWORD') ? DB_PASSWORD : '';
$dbName = defined('DB_DATABASE') ? DB_DATABASE : '';
$dbPrefix = defined('DB_PREFIX') ? DB_PREFIX : 'oc_';

$httpServer = defined('HTTP_SERVER') ? rtrim(HTTP_SERVER, '/') . '/' : 'https://shop.twolionsinternational.com/';

// ==========================================
// 4. CONNESSIONE AL DATABASE CON PDO
// ==========================================
try {
    $dsn = "mysql:host={$dbHost};port={$dbPort};dbname={$dbName};charset=utf8mb4";
    $pdo = new PDO($dsn, $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error'   => 'Errore di connessione al database OpenCart: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// ==========================================
// 5. PARAMETRI DI RICHIESTA & RILEVAMENTO LINGUA
// ==========================================
$filterCategory = isset($_GET['category']) ? trim((string)$_GET['category']) : '';
$filterSlug     = isset($_GET['slug']) ? trim((string)$_GET['slug']) : '';
$langCode       = isset($_GET['lang']) ? strtolower(trim((string)$_GET['lang'])) : 'it';

// Rileva language_id da oc_language
$languageId = 1;
try {
    $stmtLang = $pdo->prepare("SELECT language_id, code FROM `{$dbPrefix}language` WHERE code LIKE :code LIMIT 1");
    $searchCode = ($langCode === 'en') ? 'en%' : 'it%';
    $stmtLang->execute(['code' => $searchCode]);
    $langRow = $stmtLang->fetch();
    if ($langRow && isset($langRow['language_id'])) {
        $languageId = (int)$langRow['language_id'];
    } else {
        // Fallback: prendi la prima lingua disponibile
        $stmtDefault = $pdo->query("SELECT language_id FROM `{$dbPrefix}language` ORDER BY sort_order ASC, language_id ASC LIMIT 1");
        $defaultRow = $stmtDefault->fetch();
        if ($defaultRow) {
            $languageId = (int)$defaultRow['language_id'];
        }
    }
} catch (\Throwable $t) {
    $languageId = 1;
}

// ==========================================
// 6. ESTRAZIONE PRODOTTI DA OPENCART
// ==========================================
try {
    $sql = "
        SELECT 
            p.product_id,
            p.model,
            p.sku,
            p.price,
            p.quantity,
            p.image,
            p.status,
            p.date_added,
            pd.name,
            pd.description,
            pd.meta_title,
            pd.meta_description,
            cd.name AS category_name,
            c.category_id
        FROM `{$dbPrefix}product` p
        INNER JOIN `{$dbPrefix}product_description` pd 
            ON (p.product_id = pd.product_id AND pd.language_id = :language_id)
        LEFT JOIN `{$dbPrefix}product_to_category` p2c 
            ON (p.product_id = p2c.product_id)
        LEFT JOIN `{$dbPrefix}category` c 
            ON (p2c.category_id = c.category_id)
        LEFT JOIN `{$dbPrefix}category_description` cd 
            ON (c.category_id = cd.category_id AND cd.language_id = :language_id2)
        WHERE p.status = 1
    ";

    $params = [
        'language_id'  => $languageId,
        'language_id2' => $languageId
    ];

    if ($filterCategory !== '' && strtolower($filterCategory) !== 'all') {
        $sql .= " AND (LOWER(cd.name) LIKE :cat OR LOWER(cd.name) LIKE :cat2) ";
        $cleanCat = str_replace('-', '%', strtolower($filterCategory));
        $params['cat'] = '%' . $cleanCat . '%';
        $params['cat2'] = '%' . strtolower($filterCategory) . '%';
    }

    $sql .= " ORDER BY p.sort_order ASC, p.product_id DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();

    // Raccogli tutti i product_id per estrarre i SEO URL
    $productIds = array_unique(array_column($rows, 'product_id'));
    $seoUrls = [];

    if (!empty($productIds)) {
        // Query compatibile OpenCart 4 (key='product_id' e value IN (...)) e OpenCart 3 (query IN ('product_id=X', ...))
        $inClause = implode(',', array_map('intval', $productIds));
        
        // Tentativo OC4
        try {
            $seoStmt = $pdo->query("SELECT `value`, `keyword` FROM `{$dbPrefix}seo_url` WHERE `key` = 'product_id' AND `value` IN ({$inClause})");
            while ($sRow = $seoStmt->fetch()) {
                $seoUrls[(int)$sRow['value']] = $sRow['keyword'];
            }
        } catch (\Throwable $e) {
            // Tentativo OC3
            try {
                $queries = array_map(fn($id) => "'product_id={$id}'", $productIds);
                $queriesIn = implode(',', $queries);
                $seoStmt3 = $pdo->query("SELECT `query`, `keyword` FROM `{$dbPrefix}seo_url` WHERE `query` IN ({$queriesIn})");
                while ($sRow = $seoStmt3->fetch()) {
                    if (preg_match('/product_id=(\d+)/', $sRow['query'], $m)) {
                        $seoUrls[(int)$m[1]] = $sRow['keyword'];
                    }
                }
            } catch (\Throwable $e2) {
                // Nessuna tabella seo_url trovata, si userà il fallback
            }
        }
    }

    // ==========================================
    // 7. FORMATTAZIONE OUTPUT PER NEXT.JS
    // ==========================================
    $formattedProducts = [];
    $seenProducts = [];

    foreach ($rows as $row) {
        $pId = (int)$row['product_id'];
        
        // Evita duplicati se associato a più categorie
        if (isset($seenProducts[$pId])) {
            continue;
        }
        $seenProducts[$pId] = true;

        // Generazione slug
        if (isset($seoUrls[$pId]) && !empty($seoUrls[$pId])) {
            $slug = (string)$seoUrls[$pId];
        } else {
            // Fallback slug da nome o model
            $rawSlug = !empty($row['name']) ? $row['name'] : $row['model'];
            $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $rawSlug), '-'));
        }

        // Se è richiesto un filtro per slug specifico
        if ($filterSlug !== '' && $slug !== $filterSlug) {
            continue;
        }

        $rawPrice = (float)$row['price'];
        $amountCents = (int)round($rawPrice * 100);
        $priceFormatted = ($amountCents === 0) 
            ? "00,00€" 
            : number_format($rawPrice, 2, ',', '.') . "€";

        // Pulizia descrizioni
        $rawDesc = (string)($row['description'] ?? '');
        $plainDesc = trim(strip_tags(html_entity_decode($rawDesc, ENT_QUOTES, 'UTF-8')));
        
        // Paragrafi per fullDescription
        $paragraphs = array_filter(
            array_map('trim', explode("\n", $plainDesc)),
            fn($p) => strlen($p) > 0
        );
        if (empty($paragraphs)) {
            $paragraphs = [$plainDesc];
        }

        $shortDesc = !empty($row['meta_description']) 
            ? trim($row['meta_description']) 
            : (isset($paragraphs[0]) ? mb_substr($paragraphs[0], 0, 160) . '...' : '');

        // Immagine
        $imageSrc = '';
        if (!empty($row['image'])) {
            $imageSrc = $httpServer . 'image/' . ltrim($row['image'], '/');
        } else {
            // Fallback per i profumi noti se non caricata sul server
            if (stripos($slug, 'pour-homme') !== false) {
                $imageSrc = '/Parfum_Bottles/Cagliari_pourHomme.jpeg';
            } elseif (stripos($slug, 'unisex') !== false) {
                $imageSrc = '/Parfum_Bottles/Cagliari_unisex.jpeg';
            } elseif (stripos($slug, 'pour-femme') !== false) {
                $imageSrc = '/Parfum_Bottles/Cagliari_pourFemme.jpeg';
            } else {
                $imageSrc = '/Food&Beverage/cibo.png';
            }
        }

        $categoryName = !empty($row['category_name']) ? $row['category_name'] : 'Parfum';

        $formattedProducts[] = [
            'id'               => !empty($row['model']) ? (string)$row['model'] : 'PROD-' . $pId,
            'productId'        => $pId,
            'slug'             => $slug,
            'category'         => $categoryName,
            'name'             => (string)$row['name'],
            'amountCents'      => $amountCents,
            'price'            => $priceFormatted,
            'isDiscounted'     => false,
            'shortDescription' => $shortDesc,
            'fullDescription'  => array_values($paragraphs),
            'imageSrc'         => $imageSrc,
            'imageAlt'         => (string)$row['name'],
            'quantity'         => (int)$row['quantity'],
            'inStock'          => ((int)$row['quantity'] > 0),
            'model'            => (string)$row['model']
        ];
    }

    echo json_encode([
        'success'  => true,
        'category' => $filterCategory,
        'count'    => count($formattedProducts),
        'products' => $formattedProducts
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error'   => 'Errore durante l\'estrazione dei prodotti: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
