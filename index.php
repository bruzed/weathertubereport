<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="title" content="Weather Tube Report" />
    <meta name="description" content="Weather Tube Report displays the weather condition and a selection of videos from YouTube, based on the zip code you enter." />
    <link rel="image_src" href="images/weathertubereportfb.jpg" /> 
	<title>Weather Tube Report</title>
	<script src="js/jquery.min.js" type="text/javascript"></script>
    <?php
		if( isset($_GET['q']) ) {
			$q = ($_GET['q']) ? $_GET['q'] : $_POST['q'];
			//echo $q;
    		echo '<script src="js/secondary.js" type="text/javascript"></script>';
			echo '<script type="text/javascript">getInfo("'.$q.'");</script>';
		} else {
			echo '<script src="js/main.js" type="text/javascript"></script>';
		}
	?>
    <link rel="stylesheet" href="styles.css" type="text/css" />
    <script src="shadowbox/shadowbox.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="shadowbox/shadowbox.css" />
</head>

<body>

	<!--begin container-->
    <div id="container">
    	<!--begin header-->
        <div id="header">
        	<img src="images/weathertubereport.png" width="940" height="50" border="0" alt="Weather Tube Report" />
        </div><!--end header-->
        
        <!--display forecast-->
        <div id="forecast">
        	<!--begin weatherinfo-->
            <div id="weatherinfo">
            </div><!--end weatherinfo-->
        </div><!--end forecast-->
        
        <!--midbg-->
        <div id="midbg">
        
            <!--begin ticker-->
            <div id="ticker">
            </div><!--end ticker-->
        
            <!--begin enterzip-->
            <div id="enterzip">
                <p>Enter your ZIP Code</p>
                <form method="post" id="form">
                    <input id="zipcode" type="text" size="12" name="zipcode" class="textfield" onkeypress='validate(event)' />
                    <input id="submit" type="submit" value=">" name="submit" class="submitbutton" />
                </form>
            </div>
            <!--begin preloader-->
            <div id="preloader">
            </div><!--end preloader-->
            <!--begin videos-->
            <div id="videos">
            </div><!--end videos-->
        
            <!--begin buttonbar-->
            <div id="buttonbar">
            	<div id="buttonbarleft">
                	<ul>
                		<li class="thelocation"></li>
                    	<li class="anotherlocation"><a href="index.php">Another Location &raquo;</a></li>
                	</ul>
                </div>
                <div id="socialicons">
                	<ul>
                		<li class="sharefb"><a href="#" target="_blank"><img src="images/fb.png" width="32" height="32" alt="share on facebook" /></a></li>
                    	<li class="sharetwitter"><a href="#" target="_blank"><img src="images/twitter.png" width="32" height="32" align="share on twitter" /></a></li>
                    </ul>
                </div>
                <div class="clearfix"></div>
            </div><!--end buttonbar-->
        
        </div><!--end midbg-->
        
        <!--begin footer-->
        <div id="footer">
        	<!--begin footerl-->
            <div class="footerl">
                <a href="#" onclick="openAbout();">About</a>
            </div><!--end footerl-->
                
            <!--begin footerr-->
            <div class="footerr">
            	Created by <a href="http://www.bruzed.com">bruzed</a> | <a href="http://www.bruzed.com/weather-tube-report">Report Bugs</a>
            </div><!--end footerr-->
            <div class="clearfix"></div>
        </div><!--end footer-->
        
    </div><!--end container-->
    
    <script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
try {
var pageTracker = _gat._getTracker("UA-982091-6");
pageTracker._trackPageview();
} catch(err) {}</script>

</body>
</html>