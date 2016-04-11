$(document).ready(function() {

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
    showImage(0);

    function showImage(n){
      $prevImg = $('.global-header div').eq(n-1)
      $img = $('.global-header div').eq(n)
      $img.fadeIn(5000,function(){
        $prevImg.hide();
        setTimeout(function() { 
          if (n == 8){
            n=0;
            $img.fadeOut(5000);
            showImage(n);
          } else {
            showImage(n+1) 
          }
        },1000);
      });
    }


});