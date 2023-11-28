Ext.define('FacilDesktop.model.ProdutoSelecionado', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'prd_codigo', type: 'integer'},
        {name: 'prd_name', type: 'string'},
        {name: 'prd_quantidade', type: 'integer'},
		{name: 'lot_codigo', type: 'integer'},
		{name: 'lot_name', type: 'string'}
    ]
});