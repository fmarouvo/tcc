Ext.define('FacilDesktop.store.Usuario', {
    extend: 'Ext.data.Store',
    model: 'FacilDesktop.model.Usuario',
	alias: 'store.Usuario',
	autoLoad:false,

    proxy: {
        type: 'ajax',
        url: getURL() + 'app/controller/usuario.php',

        reader: {
            type: 'json',
            rootProperty: 'data',
			totalProperty: 'total'
        }
    }

});