<?php
	
	//if ( isset($_POST['zipcode']) ) {
		
		//$query = $_POST['zipcode'];
		$query = ($_GET['zipcode']) ? $_GET['zipcode'] : $_POST['zipcode'];
		
		$appID = "R.UpGvXV34EoBtokWroQmUtupg9eF6iy_bZWJOQ4Ec18c1hKWetQQNCW2NYYOWt73w--";
		
		$curl = curl_init();
		curl_setopt ($curl, CURLOPT_URL, "http://where.yahooapis.com/v1/places.q('" . urlencode($query) . "')?appid=" .$appID);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		
		$result = curl_exec ($curl);
		curl_close ($curl);
		
		$xml = new SimpleXMLElement($result);
		
		echo $xml->place[0]->woeid;
		
		//header('Content-Type: application/xml; charset=ISO-8859-1');
		
		//print $result;
		
		//print "hey there";
	
	//}
	
?>