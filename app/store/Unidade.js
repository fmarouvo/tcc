Ext.define('FacilDesktop.store.Unidade', {
    extend: 'Ext.data.Store',
    model: 'FacilDesktop.model.Unidade',
	alias: 'store.Unidade',
	autoLoad:false,

    proxy: {
        type: 'ajax',
        url: getURL() + 'app/controller/unidade.php',

        reader: {
            type: 'json',
            rootProperty: 'data',
			totalProperty: 'total'
        }
    }

});