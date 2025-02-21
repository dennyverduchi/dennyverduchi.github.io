---
layout: default
---

# LDAP (Lightweight Directory Access Protocol)

Lightweight Directory Access Protocol (LDAP) is a widely used protocol for managing and accessing directory services, such as Microsoft Active Directory (AD). Security professionals, penetration testers, and attackers alike use LDAP enumeration to extract valuable information from a target system.

Let's explore how to enumerate an open LDAP port, identify key information, and understand potential security risks.

## LDAP Port

LDAP typically operates on the following ports:

- 389 (TCP/UDP): standard LDAP communication (unencrypted)
- 636 (TCP): LDAP over SSL (LDAPS)
- 3268 (TCP): Global Catalog service for LDAP queries
- 3269 (TCP): Global Catalog service over SSL

```
nmap -p 389,636,3268,3269 -sV --script=ldap-rootdse <TARGET-IP>
```

## LDAP Enumeration

Once you've identified an active LDAP service, the next step is to enumerate it. This can be done using built-in Linux tools, PowerShell, or specialized tools like ldapsearch.

[LDAP anonymous binds](https://docs.microsoft.com/en-us/troubleshoot/windows-server/identity/anonymous-ldap-operations-active-directory-disabled) allow unauthenticated attackers to retrieve information from the domain, such as a complete listing of users, groups, computers, user account attributes, and the domain password policy. This is a legacy configuration, and as of Windows Server 2003, only authenticated users are permitted to initiate LDAP requests.

### ldapsearch

```
ldapsearch -H ldap://<TARGET-IP>:<PORT>/ -x -s base -b '' "(objectClass=*)"
```
<span style="color: lightcoral">-x</span>: uses simple (anonymous) authentication, without SASL (Simple Authentication and Security Layer)

<span style="color: lightcoral">-s base</span>: limits the search to the "base" level of the LDAP tree, returning only the entry root (rootDSE)

<span style="color: lightcoral">-b ''</span>: specifies the DN (Distinguished Name) for the base search. In this case, it is empty because the query is directed at the rootDSE

<span style="color: lightcoral">"(objectClass=*)"</span>: an LDAP filter that returns all the entries available at the specified level (in this case, the rootDSE)

If credentials are available, use:

```
ldapsearch -x -D "CN=admin,CN=Users,DC=example,DC=com" -w "password" -H ldap://<TARGET-IP>:<PORT>/ -b "DC=example,DC=com"
```

This retrieves all LDAP objects under the base domain.

### go-windapsearch
```
windapsearch-linux-amd64 -d example.com --dc <TARGET-IP> -m          
[!] You must specify a valid module to use
 Available modules: 
    admin-objects       Enumerate all objects with protected ACLs (i.e admins)
    computers           Enumerate AD Computers
    custom              Run a custom LDAP syntax filter
    domain-admins       Recursively list all users objects in Domain Admins group
    gpos                Enumerate Group Policy Objects
    groups              List all AD groups
    members             Query for members of a group
    metadata            Print LDAP server metadata
    privileged-users    Recursively list members of all highly privileged groups
    search              Perform an ANR Search and return the results
    unconstrained       Find objects that allow unconstrained delegation
    user-spns           Enumerate all users objects with Service Principal Names (for kerberoasting)
    users               List all user objects
```
[github repo](https://github.com/ropnop/go-windapsearch)

## Nmap NSE Scripts

Nmap has powerful scripts for LDAP enumeration:

- Extract basic info
    
    ```
    nmap -p 389 --script=ldap-rootdse <TARGET-IP>
    ```
    
- Enumerate users
    
    ```
    nmap -p 389 --script=ldap-search <TARGET-IP>
    ```
    

These scripts can provide valuable insights, such as domain structure and available users.

## PowerShell

On a Windows machine with access to an LDAP server, PowerShell can be used to enumerate users and groups:

```
Get-ADUser -Filter * -Property * | Select Name,SamAccountName,DistinguishedName
```

To enumerate groups:

```
Get-ADGroup -Filter * | Select Name, GroupCategory, DistinguishedName
```

## Security Risks & Mitigations

<span style="color: lightcoral">Anonymous Binding</span>: if enabled, attackers can extract sensitive data without credentials. Disable anonymous binds in the LDAP configuration.

<span style="color: lightcoral">Weak Authentication</span>: ensure LDAP authentication is enforced with strong credentials.

<span style="color: lightcoral">LDAPS Not Enforced</span>: always prefer LDAPS (port 636) to protect data from eavesdropping.

<span style="color: lightcoral">Overly Permissive Queries</span>: restrict user permissions and avoid excessive LDAP query responses.

<div class="row">
  <div class="column3"><a href="/pages/blog/enum-techniques/0-enum-techniques-home" style="font-size: 18px">Back<< Index</a></div>
  <div class="column1"></div>
  <div class="column3"><a href="/pages/blog/blog-home" style="font-size: 18px" >Next>> Coming soon!</a><div>
</div>