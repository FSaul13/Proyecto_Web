<?php
    include "db.php";

    $json = json_decode(file_get_contents("php://input"));

    $check = "SELECT * FROM usuarios WHERE username = '$json->user'";
    $result = $conexion -> query($check);
    $count =  mysqli_num_rows($result);

    if ($count == 1)
    {
        echo false;
    }

    $fname = $check->firstname;
    $lname = $check->lastname;
    $user = $check->user;
    $pw = $check->password;

    // The password_hash() function convert the password in a hash before send it to the database
	//$pw = md5($pw);

    $query = "INSERT INTO `usuarios`(`username`, `first_name`, `last_name`, `pw`) VALUES ('$user', '$fname', '$lname','$pw')";

    if (mysqli_query($conexion, $query)) {
		echo true;		
	} else {
		echo false;
	}	
    //echo $json->user;
?>