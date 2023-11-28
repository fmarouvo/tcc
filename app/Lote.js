Ext.define('FacilDesktop.Lote', {

	id: '_modLote',
	
	store:null,
	
	isUpdate: false,
	
	save:function(){
		if(
			Ext.ComponentQuery.query('#_formLote #lot_name')[0].getValue()){
			
			acao = 'adicionar';
			
			if (FacilDesktop.Lote.isUpdate == true) {
				acao = 'atualizar';
			}
			
			Ext.Ajax.request({
				url: getURL() + 'app/controller/lote.php',
				method: 'post',
				params: {
					acao: acao,
					p:MyDesktop.getCompany.code,
					lot_codigo: Ext.ComponentQuery.query('#_formLote #lot_codigo')[0].getValue(),
					lot_name: Ext.ComponentQuery.query('#_formLote #lot_name')[0].getValue(),
					lot_manufacturing: Ext.ComponentQuery.query('#_formLote #lot_manufacturing')[0].getValue(),
					lot_validate: Ext.ComponentQuery.query('#_formLote #lot_validate')[0].getValue(),
					lot_barcode: Ext.ComponentQuery.query('#_formLote #lot_barcode')[0].getValue()
				},
				success: function (_resposta, opts) {
					if (_resposta.responseText == "OK") {
						Ext.Msg.alert('Atenção','A lote "'+Ext.ComponentQuery.query('#_formLote #lot_name')[0].getValue().toUpperCase()+'" foi cadastrado com sucesso.',function(){
							MyDesktop.fixMsgBox(_winLote);
							MyDesktop.getModule('_modLote').clearData();
							MyDesktop.getModule('_modLoteLista').refreshView();
						});
						return;
					}
					Ext.Msg.alert('Atenção','Houve um erro ao fazer o cadastro!<br> Tente novamente mais tarde.',function(){
						MyDesktop.fixMsgBox(_winLote);
					});
				},
				failure: function (_resposta, opts) {
					Ext.Msg.alert('Atenção','Houve um erro ao fazer o cadastro!',function(){
						MyDesktop.fixMsgBox(_winLote);
					});
				}
			});
		}else{
			Ext.Msg.alert('Atenção','Preencha todos os campos.',function(){
				MyDesktop.fixMsgBox(_winLote);
			});
		}
	},
	carregarLote: function (codigo) {
		FacilDesktop.Lote.isUpdate = true;
		Ext.Ajax.request({
            url: getURL() + 'app/controller/lote.php',
            params: {
                acao: 'selecionar',
                lot_codigo: codigo,
                p: MyDesktop.getCompany.code
            },
            success: function (_resposta, opts) {
				console.log(_resposta.responseText)
				var data = Ext.decode(_resposta.responseText);
                Ext.ComponentQuery.query('#_formLote #lot_codigo')[0].setValue(data[0].lot_codigo);
                Ext.ComponentQuery.query('#_formLote #lot_name')[0].setValue(data[0].lot_name);
                Ext.ComponentQuery.query('#_formLote #lot_manufacturing')[0].setValue(new Date(data[0].lot_manufacturing));
				Ext.ComponentQuery.query('#_formLote #lot_validate')[0].setValue(new Date(data[0].lot_validate));
				Ext.ComponentQuery.query('#_formLote #lot_barcode')[0].setValue(data[0].lot_barcode);
            }
        });
	},
	clearData: function() {
		FacilDesktop.Lote.isUpdate = false;
		Ext.ComponentQuery.query('#_formLote #lot_codigo')[0].setValue();
		Ext.ComponentQuery.query('#_formLote #lot_name')[0].setValue();
		Ext.ComponentQuery.query('#_formLote #lot_manufacturing')[0].setValue();
		Ext.ComponentQuery.query('#_formLote #lot_validate')[0].setValue();
		Ext.ComponentQuery.query('#_formLote #lot_barcode')[0].setValue();
		MyDesktop.getModule('_modLote').barcode();
	},
	barcode: function() {
		Ext.Ajax.request({
            url: getURL() + 'app/controller/codigoDeBarras.php',
            success: function (_resposta, opts) {
				console.log(_resposta.responseText)
				var data = Ext.decode(_resposta.responseText);
                Ext.ComponentQuery.query('#_formLote #lot_barcode')[0].setValue(data.lot_barcode);
            }
        });
	},
	print: function () {
        if(Ext.ComponentQuery.query('#_formLote')[0].isValid()){

            var _dados = Ext.ComponentQuery.query('#_formLote')[0].getValues();

            MyDesktop.waitMessage('Montando o pdf', 'Enviando...');
            Ext.Ajax.request({
                timeout:120000,
                url: 'app/controller/relCodigoDeBarras.php',
                method: 'post',
                params: {
                    p: MyDesktop.getCompany.code,
                    numero: Ext.ComponentQuery.query('#_formLote #lot_barcode')[0].getValue()
                },
                success: function (_resposta, opts) {
                    Ext.Msg.close();
                    window.open(_resposta.responseText);
                },
                failure: function (_resposta, opts) {
                    Ext.Msg.alert("Atenção","Ocorreu um erro!");
                }
            });

        }else{
            Ext.Msg.alert('Atenção', 'Houve um erro, tente novamente mais tarde!');
        }
    },
	createWindow:function(_obj){
		FacilDesktop.Lote.isUpdate = false;
		if(!Ext.ComponentQuery.query('#_winLote')[0]){
            _winLote = this.app.getDesktop().createWindow({
                itemId: '_winLote',
                title:'Lote',
                width:430,
                height:220,
                animCollapse:false,
                constrainHeader:true,
				renderTo: Ext.getBody(),
				listeners: {
					afterrender: function() {
						MyDesktop.getModule('_modLote').clearData();
					},
				},
				items: [
					{
						xtype: 'form',
						itemId: '_formLote',
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
										itemId: 'lot_codigo',
										name: 'lot_codigo',
										hidden: true
									},
									{
										fieldLabel: 'Lote',
										itemId: 'lot_name',
										name: 'lot_name',
										width: 400,
										labelWidth: 100,
										fieldStyle: {
											'text-transform': 'uppercase'
										}
									},
									{
										fieldLabel: 'Fabricação',
										xtype: 'datefield',
										format: 'd/m/Y',
										altFormats: 'd/m/Y|d-m-Y|dmY',
										itemId: 'lot_manufacturing',
										name: 'lot_manufacturing',
										width: 280,
										labelWidth: 100,
										padding:'10 0 0 0',
										value: new Date()
									},
									{
										fieldLabel: 'Validade',
										xtype: 'datefield',
										format: 'd/m/Y',
										altFormats: 'd/m/Y|d-m-Y|dmY',
										itemId: 'lot_validate',
										name: 'lot_validate',
										width: 280,
										labelWidth: 100,
										padding:'10 0 0 0',
										value: new Date()
									},
									{
										xtype: 'container',
										layout: 'hbox',
										border: false,
										padding:'10 0 0 0',
										defaultType: 'textfield',
										items: [
											{
												fieldLabel: 'Cód. de barras',
												itemId: 'lot_barcode',
												name: 'lot_barcode',
												width: 280,
												labelWidth: 100,
												padding:'10 5 0 0',
												readOnly: true,
												disabled: true,
												fieldStyle: {
													'text-transform': 'uppercase'
												}
											},
											{
												xtype: 'button',
												text: 'Imprimir',
												itemId:'btnPrint',
												margin: '10 0 0 0',
												handler:function(){
													MyDesktop.getModule('_modLote').print();
												}
											}
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
							MyDesktop.getModule('_modLote').clearData();
						}
					},
					{
						text: 'Carregar',
						itemId:'btnCarregar',
						handler:function(){
							var module = MyDesktop.getModule('_modLoteLista');
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
							MyDesktop.getModule('_modLote').save();
						}
					}
				]
			});
		}
		return _winLote;
	}
});