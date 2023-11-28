Ext.define('FacilDesktop.LoteLista', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],
    id: '_modLoteLista',
    init: function () {
        /*this.launcher = {
			 text: 'Tab Window',
			 iconCls:'tabs'
         }*/
    },
	refreshView: function() {
		MyDesktop.getModule('_modLoteLista').fetchList();
	},
	fetchList: function() {
		var _objParams = {
			p: MyDesktop.getCompany.code,
			acao: "listar"
		};

		Ext.Ajax.request({
			url: getURL() + 'app/controller/lote.php',
			params: _objParams,
			success: function (_resposta, opts) {
				var dados = Ext.decode(_resposta.responseText);
				Ext.ComponentQuery.query('#gridLotesCadastrados')[0].store.loadData(dados);
			}
		});

		setTimeout(function () {
			Ext.ComponentQuery.query('#busca_lote')[0].focus();
		}, 1200);
	},
    filtro: '',
    createWindow: function () {
        var desktop = this.app.getDesktop();
        if (!Ext.ComponentQuery.query('#_winLoteLista')[0]) {
            _winLoteLista = desktop.createWindow({
                itemId: '_winLoteLista',
                alias: 'widget.loteListaAlias',
                title: 'Lotes Cadastrados',
                width: 640,
                height: 400,
                x: 300,
                y: 30,
                iconCls: 'icon-grid',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                listeners: {
                    'afterrender': function () {
						MyDesktop.getModule('_modLoteLista').fetchList();
                    }
                },
                items: [
                    Ext.widget({
                        xtype: 'form',
                        itemId: 'loteListaForm',
                        collapsible: false,
                        bodyPadding: 5,
                        width: '100%',
                        fieldDefaults: {
                            labelAlign: 'left',
                            msgTarget: 'side'
                        },
                        defaults: {
                            anchor: '100%'
                        },
                        items: [
                            {
                                xtype: 'container',
                                layout: 'vbox',
                                items: [
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        border: false,
                                        defaultType: 'textfield',
                                        height: 35,
                                        items: [
                                            {
                                                itemId: 'busca_lote',
                                                fieldLabel: 'Lote',
                                                width: 405,
                                                labelWidth: 60,
                                                selectOnFocus: true,
                                                listeners: {
                                                    'change': function (combo) {
                                                        if (combo.getValue() == '') {
                                                            Ext.ComponentQuery.query('#gridLotesCadastrados')[0].store.removeAll();
                                                            Ext.ComponentQuery.query('#gridLotesCadastrados')[0].store.load();
                                                        } else {
                                                            MyDesktop.getModule('_modLoteLista').filtro += '&lot_name=' + combo.getValue();
                                                            Ext.Ajax.request({
                                                                url: getURL() + 'app/controller/lote.php',
                                                                params: {
																	p: MyDesktop.getCompany.code,
																	acao: "autocomplete",
																	lot_name:  Ext.ComponentQuery.query('#busca_lote')[0].getValue()
																},
                                                                success: function (_resposta, opts) {
                                                                    Ext.ComponentQuery.query('#gridLotesCadastrados')[0].store.removeAll();
                                                                    Ext.ComponentQuery.query('#gridLotesCadastrados')[0].store.add(Ext.decode(_resposta.responseText));
                                                                }
                                                            });
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            Ext.create('Ext.grid.Panel', {
                                header: false,
                                itemId: 'gridLotesCadastrados',
                                height: 320,
                                store: {type: 'Lote', autoLoad:false},
								autoLoad:false,
                                columns: [
                                    {id: 'lot_codigo', text: 'Código', dataIndex: 'lot_codigo', hidden: true},
									{xtype:'datecolumn', text:'Fabricação', format:'d/m/Y' ,dataIndex:'lot_manufacturing', width: 140},
									{xtype:'datecolumn', text:'Validade', format:'d/m/Y' ,dataIndex:'lot_validate', width: 140},
									{id: 'lot_name', text: 'Lote', dataIndex: 'lot_name', flex: 1},
									{
										id: 'lot_edit',
										renderer: function() {
											return Ext.String.format('<img src="'+ getURL() + 'resources/images/certo.png" />');
										},
										dataIndex:'image',
										width: 40
									},
									{
										id: 'lot_exclude',
										renderer: function() {
											return Ext.String.format('<img src="'+ getURL() + 'resources/images/delete.png" />');
										},
										dataIndex:'image',
										width: 40
									}
                                ],
                                listeners: {
									'cellclick': function(thisGrid, rowIndex, columnIndex, e) {
										var columnid = thisGrid.getColumnManager().getLast().id;
										
										if(columnIndex == 4) {
											MyDesktop.getModule('_modLote').carregarLote(thisGrid.getSelection()[0].data.lot_codigo);
											_winLoteLista.close();
										}
										
										if(columnIndex == 5) {
											Ext.Msg.confirm('Atenção', "Tem certeza que deseja excluir este lote?", function (_res) {
												if (_res == 'yes') {
													Ext.Ajax.request({
														url: getURL() + 'app/controller/lote.php',
														method: 'post',
														params: {
															acao: "remove",
															p: MyDesktop.getCompany.code,
															lot_codigo: thisGrid.getSelection()[0].data.lot_codigo
														},
														success: function (_resposta, opts) {
															Ext.Msg.alert('Atenção','A lote foi excluído com sucesso.',function(){
																MyDesktop.getModule('_modLoteLista').fetchList();
																MyDesktop.getModule('_modLote').clearData();
																MyDesktop.fixMsgBox(_winLote);
															});
														},
														failure: function (_resposta, opts) {
															Ext.Msg.alert('Atenção','Houve um erro ao excluir a lote!',function(){
																MyDesktop.fixMsgBox(_winLote);
															});
														}
													});
												}
											});
										}
									}
                                }
                            })
                        ]
                    })

                ]
            });
        }
        return _winLoteLista;
    }
});