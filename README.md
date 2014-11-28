## About Ghost-Translate
**Ghost Translate** is a short jquery plugin to add several language into yout Ghost posts.

## Instalation
Clone or download this repository into your Ghost themes and add the plugin into your *default.hbs* template.

    <script src="{{asset "lib/ghost-translate/ghost-translate.js"}}"></script>

To initialise the plugin, past this code into your main javascript file:

``$('.post-content').ghostTranslate();``

**.post-content** is the post container find into *post.hbs* template.

## Options

### Add language
Define your language into the "lang" options:

    "lang": [
        {
            "name": "Anglais",
            "short": "en"
        },
        {
            "name": "Français",
            "short": "fr"
        }
    ]
    
### Selector type
Actualy, the plugin can create two type of selector: **List** or **Select**.

To choose, change the "type_selector" option:
``"type_selector": "list" // or "select"``

### Post content class
``"container": "post-content"```

### Home excerpt class
``"excerpt": "post-text"``

### Final code
    $('.page-wrapper').ghostTranslate({
        "lang": [
            {
                "name" : "Francais",
                "short": "fr"
            },
            {
                "name" : "English",
                "short": "en"
            }
        ],
        "type_selector": "list",
        "container": "post-content",
        "excerpt": "post-text"
    });

## In your post
Now the plugin is installed and initialized.
In your Ghost post, separate each language with this:
    
    == start en ==
        <p>Your content</p>
    == end end ==
    
    == start fr ==
        <p>Votre contenu</p>
    == end fr ==


## TO-DO

- add jquery.cookie

## CHANGELOG

### 0.0.3
Format home excerpt

### 0.0.2
Check if any language is display

### 0.0.1
First commit