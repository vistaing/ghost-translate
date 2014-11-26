(function($){ 
	$.fn.ghostTranslate=function(options){
 
		var defauts=
		{
			"lang": ["en", "fr"]
		};  
 
		var p = $.extend(defauts, options); 
 
		return this.each(function(){	
			var that = $(this);
			var defauts = p.lang[0];

			var allContent = $(this).html();

			$(this).html('');

			that.prepend('<ul class="ghost-select-lang"></ul>');

			$.each(p.lang, function(val){
    			lang  = p.lang[val];
    			$('.ghost-select-lang').append('<li data-lang="'+lang+'">'+lang+'</li>');
    		});

    		$('.ghost-select-lang').after('<div class="ghost-translate-content"></div>');
    	
    		$('.ghost-translate-content').html(get_translate(defauts, allContent));
    		
    		$('.ghost-select-lang li').click(function(){
    			var lang = $(this).data('lang');
    			$('.ghost-translate-content').html(get_translate(lang, allContent));

    		});
			
		});

		function get_translate(lang, content){
			var regExp = new RegExp("== start "+lang+" ==([^]+)== end "+lang+" ==");
    	
    		var matches = regExp.exec(content);

    		return matches[1];
		}
	};
})(jQuery);