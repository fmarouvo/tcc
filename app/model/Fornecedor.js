Ext.define('FacilDesktop.model.Fornecedor', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'for_codigo', type: 'integer'},
        {name: 'for_name', type: 'string'},
        {name: 'isActive', type: 'integer'}
    ]
});