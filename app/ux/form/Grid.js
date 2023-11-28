Ext.define('FacilDesktop.ux.form.Grid', {
    extend: 'Ext.grid.Panel',

    initComponent: function () {
        var _me = this;
        this.callParent();

        var _data = [];
        var _hasReg = false;

        _me.getView().getRowClass = function (_record, _rowIndex, _rowParams, _store) {

            var _obj = {};

            for (var _prop in _record.data) {

                if (_record.data.hasOwnProperty(_prop)) {
                    if (_record.data[_prop] == 'Novo Registro') {
                        _hasReg = true;
                    }
                }

                if (_hasReg == false) {
                    _obj._prop = _record.data[_prop];
                }


            }

            _data.push(_obj);

        };
        this.store.loadData(_data);
    },

    constructor: function (config) {
        this.callParent([config]);
    }

});