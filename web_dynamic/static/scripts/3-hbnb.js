let amenities = [];
$(document).ready(function() {
    let amenities = [];
    $('input[type="checkbox"]').change(function () {
        if ($(this).is(":checked") === true) {
            amenities.push($(this).val());
        } else if ($(this).is("checked") == false) {
            let value = $(this).val()
            amenities = amenities.filter(function (item) {
                return item !== value
            })
        }

        $('.amenities h4').text((amenities).join(', '));
    });
    $.get('http://0.0.0.0:5001/api/v1/status', function (data) {
        if (data.status === "OK") {
            $('#api_status').addClass('available')
            $('#api_status').removeAttr('id');
        }
    })
})
$(function () {
    let id;
    let name;
    let last_name;
    $.ajax({
        data: JSON.stringify({"amenities": amenities}),
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        type: 'post',
        success: function (data) {
            let dict = {}
            $.get('http://0.0.0.0:5001/api/v1/users/', function (data) {
               data.forEach(function (i) {
                   dict[i.id] = i.first_name
               })
            })
            data.forEach(function (i) {
                $('.places').append(`<article><div class="title_box"><h2>${i.name}` +
                    `</h2><div class="price_by_night">${i.price_by_night}</div>` +
                    `</div><div class="information"><div class="max_guest">` +
                    `${i.max_guest}</div><div class="number_rooms">${i.number_rooms}</div>` +
                    `<div class="number_bathrooms">${i.number_bathrooms}</div></div>` +
                    `<div class="user"><b>Owner:${i.user_id}</b></div><div class="description">${i.description}</div></article>`)
            })
        }
    })
})




/*{% for place in places %}
	<article>
	  <div class="title_box">
	    <h2>{{ place.name }}</h2>
	    <div class="price_by_night">${{ place.price_by_night }}</div>
	  </div>
	  <div class="information">
	    <div class="max_guest">{{ place.max_guest }} Guest{% if place.max_guest != 1 %}s{% endif %}</div>
            <div class="number_rooms">{{ place.number_rooms }} Bedroom{% if place.number_rooms != 1 %}s{% endif %}</div>
            <div class="number_bathrooms">{{ place.number_bathrooms }} Bathroom{% if place.number_bathrooms != 1 %}s{% endif %}</div>
	  </div>
	  <div class="user">
            <b>Owner:</b> {{ place.user.first_name }} {{ place.user.last_name }}
          </div>
          <div class="description">
	    {{ place.description | safe }}
          </div>
	</article>
	{% endfor %}*/