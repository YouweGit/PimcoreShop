<?php

namespace PimcoreShop\Controller\Plugin;

use Pimcore\Tool;

class LoginPlugin extends \Zend_Controller_Plugin_Abstract
{

    public function dispatchLoopShutdown()
    {

        if (!Tool::isHtmlResponse($this->getResponse())) {
            return;
        }

        if ($this->getRequest()->getControllerName() === 'login' &&
            $this->getRequest()->getActionName() === 'index' &&
            $this->getRequest()->getModuleName() === 'admin') {

            $code = '<div id="footleft"></div><div id="footright"></div>';

            $body = $this->getResponse()->getBody();

            // search for the end <head> tag, and insert the google analytics code before
            // this method is much faster than using simple_html_dom and uses less memory
            $headEndPosition = stripos($body, "</body>");
            if ($headEndPosition !== false) {
                $body = substr_replace($body, $code . "</body>", $headEndPosition, 7);
            }

            $this->getResponse()->setBody($body);
        }

    }

}

