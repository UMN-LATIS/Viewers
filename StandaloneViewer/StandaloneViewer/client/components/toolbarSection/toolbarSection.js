import { OHIF } from 'meteor/ohif:core';

Template.toolbarSection.helpers({
    leftSidebarToggleButtonData() {
        const instance = Template.instance();
        return {
            toggleable: true,
            key: 'leftSidebar',
            value: instance.data.state,
            options: [{
                value: 'studies',
                svgLink: '/assets/dicom/packages/viewerbase/assets/icons.svg#icon-studies',
                svgWidth: 15,
                svgHeight: 13,
                bottomLabel: 'Series'
            }]
        };
    },

    toolbarButtons() {
        var buttonData = [];

        buttonData.push({
            id: 'fullscreen',
            title: 'Fullscreen',
            classes: 'imageViewerTool',
            iconClasses: 'fa fa-external-link'
        });

        buttonData.push({
            id: 'wwwc',
            title: 'Levels',
            classes: 'imageViewerTool',
            svgLink: '/assets/dicom/packages/viewerbase/assets/icons.svg#icon-tools-levels'
        });

        buttonData.push({
            id: 'stackScroll',
            title: 'Stack Scroll',
            classes: 'imageViewerTool',
            iconClasses: 'fa fa-bars'
        });

        buttonData.push({
            id: 'zoom',
            title: 'Zoom',
            classes: 'imageViewerTool',
            svgLink: '/assets/dicom/packages/viewerbase/assets/icons.svg#icon-tools-zoom'
        });

        buttonData.push({
            id: 'pan',
            title: 'Pan',
            classes: 'imageViewerTool',
            svgLink: '/assets/dicom/packages/viewerbase/assets/icons.svg#icon-tools-pan'
        });

        buttonData.push({
            id: 'length',
            title: 'Length',
            classes: 'imageViewerTool toolbarSectionButton',
            svgLink: '/assets/dicom/packages/viewerbase/assets/icons.svg#icon-tools-measure-temp'
        });

        buttonData.push({
            id: 'ellipticalRoi',
            title: 'ROI',
            classes: 'imageViewerTool',
            iconClasses: 'fa fa-circle-o'
        });

        buttonData.push({
            id: 'resetViewport',
            title: 'Reset',
            classes: 'imageViewerCommand',
            iconClasses: 'fa fa-undo'
        });

        buttonData.push({
            id: 'toggleCinePlay',
            title: 'Toggle CINE Play',
            classes: 'imageViewerCommand',
            buttonTemplateName: 'playClipButton'
        });

        buttonData.push({
            id: 'layout',
            title: 'Layout',
            iconClasses: 'fa fa-th-large',
            buttonTemplateName: 'layoutButton'
        });

        return buttonData;
    },

    extraToolbarButtons() {
        let buttonData = [];

        buttonData.push({
            id: 'angle',
            title: 'Angle',
            classes: 'imageViewerTool',
            iconClasses: 'fa fa-angle-left'
        });

        buttonData.push({
            id: 'annotate',
            title: 'Annotate',
            classes: 'imageViewerTool',
            svgLink: '/assets/dicom/packages/viewerbase/assets/icons.svg#icon-tools-measure-non-target'
        });

        buttonData.push({
            id: 'toggleCineDialog',
            title: 'CINE',
            classes: 'imageViewerCommand',
            iconClasses: 'fa fa-youtube-play'
        });

        buttonData.push({
            id: 'magnify',
            title: 'Magnify',
            classes: 'imageViewerTool toolbarSectionButton',
            iconClasses: 'fa fa-circle'
        });

        // buttonData.push({
        //     id: 'wwwcRegion',
        //     title: 'ROI Window',
        //     classes: 'imageViewerTool',
        //     iconClasses: 'fa fa-square'
        // });

        // buttonData.push({
        //     id: 'dragProbe',
        //     title: 'Probe',
        //     classes: 'imageViewerTool',
        //     iconClasses: 'fa fa-dot-circle-o'
        // });

        // buttonData.push({
        //     id: 'rectangleRoi',
        //     title: 'Rectangle',
        //     classes: 'imageViewerTool',
        //     iconClasses: 'fa fa-square-o'
        // });

        buttonData.push({
            id: 'invert',
            title: 'Invert',
            classes: 'imageViewerCommand',
            iconClasses: 'fa fa-adjust'
        });

        buttonData.push({
            id: 'clearTools',
            title: 'Clear',
            classes: 'imageViewerCommand',
            iconClasses: 'fa fa-trash'
        });

        return buttonData;
    },

    hangingProtocolButtons() {
        let buttonData = [];

        buttonData.push({
            id: 'previousPresentationGroup',
            title: 'Prev. Stage',
            iconClasses: 'fa fa-step-backward',
            buttonTemplateName: 'previousPresentationGroupButton'
        });

        buttonData.push({
            id: 'nextPresentationGroup',
            title: 'Next Stage',
            iconClasses: 'fa fa-step-forward',
            buttonTemplateName: 'nextPresentationGroupButton'
        });

        return buttonData;
    }

});

Template.toolbarSection.onRendered(function() {
    const instance = Template.instance();

    // Enable fullscreen mode on button press
        $('.fa-external-link').on('click', function(){
          console.log("clicked fullscreen");
          // if already full screen; exit
          // else go fullscreen
          if (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
          ) {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
            }
          } else {
            element = $('#viewer').get(0);
            if (element.requestFullscreen) {
              element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
              element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
              element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (element.msRequestFullscreen) {
              element.msRequestFullscreen();
            }
          }
        });
    // End fullscreen JS

    instance.$('#layout').dropdown();

    // Set disabled/enabled tool buttons that are set in toolManager
    const states = toolManager.getToolDefaultStates();
    const disabledToolButtons = states.disabledToolButtons;
    const allToolbarButtons = $('#toolbar').find('button');
    if (disabledToolButtons && disabledToolButtons.length > 0) {
        for (var i = 0; i < allToolbarButtons.length; i++) {
            const toolbarButton = allToolbarButtons[i];
            $(toolbarButton).prop('disabled', false);

            const index = disabledToolButtons.indexOf($(toolbarButton).attr('id'));
            if (index !== -1) {
                $(toolbarButton).prop('disabled', true);
            }
        }
    }
});
