<?php 

header('Cache-controll: no-cache, no-store, must-revalidate');
header('Expires: 0');

?>

<!doctype html>

<html lang="en">

<head>
    <meta charset="utf-8">

    <title>Practice</title>
    <meta name="description" content="Flashcards">
    <meta name="author" content="Petr Klepetko">
    <meta name="viewport" content="user-scalable=0">

    <link rel="stylesheet" href="../css/styles.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap" rel="stylesheet">
</head>

<body>
    <div id="topLevelContainer" class="topLevelContainer">
        <header>
           <a href="./../selectQ/" class="sideBox"><div class="sideBox" id="backToSelection"><p>Zpět</p></div></a>
            <h1 id="h1">Nadpis balíčku otázek</h1>
            <div class="sideBox"></div>
        </header>
        <main>
            <aside></aside>
            <div id="cardSpace" class="cardSpace">
                <div id="card" class="card">
                    <p id="QorA" class="QorA">Q</p>
                    <p id="question" class="cardText">Text otázky</p>
                    <p id="answer" class="hide cardText">Odpověď na otázku</p>
                </div>
            </div>
            <aside>
                <img id="turnCard" class="turnCard" src="../pictures/turnCard.png" alt="turn the card" width="120"
                    height="120">
            </aside>
        </main>
        <footer>
            <div id="textContainer" class="textContainer testClass">
                <span id="back" class="mover">&lt;</span>
                <span id="cardNumber" class="cardNumber">1/52</span>
                <span id="forward" class="mover">&gt;</span>
            </div>
        </footer>
    </div>
    <script src="../js/main.js"></script>
</body>

</html>
