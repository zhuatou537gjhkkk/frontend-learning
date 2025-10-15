/*
    Editorial by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

    var $window = $(window),
        $body = $('body'),
        $sidebar = $('#sidebar'),
        $main = $('#main');

    // Breakpoints.
    breakpoints({
        xlarge: ['1281px', '1680px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: [null, '480px']
    });

    // --- CODE FROM MASSIVELY TEMPLATE (for animations) ---

    // Scrolly.
    $('.scrolly').scrolly({
        speed: 1500
    });

    // Intro.
    var $intro = $('#intro');
    if ($intro.length > 0) {
        // Hide intro on scroll past.
        $intro.scrollex({
            mode: 'top',
            leave: function () {
                $body.addClass('is-scrolled');
            },
            enter: function () {
                $body.removeClass('is-scrolled');
            },
        });
    }

    // Posts.
    var $posts = $('.posts');
    $posts.each(function () {
        var $this = $(this),
            $article = $this.find('article'),
            $handler = $this.find('.handler'),
            $queue = [];

        $article.each(function () {
            var $this = $(this);
            $this.scrollex({
                top: '30vh',
                bottom: '30vh',
                initialize: function () {
                    $this.addClass('is-inactive');
                },
                enter: function () {
                    $this.removeClass('is-inactive');
                }
            });
        });
    });

    // --- ORIGINAL CODE FROM EDITORIAL TEMPLATE ---

    // Play initial animations on page load.
    $window.on('load', function () {
        window.setTimeout(function () {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Toggle sidebar.
    $('<a href="#sidebar" class="toggle">Toggle</a>')
        .appendTo($sidebar)
        .on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            $sidebar.toggleClass('inactive');
        });

    // Events.

    // Clicks.
    $main.on('click', function (event) {
        if ($sidebar.hasClass('inactive')) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        $sidebar.addClass('inactive');
    });

    $sidebar.on('click', 'a', function (event) {
        if (breakpoints.active('small')) {
            var $a = $(this),
                href = $a.attr('href'),
                target = $a.attr('target');

            event.preventDefault();
            event.stopPropagation();

            if (!href || href == '#' || href == '')
                return;

            $sidebar.addClass('inactive');

            setTimeout(function () {
                if (target == '_blank')
                    window.open(href);
                else
                    window.location.href = href;
            }, 500);
        }
    });

    // Menu.
    var $menu = $('#menu'),
        $menu_openers = $menu.find('.opener');

    // Openers.
    $menu_openers.on('click', function (event) {
        event.preventDefault();
        $menu_openers.not(this).removeClass('active');
        $(this).toggleClass('active');
    });

})(jQuery);