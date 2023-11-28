Ext.define('FacilDesktop.Settings', {
    extend: 'Ext.window.Window',
	id:'_modSettings',
    uses: [
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.form.field.Checkbox',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Border',

        'Ext.ux.desktop.Wallpaper',
		
		'FacilDesktop.model.Arquivo',
		'FacilDesktop.model.Estoque',
		'FacilDesktop.model.Fornecedor',
		'FacilDesktop.model.Lote',
		'FacilDesktop.model.LoteSelecao',
		'FacilDesktop.model.NotaFiscal',
		'FacilDesktop.model.Paciente',
		'FacilDesktop.model.Permissao',
		'FacilDesktop.model.Produto',
		'FacilDesktop.model.ProdutoSelecionado',
		'FacilDesktop.model.Prontuario',
		'FacilDesktop.model.Tipo',
		'FacilDesktop.model.Usuario',
		
		'FacilDesktop.store.Arquivo',
		'FacilDesktop.store.Estoque',
		'FacilDesktop.store.Fornecedor',
		'FacilDesktop.store.Lote',
		'FacilDesktop.store.LoteSelecao',
		'FacilDesktop.store.NotaFiscal',
		'FacilDesktop.store.Paciente',
		'FacilDesktop.store.Permissao',
		'FacilDesktop.store.Produto',
		'FacilDesktop.store.ProdutoSelecionado',
		'FacilDesktop.store.Prontuario',
		'FacilDesktop.store.Tipo',
		'FacilDesktop.store.Usuario'

    ],

	initComponent:function(){
		/*var _self = this;
		MyDesktop.getModule('_modSettings').selected = _self.desktop.getWallpaper();
		_self.stretch = _self.desktop.wallpaper.stretch;

		_self.preview = Ext.create('widget.wallpaper');
		_self.preview.setWallpaper(MyDesktop.getModule('_modSettings').selected);*/
	},
	
	createWindow: function (_handler, _param_codigo, _codPedido) {
		MyDesktop.getModule('_modSettings')._handler = _handler;
		function child(img) {
            return {img: img, text: MyDesktop.getModule('_modSettings').getTextOfWallpaper(img), iconCls: '', leaf: true};
        }
		if (!Ext.ComponentQuery.query('#_winSettings')[0]) {
			_winSettings = this.app.getDesktop().createWindow({
				itemId: '_winSettings',
				title: 'Configurações',
				layout: 'anchor',
				modal: true,
				width: 640,
				height: 480,
				border: false,
				iconCls: 'produto-menu',
				animCollapse: false,
				constrainHeader: true,
				renderTo: Ext.getBody(),
				listeners:{
					afterrender:function(_self){
						Ext.WindowManager.bringToFront(_self);
						/*_self.selected = _self.desktop.getWallpaper();
						_self.stretch = _self.desktop.wallpaper.stretch;

						_self.preview = Ext.create('widget.wallpaper');
						_self.preview.setWallpaper(_self.selected);*/
					}
				},
				bbar: {
                    style: {
                        backgroundColor: '#f7f7f7'
                    },
                    items: [
						{
                            xtype: 'button',
                            icon: 'resources/images/add.png',
                            text: 'OK',
                            itemId: '_winSettingsOk',
                            style: {
                                backgroundColor: 'transparent',
                                border: 'none',
                                marginRight: '5px'
                            },
                            handler: function () {
                                MyDesktop.getModule('_modSettings').onOK;
                            }
                        },
						{
                            xtype: 'button',
                            icon: 'resources/images/add.png',
                            text: 'OK',
                            itemId: '_winSettingsOk',
                            style: {
                                backgroundColor: 'transparent',
                                border: 'none',
                                marginRight: '5px'
                            },
                            handler: function () {
                                MyDesktop.getModule('_modSettings').close;
                            }
                        }
					]
				},
				items: [
					{
						anchor: '0 -30',
						border: false,
						layout: 'border',
						items: [
							Ext.tree.Panel({
								title: 'Aparência',
								itemId:'settingsTree',
								rootVisible: false,
								lines: false,
								autoScroll: true,
								width: 220,
								region: 'west',
								split: true,
								minWidth: 100,
								listeners: {
									afterrender: {
										/*fn: function(){
											var s = MyDesktop.desktop.getWallpaper();
											if (s) {
												var path = '/Wallpaper/' + this.getTextOfWallpaper(s);
												this.selectPath(path, 'text');
											}
										}, delay: 100*/
									},
									select: MyDesktop.getModule('_modSettings').onSelect,
									scope: MyDesktop.getModule('_modSettings')
								},
								store: new Ext.data.TreeStore({
									model: 'FacilDesktop.model.Wallpaper',
									root: {
										text: 'Papel de parede',
										expanded: true,
										children: [
											{text: "Nehum", iconCls: '', leaf: true},
											child('Blue-Sencha.jpg')
										]
									}
								})
							}),
							{
								xtype: 'panel',
								title: 'Visualizar',
								region: 'center',
								layout: 'fit',
								items: [MyDesktop.getModule('_modSettings').preview]
							}
						]
					},
					{
						xtype: 'checkbox',
						boxLabel: 'Tela inteira',
						checked: MyDesktop.getModule('_modSettings').stretch,
						listeners: {
							change: function (comp) {
								MyDesktop.getModule('_modSettings').stretch = comp.checked;
							}
						}
					}
				]
			});
		}
		return _winSettings;
	},
    getTextOfWallpaper: function (path) {
        var text = path, slash = path.lastIndexOf('/');
        if (slash >= 0) {
            text = text.substring(slash + 1);
        }
        var dot = text.lastIndexOf('.');
        text = Ext.String.capitalize(text.substring(0, dot));
        text = text.replace(/[-]/g, ' ');
        return text;
    },

    onOK: function () {
        var me = this;
        if (MyDesktop.getModule('_modSettings').selected) {
            MyDesktop.getModule('_modSettings').desktop.setWallpaper(MyDesktop.getModule('_modSettings').selected, MyDesktop.getModule('_modSettings').stretch);
        }
        MyDesktop.getModule('_modSettings').destroy();
    },

    onSelect: function (record) {
        if (record.data.img) {
            MyDesktop.getModule('_modSettings').selected = 'resources/images/wallpapers/' + record.data.img;
        } else {
            MyDesktop.getModule('_modSettings').selected = Ext.BLANK_IMAGE_URL;
        }

        MyDesktop.getModule('_modSettings').preview.setWallpaper(MyDesktop.getModule('_modSettings').selected);
    }
});