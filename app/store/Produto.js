Ext.define('FacilDesktop.store.Produto', {
    extend: 'Ext.data.Store',
    model: 'FacilDesktop.model.Produto',
	alias: 'store.Produto',
    pageSize:25,
	autoLoad: {
		params:{
			start: 0,
			limit: 25
		}
	},

    proxy: {
        type: 'ajax',
        url: getURL() + 'app/controller/produto.php',

        reader: {
            type: 'json',
            rootProperty: 'data',
			totalProperty: 'total'
        }
    }

});