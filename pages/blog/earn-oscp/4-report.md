---
layout: default
---
# How to earn your OSCP certification (2024)
## 4. Learn how to write a good report

For those who are particularly passionate about the technical aspects of this job and therefore struggle to dedicate the same passion and effort to writing the final report (like me), it is very important to gather all the necessary materials to deliver a concise yet comprehensive report with the least effort possible.

This is true both during the execution of the actual work and during the exam to obtain the OSCP certification. I can assure you that the amount of screenshots and notes taken to track all the tests performed on the target infrastructure will grow very quickly during your penetration test. I can also tell you from experience that reconstructing all the evidence afterward to describe in writing the critical issues of the tested infrastructure will be a very long and exhausting task.

For this reason, it is crucial to keep track of what is being done at the moment it is done. This may seem obvious, but I prefer to specify that it is not necessary to document EVERY single command executed. However, it is essential to be able to describe to our client ALL the key steps taken to reach the vulnerability being described. Additionally, I would recommend keeping track of commands that alter the structure of the machines on which we are conducting our tests, primarily for two reasons.

Firstly, it is a gesture of transparency and fairness towards the client who commissioned the work. I believe it is only right for an internal technician at the company that hired you to evaluate what your actions within the infrastructure were, and to know what was done and when. (Keep in mind that it is very useful to have a file among your notes that acts as a timestamp for the operations carried out; shortly, we’ll discuss the structure such a file should have.)

Secondly, it is a way to protect yourself as a professional. I hope you never need it, but remember that much of your work involves handling confidential data, sensitive documents, and system files from machines used by companies to generate revenue. I believe it is a wise move—and also a sign of competence and professionalism from the client's perspective—to use all the tools at your disposal to protect yourself in case unpleasant situations arise.

So, how can we structure a methodology that allows us to write a good report in the shortest time possible while keeping track of all the relevant steps during our activities within the client’s systems?

Let’s take it step by step. Suppose the client provides us with an entry point (EP) to their network infrastructure—a machine exposed to the network.

Probably one of the first things we will do is perform a scan (Nmap) of the EP machine. Let’s assume we find some open ports with exposed services that may not be necessary. This first step is an event to record both in our timestamp of operations performed and as evidence to show in the final report presented to our client.

As for the event timestamp, I personally find it effective to maintain a spreadsheet structured as follows:
![timestamp.png](/assets/images/earn-oscp/cap4/timestamp.PNG)

As for the report, we must remember to take a screenshot of the screen for each critical step of our penetration test. For this reason, it is essential to have a well-organized structure of subfolders for the evidence we collect. A good methodology is to always keep in mind that, in addition to providing proof of the actions performed during the work, we are essentially building a detailed guide that allows an external technician to replicate all the steps we performed and achieve the same results.

The structure of a report does not always have to be exactly the same. Different clients may have different needs. Consequently, we need to be able to communicate, as clearly and concisely as possible, the most important points for our client in relation to their specific requests.

Below, I want to share a link to an example of a report I created, to give you an idea of how a report for a simple client commission might be structured. Keep in mind that I am not trying to give you any strict guidelines—every client is different, and every pentester has their own style. What I’m suggesting is that you try writing one yourself to personally evaluate what you think could be a valid structure. This will help you create a general template that saves time when drafting subsequent reports and is flexible enough to adapt to different contexts.

<a href="/pages/pentest-report" style="font-size: 18px">VAPT report</a>

Additionally, a small note: remember that your report is likely to be read not only by technical personnel but also by individuals in managerial roles. Try to divide your work into more technical chapters and more narrative chapters.


Happy reporting!

<div class="row">
  <div class="column3"><a href="/pages/blog/earn-oscp/3-improve-programming-skills" style="font-size: 18px">Back<< 3. Improve your programming skills</a></div>
  <div class="column1"></div>
  <div class="column3"><a href="/pages/blog/earn-oscp/0-earn-oscp-home" style="font-size: 18px" >Next>> 5. Coming soon!</a><div>
</div>