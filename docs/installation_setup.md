# CMM Installation and Setup
This document outlines the steps/processes that should be taken for getting the front-end of a new development project setup.

## General Approach
Review Scalable And Modular Architecture For CSS (SMACSS) documentation to work towards a more modular approach - what is common, what is custom, what can we reuse?

## Front-End Development Guidelines
* ### Theme Directory
  * #### Drupal 8
    * Ideally, all custom themes should be put in the `your-project/themes/custom directory`.  Themes found in this directory are available to all sites.
    * If it’s a multisite, the `your-project/sites/your_site_name/themes` directory shou
ld be used to restrict themes to a specific site instance.
  * #### Drupal 7
    * All custom themes should be put in the `your-project/sites/all/themes/custom directory`.
    * If it’s a multisite, the `your-project/sites/your_site_name/themes` directory should be used to restrict themes to a specific site instance.
* ### Foundation Framework
  * Please use built in foundation plugins and abilities before reaching out to a third party source, for things like carousels etc…
  * Foundation Documentation: http://foundation.zurb.com/sites/docs/global.html
 
## Installing Dependencies
**The following installation instructions are in cases where we’re `NOT` using a virtual machine for development.**
 * ### Installing Node.js (Optional - In case we’re not using a VM)
   * **Windows**
     * Download the Windows installer from nodejs.org
     * Run the installer (the .msi file that you just downloaded)
     * Follow the prompts in the installer and accept the default installation settings
     * That’s it!
     * For more info see: http://blog.teamtreehouse.com/install-node-js-npm-windows
  * **MacOS / Linux**
  * Make sure you have Xcode installed
    * To install: Download from Apple App Store
  * Make sure you have Homebrew installed
    * To install: Type: `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
    * Open your Terminal app and type: brew install node
    * That’s it!
    * For more info see: http://blog.teamtreehouse.com/install-node-js-npm-mac
  * ### Installing Gulp (Optional - In case we’re not using a VM or this a first time installing gulp)
    * Open your terminal/command prompt
    * Type: `npm install -g gulp`
    * For more info see: https://coolestguidesontheplanet.com/installing-gulp-on-osx-10-11-el-capitan
  * ### Installing Bower (Optional - In case we’re not using a VM or this a first time install bower)
    * Open up your terminal/command prompt
    * Type: `npm install bower -g`

  * ### Setting Up Your Code Editor
    * #### Sublime
        * **Emmet**
          * Open the Command Palette
          * Type: `install` and select Package Control: Install Package
          * Type: `emmet and` select the Emmet plugin
        * **Sublime Linter**
          * Open the Command Palette
          * Type: `install` and select Package Control: Install Package
          * Type: `linter` and select SublimeLinter plugin
    * ###### `Todo: Add more code editing software`
