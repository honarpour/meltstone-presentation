## MeltstoneJS Presentation

`meltstone-presentation`

---

### About

A simple and customizable engine for auto-generating minimalistic web-based presentations. Built on [react-app-starter](https://github.com/honarpour/react-app-starter).

---

### How it Works

The MeltstoneJS engine automatically puts pieces of content together to create a web-based presentation.

The engine uses files located in `root/content` as content blocks. These files must be `txt` format and follow this naming pattern: `block$.txt` where `$` is a number representing the order of that block. Content blocks are loaded in order so you can control the flow. After adding your content, build the project to create `root/dist` folder. You can then deploy `dist` folder's content.

After deploying the `dist` folder, if you'd like to update or change the conent, you can do so by updating files located in `root/content` of the deployed presentation without having to make changes to the source code and re-deploying.

---

### Content Blocks

Content blocks, the `txt` files mentioned in the section above, can have three types:

* "header": format: `header:Lorem ipsum`, output: `<h1>` element
* "text": format: `text:Lorem ipsum`, output: `<p>` element
* "image": format: `image:imagename.ext/or/url`, output: `<img>` element
* "link": format: `link:http://url`, output: `<a>` element

---

### Prerequisites

[NodeJS](https://nodejs.org) v6

[Yarn](https://yarnpkg.com) v1

---

### Get Started

1. Setup: `yarn install`

2. Dev: `yarn start` (port 8080)

---

### Other Scripts

Build production: `yarn build`
