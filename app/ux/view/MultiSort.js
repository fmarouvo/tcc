Ext.define('FacilDesktop.ux.view.MultiSort', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.toolbar.TextItem',
        'Ext.view.View',
        'Ext.ux.DataView.Animated'
    ],

    xtype: 'dataview-multisort',
    width: 540,
    layout: 'fit',

    initComponent: function () {

        if (!this.height) {
            this.height = 600;
        }
        this.tbar = {
            plugins: {
                xclass: 'Ext.ux.BoxReorderer',
                listeners: {
                    scope: this,
                    drop: this.updateStoreSorters
                }
            },
            defaults: {
                listeners: {
                    scope: this,
                    changeDirection: this.updateStoreSorters
                }
            },
            items: [{
                xtype: 'tbtext',
                text: 'Ordenar:',
                reorderable: false
            }, {
                xtype: 'dataview-multisort-sortbutton',
                text: 'Tipo',
                dataIndex: 'type'
            }, {
                xtype: 'dataview-multisort-sortbutton',
                text: 'Nome',
                dataIndex: 'name'
            }]
        };

        if (!this.imageField) {
            this.imageField = 'image';
        }
        ;

        if (!this.tpl) {
            var _tpl = [
                '<tpl for=".">',
                '<tpl for="images">',
                '<tpl if="name==\'' + this.imageField + '\'">',
                '<div class="dataview-multisort-item">',
                '<img src="resources/images/testeGaleria/{value}" />',
                //'<div class="dataview-text">{name}</div>',
                '</div>',
                '</tpl>',
                '</tpl>',
                '</tpl>'
            ]
        } else {
            _tpl = this.tpl;
        }
        if (!this.itemSelector) {
            itemSelector = 'img';
        } else {
            itemSelector = this.itemSelector;
        }
        this.items = {
            xtype: 'dataview',
            plugins: {
                xclass: 'Ext.ux.DataView.Animated'
            },
            tpl: _tpl,
            itemSelector: 'div.dataview-multisort-item',

            store: this.store
        };
        this.lastItem = null;
        var _me = this;
        this.listeners = {
            click: {
                element: 'el',
                fn: function (_self) {

                    if (_self.record) {

                        var _index = 0;

                        for (_text in _self.record.data) {
                            if (_text == _me.imageField) {
                                break;
                            } else {
                                _index++;
                            }
                        }

                        Ext.ComponentQuery.query('#user_img')[0].getEl().dom.src = 'resources/images/testeGaleria/' + _self.record.data.images[_index].value;

                        var _items = [];

                        for (var _i = 0; _i < _self.record.data.images.length; _i++) {
                            Ext.each(_self.record.data.images[_i], function (_obj) {

                                for (var _prop in _obj) {
                                    if (_obj.hasOwnProperty(_prop)) {

                                        var _item = {};

                                        if (_prop == 'type') {
                                            var _xtype = _obj[_prop];
                                        } else if (_prop == 'name') {
                                            var _label = _obj[_prop];
                                        } else if (_prop == 'value') {
                                            var _value = _obj[_prop];
                                        }

                                        /*	para combobox
                                         else if(_prop=='other'){

                                         var _extraParams = '{"states":"Ext.create(\'Ext.data.Store\', {fields: [\'abbr\', \'name\'],data : [{\'abbr\':\'AL\', \'name\':\'Alabama\'},{\'abbr\':\'AZ\', \'name\':\'Arizona\'}]})"}';

                                         var _objExtraParams = Ext.decode(_extraParams);
                                         var _extraParamsKeys=Object.keys(_objExtraParams);	//chaves do obj extraparams

                                         for(var _i=0; _i<_extraParamsKeys.length;_i++){
                                         var _value;
                                         if(Ext.decode(_objExtraParams._extraParamsKeys[_i])){
                                         _value = Ext.decode(_objExtraParams._extraParamsKeys[_i]);
                                         }else{
                                         _value = _objExtraParams._extraParamsKeys[_i];
                                         }
                                         _item._extraParamsKeys[_i]=_value;
                                         }

                                         }*/

                                        _item = {
                                            xtype: _xtype,
                                            width: '90%',
                                            fieldLabel: MyDesktop.toUpperCaseFirst(_label),
                                            labelWidth: 70,
                                            value: _value
                                        };
                                        _items.push(_item);
                                    }
                                }

                            })
                        }

                        var _buttonObj = {
                            layout: 'hbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Excluir',
                                    margin: '0 10 0 0',
                                    handler: {}
                                },
                                {
                                    xtype: 'button',
                                    text: 'salvar',
                                    handler: {}
                                }
                            ]
                        };

                        _items.push(_buttonObj);

                        var _newCmp = Ext.create('Ext.form.Panel', {
                            layout: 'fit',
                            items: [
                                {
                                    layout: 'vbox',
                                    items: _items
                                }
                            ],
                            itemId: 'formItem'
                        });

                        Ext.ComponentQuery.query('#_winGaleriaForm')[0].remove(Ext.ComponentQuery.query('#formItem')[0], true);
                        Ext.ComponentQuery.query('#_winGaleriaForm')[0].add(_newCmp);
                        Ext.ComponentQuery.query('#_winGaleriaForm')[0].doLayout();
                    }
                }
            }
        }

        this.callParent(arguments);
        this.updateStoreSorters();
    },

    /**
     * Returns the array of Ext.util.Sorters defined by the current toolbar button order
     * @return {Array} The sorters
     */
    getSorters: function () {
        var buttons = this.query('toolbar dataview-multisort-sortbutton'),
            sorters = [];
        Ext.Array.each(buttons, function (button) {
            sorters.push({
                property: button.getDataIndex(),
                direction: button.getDirection()
            });
        });

        return sorters;
    },

    /**
     * @private
     * Updates the DataView's Store's sorters based on the current Toolbar button configuration
     */
    updateStoreSorters: function () {
        var sorters = this.getSorters(),
            view = this.down('dataview');

        view.store.sort(sorters);
    },

    constructor: function (config) {
        this.callParent([config]);
    }
});