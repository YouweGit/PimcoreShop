<?php

class PimcoreShop_AssetfileController extends \Pimcore\Controller\Action\Admin
{

    public function getAction() {

        $productId = $this->getParam('productId', null);
        $product = \Pimcore\Model\Object\Product::getById($productId);

        if(!$product) {
            $data['success'] = false;
            $this->_helper->json($data);
        }

        $data = [];
        $data['success'] = true;
        $data['data'] = [];

        for($i = 1; $i < 10; $i++) {
            $record = [
                'id'            => $i,
                'file'          => 'filename ' . $i,
                'type'          => 'filetype ' . $i,
                'mimetype'      => 'mimetype ' . $i,
                'relation'      => 'relation ' . $i,
                'relation_id'   => 'relation_id ' . $i,
            ];
            $data['data'][] = $record;
        }

        $this->_helper->json($data);

    }

}
