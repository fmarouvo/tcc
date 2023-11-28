Ext.define('FacilDesktop.AlterarSenha', {

	id: '_modAlterarSenha',
	
	store:null,
	
	save:function(){
		if(Ext.ComponentQuery.query('#_formAlterarSenha #usu_senha')[0].getValue()==MyDesktop.userPass){
			if(Ext.ComponentQuery.query('#_formAlterarSenha #usu_senhaNova')[0].getValue() && Ext.ComponentQuery.query('#_formAlterarSenha #usu_senhaConfirm')[0].getValue() && Ext.ComponentQuery.query('#_formAlterarSenha #usu_senhaNova')[0].getValue()==Ext.ComponentQuery.query('#_formAlterarSenha #usu_senhaConfirm')[0].getValue()){
				Ext.Ajax.request({
					url: getURL() + 'app/controller/alterarSenha.php',
					method: 'post',
					params: {
						p:MyDesktop.getCompany.code,
						usu_login: MyDesktop.user,
						usu_senha: Ext.ComponentQuery.query('#_formAlterarSenha #usu_senhaNova')[0].getValue()
					},
					success: function (_resposta, opts) {
						MyDesktop.userPass=Ext.ComponentQuery.query('#_formAlterarSenha #usu_senhaNova')[0].getValue();
						Ext.Msg.alert('Atenção','A senha foi alterada com sucesso.',function(){
							MyDesktop.fixMsgBox(_winAlterarSenha);
						});
					},
					failure: function (_resposta, opts) {
						Ext.Msg.alert('Atenção','Houve um erro ao fazer o login!',function(){
							MyDesktop.fixMsgBox(_winAlterarSenha);
						});
					}
				});
			}else{
				Ext.Msg.alert('Atenção','A nova senha não confere com a confirmação.',function(){
					MyDesktop.fixMsgBox(_winAlterarSenha);
				});
			}
		}else{
			Ext.Msg.alert('Atenção','A senha atual digitada está errada.',function(){
				MyDesktop.fixMsgBox(_winAlterarSenha);
			});
		}
	},
	
	createWindow:function(_obj){
		if(!Ext.ComponentQuery.query('#_winAlterarSenha')[0]){
            _winAlterarSenha = this.app.getDesktop().createWindow({
                itemId: '_winAlterarSenha',
                title:'Alterar Senha',
                width:430,
                height:210,
                animCollapse:false,
                constrainHeader:true,
				renderTo: Ext.getBody(),
				listeners:{
					afterrender:function(){
						
						Ext.ComponentQuery.query('#_formAlterarSenha #usu_login')[0].setValue(MyDesktop.user);

						// MyDesktop.getModule('_modAlterarSenha').store = Ext.create('store.AlterarSenha');
						// MyDesktop.getModule('_modAlterarSenha').store.load();
					}
				},
				items: [
					{
						xtype: 'form',
						itemId: '_formAlterarSenha',
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
										readOnly:true,
										itemId: 'usu_login',
										name: 'usu_login',
										width: 400,
										labelWidth: 140,
										fieldStyle: {
											'text-transform': 'uppercase'
										}
									},
									{
										inputType:'password',
										fieldLabel: 'Senha Atual',
										itemId: 'usu_senha',
										name: 'usu_senha',
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
									}
								]
							}
						]
					}
				],
				buttons: [
					{
						text: 'Salvar',
						itemId:'btnEntrar',
						handler:function(){
							MyDesktop.getModule('_modAlterarSenha').save();
						}
					}
				]
			});
		}
		return _winAlterarSenha;
	}
});