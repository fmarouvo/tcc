Ext.define('FacilDesktop.model.LoteSelecao', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'lot_codigo', type: 'integer'},
        {name: 'lot_name', type: 'string'},
        {name: 'lot_manufacturing', type: 'string'},
        {name: 'lot_validate', type: 'string'},
        {name: 'lot_barcode', type: 'string'}
    ]
});