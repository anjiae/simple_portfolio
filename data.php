<?
//recipient Email Address
$recipient = "jiae1025@gmail.com";

$name = $_POST['name'];
$comments = $_POST['comments'];
$mail = $_POST['email'];
$mail_from = '=?UTF-8?B?' . base64_encode($_POST['email']) . '?=';


//Show on your email when you get
$mail_body = "<table width='600' border='0' cellpadding='0' cellspacing='1' bgcolor='#CCCCCC'><tr>
          <td width='100' height='70' align='center' bgcolor='#eeeeee'>name</td>
          <td width='400' bgcolor='#FFFFFF'>" . $name . "</td></tr>" .
  " <tr> 
          <td width='100' height='50' align='center' bgcolor='#eeeeee'>e-mail</td>
          <td width='400' bgcolor='#FFFFFF'>" . $mail . "</td></tr>" .
  " <tr> 
          <td width='100' height='500' align='center' bgcolor='#eeeeee'>Message</td>
          <td width='400' bgcolor='#FFFFFF'>" . $comments . "</td></tr></table>";
$reply = "You can contact $name via email, $mail";

$header = "From:$subject\n";
$header = "Content-Type: text/html;charset=UTF-8";
$header .= "From : $mail_from <" . $mail_from . ">\n";


$email = mail($recipient, $subject, $mail_body, $reply, $header);



if (!$email)
  echo "<script>
        window.alert('Failed to send your message.');
        history.go(-1);
        </script>";
else
  echo "<script>
        window.alert('Your message was sent successfully. Thanks.');
        history.go(-1);
        </script>";
