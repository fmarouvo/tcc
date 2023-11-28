Ext.Loader.config.disableCaching = false;
Ext.Ajax.disableCaching = false;
Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false
});

Ext.application({
    name: 'FacilDesktop',
    requires: [
        'FacilDesktop.Application'
    ],
    init: function () {
        MyDesktop = new FacilDesktop.Application();
    },
    launch: function () {
        done = true;
        document.getElementById('loading-container').classList.add('loading-done');
        setTimeout(function () {
            document.getElementById('loading').classList.add('loading-done');
            setTimeout(function () {
                document.getElementById('loading').remove();
            }, 2000);
        }, 500);
    }
});