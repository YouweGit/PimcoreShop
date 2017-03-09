pimcore.registerNS("pimcore.plugin.pimcoreshop");

pimcore.plugin.pimcoreshop = Class.create(pimcore.plugin.admin, {
    getClassName: function() {
        return "pimcore.plugin.pimcoreshop";
    },

    initialize: function() {
        pimcore.plugin.broker.registerPlugin(this);
    },
 
    pimcoreReady: function (params,broker){
        // alert("PimcoreShop Plugin Ready!");
    }
});

var pimcoreshopPlugin = new pimcore.plugin.pimcoreshop();

