Ext.define('FacilDesktop.Estoque', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],
    id: '_modEstoque',
    init: function () {
        /*this.launcher = {
         text: 'Tab Window',
         iconCls:'tabs'
         }*/
    },
	refreshView: function() {
		MyDesktop.getModule('_modEstoque').fetchList();
	},
	filtroSelectionado: {data: ""},
	tipoSelecionado: "0, 1",
	fetchList: function() {
		MyDesktop.getModule('_modEstoque').filtrar();
		/*var _objParams = {
			p: MyDesktop.getCompany.code,
			acao: "listar"
		};

		Ext.Ajax.request({
			url: getURL() + 'app/controller/estoque.php',
			params: _objParams,
			success: function (_resposta, opts) {
				var dados = Ext.decode(_resposta.responseText);
				Ext.ComponentQuery.query('#gridEstoquesCadastrados')[0].store.loadData(dados);
			}
		});

		setTimeout(function () {
			Ext.ComponentQuery.query('#estoqueListaForm #est_produto')[0].focus();
		}, 1200);*/
	},
	pesquisa: function (_name) {
		Ext.Ajax.request({
			url: getURL() + 'app/controller/produto.php',
			params: {
				p: MyDesktop.getCompany.code,
				acao: "autocomplete",
				prd_name: _name
			},
			success: function (_resposta, opts) {
				Ext.ComponentQuery.query('#estoqueListaForm #est_produto')[0].store.removeAll();
				Ext.ComponentQuery.query('#estoqueListaForm #est_produto')[0].store.add(Ext.decode(_resposta.responseText));
			}
		});
    },
	print: function () {
		MyDesktop.waitMessage('Montando o pdf', 'Enviando...');
		Ext.Ajax.request({
			timeout:120000,
			url: 'rel/relEstoqueProdutos.php',
			method: 'post',
			params: MyDesktop.getModule('_modEstoque').filtroSelectionado,
			success: function (_resposta, opts) {
				Ext.Msg.close();
				window.open(_resposta.responseText);
			},
			failure: function (_resposta, opts) {
				Ext.Msg.alert("Atenção","Ocorreu um erro!");
			}
		});
    },
	filtrar: function() {
		prd_name = Ext.ComponentQuery.query('#estoqueListaForm #est_produto')[0].getValue() != null ? Ext.ComponentQuery.query('#estoqueListaForm #est_produto')[0].getSelection().data.prd_name : ""
		var _objParams = {
			p: MyDesktop.getCompany.code,
			acao: "filtrar",
			prd_name: prd_name,
			est_dtinicial: Ext.Date.format(new Date(Ext.ComponentQuery.query('#estoqueListaForm #est_dtinicial')[0].getValue()), 'Y-m-d'),
			est_dtfinal: Ext.Date.format(new Date(Ext.ComponentQuery.query('#estoqueListaForm #est_dtfinal')[0].getValue()), 'Y-m-d'),
			est_tipo: MyDesktop.getModule('_modEstoque').tipoSelecionado
		};

		MyDesktop.getModule('_modEstoque').filtroSelectionado.data = btoa(JSON.stringify(_objParams));

		Ext.Ajax.request({
			url: getURL() + 'app/controller/estoque.php',
			params: _objParams,
			success: function (_resposta, opts) {
				var dados = Ext.decode(_resposta.responseText);
				Ext.ComponentQuery.query('#gridEstoquesCadastrados')[0].store.loadData(dados);
			}
		});

		setTimeout(function () {
			Ext.ComponentQuery.query('#estoqueListaForm #est_produto')[0].focus();
		}, 1200);
	},
    createWindow: function () {
        var desktop = this.app.getDesktop();
        if (!Ext.ComponentQuery.query('#_winEstoque')[0]) {
            _winEstoque = desktop.createWindow({
                itemId: '_winEstoque',
                alias: 'widget.estoqueListaAlias',
                title: 'Controle de Estoque',
                width: 800,
                height: 600,
                x: 300,
                y: 30,
                iconCls: 'icon-grid',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                listeners: {
                    'afterrender': function () {
						MyDesktop.getModule('_modEstoque').fetchList();
                    }
                },
                items: [
                    Ext.widget({
                        xtype: 'form',
                        itemId: 'estoqueListaForm',
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
										width:'100%',
                                        items: [
											Ext.create('FacilDesktop.ux.form.ComboBox', {
												fieldLabel: 'Produto',
												itemId: 'est_produto',
												name: 'est_produto',
												width: 780,
												labelWidth: 70,
												padding:'10 0 0 0',
												valueField: 'prd_codigo',
												displayField: 'prd_name',
												fields: ['prd_codigo', 'prd_name'],	// código e descrição a serem mostrados na combo **Uma posição obrigatória
												displayFields:['prd_name'],
												store: {type: 'Produto'},
												autoLoad: false,
												hideTrigger:true,
												typeAhead:true,
												minChars:1
											})
                                        ]
                                    },
									{
										xtype: 'container',
										layout: 'hbox',
										border: false,
										defaultType: 'textfield',
										items: [
											{
												fieldLabel: 'Data inicial',
												xtype: 'datefield',
												format: 'd/m/Y',
												altFormats: 'd/m/Y|d-m-Y|dmY',
												itemId: 'est_dtinicial',
												name: 'est_dtinicial',
												width: 240,
												labelWidth: 70,
												padding:'10 10 0 0',
												value: Ext.Date.add(new Date(), Ext.Date.DAY, -30)
											},
											{
												fieldLabel: 'Data Final',
												xtype: 'datefield',
												format: 'd/m/Y',
												altFormats: 'd/m/Y|d-m-Y|dmY',
												itemId: 'est_dtfinal',
												name: 'est_dtfinal',
												width: 240,
												labelWidth: 70,
												padding:'10 10 0 0',
												value: new Date()
											},
											{
												xtype: 'button',
												text: 'Saída',
												itemId:'est_tipo_saida',
												margin: '10 10 0 0',
												width: 70,
												cls: '.btnvermelho',
												handler:function(){
													MyDesktop.getModule('_modEstoque').tipoSelecionado = "0";
													MyDesktop.getModule('_modEstoque').filtrar();
												}
											},
											{
												xtype: 'button',
												text: 'Entrada',
												itemId:'est_tipo_entrada',
												margin: '10 10 0 0',
												width: 70,
												cls: '.btnverde',
												handler:function(){
													MyDesktop.getModule('_modEstoque').tipoSelecionado = "1";
													MyDesktop.getModule('_modEstoque').filtrar();
												}
											},
											{
												xtype: 'button',
												text: 'Todos',
												itemId:'est_tipo_todos',
												margin: '10 0 0 0',
												width: 70,
												handler:function(){
													MyDesktop.getModule('_modEstoque').tipoSelecionado = "0, 1";
													MyDesktop.getModule('_modEstoque').filtrar();
												}
											}
										]
									}
                                ]
                            },
                            Ext.create('Ext.grid.Panel', {
                                header: false,
                                itemId: 'gridEstoquesCadastrados',
                                height: 520,
								margin: '10 0 0 0',
                                store: {type: 'Estoque', autoLoad:false},
								autoLoad:false,
                                columns: [
                                    {id: 'est_codigo', dataIndex: 'est_codigo', hidden: true},
                                    {id: 'prd_name', text: 'Produto', dataIndex: 'prd_name', flex: 1},
                                    {id: 'dcb_codigo', text: 'Código DCB', dataIndex: 'dcb_codigo', flex: 1},
                                    {id: 'dcb_discriminacao', text: 'Discriminação DCB', dataIndex: 'dcb_discriminacao', flex: 1},
									{id: 'est_tipo', text: 'Tipo', dataIndex: 'est_tipo', renderer: function(_v){
										if(_v == 0) { return "Saída"; }
										return "Entrada";
									}},
									{id: 'est_quantidade', text: 'Quantidade', dataIndex: 'est_quantidade'}
                                ],
                                listeners: {
									'cellclick': function(thisGrid, rowIndex, columnIndex, e) {
										var columnid = thisGrid.getColumnManager().getLast().id;
										
										if(columnIndex == 3) {
											MyDesktop.getModule('_modEstoque').carregarEstoque(thisGrid.getSelection()[0].data.ntf_codigo);
											_winEstoque.close();
										}
										
										if(columnIndex == 4) {
											Ext.Msg.confirm('Atenção', "Tem certeza que deseja excluir esta estoque?", function (_res) {
												if (_res == 'yes') {
													Ext.Ajax.request({
														url: getURL() + 'app/controller/estoque.php',
														method: 'post',
														params: {
															acao: "remove",
															p: MyDesktop.getCompany.code,
															ntf_codigo: thisGrid.getSelection()[0].data.ntf_codigo
														},
														success: function (_resposta, opts) {
															Ext.Msg.alert('Atenção','A estoque foi excluída com sucesso.',function(){
																MyDesktop.getModule('_modEstoque').fetchList();
																MyDesktop.fixMsgBox(_winEstoque);
															});
														},
														failure: function (_resposta, opts) {
															Ext.Msg.alert('Atenção','Houve um erro ao excluir a estoque!',function(){
																MyDesktop.fixMsgBox(_winEstoque);
															});
														}
													});
												}
											});
										}
									}
                                },
								viewConfig: {
									getRowClass: function (record, rowIndex, rowParams, store) {
										return (record.get('est_tipo') == '0') ? 'vermelho' : 'verde';
									}
								}
                            })
                        ],
						buttons: [
							{
								text: 'Imprimir',
								itemId:'btnImprimir',
								handler:function(){
									MyDesktop.getModule('_modEstoque').print();
								}
							}
						]
                    })

                ]
            });
        }
        return _winEstoque;
    }
});