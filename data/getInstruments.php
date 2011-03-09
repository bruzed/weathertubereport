<?php

	$dom = new DOMDocument("1.0");
	header('Content-Type: application/xml; charset-ISO-8859-1');
	
	$root = $dom->createElement("instruments");
	$dom->appendChild($root);
	
	include "dbconfig.php";
	include "opendb.php";

	$instrument = "SELECT instrument_type FROM instruments";
	$result = mysql_query($instrument);
	
	while($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
		//echo "instrument type: {$row['instrument_type']} \n";
		$item = $dom->createElement("instrument");
		$root->appendChild($item);
		$instrument = $dom->createTextNode( $row['instrument_type'] );
		$item->appendChild($instrument);
	}
	
	echo $dom->saveXML();
	
	include "closedb.php";
		
?>