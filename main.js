$(document).ready(function() {

                        //*** DATI CONTATTI ***//
                    //Creo oggetti con i dati dei contatti
    var contattoAlessia = {
        'imgCont' : "https://image.flaticon.com/icons/svg/145/145862.svg",
        'name' : ' Alessia ',
        'lastMess' : 'Ciao! Come stai?',
        'chatCode' : 'chat1'
    }

    var contattoMario = {
        "imgCont" : "https://image.flaticon.com/icons/svg/145/145859.svg",
        "name" : "Mario",
        "lastMess" : "Io sto bene",
        "chatCode" : "chat2"
    }

    var contattoFrancesca = {
        "imgCont" : "https://image.flaticon.com/icons/svg/145/145852.svg",
        "name" : "Francesca",
        "lastMess" : "Che fai?",
        "chatCode" : "chat3"
    }

    var contattoMaria = {
        "imgCont" : "https://image.flaticon.com/icons/svg/145/145864.svg",
        "name" : "Maria",
        "lastMess" : "Che fai?",
        "chatCode" : "chat4"
    }

    var elencoCont = [contattoAlessia,contattoMario,contattoFrancesca,contattoMaria]; //Array oggetti
    console.log(elencoCont);

//*** CREO LISTA CONTATTI ***//
    for (var i = 0; i < elencoCont.length; i++) { //Scorro ogni elemento dell'array
        var cont_att = elencoCont[i]; //Prendo dati di ogni singolo oggetto
        var imgContAtt = cont_att.imgCont; //Dati immagine
        var nameAtt = cont_att.name; //Dati nome
        var lastMessAtt = cont_att.lastMess; //Dati ultimo messaggio
        var chatCodeAtt = cont_att.chatCode; //dati codice chat

        $("#conversations").append(`
            <div class="n-conv" data-chatCode="` + chatCodeAtt + `">
                <div class="img-conv">
                    <img src="` + imgContAtt + `" alt="user">
                </div>
                <div class="mess-conv">
                    <p>` + nameAtt + `</p>
                    <span>` + lastMessAtt + `<span>
                </div>
            `);
    }


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

        var contacts = $(".mess-conv p"); //Contatti presenti
        contacts.each(function(cont) { //Scorro uno ad uno i contatti
            var temp = $(this).text(); //Prendo i nomi dei contatti
            temp = temp.toLowerCase(); //Metto tutti i contatti in minuscolo
            // getContacts.push(temp); // metto i contatti in un array
            if ((temp.includes(getUser)) && (getUser.length != 0)) { //Se la ricerca è contenuta in qualche contatto
                $(this).parentsUntil("#conversations").show(); //Mostra i contatti corrispondenti
            } else if (getUser.length == 0){ //Se la ricerca è vuota
                $(this).parentsUntil("#conversations").show(); //Mostra tutti i contatti
            } else {
                $(this).parentsUntil("#conversations").hide(); //Altrimenti nascondi quelli che non rispondono alla rierca
            }
        });
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

function receivedMess() { //Funzione che fa ricevere un messaggio
var messageReceived = "Ok!"; //Testo del messaggio

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
