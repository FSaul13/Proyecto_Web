<<<<<<< HEAD
<?php
// db credentials
define('DB_HOST', 'localhost');
define('DB_USER','root');
define('DB_PASS','');
define('DB_NAME','proyecto');
// Connect with the database.
function connect()
{
  $connect = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME);
  if (mysqli_connect_errno($connect))
  {
    die("Failed to connect:" . mysqli_connect_error());
  }
  mysqli_set_charset($connect, "utf8");
  return $connect;
}
=======
<?php
// db credentials
define('DB_HOST', 'localhost');
define('DB_USER','root');
define('DB_PASS','elefante360');
define('DB_NAME','proyecto');

// Connect with the database.
function connect()
{
  $connect = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME);

  if (mysqli_connect_errno($connect))
  {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8");


  return $connect;
}
>>>>>>> 0d91cb16c11db89583697d0bfaf7ee5f34ea3ab4
?>