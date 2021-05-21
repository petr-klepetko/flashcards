<?php 

header('Cache-controll: no-cache, no-store, must-revalidate');
header('Expires: 0');

?>

<!DOCTYPE html>
<html>

<head>
    <title>Vybrat otázky: </title>
    <link rel="stylesheet" href="../css/selectQ.css">
    <meta charset="UTF-8">
</head>

<body>
    <main>
        <div class="row center phoneColumn">
            <p class="text">Vložte soubor s otázkami: </p>
            <div class="fileInput"><input type="file"></div>
        </div>
        <div class="column space-before">
            <p class="text">Nebo vyberte z již nahraných: </p>
            <?php
            $pathToFile = "./../questions/list.json";
            $listOfQuestions = json_decode(file_get_contents($pathToFile), true);

            foreach ($listOfQuestions as $key => $value) {
                echo "<div class=\"center questionTale\">";
                $fileName = $listOfQuestions[$key]['name'];
                echo "<a href=\"./changeCurrentQuestions.php/?fileName=$fileName\">";
                print_r($listOfQuestions[$key]['name']);
                echo "</a>";
                echo "</div>";
            }


            ?>
        </div>
    </main>
    <script id="file" src="../js/selectQ.js"></script>
</body>

</html>