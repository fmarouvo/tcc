Ext.define('FacilDesktop.store.NotaFiscal', {
    extend: 'Ext.data.Store',
    model: 'FacilDesktop.model.NotaFiscal',
	alias: 'store.NotaFiscal',
	autoLoad:false,

    proxy: {
        type: 'ajax',
        url: getURL() + 'app/controller/notaFiscal.php',

        reader: {
            type: 'json',
            rootProperty: 'data',
			totalProperty: 'total'
        }
    }

});