<?php
    include "db.php";

    $json = json_decode(file_get_contents("php://input"));

	if($json->tipo == 1)
	{
		$check = "SELECT * FROM aspirante WHERE username = '$json->user'";
	}
	else{
		$check = "SELECT * FROM empresa WHERE username = '$json->user'";
	}

    $result = $conexion -> query($check);
    $count =  mysqli_num_rows($result);

    if ($count == 0)
    {
		echo json_encode(array('msg'=> "NE", 'user'=> "nada"));
	}else{
		$values = $result->fetch_array();
		if ($values['password'] == $json->password && $values['status'] == 1)
		{
			echo json_encode(array('msg'=> "IC", 'user'=> $values['username'], 'id'=> $values['id']));
		} else if($values['status'] == 1){
		    echo json_encode(array('msg'=> "CIN", 'user'=> "nada"));
		} else{
			echo json_encode(array('msg'=> "NV", 'user'=> "nada"));
		}
	}
?>