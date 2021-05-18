<?php
if(!empty($_GET['fileName'])){
    //echo $_GET['fileName']; 
    $QFileName = $_GET['fileName'];
    $pathToFile = "./../practice/status.json";
    $statusFileRaw = file_get_contents($pathToFile);
    echo $statusFileRaw;
    $statusFile = json_decode($statusFileRaw, true);
    //echo $statusFile['current-file'];

    $statusFile['current-file'] = $QFileName; 
    $statusFileRaw = json_encode($statusFile, JSON_UNESCAPED_SLASHES);

    echo $statusFileRaw;

    file_put_contents($pathToFile, $statusFileRaw);
    //header("Location: ./../../practice/");
}