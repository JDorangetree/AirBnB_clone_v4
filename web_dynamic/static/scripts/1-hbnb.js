$(document).ready(function(){
    let amenities = [];
    $('input[type="checkbox"]').change(function(){
        if($(this).is(":checked") == true){
            amenities.push($(this).attr('data-id'));
        }
        else if($(this).is("checked") == false){
            let value = $(this).attr('data-id')
            amenities = amenities.filter(function(item) {
            return item !== value
        })
        }
        $('.amenities h4').text((amenities).join(', '));
    });
});

