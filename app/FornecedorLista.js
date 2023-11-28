Ext.define('FacilDesktop.FornecedorLista', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],
    id: '_modFornecedorLista',
    init: function () {
        /*this.launcher = {
         text: 'Tab Window',
         iconCls:'tabs'
         }*/
    },
	refreshView: function() {
		MyDesktop.getModule('_modFornecedorLista').fetchList();
	},
	fetchList: function() {
		var _objParams = {
			p: MyDesktop.getCompany.code,
			acao: "listar"
		};

		Ext.Ajax.request({
			url: getURL() + 'app/controller/fornecedor.php',
			params: _objParams,
			success: function (_resposta, opts) {
				var dados = Ext.decode(_resposta.responseText);
				Ext.ComponentQuery.query('#gridFornecedorsCadastradas')[0].store.loadData(dados);
			}
		});

		setTimeout(function () {
			Ext.ComponentQuery.query('#busca_fornecedor')[0].focus();
		}, 1200);
	},
    filtro: '',
    createWindow: function () {
        var desktop = this.app.getDesktop();
        if (!Ext.ComponentQuery.query('#_winFornecedorLista')[0]) {
            _winFornecedorLista = desktop.createWindow({
                itemId: '_winFornecedorLista',
                alias: 'widget.fornecedorListaAlias',
                title: 'Fornecedores Cadastrados',
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
						MyDesktop.getModule('_modFornecedorLista').fetchList();
                    }
                },
                items: [
                    Ext.widget({
                        xtype: 'form',
                        itemId: 'fornecedorListaForm',
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
                                                itemId: 'busca_fornecedor',
                                                fieldLabel: 'Fornecedor',
                                                width: 405,
                                                labelWidth: 70,
                                                selectOnFocus: true,
                                                listeners: {
                                                    'change': function (combo) {
                                                        if (combo.getValue() == '') {
                                                            Ext.ComponentQuery.query('#gridFornecedorsCadastradas')[0].store.removeAll();
                                                            Ext.ComponentQuery.query('#gridFornecedorsCadastradas')[0].store.load();
                                                        } else {
                                                            MyDesktop.getModule('_modFornecedorLista').filtro += '&for_name=' + combo.getValue();
                                                            Ext.Ajax.request({
                                                                url: getURL() + 'app/controller/fornecedor.php',
                                                                params: {
																	p: MyDesktop.getCompany.code,
																	acao: "autocomplete",
																	for_name:  Ext.ComponentQuery.query('#busca_fornecedor')[0].getValue()
																},
                                                                success: function (_resposta, opts) {
                                                                    Ext.ComponentQuery.query('#gridFornecedorsCadastradas')[0].store.removeAll();
                                                                    Ext.ComponentQuery.query('#gridFornecedorsCadastradas')[0].store.add(Ext.decode(_resposta.responseText));
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
                                itemId: 'gridFornecedorsCadastradas',
                                height: 320,
                                store: {type: 'Fornecedor', autoLoad:false},
								autoLoad:false,
                                columns: [
                                    {id: 'for_codigo', text: 'Código', dataIndex: 'for_codigo', hidden: true},
									{id: 'for_name', text: 'Nome', dataIndex: 'for_name', flex: 1},
									{id: 'for_cnpj', text: 'CNPJ', dataIndex: 'for_cnpj', width: 140},
									{id: 'for_telefone', text: 'Telefone', dataIndex: 'for_telefone', width: 110},
									{
										id: 'for_edit',
										renderer: function() {
											return Ext.String.format('<img src="'+ getURL() + 'resources/images/certo.png" />');
										},
										dataIndex:'image',
										width: 40
									},
									{
										id: 'for_exclude',
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
											MyDesktop.getModule('_modFornecedor').carregarFornecedor(thisGrid.getSelection()[0].data.for_codigo);
											_winFornecedorLista.close();
										}
										
										if(columnIndex == 5) {
											Ext.Msg.confirm('Atenção', "Tem certeza que deseja excluir esta fornecedor?", function (_res) {
												if (_res == 'yes') {
													Ext.Ajax.request({
														url: getURL() + 'app/controller/fornecedor.php',
														method: 'post',
														params: {
															acao: "remove",
															p: MyDesktop.getCompany.code,
															for_codigo: thisGrid.getSelection()[0].data.for_codigo
														},
														success: function (_resposta, opts) {
															Ext.Msg.alert('Atenção','A fornecedor foi excluído com sucesso.',function(){
																MyDesktop.getModule('_modFornecedorLista').fetchList();
																MyDesktop.fixMsgBox(_winFornecedor);
															});
														},
														failure: function (_resposta, opts) {
															Ext.Msg.alert('Atenção','Houve um erro ao excluir a fornecedor!',function(){
																MyDesktop.fixMsgBox(_winFornecedor);
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
        return _winFornecedorLista;
    }
});