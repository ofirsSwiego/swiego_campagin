<?php
header('Content-Type: text/html; charset=utf-8');
date_default_timezone_set("Asia/Jerusalem");
$ERROR_NUMBER = '';
// Check connection
require_once('Connected.php');
$link = ConnectToDb::connect();
//$json['result'] = $link;
//echo json_encode($json);
//die;
mysqli_set_charset( $link, 'utf8');


$json = [];


if($_POST['action'] == 'sendData') {
    $data = json_decode($_POST['data']);
    if (!$data->email)
        return ['error' => 'not email'];

    $date = new \DateTime();
    $sql = "INSERT INTO lead_users (name,email,phone,type) VALUES
               ('".$data->name."',
                '".$data->email."',
                '".$data->phone."',
                '".$data->site."'
                 )";
    if (mysqli_query($link, $sql)) {
        $txt = '';
        $txt .= '<div>';
        $txt .= "Name: " . $data->name . "<br>";
        $txt .= "Email:" . $data->email . "<br>";
        $txt .= "Phone:  " . $data->phone . "<br>";
        $txt .= "Date:  '" .date_format($date, 'd-m-Y H:i:s') . "<br>";
        $txt .= "</div>";
        //$to = "ofirs1988@gmail.com";
        $subject = "Swiego SITE new lead";
        $headers = "From: office@swiego.com";
//        $headers = "From: office@swiego.com" . "\r\n" .
//            "CC: office@swiego.com";
        require 'PHPMailer/PHPMailerAutoload.php';
        $mail = new PHPMailer;

        try {
            //$mail->SMTPDebug = 2;                              // Enable verbose debug output

            $mail->isSMTP();                                    // Set mailer to use SMTP
            $mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers
            $mail->Port = 587;                                    // TCP port to connect to
            $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
            $mail->SMTPAuth = true;                               // Enable SMTP authentication
            $mail->Username = 'office@swiego.com';                 // SMTP username
            $mail->Password = 'swiego55555';                           // SMTP password
            $mail->Charset = 'UTF-8';
            $mail->AddAddress('office@swiego.com', 'Swiego One');
            $mail->AddAddress('ofir@swiego.com', 'Ofir shurdeker');
            $mail->AddAddress('evgeni@swiego.com', 'evgeni fomenko');
            $mail->AddAddress('gal@swiego.com', 'Gal zabari');
            $mail->setFrom('office@swiego.com', 'Swiego');
            $mail->addAddress($to);     // Add a recipient

            $mail->isHTML(true);                                  // Set email format to HTML

            $mail->Subject = '=?utf-8?B?' . base64_encode($subject) . '?=';
            $mail->Body = $txt;
            $mail->AltBody = $txt;
            $last_id = $link->insert_id;
            if (!$mail->send()) {
                echo 'Message could not be sent.';
                echo 'Mailer Error: ' . $mail->ErrorInfo;
            } else {
                //echo json_encode($json);
                //echo 'Message has been sent';
            }
            $errors[] = "Send mail sucsessfully";
        } catch (phpmailerException $e) {
            $errors[] = $e->errorMessage(); //Pretty error messages from PHPMailer
        } catch (Exception $e) {
            $errors[] = $e->getMessage(); //Boring error messages from anything else!
        }

        $data->status = 103;
        $json['result'] = $data;
        echo json_encode($json);

    }else{
        $data->status = 101;
        $json['result'] = 'error server';
        echo json_encode($json);
    }
}

