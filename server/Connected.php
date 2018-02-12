<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

class ConnectToDb
{
    public static function connect()
    {

        $link = mysqli_connect("localhost", "root", "dd429glk", "swiego");
        if ($link === false) {
            die("ERROR: Could not connect. " . mysqli_connect_error());
        }
        return $link;
    }
}