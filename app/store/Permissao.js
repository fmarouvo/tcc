Ext.define('FacilDesktop.store.Permissao', {
    extend: 'Ext.data.Store',
    model: 'FacilDesktop.model.Permissao',
	alias: 'store.Permissao',
	autoLoad:false,

    proxy: {
        type: 'ajax',
        url: getURL() + 'app/controller/permissao.php',

        reader: {
            type: 'json',
            rootProperty: 'data',
			totalProperty: 'total'
        }
    }

});