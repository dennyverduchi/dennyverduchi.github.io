---
layout: default
---

# Enumeration techniques
## Web applications

### nikto

<a href="https://github.com/sullo/nikto?tab=readme-ov-file" target="_blank">nikto github repo</a>

Nikto is an Open Source (GPL) <span style="color: lightcoral">web server scanner</span> which performs comprehensive tests against web servers for multiple items, including over 6700 potentially <span style="color: lightcoral">dangerous files/programs</span>, checks for <span style="color: lightcoral">outdated versions</span> of over 1250 servers, and <span style="color: lightcoral">version specific problems</span> on over 270 servers. It also checks for server configuration items such as the presence of multiple index files, HTTP server options, and will attempt to identify installed web servers and software.

### nuclei

<a href="https://github.com/projectdiscovery/nuclei" target="_blank">nuclei github repo</a>

Nuclei is a modern, high-performance <span style="color: lightcoral">vulnerability scanner</span> that leverages simple YAML-based templates. It empowers you to design custom vulnerability detection scenarios that mimic real-world conditions, leading to zero false positives.

- Simple YAML format for creating and customizing vulnerability templates.
- Contributed by thousands of security professionals to tackle trending vulnerabilities.
- Reduce false positives by simulating real-world steps to verify a vulnerability.
- Ultra-fast parallel scan processing and request clustering.
- Integrate into CI/CD pipelines for vulnerability detection and regression testing.
- Supports multiple protocols like TCP, DNS, HTTP, SSL, WHOIS JavaScript, Code and more.
- Integrate with Jira, Splunk, GitHub, Elastic, GitLab.

To perform a quick scan on web-application:
```
nuclei -target https://example.com
```

To write and use your own template, create a .yaml file with specific rules, then use it as follows:
```
nuclei -u https://example.com -t /path/to/your-template.yaml
```

### whatweb

<a href="https://github.com/urbanadventurer/WhatWeb" target="_blank">whatweb github repo</a>

WhatWeb identifies websites. Its goal is to answer the question, "What is that Website?". WhatWeb <span style="color: lightcoral">recognises web technologies</span> including <span style="color: lightcoral">CMS</span> (Content Management Systems), <span style="color: lightcoral">blogging platforms</span>, <span style="color: lightcoral">statistic/analytics packages</span>, <span style="color: lightcoral">JavaScript libraries</span>, <span style="color: lightcoral">web servers</span>, and <span style="color: lightcoral">embedded devices</span>. WhatWeb has over 1800 plugins, each to recognise something different. WhatWeb also identifies version numbers, email addresses, account IDs, web framework modules, SQL errors, and more.

<div class="row">
  <div class="column3"><a href="/pages/blog/2-enum-techniques/0-enum-techniques-home" style="font-size: 18px">Back<< Index</a></div>
  <div class="column1"></div>
  <div class="column3"><a href="/pages/blog/2-enum-techniques/2-smb" style="font-size: 18px" >Next>> SMB (Server Message Block)</a><div>
</div>