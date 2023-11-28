Ext.define('FacilDesktop.model.Estoque', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'est_codigo', type: 'integer'},
        {name: 'prd_codigo', type: 'integer'},
        {name: 'prd_name', type: 'string'},
        {name: 'prd_quantidade', type: 'integer'},
        {name: 'est_tipo', type: 'integer'},
        {name: 'isActive', type: 'integer'}
    ]
});