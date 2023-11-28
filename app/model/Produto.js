Ext.define('FacilDesktop.model.Produto', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'prd_codigo', type: 'integer'},
        {name: 'prd_name', type: 'string'},
        {name: 'dcb_codigo', type: 'string'},
        {name: 'dcb_discriminacao', type: 'string'},
        {name: 'dcb_apresentacao', type: 'string'}
    ]
});