$(document).ready(function() {

    $("#send-button").click(function() { //Al click su invio messaggio
        getMessSendMess();

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


    function getMessSendMess() { //Funzione per inviare messaggi
        var messageText = $(".write-zone input").val(); //Prendo in una variabile il messaggio scritto dall'utente

        if (messageText.length != 0) {
            var newText = $(".template .mess-t").clone(); //Clono template presente in html
            newText.children(".mess").text(messageText); //Assegno al figlio "mess" il messaggio preso in input
            newText.addClass("sent"); //Gli aggiungo la classe sent
            $(".central-message.active").append(newText); //Lo appendo nella classe dei messaggi
            $(".write-zone input").val(""); //Azzero l'input ogni volta che il messaggio viene inviato
        }
    }
});
