let guanyades = 0; 
let perdudes = 0;



/* Funció que inicialitza el joc del penjat*/
function novaPartida() {

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

    let lletres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
        for (let i= 0; i < paraula.length; i++){
            oculta = "_" +" " + oculta;
        }

       
        let p = document.createElement("p");
        p.innerHTML = oculta;
        document.body.appendChild(p);
        
        let botons = document.getElementById('abecedari'); //agafes el div

        //Creem els botons amb la lletra
        for (let i= 0; i < lletres.length; i++){
            botons.innerHTML+= `<button id="${lletres[i]} onclick='clickLletra("${lletres[i]}")'>${lletres[i]}</button>`;
           
          
        }
        
            

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
                            
                        
                        }

                        
                    }

                    console.log(`Lletres fallades ${fallades}/6: ${utilitzades.toLowerCase()}`);

                
        }  
        
        
    

//                                                        F U N C I O N S  D E L  P E N J A T




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
