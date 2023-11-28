Ext.define('FacilDesktop.Paciente', {

	id: '_modPaciente',
	
	store:null,
	
	isUpdate: false,
	
	save:function(){
		if(
			Ext.ComponentQuery.query('#_formPaciente #pac_name')[0].getValue()){
			
			acao = 'adicionar';
			
			if (FacilDesktop.Paciente.isUpdate == true) {
				acao = 'atualizar';
			}
			
			Ext.Ajax.request({
				url: getURL() + 'app/controller/paciente.php',
				method: 'post',
				params: {
					acao: acao,
					p:MyDesktop.getCompany.code,
					pac_codigo: Ext.ComponentQuery.query('#_formPaciente #pac_codigo')[0].getValue(),
					pac_name: Ext.ComponentQuery.query('#_formPaciente #pac_name')[0].getValue(),
					pac_dataNascimento: Ext.ComponentQuery.query('#_formPaciente #pac_dataNascimento')[0].getValue(),
					pac_peso: Ext.ComponentQuery.query('#_formPaciente #pac_peso')[0].getValue(),
					pac_telefone: Ext.ComponentQuery.query('#_formPaciente #pac_telefone')[0].getValue(),
					pac_endereco: Ext.ComponentQuery.query('#_formPaciente #pac_endereco')[0].getValue(),
					pac_cidade: Ext.ComponentQuery.query('#_formPaciente #pac_cidade')[0].getValue()
				},
				success: function (_resposta, opts) {
					if (_resposta.responseText == "OK") {
						Ext.Msg.alert('Atenção','A paciente "'+Ext.ComponentQuery.query('#_formPaciente #pac_name')[0].getValue().toUpperCase()+'" foi cadastrado com sucesso.',function(){
							MyDesktop.getModule('_modPacienteLista').refreshView();
							MyDesktop.fixMsgBox(_winPaciente);
							Ext.ComponentQuery.query('#_formPaciente #pac_codigo')[0].setValue();
							Ext.ComponentQuery.query('#_formPaciente #pac_name')[0].setValue();
							Ext.ComponentQuery.query('#_formPaciente #pac_dataNascimento')[0].setValue();
							Ext.ComponentQuery.query('#_formPaciente #pac_peso')[0].setValue();
							Ext.ComponentQuery.query('#_formPaciente #pac_telefone')[0].setValue();
							Ext.ComponentQuery.query('#_formPaciente #pac_endereco')[0].setValue();
							Ext.ComponentQuery.query('#_formPaciente #pac_cidade')[0].setValue();
							FacilDesktop.Paciente.isUpdate = false;
						});
						return;
					}
					Ext.Msg.alert('Atenção','Houve um erro ao fazer o cadastro!<br> Tente novamente mais tarde.',function(){
						MyDesktop.fixMsgBox(_winPaciente);
					});
				},
				failure: function (_resposta, opts) {
					Ext.Msg.alert('Atenção','Houve um erro ao fazer o cadastro!',function(){
						MyDesktop.fixMsgBox(_winPaciente);
					});
				}
			});
		}else{
			Ext.Msg.alert('Atenção','Preencha todos os campos.',function(){
				MyDesktop.fixMsgBox(_winPaciente);
			});
		}
	},
	carregarPaciente: function (codigo) {
		FacilDesktop.Paciente.isUpdate = true;
		Ext.Ajax.request({
            url: getURL() + 'app/controller/paciente.php',
            params: {
                acao: 'selecionar',
                pac_codigo: codigo,
                p: MyDesktop.getCompany.code
            },
            success: function (_resposta, opts) {
				console.log(_resposta.responseText)
				var data = Ext.decode(_resposta.responseText);
                Ext.ComponentQuery.query('#_formPaciente #pac_codigo')[0].setValue(data[0].pac_codigo);
                Ext.ComponentQuery.query('#_formPaciente #pac_name')[0].setValue(data[0].pac_name);
				Ext.ComponentQuery.query('#_formPaciente #pac_dataNascimento')[0].setValue(new Date(data[0].pac_dataNascimento));
				Ext.ComponentQuery.query('#_formPaciente #pac_peso')[0].setValue(data[0].pac_peso);
				Ext.ComponentQuery.query('#_formPaciente #pac_telefone')[0].setValue(data[0].pac_telefone);
				Ext.ComponentQuery.query('#_formPaciente #pac_endereco')[0].setValue(data[0].pac_endereco);
				Ext.ComponentQuery.query('#_formPaciente #pac_cidade')[0].setValue(data[0].pac_cidade);
            }
        });
	},
	clearData: function() {
		FacilDesktop.Paciente.isUpdate = false;
		Ext.ComponentQuery.query('#_formPaciente #pac_codigo')[0].setValue();
		Ext.ComponentQuery.query('#_formPaciente #pac_name')[0].setValue();
		Ext.ComponentQuery.query('#_formPaciente #pac_idade')[0].setValue();
	},
	createWindow:function(_obj){
		FacilDesktop.Paciente.isUpdate = false;
		if(!Ext.ComponentQuery.query('#_winPaciente')[0]){
            _winPaciente = this.app.getDesktop().createWindow({
                itemId: '_winPaciente',
                title:'Paciente',
                width:640,
                height: 280,
                animCollapse:false,
                constrainHeader:true,
				renderTo: Ext.getBody(),
				items: [
					{
						xtype: 'form',
						itemId: '_formPaciente',
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
										itemId: 'pac_codigo',
										name: 'pac_codigo',
										hidden: true
									},
									{
										fieldLabel: 'Nome',
										itemId: 'pac_name',
										name: 'pac_name',
										width: 620,
										labelWidth: 110,
										fieldStyle: {
											'text-transform': 'uppercase'
										}
									},
									{
										fieldLabel: 'Data Nascimento',
										xtype: 'datefield',
										format: 'd/m/Y',
										altFormats: 'd/m/Y|d-m-Y|dmY',
										itemId: 'pac_dataNascimento',
										name: 'pac_dataNascimento',
										width: 280,
										labelWidth: 110,
										padding:'10 0 0 0',
										value: new Date()
									},
									{
										fieldLabel: 'Peso',
										itemId: 'pac_peso',
										name: 'pac_peso',
										width: 180,
										labelWidth: 110,
										padding:'10 0 0 0',
										fieldStyle: {
											'text-transform': 'uppercase'
										}
									},
									{
										fieldLabel: 'Telefone',
										itemId: 'pac_telefone',
										name: 'pac_telefone',
										width: 280,
										labelWidth: 110,
										padding:'10 0 0 0',
										fieldStyle: {
											'text-transform': 'uppercase'
										}
									},
									{
										fieldLabel: 'Endereço',
										itemId: 'pac_endereco',
										name: 'pac_endereco',
										width: 620,
										labelWidth: 110,
										padding:'10 0 0 0',
										fieldStyle: {
											'text-transform': 'uppercase'
										}
									},
									{
										fieldLabel: 'Cidade',
										itemId: 'pac_cidade',
										name: 'pac_cidade',
										width: 280,
										labelWidth: 110,
										padding:'10 0 0 0',
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
							MyDesktop.getModule('_modPaciente').clearData();
						}
					},
					{
						text: 'Carregar',
						itemId:'btnCarregar',
						handler:function(){
							var module = MyDesktop.getModule('_modPacienteLista');
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
							MyDesktop.getModule('_modPaciente').save();
						}
					}
				]
			});
		}
		return _winPaciente;
	}
});