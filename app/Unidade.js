Ext.define('FacilDesktop.Unidade', {

	id: '_modUnidade',
	
	store:null,
	
	isUpdate: false,
	
	save:function(){
		if(
			Ext.ComponentQuery.query('#_formUnidade #uni_name')[0].getValue() 
			&& Ext.ComponentQuery.query('#_formUnidade #uni_prefix')[0].getValue()){
			
			acao = 'adicionar';
			
			if (FacilDesktop.Unidade.isUpdate == true) {
				acao = 'atualizar';
			}
			
			Ext.Ajax.request({
				url: getURL() + 'app/controller/unidade.php',
				method: 'post',
				params: {
					acao: acao,
					p:MyDesktop.getCompany.code,
					uni_codigo: Ext.ComponentQuery.query('#_formUnidade #uni_codigo')[0].getValue(),
					uni_name: Ext.ComponentQuery.query('#_formUnidade #uni_name')[0].getValue(),
					uni_prefix: Ext.ComponentQuery.query('#_formUnidade #uni_prefix')[0].getValue()
				},
				success: function (_resposta, opts) {
					if (_resposta.responseText == "OK") {
						Ext.Msg.alert('Atenção','A unidade "'+Ext.ComponentQuery.query('#_formUnidade #uni_name')[0].getValue().toUpperCase()+'" foi cadastrada com sucesso.',function(){
							MyDesktop.getModule('_modUnidadeLista').refreshView();
							MyDesktop.fixMsgBox(_winUnidade);
							Ext.ComponentQuery.query('#_formUnidade #uni_codigo')[0].setValue();
							Ext.ComponentQuery.query('#_formUnidade #uni_name')[0].setValue();
							Ext.ComponentQuery.query('#_formUnidade #uni_prefix')[0].setValue();
							FacilDesktop.Unidade.isUpdate = false;
						});
						return;
					}
					Ext.Msg.alert('Atenção','Houve um erro ao fazer o cadastro!<br>Certifique-se de que o prefixo da unidade ainda não existe.',function(){
						MyDesktop.fixMsgBox(_winUnidade);
					});
				},
				failure: function (_resposta, opts) {
					Ext.Msg.alert('Atenção','Houve um erro ao fazer o cadastro!',function(){
						MyDesktop.fixMsgBox(_winUnidade);
					});
				}
			});
		}else{
			Ext.Msg.alert('Atenção','Preencha todos os campos.',function(){
				MyDesktop.fixMsgBox(_winUnidade);
			});
		}
	},
	carregarUnidade: function (codigo) {
		FacilDesktop.Unidade.isUpdate = true;
		Ext.Ajax.request({
            url: getURL() + 'app/controller/unidade.php',
            params: {
                acao: 'selecionar',
                uni_codigo: codigo,
                p: MyDesktop.getCompany.code
            },
            success: function (_resposta, opts) {
				console.log(_resposta.responseText)
				var data = Ext.decode(_resposta.responseText);
                Ext.ComponentQuery.query('#_formUnidade #uni_codigo')[0].setValue(data[0].uni_codigo);
                Ext.ComponentQuery.query('#_formUnidade #uni_name')[0].setValue(data[0].uni_name);
                Ext.ComponentQuery.query('#_formUnidade #uni_prefix')[0].setValue(data[0].uni_prefix);
            }
        });
	},
	createWindow:function(_obj){
		FacilDesktop.Unidade.isUpdate = false;
		if(!Ext.ComponentQuery.query('#_winUnidade')[0]){
            _winUnidade = this.app.getDesktop().createWindow({
                itemId: '_winUnidade',
                title:'Unidade de medida',
                width:430,
                height:140,
                animCollapse:false,
                constrainHeader:true,
				renderTo: Ext.getBody(),
				items: [
					{
						xtype: 'form',
						itemId: '_formUnidade',
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
										itemId: 'uni_codigo',
										name: 'uni_codigo',
										hidden: true
									},
									{
										fieldLabel: 'Nome',
										itemId: 'uni_name',
										name: 'uni_name',
										width: 400,
										labelWidth: 100,
										fieldStyle: {
											'text-transform': 'uppercase'
										}
									},
									{
										fieldLabel: 'Abreviação',
										itemId: 'uni_prefix',
										name: 'uni_prefix',
										width: 180,
										labelWidth: 100,
										padding:'10 0 0 0',
										allowBlank:false,
										maxLength: 2,
										fieldStyle: {
											'text-transform': 'uppercase'
										}
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
							FacilDesktop.Unidade.isUpdate = false;
							Ext.ComponentQuery.query('#_formUnidade #uni_codigo')[0].setValue();
							Ext.ComponentQuery.query('#_formUnidade #uni_name')[0].setValue();
							Ext.ComponentQuery.query('#_formUnidade #uni_prefix')[0].setValue();
						}
					},
					{
						text: 'Carregar',
						itemId:'btnCarregar',
						handler:function(){
							var module = MyDesktop.getModule('_modUnidadeLista');
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
							MyDesktop.getModule('_modUnidade').save();
						}
					}
				]
			});
		}
		return _winUnidade;
	}
});