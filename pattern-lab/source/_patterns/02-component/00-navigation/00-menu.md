---
title: Basic Menu
---
All versions of the menu are a `<ul>` filled with `<li>` elements containing links. By default, a Menu is horizontally oriented.

Add the class `.active` to any `<li>` to create an active state. You could apply this server-side to mark the active page, or dynamically with JavaScript.

Because the padding of the menu item is applied to the `<a>`, if you try to add an item that's text only, it will be misaligned. To get around this, add the class `.menu-text` to any `<li>` that doesn't have a link inside of it.
