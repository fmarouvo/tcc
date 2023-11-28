Ext.define('FacilDesktop.store.Tipo', {
    extend: 'Ext.data.Store',
    model: 'FacilDesktop.model.Tipo',
	alias: 'store.Tipo',
	autoLoad:false,

    proxy: {
        type: 'ajax',
        url: getURL() + 'app/controller/tipo.php',

        reader: {
            type: 'json',
            rootProperty: 'data',
			totalProperty: 'total'
        }
    }

});