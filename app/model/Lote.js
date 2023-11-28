Ext.define('FacilDesktop.model.Lote', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'lot_codigo', type: 'integer'},
        {name: 'lot_name', type: 'string'},
        {name: 'lot_manufacturing', type: 'date', dateFormat: 'd/m/Y'},
        {name: 'lot_validate', type: 'date', dateFormat: 'd/m/Y'},
        {name: 'lot_barcode', type: 'string'}
    ]
});