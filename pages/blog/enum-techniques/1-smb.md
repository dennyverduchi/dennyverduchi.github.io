---
layout: default
---

# SMB (Server Message Block)

Server Message Block (SMB) is a network file-sharing protocol commonly used in Windows environments. When an SMB port (typically 445 or 139) is open, attackers and penetration testers can enumerate it to gather valuable information about the target system, such as shared folders, users, and security configurations. This article explores various techniques for enumerating an SMB service and extracting useful data.

## SMB Port

Before performing enumeration, verify that SMB is active on the target system. Use Nmap to scan for SMB-related ports:

```
nmap -p 139,445 --script smb-os-discovery <TARGET-IP>
```

## SMB Enumeration

### 1. Version

Understanding the SMB version can help assess vulnerabilities. Use the following Nmap script:

```
nmap --script smb-protocols -p 139,445 <TARGET-IP>
```

### 2. Listing Shared Folders

To list accessible shares, use the smbclient tool, which is part of the Samba suite:

```
smbclient -L //<TARGET-IP> -N
```

-N: attempts an anonymous login. If anonymous access is disabled, authentication may be required.

### 3. SMB Users

To extract user information, use enum4linux:

```
enum4linux -U <TARGET-IP>
```

Alternatively, use Metasploit’s smb_enumusers module:

```
use auxiliary/scanner/smb/smb_enumusers
set RHOSTS <TARGET-IP>
run
```

### 4. Extracting Workgroup and Domain Information

Use the following enum4linux command:

```
enum4linux -n <TARGET-IP>
```

This can reveal the system’s workgroup, domain name, and NetBIOS details.

### 5. Testing Null Sessions

Some misconfigured SMB servers allow unauthenticated queries (null sessions). To check for this, use rpcclient:

```
rpcclient -U "" <TARGET-IP>
```

If access is granted, issue commands like querydominfo or enumdomusers to extract information.

### 6. SMB Shares with Nmap

Another method to list SMB shares is through Nmap’s smb-enum-shares script:

```
nmap --script smb-enum-shares -p 445 <TARGET-IP>
```

This reveals share names and access permissions.