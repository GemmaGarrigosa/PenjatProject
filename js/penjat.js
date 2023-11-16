let guanyades = 0; 
let perdudes = 0;
let lletra = "";
let paraula="";
let oculta = "";
let intents = 6;
let fallades = 0;
let p = "";




/* Funció que inicialitza el joc del penjat*/
function novaPartida() {
    let ocultaAmbEspais="";
    let botons = "";
    oculta = "";

    
    
    

    paraula = prompt("Introdueix una paraula");

    dibuixaPenjat(fallades);
    
    while ( paraula == null || paraula.length < 1 ) {
       paraula = prompt("Introdueix una paraula"); 
    }


    

    let lletres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
        for (let i= 0; i < paraula.length; i++){
            oculta = "_" + oculta;
            ocultaAmbEspais= "_ " + ocultaAmbEspais;
        }
        console.log(`Aquesta es la oculta ${oculta} i aquesta es la oculta amb espais ${ocultaAmbEspais}`);
        p = document.getElementById('jocPenjat');
        p.innerHTML="";
        p.innerHTML = `<p>${ocultaAmbEspais}</p>`;
        // p = document.createElement("p");
        // p.innerHTML = ocultaAmbEspais;
        // document.getElementById('jocPenjat').appendChild(p);
        
        botons = document.getElementById('abecedari'); //agafes el div
        botons.innerHTML = "";

        //Creem els botons amb la lletra
        for (let i= 0; i < lletres.length; i++){
            botons.innerHTML+= `<button id="${lletres[i]}" onclick='clickLletra("${lletres[i]}")'>${lletres[i]}</button>`;
 
        }

        
                
    }  
        
        
function clickLletra(lletraDonada){ //Funció que executa el joc una vegada 
    let utilitzades = "";
    lletra = lletraDonada;
    let resultat = "";
    

    if (comprovaLletra(lletra,paraula)){ // comprova que la lletra estigui dins la paraula
        resultat = EscriuOculta(lletra,paraula,oculta); //escriu el resultat d'haver afegit la lletra, hagi fallat o no
        oculta = resultat; //modifiquem oculta per a que contingui les lletres que s'han encertat
        resultat= resultat.join(" "); // juntem l'array en un string mostrant posant un espai entre mig per estètica

        //Aqui canviar que p sigui resultat XXXTODO
        console.log('Aquest es el resultat pocho' + resultat);
        p = document.getElementById('jocPenjat');
        
        p.innerHTML = `<p>${resultat}</p>`;
        

            if (noHiHaGuions(oculta)){
                    console.log("Has guanyat!");
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


//F U N C I O N S  D E L  P E N J A T
function dibuixaPenjat(fallades){
    let dibuix = document.getElementById('imatgePenjat');
    dibuix.src = "";
    dibuix.src = `./img/penjat_${fallades}.png`;
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

    let ocultaArray = "";
    ocultaArray = [...paraulaOculta]; //com els Strings són inmutables el transformem en un array;
    
    for (let i= 0; i <= paraulaDonada.length-1; i++){
        if (paraulaDonada[i] == lletraDonada){
            ocultaArray[i] = lletraDonada;
            continue;
        }
    }
    console.log('Array oculta ' + ocultaArray );
    console.log('paraula oculta ' + paraulaOculta);
    
    return ocultaArray;
}  

function noHiHaGuions(paraulaOculta){ // Funció que mira si queden guions en la paraula oculta per veure si ha guanyat

    
    for (let i=0; i <= paraulaOculta.length-1; i++) {
        if (paraulaOculta[i]!= '_'){
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