<?php
    include "db.php";

    $json = json_decode(file_get_contents("php://input"));

    $check = "SELECT * FROM aspirantes WHERE username = '$json->user'";
    $result = $conexion -> query($check);
    $count =  mysqli_num_rows($result);

    if ($count > 0)
    {
        echo false;
    } else {
        $user = $json->user;
        $fname = $json->firstname;
        $lname = $json->lastname;
        $pw = $json->password;  
        $em = $json->email;
        $pro = $json->prof;
        $

        // The password_hash() function convert the password in a hash before send it to the database
        //$pw = md5($pw);

        $query = "INSERT INTO `aspirantes`(`username`, `nombre`, `apellidos`, `email` , `profesion`, `status`, `online`, `telefono` , `edad` , `password`, `c1`, `c2`, `c3`, `c4`, `c5`) VALUES ('$user', '$fname', '$lname','$em','$pro','$pw', '0', '0')";

        if (mysqli_query($conexion, $query)) {
            echo "Cuenta creada" . $count;		 
        } else {
                echo "Error: " . $query . mysqli_error($conexion);
            }		    
        //echo $json->user;
    }

    
?>