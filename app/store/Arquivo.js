Ext.define('FacilDesktop.store.Arquivo', {
    extend: 'Ext.data.Store',
    model: 'FacilDesktop.model.Arquivo',
	alias: 'store.Arquivo',
	autoLoad:false,

    proxy: {
        type: 'ajax',
        url: getURL() + 'app/controller/fornecedorArquivos.php',

        reader: {
            type: 'json',
            rootProperty: 'data',
			totalProperty: 'total'
        }
    }

});