<?php
    include "db.php";

    $fname = $_GET['fn'];
    $lname = $_GET['ln'];
    $user = $_GET['u'];

    $update = "UPDATE aspirantes SET status = '1' WHERE username = '$user'";
    $result = $conexion-> query($update);
    if ($result == true)
	{
		echo "<h1> SI SE PUDO </h1>";
	} else{
		echo "<h1> NO SE PUDO </h1>";
	}
?>