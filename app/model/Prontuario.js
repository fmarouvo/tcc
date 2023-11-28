Ext.define('FacilDesktop.model.Prontuario', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'prt_codigo', type: 'integer'},
        {name: 'prt_data', type: 'string'},
        {name: 'prt_descr', type: 'string'},
        {name: 'usu_login', type: 'string'},
        {name: 'prt_produto', type: 'string'}
    ]
});