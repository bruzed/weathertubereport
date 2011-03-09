<?php
	
	$weatherCondition = ($_GET['weatherCondition']) ? $_GET['weatherCondition'] : $_POST['weatherCondition'];
	$location = ($_GET['_location']) ? $_GET['_location'] : $_POST['_location'];
	$weatherImage = ($_GET['weatherImage']) ? $_GET['weatherImage'] : $_POST['weatherImage'];
	$songname = ($_GET['songname']) ? $_GET['songname'] : $_POST['songname'];
	$video0 = ($_GET['video0']) ? $_GET['video0'] : $_POST['video0'];
	$video1 = ($_GET['video1']) ? $_GET['video1'] : $_POST['video1'];
	$video2 = ($_GET['video2']) ? $_GET['video2'] : $_POST['video2'];
	$video3 = ($_GET['video3']) ? $_GET['video3'] : $_POST['video3'];
	
	include "dbconfig.php";
	include "opendb.php";
	
	$name = generate_id(32);
	
	$query = "INSERT INTO shared (id, name, weathercondition, location, weatherimage, songname, video0, video1, video2, video3) VALUES ('NULL', '".$name."', '".$weatherCondition."', '".$location."', '".$weatherImage."', '".$songname."', '".$video0."', '".$video1."', '".$video2."', '".$video3."') ";
	mysql_query($query) or die ('Error updating database');
	
	include "closedb.php";
	
	/*echo "weather condition = " . $weatherCondition;
	echo "\n weather image = " . $weatherImage;
	echo "\n song name = " . $songname;
	echo "\n video 0 = " . $video0;
	echo "\n video 1 = " . $video1;
	echo "\n video 2 = " . $video2;
	echo "\n video 3 = " . $video3;*/
	echo $name;
	
	function generate_id($length = 6){
		$range = 'weatherreporttubeisprettyamazing';
		$max = strlen($range) - 1;
		// Generates random id of length $length.
		$id = '';
		for ($count = 0; $count < $length; $count++){
			$id .= $range[rand(0, $max)];
		}
			return $id;
	}
	
?>