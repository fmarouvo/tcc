Ext.define('FacilDesktop.store.Fornecedor', {
    extend: 'Ext.data.Store',
    model: 'FacilDesktop.model.Fornecedor',
	alias: 'store.Fornecedor',
	autoLoad:false,

    proxy: {
        type: 'ajax',
        url: getURL() + 'app/controller/fornecedor.php',

        reader: {
            type: 'json',
            rootProperty: 'data',
			totalProperty: 'total'
        }
    }

});