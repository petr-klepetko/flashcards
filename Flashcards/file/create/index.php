<?php

$response = array(
    "status" => "",
    "filename" => "",
);

if (!empty($_GET)) {
    if (!empty($_GET['filename'])) {
        $response['status'] = "success"; 
        $response['filename'] = $_GET['filename']; 
    }
    else {
        $response['status'] = "Filename is not specified"; 
    }
}
else {
    $response['status'] = "There are no arguments";
}
$myfile = fopen("testfile.txt", "w");


$responseJSON = json_encode($response);

echo $responseJSON;
