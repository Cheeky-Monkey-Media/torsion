# **CMM Coding Standards**

* **Syntax**

    * CSS

        * We follow a BEM-inspired syntax, classname can be broken as such:

            * **Components**

                * Page modules that has a certain purpose and is a wrapper for it’s children, in example a modal or a slider can be a component

            * **Elements**

                * Parts of which a component can consist, sometimes similar across components

            * **Variants**

                * A component and its containing elements which are modified in a certain way

            * **States**

                * The state of a component or nested element is modified by user interaction, for example a disabled button

            * Class names should be delimited with a hyphen (-):

                * .class-name

            * Elements are delimited by 2 underscores (__):

                * .component__element

            * Variants are delimited by 2 hyphens (--):

                * .component--variant

            * States are indicated by appending an additional class beginning with is- or has-:

                * .component.is-active

            * It is important to know when BEM scope starts and stops. As a rule, BEM applies to self-contained, discrete parts of the UI.

    * JS

    * HTML

    * Twig

    * PHP

        * Always use <?php ?> to delimit PHP code, not the shorthand, <? ?>.

        * Lines should have no trailing whitespace at the end.

        * All blocks at the beginning of a PHP file should be separated by a blank line.

        * In general, all lines of code should not be longer than 80 characters.

        * Functions should be called with no spaces between the function name, the opening parenthesis, and the first parameter.

        * Arrays should be formatted with a space separating each element.

        * Always use a space between the dot and the concatenated parts to improve readability.

        * For more info, see:[ https://www.drupal.org/docs/develop/standards/coding-standards](https://www.drupal.org/docs/develop/standards/coding-standards)

* **Formatting**
    * CSS/SASS
        * Rulesets should adhere to the following structure, for example:
````
.foo,
.foo--bar,
.baz {
  display: block;
  background-color: green;
  color: red;
}
````
* CSS is markup, SASS is a programming language. Aim for more readability with SASS.
* a space before our opening brace ({)
* properties and values on the same line
* a space after our property–value delimiting colon (:)
* each declaration on its own new line
* the opening brace ({) on the same line as our last selector
* our first declaration on a new line after our opening brace ({)
* our closing brace (}) on its own new line
* each declaration indented by two (2) spaces
* a trailing semicolon (;) on our last declaration
* CSS should be written across multiple lines, except in very specific circumstances. Examples include rulesets that contain only a single declaration and rulesets that include simple variant styles for easy scanning.
* JS
    * Similar standards to CSS/SASS
    * Function names: use lower case first word, capital letter for any other word, no space, hyphen, underscore - function fooBar() {} (camelCase)
    * Variable names: Use lower case and underscore for variable names - foo_bar (snake case).
* HTML
* Twig
    * Variables: Snake case.
    * For more detailed formatting examples, see:[ http://twig.sensiolabs.org/doc/coding_standards.html](http://twig.sensiolabs.org/doc/coding_standards.html)
* PHP
    * Refer to the drupal coding standards[ https://www.drupal.org/docs/develop/standards/coding-standards](https://www.drupal.org/docs/develop/standards/coding-standards)

* **Indentation**
    * CSS
        * Two spaces is the standard. As well as intending individual declarations, indent entire related rulesets to signal their relation to one another, for example:
````
.foo {
  margin: 0;
  }
  .foo__bar {
    padding: 10px;
  }
  .foo__baz {
    margin: 20px;
  }
````
* SASS

    * Ensure you leave a blank line before and after the nested ruleset (unless the ruleset has none yet):
````
.foo {
  color: white;

  .bar {
    color: red;
  }
  
  .morefoor {
    .morebar {
      z-index: 10;
    }
  }
}
````
* JS

    * Like with SASS, aim for readability.

    * Two spaces is the standard.

* HTML

    * Two spaces is the standard.

* Twig

    * Two spaces is the standard.

    * Indent your code inside tags

    * Do not put any spaces before and after the opening and the closing of arrays and hashes

    * Do not put any spaces after an opening parenthesis and before a closing parenthesis in expressions:

    * For more detailed coding standards, see:[ http://twig.sensiolabs.org/doc/coding_standards.html](http://twig.sensiolabs.org/doc/coding_standards.html)

* PHP

    * Use an indent/tab of 2 spaces, with no tab characters.

