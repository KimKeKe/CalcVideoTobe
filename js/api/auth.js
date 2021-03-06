/***** START BOILERPLATE CODE: Load client library, authorize user. *****/

    // Global variables for GoogleAuth object, auth status.
var GoogleAuth;

// AIzaSyCMor_xHG7DyR6IaWtSlE3FYbCEsmdSH0M
/**
 * Load the API's client and auth2 modules.
 * Call the initClient function after the modules load.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
    // getMostPopular();
    search();
}

function initClient() {
    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes

    gapi.client.init({
        'clientId': '432438312083-f0g3rt9adueov53bb9e0mt539u616920.apps.googleusercontent.com',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
        'scope': 'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner'
    }).then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();

        // Listen for sign-in state changes.
        GoogleAuth.isSignedIn.listen(updateSigninStatus);

        // Handle initial sign-in state. (Determine if user is already signed in.)
        setSigninStatus();

        // Call handleAuthClick function when user clicks on "Authorize" button.
        $('#execute-request-button').click(function() {
            // handleAuthClick(event);
            getMostPopular();
            // searchMostView();
        });
    });
}

function handleAuthClick(event) {
    // Sign user in after click on auth button.
    GoogleAuth.signIn();
}

function setSigninStatus() {
    var user = GoogleAuth.currentUser.get();
    isAuthorized = user.hasGrantedScopes('https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner');
    // Toggle button text and displayed statement based on current auth status.
    if (isAuthorized) {
        defineRequest();
    }
}

function updateSigninStatus(isSignedIn) {
    setSigninStatus();
}

function createResource(properties) {
    var resource = {};
    var normalizedProps = properties;
    for (var p in properties) {
        var value = properties[p];
        if (p && p.substr(-2, 2) == '[]') {
            var adjustedName = p.replace('[]', '');
            if (value) {
                normalizedProps[adjustedName] = value.split(',');
            }
            delete normalizedProps[p];
        }
    }
    for (var p in normalizedProps) {
        // Leave properties that don't have values out of inserted resource.
        if (normalizedProps.hasOwnProperty(p) && normalizedProps[p]) {
            var propArray = p.split('.');
            var ref = resource;
            for (var pa = 0; pa < propArray.length; pa++) {
                var key = propArray[pa];
                if (pa == propArray.length - 1) {
                    ref[key] = normalizedProps[p];
                } else {
                    ref = ref[key] = ref[key] || {};
                }
            }
        };
    }
    return resource;
}

function removeEmptyParams(params) {
    for (var p in params) {
        if (!params[p] || params[p] == 'undefined') {
            delete params[p];
        }
    }
    return params;
}

function executeRequest(request) {
    request.execute(function(response) {
        console.log(response);

        document.getElementById('img1').src = response.items[0].snippet.thumbnails.medium.url;
        document.getElementById('li01').innerHTML = response.items[0].snippet.title;
        // document.getElementById('li02').innerHTML = response.items[0].statistics.viewCount;
        $('#img1').click(function() {
            newSite(response.items[0].id);
        });

        document.getElementById('img2').src = response.items[1].snippet.thumbnails.medium.url;
        $('#top2').click(function() {
            newSite(response.items[1].id);
        });

        document.getElementById('img3').src = response.items[2].snippet.thumbnails.medium.url;
        $('#top3').click(function() {
            newSite(response.items[2].id);
        });

        $('#top4').click(function() {
            newSite(response.items[3].id);
        });

        $('#top5').click(function() {
            newSite(response.items[4].id);
        });
    });
}

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

function newSite(id) {
    var site = 'https://www.youtube.com/embed/' + id;
    document.getElementById('if0').src = site;
    document.getElementById('if0').style.display = 'block';
}

/***** END BOILERPLATE CODE *****/


function defineRequest() {
    // See full sample for buildApiRequest() code, which is not
// specific to a particular API or API method.

    buildApiRequest('GET',
        '/youtube/v3/videos',
        {'chart': 'mostPopular',
            'regionCode': 'VN',
            'part': 'snippet,contentDetails,statistics',
            'videoCategoryId': ''});

}

function getMostPopular() {
    buildApiRequest('GET',
        '/youtube/v3/videos',
        {'chart': 'mostPopular',
            'regionCode': 'VN',
            'part': 'snippet,contentDetails,statistics',
            // 'videoCategoryId': '2',
            'key': 'AIzaSyCMor_xHG7DyR6IaWtSlE3FYbCEsmdSH0M',
            'maxResults': '5',
            'pageToken': ''});
}

// search most view
function searchMostView() {
    buildApiRequest('GET',
        '/youtube/v3/search',
        {'part': 'snippet',
            'key': 'AIzaSyCMor_xHG7DyR6IaWtSlE3FYbCEsmdSH0M',
            'maxResults': '5',
            'order': 'viewCount',
            'q': 'youtube.com',
            'type': 'video',
            'pageToken': ''});
}