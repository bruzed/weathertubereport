<?php
	
	$dom = new DOMDocument("1.0");
	header('Content-Type: application/xml; charset-ISO-8859-1');
	
	$root = $dom->createElement("shareditem");
	$dom->appendChild($root);
	
	include "dbconfig.php";
	include "opendb.php";
	
	$query = $_POST['query'];
	//echo $query;
	
	//if the database connection was established generate the query based on the condition
	if ($dbname) {
		//echo "connection established \n";
		//echo $query . "\n";
		
		//select a condition
		$shared = "SELECT name, weathercondition, location, weatherimage, songname, video0, video1, video2, video3 FROM shared";
		$result = mysql_query($shared);
				
		while($rows = mysql_fetch_assoc($result)) {
			if($rows['name'] == $query) {
				//echo "\n condition: {$rows['weathercondition']}". " image: {$rows['weatherimage']}" . " songname: {$rows['songname']}" . " video0: {$rows['video0']}" . " video1: {$rows['video1']}" . " video2: {$rows['video2']}" . " video3: {$rows['video3']}";
				$item = $dom->createElement("weathercondition");
				$root->appendChild($item);
				$weathercondition = $dom->createTextNode( $rows['weathercondition'] );
				$item->appendChild($weathercondition);
				
				$item0 = $dom->createElement("location");
				$root->appendChild($item0);
				$theLocation = $dom->createTextNode( $rows['location'] );
				$item0->appendChild($theLocation);
				
				$item1 = $dom->createElement("weatherimage");
				$root->appendChild($item1);
				$weatherimage = $dom->createTextNode( $rows['weatherimage'] );
				$item1->appendChild($weatherimage);
				
				$item2 = $dom->createElement("songname");
				$root->appendChild($item2);
				$songname = $dom->createTextNode( $rows['songname'] );
				$item2->appendChild($songname);
				
				$videos = $dom->createElement("videos");
				$root->appendChild($videos);
				
				$item3 = $dom->createElement("video");
				$videos->appendChild($item3);
				$video0 = $dom->createTextNode( $rows['video0'] );
				$item3->appendChild($video0);
				
				$item4 = $dom->createElement("video");
				$videos->appendChild($item4);
				$video1 = $dom->createTextNode( $rows['video1'] );
				$item4->appendChild($video1);
				
				$item5 = $dom->createElement("video");
				$videos->appendChild($item5);
				$video2 = $dom->createTextNode( $rows['video2'] );
				$item5->appendChild($video2);
				
				$item6 = $dom->createElement("video");
				$videos->appendChild($item6);
				$video3 = $dom->createTextNode( $rows['video3'] );
				$item6->appendChild($video3);
			}
		}
		
	}
	
	echo $dom->saveXML();
	
	include "closedb.php";
	
?>