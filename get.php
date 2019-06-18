<<<<<<< HEAD
<?php
require 'connect.php';
$connect = connect();
// Get the data
$categoria = $_GET['categoria'];
//$pincode= $_GET['pincode'];
//$json = json_decode(file_get_contents("php://input"));
$people = array();
if($categoria!="*")
$sql = "SELECT * FROM vacante WHERE areaTrabajo = '$categoria'";
else
$sql = "SELECT * FROM vacante";
//$json = json_decode(file_get_contents("php://input"));
//$json->categoria;
if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
      if($cr<10)
      {
      $people[$cr]['id'] = $row['id'];
      $people[$cr]['id_emp_fk'] = $row['id_emp_fk'];
      $people[$cr]['areaTrabajo']  = $row['areaTrabajo'];
      $people[$cr]['descripcion'] = $row['descripcion'];
      $people[$cr]['lugar']    = $row['lugar'];
      $people[$cr]['puesto']  = $row['puesto'];
      $people[$cr]['tiempo'] = $row['tiempo'];
      $people[$cr]['salario']    = $row['salario'];
      $people[$cr]['entrevista'] = $row['entrevista'];
      
      $cr++;
      }
  }
  //$json = json_encode($people);
  //echo $json;
}
$json = json_encode($people);
echo $json;
exit;
=======
<?php
require 'connect.php';

$connect = connect();

// Get the data
$categoria = $_GET['categoria'];
//$pincode= $_GET['pincode'];
//$json = json_decode(file_get_contents("php://input"));

$people = array();
if($categoria!="*")
$sql = "SELECT * FROM vacante WHERE areaTrabajo = '$categoria'";
else
$sql = "SELECT * FROM vacante";

//$json = json_decode(file_get_contents("php://input"));
//$json->categoria;

if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);

  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
      if($cr<10)
      {
      $people[$cr]['id'] = $row['id'];
      $people[$cr]['id_emp_fk'] = $row['id_emp_fk'];
      $people[$cr]['areaTrabajo']  = $row['areaTrabajo'];
      $people[$cr]['descripcion'] = $row['descripcion'];
      $people[$cr]['lugar']    = $row['lugar'];
      $people[$cr]['puesto']  = $row['puesto'];
      $people[$cr]['tiempo'] = $row['tiempo'];
      $people[$cr]['salario']    = $row['salario'];
      $people[$cr]['entrevista'] = $row['entrevista'];
      

      $cr++;
      }
  }
  //$json = json_encode($people);
  //echo $json;
}

$json = json_encode($people);
echo $json;
exit;
>>>>>>> 0d91cb16c11db89583697d0bfaf7ee5f34ea3ab4
?>