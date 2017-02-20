$(function(){
    
    /*-------------------------------------------------------------------*/
    /*  Project slider. Requires owl carousel plugin.
    /*-------------------------------------------------------------------*/
    $(window).smartload(function(){
        $('.owl-carousel').owlCarousel({
            autoPlay: true,
            slideSpeed : 5000,
            paginationSpeed : 600,
            singleItem: true
        });
    });
});