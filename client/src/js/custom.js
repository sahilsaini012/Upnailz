// custom javascript goes here
$(function() {

    $('.our-work-slider').owlCarousel({
        loop: true,
        margin: 0,
        navigation: false,
        singleItem: true,
        stagePadding: 0,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 1,
          },
          768: {
            items: 1,
          },
          992: {
            items: 1,
          },
          1280: {
            items: 1,
          },
          1366: {
            items: 1,
          },
          1600: {
            items: 1,
          },
        }
      });
      
      
    //   tooltip

    
});



// $(document).ready(function() {
//   // Show the first tab content by default
//   $("#tab1").addClass("active").show();

//   $(".tab-link").click(function() {
//       var tabId = $(this).attr("data-tab");

//       $(".tab-link").removeClass("active");

//       $(".tab-content").removeClass("active").hide();

//       // Add active class to the clicked tab link and show the corresponding tab content
//       $(this).addClass("active");
//       $("#" + tabId).addClass("active").fadeIn();
//   });
// });