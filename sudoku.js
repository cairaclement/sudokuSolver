function generateSudoku() {

    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
    nb_case_vide = document.getElementById("casesVide").value;

    grille = []; // 9 tableaux (lignes) avec 9 tableaux (colonnes) chacun
    lignes = []; // possibilités de chaque ligne
    colonnes = []; // possibilités de chaque colonne
    carres = []; // 3 x 3 carrés
    grille_complete = false;

    outerwhile: // point de retour
        while (!grille_complete) {
            for (i = 1; i <= 9; i++) {
                grille[i] = [];
                lignes[i] = [];
                colonnes[i] = [];

                for (j = 1; j <= 9; j++) {
                    grille[i][j] = 0; // On passe toutes les cases à 0
                    lignes[i][j] = j; // On complète toutes les possibilités de la ligne
                    colonnes[i][j] = j; // On complète toutes les possibilités de la colonne
                }
            }
            for (i = 1; i <= 3; i++) {
                carres[i] = []; // On crée les trois lignes de cases

                for (j = 1; j <= 3; j++) {
                    carres[i][j] = []; // On crée les trois colonnes de cases dans chaque ligne
                    for (k = 1; k <= 9; k++) {
                        carres[i][j][k] = k; // Et on complète toutes les possibilités de la case
                    }
                }
            }


            for (y = 1; y <= 9; y++) // calcul case par case
            {
                for (x = 1; x <= 9; x++) {
                    possibilites = [];
                    index = 0;

                    for (k = 1; k <= 9; k++) // check si présent dans ligne & colonne & carré
                    {
                        if (!lignes[y][k]) continue;
                        if (!colonnes[x][k]) continue;
                        if (!carres[Math.ceil(y / 3)][Math.ceil(x / 3)][k]) continue;

                        possibilites[index] = k;
                        index++;
                    }

                    if (possibilites.length === 0) continue outerwhile;

                    nb = possibilites[Math.floor((Math.random() * possibilites.length))];
                    grille[y][x] = nb; // Tire des possibilités au hasard
                    lignes[y][nb] = undefined; // Same
                    colonnes[x][nb] = undefined; // Same
                    carres[Math.ceil(y / 3)][Math.ceil(x / 3)][nb] = undefined; // Checker quelle case du sous tableau on se trouve
                }
            }
            grille_complete = true;
        }

    if (grille_complete) {
        cases_a_vider = [];

        for (i = 1; i <= 81; i++) {
            if (i <= nb_case_vide) cases_a_vider[i] = true;
            else cases_a_vider[i] = false;
        }

        cases_a_vider = shuffle(cases_a_vider);

        html = "<table cellpadding='2'><tbody>";
        html_enonce = "<table cellpadding='2'><tbody>";
        count = 0;

        for (y = 1; y <= 9; y++) {
            html += "<tr>";
            html_enonce += "<tr>";

            for (x = 1; x <= 9; x++) {
                count++;

                html += "<td>" + ((cases_a_vider[count]) ? '<span class="red">' + grille[y][x] + '</span>' : grille[y][x]) + "</td>";
                html_enonce += "<td" + ((cases_a_vider[count]) ? ' class="vide">&nbsp;' : '>' + grille[y][x]) + "</td>";
            }

            html += "</tr>";
            html_enonce += "</tr>";
        }

        html += "</tbody></table>";
        html_enonce += "</tbody></table>";

        document.getElementById("grille_a_remplir").innerHTML = html_enonce;
        document.getElementById("solution").innerHTML = html;
    }
}