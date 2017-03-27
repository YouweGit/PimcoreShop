pimcore.registerNS("pimcore.plugin.pimcoreshop");

pimcore.plugin.pimcoreshop = Class.create(pimcore.plugin.admin, {
    getClassName: function () {
        return "pimcore.plugin.pimcoreshop";
    },

    filesTabName: 'FilesTab',
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
                if (items.length > 0) {
                    for (var i = 0; i < items[0].items.length; i++) {
                        var item = items[0].items[i];

                        switch (item.name) {
                            case pimcoreshopPlugin.filesTabName:
                                this.relationsPanel = filesPanel.getPanel(this.object.data.general.o_id);
                                break;
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

