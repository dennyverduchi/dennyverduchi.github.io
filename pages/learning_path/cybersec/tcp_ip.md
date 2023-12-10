---
layout: default
---

# Modello TCP/IP

Deriva dal modello <span style="color:#46eac7">ISO/OSI</span>, che si occupa di fornire un punto di riferimento per la comunicazione tra i nodi della rete. ISO/OSI è una <span style="color:#46eac7">pila di protocolli</span>, costituita da 7 livelli, dove ogni livello si occupa di risolvere la comunicazione solo al suo livello. Se un nodo A vuole comunicare a livello applicativo (livello 7) con un nodo B, A dovrà prima occuparsi di risolvere la comunicazione al suo livello, utilizzando i protocolli previsti (SSH, SMTP, Telnet..), poi propagare il messaggio ai livelli sottostanti fino ad arrivare al livello fisico (livello 1), che si occupa della trasmissione sulle infrastrutture predisposte (OTN, ADSL, Bluetooth..). 

A differenza di ISO/OSI, <span style="color:#46eac7">TCP/IP è strutturato su 4 livelli</span>. La comunicazione tra i livelli prevedere che l'unità d'informazione scambiata tra questi sia una <span style="color:#46eac7">PDU</span> (Protocol Data Unit).

Il modello TCP/IP è chiamato così per via dei due protocolli più importanti che lo costituiscono, tuttavia questo non significa che, come approfondito più avanti, il trasporto sia fatto solo tramite protocollo TCP e l'instradamento nella rete sia gestito solo da protocollo IP.

## Livello applicativo

Rappresenta l'interfaccia con cui l'<span style="color:#46eac7">utente interagisce</span> durante la comunicazione e può utilizzare diversi protocolli, come ad esempio FTP (File Transfer Protocol) per il trasferimento di file tra host, o HTTP (HyperText Transfer Protocol) per il trasferimento di HyperText tra browser sul nodo client ed il server web.

## Livello di trasporto

Questo è il livello dove troviamo TCP (Transmission Control Protocol), che da il nome al modello, ma anche UDP (User Datagram Protocol), SSL (Secure Socket Layer) e altri.

La struttura di un <span style="color:#46eac7">segmento TCP</span> è piuttosto complessa, personalmente ho trovato queste <a href="http://wpage.unina.it/rcanonic/didattica/rc/lucidi_2017/RC1-2018-L13.pdf" target="_blank">slide</a> molto esaustive nei confronti dell'argomento.

Nello specifico TCP usa il meccanismo <span style="color:#46eac7">sliding window</span>, che si occupa di:
1. spedire una finestra di pacchetti alla quale assegna un timeout
1. il ricevente, per ogni pacchetto ricevuto, invia un segnale di ACK che indica il prossimo pacchetto atteso
1. se il trasmettitore riceve gli ACK considera inviati i pacchetti

Nel caso in cui il trasmettitore riceva 3 ACK duplicati o scada il timeout della finestra presume la perdita di uno o più pacchetti e adotta strategie di ritrasmissione e monitoraggio della congestione del traffico dati sulla rete.

## Livello di rete

A questo livello appartengono IP (Internet Protocol), ICMP (Internet Control Message Protocol) e altri. Il suo scopo è quello di gestire l'<span style="color:#46eac7">instradamento tra i vari nodi della rete</span>. A ogni nodo viene assegnato un indirizzo IP univoco e i protocolli di rete hanno il compito di sfruttare apposite funzioni per l'ottimizzazione del percorso tra i nodi della rete. 

## Livello di accesso alla rete

Il livello di accesso alla rete ha il compito di trasmettere fisicamente il messaggio, sfruttando i canali di comunicazione preposti. L'individuazione di interfacce di comunicazione dei nodi sono individuate ancora una volta tramite un indirizzo univoco detto <span style="color:#46eac7">indirizzo MAC</span>.

### Il modello UDP/IP

Come detto in precedenza TCP non è l'unico protocollo di trasporto, un altro molto utilizzato nelle comunicazioni di rete è UDP (User Datagram Protocol). Viene considerato come meno affidabile, tuttavia ha la sua ragion d'essere dove l'elemento principale nella comunicazione è la velocità. Il fatto che il protocollo non preveda funzioni di riordinamento dei pacchetti o ritrasmissione in caso di perdita lo rende molto utile quando si vuole una <span style="color:#46eac7">comunicazione real time</span> (es: streaming audio/video, gaming online). Il protocollo UDP è sia <span style="color:#46eac7">connectionless</span> che <span style="color:#46eac7">stateless</span>.

Come per un segmento TCP, anche un datagramma UDP è composto da sequenze di 32 bit, ma la struttura è la seguente:

| <span style="color:#46eac7">Header</span> | |
| 0-15 bit | 16-31 bit |
|:-------|:--------|
| Source Port (numero porta host mittente) | Destination Port (numero porta host destinatario) |
| Length (lunghezza totale datagramma) | Checksum (codice di controllo del datagramma) |

| <span style="color:#46eac7">Payload</span> | |
|:--------|:--------|
| [N bit] Data (il messaggio) | |