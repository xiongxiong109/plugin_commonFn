define(function(e){function t(){n.style.left=Math.ceil(n.offsetLeft+.05*(o-n.offsetLeft))+"px",f=requestAnimationFrame(t),n.offsetLeft>=o&&cancelAnimationFrame(f)}e("animationFrame");var n=document.querySelector("#box"),f=null,o=500;t()});