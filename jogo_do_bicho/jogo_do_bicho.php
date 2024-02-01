<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jogo do Bicho</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    
    <form action="resultado.php" method="post">
        
        <h1>Jogo do Bicho</h1>

        <?php

            session_start();

            if (isset($_SESSION['saldo'])) {
                $saldo = $_SESSION['saldo'];
                echo "<span class='" . ($saldo >= 0? "" : "vermelho") . "'><strong>Saldo:</strong> R$$saldo</span>";
            }

            $_SESSION['sorteio'] = rand(0, 99);

        ?>

        <img src="imagens/img-jogo-do-bicho.png" alt="tabela do jogo do bicho">

        <div>
            <select name="bicho" id="bicho" onchange="updatedezena(this.value)" required>

                <?php

                    $_SESSION['animais'] = array(
                        'avestruz', 'Águia', 'burro', 'borboleta', 'cachorro', 'cabra',
                        'carneiro', 'camelo', 'cobra', 'coelho', 'cavalo', 'elefante',
                        'galo', 'gato', 'jacaré', 'leão', 'macaco', 'porco', 'pavão',
                        'peru', 'touro', 'tigre', 'urso', 'veado', 'vaca'
                    );
                    $animais = $_SESSION['animais'];

                    var_dump($animais);

                    foreach ($animais as $animal) {
                        echo "<option value='$animal'>" . ucfirst($animal) . "</option>";
                    }

                ?>

            </select>

            <select name="dezena" id="dezena" required>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
            </select>
        </div>

        <label for="valor">
            <strong>R$</strong>
            <input type="number" name="valor" id="valor" min="1" placeholder="Valor da aposta $$$" required>
        </label>

        <div>
            <input type="submit" value="Apostar $$$" id="btn">
            
            <?php

                /*if (isset($_SESSION['saldo']) && $_SESSION['saldo'] > 0) {
                    echo "<a href='testacartao.html' id='btn' disabled>Sacar</a>";
                }*/
                
            ?>
        </div>

    </form>

    <script>

        function updatedezena(selectedValue) {
            var dezena = document.getElementById('dezena')
            dezena.innerHTML = ''

            var dezenas = {
                'avestruz': ['01', '02', '03', '04'],
                'Águia': ['05', '06', '07', '08'],
                'burro': ['09', '10', '11', '12'],
                'borboleta': ['13', '14', '15', '16'],
                'cachorro': ['17', '18', '19', '20'],
                'cabra': ['21', '22', '23', '24'],
                'carneiro': ['25', '26', '27', '28'],
                'camelo': ['29', '30', '31', '32'],
                'cobra': ['33', '34', '35', '36'],
                'coelho': ['37', '38', '39', '40'],
                'cavalo': ['41', '42', '43', '44'],
                'elefante': ['45', '46', '47', '48'],
                'galo': ['49', '50', '51', '52'],
                'gato': ['53', '54', '55', '56'],
                'jacaré': ['57', '58', '59', '60'],
                'leão': ['61', '62', '63', '64'],
                'macaco': ['65', '66', '67', '68'],
                'porco': ['69', '70', '71', '72'],
                'pavão': ['73', '74', '75', '76'],
                'peru': ['77', '78', '79', '80'],
                'touro': ['81', '82', '83', '84'],
                'tigre': ['85', '86', '87', '88'],
                'urso': ['89', '90', '91', '92'],
                'veado': ['93', '94', '95', '96'],
                'vaca': ['97', '98', '99', '00']
            }

            var options = dezenas[selectedValue]
            options.forEach(function(option) {
                addOption(dezena, option, option)
            })
        }

        function addOption(select, text, value) {
            var option = document.createElement('option')
            option.text = text
            option.value = value
            select.add(option)
        }
        
    </script>

</body>
</html>