var _zipcode;
var woeid;
var condition;
var theInstrument = new Array();
var loaded = 0;
var temp;
var image;
var gibberish;
var videoURLs = new Array();
var theLocation;
var hasError = false;


var weatherCondition = new Array("tornado", "tropical storm", "hurricane" , "severe thunderstorms", "thunderstorms", "mixed rain and snow", "mixed rain and sleet", "mixed snow and sleet", "freezing drizzle", "drizzle", "freezing rain", "showers", "showers", "snow flurries", "light snow showers", "blowing snow", "snow", "hail", "sleet", "dust", "foggy", "haze", "smoky", "blustery", "windy", "cold", "cloudy", "mostly cloudy (night)", "mostly cloudy (day)", "partly cloudy (night)", "partly cloudy (day)", "clear (night)", "sunny", "fair (night)", "fair (day)", "mixed rain and hail", "hot", "isolated thunderstorms", "scattered thunderstorms", "scattered thunderstorms", "scattered showers", "heavy snow", "scattered snow showers", "heavy snow", "partly cloudy", "thundershowers", "snow showers", "isolated thundershowers", "not available");

$(document).ready(function(){
	$.ajaxSetup ({
    	// Disable caching of AJAX responses */
    	cache: false
	});
	
	Shadowbox.init();
	init();
	//getLocation();
	//jump straight to weather condition for testing purposes
	//getWeather();
	
	$("#form").submit(function() {
		
		//error checking
		$(".error").hide();
		_zipcode = $("#zipcode").val();
		if(_zipcode == "") {
			$("#form").after('<span class="error">Please enter a valid zip code</span>');
			hasError = true;
			$(".error").fadeOut(1000, function(){
				$(".error").remove();
			});
		}
		
		if(!hasError) {
			//alert("zipcode" + _zipcode);
			//get woeid
			$.ajax({
				url: "data/getWoeid.php",
				type: "POST",
				data: ({zipcode: _zipcode}),
				success:function(xml) {
					woeid = xml;
					//var p = "<p>the stuff: " + woeid + "</p>";
					//$("#ticker").append(p);
					$("#enterzip").fadeOut("slow", function() {
						$("#preloader").fadeIn("fast");
					});
					getWeather();
				}
			});
		
		}
		
		//alert("fuck you" + woeid);
		return false;
		
    });
	
});

function init() {
	$("#enterzip").hide();
	$("#enterzip").fadeIn("slow");
	$('#ticker').hide();
	$('#videos').hide();
	$('#buttonbar').hide();
	$('#preloader').hide();
	$("#forecast").hide();
}

//get weather
function getWeather() {
	
	$.post("data/getWeather.php", {query:woeid}, function(xml) {
		var theCondition = $(xml).find("[nodeName=yweather:condition]").attr("text");
		condition = theCondition.toLowerCase();
		
		temp = $(xml).find("[nodeName=yweather:condition]").attr("temp");
		var imageCode = $(xml).find("[nodeName=yweather:condition]").attr("code");
		image = "http://l.yimg.com/a/i/us/nws/weather/gr/" + imageCode + "d.png";
		$("#weatherinfo").css("background-image","url("+ image +")");
		$("#weatherinfo").css("background-repeat","no-repeat");
		$("#weatherinfo").css("height","150px");
		
		theLocation = $(xml).find("item").find("title").text();
		$("#buttonbar li.thelocation").append(theLocation);
		//alert(theLocation);
		
		//tornado
		//condition = weatherCondition[3];
		//rain
		//condition = weatherCondition[6];
		//snow
		//condition = weatherCondition[14];
		//hail
		//condition = "hail";
		//foggy
		//condition = "foggy";
		//windy
		//condition = "windy";
		//cloudy <--issues
		//condition = "cloudy";
		//clear
		//condition = "clear";
		//hot
		//condition = "hot";
		
		getSongName();
		
		if(condition) {
			
			//normalize the weather condition
			if (condition == "tornado" || condition == "tropical storm" || condition == "hurricane" || condition == "severe thunderstorms" || condition == "thunderstorms" || condition == "isolated thunderstorms" || condition == "scattered thunderstorms") {
				condition = "tornado";
			}
			
			if (condition == "mixed rain and snow" || condition == "mixed rain and sleet" || condition == "mixed snow and sleet" || condition == "freezing drizzle" || condition == "drizzle" || condition == "freezing rain" || condition == "showers" || condition == "mixed rain and hail" || condition == "scattered showers" || condition == "thundershowers" || condition == "isolated thundershowers" || condition == "light rain" || condition == "light drizzle") {
				condition = "rain";
			}
			
			if (condition == "snow flurries" || condition == "light snow showers" || condition == "blowing snow" || condition == "snow" || condition == "heavy snow" || condition == "scattered snow showers" || condition == "snow showers" || condition == "light snow" || condition == "snow/fog") {
				condition = "snow";
			}
			
			if (condition == "hail" || condition == "sleet") {
				condition = "hail";
			}
			
			if (condition == "dust" || condition == "foggy" || condition == "haze" || condition == "smoky") {
				condition = "foggy";
			}
			
			if (condition == "blustery" || condition == "windy" || condition == "cold") {
				condition = "windy";
			}
			
			if (condition == "cloudy" || condition == "mostly cloudy (night)" || condition == "mostly cloudy (day)" || condition == "partly cloudy (night)" || condition == "partly cloudy (day)" || condition == "partly cloudy" || condition == "mostly cloudy") {
				condition = "cloudy";
			}
			
			if (condition == "clear (night)" || condition == "sunny" || condition == "fair (night)" || condition == "fair (day)" || condition == "fair") {
				condition = "clear";
			}
			
			if (condition == "hot" || condition == "not available") {
				condition = "hot";
			}
			//$("#container .loaded").html("Weather Condition Loaded");
			//alert(condition);
			getVideos();
		} else {
			alert("Error Loading Weather Condition");
		}
		
	});
	
}

