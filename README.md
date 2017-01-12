# Playable portfolio

Work in progress, making a character walk through a page in order to reveal new sections.

Running example can be found at https://claudiamatosa.com/code/playable-portfolio

## The code

Located under `app/`

## To use

It is currently in prototype phase - only the character walk is done. Please use the arrow keys to move the character.

Once the character reaches the bottom of the page, it will reveal a new part of the window.

## To build

In order to build the project, Ruby, Compass and SASS need to be installed. Afterwards:

    npm install
    bower install
    grunt build

Additionally, `grunt serve` can be used to launch a local dev instance of the project.
    
## Tools

- SASS for CSS
- jQuery for modules
- Yeoman for project 

## Some notes on the process

- Atomic CSS
- Module pattern for JS

## TODO
- Build new sections with information
- Go vanilla
- Test character.js
- Get a templating system (all html is currently under index.html
- Document
- Favicon
- Proper character 
- Etc
