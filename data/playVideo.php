<?php
	
	$query = $_POST['query'];
	$theInstrument = $_POST['instrument'];
	
	//echo $query;
	//echo $theInstrument;
	
	$width = "241";
	$height = "241";
	
	/*$result = "<div id=\"". $theInstrument ."\"><p>". $theInstrument ."</p><object width=\"" . $width . "\" height=\"" . $height . "\"><param name=\"movie\" value=\"" . $query . "version=3&rel=0&loop=1&disablekb=1&fs=1&hd=1&showinfo=0&iv_load_policy=3&feature=player_embedded\"></param><param name=\"allowFullScreen\" value=\"false\"></param><param name=\"allowscriptaccess\" value=\"always\"></param><embed src=\"" . $query . "version=3&rel=0&loop=1&disablekb=1&fs=1&hd=1&showinfo=0&iv_load_policy=3&feature=player_embedded\" type=\"application/x-shockwave-flash\" allowscriptaccess=\"always\" allowfullscreen=\"false\" width=\"" . $width . "\" height=\"" . $height . "\"></embed></object></div>";
	*/
	
	$result = "<div id=\"". $theInstrument ."\"><object width=\"" . $width . "\" height=\"" . $height . "\"><param name=\"movie\" value=\"" . $query . "version=3&rel=0&loop=1&disablekb=1&fs=1&hd=1&showinfo=0&iv_load_policy=3&feature=player_embedded&autoplay=1\"></param><param name=\"allowFullScreen\" value=\"false\"></param><param name=\"allowscriptaccess\" value=\"always\"></param><embed src=\"" . $query . "version=3&rel=0&loop=1&disablekb=1&fs=1&hd=1&showinfo=0&iv_load_policy=3&feature=player_embedded&autoplay=1\" type=\"application/x-shockwave-flash\" allowscriptaccess=\"always\" allowfullscreen=\"false\" width=\"" . $width . "\" height=\"" . $height . "\"></embed></object></div>";
	
	print $result;
	
?>