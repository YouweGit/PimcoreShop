<?php

namespace PimcoreShop;

use Pimcore\API\Plugin as PluginLib;

class Plugin extends PluginLib\AbstractPlugin implements PluginLib\PluginInterface
{
    public function init()
    {
        parent::init();

        // using anonymous function
        \Pimcore::getEventManager()->attach("object.preAdd", function ($event) {

            // do something
            $object = $event->getTarget();

            if(get_class($object) == 'Pimcore\Model\Object\Product') {

                /* @var \Pimcore\Model\Object\Product $object */
                // make sure the connections to the site(s) exist
                $sitesLister = new \Pimcore\Model\Object\Site\Listing();
                $sites = $sitesLister->getObjects();
                $siteProds = $object->getProductSites()?:[];
                $siteIds = [];

                foreach($siteProds as $siteProd) {
                    $site = $siteProd->getSite();
                    $siteIds[$site->getId()] = true;
                }

                foreach($sites as $site) {
                    // check if site id exists in existing array
                    // add it if it does not
                    if(!isset($siteIds[$site->getId()])) {

                        $siteProduct = new \Pimcore\Model\Object\ProductSite();
                        $siteProduct->setSite($site);
                        $siteProduct->setParent(\Pimcore\Model\Object\Service::createFolderByPath('/product_sites'));
                        $siteProduct->setKey(uniqid('productsite'));
                        $siteProduct->save();
                        $siteProds[] = $siteProduct;

                    }
                }

                $object->setProductSites($siteProds);

            }
        });



        // using anonymous function
        \Pimcore::getEventManager()->attach("asset.postAdd", function ($event) {

            \Pimcore\Log\Simple::log('asset-post-add', 'triggered');

            // do something
            $object = $event->getTarget();

            // ["folder", "image", "text", "audio", "video", "document", "archive", "unknown"];

            if(in_array($object->getType(), ['text', 'document', 'archive', 'unknown'])) {

                /* @var \Pimcore\Model\Asset $object */
                // name,                type,       data,       inherited,      inheritable
                // ArticleNumber
                // CategoryNumber
                // Assets Categories

                $object->setCustomSetting('ArticleNumber', null);
                $object->setProperty('ArticleNumber', 'Text', null, null, true);
                $object->setProperty('CategoryNumber', 'Text', null, null, true);
                $object->setProperty('AssetCategory1', 'Object', null, null, true);
                $object->setProperty('AssetCategory2', 'Object', null, null, true);
                $object->setProperty('AssetCategory3', 'Object', null, null, true);
                $object->save();

            }
        });

    }

    public static function install()
    {
        // implement your own logic here
        return true;
    }

    public static function uninstall()
    {
        // implement your own logic here
        return true;
    }

    public static function isInstalled()
    {
        // implement your own logic here
        return true;
    }
}
