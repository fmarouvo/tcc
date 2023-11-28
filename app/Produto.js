Ext.define('FacilDesktop.Produto', {

	id: '_modProduto',
	
	store:null,
	
	isUpdate: false,
	
	save:function(){
		if(
			Ext.ComponentQuery.query('#_formProduto #prd_name')[0].getValue()){
			
			acao = 'adicionar';
			
			if (FacilDesktop.Produto.isUpdate == true) {
				acao = 'atualizar';
			}
			
			Ext.Ajax.request({
				url: getURL() + 'app/controller/produto.php',
				method: 'post',
				params: {
					acao: acao,
					p:MyDesktop.getCompany.code,
					prd_codigo: Ext.ComponentQuery.query('#_formProduto #prd_codigo')[0].getValue(),
					prd_name: Ext.ComponentQuery.query('#_formProduto #prd_name')[0].getValue(),
					dcb_codigo: Ext.ComponentQuery.query('#_formProduto #dcb_codigo')[0].getValue()
				},
				success: function (_resposta, opts) {
					if (_resposta.responseText == "OK") {
						Ext.Msg.alert('Atenção','O produto "'+Ext.ComponentQuery.query('#_formProduto #prd_name')[0].getValue().toUpperCase()+'" foi cadastrado com sucesso.',function(){
							MyDesktop.getModule('_modProdutoLista').refreshView();
							MyDesktop.fixMsgBox(_winProduto);
							Ext.ComponentQuery.query('#_formProduto #prd_codigo')[0].setValue();
							Ext.ComponentQuery.query('#_formProduto #prd_name')[0].setValue();
							Ext.ComponentQuery.query('#_formProduto #dcb_codigo')[0].setValue();
						});
						return;
					}
					Ext.Msg.alert('Atenção','Houve um erro ao fazer o cadastro!<br> Tente novamente mais tarde.',function(){
						MyDesktop.fixMsgBox(_winProduto);
					});
				},
				failure: function (_resposta, opts) {
					Ext.Msg.alert('Atenção','Houve um erro ao fazer o cadastro!',function(){
						MyDesktop.fixMsgBox(_winProduto);
					});
				}
			});
		}else{
			Ext.Msg.alert('Atenção','Preencha todos os campos.',function(){
				MyDesktop.fixMsgBox(_winProduto);
			});
		}
	},
	carregarProduto: function (codigo) {
		FacilDesktop.Produto.isUpdate = true;
		Ext.Ajax.request({
            url: getURL() + 'app/controller/produto.php',
            params: {
                acao: 'selecionar',
                prd_codigo: codigo,
                p: MyDesktop.getCompany.code
            },
            success: function (_resposta, opts) {
				console.log(_resposta.responseText)
				var data = Ext.decode(_resposta.responseText);
                Ext.ComponentQuery.query('#_formProduto #prd_codigo')[0].setValue(data[0].prd_codigo);
                Ext.ComponentQuery.query('#_formProduto #prd_name')[0].setValue(data[0].prd_name);
				Ext.ComponentQuery.query('#_formProduto #dcb_codigo')[0].setValue(data[0].dcb_codigo);
            }
        });
	},
	createWindow:function(_obj){
		FacilDesktop.Produto.isUpdate = false;
		if(!Ext.ComponentQuery.query('#_winProduto')[0]){
            _winProduto = this.app.getDesktop().createWindow({
                itemId: '_winProduto',
                title:'Produto',
                width:430,
                height:160,
                animCollapse:false,
                constrainHeader:true,
				renderTo: Ext.getBody(),
				items: [
					{
						xtype: 'form',
						itemId: '_formProduto',
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
										itemId: 'prd_codigo',
										name: 'prd_codigo',
										hidden: true
									},
									{
										fieldLabel: 'Nome',
										itemId: 'prd_name',
										name: 'prd_name',
										width: 400,
										labelWidth: 100,
										margin: '0 0 10 0',
										fieldStyle: {
											'text-transform': 'uppercase'
										}
									},
									{
										fieldLabel: 'Código DCB',
										itemId: 'dcb_codigo',
										name: 'dcb_codigo',
										width: 400,
										labelWidth: 100,
										margin: '0 0 10 0',
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
							FacilDesktop.Produto.isUpdate = false;
							Ext.ComponentQuery.query('#_formProduto #prd_codigo')[0].setValue();
							Ext.ComponentQuery.query('#_formProduto #prd_name')[0].setValue();
							Ext.ComponentQuery.query('#_formProduto #dcb_codigo')[0].setValue();
						}
					},
					{
						text: 'Carregar',
						itemId:'btnCarregar',
						handler:function(){
							var module = MyDesktop.getModule('_modProdutoLista');
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
							MyDesktop.getModule('_modProduto').save();
						}
					}
				]
			});
		}
		return _winProduto;
	}
});