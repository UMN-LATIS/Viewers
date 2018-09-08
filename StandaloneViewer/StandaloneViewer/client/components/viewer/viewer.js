import { OHIF } from 'meteor/ohif:core';

OHIF.viewer = OHIF.viewer || {};
OHIF.viewer.loadIndicatorDelay = 500;
OHIF.viewer.defaultTool = 'wwwc';
OHIF.viewer.refLinesEnabled = true;
OHIF.viewer.isPlaying = {};
OHIF.viewer.cine = {
    framesPerSecond: 24,
    loop: true
};


OHIF.viewer.functionList = {
    toggleCineDialog: toggleCineDialog,
    toggleCinePlay: toggleCinePlay,
    clearTools: clearTools,
    resetViewport: resetViewport,
    invert: invert
};

Session.set('activeContentId', 'standalone');

Session.setDefault('activeViewport', false);
Session.setDefault('leftSidebar', false);
Session.setDefault('rightSidebar', false);

Template.viewer.onCreated(() => {
    const instance = Template.instance();

    instance.data.state = new ReactiveDict();
    instance.data.state.set('leftSidebar', Session.get('leftSidebar'));
    instance.data.state.set('rightSidebar', Session.get('rightSidebar'));

    const contentId = instance.data.contentId;

    if (ViewerData[contentId] && ViewerData[contentId].loadedSeriesData) {
        log.info('Reloading previous loadedSeriesData');
        OHIF.viewer.loadedSeriesData = ViewerData[contentId].loadedSeriesData;
    } else {
        log.info('Setting default ViewerData');
        OHIF.viewer.loadedSeriesData = {};
        ViewerData[contentId] = {};
        ViewerData[contentId].loadedSeriesData = OHIF.viewer.loadedSeriesData;



        // Update the viewer data object

        // Pop the left sidebar when there are > 2 series
        if (instance.data.studies[0].seriesList.length > 2) {
          instance.data.state.set('leftSidebar', true);
        }
        ViewerData[contentId].viewportRows = 1;
        ViewerData[contentId].activeViewport = 0;
    }

    Session.set('activeViewport', ViewerData[contentId].activeViewport || 0);

    // Update the ViewerStudies collection with the loaded studies
    ViewerStudies.remove({});

    ViewerData[contentId].studyInstanceUids = [];
    instance.data.studies.forEach(study => {
        study.selected = true;
        study.displaySets = createStacks(study);
        ViewerStudies.insert(study);
        ViewerData[contentId].studyInstanceUids.push(study.studyInstanceUid);
    });

    Session.set('ViewerData', ViewerData);
});

Template.viewer.events({
    'click .js-toggle-studies'() {
        const instance = Template.instance();
        const current = instance.data.state.get('leftSidebar');
        instance.data.state.set('leftSidebar', !current);
    }
});


// Force a single column for a study with only one series
Template.viewer.onRendered( function() {

  if (!Template.instance()) { return; }

  const instance = Template.instance();


  if (instance.data.studies[0].seriesList.length === 1) {
    window.layoutManager.layoutProps.columns = 1;
    window.layoutManager.updateViewports();
  }

});
