<?php
if((isset($_POST['Email'])&&$_POST['Email']!="")&&(isset($_POST['tel1'])&&$_POST['tel1']!="")){
$to = 'sabnack777@gmail.com,legeret@mail.amocrm.ru,legeret+lead@mail.amocrm.ru,legeret+contact@mail.amocrm.ru';
$subject = 'Заявка Иванов Р.М.';
$message = '
<html>
<head>
    <title>'.$subject.'</title>
</head>
<body>
<p>Почта: '.$_POST['Email'].'</p>
<p>Телефон: '.$_POST['tel1'].'</p>
</body>
</html>';
$headers  = "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: Отправитель <sabnack777@gmail.com>\r\n";
mail($to, $subject, $message, $headers);
};
echo '<h1>Письмо отправлено!</h1>';
?>
<!--Переадресация на главную страницу сайта, через 3 секунды-->
<script language="JavaScript" type="text/javascript">
    function changeurl(){eval(self.location="https://testamo777.000webhostapp.com/");}
    window.setTimeout("changeurl();",3000);
</script>
