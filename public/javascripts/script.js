$(document).ready(function(){
    console.log('dhfkj');
    $.get('http://127.0.0.1:3000/movies/all', function(data){
        console.log(data);
        $.each(data, function(index, value){
            console.log(value.name);
            $('#movie-container').append(cardGenerator(value));
        });
        
    });

    function cardGenerator(data) {
        var html = `<section class="col-xs-12 col-md-3">
                <div class="card" style="padding:24px">
                    <div class="card-image">
                        <img src="${data.img}" style = "width:240px; height: 360px">
                        <p class="card-title black-text" >${data["name"]}</p>
                    </div>
                    <div class="card-content">
                        <p>${data.year}</p>
                    </div>
                    
                </div>
        </section>`;
        return html;
    }

});

function toggleMenu(){
    $('.mobile-nav').toggleClass('toggle');
}
function navclose(){
    $('.mobile-nav').toggleClass('toggle');
}