Ext.define('FacilDesktop.store.Estoque', {
    extend: 'Ext.data.Store',
    model: 'FacilDesktop.model.Estoque',
	alias: 'store.Estoque',
	autoLoad:false,

    proxy: {
        type: 'ajax',
        url: getURL() + 'app/controller/estoque.php',

        reader: {
            type: 'json',
            rootProperty: 'data',
			totalProperty: 'total'
        }
    }

});