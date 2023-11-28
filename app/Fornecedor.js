Ext.define('FacilDesktop.Fornecedor', {

	id: '_modFornecedor',
	
	store:null,
	
	isUpdate: false,
	
	save:function(){
		if(
			Ext.ComponentQuery.query('#_formFornecedor #for_name')[0].getValue()){
			
			acao = 'adicionar';
			
			if (FacilDesktop.Fornecedor.isUpdate == true) {
				acao = 'atualizar';
			}
			
			Ext.Ajax.request({
				url: getURL() + 'app/controller/fornecedor.php',
				method: 'post',
				params: {
					acao: acao,
					p:MyDesktop.getCompany.code,
					for_codigo: Ext.ComponentQuery.query('#_formFornecedor #for_codigo')[0].getValue(),
					for_name: Ext.ComponentQuery.query('#_formFornecedor #for_name')[0].getValue(),
					for_cnpj: Ext.ComponentQuery.query('#_formFornecedor #for_cnpj')[0].getValue(),
					for_telefone: Ext.ComponentQuery.query('#_formFornecedor #for_telefone')[0].getValue()
				},
				success: function (_resposta, opts) {
					if (_resposta.responseText == "OK") {
						Ext.Msg.alert('Atenção','A fornecedor "'+Ext.ComponentQuery.query('#_formFornecedor #for_name')[0].getValue().toUpperCase()+'" foi cadastrado com sucesso.',function(){
							MyDesktop.getModule('_modFornecedorLista').refreshView();
							MyDesktop.fixMsgBox(_winFornecedor);
							for_codigo: Ext.ComponentQuery.query('#_formFornecedor #for_codigo')[0].setValue();
							for_name: Ext.ComponentQuery.query('#_formFornecedor #for_name')[0].setValue();
							for_cnpj: Ext.ComponentQuery.query('#_formFornecedor #for_cnpj')[0].setValue();
							for_telefone: Ext.ComponentQuery.query('#_formFornecedor #for_telefone')[0].setValue();
							FacilDesktop.Fornecedor.isUpdate = false;
						});
						return;
					}
					Ext.Msg.alert('Atenção','Houve um erro ao fazer o cadastro!<br> Tente novamente mais tarde.',function(){
						MyDesktop.fixMsgBox(_winFornecedor);
					});
				},
				failure: function (_resposta, opts) {
					Ext.Msg.alert('Atenção','Houve um erro ao fazer o cadastro!',function(){
						MyDesktop.fixMsgBox(_winFornecedor);
					});
				}
			});
		}else{
			Ext.Msg.alert('Atenção','Preencha todos os campos.',function(){
				MyDesktop.fixMsgBox(_winFornecedor);
			});
		}
	},
	carregarArquivos: function() {
		Ext.Ajax.request({
			url: getURL() + 'app/controller/fornecedorArquivos.php',
			method: 'get',
			params: {
				acao: 'read',
				for_codigo: Ext.ComponentQuery.query('#_formFornecedor #for_codigo')[0].getValue()
			},
			success: function (_resposta, opts) {
				arquivos = Ext.decode(_resposta.responseText);
				for (var prop in arquivos) {
					if (!arquivos.hasOwnProperty(prop)) continue;
					Ext.ComponentQuery.query('#_formFornecedor #for_grid_arquivos')[0].store.add(arquivos[prop]);
				}
			},
			failure: function (_resposta, opts) {
				Ext.Msg.alert('Atenção','Houve um erro ao fazer o cadastro!',function() {
					MyDesktop.fixMsgBox(_winFornecedor);
				});
			}
		})	
	},
	carregarFornecedor: function (codigo) {
		FacilDesktop.Fornecedor.isUpdate = true;
		Ext.Ajax.request({
            url: getURL() + 'app/controller/fornecedor.php',
            params: {
                acao: 'selecionar',
                for_codigo: codigo,
                p: MyDesktop.getCompany.code
            },
            success: function (_resposta, opts) {
				console.log(_resposta.responseText)
				Ext.ComponentQuery.query('#_formFornecedor #for_grid_arquivos')[0].store.removeAll()
				var data = Ext.decode(_resposta.responseText);
                Ext.ComponentQuery.query('#_formFornecedor #for_codigo')[0].setValue(data[0].for_codigo);
                Ext.ComponentQuery.query('#_formFornecedor #for_name')[0].setValue(data[0].for_name);
                Ext.ComponentQuery.query('#_formFornecedor #for_cnpj')[0].setValue(data[0].for_cnpj);
                Ext.ComponentQuery.query('#_formFornecedor #for_telefone')[0].setValue(data[0].for_telefone);
				MyDesktop.getModule('_modFornecedor').carregarArquivos();
            }
        });
	},
	createWindow:function(_obj){
		FacilDesktop.Fornecedor.isUpdate = false;
		if(!Ext.ComponentQuery.query('#_winFornecedor')[0]){
            _winFornecedor = this.app.getDesktop().createWindow({
                itemId: '_winFornecedor',
                title:'Fornecedor',
                width:420,
                height:440,
                animCollapse:false,
                constrainHeader:true,
				renderTo: Ext.getBody(),
				items: [
					{
						xtype: 'form',
						itemId: '_formFornecedor',
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
								border: false,
								defaultType: 'textfield',
								items: [
									{
										itemId: 'for_codigo',
										name: 'for_codigo',
										hidden: true
									},
									{
										fieldLabel: 'Nome',
										itemId: 'for_name',
										name: 'for_name',
										width: 400,
										labelWidth: 100,
										padding:'10 0 0 0',
										fieldStyle: {
											'text-transform': 'uppercase'
										}
									},
									{
										fieldLabel: 'CNPJ',
										itemId: 'for_cnpj',
										name: 'for_cnpj',
										width: 400,
										labelWidth: 100,
										padding:'10 0 0 0',
										fieldStyle: {
											'text-transform': 'uppercase'
										}
									},
									{
										fieldLabel: 'Telefone',
										itemId: 'for_telefone',
										name: 'for_telefone',
										width: 400,
										labelWidth: 100,
										padding:'10 0 0 0',
										fieldStyle: {
											'text-transform': 'uppercase'
										}
									},
									Ext.create('Ext.grid.Panel', {
										header: false,
										itemId: 'for_grid_arquivos',
										width: 400,
										height: 200,
										columnLines:true,
										padding:'10 0 0 0',
										store: {type: 'Arquivo'},
										columns: [
											{text: 'Lista de arquivos', dataIndex: 'arq_name', flex: 1},
											{
												xtype: 'actioncolumn',
												width: 40,
												align: 'center',
												items: [
													{
														icon: 'resources/images/bogus.png',
														iconCls: 'x-btn-grid-normal',
														handler: function(grid, rowIndex, colIndex, item, e , record) {
															window.open("http://localhost/controleEstoque/uploads/" + record.data.arq_name);
														}
													}
												]
											},
											{
												xtype: 'actioncolumn',
												width: 40,
												align: 'center',
												items: [
													{
														icon: 'resources/images/delete.png',
														iconCls: 'x-btn-grid-normal',
														handler: function(grid, rowIndex, colIndex, item, e , record) {
															Ext.Msg.confirm('Atenção', "Tem certeza que deseja excluir este arquivo?", function (_res) {
																if (_res == 'yes') {
																	Ext.Ajax.request({
																		url: getURL() + 'app/controller/fornecedorArquivos.php',
																		method: 'post',
																		params: {
																			acao: "remove",
																			p: MyDesktop.getCompany.code,
																			arq_name: record.data.arq_name,
																			for_codigo: Ext.ComponentQuery.query('#_formFornecedor #for_codigo')[0].getValue(),
																		},
																		success: function (_resposta, opts) {
																			Ext.Msg.alert('Atenção','O arquivo foi excluido com sucesso.',function(){
																				Ext.ComponentQuery.query('#_formFornecedor #for_grid_arquivos')[0].getStore().remove(record);
																				Ext.ComponentQuery.query('#_formFornecedor #for_grid_arquivos')[0].getView().refresh();
																				MyDesktop.fixMsgBox(_winFornecedor);
																			});
																		},
																		failure: function (_resposta, opts) {
																			Ext.Msg.alert('Atenção','Houve um erro ao excluir a notaFiscal!',function(){
																				MyDesktop.fixMsgBox(_winFornecedor);
																			});
																		}
																	});
																}
															});
														}
													}
												]
											}
										],
										listeners: {
											'cellclick': function(thisGrid, rowIndex, columnIndex, e) {
												if(columnIndex == 1) {
													window.open("http://localhost/controleEstoque/uploads/" + thisGrid.getSelection()[0].data.arq_name);
												}
												
												if(columnIndex == 2) {
													Ext.Msg.confirm('Atenção', "Tem certeza que deseja excluir este arquivo?", function (_res) {
														if (_res == 'yes') {
															Ext.Ajax.request({
																url: getURL() + 'app/controller/fornecedorArquivos.php',
																method: 'post',
																params: {
																	acao: "remove",
																	for_codigo: Ext.ComponentQuery.query('#_formFornecedor #for_codigo')[0].getValue(),
																	p: MyDesktop.getCompany.code,
																	arq_name: thisGrid.getSelection()[0].data.arq_name
																},
																success: function (_resposta, opts) {
																	Ext.Msg.alert('Atenção','O arquivo foi excluido com sucesso.',function(){
																		Ext.ComponentQuery.query('#_formFornecedor #for_grid_arquivos')[0].getStore().remove(thisGrid.getSelection()[0]);
																		Ext.ComponentQuery.query('#_formFornecedor #for_grid_arquivos')[0].getView().refresh();
																		MyDesktop.fixMsgBox(_winFornecedor);
																	});
																},
																failure: function (_resposta, opts) {
																	Ext.Msg.alert('Atenção','Houve um erro ao excluir a notaFiscal!',function(){
																		MyDesktop.fixMsgBox(_winFornecedor);
																	});
																}
															});
														}
													});
												}
											}
										}
									}),
									Ext.create('Ext.form.Panel', {
										itemId: 'for_avaliacao',
										padding:'10 0 0 0',
										collapsible: false,
										items: [
											{
												xtype:'container',
												layout:'hbox',
												style:{marginTop:'5px'},
												items:[
													{
														xtype: 'filefield',
														name: 'for_arquivo',
														itemId: 'for_arquivo',
														multiple: false,
														acceptSize: 20000,
														msgTarget: 'side',
														width:400,
														buttonOnly: true,
														cls:'x-btn-uploader-logo',
														listeners : {
															change:function(_self){
																if(Ext.ComponentQuery.query('#_formFornecedor #for_codigo')[0].getValue() != null && Ext.ComponentQuery.query('#_formFornecedor #for_codigo')[0].getValue() != "") {
																	if(_self.getValue() && _self.getValue()!=''){
																		arqName = Ext.ComponentQuery.query('#_formFornecedor #for_arquivo')[0].getValue();
																		Ext.ComponentQuery.query('#for_avaliacao')[0].getForm().submit({
																			url: getURL() + 'app/controller/fornecedorArquivos.php',
																			params: {
																				p: MyDesktop.getCompany.code,
																				acao: 'fornecedor',
																				arq_name: arqName,
																				for_codigo: Ext.ComponentQuery.query('#_formFornecedor #for_codigo')[0].getValue(),
																				emp_codigo:MyDesktop.getCompany.emp_codigo
																			},
																			method:'post',
																			waitMsg: 'Enviando seu arquivo...',
																			success: function (_form,_action) {
																				var _data = Ext.decode(_action.response.responseText);
																				Ext.ComponentQuery.query('#_formFornecedor #for_grid_arquivos')[0].store.add({arq_name: _data.msg});
																					Ext.ComponentQuery.query('#_formFornecedor #for_grid_arquivos')[0].getView().refresh();
																					Ext.Msg.alert('Atenção', 'Arquivo salvo com sucesso!');
																				/*if (_data.msg == "ok") {
																					Ext.ComponentQuery.query('#_formFornecedor #for_grid_arquivos')[0].store.add({arq_name: arqName.replace(/^.*[\\\/]/, '')});
																					Ext.ComponentQuery.query('#_formFornecedor #for_grid_arquivos')[0].getView().refresh();
																					Ext.Msg.alert('Atenção', 'Arquivo salvo com sucesso!');
																				} else {
																					Ext.Msg.alert('Atenção', _action.response.responseText);
																				}*/
																			},
																			failure: function(_form, _action){
																				Ext.Msg.alert('Atenção', _action.response.responseText);
																			}
																		});
																	}
																} else { 
																	Ext.Msg.alert('Atenção', "É obrigatório ter um fornecedor existente antes de enviar o arquivo.");
																}
															}
														}
													}
												]
											}
										]
									})
								]
							}
						]
					}
				],
				buttons: [
					{
						text: 'Novo',
						itemId:'btnNovo',
						handler:function(){
							FacilDesktop.Fornecedor.isUpdate = false;
							Ext.ComponentQuery.query('#_formFornecedor #for_codigo')[0].setValue();
							Ext.ComponentQuery.query('#_formFornecedor #for_name')[0].setValue();
						}
					},
					{
						text: 'Carregar',
						itemId:'btnCarregar',
						handler:function(){
							var module = MyDesktop.getModule('_modFornecedorLista');
							var window;
							if (module) {
								window = module.createWindow();
								window.show();
							}
						}
					},
					{
						text: 'Salvar',
						itemId:'btnEntrar',
						handler:function(){
							MyDesktop.getModule('_modFornecedor').save();
						}
					}
				],
				listeners: {
					'afterrender': function () {
						MyDesktop.getModule('_modFornecedor').carregarArquivos();
					},
					'focus': function () {
						MyDesktop.getModule('_modFornecedor').carregarArquivos();
					}
				} 
			});
		}
		return _winFornecedor;
	}
});