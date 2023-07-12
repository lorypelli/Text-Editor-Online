# Text Editor Online
---

A simple online text editor

What can you do?

+ Save text in your computer (it will be also saved in the browser cache automatically)
+ Share text
+ Load text from a local text file

---

You can add url params like `?title=hello&content=how%20are%20you` and it will automatically fill title and content with these params. 
So it can also work as a ***pastebin* service**

## - url params

---

I want to talk more about them because they are fantastic. You can also have a sort of variables. For example if you do `?title=hello&content=$title` also the content will be `hello`

## - session id

---

You can have multiple sessions of the text editor with the param `session-id`. Every session id has a different text saved in the browser cache, so it's fantastic

---

## - tabs

---

You can have multiple tabs on a single session (max 6 tab) using buttons (Tab 1, Tab 2...) or with the param `tab`. Every tab has a different text saved in the browser cache, so it's fantastic

---