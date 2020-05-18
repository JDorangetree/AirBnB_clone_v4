$(document).ready(function(){
    let amenities = [];
    $('input[type="checkbox"]').change(function(){
        if($(this).is(":checked") == true){
            amenities.push($(this).val());
        }
        else if($(this).is("checked") == false){
            let value = $(this).val()
            amenities = amenities.filter(function(item) {
            return item !== value
        })
        }
        $('.amenities h4').text((amenities).join(', '));
    });
});

