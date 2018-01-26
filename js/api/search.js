// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms
// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}
// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyCMor_xHG7DyR6IaWtSlE3FYbCEsmdSH0M');
    // search()
    // videosGetRating();
    getMostPopular();
}

// Called when the search button is clicked in the html code
function search() {
    var query = 'Dota 2';
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        type: 'video',
        q:query
    });
    // Send the request to the API server, call the onSearchResponse function when the data is returned
    request.execute(onSearchResponse);
}
// Triggered by this line: request.execute(onSearchResponse);
function onSearchResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    var dataSearch = ModelSearch.getInstance(responseString);
    $('.player-holder').append("<iframe src='https://www.youtube.com/embed/"+ dataSearch.items[0].id.videoId + "'></iframe>");
    $('.scrollable-area').append(makeHtmlEditorPickVideos(dataSearch.items));
    document.getElementById('response').innerHTML = responseString;
}

function makeHtmlEditorPickVideos(videos) {
    var htmlString = "";
    for (i = 0; i < videos.length; i ++) {
        console.log('xxxxx', videos[i].id.videoId);
        htmlString += makeHtmlEpVideo(videos[i])
    }
    return htmlString;
}

function makeHtmlEpVideo(video) {
    var htmlString = "<div onclick=\"\" class=\"featured-video clearfix\">";

    htmlString += "<div class=\"video_thumb\">";
    htmlString += "<img src=\""+ video.snippet.thumbnails.default.url +"\" class=\"img-responsive\">";
    htmlString += "<time datetime=\""+ video.snippet.publishedAt +"\" class=\"duration\">"+ moment(video.snippet.publishedAt).fromNow() +"</time>";
    htmlString += "</div>";

    htmlString +=  "<div class=\"details_block\">";
    htmlString += "<strong class=\"title\"><a href=\"#\">" + video.snippet.title + "</a></strong>";
    htmlString += "</div>";

    htmlString += "</div>";

// <div onclick="" class="featured-video clearfix">
//         <div class="video_thumb">
//         <img src="http://lorempixel.com/168/105/" class="img-responsive">
//         <img src="http://lorempixel.com/16/10/" class="thumb-ratio" alt="">
//         <time datetime="2016-15-03" class="duration">
//         01:52</time>
//     </div> <!--VIDEO_THUMB END-->
//     <div class="details_block">
//         <strong class="title"><a href="#">ANT MAN 2 Trailer Teaser + Car Crash...</a></strong>
//     <span class="author">by&nbsp;<a href="/">admin</a></span>
//     <div class="views-date">
//         <span>52&nbsp;Views</span>
//     <time datetime="2016-15-03" class="date">1 day ago</time>
//     </div>
//     </div>
//     </div>
    return htmlString;
}