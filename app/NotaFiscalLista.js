Ext.define('FacilDesktop.NotaFiscalLista', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],
    id: '_modNotaFiscalLista',
    init: function () {
        /*this.launcher = {
         text: 'Tab Window',
         iconCls:'tabs'
         }*/
    },
	refreshView: function() {
		MyDesktop.getModule('_modNotaFiscalLista').fetchList();
	},
	fetchList: function() {
		var _objParams = {
			p: MyDesktop.getCompany.code,
			acao: "listar"
		};

		Ext.Ajax.request({
			url: getURL() + 'app/controller/notaFiscal.php',
			params: _objParams,
			success: function (_resposta, opts) {
				var dados = Ext.decode(_resposta.responseText);
				Ext.ComponentQuery.query('#gridNotaFiscaisCadastradas')[0].store.loadData(dados);
			}
		});

		setTimeout(function () {
			Ext.ComponentQuery.query('#busca_notaFiscal')[0].focus();
		}, 1200);
	},
    filtro: '',
    createWindow: function () {
        var desktop = this.app.getDesktop();
        if (!Ext.ComponentQuery.query('#_winNotaFiscalLista')[0]) {
            _winNotaFiscalLista = desktop.createWindow({
                itemId: '_winNotaFiscalLista',
                alias: 'widget.notaFiscalListaAlias',
                title: 'Notas Fiscais Cadastradas',
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
						MyDesktop.getModule('_modNotaFiscalLista').fetchList();
                    }
                },
                items: [
                    Ext.widget({
                        xtype: 'form',
                        itemId: 'notaFiscalListaForm',
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
                                                itemId: 'busca_notaFiscal',
                                                fieldLabel: 'NotaFiscal',
                                                width: 405,
                                                labelWidth: 60,
                                                selectOnFocus: true,
                                                listeners: {
                                                    'change': function (combo) {
                                                        if (combo.getValue() == '') {
                                                            Ext.ComponentQuery.query('#gridNotaFiscaisCadastradas')[0].store.removeAll();
                                                            Ext.ComponentQuery.query('#gridNotaFiscaisCadastradas')[0].store.load();
                                                        } else {
                                                            MyDesktop.getModule('_modNotaFiscalLista').filtro += '&ntf_name=' + combo.getValue();
                                                            Ext.Ajax.request({
                                                                url: getURL() + 'app/controller/notaFiscal.php',
                                                                params: {
																	p: MyDesktop.getCompany.code,
																	acao: "autocomplete",
																	for_name:  Ext.ComponentQuery.query('#busca_notaFiscal')[0].getValue()
																},
                                                                success: function (_resposta, opts) {
                                                                    Ext.ComponentQuery.query('#gridNotaFiscaisCadastradas')[0].store.removeAll();
                                                                    Ext.ComponentQuery.query('#gridNotaFiscaisCadastradas')[0].store.add(Ext.decode(_resposta.responseText));
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
                                itemId: 'gridNotaFiscaisCadastradas',
                                height: 320,
                                store: {type: 'NotaFiscal', autoLoad:false},
								autoLoad:false,
                                columns: [
                                    {id: 'ntf_codigo', dataIndex: 'ntf_codigo', hidden: true},
                                    {id: 'ntf_numero', text: 'Número', dataIndex: 'ntf_numero'},
									{id: 'for_name', text: 'Fornecedor', dataIndex: 'for_name', flex: 1},
									{
										id: 'ntf_edit',
										renderer: function() {
											return Ext.String.format('<img src="'+ getURL() + 'resources/images/certo.png" />');
										},
										dataIndex:'image',
										width: 40
									},
									{
										id: 'ntf_exclude',
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
										
										if(columnIndex == 3) {
											MyDesktop.getModule('_modNotaFiscal').carregarNotaFiscal(thisGrid.getSelection()[0].data.ntf_codigo);
											_winNotaFiscalLista.close();
										}
										
										if(columnIndex == 4) {
											Ext.Msg.confirm('Atenção', "Tem certeza que deseja excluir esta notaFiscal?", function (_res) {
												if (_res == 'yes') {
													Ext.Ajax.request({
														url: getURL() + 'app/controller/notaFiscal.php',
														method: 'post',
														params: {
															acao: "remove",
															p: MyDesktop.getCompany.code,
															ntf_codigo: thisGrid.getSelection()[0].data.ntf_codigo
														},
														success: function (_resposta, opts) {
															Ext.Msg.alert('Atenção','A notaFiscal foi excluída com sucesso.',function(){
																MyDesktop.getModule('_modNotaFiscalLista').fetchList();
																MyDesktop.fixMsgBox(_winNotaFiscal);
															});
														},
														failure: function (_resposta, opts) {
															Ext.Msg.alert('Atenção','Houve um erro ao excluir a notaFiscal!',function(){
																MyDesktop.fixMsgBox(_winNotaFiscal);
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
        return _winNotaFiscalLista;
    }
});