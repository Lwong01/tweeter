$(document).ready(function () {

  const maxText = 140;

  function textcount(event) {


    var length = $(this).val().length;
    var charLeft = maxText - length;

    console.log('textarea length:', length);
    console.log('characters remaining:', charLeft);

    $(this).siblings(".counter").html(charLeft);

    if (length > maxText) {
      $('.new-tweet textarea').css('color', 'red');
    } else {
      $('.new-tweet textarea').css('color', 'black');
    }
  }

  $('.new-tweet textarea').on('keyup', textcount);



});
