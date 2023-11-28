Ext.define('FacilDesktop.model.Paciente', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'pac_codigo', type: 'integer'},
        {name: 'pac_name', type: 'string'},
		{name: 'pac_dataNascimento', type: 'date', dateFormat: 'd/m/Y'},
		{name: 'pac_peso', type: 'string'},
		{name: 'pac_telefone', type: 'string'},
		{name: 'pac_endereco', type: 'string'},
		{name: 'pac_cidade', type: 'string'}
    ]
});