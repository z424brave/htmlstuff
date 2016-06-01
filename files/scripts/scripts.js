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

    /**
     * Initialise Twitch.tv indicator
     */
    $.getJSON("https://api.twitch.tv/kraken/streams/totalwarofficial.json?callback=?", function(c) {
        if (c.stream == null) {
            $('.icon-twitch').removeClass('twitch-active').addClass('twitch-inactive').attr('title', 'Twitch channel [totalwarofficial] is not online.');
        } else {
            $('.icon-twitch').removeClass('twitch-inactive').addClass('twitch-active').attr('title', 'Twitch channel [totalwarofficial] is online now!');
        }
    });
});