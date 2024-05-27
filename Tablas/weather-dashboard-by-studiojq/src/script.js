/*
Project/design by Jonathan Quintin
https://dribbble.com/shots/1346874-Weather-Dashboard-Global-Outlook-5?list=users&offset=71

View in Full Page mode!
*/

$('.main-nav ul li').click(function() {
  $('.main-nav ul li').removeClass('active');
  $(this).addClass('active');
});

$('.menuicon').click(function() {
  $('.ul-menu').css('bottom', '-150%');
  $(this).next('.ul-menu').css('bottom', '0');
});

$('.ul-menu-close').click(function() {
  $('.ul-menu').css('bottom', '-150%');
});
