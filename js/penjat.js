
/* Funció que inicialitza el joc del penjat*/
function penjat() {
    
    let paraula = prompt("Introdueix una paraula");
    
    while ( paraula == null || paraula.length < 1 ) {
       paraula = prompt("Introdueix una paraula"); 
    }

    let oculta = "";
    let guanyat = false;
    let intents = 6;
    let resultat = "";
    let utilitzades = "";
    let repetida = false;
    
        for (let i= 0; i < paraula.length; i++){
            oculta = "-" + oculta;
        }
        console.log(paraula);
        console.log (oculta);

        while (!guanyat){
            let lletra = prompt("Introdueix una lletra").toUpperCase();
            let lletresUtilitzades = 0;
            if (esUnaLletra(lletra)){}
                if (lletra.length > 1){
                    console.log("Només una lletra");
                } else if (lletra.length != 1){
                    console.log("Introdueix una lletra siusplau");
                    
                } else {
                    for (let i = 0; i < utilitzades.length; i++){ //comprovem que no estigui repetida la lletra
                        if (utilitzades[i] != lletra) {
                            utilitzades = utilitzades + lletra;
                        } else {
                            repetida = true;
                        }
                    }
                
                    if (comprovaLletra(lletra,paraula)){ // comprova que la lletra estigui
                        console.log("Apareix la lletra");
                        resultat = EscriuOculta(lletra,paraula,oculta); //escriu el resultat d'haver afegit la lletra, hagi fallat o no
                        oculta = resultat; //modifiquem oculta per a que contingui les lletres que s'han encertat
                        console.log(resultat);

                            if (noHiHaGuions(oculta)){
                                    console.log("Has guanyat!");
                                    guanyat = true;
                            }
                    
                    } else {
                        if (!repetida){
                            console.log("No apareix la lletra");
                            intents --;
                        }

                        if (intents == 0){
                            console.log("Has perdut");
                            break;
                        
                        }
                    }
                }
        
        }
        
    }


function esUnaLletra(lletra){ // Funció que comprova que el valor introduït és una lletra
    let lletraDonada = lletra;
    if (lletraDonada.match(/[a-z]/i)){ 
        console.log("Es una lletra");
        return true;
    }else {
        console.log("No es una lletra");
        return false;
    }
}

function comprovaLletra (lletra,paraula){ //Funció que comprova si la lletra està dins a de la paraula
    let lletraDonada = lletra.toLowerCase();
    let paraulaDonada = paraula.toLowerCase();
    let apareix = false;
    
    for (let i=0; i <= paraulaDonada.length-1; i++ ){
        if (paraulaDonada[i] == lletraDonada){
           apareix = true;
           return true;
           
        } 
        continue;
       
    }
    return false;
}

function EscriuOculta(lletra,paraula,oculta) { //Funció que retorna la paraula oculta amb les lletres que han coincidit
    let paraulaOculta = oculta;
    let paraulaDonada = paraula.toLowerCase();
    let lletraDonada = lletra.toLowerCase();

    let ocultaArray = [...paraulaOculta]; //com els Strings són inmutables el transformem en un array;
    
    for (let i= 0; i <= paraulaDonada.length-1; i++){
        if (paraulaDonada[i] == lletraDonada){
            ocultaArray[i] = lletraDonada;
            continue;
        }
    }
    return ocultaArray;
}  

function noHiHaGuions(oculta){ // Funció que mira si queden guions en la paraula oculta per veure si ha guanyat
    for (let i=0; i <= oculta.length-1; i++) {
        if (oculta[i]!= '-'){
            continue;
        } else {
            return false;
        }
    }
    return true;
}


