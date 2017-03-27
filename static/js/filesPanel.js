pimcore.registerNS('pimcore.plugin.pimcoreshop.filesPanel');

Ext.define('AssetFile', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    },
        'asset_id',
        'file',
        'path',
        'type',
        'mimetype',
        'relation',
        'relation_id',
        'asset_url'
    ],
    proxy: {
        type: 'ajax',
        url: '/plugin/PimcoreShop/assetfile/get',
        reader: new Ext.data.JsonReader({
            root: 'data',
            totalProperty: 'total',
            idProperty: 'id',
            successProperty: 'success'
        })
    }

});

pimcore.plugin.pimcoreshop.filesPanel = Class.create({
    getPanel: function (id) {

        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            model: 'AssetFile',
            listeners: {
                beforeload: function (store) {
                    store.getProxy().setExtraParam('productId', id);
                }
            }
        });

        var grid = Ext.create('Ext.grid.Panel', {
            store: store,
            columns: [{
                text: 'id',
                sortable: true,
                dataIndex: 'id',
                flex: 1,
                hidden: true
            }, {
                text: 'Asset Id',
                flex: 1,
                sortable: true,
                dataIndex: 'asset_id',
                hidden: true
            }, {
                text: 'File',
                flex: 2,
                sortable: true,
                dataIndex: 'file'
            }, {
                header: 'Path',
                flex: 3,
                sortable: true,
                dataIndex: 'path'
            }, {
                text: 'Type',
                flex: 1,
                sortable: true,
                dataIndex: 'type'
            }, {
                text: 'Mimetype',
                flex: 1,
                sortable: true,
                dataIndex: 'mimetype',
                hidden: true
            }, {
                text: 'Relation',
                flex: 1,
                sortable: true,
                dataIndex: 'relation'
            }, {
                text: 'Relation id',
                flex: 1,
                sortable: true,
                dataIndex: 'relation_id',
                hidden: true
            }, {
                text: 'Asset url',
                flex: 1,
                sortable: true,
                dataIndex: 'asset_url',
                hidden: true
            }, {
                xtype: 'actioncolumn',
                width: 90,
                items: [{
                    tooltip: t('download'),
                    icon: "/pimcore/static/img/icon/download-medium.png",
                    handler: function (grid, rowIndex) {
                        var item = grid.getStore().getAt(rowIndex);
                        var assetUrl = item.data.asset_url;
                        pimcore.helpers.download(assetUrl);
                    }.bind(this)
                },{
                    tooltip: t('open'),
                    icon: "/pimcore/static/img/icon/asset.png",
                    handler: function (grid, rowIndex) {
                        var item = grid.getStore().getAt(rowIndex);
                        var assetId = item.data.asset_id;
                        pimcore.helpers.openAsset(assetId);
                    }.bind(this)
                },{
                    tooltip: t('open related category'),
                    icon: "/pimcore/static/img/icon/object.png",
                    handler: function (grid, rowIndex) {
                        var item = grid.getStore().getAt(rowIndex);
                        var objectId = item.data.relation_id;
                        if(objectId) pimcore.helpers.openObject(objectId);
                    }.bind(this)
                }]
            }]
        });

        return grid;
    }
});

var filesPanel = new pimcore.plugin.pimcoreshop.filesPanel();