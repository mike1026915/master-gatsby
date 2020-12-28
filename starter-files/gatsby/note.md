devtool
$r for current selected component

  :root {
    --red: #FF4949;
    --black: #2E2E2E;
    --yellow: #ffc600;
    --white: #fff;
    --grey: #efefef;
  }

# Why images make your website slow and what Gatsby do for you

1. Too big, not compressed
1.1 loseless: make it as small and not lost the quality
1.2 lossy compression: make it small but lost the quality

2. No correct width / width

3. poor loading performance

4. not right format

it will help you change size and format

other processing tool online to help you transform size and format(If you don't want to use your own computing power)
sanity image pipeline
Cloudinary
Imgix

Subgrid is where children of another child will align themselves to a grand parent grid

Page query (build time)
- Can be dynamic with variable
- Can only be run on a top level page

static query
- Can not be dynamic, no variables can be passed in
- Can be run anywhere

gatsby-browser.js (page loaded or page has been generated之後才執行)
The file gatsby-browser.js lets you respond to actions within the browser, and wrap your site in additional components. The Gatsby Browser API gives you many options for interacting with the client-side of Gatsby.

gatsby-ssr.js (generated on server)
The file gatsby-ssr.js lets you alter the content of static HTML files as they are being Server-Side Rendered (SSR) by Gatsby and Node.js. To use the Gatsby SSR APIs, create a file called gatsby-ssr.js in the root of your site. Export any of the APIs you wish to use in this file.

The APIs wrapPageElement and wrapRootElement exist in both the SSR and browser APIs. If you use one of them, consider if you should implement it in both gatsby-ssr.js and gatsby-browser.js so that pages generated through SSR with Node.js are the same after being hydrated with browser JavaScript.

hotspot is always visible