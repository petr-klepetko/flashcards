<?php

$response = array(
    "status" => "",
);

if (!empty($_GET)) {
    if (!empty($_GET['filename'])) {

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