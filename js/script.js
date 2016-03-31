
function loadData() {

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
    var myNYTAPI = 'xxxx'
    var nytURL= 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr +
        '&fq=type_of_material:("News")&begin_date=20160101&sort=newest&page0&api-key=' + myNYTAPI;

    $.getJSON(nytURL, function(data){
        //console.log(data);
        //console.log(data.response.docs);
        $nytHeaderElem.text('New York Times articles about ' + cityStr);
        var returnedArticles = data.response.docs;
        console.log(returnedArticles);
        var items = [];
        // $.each(returnedArticles, function(key, val){
        //     items.push("<li id='" + key + "'>" + val + "</li>");
        // });

        for (var i = 0; i < returnedArticles.length; i++) {
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
