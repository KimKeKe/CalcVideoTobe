function buildApiRequest(requestMethod, path, params, properties) {
    params = removeEmptyParams(params);
    var request;
    if (properties) {
        var resource = createResource(properties);
        request = gapi.client.request({
            'body': resource,
            'method': requestMethod,
            'path': path,
            'params': params
        });
    } else {
        request = gapi.client.request({
            'method': requestMethod,
            'path': path,
            'params': params
        });
    }
    executeRequest(request);
}

function getMostPopular() {
    buildApiRequest('GET',
        '/youtube/v3/videos',
        {'chart': 'mostPopular',
            'regionCode': 'JP',
            'part': 'snippet,contentDetails,statistics',
            'key': 'AIzaSyCMor_xHG7DyR6IaWtSlE3FYbCEsmdSH0M',
            'maxResults': '5',
            'pageToken': ''});
}

function executeRequest(request) {
    request.execute(function(response) {
        console.log("fuck", response);
        var responseString = JSON.stringify(response, '', 2);
        var dataSearch = ModelSearch.getInstance(responseString);
        $('.player-holder').append("<iframe src='https://www.youtube.com/embed/"+ dataSearch.items[0].id + "'></iframe>");
        $('.scrollable-area').append(makeHtmlEditorPickVideos(dataSearch.items));
        document.getElementById('response').innerHTML = responseString;
    });
}

function removeEmptyParams(params) {
    for (var p in params) {
        if (!params[p] || params[p] == 'undefined') {
            delete params[p];
        }
    }
    return params;
}

function videosGetRating(params) {
    params = removeEmptyParams(params); // See full sample for function
    var request = gapi.client.youtube.videos.getRating(params);
    // executeRequest(request);
    request.execute.onResponseGetVideos()
}


function onResponseGetVideos(response) {
    console.log('fuck', response);
}