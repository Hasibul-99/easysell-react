import $ from "jquery";
import jQuery from "jquery";

(function($) {
  'use strict';
  $(function() {
    var body = $('body');
    var mainWrapper = $('.main-wrapper');
    var footer = $('footer');
    var sidebar = $('.sidebar');
    var navbar = $('.navbar').not('.top-navbar');


    // Sidebar toggle to sidebar-folded
    $('.sidebar-toggler').on('click', function(e) {
      e.preventDefault();
      $('.sidebar-header .sidebar-toggler').toggleClass('active not-active');
      if (window.matchMedia('(min-width: 992px)').matches) {
        e.preventDefault();
        body.toggleClass('sidebar-folded');
      } else if (window.matchMedia('(max-width: 991px)').matches) {
        e.preventDefault();
        body.toggleClass('sidebar-open');
      }
    });


    // commmented because of apex chart width issue in desktop (in lg not in xl)
    // // sidebar-folded on large devices
    // function iconSidebar(e) {
    //   if (e.matches) {
    //     body.addClass('sidebar-folded');
    //   } else {
    //     body.removeClass('sidebar-folded');
    //   }
    // }
    // var desktopMedium = window.matchMedia('(min-width:992px) and (max-width: 1199px)');
    // desktopMedium.addListener(iconSidebar);
    // iconSidebar(desktopMedium);


    // Settings sidebar toggle
    $('.settings-sidebar-toggler').on('click', function(e) {
      $('body').toggleClass('settings-open');
    });


    // Sidebar theme settings
    $("input:radio[name=sidebarThemeSettings]").click(function() {
      $('body').removeClass('sidebar-light sidebar-dark');
      $('body').addClass($(this).val());
     })



    //Add active class to nav-link based on url dynamically
    function addActiveClass(element) {
        if (current === "") {
          //for root url
          if (element.attr('href').indexOf("index.html") !== -1) {
            element.parents('.nav-item').last().addClass('active');
            if (element.parents('.sub-menu').length) {
              element.closest('.collapse').addClass('show');
              element.addClass('active');
            }
          }
        } else {
          //for other url
          if (element.attr('href').indexOf(current) !== -1) {
            element.parents('.nav-item').last().addClass('active');
            if (element.parents('.sub-menu').length) {
              element.closest('.collapse').addClass('show');
              element.addClass('active');
            }
            if (element.parents('.submenu-item').length) {
              element.addClass('active');
            }
          }
        }
    }

      var current = window.location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
      $('.nav li a', sidebar).each(function() {
        var $this = $(this);
        addActiveClass($this);
      });

    $('.horizontal-menu .nav li a').each(function() {
      var $this = $(this);
      addActiveClass($this);
    })


    //  open sidebar-folded when hover
    $(".sidebar .sidebar-body").hover(
    function () {
      if (body.hasClass('sidebar-folded')){
        body.addClass("open-sidebar-folded");
      }
    },
    function () {
      if (body.hasClass('sidebar-folded')){
        body.removeClass("open-sidebar-folded");
      }
    });


    // close sidebar when click outside on mobile/table    
    $(document).on('click touchstart', function(e){
      e.stopPropagation();

      // closing of sidebar menu when clicking outside of it
      if (!$(e.target).closest('.sidebar-toggler').length) {
        var sidebar = $(e.target).closest('.sidebar').length;
        var sidebarBody = $(e.target).closest('.sidebar-body').length;
        if (!sidebar && !sidebarBody) {
        if ($('body').hasClass('sidebar-open')) {
          $('body').removeClass('sidebar-open');
        }
        }
      }
    });


    //Horizontal menu in mobile
    $('[data-toggle="horizontal-menu-toggle"]').on("click", function() {
      $(".horizontal-menu .bottom-navbar").toggleClass("header-toggled");
    });
    // Horizontal menu navigation in mobile menu on click
    var navItemClicked = $('.horizontal-menu .page-navigation >.nav-item');
    navItemClicked.on("click", function(event) {
      if(window.matchMedia('(max-width: 991px)').matches) {
        if(!($(this).hasClass('show-submenu'))) {
          navItemClicked.removeClass('show-submenu');
        }
        $(this).toggleClass('show-submenu');
      }        
    })

    $(window).scroll(function() {
      if(window.matchMedia('(min-width: 992px)').matches) {
        var header = $('.horizontal-menu');
        if ($(window).scrollTop() >= 60) {
          $(header).addClass('fixed-on-scroll');
        } else {
          $(header).removeClass('fixed-on-scroll');
        }
      }
    });


    // Prevent body scrolling while sidebar scroll
    $('.sidebar .sidebar-body').hover(function () {
      $('body').addClass('overflow-hidden');
    }, function () {
      $('body').removeClass('overflow-hidden');
    });
   

  });
})(jQuery);