Ext.apply(Ext.form.VTypes, {
	cpf: function (val, field) {
		if (val != '') {
			if ((val = val.replace(/[^\d]/g, "").split("")).length != 11) return false;
			if (new RegExp("^" + val[0] + "{11}$").exec(val.join(""))) return false;
			for (var s = 10, n = 0, i = 0; s >= 2; n += val[i++] * s--);
			if (val[9] != (((n %= 11) < 2) ? 0 : 11 - n)) return false;
			for (var s = 11, n = 0, i = 0; s >= 2; n += val[i++] * s--);
			if (val[10] != (((n %= 11) < 2) ? 0 : 11 - n)) return false;
			return true;
		} else {
			return true;
		}
	},
	cpfText: 'CPF informado é inválido!',
	cpfMask: /[0-9]/i
});

Ext.apply(Ext.form.VTypes, {
	cnpj: function (val, field) {
		if (val != '') {
			exp = /\.|\-|\//g
			var val = val.toString().replace(exp, "");
			var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
			if ((val = val.replace(/[^\d]/g, "").split("")).length != 14) return false;
			for (var i = 0, n = 0; i < 12; n += val[i] * b[++i]);
			if (val[12] != (((n %= 11) < 2) ? 0 : 11 - n)) return false;
			for (var i = 0, n = 0; i <= 12; n += val[i] * b[i++]);
			if (val[13] != (((n %= 11) < 2) ? 0 : 11 - n)) return false;
			return true;
		} else {
			return true;
		}
	},
	cnpjText: 'CNPJ informado é inválido!',
	cnpjMask: /[0-9]/i
});

Ext.apply(Ext.form.VTypes, {
	cep: function (val, field) {
		if (val != '') {
			if ((val = val.replace(/[^\d]/g, "").split("")).length != 8) return false;
			if (new RegExp("^" + val[0] + "{8}$").exec(val.join(""))) return false;
			for (var s = 7, n = 0, i = 0; s >= 4; n += val[i++] * s--);
			if (val[6] != (((n %= 8) < 4) ? 0 : 8 - n)) return false;
			for (var s = 8, n = 0, i = 0; s >= 4; n += val[i++] * s--);
			if (val[7] != (((n %= 8) < 4) ? 0 : 8 - n)) return false;
			return true;
		} else {
			return true;
		}
	},
	cpfText: 'CEP informado é inválido!',
	cpfMask: /[0-9]/i
});

Ext.EventManager.addListener(Ext.getBody(), 'keydown', function(e){
	if(e.getTarget().type != 'text' && e.getTarget().type != 'textarea' && e.getTarget().type != 'password' && e.getTarget().type != 'float' && e.getTarget().type != 'number' && e.getTarget().type != 'decimal' && e.getKey() == '8' ){
		e.preventDefault();
	}
})

