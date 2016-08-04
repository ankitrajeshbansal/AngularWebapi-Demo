$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
     $("#menu-toggle-2").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled-2");
        $('#menu ul').hide();
    });

     function initMenu() {
      $('#menu ul').hide();
      $('#menu ul').children('.current').parent().show();
      //$('#menu ul:first').show();
      $('#menu li a').click(
        function() {
          var checkElement = $(this).next();
          
          if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {  
            
            checkElement.slideDown('normal');
            return false;
            }
			else{				
            checkElement.slideUp('normal');
            return false;
            }
          }
        );
      }
    $(document).ready(function() {initMenu();});