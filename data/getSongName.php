<?php
	
	include "dbconfig.php";
	include "opendb.php";
	
	//echo "hello";
	
	//if the database connection was established generate the query based on the condition
	if ($dbname) {
		//echo "connection established \n";
		
		//select a condition
		$query = "SELECT word FROM songwords";
		$result = mysql_query($query);
		
		while($rows = mysql_fetch_assoc($result)) {
			//echo $rows['word'];
			$words[] = $rows['word'];
		}
		
		mysql_free_result( $result );
		
		foreach ($words as $word) {
			//echo $word . ", ";
			$str .= $word . "<|>";
		}
		
		echo $str;
		
	}
	
	include "closedb.php";
	
?>