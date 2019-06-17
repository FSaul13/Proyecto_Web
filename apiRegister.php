<?php
    include "db.php";

    $json = json_decode(file_get_contents("php://input"));

    if($json->tipo == 1)
    {
        $check = "SELECT * FROM aspirante WHERE username = '$json->user'";
    } else{
        $check = "SELECT * FROM empresa WHERE username = '$json->user'";
    }

    $result = $conexion -> query($check);
    $count =  mysqli_num_rows($result);

    if ($count > 0){
        echo false;  
    } 
    else if($json->tipo == 1){
        $user = $json->user;
        $fname = $json->firstname;
        $lname = $json->lastname;
        $pw = $json->password;  
        $em = $json->email;
        $pro = $json->prof;
        $tel = $json->tel;
        $ed = $json->edad;


        // The password_hash() function convert the password in a hash before send it to the database
        //$pw = md5($pw);

        $query = "INSERT INTO `aspirante`(`username`, `nombre`, `apellidos`, `email` , `profesion`, `status`, `online`, `telefono` , `edad` , `password`, `c1`, `c2`, `c3`, `c4`, `c5`) VALUES ('$user', '$fname', '$lname','$em','$pro', '0', '0', '$tel', '$ed', '$pw', '0', '0', '0', '0', '0')";

        if (mysqli_query($conexion, $query)) {
            echo "Cuenta creada" . $count;		 
        } else {
                echo "Error: " . $query . mysqli_error($conexion);
            }		    
        //echo $json->user;
    }
    else{
        $nom = $json->nom;
        $rfc = $json->rfc;
        $em = $json->email;
        $tel = $json->tel;
        $giro = $json->giro;
        $user = $json->user;
        $pw = $json->password;

        $query = "INSERT INTO `empresa`(`nombre`,`rfc`,`email`,`telefono`,`giro`,`username`,`password`,`status`,`online`) VALUES ('$nom','$rfc','$em','$tel','$giro','$user','$pw','0','0')";
    
        if(mysqli_query($conexion, $query)) {
            echo "Cuenta creada" . $count;		 
        } else {
                echo "Error: " . $query . mysqli_error($conexion);
            }		    
        //echo $json->user;
    }

    
?>