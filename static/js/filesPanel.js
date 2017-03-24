pimcore.registerNS('pimcore.plugin.pimcoreshop.filesPanel');

// Ext.define('ProductTaxonomy', {
//     extend: 'Ext.data.Model',
//     fields: [
//         {
//             name: 'id',
//             type: 'auto'
//         }, {
//             name: 'objectId',
//             type: 'int'
//         },
//         {
//             name: 'name',
//             type: 'string'
//         },
//         {
//             name: 'expanded',
//             type: 'boolean',
//             defaultValue: true,
//             persist: false
//         }
//     ],
//     proxy: {
//         type: 'ajax',
//         api: {
//             read: '/plugin/pimcoreshop/product/get'
//         }
//     }
// });


Ext.define('AssetFile', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    },
        'file',
        'path',
        'type',
        'mimetype',
        'relation',
        'relation_id',
        'download_link'
    ],
    proxy: {
        type: 'ajax',
        api: {
            read: '/plugin/PimcoreShop/assetfile/get'
        }
    }
});

pimcore.plugin.pimcoreshop.filesPanel = Class.create({
    getPanel: function (id) {
        // var store = Ext.create('Ext.data.TreeStore', {
        //     model: 'ProductTaxonomy',
        //     root: {
        //         name: 'Taxonomies',
        //         expanded: true
        //     },
        //     listeners: {
        //         beforeload: function (store) {
        //             store.getProxy().setExtraParam('productId', id);
        //         }
        //     }
        // });

        // return Ext.create('Ext.tree.Panel', {
        //     width: '100%',
        //     height: '100%',
        //     store: store,
        //     animate: false,
        //     reserveScrollbar: true,
        //     columns: [{
        //         xtype: 'treecolumn',
        //         header: 'Name',
        //         dataIndex: 'name',
        //         resizable: false,
        //         sortable: false,
        //         flex: 1
        //     }],
        //     listeners: {
        //         itemdblclick: function (el, record) {
        //             if (record.childNodes.length === 0) { // only lowest level items.
        //                 pimcore.helpers.openObject(record.data.objectId, 'object');
        //             }
        //         },
        //         itemcontextmenu: function (tree, record, item, index, event) {
        //             var menu = contextualMenu.getMenu(record.data.objectId);
        //
        //             event.stopEvent();
        //             menu.showAt(event.getXY());
        //         }
        //     }
        // });


        // ========= EXAMPLE

        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            // autoSync: true,
            model: 'AssetFile',
            // proxy: {
            //     type: 'rest',
            //     url: 'app.php/users',
            //     reader: {
            //         type: 'json',
            //         rootProperty: 'data'
            //     },
            //     writer: {
            //         type: 'json'
            //     }
            // },
            listeners: {
                beforeload: function (store) {
                    store.getProxy().setExtraParam('productId', id);
                }
            }
            // listeners: {
            //     write: function(store, operation){
            //         var record = operation.getRecords()[0],
            //             name = Ext.String.capitalize(operation.action),
            //             verb;
            //
            //
            //         if (name == 'Destroy') {
            //             verb = 'Destroyed';
            //         } else {
            //             verb = name + 'd';
            //         }
            //         Ext.example.msg(name, Ext.String.format("{0} user: {1}", verb, record.getId()));
            //
            //     }
            // }
        });

        // var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        //     listeners: {
        //         cancelEdit: function(rowEditing, context) {
        //             // Canceling editing of a locally added, unsaved record: remove it
        //             if (context.record.phantom) {
        //                 store.remove(context.record);
        //             }
        //         }
        //     }
        // });

        var grid = Ext.create('Ext.grid.Panel', {
            // renderTo: document.body,
            // plugins: [rowEditing],
            // width: 500,
            // height: 330,
            // frame: true,
            // title: 'Files',
            store: store,
            // iconCls: 'icon-user',
            columns: [{
                text: 'id',
                width: 50,
                sortable: true,
                dataIndex: 'id'
                // ,
                // renderer: function(v, meta, rec) {
                //     return rec.phantom ? '' : v;
                // }
            }, {
                text: 'File',
                flex: 1,
                sortable: true,
                dataIndex: 'file'
            }, {
                header: 'Path',
                width: 120,
                sortable: true,
                dataIndex: 'path'
            }, {
                text: 'Type',
                width: 120,
                sortable: true,
                dataIndex: 'type'
            }, {
                text: 'Mimetype',
                width: 120,
                sortable: true,
                dataIndex: 'mimetype'
            }, {
                text: 'Relation',
                width: 120,
                sortable: true,
                dataIndex: 'relation'
            }, {
                text: 'Relation id',
                width: 120,
                sortable: true,
                dataIndex: 'relation_id'
            }]
            // ,
            // dockedItems: [{
            //     xtype: 'toolbar',
            //     items: [{
            //         text: 'Add',
            //         iconCls: 'icon-add',
            //         handler: function(){
            //             // empty record
            //             var rec = new Person();
            //             store.insert(0, rec);
            //             rowEditing.startEdit(rec, 0);
            //         }
            //     }, '-', {
            //         itemId: 'delete',
            //         text: 'Delete',
            //         iconCls: 'icon-delete',
            //         disabled: true,
            //         handler: function(){
            //             var selection = grid.getView().getSelectionModel().getSelection()[0];
            //             if (selection) {
            //                 store.remove(selection);
            //             }
            //         }
            //     }]
            // }]

        });

        // grid.getSelectionModel().on('selectionchange', function(selModel, selections){
        //     grid.down('#delete').setDisabled(selections.length === 0);
        // });

        return grid;

        // ========= TEST
        // return Ext.create('Ext.panel.Panel', {
        //    html: 'files here'
        // });
    }
});

var filesPanel = new pimcore.plugin.pimcoreshop.filesPanel();