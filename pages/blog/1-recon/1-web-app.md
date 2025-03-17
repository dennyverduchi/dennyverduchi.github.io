---
layout: default
---

# Reconnaissance
## Web applications

### amass

<a href="https://github.com/owasp-amass/amass" target="_blank">amass github repo</a>

The OWASP Amass Project performs network mapping of attack surfaces and external asset discovery using open source information gathering and active reconnaissance techniques.

Information Gathering Techniques Used:

<table>
    <tr>
        <th><span style="color: lightcoral">Technique</span></th>
        <th><span style="color: lightcoral">Data Sources</span></th>
    </tr>
    <tr>
        <th>APIs</th>
        <th>360PassiveDNS, Ahrefs, AnubisDB, BeVigil, BinaryEdge, BufferOver, BuiltWith, C99, Chaos, CIRCL, DNSDB, DNSRepo, Deepinfo, Detectify, FOFA, FullHunt, GitHub, GitLab, GrepApp, Greynoise, HackerTarget, Hunter, IntelX, LeakIX, Maltiverse, Mnemonic, Netlas, Pastebin, PassiveTotal, PentestTools, Pulsedive, Quake, SOCRadar, Searchcode, Shodan, Spamhaus, Sublist3rAPI, SubdomainCenter, ThreatBook, ThreatMiner, URLScan, VirusTotal, Yandex, ZETAlytics, ZoomEye</th>
    </tr>
    <tr>
        <th>Certificates</th>
        <th>Active pulls (optional), Censys, CertCentral, CertSpotter, Crtsh, Digitorus, FacebookCT</th>
    </tr>
    <tr>
        <th>DNS</th>
        <th>Brute forcing, Reverse DNS sweeping, NSEC zone walking, Zone transfers, FQDN alterations/permutations, FQDN Similarity-based Guessing</th>
    </tr>
    <tr>
        <th>Routing</th>
        <th>ASNLookup, BGPTools, BGPView, BigDataCloud, IPdata, IPinfo, RADb, Robtex, ShadowServer, TeamCymru</th>
    </tr>
    <tr>
        <th>Scraping</th>
        <th>AbuseIPDB, Ask, Baidu, Bing, CSP Header, DNSDumpster, DNSHistory, DNSSpy, DuckDuckGo, Gists, Google, HackerOne, HyperStat, PKey, RapidDNS, Riddler, Searx, SiteDossier, Yahoo</th>
    </tr>
    <tr>
        <th>Web Archives</th>
        <th>Arquivo, CommonCrawl, HAW, PublicWWW, UKWebArchive, Wayback</th>
    </tr>
    <tr>
        <th>WHOIS</th>
        <th>AlienVault, AskDNS, DNSlytics, ONYPHE, SecurityTrails, SpyOnWeb, WhoisXMLAPI</th>
    </tr>
</table>

### subfinder

<a href="https://github.com/projectdiscovery/subfinder" target="_blank">subfinder github repo</a>

Subfinder is a subdomain discovery tool that returns valid subdomains for websites, using passive online sources. It has a simple, modular architecture and is optimized for speed. subfinder is built for doing one thing only - passive subdomain enumeration, and it does that very well.

### nmap

<a href="https://nmap.org/book/toc.html" target="_blank">nmap documentation</a>

Nmap (Network Mapper) is an open source tool for network exploration and security auditing. It was designed to rapidly scan large networks.

### dig (domain information groper)

Dig command is a flexible tool for interrogating DNS name servers. It performs DNS lookups and displays the answers that are returned from the queried name server(s).

### gau (get all urls)

<a href="https://github.com/lc/gau" target="_blank">gau github repo</a>

Gau command fetches known URLs from <a href="https://otx.alienvault.com/" target="_blank">AlienVault's Open Threat Exchange</a>, the Wayback Machine, Common Crawl, and URLScan for any given domain.

<div class="row">
  <div class="column3"><a href="/pages/blog/1-recon/0-recon-home" style="font-size: 18px">Back<< Index</a></div>
  <div class="column1"></div>
  <div class="column3"><a href="/pages/blog/blog-home" style="font-size: 18px" >Next>> SMB (Server Message Block)</a><div>
</div>