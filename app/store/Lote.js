Ext.define('FacilDesktop.store.Lote', {
    extend: 'Ext.data.Store',
    model: 'FacilDesktop.model.Lote',
	alias: 'store.Lote',
	autoLoad:false,

    proxy: {
        type: 'ajax',
        url: getURL() + 'app/controller/lote.php',

        reader: {
            type: 'json',
            rootProperty: 'data',
			totalProperty: 'total'
        }
    }

});