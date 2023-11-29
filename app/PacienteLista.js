Ext.define('FacilDesktop.PacienteLista', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],
    id: '_modPacienteLista',
    init: function () {
        /*this.launcher = {
         text: 'Tab Window',
         iconCls:'tabs'
         }*/
    },
	refreshView: function() {
		MyDesktop.getModule('_modPacienteLista').fetchList();
	},
	fetchList: function() {
		var _objParams = {
			p: MyDesktop.getCompany.code,
			acao: "listar"
		};

		Ext.Ajax.request({
			url: getURL() + 'app/controller/paciente.php',
			params: _objParams,
			success: function (_resposta, opts) {
				var dados = Ext.decode(_resposta.responseText);
				Ext.ComponentQuery.query('#gridPacientesCadastradas')[0].store.loadData(dados);
			}
		});

		setTimeout(function () {
			Ext.ComponentQuery.query('#busca_paciente')[0].focus();
		}, 1200);
	},
    filtro: '',
    createWindow: function () {
        var desktop = this.app.getDesktop();
        if (!Ext.ComponentQuery.query('#_winPacienteLista')[0]) {
            _winPacienteLista = desktop.createWindow({
                itemId: '_winPacienteLista',
                alias: 'widget.pacienteListaAlias',
                title: 'Pacientes Cadastrados',
                width: 640,
                height: 400,
                x: 300,
                y: 30,
                iconCls: 'icon-grid',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                listeners: {
                    'afterrender': function () {
						MyDesktop.getModule('_modPacienteLista').fetchList();
                    }
                },
                items: [
                    Ext.widget({
                        xtype: 'form',
                        itemId: 'pacienteListaForm',
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
                                items: [
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        border: false,
                                        defaultType: 'textfield',
                                        height: 35,
                                        items: [
                                            {
                                                itemId: 'busca_paciente',
                                                fieldLabel: 'Paciente',
                                                width: 405,
                                                labelWidth: 60,
                                                selectOnFocus: true,
                                                listeners: {
                                                    'change': function (combo) {
                                                        if (combo.getValue() == '') {
                                                            Ext.ComponentQuery.query('#gridPacientesCadastradas')[0].store.removeAll();
                                                            Ext.ComponentQuery.query('#gridPacientesCadastradas')[0].store.load();
                                                        } else {
                                                            MyDesktop.getModule('_modPacienteLista').filtro += '&pac_name=' + combo.getValue();
                                                            Ext.Ajax.request({
                                                                url: getURL() + 'app/controller/paciente.php',
                                                                params: {
																	p: MyDesktop.getCompany.code,
																	acao: "autocomplete",
																	pac_name:  Ext.ComponentQuery.query('#busca_paciente')[0].getValue()
																},
                                                                success: function (_resposta, opts) {
                                                                    Ext.ComponentQuery.query('#gridPacientesCadastradas')[0].store.removeAll();
                                                                    Ext.ComponentQuery.query('#gridPacientesCadastradas')[0].store.add(Ext.decode(_resposta.responseText));
                                                                }
                                                            });
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            Ext.create('Ext.grid.Panel', {
                                header: false,
                                itemId: 'gridPacientesCadastradas',
                                height: 320,
                                store: {type: 'Paciente', autoLoad:false},
								autoLoad:false,
                                columns: [
                                    {id: 'pac_codigo', text: 'Código', dataIndex: 'pac_codigo', hidden: true},
									{id: 'pac_name', text: 'Nome', dataIndex: 'pac_name', flex: 1},
									{id: 'pac_telefone', text: 'Telefone', dataIndex: 'pac_telefone', width: 120},
									{
										id: 'pac_edit',
										renderer: function() {
											return Ext.String.format('<img src="'+ getURL() + 'resources/images/certo.png" />');
										},
										dataIndex:'image',
										width: 40
									},
									{
										id: 'pac_exclude',
										renderer: function() {
											return Ext.String.format('<img src="'+ getURL() + 'resources/images/delete.png" />');
										},
										dataIndex:'image',
										width: 40
									}
                                ],
                                listeners: {
									'cellclick': function(thisGrid, rowIndex, columnIndex, e) {
										var columnid = thisGrid.getColumnManager().getLast().id;
										
										if(columnIndex == 3) {
											MyDesktop.getModule('_modPaciente').carregarPaciente(thisGrid.getSelection()[0].data.pac_codigo);
											_winPacienteLista.close();
										}
										
										if(columnIndex == 4) {
											Ext.Msg.confirm('Atenção', "Tem certeza que deseja excluir esta paciente?", function (_res) {
												if (_res == 'yes') {
													Ext.Ajax.request({
														url: getURL() + 'app/controller/paciente.php',
														method: 'post',
														params: {
															acao: "remove",
															p: MyDesktop.getCompany.code,
															pac_codigo: thisGrid.getSelection()[0].data.pac_codigo
														},
														success: function (_resposta, opts) {
															Ext.Msg.alert('Atenção','A paciente foi excluído com sucesso.',function(){
																MyDesktop.getModule('_modPacienteLista').fetchList();
																MyDesktop.getModule('_modPaciente').clearData();
																MyDesktop.fixMsgBox(_winPaciente);
															});
														},
														failure: function (_resposta, opts) {
															Ext.Msg.alert('Atenção','Houve um erro ao excluir a paciente!',function(){
																MyDesktop.fixMsgBox(_winPaciente);
															});
														}
													});
												}
											});
										}
									}
                                }
                            })
                        ]
                    })

                ]
            });
        }
        return _winPacienteLista;
    }
});