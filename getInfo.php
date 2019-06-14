<?php
    include "db.php";

    $json = json_decode(file_get_contents("php://input"));
    
    if ($json->type == 1)//Aspirante
    {
        $check = "SELECT * FROM aspirantes WHERE username = '$json->user'";
        $result = $conexion -> query($check);
        $count =  mysqli_num_rows($result);
        $values = $result->fetch_array();
        echo json_encode(array('fname'=> $values['first_name'] ,'lname'=> $values['last_name'] ,'pro'=> $values['profesion'] ,'email'=> $values['email'] ,'pass'=> $values['password']));
    }else{
        echo "Aun nada gg";
    }

?>