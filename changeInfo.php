<?php
    include "db.php";

    $json = json_decode(file_get_contents("php://input"));
    
    if ($json->type == 1)//Aspirante
    {
        $check = "UPDATE aspirantes SET first_name='$json->fname', last_name='$json->lname', email='$json->email', profesion='$json->pro', password='$json->pass' WHERE username='$json->user'";
        $result = $conexion -> query($check);
    	if($result)
    	{
    		echo "data updated";
    	}
    }else{
        echo "Aun nada gg";
    }

?>