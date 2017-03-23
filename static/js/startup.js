pimcore.registerNS("pimcore.plugin.pimcoreshop");

pimcore.plugin.pimcoreshop = Class.create(pimcore.plugin.admin, {
    getClassName: function () {
        return "pimcore.plugin.pimcoreshop";
    },

    filesTabName: 'FilesTab',
    // taxonomiesTabName: 'productTaxonomies',
    // dealTreeViewTabName: 'dealTreeView',
    // dealAdditionalMarginViewName: 'additionalMarginsTab',
    // brandSuppliersTabName: 'brandSuppliers',
    // supplierTreeViewTabName: 'supplierTreeView',
    // supplierTasksViewTabName: 'supplierTasksView',

    initialize: function () {
        pimcore.plugin.broker.registerPlugin(this);

        Ext.override(pimcore.object.edit, {
            relationsPanel: null,

            getLayout: function (conf) {
                if (this.layout == null) {
                    var items = [];
                    if (conf) {
                        items = this.getRecursiveLayout(conf).items;
                    }

                    // custom functions
                    pimcoreshopPlugin.setData(this.object.data.general);
                    this.detectTab(items);

                    this.layout = Ext.create('Ext.panel.Panel', {
                        title: t('edit'),
                        bodyStyle: 'background-color: #fff;',
                        padding: 10,
                        border: false,
                        //layout: 'border',
                        layout: "fit",
                        iconCls: "pimcore_icon_edit",
                        cls: "pimcore_object_panel_edit",
                        items: items,
                        listeners: {
                            afterrender: function () {
                                pimcore.layout.refresh();
                            }
                        }
                    });
                }

                return this.layout;
            },
            detectTab: function (items) {
                console.log(items);
                // start of my custom solution
                if (items.length > 0) {
                    // I don't know what I'm doing but it works *shrug*
                    for (var i = 0; i < items[0].items.length; i++) {
                        var item = items[0].items[i];

                        switch (item.name) {
                            case pimcoreshopPlugin.filesTabName:
                                // alert('ASDF');
                                this.relationsPanel = filesPanel.getPanel(this.object.data.general.o_id);
                                break;
                            // case pimcoreshop.dealAdditionalMarginViewName:
                            //     items[0].items[i].items = [dealAdditionalMarginPanel.getPanel(this.object.data.general.o_id)];
                            //     break;
                            // case pimcoreshop.dealTreeViewTabName:
                            //     this.relationsPanel = dealPanel.getPanel(this.object.data.general.o_id);
                            //     break;
                            // case pimcoreshop.brandSuppliersTabName:
                            //     this.relationsPanel = brandPanel.getPanel(this.object.data.general.o_id);
                            //     break;
                            // case pimcoreshop.supplierTreeViewTabName:
                            //     this.relationsPanel = supplierPanel.getPanel(this.object.data.general.o_id);
                            //     break;
                            // case pimcoreshop.supplierTasksViewTabName:
                            //     this.relationsPanel = supplierTasksPanel.getPanel(this.object.data.general.o_id);
                            //     break;
                        }

                        if (this.relationsPanel !== null) {
                            item.items = [
                                this.relationsPanel
                            ];
                        }
                    }
                }
            }
        });
    },
    setData: function (data) {
        pimcoreshopPlugin.data = data;
    }
});

var pimcoreshopPlugin = new pimcore.plugin.pimcoreshop();

