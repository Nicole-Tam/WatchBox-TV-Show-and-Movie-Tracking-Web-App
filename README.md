# WatchBox Tracker Web App
## <u><b>Context</b></u>
My Web App “WatchBox” is a tracking app for TV shows and Movies. It’s designed to help movie and TV show enthusiasts keep track of their content, and can be used to sort their current, past and future watching preferences. It serves as a digital diary for their viewing entertainment, allowing for users to maintain a record of their favourite movies and tv shows, ratings, descriptions, reviews, genres, watched and to watch. It’s suitable for all kinds of shows and movies, as well as people of all ages, due to it’s simplistic and user-centered design. “Watchbox” aims to help users seamlessly log and track their watch habits.

## <u>Things to note</u>
Parcel is installed for future versions, but please run this current version on Node.js (npm run start).

## <u>HTML & CSS Stages</u>
## Initial Development
Firstly, I made the navigation bar, making sure the styles were all correct and the add content button was where I liked it. I utilised flex box to and justify-content: space-between; to make sure that they were symmetrically balanced. I used a CSS reset by Eric Meyer to reset default browser css styles and provide consistency across different browsers. I also added a language attribute for screen reader accessibility.


## Filter Development
I had a little bit of trouble making the filters stay exactly where I wanted to on the page. I was initially going to use CSS selectors to make the watched and to watch sections indent from the rest of the list, but making a subfilter option class seemed to make more sense since there were 4 items that needed to be indented. Furthermore, I didn't know how to make the left side have a line going down it, but this <a href="https://stackoverflow.com/questions/25584359/creating-a-vertical-line-next-to-a-list-item">source</a> solved it really easily by creating a solid line on the left border and a div that encapsulates both objects so that the solid line on the left of the items would be one seamless line like shown in my finalised design.


After some revision, I realised that changing the margin of the "My Content" header made more sense than using li:first-child.

## Table Development
I made the table with the relevant headings, but soon realised that because the filter div was written above and not related to the table, it would display above the table itself. Thus, I needed to either use a CSS Grid or wrap both elements in a section and use flexbox or float to put them side by side. However, the grid was still looking a bit weird. After using Googles' developer tool to see why it looked so weird, I realised it was because I wrapped the table in the scrollable div. So then I fixed it by making the table width 100% instead of 60%, as it was changing it to 60% of the parent div, not the vw. 

I then made a custom scrollbar with the help of <a href="https://www.w3schools.com/howto/howto_css_custom_scrollbar.asp>">W3 Schools</a>.

![Alt text](readme-assets/devtools.png)


However, I ran into some problems when making the table. I realised that for the website to feature the design I wanted it to feature, making each row into individual sections would be better, although more tedious. This was because of the way tables work, I would be unable to customize the gap between rows, and would have to find and test different workarounds to make each row have an individual border radius. For me, making separate divs made more sense, as the CSS for tables and HTML also gets too messy for my liking. But I read that tables are more <a href="https://stackoverflow.com/questions/2617895/actual-table-vs-div-table">semantically correct</a> for tabular data, and even though my data isn't EXACTLY tabular, I decided to try using tables, since I've actually never worked with them before.


After testing, the scrolling div felt too gimmicky, especially since the content in the table is pretty self explanatory. Hence, I decided to remove overflow-x from css.

Furthermore, my images and styling looked really weird. I tried to fix the issue for so long, until I realised it was all because I had put vertical-align in my universal selector. Super obvious, but I don't usually look at my universal selectors because I don't expect myself to change them. It was only when I opened dev tools that it became very obvious to me, as obvious as it had already looked on the page.

## Pop Up Development

I initially wanted to remove the outline of the add new content button, but after reading a few articles on <a href="https://www.a11yproject.com/posts/never-remove-css-outlines/">how important the outline and in particular an outline when a button is focused on is</a>, I decided not to, and to change the outline to white, as well as provide an underline when focused to help accessibility. 
https://www.youtube.com/watch?v=MBaw_6cPmAw

I originally wanted to use CSS Grid, but felt more confident in my ability to use flexbox to style it the way I liked. Regardless, it was a similar layout to css grid, with the divs separating each row. In the future, I would probably use CSS grid because it takes up less space in the code, but for something small like this, I think it's legible.

