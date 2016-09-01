$(function(){
    //Hide Fallbacks on Window Load
    $('#riseUp').addClass('display-none');
    $('.season_wrapper').addClass('display-none');
    $('.seasonHeading').addClass('display-none');
    $('.season_wrapper_js').addClass('pulse')
    
    //Display Javascript Enabled Options
    $('.season_wrapper_js').removeClass('display-none');
    $('#season_widget').removeClass('display-none');
    
    // SEASON SECTION SELECT AND TOGGLE DOWN
    
    function slide (e) {
        var el;
        if (!e) {
            e = window.event;
        }
        el = e.target || e.srcElement;
        var nextSibel = el.nextElementSibling;
        nextSibel.classList.toggle('display-none');
    }
    var elseasonWrapper_js = document.getElementsByClassName('season_wrapper_js');
    var seasonWrapper = document.getElementsByClassName('season_wrapper');
   
    for (var i = 0; i < elseasonWrapper_js.length; i++) {
   elseasonWrapper_js[i].addEventListener('click', function(e){
           slide(e); 
       this.classList.toggle('pulse');
     }, false);
   }
         
    //-------NAVIGATION----------------//
    var clicked = false;
    $('nav').removeClass('fallback_nav');
    $('nav').addClass('js');
    $('nav').hide();
    $('#circle').removeClass('display-none');
    $('#circle').click(function(){
        if(!clicked){
            $('nav.js').slideToggle(1000, "swing");
            $('#circle').animate({top: '400px'},1000,'swing');
            return clicked = true;
        }
         if(clicked){
            $('#circle').animate({top: '165px'},1000,'swing');
            $('nav.js').slideToggle(1000, "swing");
            return clicked = false;
           }  
    });
    
    //---------CLEAR NAV ACTIVE-------------//
    
    var sections = $('section')
  , nav = $('.clear-bar')
  , nav_height = nav.outerHeight()-292;
 
$(window).on('scroll', function () {
  var cur_pos = $(this).scrollTop();
  sections.each(function() {
    var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();
    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('img').removeClass('active');
      sections.removeClass('i');
    
      $(this).addClass('i');
      nav.find('a[href="#'+$(this).attr('id')+'"] img').addClass('active');
    }
  });
});


    

    $(window).scroll(function(){

       var scroll = $(window).scrollTop();                

       if (scroll > 2 ) {
           $('.clear-bar').addClass('display-trans');
        }
       if (scroll <= 1 ) {
           $('.clear-bar').removeClass('display-trans');
        }

    });
      
    // WAYPOINTS ACTION SCRIPTS
    
    $('#bio_section').waypoint(function(){
    $('#bio_section .sectionIcon').toggleClass('rotate');
    $('#riseUp').toggleClass('bryanGuide');
    $('#riseUp').toggleClass('display-none');
    $('#season_widget').removeClass('fix_pos');
    $('#season_widget').addClass('ab_pos');
    });
    
    $('#trip_section').waypoint(function(){
      $('#trip_section .sectionIcon').toggleClass('waves');
      $('#fleet_section .sectionIcon').hide();
    });
    
    $('#fleet_section').waypoint(function(){
      $('#fleet_section .sectionIcon').show();
      $('#fleet_section .sectionIcon').toggleClass('rock');  
    });
    
    $('#contact_us').waypoint(function(){
       $('input[name="fullname"]').focus(); 
    });
    
    
   // SELECT CHECKED INTERESTED SEASONS PUT IN MESSAGE AREA
    var arr = [];
    $('textarea[name="message"]').focusin(function(){
    var checkedBoxs = $('input[type="checkbox"]:checked');
         checkedBoxs.each(function(){
        arr.push($(this).attr('value'));
        });// array is filled with checked items
        
        
        
    var msg = "I am interested in the following season(s):"; 
    $('textarea[name="message"]').html(msg);
        
       
    
        for (var i = 0; i < arr.length; i++){
            $('textarea[name="message"]').append(" \n " + arr[i]);
         }
        $('textarea[name="message"]').append('\n My special requests are:');
   }); 
    $('textarea[name="message"]').focusout(function(){
        arr = [];
     });
    
    
    
    
});