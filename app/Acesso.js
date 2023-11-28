Ext.define('FacilDesktop.Acesso', {

	id: '_modAcesso',
	store:null,
	isUpdate: false,
	
	save:function(){
		if(Ext.ComponentQuery.query('#_formAcesso #usu_senhaNova')[0].getValue() && Ext.ComponentQuery.query('#_formAcesso #usu_senhaConfirm')[0].getValue() && Ext.ComponentQuery.query('#_formAcesso #usu_senhaNova')[0].getValue()==Ext.ComponentQuery.query('#_formAcesso #usu_senhaConfirm')[0].getValue()){
			
			acao = 'adicionar';
			
			if (FacilDesktop.Acesso.isUpdate == true) {
				acao = 'atualizar';
			}
			
			Ext.Ajax.request({
				url: getURL() + 'app/controller/usuario.php',
				method: 'post',
				params: {
					acao: acao,
					p:MyDesktop.getCompany.code,
					usu_login: Ext.ComponentQuery.query('#_formAcesso #usu_login')[0].getValue(),
					usu_senha: Ext.ComponentQuery.query('#_formAcesso #usu_senhaNova')[0].getValue(),
					usu_email: Ext.ComponentQuery.query('#_formAcesso #usu_email')[0].getValue(),
					per_codigo: Ext.ComponentQuery.query('#_formAcesso #usu_permissao')[0].getSelection().data.per_codigo,
					per_name: Ext.ComponentQuery.query('#_formAcesso #usu_permissao')[0].getSelection().data.per_name
				},
				success: function (_resposta, opts) {
					MyDesktop.userPass=Ext.ComponentQuery.query('#_formAcesso #usu_senhaNova')[0].getValue();
					Ext.Msg.alert('Atenção','O usuário '+Ext.ComponentQuery.query('#_formAcesso #usu_login')[0].getValue().toUpperCase()+' foi cadastrado(a) com sucesso.',function(){
						MyDesktop.fixMsgBox(_winAcesso);
						Ext.ComponentQuery.query('#_formAcesso #usu_login')[0].setValue();
						Ext.ComponentQuery.query('#_formAcesso #usu_senhaNova')[0].setValue();
						Ext.ComponentQuery.query('#_formAcesso #usu_email')[0].setValue();
						Ext.ComponentQuery.query('#_formAcesso #usu_permissao')[0].store.load({
							callback : function(_ret){
								Ext.ComponentQuery.query('#_formAcesso #usu_permissao')[0].setValue('');
							}
						});
						FacilDesktop.Acesso.isUpdate = false;
					});
				},
				failure: function (_resposta, opts) {
					Ext.Msg.alert('Atenção','Houve um erro ao fazer o cadastro!',function(){
						MyDesktop.fixMsgBox(_winAcesso);
					});
				}
			});
		}else{
			Ext.Msg.alert('Atenção','A nova senha não confere com a confirmação.',function(){
				MyDesktop.fixMsgBox(_winAcesso);
			});
		}
	},
	carregarAcesso: function (codigo) {
		FacilDesktop.Acesso.isUpdate = true;
		Ext.Ajax.request({
            url: getURL() + 'app/controller/usuario.php',
            params: {
                acao: 'selecionar',
                usu_login: codigo,
                p: MyDesktop.getCompany.code
            },
            success: function (_resposta, opts) {
				console.log(_resposta.responseText)
				var data = Ext.decode(_resposta.responseText);
                Ext.ComponentQuery.query('#_formAcesso #usu_login')[0].setValue(data[0].usu_login);
                Ext.ComponentQuery.query('#_formAcesso #usu_email')[0].setValue(data[0].usu_email);
                Ext.ComponentQuery.query('#_formAcesso #usu_senhaNova')[0].setValue(data[0].usu_senha);
                Ext.ComponentQuery.query('#_formAcesso #usu_senhaConfirm')[0].setValue(data[0].usu_senha);
				Ext.ComponentQuery.query('#_formAcesso #usu_permissao')[0].store.load({
					callback : function(_ret){
						if(_ret.length > 0){
							var recordNumber = Ext.ComponentQuery.query('#_formAcesso #usu_permissao')[0].store.findExact(Ext.ComponentQuery.query('#_formAcesso #usu_permissao')[0].valueField, parseInt(data[0].per_codigo), 0);
                            Ext.ComponentQuery.query('#_formAcesso #usu_permissao')[0].setSelection(recordNumber);
                        }
					}
				});
            }
        });
	},
	createWindow:function(_obj){
		FacilDesktop.Acesso.isUpdate = false;
		if(!Ext.ComponentQuery.query('#_winAcesso')[0]){
            _winAcesso = this.app.getDesktop().createWindow({
                itemId: '_winAcesso',
                title:'Usuário do Sistema',
                width:430,
                height:250,
                animCollapse:false,
                constrainHeader:true,
				renderTo: Ext.getBody(),
				items: [
					{
						xtype: 'form',
						itemId: '_formAcesso',
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
										fieldLabel: 'Usuário',
										itemId: 'usu_login',
										name: 'usu_login',
										width: 400,
										labelWidth: 140,
										fieldStyle: {
											'text-transform': 'uppercase'
										}
									},
									{
										fieldLabel: 'E-mail',
										itemId: 'usu_email',
										name: 'usu_email',
										width: 400,
										labelWidth: 140,
										padding:'10 0 0 0',
										allowBlank:false,
										fieldStyle: {
											'text-transform': 'uppercase'
										}
									},
									{
										inputType:'password',
										fieldLabel: 'Nova Senha',
										itemId: 'usu_senhaNova',
										name: 'usu_senhaNova',
										width: 400,
										labelWidth: 140,
										padding:'10 0 0 0',
										allowBlank:false,
										fieldStyle: {
											'text-transform': 'uppercase'
										}
									},
									{
										inputType:'password',
										fieldLabel: 'Confirmar nova Senha',
										itemId: 'usu_senhaConfirm',
										name: 'usu_senhaConfirm',
										width: 400,
										labelWidth: 140,
										padding:'10 0 0 0',
										allowBlank:false,
										fieldStyle: {
											'text-transform': 'uppercase'
										}
									},
									Ext.create('FacilDesktop.ux.form.ComboBox', {
										fieldLabel: 'Permissão',
										itemId: 'usu_permissao',
										name: 'usu_permissao',
										width: 400,
										labelWidth: 140,
										padding:'10 0 10 0',
										valueField: 'per_codigo',
										displayField: 'per_name',
										fields: ['per_codigo', 'per_name'],
										displayFields:['per_name'],
										store: {type: 'Permissao'},
										autoLoad: false
									})
								]
							}
						]
					}
				],
				buttons: [
					{
						text: 'Carregar',
						itemId:'btnCarregar',
						handler:function(){
							var module = MyDesktop.getModule('_modAcessoLista');
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
							MyDesktop.getModule('_modAcesso').save();
						}
					}
				],
				listeners: {
					afterRender: function() {
						console.log("sem acesso" + MyDesktop.userPermission);
						if(MyDesktop.userPermission == 'Normal') {
							setTimeout(function(){
								alert = Ext.Msg.alert('Atenção','Você não tem acesso ao cadastro de usuários.',function(){
								MyDesktop.fixMsgBox(_winAcesso);
									_winAcesso.close();
								});
							}, 500);
							Ext.WindowManager.bringToFront( alert );
							return;
						}
					}
				}
			});
		}
		return _winAcesso;
	}
});