//get video list
function getVideos() {
	
	//get the list of instruments
	$.post("data/getInstruments.php", function(xml) {
		$(xml).find("instrument").each(function() {
			//theInstrument = $(this).text();
			var sendInstrument = $(this).text();
			//load up the videos for each instrument
			$.post("data/getVideos.php", {weatherCondition: condition, instrument: sendInstrument}, function(xml) {
				//pick a random url for the list of returned videos
				var contentURL = [];
				
				$("entry",xml).each(function(i) {
					contentURL[i] = $(this).find("[nodeName=media:content]").attr("url");
				});
				
				var numNodes = contentURL.length;
				var randomNode = Math.floor( Math.random() * (numNodes - 1) );
				playVideo(contentURL[randomNode], sendInstrument);
				
				
				/*for(i = 0; i < contentURL.length; i++) {
					var a = $("<p> video " + i + ": " + contentURL[i] + "</p>");
					$("#container").append(a);
				}
				
				//pick random ones
				var a = $("<p>Random number = " + randomNode + " Random select: " + contentURL[randomNode] + "</p>");
				$("#container").append(a);
				
				var hr = $("<hr>");
				$("#container").append(hr);
				*/
			});
					
		});
		
	});
	
}

//play video
function playVideo(url, sendInstrument) {
	
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
				$("#guitar").fadeIn("slow");
				$("#wind").fadeIn("slow");
				$("#keyboard").fadeIn("slow");
				$("#bass").fadeIn("slow");
				$("#forecast").fadeIn("slow");
				
				$("body").removeClass(function() {
          			return $(this).prev().attr('class');
        		}).addClass(condition);
				
				setShare();
 								
			});
		}
				
	});
	
}

//song name
function getSongName() {
		
	$.post("data/getSongName.php", function(response){
		var words = response;
		var word = words.split("<|>");
		var randomWordsLength = Math.floor( Math.random() * 4 );
		if (randomWordsLength < 2) randomWordsLength = 3;
		//alert("randomWordsLength = " + randomWordsLength);
		var songNameArray = [];
		songNameArray.push(condition);
		for(i = 0; i < randomWordsLength; i++) {
			var randomWord = Math.floor( Math.random() * (word.length - 1) );
			songNameArray.push(word[randomWord]);
			//alert("word.length = " + word.length + " randomWord = " + randomWord + " songNameArray = " + songNameArray[i]);
		}
		for(j = 0; j < songNameArray.length; j++) {
			if(j==0) {
				p = "<strong>" + songNameArray[j] + "</strong> ";
			} else {
				p = songNameArray[j] + " ";
			}
			$("#ticker").append(p);
		}
		//var p = "<p> these are the words: " + word[0] + "</p>";
		//$("#names").append(p);
		
	});
	
	var theTemp = temp + "&deg;F, ";
	$("#ticker").append(theTemp);
	
	//$("#ticker span").html(condition);
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

/*set weathercondition*/
/*function setCondition(theCondition) {
	condition = theCondition;
	
	$("#enterzip").fadeOut("slow", function() {
		$("#preloader").fadeIn("fast");
	});
	
	getSongName();
	getVideos();
}*/

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
	
	$.ajax({
		url: "data/doShare.php",
		type: "POST",
		data: ({weatherCondition: condition, _location: theLocation, weatherImage: image, songname: gibberish, video0: videoURLs[0], video1: videoURLs[1], video2: videoURLs[2], video3: videoURLs[3]}),
		success:function(q) {
			//alert("done" + q);
			$("#buttonbar li.sharefb a").attr("href", "http://www.facebook.com/sharer.php?u=http://www.bruzed.com/weathertubereport?q=" + q + "&t=Weather Tube Report displays the weather condition and a selection of videos from YouTube, based on the zip code you enter.");
			$("#buttonbar li.sharetwitter a").attr("href", "http://twitter.com/home?status=Check out my %23weathertubereport http://www.bruzed.com/weathertubereport?q=" + q);
		}
	});
}

function doShare() {
	
}