There was also an issue with the genre select. If I allowed for multiple select, it would appear as a scrollable list, and not a dropdown, as dropdown menus only allow for one option, something I had not anticipated when making my design. Thus, I decided to go with the scrollable list as only one genre select would make the web app less functional.

As for the movie and TV show buttons, disabling the radio buttons and using css styling to create the same design I wanted in my prototype, whilst javascript helped me change the colours when the radio buttons were 'checked', because when the radio buttons are disabled, :checked doesn't work as a css selector.

For the available genres, I allowed for users to select multiple, but only put around 14 different genre options, as most movies fit under at least one given category, and too many genres would get confusing, especially on mobile input.

After the dropdown was done, I used Javascript to store the data in local storage, making sure to have a simple name for each item. I could've called the items by its element.name, but I decided to use ['element-name'] as suggested <a href="https://stackoverflow.com/questions/2435525/best-practice-access-form-elements-by-html-id-or-name-attribute">here.</a>

## Detail Pop Up Development

The development of my details popup was pretty similar to the popup previously, with changed ids to allow for javascript to send task details to those specific containers and an event listener to change the fields to match the item i clicked.

## Left off vs Length

The original idea for TV shows was for the tracker to show the user which season/episode they are on. However, it didn't make much sense for it to track which episode viewers are on when apps like Netflix and DisneyPlus already save that data, and the entered data is unable to be edited, only viewed back. Hence, I changed the left off label to show the length of the show instead.

## Javascript  

Looking back on some of my javascript, I definitely think it could've been simplified: functions couldve been used for some of the event clickers, I could've made my create item make a whole new tbody each time so that I wouldn't need to spend so long fixing the issues with my whitespace td, and if I had used HTML section tags instead of a table it would've made the process easier too. These are definitely things I will keep in mind, and mistakes I will definitely keep making, but hopefully less.

Furthermore, I tried to simplify my javascript code as best I could, but there were definitely many mistakes made in the process, and sometimes it had me wishing that I didn't try to fix it in the first place. When I changed my refresh display code, I overlooked things like the for loops; which direction the i++ was going in, copy and pasting for loops when it should've been i-- instead to work.

When it came to counting the rows, I initially made it much more difficult on myself by making a function that counts the rows with the attribute display-content, rather than making a separate item count, but since it works without an issue, I decided to keep it, and perhaps work on it in the final product. In the end, I realised that it would be really easy to change my filter tool and make it count the rows displayed instead, which is a much better way as the original one would be easily messed up if there was an issue with localStorage.

# Things I learnt through this project
## ID's can be useful!
It sounds pretty obvious doesn't it?

As seen below, I tried to get into the habit of always using either an ID or a class, depending on whether the object was unique or not, factoring potential future development. This was something I didn't do in previous units; sometimes I would only use classes because it felt easier to only rely on one method, but it's much easier looking through the css when items are categorised correctly!

However, this change did confuse me initially, because I kept changing the css properties of the logo, but it wouldn't change because I used the wrong selector... 

![Alt text](readme-assets/image.png)

## Dead code is not good!

I used to think that some dead code is good to leave in case things change in the future. THIS IS NOT THE CASE. If I've already made the background 100% of the viewport height, there's no use having background no repeat in the css code. That css can come if I need to scroll lower than the background height, which I will not need to do so in this project. Hence, remove it unless you know you will use it in the future. Otherwise you will definitely forget about it down the line.

![Alt text](readme-assets/no-repeat.png)

I used to think that some dead code is good to leave in case things change in the future. THIS IS NOT THE CASE. 

## Github is weirdly confusing yet simple
It's great that VS code's git Source Panel makes it much easier to understand, and after you use it for a while you start understanding how to push and commit using the terminal as well.

I was also quite scared to commit changes, because I wanted to make sure everything was perfect and there were no embarrassing mistakes before I committed. But as I committed my initial progress of the nav bar and updated small things that I have overlooked and committed and pushed those again, I realise that there's really nothing to be ashamed about; the point of committing is to show yourself and others the progress you have made, big or small. In fact if you don't update it enough you miss all the small changes you made to perfect it, all the testing and small adjustments in css and flexbox to make it align perfectly, and again, thats the whole point of a repository. 

