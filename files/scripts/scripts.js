/**
 * Created by samuel.ajetunmobi on 21/04/16.
 */
$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        items:3,
        loop:true,
        autoplay:true,
        //autoplayTimeout:1000,
        dots: true,
        autoHeight: true,
        autoWidth:true,
        autoplayHoverPause:true
    });

    $('.venobox').venobox();

    $('.scroll-pane').jScrollPane();
});