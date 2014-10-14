var CHARACTER = (function ($) {
    "use strict";
    
    var character = null,
        position = {},
        facing = "down",
        walking = false,
        
        /*
         * For consistency, adjusting the character's speed also requires
         * adjusting the walk cycle duration (inversely) in _character.scss
         */
        speed = 2,
        currentOffset = 0,
        defaultOffset;
    
    return {
        /**
         * Initiate the walking process when the character is still
         * Add classes to face the given direction
         * @private
         * 
         * @param {String} direction - direction to walk, up/down/left/right
         */
        _startWalk: function (direction) {
            // Toggle direction class
            character.removeClass(facing).addClass(direction);
            character.addClass("walking");
            
            // Cache new direction
            facing = direction;
            walking = true;
            
            this._walk(direction);
        },
    
        /**
         * Walk in the provided direction
         * Update the current character's position and offset relative to the initial
         * position
         * Moves the camera when reaching the edges of the window (extract)
         * @private
         * 
         * @param {String} direction - direction to walk, up/down/left/right
         * 
         * TODO: Repeated code, needs to be extracted
         */
        _walk: function (direction) {        
            switch (direction) {
            case "up":
                if (position.top > 0) {
                    position.top -= speed;
                    this._setPosition();
                    
                    if ((position.top - 50 <= currentOffset) &&
                         (currentOffset - defaultOffset >= 0)) {
                        this._stopWalk();
                        this._changeCameraPosition(currentOffset - defaultOffset);
                        currentOffset -= defaultOffset;
                    }
                }
                break;
            case "down":
                if (position.top < $(document).height()) {
                    position.top += speed;
                    this._setPosition();
                    
                    if ((position.top >= defaultOffset + currentOffset) &&
                         (defaultOffset + currentOffset < $(document).height())) {
                        this._stopWalk();
                        this._changeCameraPosition(defaultOffset + currentOffset);
                        currentOffset += defaultOffset;
                    }
                }
                break;
            case "left":
                if (position.left > 0) {
                    position.left -= speed;
                    this._setPosition();
                }
                break;
            case "right":
                if (position.left < $(document).width() - 50) {
                    position.left += speed;
                    this._setPosition();
                }
                break;
            default:
                break;
            }
        },
        
        /**
         * Instructs the character to stop walking
         * @private
         */
        _stopWalk: function () {
            if (walking) {
                character.removeClass("walking");
                walking = false;
            }
        },
        
        /**
         * Sets the character's position using translate properties
         * and the previously assigned values
         * @private
         */
        _setPosition: function () {
            character.css("transform",
                          "translateZ(" + position.depth + "px) " +
                          "translateY(" + position.top + "px) " +
                          "translateX(" + position.left + "px)");
        },
        
        /**
         * Animates the camera to a new position relative to the
         * top of the document
         * @private
         * 
         * @param {Number} newPosition - new offset from the top
         */
        _changeCameraPosition: function (newPosition) {
            $("html, body").animate({ scrollTop: newPosition }, 600);
        },
        
        /**
         * Starts the modules
         */
        initialize: function () {
            this.bindUI();
            $(window).scrollTop(0);
        },
        
        /**
         * Binds the module's functionality to the DOM
         */
        bindUI: function () {
            if ($(".character").length > 0) {
                character = $(".character");
                position.depth = 20;
                position.top = 50;
                position.left = ($(window).width() / 2) - 25;
                defaultOffset = $(window).height() / 3 * 2;
                
                this._setPosition();
            }
        },
        
        /**
         * Updates the module and DOM when the window is resized
         */
        resizeWindow: function () {
            defaultOffset = $(window).height() / 5 * 4;
        },
        
        /**
         * Starts or continues the character's walking cycles
         *
         * @param {String} direction to walk to - up/left/right/down
         */
        walk: function (direction) {
            if (!walking) {
                this._startWalk(direction);
            } else {
                this._walk(direction);
            }
        },
        
        /**
         * Stops the character's walking cycle
         */
        stopWalk: function () {
            this._stopWalk();
        }
    };

}($));

$(window).on("keydown", function (event) {
    "use strict";
    
    switch (event.keyCode) {
    case 38:
        // Up
        event.preventDefault();
        CHARACTER.walk("up");
        break;
    case 40:
        // Down
        event.preventDefault();
        CHARACTER.walk("down");
        break;
    case 37:
        // Left
        event.preventDefault();
        CHARACTER.walk("left");
        break;
    case 39:
        // Right
        event.preventDefault();
        CHARACTER.walk("right");
        break;
    default:
        break;
    }
});

$(window).on("keyup", function (event) {
    "use strict";
    
    switch (event.keyCode) {
    case 38:
    case 40:
    case 37:
    case 39:
        CHARACTER.stopWalk();
        break;
    default:
        break;
    }
});

$(window).on("resize", function (event) {
    CHARACTER.resizeWindow();
});

$(function () {
    "use strict";
    
    CHARACTER.initialize();
});