Ext.define('FacilDesktop.Application', {
    extend: 'FacilDesktop.ux.App',

    requires: [
        'FacilDesktop.ux.ShortcutModel',

        'FacilDesktop.ux.form.Grid',
        'FacilDesktop.ux.form.ComboBox',
        'FacilDesktop.ux.view.MultiSort',
        'FacilDesktop.ux.MessageBox',
        'FacilDesktop.ux.MultiSortButton',

		'FacilDesktop.Acesso',
		'FacilDesktop.AcessoLista',
		'FacilDesktop.AlterarSenha',
		'FacilDesktop.Estoque',
		'FacilDesktop.Fornecedor',
		'FacilDesktop.FornecedorLista',
		'FacilDesktop.Login',
		'FacilDesktop.Lote',
		'FacilDesktop.LoteLista',
		'FacilDesktop.NotaFiscal',
		'FacilDesktop.NotaFiscalLista',
		'FacilDesktop.Paciente',
		'FacilDesktop.PacienteLista',
		'FacilDesktop.Produto',
		'FacilDesktop.ProdutoLista',
		'FacilDesktop.Prontuario',
		'FacilDesktop.ProntuarioLista',
		'FacilDesktop.Settings',
		'FacilDesktop.TabWindow'
    ],

	stores:[
		"Arquivo",
		"Estoque",
		"Fornecedor",
		"Lote",
		"LoteSelecao",
		"NotaFiscal",
		"Paciente",
		"Permissao",
		"Produto",
		"ProdutoSelecionado",
		"Prontuario",
		"Tipo",
		"Usuario"
	],

	models:[
		"Arquivo",
		"Estoque",
		"Fornecedor",
		"Lote",
		"LoteSelecao",
		"NotaFiscal",
		"Paciente",
		"Permissao",
		"Produto",
		"ProdutoSelecionado",
		"Prontuario",
		"Tipo",
		"Usuario"
	],
	
    user: 'contato@fausto.dev',
	userPermission: 'Normal',
    init: function () {

        Ext.Msg.buttonText = {
            cancel: 'Cancelar',
            no: 'Não',
            ok: 'OK',
            yes: 'Sim'
        };
        this.callParent();

        Ext.Date.monthNames = [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro"
        ]

        Ext.Date.dayNames = [
            "Domingo",
            "Segunda",
            "Terça",
            "Quarta",
            "Quinta",
            "Sexta",
            "Sábado"
        ]

        Ext.Date.monthNumbers = {
            "Janeiro": 0,
            "Jan": 0,
            "Fevereiro": 1,
            "Fev": 1,
            "Março": 2,
            "Mar": 2,
            "Abril": 3,
            "Abr": 3,
            "Maio": 4,
            "Mai": 4,
            "Junho": 5,
            "Jun": 5,
            "Julho": 6,
            "Jul": 6,
            "Agosto": 7,
            "Ago": 7,
            "Setembro": 8,
            "Set": 8,
            "Outubro": 9,
            "Out": 9,
            "Novembro": 10,
            "Nov": 10,
            "Dezembro": 11,
            "Dez": 11
        };

        Ext.toolbar.Paging.prototype.firstText = "";
        Ext.toolbar.Paging.prototype.prevText = "";
        Ext.toolbar.Paging.prototype.nextText = "";
        Ext.toolbar.Paging.prototype.lastText = "";
        Ext.toolbar.Paging.prototype.afterPageText ='de {0}';
        Ext.toolbar.Paging.prototype.beforePageText = 'Página';
		
        Ext.toolbar.Paging.override({

            initComponent:function(){
                var _me = this;
                _me.listeners={
                    'afterrender': function (_cmp){
                        _cmp.down('#refresh').hide();
                        // _cmp.down('#last').hide();
                        // _cmp.down('#first').hide();
                    },single: true
                }
                _me.callParent();
            }

        });
		
		Ext.data.Store.override({
			listeners:{
				loadexception: function(proxy, options, response){

					Ext.MessageBox.show({
						title: '',
						msg: Ext.decode(response.responseText).msg,
						buttons: Ext.Msg.OK,
						closable:false,
						icon: Ext.MessageBox.ERROR
					});
					
				},
				load:function(_this, _records, _successful, _eOpts){
					if(_this.alias=='store.Servico'){
						if(Ext.ComponentQuery.query('#_servico_grid')[0]){
							Ext.ComponentQuery.query('#_servico_grid')[0].getView().getRow(0).style.display = 'none';
						}
					}
					if(_this.alias=='store.Peca'){
						if(Ext.ComponentQuery.query('#_peca_grid')[0]){
							Ext.ComponentQuery.query('#_peca_grid')[0].getView().getRow(0).style.display = 'none';
						}
					}
				}
			}
		}),

        
        Ext.DatePicker.prototype.todayText = 'Hoje';
        Ext.DatePicker.prototype.cancelText = 'Cancelar';
        Ext.DatePicker.prototype.monthYearText = 'Escolha um mês (Control+Up/Down para trocar os anos)';
        Ext.DatePicker.prototype.minText = "Está data é antes da data permitida";
        Ext.DatePicker.prototype.maxText = "Está data é após da data permitida";
        Ext.DatePicker.prototype.nextText = 'Próximo Mês (Control+Right)';
        Ext.DatePicker.prototype.prevText = 'Mês Anterior (Control+Left)';
        Ext.DatePicker.prototype.todayTip = '{0} (Barra de Espaço)';
        
        Ext.DatePicker.prototype.todayTip = '{0} (Barra de Espaço)';
        Ext.DatePicker.prototype.renderTpl= [
            '<div id="{id}-innerEl" data-ref="innerEl">',
                '<div class="{baseCls}-header">',
                    '<div id="{id}-prevEl" data-ref="prevEl" class="{baseCls}-prev {baseCls}-arrow" role="button" title="{prevText}"></div>',
                    '<div id="{id}-middleBtnEl" data-ref="middleBtnEl" class="{baseCls}-month" role="heading">{%this.renderMonthBtn(values, out)%}</div>',
                    '<div id="{id}-nextEl" data-ref="nextEl" class="{baseCls}-next {baseCls}-arrow" role="button" title="{nextText}"></div>',
                '</div>',
                '<table role="grid" id="{id}-eventEl" data-ref="eventEl" class="{baseCls}-inner" {%',
                    // If the DatePicker is focusable, make its eventEl tabbable.
                    'if (values.$comp.focusable) {out.push("tabindex=\\\"0\\\"");}',
                '%} cellspacing="0">',
                    '<thead><tr role="row">',
                        '<tpl for="dayNames">',
                            '<th role="columnheader" class="{parent.baseCls}-column-header" aria-label="{.}">',
                                '<div role="presentation" class="{parent.baseCls}-column-header-inner">{.:this.firstInitial}</div>',
                            '</th>',
                        '</tpl>',
                    '</tr></thead>',
                    '<tbody><tr role="row">',
                        '<tpl for="days">',
                            '{#:this.isMonth()}',
                                '<div hidefocus="on" class="{parent.baseCls}-date"></div>',
                            '</td>',
                        '</tpl>',
                    '</tr></tbody>',
                '</table>',
                '<tpl if="showToday">',
                    '<div id="{id}-footerEl" data-ref="footerEl" role="presentation" class="{baseCls}-footer">{%this.renderTodayBtn(values, out)%}</div>',
                '</tpl>',
            '</div>',
            {
                firstInitial: function(value) {
                    return Ext.picker.Date.prototype.getDayInitial(value);
                },
				isMonth: function(value) {	// Não está funcionando ainda
                    // convert from 1 based index to 0 based
                    // by decrementing value once.
                    value--;
                    var end = value % 7 === 0 && value !== 0;

                    if(end){
                        // var _ret = '</tr><tr role="row"><td role="gridcell" id="{[Ext.id()]}" style="background-color:#ffe3e3;">';
                        var _ret = '</tr><tr role="row"><td role="gridcell" id="{[Ext.id()]}">';
                    }else{
						if(value === 0){
							// var _ret = '<td role="gridcell" id="{[Ext.id()]}" style="background-color:#ffe3e3;">';
							var _ret = '<td role="gridcell" id="{[Ext.id()]}">';
						}/*else if (value === 6 || value === 13 || value === 20 || value === 27 || value === 34 || value === 41 || value === 48){
							var _ret = '<td role="gridcell" id="{[Ext.id()]}" style="background-color:#ffe3e3;">';
						}*/else{
							var _ret = '<td role="gridcell" id="{[Ext.id()]}">';
						}
                    }

                    return _ret;
                },
                isEndOfWeek: function(value,t) {
                    // convert from 1 based index to 0 based
                    // by decrementing value once.
                    value--;
                    var end = value % 7 === 0 && value !== 0;

                    if(end){
                        var _ret = '</tr><tr role="row"><td role="gridcell" id="{[Ext.id()]}" style="background-color:#ffe3e3;">';
                    }else{
						if(value === 0){
							var _ret = '<td role="gridcell" id="{[Ext.id()]}" style="background-color:#ffe3e3;">';
						}else if (value === 6 || value === 13 || value === 20 || value === 27 || value === 34 || value === 41 || value === 48){
							var _ret = '<td role="gridcell" id="{[Ext.id()]}" style="background-color:#ffe3e3;">';
						}else{
							var _ret = '<td role="gridcell" id="{[Ext.id()]}">';
						}
                    }

                    return _ret;
                },
                renderTodayBtn: function(values, out) {
                    Ext.DomHelper.generateMarkup(values.$comp.todayBtn.getRenderTree(), out);
                },
                renderMonthBtn: function(values, out) {
                    Ext.DomHelper.generateMarkup(values.$comp.monthBtn.getRenderTree(), out);
                }
            }
        ];
        
        Ext.picker.Month.prototype.cancelText = 'Cancelar';

        /*Ext.Date.formatFunctions['br'] = function(){
         var _date = this;
         var _newDate = MyDesktop.pad(parseInt(_date.getMonth())+1,2,'0','STR_PAD_LEFT')+"/"+MyDesktop.pad(_date.getDate(),2,'0','STR_PAD_LEFT')+"/"+ _date.getFullYear();
         console.log('new date:'+_newDate);
         return _newDate;
         }

         Ext.Date.defaultFormat = 'br';
         Ext.form.DateField.prototype.format = 'd/m/Y';*/
		
        Ext.override(Ext.form.field.Date, {
            format: 'd/m/Y',
            invalidText: "Por favor digite uma data no formato dd/mm/aaaa",
            activeErrorsTpl: '<ul class="x-list-plain"><li>Informe a data até o dia de hoje e no formato dd/mm/aaaa</li></ul>',
            // hideTrigger:true,
            altFormats: 'd/m/Y|dmY|d-m-Y'
        });

        // Ext.data.Request.prototype.config.params={p:"Q80lORUZPVE8="}

        Ext.grid.RowEditor.prototype.saveBtnText = 'Salvar';
        Ext.grid.RowEditor.prototype.cancelBtnText = 'Cancelar';

		this.getModule('_modLogin').execute();

		MyDesktop.getModule('_modSettings').selected = 'resources/images/wallpapers/Blue-Sencha.jpg';
		MyDesktop.getModule('_modSettings').stretch=true;
		MyDesktop.desktop.setWallpaper(MyDesktop.getModule('_modSettings').selected, MyDesktop.getModule('_modSettings').stretch);
		
    },

    getModules: function () {
        var _modules = [
			new FacilDesktop.Acesso(),
			new FacilDesktop.AcessoLista(),
			new FacilDesktop.AlterarSenha(),
			new FacilDesktop.Estoque(),
			new FacilDesktop.Fornecedor(),
			new FacilDesktop.FornecedorLista(),
            new FacilDesktop.Login(),
			new FacilDesktop.Lote,
			new FacilDesktop.LoteLista,
			new FacilDesktop.NotaFiscal,
			new FacilDesktop.NotaFiscalLista,
            new FacilDesktop.Settings(),
            new FacilDesktop.Paciente(),
            new FacilDesktop.PacienteLista(),
            new FacilDesktop.Produto(),
            new FacilDesktop.ProdutoLista(),
            new FacilDesktop.Prontuario(),
            new FacilDesktop.ProntuarioLista(),
            new FacilDesktop.TabWindow()
            
        ];
        return _modules;
    },
	
	shortcutObject: {
		fornecedor: {name:"Fornecedor",iconCls:"fornecedor-shortcut",module:"_modFornecedor"},
		lote: {name:"Lote",iconCls:"lote-shortcut",module:"_modLote"},
		medicamento: {name:"Medicamento",iconCls:"produtos-shortcut",module:"_modProduto"},
		notaFiscal: {name:"Nota Fiscal",iconCls:"notafiscal-shortcut",module:"_modNotaFiscal"},
		paciente: {name:"Paciente",iconCls:"paciente-shortcut",module:"_modPaciente"},
		prontuario: {name:"Prontuario",iconCls:"prontuario-shortcut",module:"_modProntuario"},
		estoque: {name:"Estoque",iconCls:"fornecedor-shortcut",module:"_modEstoque"},
		usuarioDoSistema: {name:"Usuário do Sistema",iconCls:"acesso-shortcut",module:"_modAcesso"}
	},

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();
		var menuData = [];
		menuData = [
			me.shortcutObject.fornecedor,
			me.shortcutObject.lote,
			me.shortcutObject.medicamento,
			me.shortcutObject.notaFiscal,
			me.shortcutObject.paciente,
			me.shortcutObject.prontuario,
			me.shortcutObject.estoque,
			me.shortcutObject.usuarioDoSistema
		];
			
        return Ext.apply(ret, {

            contextMenuItems: [
                {text: 'Alterar Configurações', handler: me.onSettings, scope: me}
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'FacilDesktop.ux.ShortcutModel',
                data: menuData
            }),

            wallpaper: 'resources/images/wallpapers/Blue-Sencha.jpg',
            wallpaperStretch: false
        });
    },

    // config for the start menu
    getStartConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: MyDesktop.getCompany.emp_fantasia,
			itemId:'startMenuUser',
            iconCls: 'user',
            height: 350,
            items:[
                
            ],
            toolConfig: {
                width: 125,
                items: [
                    {
                        text: 'Alterar Senha',
                        iconCls: 'config-menu',
                        handler: me.onUser,
                        scope: me
                    },
                    '-',
                    {
                        text: 'Sair',
                        iconCls: 'sair-menu',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
                /*{ name: 'NF-e', iconCls: 'icon-grid', module: '_modNfe' },
				{ name: 'NF-e de Entrada', iconCls: 'icon-grid', module: 'formNFeEntrada' },
				{ name: 'NF de Entrada', iconCls: 'icon-grid', module: 'formNFEntrada' },
				{name: 'Certificado Digital', iconCls: 'icon-certificado', module: '_modCertificado'}
				{ name: 'Tipo de Serviço', iconCls: 'icon-grid', module: '_modEvento' },*/
            ],
            trayItems: [
                {xtype: 'trayclock', flex: 1}
            ]
        });
    },

    onLogout: function () {
        MyDesktop.confirm('Sair', 'Tem certeza que deseja sair?', function (_button, _text) {
            if (_button == "yes") {
				_company={};
				MyDesktop.cookieManager.destroyCookie('user');
                MyDesktop.getModule('_modLogin').createWindow().show();
            }
        });
    },
	
	onUser: function () {
        MyDesktop.getModule('_modAlterarSenha').createWindow().show();
        _winAlterarSenha.el.setStyle('z-index','99999999'); 
    },

    onSettings: function () {
        /*var dlg = new FacilDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();*/
        MyDesktop.getModule('_modSettings').createWindow().show();
        _winSettings.el.setStyle('z-index','99999999'); 
    },
    uds: {
        suporte: {
            email: 'fausto@fausto.dev',
            nfe: {
                erroTransmissao: 'Ocorreu um erro durante a transmissão e um email foi enviado para o suporte.<br>Em caso de dúvidas, entre em contato com o suporte do sistema.'
            }
        }
    },
    user: 'fausto@fausto.dev',
    userPass: '',
	getCompany:{},
	setCompany:function(_callback) {

		window.Ext.Ajax.request({
			'url': getURL() + 'app/controller/companyLoad.php',
			timeout: 30000,
			params: {
				p:MyDesktop.getCompany.code
			},
			method: 'POST',
			success: function (response, opts) {

				var _rowdata = Ext.decode(response.responseText);

				for (var _p in _rowdata[0]) {
					MyDesktop.getCompany[_p] = _rowdata[0][_p];
				}

				// Ext.getStore({type:'Carteira'}).proxy.extraParams.p=MyDesktop.getCompany.code;
				// Ext.getStore({type:'Carteira'}).load();
				
				if(typeof(_callback)!='undefined'){
					_callback();
				}

			},
			failure: function (response, opts) {
				return ('Empresa não encontrada.');
			}
		});

	},
	
    waitMessage: function (_msg, _title, _id) {

        if (_id) {
            _id = 'msg' + _id;
        } else {
            _id = 'msg';
        }

        _msg = Ext.MessageBox.show({
            itemId: _id,
            msg: _msg,
            title: _title,
            wait: true,
            bodyBorder: true,
            width: 500,
            timeout: 5,
            icon: Ext.window.MessageBox.INFO,
            waitConfig: {
                interval: 200
            }
        })

        return _msg;
    },

    confirm: function (_title, _msg, _fn) {

        var _promptBox = Ext.Msg;
        _promptBox.buttonText = {
            cancel: 'Cancelar',
            no: 'Não',
            ok: 'OK',
            yes: 'Sim'
        };
        _promptBox.confirm(_title, _msg, _fn);
        _promptBox.el.setStyle('z-index','99999999');

    },
    closeMsg: function () {
        setTimeout(function () {
            Ext.Msg.close();
        }, 1500);
    },
    /** CUSTOM FUNCTIONS/VARIABLES **/
    removeTaskbarButton: function (_title) {
        var _items = Ext.ComponentQuery.query('#barraTarefas')[0].items.items;
        for (var _i = 0; _i < _items.length; _i++) {
            if (_items[_i].text == _title) {
                Ext.ComponentQuery.query('#barraTarefas')[0].remove(_i);
            }
        }
    },

    pad: function (_str, _len, _pad, _dir) {

        if (typeof(_str) != 'string') {
            _str = _str.toString();
        }

        if (typeof(_len) == "undefined") {
            var _len = 0;
        }

        if (typeof(_pad) == "undefined") {
            var _pad = ' ';
        }

        if (typeof(_dir) == "undefined") {
            var _dir = 'STR_PAD_RIGHT';
        }

        if (_len + 1 >= _str.length) {

            switch (_dir) {

                case 'STR_PAD_LEFT':
                    _str = Array(_len + 1 - _str.length).join(_pad) + _str;
                    break;

                case 'STR_PAD_BOTH':
                    var right = Math.ceil((_pad_len = _len - _str.length) / 2);
                    var left = _pad_len - right;
                    _str = Array(left + 1).join(_pad) + _str + Array(right + 1).join(_pad);
                    break;

                default:
                    _str = _str + Array(_len + 1 - _str.length).join(_pad);
                    break;

            }

        }

        return _str;

    },
    comboBoxClass: 'background:#f9f9f9;width:100%;display:block;font-size:12px;border-bottom:1px solid #CCC; padding:2px 0px 2px 0px;" onmouseover="this.style.backgroundColor=\'#d6eaf6\'"; onmouseout="this.style.backgroundColor=\'#f9f9f9\'" onfocus="this.style.backgroundColor=\'#d6eaf6\'',

    toUpperCaseFirst: function (_str) {
        return _str[0].toUpperCase() + _str.substr(1, _str.length);
    },

    getAtomicNumber: function (_big, _compact) {
        var _v = Math.round(Math.random() * 10000000);
        if (typeof _big == 'undefined' || !_big) {
            if (typeof _compact == 'undefined' || !_compact)
                return (_v);
            else
                return (_v.toString(32).toUpperCase());
        }
        else {
            var _s = new Date().getTime().toString().substr(6);
            if (typeof _compact == 'undefined' || !_compact)
                return (_v.toString() + _s);
            else
                return ((_v.toString(32) + parseInt(_s).toString(32)).toUpperCase());
        }
    },

    str_replace: function (antigo, novo, asubstituir, count) {
        var i = 0,
            j = 0,
            temp = '',
            repl = '',
            sl = 0,
            fl = 0,
            f = [].concat(antigo),
            r = [].concat(novo),
            s = asubstituir,
            ra = Object.prototype.toString.call(r) === '[object Array]',
            sa = Object.prototype.toString.call(s) === '[object Array]';
        s = [].concat(s);
        if (count) {
            this.window[count] = 0;
        }
        for (i = 0, sl = s.length; i < sl; i++) {
            if (s[i] === '') {
                continue;
            }
            for (j = 0, fl = f.length; j < fl; j++) {
                temp = s[i] + '';
                repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
                s[i] = (temp).split(f[j]).join(repl);
                if (count && s[i] !== temp) {
                    this.window[count] += (temp.length - s[i].length) / f[j].length;
                }
            }
        }
        return sa ? s : s[0];
    },

    str_pad: function (input, pad_length, pad_string, pad_type) {
        var half = '',
            pad_to_go;
        var str_pad = function (s, len) {
            var collect = '', i;
            while (collect.length < len) {
                collect += s;
            }
            collect = collect.substr(0, len);
            return collect;
        };
        input += '';
        pad_string = pad_string !== undefined ? pad_string : ' ';
        if (pad_type !== 'STR_PAD_LEFT' && pad_type !== 'STR_PAD_RIGHT' && pad_type !== 'STR_PAD_BOTH') {
            pad_type = 'STR_PAD_RIGHT';
        }
        if ((pad_to_go = pad_length - input.length) > 0) {
            if (pad_type === 'STR_PAD_LEFT') {
                input = str_pad(pad_string, pad_to_go) + input;
            } else if (pad_type === 'STR_PAD_RIGHT') {
                input = input + str_pad(pad_string, pad_to_go);
            } else if (pad_type === 'STR_PAD_BOTH') {
                half = str_pad(pad_string, Math.ceil(pad_to_go / 2));
                input = half + input + half;
                input = input.substr(0, pad_length);
            }
        }
        return input;
    },

    float2number: function (num) {
        x = 0;
		
		if(typeof(num)=='string'){
			num = parseFloat(num.replace(',','.'));
		}
		
        if (num < 0) {
            num = Math.abs(num);
            x = 1;
        }
        if (isNaN(num)) num = "0";
        cents = Math.floor((num * 100 + 0.5) % 100);

        num = Math.floor((num * 100 + 0.5) / 100).toString();

        if (cents < 10) cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
        ret = num + ',' + cents;
        if (x == 1) ret = ' - ' + ret;

        return ret;
    },

	fixMsgBox:function(_win){
		_win.el.setStyle('z-index','99999999');
	},
	
	cookieManager : {
		setCookie:function(_name, cvalue, exdays) {
			var d = new Date();
			var e = new Date(d.getFullYear()+'-'+(d.getMonth()+1)+'-'+(d.getDate()+exdays)+' '+(d.getHours()-3)+':'+d.getMinutes());
			var expires = "expires="+e.toUTCString();
			document.cookie = _name + "=" + cvalue + "; " + expires;
		},

		getCookie:function(_name) {
			var name = _name + "=";
			var ca = document.cookie.split(';');
			for(var i=0; i<ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1);
				if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
			}
			return "";
		},
		
		destroyCookie:function(_name){
			var d = new Date();
			var e = new Date(d.getFullYear()+'-'+(d.getMonth()+1)+'-'+(d.getDate())+' '+(d.getHours()-3)+':'+d.getMinutes());
			var expires = "expires="+e.toUTCString();
			document.cookie = _name + "=; " + expires;
		},

		checkCookie:function() {
			var user = this.getCookie("username");
			if (user != "") {
				alert("Welcome again " + user);
			} else {
				user = prompt("Please enter your name:", "");
				if (user != "" && user != null) {
					this.setCookie("username", user, 365);
				}
			}
		}
	},

    calcGrauMask : function (_m){
        var _a=_m.split('.');
        var _n=0;
        for (var nI=0;nI<_a.length;nI++){
            var _v=_a[nI];
            if (_v.length) _v=_v.trim();
            if (_v.length) _n++;
        }
        return (_n);
    },
	
	dateDiff : {

		inDays: function(d1, d2) {
			var t2 = d2.getTime();
			var t1 = d1.getTime();
	 
			return parseInt((t2-t1)/(24*3600*1000));
		},
	 
		inWeeks: function(d1, d2) {
			var t2 = d2.getTime();
			var t1 = d1.getTime();
	 
			return parseInt((t2-t1)/(24*3600*1000*7));
		},
	 
		inMonths: function(d1, d2) {
			var d1Y = d1.getFullYear();
			var d2Y = d2.getFullYear();
			var d1M = d1.getMonth();
			var d2M = d2.getMonth();
	 
			return (d2M+12*d2Y)-(d1M+12*d1Y);
		},
	 
		inYears: function(d1, d2) {
			return d2.getFullYear()-d1.getFullYear();
		}
		
		/*
			document.write("<br />Number of <b>days</b> since "+dString+": "+MyDesktop.dateDiff.inDays(d1, d2));
			document.write("<br />Number of <b>weeks</b> since "+dString+": "+MyDesktop.dateDiff.inWeeks(d1, d2));
			document.write("<br />Number of <b>months</b> since "+dString+": "+MyDesktop.dateDiff.inMonths(d1, d2));
			document.write("<br />Number of <b>years</b> since "+dString+": "+MyDesktop.dateDiff.inYears(d1, d2));
		*/
		
	},
	
	removerAcentos:function(_palavra){
		_palavra = new String(_palavra);
		
		_com_acento = new Array("á", "à", "â", "ã", "ä", "é", "è", "ê", "ë", "í", "ì", "î", "ï", "ó", "ò", "ô", "õ", "ö", "ú", "ù", "û", "ü", "ç", "Á", "À", "Â", "Ã", "Ä", "É", "È", "Ê", "Ë", "Í", "Ì", "Î", "Ï", "Ó", "Ò", "Ô", "Õ", "Ö", "Ú", "Ù", "Û", "Ü", "Ç");
		
		_sem_acento = new Array("a", "a", "a", "a", "a", "e", "e", "e", "e", "i", "i", "i", "i", "o", "o", "o", "o", "o", "u", "u", "u", "u", "c", "A", "A", "A", "A", "A", "E", "E", "E", "E", "I", "I", "I", "I", "O", "O", "O", "O", "O", "U", "U", "U", "U", "C");
		
		_nova='';

		for(i=0;i<_palavra.length;i++) {
			_gravou="";
			letra = _palavra.substr(i,1);
			for(x=0;x<46;x++){
				if(letra==_com_acento[x]){
				   _nova+=_sem_acento[x];
				   _gravou="ok";
				}
			}

			if(_gravou!="ok"){

				_nova+=letra;
			}
		}
		return _nova;
	}

    /** CUSTOM FUNCTIONS/VARIABLES **/
});