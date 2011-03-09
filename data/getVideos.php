<?php
	
	include "dbconfig.php";
	include "opendb.php";
	
	$weatherCondition = $_POST['weatherCondition'];
	$instrument = $_POST['instrument'];
	
	//if the database connection was established generate the query based on the condition
	if ($dbname) {
		//echo "connection established \n";
		//echo $query . "\n";
		
		//select a condition
		$condition = "SELECT condition_name, guitar, percussion, bass, wind, keyboard, style FROM conditions";
		$conditionResult = mysql_query($condition);
		
		while($rows = mysql_fetch_assoc($conditionResult)) {
			if($rows['condition_name'] == $weatherCondition) {
				//echo "\n condition: {$rows['condition_name']}". " guitar: {$rows['guitar']}" . " percussion: {$rows['percussion']}" . " bass: {$rows['bass']}" . " wind: {$rows['wind']}" . " keyboard: {$rows['keyboard']}" . " style: {$rows['style']}";
				$theInstrument = $rows[$instrument];
				$style = $rows['style'];
				$searchFor = $theInstrument . "/" . $style;
				//echo "\n search for: $searchFor \n";
			}
		}
		
		//if the search query is not null
		if ($searchFor) {
			$startIndex = 1;
			
			$refineSearch = "/-band/-quartet/-trio/-quintet/-show/-compact/-disc/-cd/-mp3/-demo/-manufacturer";
			
			$curl = curl_init();
			//curl_setopt($curl, CURLOPT_URL, "http://gdata.youtube.com/feeds/api/videos?q=" . urlencode($searchFor) . "&start-index=" . $startIndex . "&max-results=50&v=2&format=5");
			
			curl_setopt($curl, CURLOPT_URL, "http://gdata.youtube.com/feeds/api/videos/-/" . $searchFor . $refineSearch . "?v=2&format=5");
			
			//echo "http://gdata.youtube.com/feeds/api/videos/-/" . $searchFor . "?v=2";
			
			//search by category
			//curl_setopt($curl, CURLOPT_URL, "http://gdata.youtube.com/feeds/api/videos?q=" . urlencode($searchFor) . "&start-index=" . $startIndex . "&max-results=20&v=2&format=5&category=music");
			
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
			
			$queryResult = curl_exec($curl);
			curl_close($curl);
			
			header('Content-Type: application/xml; charset-ISO-8859-1');
			
			print $queryResult;
		}
		
	}
	
	include "closedb.php";
	
?>