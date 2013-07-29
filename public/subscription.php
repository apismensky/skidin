<?php
$subscriber = $_REQUEST['subscriber'];

//this is where the creating of the csv takes place
$cvsData = $subscriber . "\n";

// $fp is now the file pointer to file $filename
$fp = fopen("subscribers.csv","a"); 

if($fp){
fwrite($fp,$cvsData); 
}

// Close the file
fclose($fp); 

// success message
echo "Thank you. Your email added to the subscribers's list.";