Ext.define('FacilDesktop.store.ProdutoSelecionado', {
    extend: 'Ext.data.Store',
    model: 'FacilDesktop.model.ProdutoSelecionado',
	alias: 'store.ProdutoSelecionado',
	autoLoad:false,

    proxy: {
        type: 'ajax',
        url: getURL() + 'app/controller/produtoSelecionado.php',

        reader: {
            type: 'json',
            rootProperty: 'data',
			totalProperty: 'total'
        }
    }

});