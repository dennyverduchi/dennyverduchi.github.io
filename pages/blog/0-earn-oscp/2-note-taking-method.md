---
layout: default
---
# How to earn your OSCP certification (2025)
## 2. Review Your Note-Taking Method

It might seem simple, but one of the skills I improved the most during my OSCP certification preparation was my note-taking method. I’m not just talking about the software I used (I found that even some highly regarded tools didn’t fit my style), but the actual technique of organizing topics, subtopics, notes, and exercises. Personally, I come from an academic background, and for various reasons, I never really needed to, nor was I particularly skilled at, taking structured notes. This was because, during university exam preparation, the topics are usually confined to a specific category, and solid foundations are often built to ensure understanding of what follows. In my mind, the connections between the topics were relatively easy to visualize due to this simplified structure. However, the certification preparation challenged me in this aspect several times.

This isn’t to say that the study material isn’t well-organized or doesn’t provide the right tools for effective preparation. Rather, I’m highlighting the difficulty of understanding from the outset how the various topics interconnect to form the comprehensive knowledge needed to pass the exam. Each topic could require deep exploration to be fully understood. It’s not always necessary to delve that deep to be competent in what you’re doing, although every new detail you learn certainly enhances your overall ability.

![cpp_program_example.png](/assets/images/0-earn-oscp/cap2/cpp_program_example.png)

For a simple example, even highly experienced C++ programmers may not fully understand the exact steps the compiler takes. This might not be necessary for them. For instance, I’m not a particularly skilled programmer, but I know that the code I write gets compiled and translated into a lower-level language, converting it into a set of instructions (operationally equivalent to what I wrote in C++) that the computer, depending on its architecture, interprets as strings of 0s and 1s, corresponding to stages of square wave electrical signals.   

However, even though the programmer might not know exactly how the compiler translates high-level code, the fact remains that a program written in C++ will be compiled and translated into machine code for execution.

Some topics in the exam preparation course follow a similar principle: it’s often useful to know WHAT steps are happening “under the hood,” but it’s not always necessary to immediately understand HOW. In my view, it’s important to keep this in mind when structuring a methodology that allows you to take notes that can always be reviewed and expanded upon over time.

Let me give you another simple example: During your preparation, you’ll often use the same tool multiple times, but in different ways and for different purposes depending on the topic. In this case, it’s easy to conclude that the best approach is to create a specific chapter for that tool and update it with new content whenever necessary. However, as the amount of information and tools grows, you might be tempted to abandon this granular approach for fear of overcomplicating things. In my experience, this kind of “laziness” cost me a lot of time when I needed to revisit a topic that had become mixed with another, and for which I had only written a few lines amidst pages on unrelated subjects.

Here are a few simple rules I’d recommend for optimal note management:

- <span style="color: coral">separate notes on theory from those on techniques</span>
    - <span style="color: coral">in the theory notes, create references (e.g., external links, depending on the tool you use) to the related technique sections</span>
- <span style="color: coral">organize everything by major topics</span>
    - <span style="color: coral">don’t worry if the number of subtopics grows quickly with only a few lines of notes</span>
- <span style="color: coral">separate notes related to the practical side</span>
    - <span style="color: coral">there are examples provided to explain the topic</span>
    - <span style="color: coral">there are exercises specific to the topic covered</span>
    - <span style="color: coral">there are *capstone* exercises that combine multiple topics</span>
    - <span style="color: coral">there are labs</span>
    - <span style="color: coral">there are exam simulations</span>

In my view, the structure should look something like this: four sections with the same naming convention but located in different areas for chapter management, and one independent section for labs:

<div class="row" style="font-size: 10px">
    <div class="column4">
        <p><span style="color: #b5e853">THEORY SECTION</span></p>
        <p>&ensp;<span style="color: #b5e853">CHAPTER X</span></p>
        <p>&ensp;&ensp;<span style="color: #b5e853">TOPIC X.Y</span></p>
        <p>&ensp;&ensp;&ensp;<span style="color: #b5e853">Theoretical notes on topic X.Y</span></p>
        <p>&ensp;&ensp;&ensp;<span style="color: #b5e853">Link to TOPIC X.Y in TECHNIQUE SECTION</span></p>
    </div>
        <div class="column4">
        <p><span style="color: #b5e853">TECHNIQUE SECTION</span></p>
        <p>&ensp;<span style="color: #b5e853">CHAPTER X</span></p>
        <p>&ensp;&ensp;<span style="color: #b5e853">TOPIC X.Y</span></p>
        <p>&ensp;&ensp;&ensp;<span style="color: #b5e853">Technique related to TOPIC X.Y</span></p>
    </div>
        <div class="column4">
        <p><span style="color: #b5e853">EXERCISE SECTION</span></p>
        <p>&ensp;<span style="color: #b5e853">CHAPTER X</span></p>
        <p>&ensp;&ensp;<span style="color: #b5e853">TOPIC X.Y</span></p>
        <p>&ensp;&ensp;&ensp;<span style="color: #b5e853">Exercises for TOPIC X.Y</span></p>
    </div>
        <div class="column4">
        <p><span style="color: #b5e853">CAPSTONE SECTION</span></p>
        <p>&ensp;<span style="color: #b5e853">CHAPTER X</span></p>
        <p>&ensp;&ensp;<span style="color: #b5e853">Capstone exercises for CHAPTER X</span></p>
    </div>
</div>
<div class="row" style="font-size: 10px">
    <div class="column4">
        <p><span style="color: #b5e853">LAB SECTION</span></p>
        <p>&ensp;<span style="color: #b5e853">LAB X</span></p>
        <p>&ensp;<span style="color: #b5e853">LAB Y</span></p>
        <p>&ensp;<span style="color: #b5e853">SIMULATION Z</span></p>
    </div>
</div>

This structure helped me a lot in quickly finding exactly what I needed, without having to sift through technique information buried under theoretical concepts or notes from exercises I had completed, for example. Experiment with different approaches, but take the time you need to structure a strategy that allows you to organize a large amount of information in a way that works best for you, even after you’ve passed the certification exam.

<div class="row">
  <div class="column3"><a href="/pages/blog/0-earn-oscp/1-first-considerations" style="font-size: 18px">Back<< 1. First considerations</a></div>
  <div class="column1"></div>
  <div class="column3"><a href="/pages/blog/0-earn-oscp/3-improve-programming-skills" style="font-size: 18px">Next>> 3. Improve your programming skills</a><div>
</div>