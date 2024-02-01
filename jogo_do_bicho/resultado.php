<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultado - Jogo do Bicho</title>
    <link rel="stylesheet" href="style.css">
    <style>
        h1 {
            margin-bottom: 5vh;
        }

        a {
            margin-top: 5vh;
        }

        .form {
            height: 75vh;
            width: 75vw;
            padding: 1vh 1vw 1vh 1vw;
        }
    </style>
</head>
<body>

    <div class="form">
        <h1>Resultado</h1>

    <?php

        session_start();

        $animal = $_POST['bicho'];
        $dezena = $_POST['dezena'];
        $valor = $_POST['valor'];

        if (!isset($_SESSION['saldo'])) {
            $_SESSION['saldo'] = 0;
        }
        
        $_SESSION['saldo'] = $_SESSION['saldo'] - $valor;

        $animais = $_SESSION['animais'];
        $resultadod = $_SESSION['sorteio'];
        $i = 0;

        if (($resultadod >= 97 && $resultadod <= 99) or $resultadod == 0) {
            $resultadoa = "Vaca";
        } else {
            for ($x = 1; $x <= 93 ; $x += 4) {
                if ($resultadod >= $x && $resultadod <= $x + 3) {
                    $resultadoa = $animais[$i];
                }
                $i++;
            }
        }

        echo "<strong>";
        if ($dezena == $resultadod) {
            $aposta = $valor * 5000;
            $_SESSION['saldo'] = $aposta + $_SESSION['saldo'];

            echo "VOCÊ GANHOU!!!";
        } else {
            echo "VOCÊ PERDEU";
        }
        echo "</strong>";

        echo "<h2>" . ucfirst($resultadoa) . " - $resultadod</h2>";

    ?>

    <div>
        <a href="jogo_do_bicho.php" id="btn">Voltar</a>
        <!--<a href="testa_cartao.html" id="btn" disabled>Sacar</a>-->
    </div>

    </div>

</body>
</html>