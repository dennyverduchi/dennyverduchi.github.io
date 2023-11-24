---
layout: default
---

# DNS (Domain Name System)

Un <span style="color:#46eac7">sistema dei nomi di dominio</span> è quello che si occupa di tradurre nomi scritti in linguaggio umano in indirizzi IP (<span style="color:#46eac7">risoluzione DNS</span>) e viceversa (<span style="color:#46eac7">risoluzione inversa</span>). Si occupa anche di memorizzare tutti gli indirizzi che vengono registrati nella rete, tramite l'utilizzo di un <span style="color:#46eac7">database distribuito</span> che viene mantenuto attivo dai <span style="color:#46eac7">server DNS</span>.

Se considero un nome di dominio di esempio come www.example.it posso riconoscere 3 livelli, separati da punti ".". In realtà il sistema DNS aggiunge implicitamente un "." finale al mio indirizzo, che diventa www.example.it.[stringa vuota], questo perchè nei nomi di dominio che comunemente usiamo esiste un livello iniziale chiamato "dominio radice" o "<span style="color:#46eac7">DNS root zone</span>".
Il <span style="color:#46eac7">sistema di risoluzione DNS</span> inizia quindi a leggere il nome di dominio da destra verso sinistra, la [stringa vuota] che incontra alla destra del primo punto, fornisce al sistema la direttiva di interrogare un <span style="color:#46eac7">root nameserver</span>, ovvero un server DNS contenente l'<span style="color:#46eac7">elenco dei server di tutti i TLD</span> (domini di primo livello).

Un TLD è specificato dalla prima stringa (non vuota) a destra nel nome di dominio, nell'esempio quindi è ".it", ed i server DNS che gestiscono i TLD sono detti "server DNS autorevoli". La risoluzione DNS procede in questo modo tra i vari livelli (".example" è un dominio di secondo livello, "www" è un dominio di terzo livello). Una volta terminato il processo, il nome di dominio sarà stato <span style="color:#46eac7">tradotto in un indirizzo IP</span>.

I nomi DNS vengono utilizzati anche all'interno di URL (https://jonesthecat.net/pages/cybersec/dns.html) o di indirizzi email (tizio@example.it).

## Record DNS

I record DNS sono istruzioni che risiedono nei server DNS autorevoli e forniscono informazioni su un dominio, incluso l'indirizzo IP e come gestire le richieste per quel dominio. I tipi principali sono:

* <span style="color:#46eac7">Record A</span>: corrispondenza tra un nome ed uno (o più) indirizzi IPv4
* <span style="color:#46eac7">MX record</span>: (Mail eXchange) indica a quali server debba essere inviata la posta elettronica per un certo dominio
* <span style="color:#46eac7">Record CNAME</span>: (Canonical NAME) è usato per creare un alias, ovvero per fare in modo che lo stesso host sia noto con più nomi
* <span style="color:#46eac7">Record PTR</span>: il DNS viene utilizzato anche per realizzare la risoluzione inversa
* <span style="color:#46eac7">Record AAAA</span>: come il record A ma restituisce un indirizzo IPv6
* <span style="color:#46eac7">Record SRV</span>: identificano il server per un determinato servizio all'interno di un dominio
* <span style="color:#46eac7">Record TXT</span>: associano campi di testo arbitrari a un dominio (descrizione informativa o utilizzati per realizzare servizi)

Ogni record DNS ha anche un parametro <span style="color:#46eac7">TTL</span> (time to live), che indica per <span style="color:#46eac7">quanto tempo il record può venire memorizzato in un sistema di cache DNS</span> prima che venga considerato scaduto. Quando un server risponde ad una richiesta con un record preso dalla propria cache, assegna alla risposta il TTL residuo del record.

### Bin

DNS lookup:
* $ host
* $ nslookup

DNS enumeration:
* $ dnsrecon
* $ dnsenum