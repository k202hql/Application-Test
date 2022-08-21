<?php
include_once '../class/services.php';
include_once '../include/header.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

$serv = new Services();
$db = $serv->getdata($file);

if($db != null){
    http_response_code(200);
    echo json_encode($db);
}
else{
    http_response_code(404);
    echo json_encode("Item not found.");
}
?>