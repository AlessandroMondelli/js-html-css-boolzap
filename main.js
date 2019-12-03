$(document).ready(function() {
                    //*** INVIO DEI MESSAGGI ***//
    $("#send-button").click(function() { //Al click su invio messaggio
        getMessSendMess(); //Richiamo funzione per inviare messaggio
    });

    $(".write-zone input").keypress(function() { //Funzione che permette di inviare messaggio con invio
        if (event.which == 13) { //Se viene premuto il tasto INVIO...
            getMessSendMess(); //Richiama funzione per inviare messaggio
        }
    });

    $( ".write-zone input").keyup(function() { //Funzione per cambiare icona microfono/aeroplano
        var input = $( ".write-zone input").val(); //Prendo in una variabile il valore dell'input
        if (input != 0) { //Se non è vuoto...
            $("#send-button i").removeClass("fa-microphone").addClass("fa-paper-plane"); //Fai vedere aeroplano
        } else {
            $("#send-button i").addClass("fa-microphone").removeClass("fa-paper-plane"); //Fai vedere microfono
        }
    });

                   //***RICERCA UTENTE CHAT ***//
    $( ".search-zone input").keyup(function() {
        var getUser = $(".search-zone input").val(); //Prendo in una variabile la ricerca effettuata
        getUser = getUser.toLowerCase(); //Riduco le lettere scritte dall'utente a minuscole

        var getContacts = []; //Array dove verranno inseriti i nomi dei contatti
        var contacts = $(".mess-conv p"); //Contatti presenti
        contacts.each(function(cont) { //Scorro uno ad uno i contatti
            var temp = $(this).text(); //Prendo i nomi dei contatti
            temp = temp.toLowerCase(); //Metto tutti i contatti in minuscolo
            // getContacts.push(temp); // metto i contatti in un array
            if ((temp.includes(getUser)) && (getUser.length != 0)) {
                getContacts.push(temp);
                $(this).parentsUntil("#conversations").show();
            } else if (getUser.length == 0){
                $(this).parentsUntil("#conversations").show();
            } else {
                $(this).parentsUntil("#conversations").hide();
            }
        })
    });
});

                    //*** FUNZIONI ***//
function getMessSendMess() { //Funzione per inviare messaggi
    var messageText = $(".write-zone input").val(); //Prendo in una variabile il messaggio scritto dall'utente

    if (messageText.length != 0) {
        var newText = $(".template .mess-t").clone(); //Clono template presente in html
        var time = setHours();
        newText.children(".mess").text(messageText); //Assegno al figlio "mess" il messaggio preso in input
        newText.children(".mess-time").text(time);

        newText.addClass("sent"); //Gli aggiungo la classe sent
        $(".central-message.active").append(newText); //Lo appendo nella classe dei messaggi
        $(".write-zone input").val(""); //Azzero l'input ogni volta che il messaggio viene inviato

        receivedMess(); //Richiamo funzione che riceve messaggio
    }
}

function receivedMess() {
var messageReceived = "Ok!";

setTimeout(function() {
    var newText = $(".template .mess-t").clone(); //Clono template presente in html
    var time = setHours();
    newText.children(".mess").text(messageReceived); //Assegno al figlio "mess" il messaggio preso in input
    newText.children(".mess-time").text(time);

    newText.addClass("received"); //Gli aggiungo la classe sent
    $(".central-message.active").append(newText); //Lo appendo nella classe dei messaggi
    },1000);
}

function setHours() { //Funzione che recura ora attuale
    var date = new Date; //Variabile che tiene tutte le informazione sulla data

    var minutes = date.getMinutes(); //Prendo i minuti
    var hour = date.getHours(); //Prendo le ore
    return (hour + ":"+ minutes); //Invio ore e minti
}
