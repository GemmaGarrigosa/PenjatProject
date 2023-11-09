let guanyades = 0; 
let perdudes = 0;




function jugar() {

    let opcio = prompt("Escull el que vols fer: \n 1. Iniciar un joc \n 2. Estadístiques \n 3. Sortir");
    
    
    if (opcio == 1) {
        penjat();
    }
    else if (opcio == 2) {
        estadistiques();
    }
    else if (opcio == 3) {
        return;
    }
    else {
        console.warn("Has d'introduïr una opció entre 1 i 3"); 
        jugar();
    }

}

/* Funció que inicialitza el joc del penjat*/
function penjat() {
    
    let paraula = prompt("Introdueix una paraula");
    
    while ( paraula == null || paraula.length < 1 ) {
       paraula = prompt("Introdueix una paraula"); 
    }

    let oculta = "";
    let guanyat = false;
    let intents = 6;
    let fallades = 0;
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
            
            if (esUnaLletra(lletra)){}
                if (lletra.length > 1){
                    console.warn("Només una lletra");
                } else if (lletra.length == 0){
                    console.warn("Introdueix una lletra siusplau");
                    
                } else {
                    

                    
                    if (comprovaLletra(lletra,paraula)){ // comprova que la lletra estigui dins la paraula
                        resultat = EscriuOculta(lletra,paraula,oculta); //escriu el resultat d'haver afegit la lletra, hagi fallat o no
                        oculta = resultat; //modifiquem oculta per a que contingui les lletres que s'han encertat
                        console.log(resultat.toString().replaceAll(","," ")); // convertim l'array a string, el toString igualment manté les comes aixi que hem de fer un replace

                            if (noHiHaGuions(oculta)){
                                    console.log("Has guanyat!");
                                    guanyat = true;
                                    guanyades++;
                            }
                    
                    } else {  
                        if(!utilitzades.includes(lletra)){
                            utilitzades = lletra + "," + utilitzades;
                            intents --
                            fallades++;
                        } 

                        if (intents == 0){
                            console.log("Has perdut :(");
                            perdudes++;
                            break;
                        
                        }

                        
                    }

                    console.log(`Lletres fallades ${fallades}/6: ${utilitzades.toLowerCase()}`);

                }
        }  
        
        jugar();
    }

//                                                        F U N C I O N S  D E L  P E N J A T


function esUnaLletra(lletra){ // Funció que comprova que el valor introduït és una lletra
    let lletraDonada = lletra;
    if (lletraDonada.match(/[a-z]/i)){ 
        
        return true;
    }else {
        console.warn("No és una lletra");
        return false;
    }
}

function comprovaLletra (lletra,paraula){ //Funció que comprova si la lletra està dins a de la paraula
    let lletraDonada = lletra.toLowerCase();
    let paraulaDonada = paraula.toLowerCase();
    
    
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
    let ocultaString = "";
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




//                                                                P A R T  D ' E S T A D I S T I Q U E S

function estadistiques() {
    let total = guanyades + perdudes;
    console.clear();
    console.log(`Total de partides: ${total} \n Partides guanyades (${calculaPercentatge(total,guanyades)}%): ${guanyades} \n Partides perdudes (${calculaPercentatge(total,perdudes)}%): ${perdudes}`);

}

function calculaPercentatge(total,tipus){
    let resultat = (tipus *100)/total;
    return resultat;
}
