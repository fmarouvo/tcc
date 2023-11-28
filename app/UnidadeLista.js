Ext.define('FacilDesktop.UnidadeLista', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],
    id: '_modUnidadeLista',
    init: function () {
        /*this.launcher = {
         text: 'Tab Window',
         iconCls:'tabs'
         }*/
    },
	refreshView: function() {
		MyDesktop.getModule('_modUnidadeLista').fetchList();
	},
	fetchList: function() {
		var _objParams = {
			p: MyDesktop.getCompany.code,
			acao: "listar"
		};

		Ext.Ajax.request({
			url: getURL() + 'app/controller/unidade.php',
			params: _objParams,
			success: function (_resposta, opts) {
				var dados = Ext.decode(_resposta.responseText);
				Ext.ComponentQuery.query('#gridUnidadesCadastradas')[0].store.loadData(dados);
			}
		});

		setTimeout(function () {
			Ext.ComponentQuery.query('#busca_unidade')[0].focus();
		}, 1200);
	},
    filtro: '',
    createWindow: function () {
        var desktop = this.app.getDesktop();
        if (!Ext.ComponentQuery.query('#_winUnidadeLista')[0]) {
            _winUnidadeLista = desktop.createWindow({
                itemId: '_winUnidadeLista',
                alias: 'widget.unidadeListaAlias',
                title: 'Unidades de Medidas Cadastradas',
                width: 430,
                height: 400,
                x: 300,
                y: 30,
                iconCls: 'icon-grid',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                listeners: {
                    'afterrender': function () {
						MyDesktop.getModule('_modUnidadeLista').fetchList();
                    }
                },
                items: [
                    Ext.widget({
                        xtype: 'form',
                        itemId: 'unidadeListaForm',
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
                                                itemId: 'busca_unidade',
                                                fieldLabel: 'Unidade',
                                                width: 405,
                                                labelWidth: 60,
                                                selectOnFocus: true,
                                                listeners: {
                                                    'change': function (combo) {
                                                        if (combo.getValue() == '') {
                                                            Ext.ComponentQuery.query('#gridUnidadesCadastradas')[0].store.removeAll();
                                                            Ext.ComponentQuery.query('#gridUnidadesCadastradas')[0].store.load();
                                                        } else {
                                                            MyDesktop.getModule('_modUnidadeLista').filtro += '&uni_name=' + combo.getValue();
                                                            Ext.Ajax.request({
                                                                url: getURL() + 'app/controller/unidade.php',
                                                                params: {
																	p: MyDesktop.getCompany.code,
																	acao: "autocomplete",
																	uni_name:  Ext.ComponentQuery.query('#busca_unidade')[0].getValue()
																},
                                                                success: function (_resposta, opts) {
                                                                    Ext.ComponentQuery.query('#gridUnidadesCadastradas')[0].store.removeAll();
                                                                    Ext.ComponentQuery.query('#gridUnidadesCadastradas')[0].store.add(Ext.decode(_resposta.responseText));
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
                                itemId: 'gridUnidadesCadastradas',
                                height: 320,
                                store: {type: 'Unidade', autoLoad:false},
								autoLoad:false,
                                columns: [
                                    {id: 'uni_code', text: 'Código', dataIndex: 'uni_codigo', hidden: true},
                                    {id: 'uni_prefix', text: 'Prefixo', dataIndex: 'uni_prefix'},
									{id: 'uni_name', text: 'Nome', dataIndex: 'uni_name', flex: 1},
									{
										id: 'uni_edit',
										renderer: function() {
											return Ext.String.format('<img src="'+ getURL() + 'resources/images/certo.png" />');
										},
										dataIndex:'image',
										width: 40
									},
									{
										id: 'uni_exclude',
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
											MyDesktop.getModule('_modUnidade').carregarUnidade(thisGrid.getSelection()[0].data.uni_codigo);
											_winUnidadeLista.close();
										}
										
										if(columnIndex == 4) {
											Ext.Msg.confirm('Atenção', "Tem certeza que deseja excluir esta unidade?", function (_res) {
												if (_res == 'yes') {
													Ext.Ajax.request({
														url: getURL() + 'app/controller/unidade.php',
														method: 'post',
														params: {
															acao: "remove",
															p: MyDesktop.getCompany.code,
															uni_codigo: thisGrid.getSelection()[0].data.uni_codigo
														},
														success: function (_resposta, opts) {
															Ext.Msg.alert('Atenção','A unidade foi excluída com sucesso.',function(){
																MyDesktop.getModule('_modUnidadeLista').fetchList();
																MyDesktop.fixMsgBox(_winUnidade);
															});
														},
														failure: function (_resposta, opts) {
															Ext.Msg.alert('Atenção','Houve um erro ao excluir a unidade!',function(){
																MyDesktop.fixMsgBox(_winUnidade);
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
        return _winUnidadeLista;
    }
});