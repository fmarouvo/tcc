Ext.define('FacilDesktop.ux.MessageBox', {
    extend: 'Ext.window.MessageBox',
    initComponent: function () {
        this.callParent();

    }
}, function () {
    Ext.MessageBox = Ext.Msg = new this();
});