Ext.define('FacilDesktop.Prontuario', {

	id: '_modProntuario',
	
	store:null,
	
	isUpdate: false,
	
	save:function(){
		if(Ext.ComponentQuery.query('#_formProntuario #prt_paciente')[0].getValue()){
			
			acao = 'adicionar';
			
			if (FacilDesktop.Prontuario.isUpdate == true) {
				acao = 'atualizar';
			}
			
			var productsArray = [];
			Ext.ComponentQuery.query('#_formProntuario #prt_produtosSelecionados')[0].store.data.items.forEach(function(value, key){
			  productsArray.push(value.data);
			});
			
			Ext.Ajax.request({
				url: getURL() + 'app/controller/prontuario.php',
				method: 'post',
				params: {
					acao: acao,
					p:MyDesktop.getCompany.code,
					prt_codigo: Ext.ComponentQuery.query('#_formProntuario #prt_codigo')[0].getValue(),
					prt_descr: Ext.ComponentQuery.query('#_formProntuario #prt_descr')[0].getValue(),
					prt_produto: btoa(Ext.encode(productsArray)),
					pac_codigo: Ext.ComponentQuery.query('#_formProntuario #prt_paciente')[0].getSelection().data.pac_codigo,
					pac_name: Ext.ComponentQuery.query('#_formProntuario #prt_paciente')[0].getSelection().data.pac_name,
					prt_data: Ext.ComponentQuery.query('#_formProntuario #prt_data')[0].getValue()
				},
				success: function (_resposta, opts) {
					if (_resposta.responseText == "OK") {
						Ext.Msg.alert('Atenção','O prontuario "'+Ext.ComponentQuery.query('#_formProntuario #prt_paciente')[0].getSelection().data.pac_name.toUpperCase()+'" foi cadastrado com sucesso.',function(){
							MyDesktop.getModule('_modProntuarioLista').refreshView();
							MyDesktop.fixMsgBox(_winProntuario);
							Ext.ComponentQuery.query('#_formProntuario #prt_codigo')[0].getValue();
							Ext.ComponentQuery.query('#_formProntuario #prt_paciente')[0].getValue();
							Ext.ComponentQuery.query('#_formProntuario #prt_descr')[0].getValue();
							Ext.ComponentQuery.query('#_formProntuario #prt_data')[0].getValue();
							FacilDesktop.Prontuario.isUpdate = false;
						});
						Ext.ComponentQuery.query('#_formProntuario #prt_produtosSelecionados')[0].store.removeAll();
						Ext.ComponentQuery.query('#_formProntuario #prt_produtosSelecionados')[0].store.load();
						Ext.ComponentQuery.query('#_formProntuario #prt_produto')[0].store.load({
							callback : function(_ret){
								Ext.ComponentQuery.query('#_formProntuario #prt_produto')[0].setValue('');
							}
						});
						Ext.ComponentQuery.query('#_formProntuario #prt_quantidade')[0].setValue();
						MyDesktop.getModule('_modProntuario').clear();
						return;
					}
					Ext.Msg.alert('Atenção','Houve um erro ao fazer o cadastro!<br>Certifique-se de que o prefixo da prontuario ainda não existe.',function(){
						MyDesktop.fixMsgBox(_winProntuario);
					});
				},
				failure: function (_resposta, opts) {
					Ext.Msg.alert('Atenção','Houve um erro ao fazer o cadastro!',function(){
						MyDesktop.fixMsgBox(_winProntuario);
					});
				}
			});
		}else{
			Ext.Msg.alert('Atenção','Preencha todos os campos.',function(){
				MyDesktop.fixMsgBox(_winProntuario);
			});
		}
	},
	carregarProntuario: function (codigo) {
		MyDesktop.getModule('_modProntuario').clear();
		FacilDesktop.Prontuario.isUpdate = true;
		Ext.Ajax.request({
            url: getURL() + 'app/controller/prontuario.php',
            params: {
                acao: 'selecionar',
                prt_codigo: codigo,
                p: MyDesktop.getCompany.code
            },
            success: function (_resposta, opts) {
				console.log(_resposta.responseText)
				var data = Ext.decode(_resposta.responseText);
                Ext.ComponentQuery.query('#_formProntuario #prt_codigo')[0].setValue(data[0].prt_codigo);
                Ext.ComponentQuery.query('#_formProntuario #prt_descr')[0].setValue(data[0].prt_descr);
                Ext.ComponentQuery.query('#_formProntuario #prt_produto')[0].setValue(data[0].prt_produto);
                Ext.ComponentQuery.query('#_formProntuario #prt_data')[0].setValue(data[0].prt_data);
				
				Ext.ComponentQuery.query('#_formProntuario #prt_paciente')[0].store.load({
					callback : function(_ret){
						if(_ret.length > 0){
							var recordNumber = Ext.ComponentQuery.query('#_formProntuario #prt_paciente')[0].store.findExact(Ext.ComponentQuery.query('#_formProntuario #prt_paciente')[0].valueField, parseInt(data[0].pac_codigo), 0);
                            //Ext.ComponentQuery.query('#_formProntuario #prt_paciente')[0].setSelection(recordNumber);
							Ext.ComponentQuery.query('#_formProntuario #prt_paciente')[0].select(Ext.ComponentQuery.query('#_formProntuario #prt_paciente')[0].store.getAt(recordNumber))
                        }
					}
				});
				
				var products = Ext.decode(atob(data[0].prt_produto));
				var i = 0;
				products.forEach(function(value, key){
					var _prd = {
						'prd_codigo': value.prd_codigo,
						'prd_name': value.prd_name,
						'prd_quantidade': value.prd_quantidade,
						'dcb_codigo': value.dcb_codigo,
						'lot_codigo': value.lot_codigo,
						'lot_name': value.lot_name
					}
					Ext.ComponentQuery.query('#_formProntuario #prt_produtosSelecionados')[0].store.insert((i - 1), _prd);
					i++;
				});
            }
        });
	},
	clear: function() {
		FacilDesktop.Prontuario.isUpdate = false;
		Ext.ComponentQuery.query('#_formProntuario #prt_codigo')[0].setValue();
		Ext.ComponentQuery.query('#_formProntuario #prt_data')[0].setValue(new Date());
		Ext.ComponentQuery.query('#_formProntuario #prt_descr')[0].setValue();
		Ext.ComponentQuery.query('#_formProntuario #prt_paciente')[0].setValue();
		Ext.ComponentQuery.query('#_formProntuario #prt_produtosSelecionados')[0].store.removeAll();
		Ext.ComponentQuery.query('#_formProntuario #prt_produtosSelecionados')[0].store.load();
		
		Ext.ComponentQuery.query('#_formProntuario #prt_idade')[0].setValue();
		Ext.ComponentQuery.query('#_formProntuario #prt_peso')[0].setValue();
		Ext.ComponentQuery.query('#_formProntuario #prt_telefone')[0].setValue();
		Ext.ComponentQuery.query('#_formProntuario #prt_endereco')[0].setValue();
		Ext.ComponentQuery.query('#_formProntuario #prt_cidade')[0].setValue();
		
		Ext.ComponentQuery.query('#_formProntuario #prt_produto')[0].reset();
		Ext.ComponentQuery.query('#_formProntuario #prt_lote')[0].reset();
		Ext.ComponentQuery.query('#_formProntuario #prt_quantidade')[0].setValue();
	},
	dataAniversario: function(birthday) {
		var year   = parseInt(birthday.substring(0,4));
		var month  = parseInt(birthday.substring(5,7));
		var day   = parseInt(birthday.substring(8,10));
		var birthDate = new Date(year, month-1, day);
		
	    let yearNow = new Date().getFullYear();
		let monthNow = new Date().getMonth() + 1;
		let dayNow = new Date().getDate();
		if (monthNow === month && dayNow < day || monthNow < month) {
		  return yearNow - year - 1;
		} else {
		  return yearNow - year;
		}
	},
	createWindow:function(_obj){
		FacilDesktop.Prontuario.isUpdate = false;
		if(!Ext.ComponentQuery.query('#_winProntuario')[0]){
            _winProntuario = this.app.getDesktop().createWindow({
                itemId: '_winProntuario',
                title:'Prontuário',
                width:640,
                height:440,
				overflowY: 'auto',
                animCollapse:false,
                constrainHeader:true,
				renderTo: Ext.getBody(),
				items: [
					{
						xtype: 'form',
						itemId: '_formProntuario',
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
										xtype: 'container',
										layout: 'hbox',
										border: false,
										defaultType: 'textfield',
										items: [
											{
												itemId: 'prt_codigo',
												name: 'prt_codigo',
												hidden: true
											},
											Ext.create('FacilDesktop.ux.form.ComboBox', {
												fieldLabel: 'Paciente',
												itemId: 'prt_paciente',
												name: 'prt_paciente',
												width: 385,
												labelWidth: 60,
												valueField: 'pac_codigo',
												displayField: 'pac_name',
												fields: ['pac_codigo', 'pac_name'],	// código e descrição a serem mostrados na combo **Uma posição obrigatória
												displayFields:['pac_name'],
												store: {type: 'Paciente'},
												autoLoad: false,
												listeners: {
													'change': function (combo) {
														if (combo.getSelection() && combo.getSelection().data.pac_name && combo.getSelection().data.pac_name != "") {
															Ext.ComponentQuery.query('#_formProntuario #prt_idade')[0].setValue("40");
															Ext.ComponentQuery.query('#_formProntuario #prt_peso')[0].setValue(combo.getSelection().data.pac_peso);
															Ext.ComponentQuery.query('#_formProntuario #prt_telefone')[0].setValue(combo.getSelection().data.pac_telefone);
															Ext.ComponentQuery.query('#_formProntuario #prt_endereco')[0].setValue(combo.getSelection().data.pac_endereco);
															Ext.ComponentQuery.query('#_formProntuario #prt_cidade')[0].setValue(combo.getSelection().data.pac_cidade);
														}
													}
												}
											}),
											{
												fieldLabel: 'Data',
												xtype: 'datefield',
												format: 'd/m/Y',
												altFormats: 'd/m/Y|d-m-Y|dmY',
												itemId: 'prt_data',
												name: 'prt_data',
												readOnly: true,
												width: 205,
												labelWidth: 60,
												padding:'0 0 0 10',
												value: new Date()
											}
										]
									},
									{
										xtype: 'container',
										layout: 'hbox',
										border: false,
										defaultType: 'textfield',
										items: [
											{
												fieldLabel: 'Idade',
												itemId: 'prt_idade',
												name: 'prt_idade',
												width: 180,
												labelWidth: 60,
												padding:'10 0 0 0',
												readOnly: true,
												fieldStyle: {
													'text-transform': 'uppercase'
												}
											},
											{
												fieldLabel: 'Peso',
												itemId: 'prt_peso',
												name: 'prt_peso',
												width: 190,
												labelWidth: 40,
												padding:'10 0 0 10',
												readOnly: true,
												fieldStyle: {
													'text-transform': 'uppercase'
												}
											},
											{
												fieldLabel: 'Telefone',
												itemId: 'prt_telefone',
												name: 'prt_telefone',
												width: 205,
												labelWidth: 60,
												padding:'10 0 0 10',
												readOnly: true,
												fieldStyle: {
													'text-transform': 'uppercase'
												}
											}
										]
									},
									{
										xtype: 'container',
										layout: 'hbox',
										border: false,
										padding:'0 0 10 0',
										defaultType: 'textfield',
										items: [
											{
												fieldLabel: 'Endereço',
												itemId: 'prt_endereco',
												name: 'prt_endereco',
												width: 385,
												labelWidth: 60,
												padding:'10 0 0 0',
												readOnly: true,
												fieldStyle: {
													'text-transform': 'uppercase'
												}
											},
											{
												fieldLabel: 'Cidade',
												itemId: 'prt_cidade',
												name: 'prt_cidade',
												width: 205,
												labelWidth: 60,
												padding:'10 0 0 10',
												readOnly: true,
												fieldStyle: {
													'text-transform': 'uppercase'
												}
											}
										]
									},
									{
										xtype:'container',
										layout:'hbox',
										width:'100%',
										items:[
											{
												xtype:'textarea',
												itemId:'prt_descr',
												name:'prt_descr',
												width: 605,
												height: 70,
												emptyText:'Medicações do paciente',
												fieldStyle:{
													textTransform:'uppercase'
												}
											}
										]
									},
									Ext.create('Ext.grid.Panel', {
										header: false,
										itemId: 'prt_produtosSelecionados',
										width: 605,
										height: 100,
										columnLines:true,
										store: {type: 'ProdutoSelecionado'},
										style:{
											border:'1px solid #C1C1C1',
											marginTop:'10px'
										},
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
															/*Ext.ComponentQuery.query('#_formProntuario #aba_anotacao')[0].setTitle('Anotações ('+Ext.ComponentQuery.query('#CadastroForm #ocorrencias_cadastro')[0].store.getRange().length+')');*/
														}
													}
												]
											}
										]/*,
										listeners: {
											'rowclick': function (linha, linha2) {
												Ext.ComponentQuery.query('#_formProntuario #oco_data')[0].setValue(linha2.data.oco_data);
												Ext.ComponentQuery.query('#_formProntuario #oco_descr')[0].setValue(linha2.data.oco_descr);
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
												itemId: 'prt_produto',
												name: 'prt_produto',
												width: 570,
												labelWidth: 80,
												padding:'10 0 0 0',
												valueField: 'prd_codigo',
												displayField: 'prd_name',
												fields: ['prd_codigo', 'prd_name', 'dcb_codigo', 'dcb_discriminacao', 'dcb_apresentacao'],
												displayFields:['prd_name'],
												store: {type: 'Produto'},
												autoLoad: false,
												listeners: {
													change: function (combo) {
														if (combo.getSelection() && combo.getSelection().data.prd_name && combo.getSelection().data.prd_name != "") {
															Ext.Ajax.request({
																url: getURL() + 'app/controller/lote.php',
																params: {
																	acao: 'lotePorProduto',
																	prd_codigo: Ext.ComponentQuery.query('#_formProntuario #prt_produto')[0].getSelection().data.prd_codigo,
																	p: MyDesktop.getCompany.code
																},
																success: function (_resposta, opts) {
																	Ext.ComponentQuery.query('#_formProntuario #prt_lote')[0].reset();
																	var dados = Ext.decode(_resposta.responseText);
																	Ext.ComponentQuery.query('#_formProntuario #prt_lote')[0].store.loadData(dados);
																	console.log(_resposta.responseText);
																}
															});
														}
													}
												}
											}),
											{
												xtype: 'button',
												icon: 'resources/images/add.png',
												itemId: 'prt_add',
												style: {
													backgroundColor: 'transparent',
													border: 'none'
												},
												padding:'12 0 0 10',
												handler: function () {
													if (Ext.ComponentQuery.query('#_formProntuario #prt_quantidade')[0].getValue() > 0) {
														Ext.Ajax.request({
															url: getURL() + 'app/controller/prontuario.php',
															params: {
																acao: 'verificarEstoque',
																prd_codigo: Ext.ComponentQuery.query('#_formProntuario #prt_produto')[0].getSelection().data.prd_codigo,
																lot_codigo: Ext.ComponentQuery.query('#_formProntuario #prt_lote')[0].getSelection().data.lot_codigo,
																p: MyDesktop.getCompany.code
															},
															success: function (_resposta, opts) {
																if(_resposta.responseText >= Ext.ComponentQuery.query('#_formProntuario #prt_quantidade')[0].getValue()) {
																	Ext.ComponentQuery.query('#_formProntuario #prt_produtosSelecionados')[0].store.add({
																		prd_codigo: Ext.ComponentQuery.query('#_formProntuario #prt_produto')[0].getSelection().data.prd_codigo,
																		prd_name: Ext.ComponentQuery.query('#_formProntuario #prt_produto')[0].getSelection().data.prd_name,
																		dcb_codigo: Ext.ComponentQuery.query('#_formProntuario #prt_produto')[0].getSelection().data.dcb_codigo,
																		dcb_discriminacao: Ext.ComponentQuery.query('#_formProntuario #prt_produto')[0].getSelection().data.dcb_discriminacao,
																		dcb_apresentacao: Ext.ComponentQuery.query('#_formProntuario #prt_produto')[0].getSelection().data.dcb_apresentacao,
																		prd_quantidade: Ext.ComponentQuery.query('#_formProntuario #prt_quantidade')[0].getValue(),
																		lot_codigo: Ext.ComponentQuery.query('#_formProntuario #prt_lote')[0].getSelection().data.lot_codigo,
																		lot_name: Ext.ComponentQuery.query('#_formProntuario #prt_lote')[0].getSelection().data.lot_name
																	});
																	Ext.ComponentQuery.query('#_formProntuario #prt_produto')[0].reset();
																	Ext.ComponentQuery.query('#_formProntuario #prt_lote')[0].reset();
																	Ext.ComponentQuery.query('#_formProntuario #prt_quantidade')[0].setValue();
																} else {
																	Ext.Msg.alert('Atenção','A quantidade informada do medicamento não está disponível em estoque ('+ _resposta.responseText +') no lote selecionado.',function(){});
																}
																
															}
														});
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
												itemId: 'prt_lote',
												name: 'prt_lote',
												width: 435,
												labelWidth: 50,
												padding:'10 0 0 0',
												valueField: 'lot_codigo',
												displayField: 'lot_name',
												fields: ['lot_codigo', 'lot_name'],	
												displayFields:['lot_validate','lot_name'],
												store: {type: 'LoteSelecao'},
												autoLoad: false,
											}),
											Ext.create('FacilDesktop.ux.form.NumberField', {
												fieldLabel: 'Quantidade',
												itemId: 'prt_quantidade',
												name: 'prt_quantidade',
												width: 155,
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
							MyDesktop.getModule('_modProntuario').clear();
						}
					},
					{
						text: 'Carregar',
						itemId:'btnCarregar',
						handler:function(){
							var module = MyDesktop.getModule('_modProntuarioLista');
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
							MyDesktop.getModule('_modProntuario').save();
						}
					}
				],
				listeners: {
					afterRender: function() {
						if(MyDesktop.userPermission == 'Normal') {
							setTimeout(function(){
								alert = Ext.Msg.alert('Atenção','Você não tem acesso ao cadastro de prontuários.',function(){
								MyDesktop.fixMsgBox(_winProntuario);
									_winProntuario.close();
								});
							}, 500);
							Ext.WindowManager.bringToFront( alert );
							return;
						}
					}
				}
			});
		}
		return _winProntuario;
	}
});