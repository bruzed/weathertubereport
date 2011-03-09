var _zipcode;
var woeid;
var condition;
var theInstrument = new Array();
var loaded = 0;
var temp;
var image;
var gibberish;
var videoURLs = new Array();
var q;

var weatherCondition = new Array("tornado", "tropical storm", "hurricane" , "severe thunderstorms", "thunderstorms", "mixed rain and snow", "mixed rain and sleet", "mixed snow and sleet", "freezing drizzle", "drizzle", "freezing rain", "showers", "showers", "snow flurries", "light snow showers", "blowing snow", "snow", "hail", "sleet", "dust", "foggy", "haze", "smoky", "blustery", "windy", "cold", "cloudy", "mostly cloudy (night)", "mostly cloudy (day)", "partly cloudy (night)", "partly cloudy (day)", "clear (night)", "sunny", "fair (night)", "fair (day)", "mixed rain and hail", "hot", "isolated thunderstorms", "scattered thunderstorms", "scattered thunderstorms", "scattered showers", "heavy snow", "scattered snow showers", "heavy snow", "partly cloudy", "thundershowers", "snow showers", "isolated thundershowers", "not available");

$(document).ready(function(){
	$.ajaxSetup ({
    	// Disable caching of AJAX responses */
    	cache: false
	});
						   
	Shadowbox.init();
	init();
});

function init() {
	$("#enterzip").hide();
	//$("#enterzip").fadeIn("slow");
	$('#ticker').hide();
	$('#videos').hide();
	$('#buttonbar').hide();
	//$('#preloader').hide();
	$("#forecast").hide();
}

function getInfo(_q) {
	q = _q;
	//alert("getinfo begins");
	
	$.ajax({
		url: "data/getShared.php",
		type: "POST",
		data: ({query: q}),
		cache: false,
		success:function(xml) {
			//alert("hello");
			//var p = "<p>the stuff: " + woeid + "</p>";
			//$("#ticker").append(p);
			getWeather(xml);
		}
	});
	
	//alert("get info ends");
	
}

//get weather
function getWeather(xml) {
	
	condition = $(xml).find("weathercondition").text();	
	image = $(xml).find("weatherimage").text();
	$("#weatherinfo").css("background-image","url("+ image +")");
	$("#weatherinfo").css("background-repeat","no-repeat");
	$("#weatherinfo").css("height","150px");
	theLocation = $(xml).find("location").text();
	$("#buttonbar li.thelocation").append(theLocation);
	getSongName(xml);
	getVideos(xml);	
	
}

//get video list
function getVideos(xml) {
	
	var contentURL = [];
	$("video", xml).each(function(i) {
		contentURL[i] = $(this).text();
		//alert(i);			
		//alert(contentURL[i]);
		playVideo(contentURL[i], "instrument");
	});

}

//play video
function playVideo(url, sendInstrument) {
	
	//alert("begin play video");
	
	$.post("data/playVideo.php", {query: url, instrument: sendInstrument}, function(responseText) {
		var object = $(responseText);
		videoURLs[loaded] = url;
		loaded++;
		$("#videos").append(object);
		$("#" + sendInstrument).hide();
		
		if (loaded == 4) {
			$("#preloader").fadeOut("slow", function() {
				$("#videos").show();
				$("#ticker").fadeIn("slow");
				$("#buttonbar").fadeIn("slow");
				$("#instrument").fadeIn("slow");
				$("#forecast").fadeIn("slow");
				
				$("body").removeClass(function() {
          			return $(this).prev().attr('class');
        		}).addClass(condition);
				
				setShare();
 								
			});

		}
				
	});
	
	//alert("end play video");
	
}

//song name
function getSongName(xml) {
	
	var theTemp = $(xml).find("songname").text();
	//alert(theTemp);
	$("#ticker").append(theTemp);

}

/*shadowbox about*/
function openAbout() {
    Shadowbox.open({
        player: "html",
        content: '<div style="padding:20px;"><h1>Welcome to Weather Tube Report</h1><p>Weather Tube Report displays the weather condition and a selection of videos from YouTube, based on the zip code you enter. The videos are selected on the fly based on predetermined search parameters. The weather condition dictates these parameters - which include musical styles and instruments - to search for suitable videos. The weather condition also determines the background color.</p><p>The name is inspired by the band Weather Report and some of their song names are used to produce the gibberish text to display the temperature and condition.</p><p>Weather Tube Report uses the Yahoo! Weather API to retrieve weather information, the YouTube API to retrieve videos and a database to store the search parameters.</p><p>Built with PHP, MySQL, HTML, CSS and jQuery.</p><p>Enjoy!</p></div>',
        height: 500,
        width: 500
    });
}

function validate(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    theEvent.preventDefault();
  }
}

function setShare() {
	
	var gibberish = $("#ticker").html();
	
	//$.ajax({
		//url: "data/doShare.php",
		//type: "POST",
		//data: ({weatherCondition: condition, weatherImage: image, songname: gibberish, video0: videoURLs[0], video1: videoURLs[1], video2: videoURLs[2], video3: videoURLs[3]}),
		//success:function(q) {
			//alert("done" + q);
			$("#buttonbar li.sharefb a").attr("href", "http://www.facebook.com/sharer.php?u=http://www.bruzed.com/weathertubereport?q=" + q + + "&t=Weather Tube Report displays the weather condition and a selection of videos from YouTube, based on the zip code you enter.");
			$("#buttonbar li.sharetwitter a").attr("href", "http://twitter.com/home?status=Check out my %23weathertubereport http://www.bruzed.com/weathertubereport?q=" + q);
		//}
	//});
	
}