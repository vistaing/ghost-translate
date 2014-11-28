/**
*   Name:           Ghost Translate Plugin
*   By:             @osternaud_clem
*   Description:    Ghost-Translate.js is a short jquery plugin to add several language into yout Ghost posts.
*   Version:        0.0.3
*/

(function ($) {
    $.fn.ghostTranslate = function (options) {

        var defauts = {
            "lang": [
                {
                    "name": "Anglais",
                    "short": "en"
                },
                {
                    "name": "Français",
                    "short": "fr"
                }
            ],
            "type_selector": "list",
            "container": "post-content",
            "excerpt": "post-text",
            "cookie": false
        },
            p = $.extend(defauts, options);

        return this.each(function () {
            var container = $('.' + p.container),
                excerpt = $('.' + p.excerpt),
                defauts = p.lang[0].short,
                allContent = container.html(),
                regExp = new RegExp("== start ([^]+)");       
            
            format_excerpt(p.lang, container, excerpt);

            if (!regExp.exec(allContent)) {
                return false;
            }
            
            container.html('');

            create_select(p.lang, p.type_selector, container);

            $('.ghost-select-lang').after('<div class="ghost-translate-content"></div>');

            $('.ghost-translate-content').html(get_translate(defauts, allContent));

            change_lang(p.type_selector, allContent);

        });
        
        
        /**
            Get the translation content 
        **/
        
        function get_translate(lang, content) {
            var regExp = new RegExp("== start " + lang + " ==([^]+)== end " + lang + " =="),
                matches = regExp.exec(content);
            
            return matches[1];
        }
        
        /**
            Create lang selector (List or Select)
        **/
        function create_select(langs, type, container) {
            var lang = null;
            
            if (type === 'list') {
                container.prepend('<ul class="ghost-select-lang"></ul>');
                
                $.each(langs, function (val) {
                    lang  = langs[val];
                    $('.ghost-select-lang').append('<li class="lang-item" data-lang="' + lang.short + '">' + lang.name + '</li>');
                });
            } else {
                container.prepend('<select class="ghost-select-lang"></select>');

                $.each(langs, function (val) {
                    lang  = langs[val];
                    $('.ghost-select-lang').append('<option value="' + lang.short + '">' + lang.name + '</option>');
                });
            }
        }
        
        /**
            Change content language by cliking or changing the selector
        **/
        function change_lang(type, content) {
            if (type === 'list') {
                $('.ghost-select-lang .lang-item').click(function () {
                    var lang = $(this).data('lang');
                    $('.ghost-translate-content').html(get_translate(lang, content));
                });
            } else {
                $('.ghost-select-lang').change(function () {
                    var lang = $(this).val();
                    $('.ghost-translate-content').html(get_translate(lang, content));
                });
            }
        }
        
        /**
            Remove language tag of excerpt
        **/
        function format_excerpt(langs, content, excerpt) {
            var excerpt_content = null;
            
            excerpt.each(function (val) {
                excerpt_content = $(this);
                 $.each(langs, function (val2) {
                    excerpt_content.text(excerpt_content.text().replace('== start ' + langs[val2].short + ' ==', ''));
                    excerpt_content.text(excerpt_content.text().replace('== end ' + langs[val2].short + ' ==', ''));
                });
            });
           
        }
    };
})(jQuery);