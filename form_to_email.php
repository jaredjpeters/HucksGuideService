<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="refresh" content="8;url=index.html">
    <style>
        @import 'https://fonts.googleapis.com/css?family=Roboto+Condensed:700';
        h1,h2,p {
            color: white;
            font-family: 'Roboto Condensed', sans-serif;
            font-weight: 300;
            margin-left: 25%;
        }
        p {
            width: 30%;
        }
        img {
            width: 300px;
            height: auto;
            margin-left: 40%;
            margin-top: 10%;
        }
        #background_img {
            width:100vw;
            height: 100vh;
            background-color:black;
            background-size: cover;
        }
        body {
            margin: 0;
        }
    
    
    </style>
</head>
<body></body>
</html>
<?php
if(!isset($_POST['submit']))
{
	//This page should not be accessed directly. Need to submit the form.
	echo "error; you need to submit the form!";
}
$name = $_POST['fullname'];
$visitor_email = $_POST['email'];
$phone = $_POST['phone'];
$message1 = $_POST['message'];

if($SERVER["REQUEST_METHOD"] == "Post") {
    $name = test_input($_POST['fullname']);
    $visitor_email = test_input($_POST['email']);
    $phone = test_input($_POST['phone']);
    $message1 = test_input($_POST['message']);
}

//Validate first
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

if(IsInjected($visitor_email))
{
    echo "<h1>Bad email value!</h1>";
    exit;
}

$email_from = 'japeters@pdx.edu';//<== update the email address
$email_subject = "Guide Booking";
$message = '<html><body>';
$message .= '<img src="images/Hucks_Fishing_Logo.png" alt="Hucks Fishing Guide Logo" />';
$message .= '<table rules="all" cellpadding="10">';
$message .= "<tr style='background: #727272;'><td style='color: orange;'><strong>Name:</strong> </td><td style='color: orange;'>" . $name . "</td></tr>";
$message .= "<tr><td style='color: orange;'><strong>Email:</strong> </td><td><a style='color:#727272;'>" . $visitor_email . "</a></td></tr>";
$message .= "<tr><td style='color: orange;'><strong>Phone:</strong> </td><td>" . $phone . "</td></tr>";
$message .= "<tr><td style='color: orange;'><strong>Message:</strong> </td><td style='color: #727272;'>" . $message1 . "</td></tr>";

$message .= "</table>";
$message .= "</body></html>";
    
$to = "japeters@pdx.edu";//<== update the email address
$headers = "From: $email_from \r\n";
$headers .= "Reply-To: $visitor_email \r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
//Send the email!

mail($to,$email_subject,$message,$headers);
// print a thank you message
$thanks =
 "
<div id='background_img'> 
<img src='images/Huck_Fishing_Logo.png'/>
<br>
<h1>Thanks for contacting us! You will hear from us soon!</h1>
<h2>Your Input: (provided for your own verification)</h2>"
 . "<p> Your Name: " . $name . "</p>"
 . "<p> Your Email: " . $visitor_email . "</p>"
 . "<p> Your Phone Number " . $phone . "</p>"
 . "<p> Message: " . $message1 . "</p>" .
"</div>"; 


echo $thanks;


// Function to validate against any email injection attempts
function IsInjected($str)
{
  $injections = array('(\n+)',
              '(\r+)',
              '(\t+)',
              '(%0A+)',
              '(%0D+)',
              '(%08+)',
              '(%09+)'
              );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
    {
    return true;
  }
  else
    {
    return false;
  }
}
   
?> 
