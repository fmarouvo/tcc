Ext.define('FacilDesktop.store.Paciente', {
    extend: 'Ext.data.Store',
    model: 'FacilDesktop.model.Paciente',
	alias: 'store.Paciente',
	autoLoad:false,

    proxy: {
        type: 'ajax',
        url: getURL() + 'app/controller/paciente.php',

        reader: {
            type: 'json',
            rootProperty: 'data',
			totalProperty: 'total'
        }
    }

});