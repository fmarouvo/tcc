Ext.define('FacilDesktop.ProntuarioLista', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],
    id: '_modProntuarioLista',
    init: function () {
        /*this.launcher = {
         text: 'Tab Window',
         iconCls:'tabs'
         }*/
    },
	refreshView: function() {
		MyDesktop.getModule('_modProntuarioLista').fetchList();
	},
	fetchList: function() {
		var _objParams = {
			p: MyDesktop.getCompany.code,
			acao: "listar"
		};

		Ext.Ajax.request({
			url: getURL() + 'app/controller/prontuario.php',
			params: _objParams,
			success: function (_resposta, opts) {
				var dados = Ext.decode(_resposta.responseText);
				Ext.ComponentQuery.query('#gridProntuariosCadastradas')[0].store.loadData(dados);
			}
		});

		setTimeout(function () {
			Ext.ComponentQuery.query('#busca_prontuario')[0].focus();
		}, 1200);
	},
    filtro: '',
    createWindow: function () {
        var desktop = this.app.getDesktop();
        if (!Ext.ComponentQuery.query('#_winProntuarioLista')[0]) {
            _winProntuarioLista = desktop.createWindow({
                itemId: '_winProntuarioLista',
                alias: 'widget.prontuarioListaAlias',
                title: 'Prontuários Cadastrados',
                width: 620,
                height: 420,
                x: 300,
                y: 30,
                iconCls: 'icon-grid',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                listeners: {
                    'afterrender': function () {
						MyDesktop.getModule('_modProntuarioLista').fetchList();
                    }
                },
                items: [
                    Ext.widget({
                        xtype: 'form',
                        itemId: 'prontuarioListaForm',
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
                                                itemId: 'busca_prontuario',
                                                fieldLabel: 'Prontuario',
                                                width: 610,
                                                labelWidth: 60,
                                                selectOnFocus: true,
                                                listeners: {
                                                    'change': function (combo) {
                                                        if (combo.getValue() == '') {
                                                            Ext.ComponentQuery.query('#gridProntuariosCadastradas')[0].store.removeAll();
                                                            Ext.ComponentQuery.query('#gridProntuariosCadastradas')[0].store.load();
                                                        } else {
                                                            MyDesktop.getModule('_modProntuarioLista').filtro += '&prt_name=' + combo.getValue();
                                                            Ext.Ajax.request({
                                                                url: getURL() + 'app/controller/prontuario.php',
                                                                params: {
																	p: MyDesktop.getCompany.code,
																	acao: "autocomplete",
																	prt_name:  Ext.ComponentQuery.query('#busca_prontuario')[0].getValue()
																},
                                                                success: function (_resposta, opts) {
                                                                    Ext.ComponentQuery.query('#gridProntuariosCadastradas')[0].store.removeAll();
                                                                    Ext.ComponentQuery.query('#gridProntuariosCadastradas')[0].store.add(Ext.decode(_resposta.responseText));
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
                                itemId: 'gridProntuariosCadastradas',
                                height: 320,
                                store: {type: 'Prontuario', autoLoad:false},
								autoLoad:false,
                                columns: [
                                    {id: 'prt_codigo', text: 'Código', dataIndex: 'prt_codigo', hidden: true},
                                    {id: 'prt_data', text: 'Data', dataIndex: 'prt_data'},
									{id: 'pac_name', text: 'Paciente', dataIndex: 'pac_name', flex: 1},
									{
										id: 'prt_edit',
										renderer: function() {
											return Ext.String.format('<img src="'+ getURL() + 'resources/images/certo.png" />');
										},
										dataIndex:'image',
										width: 40
									},
									{
										id: 'prt_exclude',
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
											MyDesktop.getModule('_modProntuario').carregarProntuario(thisGrid.getSelection()[0].data.prt_codigo);
											_winProntuarioLista.close();
										}
										
										if(columnIndex == 4) {
											Ext.Msg.confirm('Atenção', "Tem certeza que deseja excluir esta prontuario?", function (_res) {
												if (_res == 'yes') {
													Ext.Ajax.request({
														url: getURL() + 'app/controller/prontuario.php',
														method: 'post',
														params: {
															acao: "remove",
															p: MyDesktop.getCompany.code,
															prt_codigo: thisGrid.getSelection()[0].data.prt_codigo
														},
														success: function (_resposta, opts) {
															Ext.Msg.alert('Atenção','A prontuario foi excluída com sucesso.',function(){
																MyDesktop.getModule('_modProntuarioLista').fetchList();
																MyDesktop.fixMsgBox(_winProntuario);
															});
														},
														failure: function (_resposta, opts) {
															Ext.Msg.alert('Atenção','Houve um erro ao excluir a prontuario!',function(){
																MyDesktop.fixMsgBox(_winProntuario);
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
        return _winProntuarioLista;
    }
});