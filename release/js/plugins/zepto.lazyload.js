!function(o){var n={effect:null,offsetTop:0};o.fn.lazyload=function(f){function e(){console.log(c);var n=o(window).height()+o(window).scrollTop();c>=t.length-1&&o(window).off("scroll",e),t.each(function(e,t){var i=o(t).offset().top-f.offsetTop;n>=i&&(t.isOver||(t.isOver=!0,c=e,t.src=o(t).data("src"),o(t).on("load",function(){f.effect?o(t).fadeIn():o(t).show()})))})}f=o.extend(n,f);var t=o(this);t.each(function(o,n){n.isOver=!1});var c=0;e(),o(window).on("scroll",e)}}(Zepto);