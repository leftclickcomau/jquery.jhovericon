/*
 * jhovericon
 * Add an icon (or any content) after or before an element on hover.
 * 
 * Leftclick.com.au jQuery plugin library
 * 
 * Copyright (c) 2009 Leftclick.com.au, Ben New
 * 
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

;(function($) {
	
	/**
	 * Initialisation, called when the first parameter to $.fn.jhovericon() is
	 * not a method name.
	 * 
	 * @param elem DOM element being initialised
	 * @param icon First parameter passed to $.fn.hovericon()
	 * @param options Key-value array, second parameter passed to 
	 *   $.fn.hovericon()
	 *   
	 * @return jQuery object
	 */
	var init = function(elem, icon, options) {
		return $(elem).each(function() {
			this.jhovericon = {
				enabled : true,
				icon : $(icon)
			};
			(options.iconPosition == 'before') ? 
					$(this).before(this.jhovericon.icon.hide()) :
					$(this).after(this.jhovericon.icon.hide());
		}).mouseenter(function(event) {
			if (this.jhovericon.enabled) {
				this.jhovericon.icon.stop(null, true).fadeIn(options.fadeInSpeed);
			}
		}).mouseleave(function(event) {
			this.jhovericon.icon.stop(null, true).fadeOut(options.fadeOutSpeed);
		});
	};
	
	/**
	 * Method 'setEnabled'
	 * 
	 * @param elem DOM element being enabled or disabled
	 * @param enabled Boolean, true to enable or false to disable
	 * 
	 * @param jQuery object
	 */
	var setEnabled = function(elem, enabled) {
		return $(elem).each(function() {
			this.jhovericon.enabled = enabled;
			this.jhovericon.icon.stop(null, true).hide();
		});
	};
	
	/**
	 * Initialise a jhovericon, or call a method of jhovericon.  If the first
	 * argument matches a method name, then that method is called.  Otherwise,
	 * the jhovericon is initialised.
	 * 
	 * @initialisation
	 * @param icon DOM element, HTML, or jQuery selector for the "icon" to
	 *   display adjacent to the element being hovered over.
	 * @param options Optional array of options to override defaults.
	 * @param options.iconPosition Either 'before' or 'after', determines where
	 *   in the DOM the icon is placed relative to the selected element.  
	 *   'before' is useful for floated elements.  Default: 'after'
	 * @param options.fadeInSpeed Speed of fadeIn() effect.  Default: 'fast'
	 * @param options.fadeOutSpeed Speed of fadeOut() effect.  Default: 'fast'
	 * @param options.enabled Boolean specifying whether the jhovericon 
	 *   behaviour is intitially enabled.  Default: true
	 * 
	 * @method 'setEnabled'
	 * @param enable False to disable the jhovericon, true to enable it.
	 * 
	 * @return Selected elements.
	 */
	$.fn.jhovericon = function() {
		if (arguments[0] == 'setEnabled' && (typeof arguments[1]).toLowerCase() == 'boolean') {
			return setEnabled(this, arguments[1]);
		} else {
			return init(this, arguments[0], $.extend({}, $.fn.jhovericon.defaultOptions, arguments[1]));
		}
	};
	
	/**
	 * Default options for jhovericon.
	 */
	$.fn.jhovericon.defaultOptions = {
		'iconPosition' : 'after',
		'fadeInSpeed' : 'fast',
		'fadeOutSpeed' : 'fast',
		'enabled' : true
	};
})(jQuery);
