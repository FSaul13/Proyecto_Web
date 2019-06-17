<?php
    include "db.php";

    $type = $_GET['type'];
    $user = $_GET['u'];

    if ($type == 1)
    {
        $update = "UPDATE aspirante SET status = '1' WHERE username = '$user'";
    }
    else
    {
        $update = "UPDATE empresa SET status = '1' WHERE username = '$user'";
    }

    $result = $conexion-> query($update);
    if ($result == true)
	{
		echo "<h1> Correo confirmado. Regrese a la pagina para iniciar sesión </h1>";
	} else{
		echo "<h1> NO SE PUDO </h1>";
	}
?>