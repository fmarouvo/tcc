Ext.define('FacilDesktop.ux.form.NumberField', {
    extend: 'Ext.form.NumberField',
	
	alias:'widget.decimalfield',
	
    constructor: function (_config) {
        this.callParent([_config]);
		
		var _me = this;
		_me.callParent();

        var _objStyle = {textAlign:'right'};
        if(typeof(_me.fieldStyle)!='undefined'){
			Object.keys(_me.fieldStyle).forEach(function (key) {
				_objStyle[key] = _me.fieldStyle[key];
			});
        }

		_me.maskRe=/[0-9,]/;

		_me.decimalSeparator=",";

		if(_me.forceDecimalPrecision===true){
			_me.decimalPrecision = _me.decimalPrecision;
		}else{
			if(_me.decimalPrecision != 2){
				_me.decimalPrecision = _me.decimalPrecision;
			}else if(MyDesktop.getCompany.emp_decimais != 2){
				_me.decimalPrecision = MyDesktop.getCompany.emp_decimais;
			}else{
				_me.decimalPrecision = _me.decimalPrecision;
			}
		}

		_me.isDecimal = true;
		_me.keyNavEnabled=false;
        _me.mouseWheelEnabled=false;
		_me.selectOnFocus=true;
		_me.fieldStyle = _objStyle;
    },

    initComponent: function () {
        var _me = this;
		_me.callParent();

        var _objStyle = {textAlign:'right'};
        if(typeof(_me.fieldStyle)!='undefined'){
			Object.keys(_me.fieldStyle).forEach(function (key) {
				_objStyle[key] = _me.fieldStyle[key];
			});
        }

		_me.maskRe=/[0-9,]/;

		_me.decimalSeparator=",";

		if(_me.forceDecimalPrecision===true){
			_me.decimalPrecision = _me.decimalPrecision;
		}else{
			if(_me.decimalPrecision != 2){
				_me.decimalPrecision = _me.decimalPrecision;
			}else if(MyDesktop.getCompany.emp_decimais != 2){
				_me.decimalPrecision = MyDesktop.getCompany.emp_decimais;
			}else{
				_me.decimalPrecision = _me.decimalPrecision;
			}
		}

		_me.isDecimal = true;
		_me.keyNavEnabled=false;
        _me.mouseWheelEnabled=false;
		_me.selectOnFocus=true;
		_me.fieldStyle = _objStyle;
    },
	
	setValue: function(_value){
		if(!_value){
			_value = 0;
		}

		if(_value==''){
			_value=0;
		}

		var _me = this;

		if(_me.currency===true){
			if(typeof(_value)!='undefined'&&_value!=null){
				if(typeof(_value)=='string'){
					_value = parseFloat(_value);
				}
				
				if(MyDesktop.decimalPrecision!=_me.decimalPrecision){
					_value=_value.toFixed(_me.decimalPrecision).replace('.',',');
				}else{
					_value=_value.toFixed(MyDesktop.decimalPrecision).replace('.',',');
				}
			}

			_me.superclass.setValue.call(this, _value);
			_me.superclass.setRawValue.call(this, _value);
		}else{
			_me.superclass.setValue.call(this, _value);
		}
	}

});