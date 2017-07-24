
// stripped down router - for any inbound url, just try to load a global ivar named globalData.


if (Meteor.isClient) {
    // Disconnect from the Meteor Server since we don't need it
    console.log('Disconnecting from the Meteor server');
    Router.route('/(.*)', {
        action: function(){
        // Create some data to pass to the OHIF Viewer
    const data = {
        studies: globalData.studies,
        contentId: 'standalone' // TODO: Remove all dependence on this
    };

    // Render the Viewer with this data
    this.render('standaloneViewer', {
        data: function() {
            return data;

        }
    });
    }});
    
}