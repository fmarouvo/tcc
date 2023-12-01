Ext.define('FacilDesktop.NotaFiscal', {

	id: '_modNotaFiscal',
	
	requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
		'Ext.grid.plugin.RowEditing',
        'Ext.grid.column.Action'
    ],
	
	store:null,
	
	isUpdate: false,
	
	save:function(){
		if(
			Ext.ComponentQuery.query('#_formNotaFiscal #ntf_numero')[0].getValue() 
			&& Ext.ComponentQuery.query('#_formNotaFiscal #ntf_fornecedor')[0].getSelection().data.for_codigo
			&& Ext.ComponentQuery.query('#_formNotaFiscal #ntf_produtosSelecionados')[0].store.data.items.length > 0) {
			
			acao = 'adicionar';
			
			if (FacilDesktop.NotaFiscal.isUpdate == true) {
				acao = 'atualizar';
			}
			
			var productsArray = [];
			Ext.ComponentQuery.query('#_formNotaFiscal #ntf_produtosSelecionados')[0].store.data.items.forEach(function(value, key){
			  productsArray.push(value.data);
			});
			
			Ext.Ajax.request({
				url: getURL() + 'app/controller/notaFiscal.php',
				method: 'post',
				params: {
					acao: acao,
					p:MyDesktop.getCompany.code,
					ntf_codigo: Ext.ComponentQuery.query('#_formNotaFiscal #ntf_codigo')[0].getValue(),
					ntf_numero: Ext.ComponentQuery.query('#_formNotaFiscal #ntf_numero')[0].getValue(),
					for_codigo: Ext.ComponentQuery.query('#_formNotaFiscal #ntf_fornecedor')[0].getSelection().data.for_codigo,
					for_name: Ext.ComponentQuery.query('#_formNotaFiscal #ntf_fornecedor')[0].getSelection().data.for_name,
					ntf_data: Ext.ComponentQuery.query('#_formNotaFiscal #ntf_data')[0].getValue(),
					ntf_produtos: btoa(Ext.encode(productsArray))
				},
				success: function (_resposta, opts) {
					if (_resposta.responseText == "OK") {
						Ext.Msg.alert('Atenção','A notaFiscal "'+Ext.ComponentQuery.query('#_formNotaFiscal #ntf_numero')[0].getValue().toUpperCase()+'" foi cadastrada com sucesso.',function(){
							MyDesktop.getModule('_modNotaFiscalLista').refreshView();
							MyDesktop.fixMsgBox(_winNotaFiscal);
							Ext.ComponentQuery.query('#_formNotaFiscal #ntf_codigo')[0].setValue();
							Ext.ComponentQuery.query('#_formNotaFiscal #ntf_numero')[0].setValue();
							Ext.ComponentQuery.query('#_formNotaFiscal #ntf_fornecedor')[0].store.load({
								callback : function(_ret){
									Ext.ComponentQuery.query('#_formNotaFiscal #ntf_fornecedor')[0].setValue('');
								}
							});
							Ext.ComponentQuery.query('#_formNotaFiscal #ntf_produtosSelecionados')[0].store.removeAll();
							Ext.ComponentQuery.query('#_formNotaFiscal #ntf_produtosSelecionados')[0].store.load();
							Ext.ComponentQuery.query('#_formNotaFiscal #ntf_produto')[0].store.load({
								callback : function(_ret){
									Ext.ComponentQuery.query('#_formNotaFiscal #ntf_produto')[0].setValue('');
								}
							});
							Ext.ComponentQuery.query('#_formNotaFiscal #ntf_quantidade')[0].setValue();
							Ext.ComponentQuery.query('#_formNotaFiscal #ntf_data')[0].setValue();
							MyDesktop.getModule('_modNotaFiscal').limparCampos();
						});
						return;
					}
					Ext.Msg.alert('Atenção','Houve um erro ao fazer o cadastro!<br>Certifique-se de que o prefixo da notaFiscal ainda não existe.',function(){
						MyDesktop.fixMsgBox(_winNotaFiscal);
					});
				},
				failure: function (_resposta, opts) {
					Ext.Msg.alert('Atenção','Houve um erro ao fazer o cadastro!',function(){
						MyDesktop.fixMsgBox(_winNotaFiscal);
					});
				}
			});
		}else{
			Ext.Msg.alert('Atenção','Preencha todos os campos.',function(){
				MyDesktop.fixMsgBox(_winNotaFiscal);
			});
		}
	},
	limparCampos: function() {
		FacilDesktop.NotaFiscal.isUpdate = false;
		Ext.ComponentQuery.query('#_formNotaFiscal #ntf_codigo')[0].setValue();
		Ext.ComponentQuery.query('#_formNotaFiscal #ntf_numero')[0].setValue();
		Ext.ComponentQuery.query('#_formNotaFiscal #ntf_produtosSelecionados')[0].store.removeAll();
		Ext.ComponentQuery.query('#_formNotaFiscal #ntf_produtosSelecionados')[0].store.load();
		Ext.ComponentQuery.query('#_formNotaFiscal #ntf_fornecedor')[0].setValue();
		Ext.ComponentQuery.query('#_formNotaFiscal #ntf_produto')[0].setValue();
		Ext.ComponentQuery.query('#_formNotaFiscal #ntf_lote')[0].setValue();
		Ext.ComponentQuery.query('#_formNotaFiscal #ntf_quantidade')[0].setValue();
		Ext.ComponentQuery.query('#_formNotaFiscal #ntf_data')[0].setValue();
	},
	carregarNotaFiscal: function (codigo) {
		FacilDesktop.NotaFiscal.isUpdate = true;
		Ext.Ajax.request({
            url: getURL() + 'app/controller/notaFiscal.php',
            params: {
                acao: 'selecionar',
                ntf_codigo: codigo,
                p: MyDesktop.getCompany.code
            },
            success: function (_resposta, opts) {
				console.log(_resposta.responseText)
				var data = Ext.decode(_resposta.responseText);
				Ext.ComponentQuery.query('#_formNotaFiscal #ntf_codigo')[0].setValue(data[0].ntf_codigo),
                Ext.ComponentQuery.query('#_formNotaFiscal #ntf_numero')[0].setValue(data[0].ntf_numero);
                Ext.ComponentQuery.query('#_formNotaFiscal #ntf_data')[0].setValue(new Date(data[0].ntf_data));
				Ext.ComponentQuery.query('#_formNotaFiscal #ntf_fornecedor')[0].store.load({
					callback : function(_ret){
						if(_ret.length > 0){
							var recordNumber = Ext.ComponentQuery.query('#_formNotaFiscal #ntf_fornecedor')[0].store.findExact(Ext.ComponentQuery.query('#_formNotaFiscal #ntf_fornecedor')[0].valueField, parseInt(data[0].for_codigo), 0);
                            Ext.ComponentQuery.query('#_formNotaFiscal #ntf_fornecedor')[0].setSelection(recordNumber);
                        }
					}
				});
				
				var products = Ext.decode(atob(data[0].ntf_produtos));
				var i = 0;
				products.forEach(function(value, key){
					var _prd = {
						'prd_codigo': value.prd_codigo,
						'prd_name': value.prd_name,
						'prd_quantidade': value.prd_quantidade,
						'dcb_codigo': value.dcb_codigo,
						'dcb_discriminacao': value.dcb_discriminacao,
						'dcb_apresentacao': value.dcb_apresentacao,
						'lot_codigo': value.lot_codigo,
						'lot_name': value.lot_name
					}
					Ext.ComponentQuery.query('#_formNotaFiscal #ntf_produtosSelecionados')[0].store.insert((i - 1), _prd);
					i++;
				});
				
            }
        });
	},
	createWindow:function(_obj){
		FacilDesktop.NotaFiscal.isUpdate = false;
		if(!Ext.ComponentQuery.query('#_winNotaFiscal')[0]){
            _winNotaFiscal = this.app.getDesktop().createWindow({
                itemId: '_winNotaFiscal',
                title:'Nota Fiscal',
                width:640,
                height:360,
                animCollapse:false,
                constrainHeader:true,
				renderTo: Ext.getBody(),
				items: [
					{
						xtype: 'form',
						itemId: '_formNotaFiscal',
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
										itemId: 'ntf_codigo',
										name: 'ntf_codigo',
										hidden: true
									},
									{
										xtype: 'container',
										layout: 'hbox',
										border: false,
										defaultType: 'textfield',
										items: [
											{
												fieldLabel: 'Número',
												itemId: 'ntf_numero',
												name: 'ntf_numero',
												width: 450,
												labelWidth: 100,
												fieldStyle: {
													'text-transform': 'uppercase'
												}
											},
											{
												fieldLabel: 'Data',
												xtype: 'datefield',
												format: 'd/m/Y',
												altFormats: 'd/m/Y|d-m-Y|dmY',
												itemId: 'ntf_data',
												name: 'ntf_data',
												width: 155,
												labelWidth: 40,
												padding:'0 0 0 10'
											}
										]
									},
									Ext.create('FacilDesktop.ux.form.ComboBox', {
										fieldLabel: 'Fornecedor',
										itemId: 'ntf_fornecedor',
										name: 'ntf_fornecedor',
										width: 620,
										labelWidth: 100,
										padding:'10 0 10 0',
										valueField: 'for_codigo',
										displayField: 'for_name',
										fields: ['for_codigo', 'for_name'],	// código e descrição a serem mostrados na combo **Uma posição obrigatória
										displayFields:['for_name'],
										store: {type: 'Fornecedor'},
										autoLoad: false,
										/*listeners: {
											'change': function (combo) {
												if (combo.getSelection() && combo.getSelection().data.mun_uf_sigla && combo.getSelection().data.mun_uf_sigla != "") {
													Ext.ComponentQuery.query('#_formNotaFiscal #uf')[0].setValue(combo.getSelection().data.mun_uf_sigla);
												}
											}
										}*/
									}),
									Ext.create('Ext.grid.Panel', {
										header: false,
										itemId: 'ntf_produtosSelecionados',
										width: 620,
										height: 120,
										columnLines:true,
										store: {type: 'ProdutoSelecionado'},
										style:{borderTop:'1px solid #C1C1C1'},
										columns: [
											{dataIndex: 'prd_numero', hidden: true},
											{text: 'Medicamento', dataIndex: 'prd_name', flex: 1},
											{text: 'Quantidade', dataIndex: 'prd_quantidade'},
											{text: 'Lote', dataIndex: 'lot_name'},
											{
												xtype: 'actioncolumn',
												width: 40,
												align: 'center',
												items: [
													{
														icon: 'resources/images/delete.png',
														iconCls: 'x-btn-grid-normal',
														handler: function (grid, rowIndex, colindex) {
															grid.getStore().removeAt(rowIndex);
															/*Ext.ComponentQuery.query('#_formNotaFiscal #aba_anotacao')[0].setTitle('Anotações ('+Ext.ComponentQuery.query('#CadastroForm #ocorrencias_cadastro')[0].store.getRange().length+')');*/
														}
													}
												]
											}
										]/*,
										listeners: {
											'rowclick': function (linha, linha2) {
												Ext.ComponentQuery.query('#_formNotaFiscal #oco_data')[0].setValue(linha2.data.oco_data);
												Ext.ComponentQuery.query('#_formNotaFiscal #oco_descr')[0].setValue(linha2.data.oco_descr);
											}
										}*/
									}),
									{
										xtype: 'container',
										layout: 'hbox',
										border: false,
										width: '100%',
										padding:'10 0 0 0',
										defaultType: 'textfield',
										items: [
											Ext.create('FacilDesktop.ux.form.ComboBox', {
												fieldLabel: 'Medicamento',
												itemId: 'ntf_produto',
												name: 'ntf_produto',
												width: 585,
												labelWidth: 80,
												padding:'10 0 0 0',
												valueField: 'prd_codigo',
												displayField: 'prd_name',
												fields: ['prd_codigo', 'prd_name', 'dcb_codigo', 'dcb_discriminacao', 'dcb_apresentacao'],	// código e descrição a serem mostrados na combo **Uma posição obrigatória
												displayFields:['prd_name'],
												store: {type: 'Produto'},
												autoLoad: false,
												/*listeners: {
													'change': function (combo) {
														if (combo.getSelection() && combo.getSelection().data.mun_uf_sigla && combo.getSelection().data.mun_uf_sigla != "") {
															Ext.ComponentQuery.query('#_formNotaFiscal #uf')[0].setValue(combo.getSelection().data.mun_uf_sigla);
														}
													}
												}*/
											}),
											{
												xtype: 'button',
												icon: 'resources/images/add.png',
												itemId: 'oco_add',
												style: {
													backgroundColor: 'transparent',
													border: 'none'
												},
												padding:'12 0 0 10',
												handler: function () {
													if (Ext.ComponentQuery.query('#_formNotaFiscal #ntf_quantidade')[0].getValue() > 0) {
														Ext.ComponentQuery.query('#_formNotaFiscal #ntf_produtosSelecionados')[0].store.add({
															prd_codigo: Ext.ComponentQuery.query('#_formNotaFiscal #ntf_produto')[0].getSelection().data.prd_codigo,
															prd_name: Ext.ComponentQuery.query('#_formNotaFiscal #ntf_produto')[0].getSelection().data.prd_name,
															dcb_codigo: Ext.ComponentQuery.query('#_formNotaFiscal #ntf_produto')[0].getSelection().data.dcb_codigo,
															dcb_discriminacao: Ext.ComponentQuery.query('#_formNotaFiscal #ntf_produto')[0].getSelection().data.dcb_discriminacao,
															dcb_apresentacao: Ext.ComponentQuery.query('#_formNotaFiscal #ntf_produto')[0].getSelection().data.dcb_apresentacao,
															prd_quantidade: Ext.ComponentQuery.query('#_formNotaFiscal #ntf_quantidade')[0].getValue(),
															lot_codigo: Ext.ComponentQuery.query('#_formNotaFiscal #ntf_lote')[0].getSelection().data.lot_codigo,
															lot_name: Ext.ComponentQuery.query('#_formNotaFiscal #ntf_lote')[0].getSelection().data.lot_name
														});
														Ext.ComponentQuery.query('#_formNotaFiscal #ntf_produto')[0].store.load();
													}
												}
											}
										]
									},
									{
										xtype: 'container',
										layout: 'hbox',
										border: false,
										width: '100%',
										defaultType: 'textfield',
										items: [
											Ext.create('FacilDesktop.ux.form.ComboBox', {
												fieldLabel: 'Lote',
												itemId: 'ntf_lote',
												name: 'ntf_lote',
												width: 435,
												labelWidth: 50,
												padding:'10 0 0 0',
												valueField: 'lot_codigo',
												displayField: 'lot_name',
												fields: ['lot_codigo', 'lot_name'],	// código e descrição a serem mostrados na combo **Uma posição obrigatória
												displayFields:['lot_validate','lot_name'],
												store: {type: 'LoteSelecao'},
												autoLoad: false,
												/*renderer: function(val){
													index = Ext.ComponentQuery.query('#_formNotaFiscal #ntf_lote')[0].store.findExact('lot_validate',val); 
													if (index != -1){
														rs = Ext.ComponentQuery.query('#_formNotaFiscal #ntf_lote')[0].store.getAt(index).data; 
														return rs.display; 
													}
												}*/
												/*listeners: {
													'change': function (combo) {
														if (combo.getSelection() && combo.getSelection().data.mun_uf_sigla && combo.getSelection().data.mun_uf_sigla != "") {
															Ext.ComponentQuery.query('#_formNotaFiscal #uf')[0].setValue(combo.getSelection().data.mun_uf_sigla);
														}
													}
												}*/
											}),
											Ext.create('FacilDesktop.ux.form.NumberField', {
												fieldLabel: 'Quantidade',
												itemId: 'ntf_quantidade',
												name: 'ntf_quantidade',
												width: 170,
												labelWidth: 80,
												padding:'10 0 0 10',
												hideTrigger: true
											})
										]
									}
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
							MyDesktop.getModule('_modNotaFiscal').limparCampos();
						}
					},
					{
						text: 'Carregar',
						itemId:'btnCarregar',
						handler:function(){
							var module = MyDesktop.getModule('_modNotaFiscalLista');
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
							MyDesktop.getModule('_modNotaFiscal').save();
						}
					}
				]
			});
		}
		return _winNotaFiscal;
	}
});