(function($){ 
	$.fn.ghostTranslate=function(options){

		var defauts=
		{
      "lang": ["en", "fr"],
			"type_selector": "list",
			"cookie": false
		};  

		var p = $.extend(defauts, options); 

		return this.each(function(){	
			var that = $(this);
			var defauts = p.lang[0];

			var allContent = $(this).html();

			$(this).html('');		

      create_select(p.lang, p.type_selector, $(this));	

      $('.ghost-select-lang').after('<div class="ghost-translate-content"></div>');

      $('.ghost-translate-content').html(get_translate(defauts, allContent));

      $('.ghost-select-lang .lang-item').click(function(){
        var lang = $(this).data('lang');
        $('.ghost-translate-content').html(get_translate(lang, allContent));

      });

    });

		function get_translate(lang, content){
			var regExp = new RegExp("== start "+lang+" ==([^]+)== end "+lang+" ==");

      var matches = regExp.exec(content);

      return matches[1];
    }

    function create_select(langs, type, container){

      if(type == 'list'){
        container.prepend('<ul class="ghost-select-lang"></ul>');

        $.each(langs, function(val){
          lang  = langs[val];
          $('.ghost-select-lang').append('<li class="lang-item" data-lang="'+lang+'">'+lang+'</li>');
        });
      }else{
        container.prepend('<select class="ghost-select-lang"></select>');

        $.each(langs, function(val){
          lang  = langs[val];
          $('.ghost-select-lang').append('<option class="lang-item" data-lang="'+lang+'">'+lang+'</option>');
        });
      }
    }
  };
})(jQuery);