
function loadData() {

    /*
    The $ that shows up in variable names, like $body for example, is just a character like any other. In this case, it refers to the fact that the variable referenced by $body is a jQuery collection, not a DOM node.
    */
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // collect form <input> values with jQuery val() method
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var addressStr = streetStr + ', ' + cityStr;

    // update greeting message

    $greeting.text('So, you want to live at ' + addressStr + '?');

    // use jQuery's append() method to add an <img> to the page
    // Notice how the new <img> HTML element is just a string passed into .append()
    // load streetview
    var streetviewURL = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + addressStr + '';
    $body.append('<img class="bgimg" src="' + streetviewURL + '">');

    // NYTimes AJAX request
    // load nytimes

    // filter results on type_of_material, newest first, this year, first page (0-9 articles )
    // Please replace all the "x"s with your own NYT API key
    var myNYTAPI = 'xxxxxxxx'
    var nytURL= 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr +
        '&fq=type_of_material:("News")&begin_date=20160101&sort=newest&page0&api-key=' + myNYTAPI;

    $.getJSON(nytURL, function(data){
        // console.log(data);
        // console.log(data.response.docs);
        $nytHeaderElem.text('New York Times articles about ' + cityStr);
        var returnedArticles = data.response.docs;
        // console.log(returnedArticles);
        var items = [];
        // $.each(returnedArticles, function(key, val){
        //     items.push("<li id='" + key + "'>" + val + "</li>");
        // });

        for (var i = 0, articlesLen = returnedArticles.length; i < articlesLen; i++) {
            items.push("<li class='article'><a href=" + returnedArticles[i].web_url + "'>" + returnedArticles[i].headline.main + "</a>" +
                "<p>" + returnedArticles[i].snippet + "</p></li>");
            $nytElem.append(items[i]);
        };

    // .error() is chained to ajax request and handles errors if it fails - eg if the NYTimes link is broken.
    // .error() is now deprecated and .fail() is recommended
    // }).error(function(error){
    //     $nytHeaderElem.text('New York Times Articles Could Not be Loaded');

    }).fail(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not be Loaded');
    });

    // load wikipedia data

    var wpURL = 'https://en.wikipedia.org/w/api.php';
    var wpBaseURL = 'https://en.wikipedia.org/wiki/';
    $.ajax(wpURL, {
        data: {
            action: 'query',
            list: 'search',
            srsearch: cityStr,
            format: 'json'
        },
        dataType: 'jsonp',
        success: function(data){
            // do something with data
            //console.log('wiki title', data.query.search[0].title);
            var wikiArticles = data.query.search;
            //console.log('wiki title', wikiArticles[0].title);
            var items = [];
            for (var i = 0, wikiLen = wikiArticles.length; i < wikiLen; i++) {
                //console.log('wiki link: ' + wpBaseURL + wikiArticles[i].title);
                items.push('<li><a href ="' + wpBaseURL + wikiArticles[i].title + '">' + wikiArticles[i].title +'</a></li>');
                $wikiElem.append(items[i]);
            };
        }
    });



    return false;
    // explanations for return false:
    // When you do a FORM submit action the default behaviour is for the page to reload.
    // We can stop that default from happening by calling preventDefault() on the event object
    // or by returning false from some submit handler function.

    // When we click a form's submit button, its default behaviour is to send a request to the server.
    // However, we have hijacked this default using jQuery:
    // $('#form-container').submit(loadData);
    // The submit event is now handled by the loadData function, which returns false to prevent the default behaviour,
    // and also prevents the event from 'bubbling up'
};

$('#form-container').submit(loadData);
