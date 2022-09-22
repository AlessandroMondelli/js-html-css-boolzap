$(document).ready(function() {

                    //*** DATI CONTATTI ***//
                //Creo oggetti con i dati dei contatti
    var contattoAlessia = {
        'imgCont' : "user-woman-1",
        'name' : ' Alessia ',
        'lastMess' : 'Ciao! Tutto bene, tu?',
        'lastAccess': 'Ultimo accesso oggi alle 10:40',
        'messSent' : 'Hey! Come stai?',
        'chatCode' : 'chat1'
    }

    var contattoMario = {
        "imgCont" : "user-man-1",
        "name" : "Mario",
        "lastMess" : "Io sto bene",
        'lastAccess': 'Ultimo accesso oggi alle 12:14',
        'messSent' : 'Tu come stai?',
        "chatCode" : "chat2"
    }

    var contattoFrancesca = {
        "imgCont" : "user-woman-2",
        "name" : "Francesca",
        "lastMess" : "Niente, tu?",
        'lastAccess': ' Ultimo accesso oggi alle 13:15',
        'messSent' : 'Che fai?',
        "chatCode" : "chat3"
    }

    var contattoMaria = {
        "imgCont" : "user-woman-3",
        "name" : "Maria",
        "lastMess" : "Niente di che!",
        'lastAccess': ' Ultimo accesso oggi alle 07:14',
        'messSent' : 'Che si dice?',
        "chatCode" : "chat4"
    }

    var elencoCont = [contattoAlessia,contattoMario,contattoFrancesca,contattoMaria]; //Array oggetti

                    //*** CREO LISTA CONTATTI ***//
    for (var i = 0; i < elencoCont.length; i++) { //Scorro ogni elemento dell'array
        var cont_att = elencoCont[i]; //Prendo dati di ogni singolo oggetto
        var imgContAtt = cont_att.imgCont; //Dati immagine
        var nameAtt = cont_att.name; //Dati nome
        var lastMessAtt = cont_att.lastMess; //Dati ultimo messaggio
        var lastAccessAtt = cont_att.lastAccess; //Dati ultimo messaggio
        var messSentAtt = cont_att.messSent; //Dati ultimo messaggio
        var chatCodeAtt = cont_att.chatCode; //dati codice chat

        //Creo i contatti su HTML
        $("#conversations").append(`
            <div class="n-conv" data-chatcode="` + chatCodeAtt + `">
                <div class="img-conv">
                    <img src="assets/images/` + imgContAtt + `.png" alt="user">
                </div>
                <div class="mess-conv">
                    <p>` + nameAtt + `</p>
                    <span>` + lastMessAtt + `<span>
                </div>
            `);

        //Creo immagini superiori
        $(".top-images.change").append(`
            <div class="top-img-pos" data-chatcode="` + chatCodeAtt + `">
                <img src="assets/images/` + imgContAtt + `.png" alt="Immagine Contatto">
                <p>` + nameAtt + `</p>
                <p>` + lastAccessAtt + `</p>
            </div>
        `)

        //Creo zone messaggi
        $(".central-message-zone").append(`
            <div class="central-message" data-chatcode="` + chatCodeAtt + `">
                <div class="mess-t sent">` + messSentAtt + `</div>
                <div class="mess-t received">` + lastMessAtt + `</div>
            </div>
        `)
    }

                    //*** SCELTA CHAT ***/
    $("#conversations .n-conv").click(function() {
        var contAtt = $(".n-conv.active"); //Variabile che contiene la chat attiva
        var imgContAtt = $(".top-img-pos.active"); //Variabile che contiene l'immagine profilo del contatto attuale
        var chatZoneAtt = $(".central-message:visible"); //Variabile che contiene zona chat attuale

        var tempContatto = $(".n-conv[data-chatcode ='" + (this).dataset.chatcode + "']"); //Ricevo dal click quale contatto è stato cliccato
        var tempImgCont = $(".top-img-pos[data-chatcode ='" + (this).dataset.chatcode + "']"); //Immagine profilo del contatto cliccato
        var tempChatZone = $(".central-message[data-chatcode ='" + (this).dataset.chatcode + "']"); //Chat del contatto cliccato

        addRemoveClass(tempContatto,contAtt); //Attivo contatto cliccato
        addRemoveClass(tempImgCont,imgContAtt); //Aggiungo foto del contatto nella chat
        hideShow(chatZoneAtt,tempChatZone); //Mostro la conversazione richiesta
    });


                    //*** INVIO DEI MESSAGGI ***//
    $("#send-button").click(function() { //Al click su invio messaggio
        getMessSendMess(); //Richiamo funzione per inviare messaggio
        verMic(); //Quando invio il messaggio, faccio tornare l'icona del microfono
    });

    $(".write-zone input").keypress(function() { //Funzione che permette di inviare messaggio con invio
        if (event.which == 13) { //Se viene premuto il tasto INVIO...
            getMessSendMess(); //Richiama funzione per inviare messaggio
        }
    });

    $( ".write-zone input").keyup(function() { //Funzione per cambiare icona microfono/aeroplano appena l'utente digita
        verMic();
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

                    //*** ELIMINA MESSAGGIO ***//
    $(document).on('click', '.mess-t i', function() { //Al click su freccia presente sul messaggio
        var tendina = $(this).siblings(".mess-option-panel"); //Prendo il pannello in una variabile
        if (tendina.hasClass("active")) { //Se è già attiva chiudo il pannello
            tendina.removeClass("active");
        } else { //Se non lo è, apro il pannello
            tendina.addClass("active");
        }
        $(".mess-destroy").click(function () { //Al click su elimina
            $(this).closest(".mess-t").hide(); //Elimina messaggio selezionato
        })
    });

    //Appena l'utente apre la pagina, mostro la prima chat
    $(".n-conv[data-chatcode ='chat1']").trigger("click");
});

                    //*** FUNZIONI ***//
function getMessSendMess() { //Funzione per inviare messaggi
    var messageText = $(".write-zone input").val(); //Prendo in una variabile il messaggio scritto dall'utente

    if (messageText.length != 0 && $(".n-conv").hasClass("active")) {
        var templHtml = $("#template-mess").html(); //Metto in una variabile il template creato con Handlebars
        var time = setHours(); //Richiamo la funzione per ricevere ore/minuti

        var templFun = Handlebars.compile(templHtml); //Lascio compilare a Handlebars il template

        var varMess = { //Variabili che prenderano posto nell'Html
            "newText" : messageText, //testo messaggio
            "messTime" : time, //Ora del messaggio
            "stat" : "sent" //Classe sent
        }

        var finalHtml = templFun(varMess); //assegno la funzione ad una variabile
        $(".central-message:visible").append(finalHtml) //Appendo codice nella sezione messaggi

                            //** Metodo Clone() **//
        // var newText = $(".template .mess-t").clone(); //Clono template presente in html
        // var time = setHours();
        // newText.children(".mess").text(messageText); //Assegno al figlio "mess" il messaggio preso in input
        // newText.children(".mess-time").text(time);
        //
        // newText.addClass("sent"); //Gli aggiungo la classe sent
        // $(".central-message:visible").append(newText); //Lo appendo nella classe dei messaggi
        //----------------------------------------------------------------------//

        $(".write-zone input").val(""); //Azzero l'input ogni volta che il messaggio viene inviato

        receivedMess(); //Richiamo funzione che riceve messaggio
    }
}

function receivedMess() { //Funzione che fa ricevere un messaggio
    var contAtt = $(".n-conv.active"); //Metto in una variabile il contatto attualmente selezionato
    var messageReceived = "Ok!"; //Testo del messaggio

    var templHtml = $("#template-mess").html(); //Metto in una variabile il template creato con Handlebars
    var time = setHours(); //Richiamo la funzione per ricevere ore/minuti

    var templFun = Handlebars.compile(templHtml); //Lascio compilare a Handlebars il template

    var varMess = { //Variabili che prenderano posto nell'Html
    "newText" : messageReceived, //testo messaggio
    "messTime" : time, //Ora del messaggio
    "stat" : "received" //Classe received
    }
    var finalHtml = templFun(varMess); //assegno la funzione ad una variabile

    setTimeout(function() {
    $(".central-message:visible").append(finalHtml) //Appendo codice nella sezione messaggi

                        //** Metodo CLone() **//
    // var newText = $(".template .mess-t").clone(); //Clono template presente in html
    // var time = setHours();
    // newText.children(".mess").text(messageReceived); //Assegno al figlio "mess" il messaggio preso in input
    // newText.children(".mess-time").text(time);
    //
    // newText.addClass("received"); //Gli aggiungo la classe sent
    // $(".central-message:visible").append(newText); //Lo appendo nella classe dei messaggi
    //----------------------------------------------------------------------------//

    $(".top-img-pos.active p:last-child").text("Ultimo accesso oggi alle " + setHours()); //Setto l'ultimo accesso all'ora attuale

    contAtt.prependTo("#conversations"); //Sposto l'ultima conversazione per prima
    contAtt.find(".mess-conv span").text(messageReceived); //Cambio l'anteprima dell'ultimo messaggio ricevuto sotto al contatto con il nuovo messaggio ricevuto
    },1000);
    $(".top-img-pos.active p:last-child").text("Sta scrivendo..."); //Stato di "Sta scrivendo..." che simula la scrittura della risposta
}

function verMic() { //Funzione che verifica la presenza del microfono o aeroplano
    var input = $( ".write-zone input").val(); //Prendo in una variabile il valore dell'input
    if (input != 0) { //Se non è vuoto...
        $("#send-button i").removeClass("fa-microphone").addClass("fa-paper-plane"); //Fai vedere aeroplano
    } else {
        $("#send-button i").addClass("fa-microphone").removeClass("fa-paper-plane"); //Fai vedere microfono
    }
}

function setHours() { //Funzione che recura ora attuale
    var date = new Date; //Variabile che tiene tutte le informazione sulla data

    var minutes = date.getMinutes(); //Prendo i minuti
    var hour = date.getHours(); //Prendo le ore
    return (hour + ":"+ minutes); //Invio ore e minti
}

function addRemoveClass(add,remove) { //Funzione che permette di fare addClass/removeClass di due elementi
    remove.removeClass("active");
    add.addClass("active");
}

function hideShow(hideEl,showEl) { //Funzione che permette di fare hide/show di due elementi
    hideEl.hide();
    showEl.show();
}