## Kebab Case!
I didn't know what it was called before. All I knew from previous projects was that camelCase was easy to write, but difficult for me personally to read and debug. I actually thought kebab-case was the same as snake_case, but a kebab is much easier on my pinkies. I still used camelCase for the Javascript because I haven't seen anyone use kebab case in Javascript, and it helps me internally differentiate between my HTML and Javascript.

## USE DEVTOOLS!
For my previous assignment regarding html and css, I rarely used google's developer tool. I would just go through the html and css again and again, reading lines until my eyes bled. It's so much easier finding where you accidentally made a div or made margins too big with dev tools. If only I could go back in time...

It's also useful in basically every other aspect of front-end development

## Should've used SCSS...

Would've been much easier, despite needing to transition what I already had to scss. Will definitely be utilizing it in the future.

## The longer I code for, the lazier I get.

This is all seen with my indentation, formatting, semantic HTML, css headers and ids, javascript function names and variable names. Thinking of simple yet descriptive id and variable names can be challenging, and I often have to go back and change them. Even with semantic HTML, theres so many existing tag names but sometimes I just use div because it's simpler. This is something I'm actively trying to improve, but can be difficult when you feel there is no suitable HTML tag, or when you can't come up with different ID names. The amount of time I spent going back to change names did not justify the amount I saved not doing so to begin with.


![Alt text](readme-assets/devtools2.png)

## Use <b> to bold, use <strong> to semantically emphasise something while also bolding it
It's in the name, but I thought the two were interchangable and mostly used whichever one I felt like. Semantic HTML is the gift that keeps on giving!

## Shift + Alt + F formats your code for you!

## I already knew this, but I still feel like it's invaluable: console.log every single time I run into an error, paired with devtools ofc

## ?? nullish coalescing operator
My first instinct was to make an if statement to check if the localStorage parsed an empty array, but <a href="https://www.w3schools.com/jsref/jsref_operators.asp">this</a> already does it for you! It's also extremely useful in most situations as you can also make it return specific default values.

## font awesome is pretty awesome!
<a href="https://fontawesome.com/search?q=star&o=r&m=free">This resource</a> was extremely helpful for free icons.


## Conclusion
Overall, this was an extremely difficult challenge. I would spend a lot of time combing through errors, trying to make my code better and accidentally introducing another bug. However, I felt that this prototype definitely challenged my skills and forced me out of my comfort zone. Furthermore, there are so many resources online for things similar to this, which really helped my learning and understanding of the code I wrote.


## Sources:
http://meyerweb.com/eric/tools/css/reset/
<br>https://www.w3schools.com/tags/att_lang.asp
<br>https://medium.com/@madhum86/css-font-sizing-pixels-vs-em-vs-rem-vs-percent-vs-viewport-units-b1485716afe7
<br>https://stackoverflow.com/questions/25584359/creating-a-vertical-line-next-to-a-list-item
<br>https://www.w3schools.com/html/html_tables.asp
<br>https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead
<br>https://css-tricks.com/position-sticky-and-table-headers/
<br>https://www.youtube.com/watch?v=MBaw_6cPmAw
<br>https://stackoverflow.com/questions/2617895/actual-table-vs-div-table
<br>https://stackoverflow.com/questions/38870246/html-css-change-color-of-select-arrow
<br>https://www.youtube.com/watch?v=RzLX3bVtssY
<br>https://stackoverflow.com/questions/3072597/semantically-accurate-html5-element-for-a-modal-dialog
<br>https://stackoverflow.com/questions/62155892/how-to-add-border-to-label-when-radio-button-is-selected
<br>https://stackoverflow.com/questions/14589193/clearing-my-form-inputs-after-submission
<br>https://www.w3schools.com/jsref/jsref_operators.asp
<br>https://scrimba.com/scrim/cEr7veuE
<br>https://developer.mozilla.org/en-US/docs/Web/API/Element
<br>https://fontawesome.com/search?q=star&o=r&m=free
