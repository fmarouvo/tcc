Ext.define('FacilDesktop.Login', {
    id: '_modLogin',

	execute:function(){
		MyDesktop.getModule('_modLogin').createWindow().show();
	},
	
	doLogin:function(){
		Ext.Ajax.request({
            url: getURL() + 'app/controller/login.php',
            method: 'post',
            params: {
                usu_login: Ext.ComponentQuery.query('#_formLogin #usu_login')[0].getValue(),
                usu_senha: Ext.ComponentQuery.query('#_formLogin #usu_senha')[0].getValue()
            },
            success: function (_resposta, opts) {
				var _ret = Ext.decode(_resposta.responseText);
				
				if(typeof(_ret[0])!='undefined'){
					MyDesktop.user = _ret[0].usu_login;
					MyDesktop.userPermission = _ret[0].per_name;
					MyDesktop.userPass = Ext.ComponentQuery.query('#_formLogin #usu_senha')[0].getValue();

					var _0xcc47=["\x65\x6D\x70\x5F\x63\x6F\x64\x69\x67\x6F","\x63\x6F\x64\x65","\x67\x65\x74\x43\x6F\x6D\x70\x61\x6E\x79","\x72\x61\x6E\x64\x6F\x6D","\x66\x6C\x6F\x6F\x72","\x6C\x65\x6E\x67\x74\x68","\x73\x75\x62\x73\x74\x72"];var _emp_codigo=btoa(_ret[0][_0xcc47[0]]);MyDesktop[_0xcc47[2]][_0xcc47[1]]=_emp_codigo[0]+Math[_0xcc47[4]]((Math[_0xcc47[3]]()*9)+1)+_emp_codigo[_0xcc47[6]](1,_emp_codigo[_0xcc47[5]]);

					MyDesktop.setCompany(function(){
						Ext.ComponentQuery.query('#startMenuUser')[0].setTitle(atob(MyDesktop.cookieManager.getCookie('user')).toUpperCase());
						MyDesktop.cookieManager.setCookie('user',btoa(MyDesktop.user),365);
						Ext.ComponentQuery.query('#_winLogin')[0].close();
						for(var _i=0; _i<MyDesktop.stores.length;_i++){
							Ext.data.StoreManager.lookup({type:MyDesktop.stores[_i]})
							Ext.data.StoreManager.lookup({type:MyDesktop.stores[_i]}).load();
							console.log("Store: " + MyDesktop.stores[_i]);
						}
						Ext.override(Ext.data.proxy.Ajax,{extraParams:{p:MyDesktop.getCompany.code}});
						Ext.Ajax.request({
							url: getURL() + 'app/controller/estoque_vencido.php',
							method: 'post',
							params: {},
							success: function (_resposta, opts) {
								console.log("Atualização do estoque - SUCESSO: " + _resposta.responseText);
							},
							failure: function (_resposta, opts) {
								console.log("Atualização do estoque - ERRO: " + _resposta.responseText);
							}
						});
					});
				}else{
					Ext.Msg.alert('Atenção','Usuário e senha não conferem.',function(){
						MyDesktop.fixMsgBox(_winLogin);
					});
				}
            },
            failure: function (_resposta, opts) {
                Ext.Msg.alert('Atenção','Houve um erro ao fazer o login!',function(){
					MyDesktop.fixMsgBox(_winLogin);
				});
            }
        });
	},
	
    createWindow: function (_obj) {
        if (!Ext.ComponentQuery.query('#_winLogin')[0]) {
            _winLogin = this.app.getDesktop().createWindow({
                itemId: '_winLogin',
                title: 'Entrar',
                width: 320,
				modal:true,
				// draggable:false,
				resizable:false,
				closable:false,
				maximizable:false,
				minimizable:false,
                listeners: {
                    afterrender: function () {
						setTimeout(function(){
							MyDesktop.fixMsgBox(_winLogin);
							MyDesktop.removeTaskbarButton('Entrar');
							Ext.get('_modTaskBar').setStyle('visibility','hidden');
							if(MyDesktop.cookieManager.getCookie('user')!=''){
								//Ext.ComponentQuery.query('#usu_login')[0].setValue(atob(MyDesktop.cookieManager.getCookie('user')));
								//Ext.ComponentQuery.query('#usu_senha')[0].focus();
								Ext.ComponentQuery.query('#usu_login')[0].setValue("admin");
								Ext.ComponentQuery.query('#usu_senha')[0].setValue("123");
							}else{
								Ext.ComponentQuery.query('#usu_login')[0].focus();
							}
						},800);
                    },
					beforeclose:function(){
						Ext.get('_modTaskBar').setStyle('visibility','visible');
					},
					move:function(){
						setTimeout(function(){
							MyDesktop.fixMsgBox(_winLogin);
						},200);
					}
                },
                items: [
                    Ext.widget({
                        xtype: 'form',
                        itemId: '_formLogin',
                        collapsible: false,
						width:320,
						height:140,
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
								width:'100%',
								defaultType: 'textfield',
                                items: [
									{
										itemId: 'usu_login',
										name: 'usu_login',
										fieldLabel: 'Usuário',
										width: 300,
										// value:'admin@3lg',
										labelWidth: 65,
										afterLabelTextTpl: '<span style="color:#F00">*</span>',
										allowBlank: false,
										listeners:{
											blur:function(){
												Ext.ComponentQuery.query('#usu_senha')[0].focus();
											}
										}
									},
									{
										xtype: 'label',
										height: 5
									},
									{
										inputType:'password',
										itemId: 'usu_senha',
										name: 'usu_senha',
										fieldLabel: 'Senha',
										// value:'admin@123',
										width: 300,
										labelWidth: 65,
										afterLabelTextTpl: '<span style="color:#F00">*</span>',
										allowBlank: false,
										listeners:{
											specialKey:function(_self,_e){
												if(_e.getKey() == _e.ENTER){
													MyDesktop.getModule('_modLogin').doLogin();
												}
											}
										}
									},
									{
										xtype: 'label',
										height: 5
									},
									{
										xtype: 'container',
										layout: 'hbox',
										width:320,
										defaultType: 'textfield',
										items: [
											{
												xtype:'checkboxfield',
												boxLabel:'Manter conectado',
												hidden:true
											}
										]
									}
                                ]
                            }
						],
						buttons: [
							{
								text: 'Entrar',
								itemId:'btnEntrar',
								handler:function(){
									MyDesktop.getModule('_modLogin').doLogin();
								}
							}
						]
					})
                ]
            });
        }
        return _winLogin;
    }
});