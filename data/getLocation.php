<?php
	
	//IPInfoDB API: http://ipinfodb.com/index.php
	
	$d = file_get_contents("http://www.ipinfodb.com/ip_query.php?ip=&output=xml&timezone=false");
	
	//Use backup server if cannot make a connection
	if (!$d){
		$backup = file_get_contents("http://backup.ipinfodb.com/ip_query.php?ip=$ip&output=xml");
		$answer = $backup;
		if (!$backup) return false; // Failed to open connection
	}else{
		$answer = $d;
	}

	print $d;
	
?>