Ext.define('FacilDesktop.ux.StartMenu', {
    extend: 'Ext.menu.Menu',
	id:'_modStartMenu',
    // We want header styling like a Panel
    baseCls: Ext.baseCSSPrefix + 'panel',

    // Special styling within
    cls: 'x-menu ux-start-menu',
    bodyCls: 'ux-start-menu-body',

    defaultAlign: 'bl-tl',

    iconCls: 'iniciar-user-icon',

    bodyBorder: true,

    width: 400,

    initComponent: function() {
        var me = this;
        me.layout.align = 'stretch';
        var _menu = [
			{
				text: 'Fornecedor',
				iconCls:'fornecedor-menu',
				handler : function(){
					MyDesktop.getModule('_modFornecedor').createWindow().show();
				},
				scope: this,
				windowId:'_winIdModFornecedor'
			},
			{
				text: 'Lote',
				iconCls:'lote-menu',
				handler : function(){
					MyDesktop.getModule('_modLote').createWindow().show();
				},
				scope: this,
				windowId:'_winIdModLote'
			},
			{
				text: 'Nota Fiscal',
				iconCls:'notafiscal-menu',
				handler : function(){
					MyDesktop.getModule('_modNotaFiscal').createWindow().show();
				},
				scope: this,
				windowId:'_winIdModNotaFiscal'
			},
			{
				text: 'Paciente',
				iconCls:'paciente-menu',
				handler : function(){
					MyDesktop.getModule('_modPaciente').createWindow().show();
				},
				scope: this,
				windowId:'_winIdModPaciente'
			},
			{
				text: 'Produto',
				iconCls:'produtos-menu',
				handler : function(){
					MyDesktop.getModule('_modProduto').createWindow().show();
				},
				scope: this,
				windowId:'_winIdModProduto'
			},
			{
				text: 'Prontuario',
				iconCls:'prontuario-menu',
				handler : function(){
					MyDesktop.getModule('_modProntuario').createWindow().show();
				},
				scope: this,
				windowId:'_winIdModProntuario'
			},
			{
				text: 'Usuário do Sistema',
				iconCls:'acesso-menu',
				handler : function(){
					MyDesktop.getModule('_modAcesso').createWindow().show();
				},
				scope: this,
				windowId:'_winIdModAcesso'
			}
		];
		
		me.items=_menu;
		
        me.callParent();

        me.toolbar = new Ext.toolbar.Toolbar(Ext.apply({
            dock: 'right',
            cls: 'ux-start-menu-toolbar',
            vertical: true,
            width: 100,
            layout: {
                align: 'stretch'
            }
        }, me.toolConfig));

        me.addDocked(me.toolbar);

        delete me.toolItems;
    },

    addMenuItem: function() {
        var cmp = this.menu;
        cmp.add.apply(cmp, arguments);
    },

    addToolItem: function() {
        var cmp = this.toolbar;
        cmp.add.apply(cmp, arguments);
    }
});