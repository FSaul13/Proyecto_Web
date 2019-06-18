<?php
require 'connect.php';

$connect = connect();

// Get the data
//$categoria = $_GET['categoria'];
//$pincode= $_GET['pincode'];
$json = json_decode(file_get_contents("php://input"));

$people = array();
        $descripcion = $json->descripcion;
        $lugar = $json->lugar;
        $categoria = $json->categoria;
        $puesto = $json->puesto;  
        $tiempo = $json->tiempo;
        $salario = $json->salario;
        $entrevista = $json->entrevista;
        /*
        $archivo = (isset($_FILES['archivo'])) ? $_FILES['archivo'] : null;
        if ($archivo) {
            $ruta_destino_archivo = "archivos/{$archivo['name']}";
            $archivo_ok = move_uploaded_file($archivo['tmp_name'], $ruta_destino_archivo);
        }
        else{
            echo "No se pudo Archivo"
        }
        */
     // The password_hash() function convert the password in a hash before send it to the database
        //$pw = md5($pw);
        $query = "INSERT INTO `vacante`(`id_emp_fk`, `descripcion`, `lugar`, `areaTrabajo` , `tiempo`, `salario`,`puesto`,`entrevista`)
         VALUES (1,'$descripcion', '$lugar','$categoria','$tiempo','$salario','$puesto','$entrevista')";
        if (mysqli_query($connect, $query)) {
            echo "Vacante Creada" ;		 
        } else {
                echo "Error: " . $query . mysqli_error($connect);
            }		    
        //echo $json->user;
//$json = json_encode($people);
//echo $json;
exit;
?>