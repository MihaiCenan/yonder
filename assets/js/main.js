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
     $(document).keypress(function(e) {
    if(e.which == 13) {
        searchMovie();
    }
     });
     
     //Informations on click carousel
     
}); 