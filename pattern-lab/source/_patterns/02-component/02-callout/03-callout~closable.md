---
title: Making Closable
---
Pair the callout with the close button component and `data-closable` attribute to create a dismissable alert box.

Any element can be used as a close trigger, not just close button. Adding the attribute `data-close` to any element within the callout will turn it into a close trigger.

When using the `data-closable` attribute, you can optionally add Motion UI classes to the attribute to change the closing animation. If no class is added, the plugin defaults to jQuery's `.fadeOut()` function.

