Ext.define('FacilDesktop.ProdutoLista', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],
    id: '_modProdutoLista',
    init: function () {
        /*this.launcher = {
         text: 'Tab Window',
         iconCls:'tabs'
         }*/
    },
	refreshView: function() {
		MyDesktop.getModule('_modProdutoLista').fetchList();
	},
	fetchList: function() {
		var _objParams = {
			p: MyDesktop.getCompany.code,
			acao: "listar"
		};

		Ext.Ajax.request({
			url: getURL() + 'app/controller/produto.php',
			params: _objParams,
			success: function (_resposta, opts) {
				var dados = Ext.decode(_resposta.responseText);
				Ext.ComponentQuery.query('#gridProdutosCadastradas')[0].store.loadData(dados);
			}
		});

		setTimeout(function () {
			Ext.ComponentQuery.query('#busca_produto')[0].focus();
		}, 1200);
	},
    filtro: '',
    createWindow: function () {
        var desktop = this.app.getDesktop();
        if (!Ext.ComponentQuery.query('#_winProdutoLista')[0]) {
            _winProdutoLista = desktop.createWindow({
                itemId: '_winProdutoLista',
                alias: 'widget.produtoListaAlias',
                title: 'Medicamentos Cadastrados',
                width: 800,
                height: 400,
                x: 300,
                y: 30,
                iconCls: 'icon-grid',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                listeners: {
                    'afterrender': function () {
						MyDesktop.getModule('_modProdutoLista').fetchList();
                    }
                },
                items: [
                    Ext.widget({
                        xtype: 'form',
                        itemId: 'produtoListaForm',
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
                                                itemId: 'busca_produto',
                                                fieldLabel: 'Medicamento',
                                                width: 405,
                                                labelWidth: 80,
                                                selectOnFocus: true,
                                                listeners: {
                                                    'change': function (combo) {
                                                        if (combo.getValue() == '') {
                                                            Ext.ComponentQuery.query('#gridProdutosCadastradas')[0].store.removeAll();
                                                            Ext.ComponentQuery.query('#gridProdutosCadastradas')[0].store.load();
                                                        } else {
                                                            MyDesktop.getModule('_modProdutoLista').filtro += '&prd_name=' + combo.getValue();
                                                            Ext.Ajax.request({
                                                                url: getURL() + 'app/controller/produto.php',
                                                                params: {
																	p: MyDesktop.getCompany.code,
																	acao: "autocomplete",
																	query:  Ext.ComponentQuery.query('#busca_produto')[0].getValue()
																},
                                                                success: function (_resposta, opts) {
																	var dados = Ext.decode(_resposta.responseText);
                                                                    Ext.ComponentQuery.query('#gridProdutosCadastradas')[0].store.removeAll();
                                                                    Ext.ComponentQuery.query('#gridProdutosCadastradas')[0].store.add(dados.data);
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
                                itemId: 'gridProdutosCadastradas',
                                height: 320,
                                store: {type: 'Produto', autoLoad:false},
								autoLoad:false,
                                columns: [
                                    {id: 'prd_codigo', text: 'Código', dataIndex: 'prd_codigo', hidden: true},
									{id: 'prd_name', text: 'Nome', dataIndex: 'prd_name', flex: 1},
									{id: 'dcb_codigo', text: 'Código DCB', dataIndex: 'dcb_codigo'},
									{
										id: 'prd_edit',
										renderer: function() {
											return Ext.String.format('<img src="'+ getURL() + 'resources/images/certo.png" />');
										},
										dataIndex:'image',
										width: 40
									},
									{
										id: 'prd_exclude',
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
											MyDesktop.getModule('_modProduto').carregarProduto(thisGrid.getSelection()[0].data.prd_codigo);
											_winProdutoLista.close();
										}
										
										if(columnIndex == 4) {
											Ext.Msg.confirm('Atenção', "Tem certeza que deseja excluir este medicamento?", function (_res) {
												if (_res == 'yes') {
													Ext.Ajax.request({
														url: getURL() + 'app/controller/produto.php',
														method: 'post',
														params: {
															acao: "remove",
															p: MyDesktop.getCompany.code,
															prd_codigo: thisGrid.getSelection()[0].data.prd_codigo
														},
														success: function (_resposta, opts) {
															Ext.Msg.alert('Atenção','O medicamento foi excluído com sucesso.',function(){
																MyDesktop.getModule('_modProdutoLista').fetchList();
																MyDesktop.fixMsgBox(_winProduto);
															});
														},
														failure: function (_resposta, opts) {
															Ext.Msg.alert('Atenção','Houve um erro ao excluir o medicamento!',function(){
																MyDesktop.fixMsgBox(_winProduto);
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
        return _winProdutoLista;
    }
});