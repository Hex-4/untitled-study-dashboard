<p align="center">
  <img src="https://cloud-awa2avyys-hack-club-bot.vercel.app/0mosaic-logo.png.png"  />
  <br>
  <br>
  a dashboard for getting things done.
</p>

---

I have a problem - I really love the idea of a dashboard-ish thingy, with rearrangable widgets that let you get stuff done. But all the things I've found are either proprietary, confusing, or not suited to my use case. So, well, I took things into my own hands.

Mosaic is a customizable dashboard for getting things done. Drag, resize, rotate, and configure a variety of widgets, and craft a space fine-tuned to you.

Try it out at [mosaic-dash.pages.dev](https://mosaic-dash.pages.dev)!

## Features

- **4** different widgets, with more being added as I need them! These include:
- A configurable pomodoro timer!
- A clock
- A text editor, with checklist and Markdown support (powered by [Quill](https://quilljs.com))
- A random quote, sourced from this [API](https://qapi.vercel.app/) i found
- Fullscreen!
- Configurable background URL!
- Other stuff I probably forgot about too!

## How to use

To add widgets, click on the plus icon in the bar in the bottom left. This'll open up a menu where you can select a widget. Click on one to add it!

Edit mode is off by default. To remove, configure, resize, and rotate widgets, click on the pencil icon in the bar. Click on it again to disable edit mode.

Toggle fullscreen with the maximize/minimize button in the bar.

Open global settings with the gear icon in the bar. Here you can set a different background URL.

## Making

Mosaic is a weird mishmash of [Svelte](https://svelte.dev) and [Astro](https://astro.build). I'm not really sure why I used Astro instead of something like SvelteKit. It definitely would have made the code a lot cleaner. Anyways, I also used [Tailwind](https://tailwindcss.com) because, well, who doesn't these days? It makes development way faster, make sure to check it out if you don't know what it is.

The code is a mess, but a general overview is that a widget template is defined, which widgets slot into and extend. Then, the widget picker adds the widget to a shared list, which is then looped over and instantiated in a parent component. Settings works by having a shared array of settings - when the settings icon on a widget is clicked, it sets the array to its settings and the settings box reads from that. There was probably a much better way to do that but hey, it works!

If you're me from the future (unlikely) or want to run a dev server and check out my terrible code (also unlikely), I suggest [Bun](https://bun.sh). Simply:

```sh
bun i
bun dev
```

## Credits

Thank you to:

- All the libraries I used: Svelte, Tailwind, Quill, Astro, [subjx](https://github.com/nichollascarter/subjx), and [screenfull](https://www.npmjs.com/package/screenfull)
- ChatGPT (lol) for providing some debugging and ideation
- The really nice ding sound on the pomodoro by <a href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=36029">freesound_community</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=36029">Pixabay</a>
- [Hack Club](https://hack.club) & [High Seas](https://highseas.hackclub.com) for providing the motivation & community that pushed me to finish this
- You, for reading to the end! ❤️

![Mosaic screenshot](https://cloud-gd5pxktgk-hack-club-bot.vercel.app/0image.png)