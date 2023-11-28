Ext.define('FacilDesktop.AcessoLista', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],
    id: '_modAcessoLista',

    init: function () {
        /*this.launcher = {
         text: 'Tab Window',
         iconCls:'tabs'
         }*/
    },
    filtro: '',
    createWindow: function () {
        var desktop = this.app.getDesktop();
        if (!Ext.ComponentQuery.query('#_winAcessoLista')[0]) {
            _winAcessoLista = desktop.createWindow({
                itemId: '_winAcessoLista',
                alias: 'widget.acessoListaAlias',
                title: 'Usuários Cadastrados',
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
						var _objParams = {
							p: MyDesktop.getCompany.code,
							acao: "listar"
						};

						Ext.Ajax.request({
							url: getURL() + 'app/controller/usuario.php',
							params: _objParams,
							success: function (_resposta, opts) {
								var dados = Ext.decode(_resposta.responseText);
								Ext.ComponentQuery.query('#acessosCadastrados')[0].store.loadData(dados);
							}
						});

                        setTimeout(function () {
                            Ext.ComponentQuery.query('#busca_acesso')[0].focus();
                        }, 1200);
                    }
                },
                items: [
                    Ext.widget({
                        xtype: 'form',
                        itemId: 'acessoListaForm',
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
                                                itemId: 'busca_acesso',
                                                fieldLabel: 'E-mail',
                                                width: 385,
                                                labelWidth: 130,
                                                selectOnFocus: true,
                                                listeners: {
                                                    'change': function (combo) {
                                                        if (combo.getValue() == '') {
                                                            Ext.ComponentQuery.query('#acessosCadastrados')[0].store.removeAll();
                                                            Ext.ComponentQuery.query('#acessosCadastrados')[0].store.load();
                                                        } else {
                                                            MyDesktop.getModule('_modAcessoLista').filtro += '&login=' + combo.getValue();
                                                            Ext.Ajax.request({
                                                                url: getURL() + 'app/controller/usuario.php',
                                                                params: {
																	p: MyDesktop.getCompany.code,
																	acao: "autocomplete",
																	usu_email:  Ext.ComponentQuery.query('#busca_acesso')[0].getValue()
																},
                                                                success: function (_resposta, opts) {
                                                                    //console.log(_resposta.responseText);
                                                                    Ext.ComponentQuery.query('#acessosCadastrados')[0].store.removeAll();
                                                                    Ext.ComponentQuery.query('#acessosCadastrados')[0].store.add(Ext.decode(_resposta.responseText));
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
                                itemId: 'acessosCadastrados',
                                height: 320,
                                store: {type: 'Usuario', autoLoad:false},
								autoLoad:false,
                                columns: [
                                    {text: 'Login', dataIndex: 'usu_login'},
									{text: 'E-mail', dataIndex: 'usu_email', flex: 1},
                                    {text: 'Permissão', dataIndex: 'per_name'},
									{
										id: 'usu_edit',
										renderer: function() {
											return Ext.String.format('<img src="'+ getURL() + 'resources/images/certo.png" />');
										},
										dataIndex:'image',
										width: 40
									},
									{
										id: 'usu_exclude',
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
											MyDesktop.getModule('_modAcesso').carregarAcesso(thisGrid.getSelection()[0].data.usu_login);
											_winAcessoLista.close();
										}
										
										if(columnIndex == 4) {
											Ext.Msg.confirm('Atenção', "Tem certeza que deseja excluir este usuário?", function (_res) {
												if (_res == 'yes') {
													Ext.Ajax.request({
														url: getURL() + 'app/controller/usuario.php',
														method: 'post',
														params: {
															acao: "remove",
															p: MyDesktop.getCompany.code,
															for_codigo: thisGrid.getSelection()[0].data.usu_login
														},
														success: function (_resposta, opts) {
															Ext.Msg.alert('Atenção','O usuário foi excluído com sucesso.',function(){
																MyDesktop.getModule('_modAcesso').fetchList();
																MyDesktop.fixMsgBox(_winAcesso);
															});
														},
														failure: function (_resposta, opts) {
															Ext.Msg.alert('Atenção','Houve um erro ao excluir o usuário!',function(){
																MyDesktop.fixMsgBox(_winAcesso);
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
        return _winAcessoLista;
    }
});