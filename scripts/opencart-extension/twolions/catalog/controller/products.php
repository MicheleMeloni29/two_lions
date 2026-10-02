<?php
namespace Opencart\Catalog\Controller\Extension\Twolions;

class Products extends \Opencart\System\Engine\Controller {
    private const API_SECRET_KEY = 'TwoLions_LiveSecret_2026_KeySecure';

    public function index(): void {
        // Headers CORS & JSON
        $this->response->addHeader('Access-Control-Allow-Origin: *');
        $this->response->addHeader('Access-Control-Allow-Methods: GET, OPTIONS');
        $this->response->addHeader('Access-Control-Allow-Headers: Content-Type, Authorization');
        $this->response->addHeader('Content-Type: application/json; charset=utf-8');

        if ($this->request->server['REQUEST_METHOD'] === 'OPTIONS') {
            $this->response->setOutput(json_encode(['status' => 'ok']));
            return;
        }

        // Verifica Chiave API (Bearer token o ?key=)
        $authHeader = '';
        if (isset($this->request->server['HTTP_AUTHORIZATION'])) {
            $authHeader = trim($this->request->server['HTTP_AUTHORIZATION']);
        } elseif (isset($this->request->server['REDIRECT_HTTP_AUTHORIZATION'])) {
            $authHeader = trim($this->request->server['REDIRECT_HTTP_AUTHORIZATION']);
        }

        $providedKey = '';
        if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            $providedKey = $matches[1];
        } elseif (isset($this->request->get['key'])) {
            $providedKey = (string)$this->request->get['key'];
        }

        if ($providedKey !== self::API_SECRET_KEY) {
            $this->response->addHeader($this->request->server['SERVER_PROTOCOL'] . ' 401 Unauthorized');
            $this->response->setOutput(json_encode([
                'success' => false,
                'error'   => 'Unauthorized: Invalid API Key'
            ], JSON_UNESCAPED_UNICODE));
            return;
        }

        // Parametri richiesta
        $filterCategory = isset($this->request->get['category']) ? trim((string)$this->request->get['category']) : '';
        $filterSlug     = isset($this->request->get['slug']) ? trim((string)$this->request->get['slug']) : '';
        $langCode       = isset($this->request->get['lang']) ? strtolower(trim((string)$this->request->get['lang'])) : 'it';

        // Ricerca lingua
        $languageId = (int)$this->config->get('config_language_id');
        $langQuery = $this->db->query("SELECT language_id FROM `" . DB_PREFIX . "language` WHERE code LIKE '" . $this->db->escape(($langCode === 'en' ? 'en%' : 'it%')) . "' LIMIT 1");
        if ($langQuery->num_rows) {
            $languageId = (int)$langQuery->row['language_id'];
        }

        // Estrazione prodotti
        $sql = "
            SELECT 
                p.product_id,
                p.model,
                p.sku,
                p.price,
                p.quantity,
                p.image,
                p.status,
                pd.name,
                pd.description,
                pd.meta_title,
                pd.meta_description,
                cd.name AS category_name,
                c.category_id
            FROM `" . DB_PREFIX . "product` p
            INNER JOIN `" . DB_PREFIX . "product_description` pd 
                ON (p.product_id = pd.product_id AND pd.language_id = '" . (int)$languageId . "')
            LEFT JOIN `" . DB_PREFIX . "product_to_category` p2c 
                ON (p.product_id = p2c.product_id)
            LEFT JOIN `" . DB_PREFIX . "category` c 
                ON (p2c.category_id = c.category_id)
            LEFT JOIN `" . DB_PREFIX . "category_description` cd 
                ON (c.category_id = cd.category_id AND cd.language_id = '" . (int)$languageId . "')
            WHERE p.status = 1
        ";

        if ($filterCategory !== '' && strtolower($filterCategory) !== 'all') {
            $cleanCat = str_replace('-', '%', strtolower($filterCategory));
            $sql .= " AND (LOWER(cd.name) LIKE '%" . $this->db->escape($cleanCat) . "%' OR LOWER(cd.name) LIKE '%" . $this->db->escape(strtolower($filterCategory)) . "%') ";
        }

        $sql .= " ORDER BY p.sort_order ASC, p.product_id DESC";

        $query = $this->db->query($sql);
        $rows = $query->rows;

        // Estrazione SEO URL
        $productIds = array_unique(array_column($rows, 'product_id'));
        $seoUrls = [];
        if (!empty($productIds)) {
            $inClause = implode(',', array_map('intval', $productIds));
            try {
                $seoQuery = $this->db->query("SELECT `value`, `keyword` FROM `" . DB_PREFIX . "seo_url` WHERE `key` = 'product_id' AND `value` IN (" . $inClause . ")");
                foreach ($seoQuery->rows as $sRow) {
                    $seoUrls[(int)$sRow['value']] = $sRow['keyword'];
                }
            } catch (\Throwable $t) {
                // Ignore fallback
            }
        }

        $httpServer = defined('HTTP_SERVER') ? rtrim(HTTP_SERVER, '/') . '/' : 'https://shop.twolionsinternational.com/';
        $formattedProducts = [];
        $seen = [];

        foreach ($rows as $row) {
            $pId = (int)$row['product_id'];
            if (isset($seen[$pId])) continue;
            $seen[$pId] = true;

            $slug = isset($seoUrls[$pId]) && !empty($seoUrls[$pId])
                ? (string)$seoUrls[$pId]
                : strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', (!empty($row['name']) ? $row['name'] : $row['model'])), '-'));

            if ($filterSlug !== '' && $slug !== $filterSlug) {
                continue;
            }

            $rawPrice = (float)$row['price'];
            $amountCents = (int)round($rawPrice * 100);
            $priceFormatted = ($amountCents === 0) 
                ? "00,00€" 
                : number_format($rawPrice, 2, ',', '.') . "€";

            $plainDesc = trim(strip_tags(html_entity_decode((string)$row['description'], ENT_QUOTES, 'UTF-8')));
            $paragraphs = array_filter(array_map('trim', explode("\n", $plainDesc)), fn($p) => strlen($p) > 0);
            if (empty($paragraphs)) {
                $paragraphs = [$plainDesc];
            }

            $shortDesc = !empty($row['meta_description']) 
                ? trim($row['meta_description']) 
                : (isset($paragraphs[0]) ? mb_substr($paragraphs[0], 0, 160) . '...' : '');

            $imageSrc = '';
            if (!empty($row['image'])) {
                $imageSrc = $httpServer . 'image/' . ltrim($row['image'], '/');
            } else {
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

        $this->response->setOutput(json_encode([
            'success'  => true,
            'category' => $filterCategory,
            'count'    => count($formattedProducts),
            'products' => $formattedProducts
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    }
}
