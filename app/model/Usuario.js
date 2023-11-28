Ext.define('FacilDesktop.model.Usuario', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'emp_codigo', type: 'string'},
        {name: 'usu_login', type: 'string'},
        {name: 'usu_senha', type: 'string'},
        {name: 'usu_email', type: 'string'},
        {name: 'per_codigo', type: 'integer'},
        {name: 'per_name', type: 'string'}
    ]
});