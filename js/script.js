
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!

    // collect <input> values with jQuery val() method
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var addressStr = streetStr + ', ' + cityStr;

    // update greeting message

    $greeting.text('This is where you chose: ' + addressStr);

    // use jQuery's append() method to add an <img> to the page
    // Notice how the new <img> HTML element is just a string passed into .append()
    var streetviewURL = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + addressStr + '';
    $body.append('<img class="bgimg" src="' + streetviewURL + '">');

    return false;
};

$('#form-container').submit(loadData);
