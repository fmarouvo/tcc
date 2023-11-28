Ext.define('FacilDesktop.ux.form.ComboBox', {
    extend: 'Ext.form.ComboBox',

    comboIndex: null,
    comboValue: null,

    requires: [
        'Ext.XTemplate'
    ],

    comboFields: [],
    calledWindow: [],
    initComponent: function () {
        var _me = this;
		
		if(_me.pageSize===false){
			_pageSize=false;
		}else{
			_pageSize=true;
		}
		
		if(this.listConfig && this.listConfig.minWidth){
			_listMinWidth=this.listConfig.minWidth;
		}else if(this.listMinWidth){
			_listMinWidth=this.listMinWidth;
		}else{
			_listMinWidth=300;
		}
		
		if(this.listMaxHeight){
			_listMaxHeight=this.listMaxHeight;
		}else{
			_listMaxHeight=300;
		}

		// verifica se não foi passado um valor para placeholder e adiciona o valor padrao 
		if(_me.emptyText && _me.emptyText === 'vazio'){
			this.emptyText= "";
		}else if(_me.emptyText && _me.emptyText !== 'vazio'){
			this.emptyText= _me.emptyText;
		}else{
			this.emptyText= 'Selecione';
		}

		if(_me.fieldStyle){
			this.fieldStyle = _me.fieldStyle;
		}else{
			this.fieldStyle = {fontSize: '12px'};
		}
		
		this.minWidth= 50;
		if(this.queryMode=='local'){
			this.minChars=0;
			typeAheadDelay=10;
		}else{
			this.minChars= 2;
			typeAheadDelay=350;
		}
		
		this.selectOnTab=true;
		this.anyMatch=true;
		this.forceSelection=true;
		this.enableKeyEvents=true;
		this.autoSelect=false; // necessario para corrigir a selecao de um único item com o enter
		this.caseSensitive=false;
		this.hideActive=false;
		this.pageSize=_pageSize;
		this.loadingText= 'Procurando...';
		this.listConfig={
			minWidth:_listMinWidth,
			maxHeight: _listMaxHeight,
			itemSelector:'div',
			listeners: {
				click: {
					element: 'el',
					fn: function (_ev, _anchor) {

						if (_anchor.getElementsByClassName('novoRegistro')[0]) {
							var _opened = false;

							Ext.WindowManager.each(
								function (_scope) {
									if (_me.calledWindow[0] == _scope.itemId) {
										_opened = true;
									}
								}
							);

							if (_opened === true) {
								MyDesktop.removeTaskbarButton(Ext.ComponentQuery.query('#' + _me.calledWindow[0])[0].title);
								Ext.ComponentQuery.query('#' + _me.calledWindow[0])[0].close();
							}

							setTimeout(function () {
								if (_me.calledWindow[2]) {
									MyDesktop.getModule(_me.calledWindow[0]).createWindow(_me.calledWindow[1], _me.calledWindow[2]).show();
								}else if (_me.calledWindow[1]) {
									MyDesktop.getModule(_me.calledWindow[0]).createWindow(_me.calledWindow[1]).show();
								} else {
									MyDesktop.getModule(_me.calledWindow[0]).createWindow().show();
								}
							}, 300);
						}

						if (_anchor) {
							_me.comboValue = _anchor.getAttribute('valueField');
						} else {
							_me.comboValue = '';
						}

						if (_me.comboValue != '') {

							if (_me.comboValue == 'Novo Registro') {
								Ext.ComponentQuery.query('#' + _me.getItemId())[0].setValue('');
							} else {
								if(!Ext.ComponentQuery.query('#' + _me.getItemId())[0].getValue()){
									setTimeout(function(){
										Ext.ComponentQuery.query('#' + _me.getItemId())[0].setValue(_me.comboValue);
									},100);
								}
							}

							// Ext.ComponentQuery.query('#' + _me.getItemId())[0].collapse();
						}
					}
				},
				highlightitem: function (view, node, eOpts) {
					if (node.innerText != "Novo Registro") {
						node.style.backgroundColor = "#d6eaf6";
					} else {
						node.style.backgroundColor = "#3db03d";
					}
				},
				unhighlightitem: function (view, node, eOpts) {
					if (node.innerText != "Novo Registro") {
						node.style.backgroundColor = "#f9f9f9";
					} else {
						node.style.backgroundColor = "#157fcc";
					}
				}
			}
		};

        this.listeners = {
            select: function (_self) {
                _me.comboValue = _self.getValue();
                var _v = _self.getValue();
                var _record = _self.findRecord(_self.valueField || _self.displayField, _v);
                var _index = _self.store.indexOf(_record);
                _me.comboIndex = _index;

				if (_self.getValue() == "Novo Registro") {

					if (!this.calledWindow) {
						this.calledWindow = [];
					}

					if (this.calledWindow == []) {
						Ext.Msg.alert('Atenção!', 'A janela para realizar o novo registro não foi informada');
					} else {
						var _opened = false;

						Ext.WindowManager.each(
							function (_scope) {
								if (_me.calledWindow[0] == _scope.itemId) {
									_opened = true;
								}
							}
						);

						_self.setValue('');
						_self.store.load();
						_self.store.removeAll();
						_self.lastQuery = null;

						if (_opened === true) {
							MyDesktop.removeTaskbarButton(Ext.ComponentQuery.query('#' + _me.calledWindow[0])[0].title);
							Ext.ComponentQuery.query('#' + _me.calledWindow[0])[0].close();
						}
						
						if(_me.isPdvField===false){
							setTimeout(function () {
								if (_me.calledWindow[2]) {
									MyDesktop.getModule(_me.calledWindow[0]).createWindow(_me.calledWindow[1], _me.calledWindow[2]).show();
								}else if (_me.calledWindow[1]) {
									MyDesktop.getModule(_me.calledWindow[0]).createWindow(_me.calledWindow[1]).show();
								} else {
									MyDesktop.getModule(_me.calledWindow[0]).createWindow().show();
								}
							}, 300);
						}
					}

                } else  if (_me.ajax) {

					var _extraParams = '';

                    if (_me.ajax.extraParams && _me.ajax.extraParams.length > 0) {
                        for (var _i = 0; _i < _me.ajax.extraParams.length; _i++) {
                            if (_i == 0) {
                                _extraParams += '?';
                            }
                            _extraParams += _me.ajax.extraParams[_i][0] + Ext.ComponentQuery.query('#' + _me.ajax.extraParams[_i][1])[0].getValue();
                        }
                    }

                    Ext.Ajax.request(
                        {
                            url: _me.ajax.url + _extraParams,
                            success: _me.ajax.success,
                            failure: _me.ajax.failure
                        }
                    );
                }
            },
			keypress : function(_self,_event){
				if (_event.getCharCode() == Ext.EventObject.ENTER) {
					var _valueField = this.valueField;
					var _displayField = this.displayField;
					
					/* Se a busca tiver apenas um registro, seleciona o mesmo */
					if(_self.getRawValue()){
						var _dados = _self.getStore().data.items;
						if(_dados[0]){
							if(_dados[0].data[_valueField]){
								if(_dados.length==1){
									var _display = _dados[0].data[_displayField].toString();
									var _raw = _self.getRawValue().toString();
									_self.setValue(_dados[0].data[_valueField]);
								}
							}
						}
					}
				}
			},
			blur: function(_self){
				
				var _valueField = this.valueField;
				var _displayField = this.displayField;
				
				/* Se a busca tiver apenas um registro, seleciona o mesmo */
				if(_self.getRawValue()){
					var _dados = _self.getStore().data.items;
					if(_dados[0]){
						if(_dados[0].data[_valueField]){
							if(_dados.length==1){
								var _display = _dados[0].data[_displayField].toString();
								var _raw = _self.getRawValue().toString();
								_self.setValue(_dados[0].data[_valueField]);
							}
						}
					}
				}
			}
        }

        var _class = [];
        var _me = this;
		if(this.fields){
			
			this.comboFields = this.fields;
			this.comboDisplayFields = this.displayFields;

			if (typeof(this.tpl) == 'undefined') {

				var _displayText='';

				if(this.colorpicker === true){
					
					_displayText = '<div class="' + _class[this.id] + ' fausto" role="option" valueField="{' + this.comboFields[0] + '}" onclick="javascript: this.parentNode.click();">'+
                        '<div style="width:20%; float:left; margin-right:1%; background-color:{hexadecimal}"> &nbsp </div>'+
                        '<div style="width:75%; float:left;"> <span style="color:#272727;"> {' + this.comboDisplayFields[0] + '} </span> </div>'+
                    '</div>';

				} else if(this.comboDisplayFields[0] == this.comboFields[0]){
					
					_displayText = '<div class="' + _class[this.id] + ' fausto" style="width:auto; float:left; font-weight:bold; color:#F00; padding-left:10px; padding-right:5px" role="option" valueField="{' + this.comboFields[0] + '}" onclick="javascript: this.parentNode.click();">{' + this.comboDisplayFields[0] + '}</div>';

				} else {

					var _fieldClass = (this.displayFieldsClass && this.displayFieldsClass[0]) ? this.displayFieldsClass[0] : 'color:#000; font-weight:normal';

					_displayText = '<div class="' + _class[this.id] + ' fausto" style="width:auto; float:left; font-weight:normal; color:#000; padding-left:10px; '+_fieldClass+'" role="option" valueField="{' + this.comboFields[0] + '}" onclick="javascript: this.parentNode.click();">{' + this.comboDisplayFields[0] + '}</div>';
				}

				for(var _i=1; _i<this.comboDisplayFields.length; _i++) {

					var _fieldClass = (this.displayFieldsClass && this.displayFieldsClass[_i]) ? this.displayFieldsClass[_i] : 'color:#000; font-weight:normal';

					// _displayText += ' - <span style="'+_fieldClass+'">{'+this.comboDisplayFields[_i]+'}</span>';
					_displayText += ' - {'+this.comboDisplayFields[_i]+'}';
					/*if(_i>=2){
						_displayText += ' - <span style="'+_fieldClass+'">({'+this.comboDisplayFields[_i]+'})</span>';
					}else{
						_displayText += ' - <span style="'+_fieldClass+'">{'+this.comboDisplayFields[_i]+'}</span>';
					}*/
				}

				this.tpl = Ext.create('Ext.XTemplate',
					'<tpl for=".">',
						'<tpl if="novo_registro === true">',
							'<div class="x-boundlist-item" style="width:100%; float:left; color:#f5f5f5; background:#157fcc;display:block;font-size:12px;border-bottom:1px solid #CCC;padding:4px 0px 0px 10px" role="option" valueField="Novo Registro"><img src="resources/images/add_registro.png" style="float:left; padding-right:6px; padding-top:3px; align:middle" onclick="javascript: this.parentNode.click();"><div class="novoRegistro" style="width:auto; float:left; font-weight:bold;" onclick="javascript: this.parentNode.click();">Novo Registro</div></div>',
						'<tpl else>',
							'<div class="x-boundlist-item" style="width:100%; float:left;' + MyDesktop.comboBoxClass + '" role="option" valueField="{' + this.comboFields[0] + '}">'+_displayText+'</div>',
						'</tpl>',
					'</tpl>'
				);

			} else {

				this.tpl = '<tpl for="."><div class="x-boundlist-item">' + this.tpl + '</div></tpl>';
			}
		}

        this.triggerAction = 'all';
        this.callParent();
    },

    constructor: function (config) {
        var _me = this;
        this.callParent([config]);
    },

	onBindStore: function(store, initial) {
		this.callParent(arguments);
		// Deselect on container click is not required if paging toolbar exists
		// this.pickerSelectionModel.deselectOnContainerClick = false;
	},
	
	/**
	* if the fromComponent owner is picker then do not collapse boundlist.
	*/
	onFocusLeave: function(e) {
		var me = this;
		if (e.fromComponent.activeOwner && e.fromComponent.activeOwner.id == this.picker.id) {
			return;
		}
		me.collapse();
		me.callParent([e]);
	}
	

});