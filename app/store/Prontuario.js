Ext.define('FacilDesktop.store.Prontuario', {
    extend: 'Ext.data.Store',
    model: 'FacilDesktop.model.Prontuario',
	alias: 'store.Prontuario',
	autoLoad:false,

    proxy: {
        type: 'ajax',
        url: getURL() + 'app/controller/prontuario.php',

        reader: {
            type: 'json',
            rootProperty: 'data',
			totalProperty: 'total'
        }
    }

});