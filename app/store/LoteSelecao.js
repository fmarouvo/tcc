Ext.define('FacilDesktop.store.LoteSelecao', {
    extend: 'Ext.data.Store',
    model: 'FacilDesktop.model.LoteSelecao',
	alias: 'store.LoteSelecao',
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