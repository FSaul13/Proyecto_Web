<?php
    include "db.php";

    $json = json_decode(file_get_contents("php://input"));

    echo $json->user;
?>