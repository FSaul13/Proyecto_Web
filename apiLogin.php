<?php
    include "db.php";

    $json = json_decode(file_get_contents("php://input"));

	$check = "SELECT * FROM usuarios WHERE username = '$json->user'";
    $result = $conexion -> query($check);
    $count =  mysqli_num_rows($result);

    if ($count == 0)
    {
		echo json_encode(array('msg'=> "NE", 'user'=> "nada"));
	}else{
		$values = $result->fetch_array();
		if ($values['password'] == $json->password)
		{
			echo json_encode(array('msg'=> "IC", 'user'=> $json->user));
		} else{
		    echo json_encode(array('msg'=> "CIN", 'user'=> "nada"));
		}

	}
	


    

    /*$checkUN = "SELECT * FROM usuarios WHERE username = '$scope' ";

	$result = $conexion-> query($checkUN);

	$count = mysqli_num_rows($result);
	
	if ($count == 1) {
	echo "<br />". "Ya exite este usuario." . "<br />";

	echo "<a href='login.php'>Colocar aqui tu contrasena</a>.";
	} else {	
		
	$name = $_POST['name'];
	$email = $_POST['email'];
	$pass = $_POST['password'];
	$num= $_POST['numerotel'];
	$direccion= $_POST['direccion'];
	
	$id_pregunta = $_POST['num_pregunta'];
	$respuesta = $_POST['resp'];
	
	// The password_hash() function convert the password in a hash before send it to the database
	//$passmd5 = md5($pass);
	
	// Query to send Name, Email and Password hash to the database
	
	$query = "INSERT INTO `clientes`(`name`, `email`, `password`, `phone`, `address`, `created`, `modified`) VALUES ('$name', '$email', '$passmd5','$num','$direccion','".date("Y-m-d H:i:s")."', '".date("Y-m-d H:i:s")."')";

	if (mysqli_query($conexion, $query)) {
		echo "<div class='alert alert-success' role='alert'><h3>Tu cuenta ya se creo.</h3>
		<a class='btn btn-outline-primary' href='login.php' role='button'>Login</a></div>";		
		} else {
			echo "Error: " . $query . "<br>" . mysqli_error($conexion);
		}	
	}	
	$consulta1 = $conexion->query("SELECT * FROM `clientes` WHERE `email` = '$email'");
	$res = $consulta1->fetch_array();
	$id_user = $res['id'];
	$conrespta = $conexion->query("INSERT INTO `respuestas`(`id_pregunta_fk`, `id_user_fk`, `respuesta`) VALUES ('$id_pregunta','$id_user','$respuesta')");
	mysqli_close($conexion);*/
?>