 $(document).ready(function () {
   $('#searchMovie').click(searchMovie);
    
     var movieTitle = $("#movieTitle"),
     table = $("#results"),
     tbody = $("#results tbody");
    
    function searchMovie(){
        var title = movieTitle.val();
        
        $.ajax({
            url: "http://www.omdbapi.com/?t="+title+"&y=&plot=short&r=json",
            dataType : "jsonp",
            success : renderMovies
            });
    }
     
    
     function renderMovies(response){
         console.log(response);
         
         tbody.empty();
         addMovies(response);
        
     };
     
     function addMovies(response){
             var title = response.Title,
             plot = response.Plot,
             poster = response.Poster;
             
             var tr = $("<tr>");
             
             //append title from td to titleTd
             var titleTd = $("<td>").append(title);
             var plotTd = $("<td>").append(plot);
             var img = $("<img>").attr("src",poster); 
             var posterTD= $("<td>").append(img)
         
             
             //append titleTd to tr
             tr.append(titleTd);
             tr.append(plotTd);
             tr.append(posterTD);
             
             //append tr to tbdody
             tbody.append(tr);
         };
     
     // Buttons for pause and play for carousel
     $('#playButton').click(function () {
        $('#yonder-carousel').carousel('cycle');
        });
    $('#pauseButton').click(function () {
    $('#yonder-carousel').carousel('pause');
        });
     
     
     // Now the search can work with ENTER 
     $('#movieTitle').keypress(function(e) {
    if(e.which == 13) {
        if($('#movieTitle').val()!==''){
             searchMovie()
        }
    }
     });
     
     
     
     

     //Informations on click carousel
     $('img').click(function(){
             var fileName=$(this).attr('alt');
             movieCallAjaxDetail(fileName);
         });
     
       // DETAILS MOVIE CAROUSEL
      function movieCallAjaxDetail(fileName){
          var title =fileName;
        
        $.ajax({
            url: "http://www.omdbapi.com/?t="+title+"&y=&plot=short&r=json",
            dataType : "jsonp",
            success : detailsForMovie
            });
     }
     
     function detailsForMovie(responseGet){
         console.log(responseGet);
         addMoviesDetails(responseGet);
     }
     
     function addMoviesDetails(responseGet){
         var titleMovie = responseGet.Title,
         releasedMovie= responseGet.Released,
         plotMovie = responseGet.Plot,
         PosterSrc= responseGet.Poster;
        
         //details to html
         $('.movieTitle').html(titleMovie);
         $('.relasedMovie').html(releasedMovie);
         $('.plotMovie').html(plotMovie);
         $('.imgMovie').attr("src",PosterSrc);
     };
    
     $('.imgCarousel').click(function(){
         $('.rowMovies').show();
     });
     
}); 

