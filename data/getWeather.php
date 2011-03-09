<?php
	
	$query = $_POST['query'];
	
	//comment out for testing purposes
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, "http://weather.yahooapis.com/forecastrss?w=" .urlencode($query));
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	
	$result = curl_exec($curl);
	curl_close($curl);
	
	header('Content-Type: application/xml; charset-ISO-8859-1');
	
	print $result;
	
	//print "there's nothing here right now";
	
?>