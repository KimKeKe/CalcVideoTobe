var ModelSearch = (function () {
    var instance;
    // var kind = 'kind';
    // var etag = 'etag';
    // var nextPageToken= 'nextPageToken';
    // var regionCode = 'regionCode';
    // var pageInfo = 'pageInfo';

    function createInstance(response) {
        var obj = JSON.parse(response)
        return obj;
    }
    
    function prototype() {
        
    }
    
    return {
        getInstance: function (response) {
            if(!instance){
                instance = createInstance(response);
            }
            return instance;
        }
    }
    
})();