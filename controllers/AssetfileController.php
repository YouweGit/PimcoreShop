<?php

class PimcoreShop_AssetfileController extends \Pimcore\Controller\Action\Admin
{
    var $db;

    public function getAction() {

        $productId = $this->getParam('productId', null);
        $product = \Pimcore\Model\Object\Product::getById($productId);

        if(!$product) {
            $data['success'] = false;
            $this->_helper->json($data);
        }

        $data = [];
        $data['success'] = true;
        $data['total'] = 0;
        $data['data'] = [];

        $this->db = \Pimcore\Db::get();

        // =================
        // - dev newsflash -
        // this code has not been optimized yet because
        // the customer might go in any direction from here
        // =================

        $rowId = 1;
        $sku = $product->getSku();
        // get assets where property ProductNumber == $sku

        $select = $this->db->select()
            ->from(['properties' => 'properties'], ['cid'])
            ->where('properties.ctype = ?', 'asset')
            ->where('properties.type = ?', 'text')
            ->where('properties.name = ?', 'ArticleNumber')
            ->where('properties.data = ?', $sku);
        $rows = $this->db->fetchAll($select);

        foreach($rows as $row) {
            $asset = \Pimcore\Model\Asset::getById($row['cid']);
            $record = [
                'id'            => $rowId++,
                'asset_id'      => $asset->getId(),
                'file'          => $asset->getFilename(),
                'type'          => $asset->getType(),
                'path'          => $asset->getPath(),
                'mimetype'      => $asset->getMimetype(),
                'relation'      => 'ArticleNumber',
                'relation_id'   => null,
                'asset_url'     => '/website/var/assets' . $asset->getRealFullPath()
            ];
            $data['data'][] = $record;
        }

        $categories = $product->getCategories();
        foreach($categories as $category) {

            // get assets where property CategoryNumber == $category->getErpId()
            $catErpId = $category->getErpId();

            if($catErpId) {
                $select = $this->db->select()
                    ->from(['properties' => 'properties'], ['cid'])
                    ->where('properties.ctype = ?', 'asset')
                    ->where('properties.type = ?', 'text')
                    ->where('properties.name = ?', 'CategoryNumber')
                    ->where('properties.data = ?', $catErpId);
                $rows = $this->db->fetchAll($select);

                foreach($rows as $row) {
                    $asset = \Pimcore\Model\Asset::getById($row['cid']);
                    $record = [
                        'id'            => $rowId++,
                        'asset_id'      => $asset->getId(),
                        'file'          => $asset->getFilename(),
                        'type'          => $asset->getType(),
                        'path'          => $asset->getPath(),
                        'mimetype'      => $asset->getMimetype(),
                        'relation'      => 'CategoryNumber',
                        'relation_id'   => $category->getId(),
                        'asset_url'     => '/website/var/assets' . $asset->getRealFullPath()
                    ];
                    $data['data'][] = $record;
                }
            }

            $catId = $category->getId();

            // get assets where property AssetCategory1 == $category
            // get assets where property AssetCategory2 == $category
            // get assets where property AssetCategory3 == $category

            $select = $this->db->select()
                ->from(['properties' => 'properties'], ['cid'])
                ->where('properties.ctype = ?', 'asset')
                ->where('properties.type = ?', 'object')
                ->where('properties.name = ?', 'AssetCategory1')
                ->where('properties.data = ?', $catId);
            $rows = $this->db->fetchAll($select);

            foreach($rows as $row) {
                $asset = \Pimcore\Model\Asset::getById($row['cid']);
                $record = [
                    'id'            => $rowId++,
                    'asset_id'      => $asset->getId(),
                    'file'          => $asset->getFilename(),
                    'type'          => $asset->getType(),
                    'path'          => $asset->getPath(),
                    'mimetype'      => $asset->getMimetype(),
                    'relation'      => 'AssetCategory1',
                    'relation_id'   => $category->getId(),
                    'asset_url'     => '/website/var/assets' . $asset->getRealFullPath()
                ];
                $data['data'][] = $record;
            }

            $select = $this->db->select()
                ->from(['properties' => 'properties'], ['cid'])
                ->where('properties.ctype = ?', 'asset')
                ->where('properties.type = ?', 'object')
                ->where('properties.name = ?', 'AssetCategory2')
                ->where('properties.data = ?', $catId);
            $rows = $this->db->fetchAll($select);

            foreach($rows as $row) {
                $asset = \Pimcore\Model\Asset::getById($row['cid']);
                $record = [
                    'id'            => $rowId++,
                    'asset_id'      => $asset->getId(),
                    'file'          => $asset->getFilename(),
                    'type'          => $asset->getType(),
                    'path'          => $asset->getPath(),
                    'mimetype'      => $asset->getMimetype(),
                    'relation'      => 'AssetCategory2',
                    'relation_id'   => $category->getId(),
                    'asset_url'     => '/website/var/assets' . $asset->getRealFullPath()
                ];
                $data['data'][] = $record;
            }

            $select = $this->db->select()
                ->from(['properties' => 'properties'], ['cid'])
                ->where('properties.ctype = ?', 'asset')
                ->where('properties.type = ?', 'object')
                ->where('properties.name = ?', 'AssetCategory3')
                ->where('properties.data = ?', $catId);
            $rows = $this->db->fetchAll($select);

            foreach($rows as $row) {
                $asset = \Pimcore\Model\Asset::getById($row['cid']);
                $record = [
                    'id'            => $rowId++,
                    'asset_id'      => $asset->getId(),
                    'file'          => $asset->getFilename(),
                    'type'          => $asset->getType(),
                    'path'          => $asset->getPath(),
                    'mimetype'      => $asset->getMimetype(),
                    'relation'      => 'AssetCategory3',
                    'relation_id'   => $category->getId(),
                    'asset_url'     => '/website/var/assets' . $asset->getRealFullPath()
                ];
                $data['data'][] = $record;
            }
        }

        $data['total'] = count($data['data']);
        $this->_helper->json($data);
    }
}
