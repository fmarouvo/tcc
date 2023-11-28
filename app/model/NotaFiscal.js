Ext.define('FacilDesktop.model.NotaFiscal', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'ntf_codigo', type: 'integer'},
        {name: 'ntf_numero', type: 'string'},
        {name: 'for_codigo', type: 'integer'},
        {name: 'for_name', type: 'string'},
        {name: 'ntf_data', type: 'date', dateFormat: 'd/m/Y'},
        {name: 'ntf_produtos', type: 'string'}
    ]
});