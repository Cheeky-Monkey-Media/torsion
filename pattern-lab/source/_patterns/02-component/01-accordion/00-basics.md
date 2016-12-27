---
title: Basics
---
The container for an accordion needs the class `.accordion`, and the attribute `data-accordion`. Note that in these examples, we use a `<ul>`, but you can use any element you want.

```
<ul class="accordion" data-accordion></ul>
```

Inside the accordion, place a series of panes with the class `.accordion-item` and the attribute `data-accordion-item`. To mark which pane should be open by default, add the class `.is-active` to that pane.

Each pane has a title, an `<a>` with the class `.accordion-title`, and a content area, an element with the class `.accordion-content` and the attribute `data-tab-content`.
