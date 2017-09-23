
// stripped down router - for any inbound url, just try to load a global ivar named globalData.
var globalData = {"transactionId":"Elevator","studies":[{"patientName":null,"patientId":null,"studyDate":"20020316","modality":"CR","studyDescription":"Chest ","studyId":null,"seriesList":[{"instanceList":[{"imageId":"\/SER_0002\/IM_0001.dcm"}],"seriesNumber":1,"seriesDescription":"SER_0002","instances":[{"url":"wadouri:\/\/elevator-medschoolbucket.s3.amazonaws.com\/derivative\/17a1d575271bc3f32020b895-dicom\/SER_0002\/IM_0001.dcm?response-content-disposition=attachment%3B%20filename%3D%22STD_0000%22&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJM4UM7SZUB5AVYMQ%2F20170922%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20170922T135410Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Signature=8b28fa3a12703ac2177cda25103d6583db864e0d9f58f9a4730a7d411e7c8b5f","rows":1,"sopInstanceUid":"0_uid","instanceNumber":0}]},{"instanceList":[{"imageId":"\/SER_0003\/IM_0001.dcm"}],"seriesNumber":2,"seriesDescription":"SER_0003","instances":[{"url":"wadouri:\/\/elevator-medschoolbucket.s3.amazonaws.com\/derivative\/17a1d575271bc3f32020b895-dicom\/SER_0003\/IM_0001.dcm?response-content-disposition=attachment%3B%20filename%3D%22STD_0000%22&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJM4UM7SZUB5AVYMQ%2F20170922%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20170922T135410Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Signature=b44eb164cdff1d520a3fa9d2292fbb856fc0edbbb0f874e2f61ff79477e7f75b","rows":1,"sopInstanceUid":"0_uid","instanceNumber":0}]}]}]};



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