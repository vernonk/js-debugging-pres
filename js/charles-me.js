var showit = {

  eatingCookies: false,

  init: function() {
    //Let's bind our events
    this.bindEvents();
  },

  bindEvents: function() {

    var self = this;

    $("h1 a").bind('click.pres', function(e) {
      e.preventDefault();

      //Removing body bg color caused from Charles
      $('body').removeClass('charles');

      self.loadCookies();
    });

    $('#submit').bind('click', function(e) {
      e.preventDefault();

      //Changing the body bg color using Charles
      $('body').addClass('charles');

      self.addCookie();
    });

    $('.cookies').delegate('ul li', 'click.pres', function() {
      self.eatCookie();
    });

  },

  addCookie: function(cookie) {
    var self = this,
        inputEl = $('#newitem'),
        submitEl = $('#submit'),
        itemList = $(".our-list"),
        cookiesWrapper = $('.cookies'),
        newItem = (cookie) ? cookie : inputEl.val(),
        myFrag =  $('<li>' + newItem + '</li>');

    if(itemList.length) {
      itemList.append(myFrag);
    }
    else {
      itemList = $('<ul class="our-list"></ul>');
      itemList.append(myFrag);
      cookiesWrapper.append(itemList);
    }
    inputEl.val('');

  },

  eatCookie: function() {
    var self = this,
        cookiesWrapper = $('.cookies');
    if(self.eatingCookies) {
      return false;
    }
    else {
      self.eatingCookies = true;
      cookiesWrapper.css('background', 'url(assets/images/cookie-monster-eating-cookies.gif) no-repeat 100% 0');
      setTimeout(function() {
        cookiesWrapper.css('background', 'url(assets/images/cookie-monster.png) no-repeat 100% 0');
        self.eatingCookies = false;
      }, 5000);
    }
  },

  loadCookies: function() {
    var self = this;
    $.ajax({
      dataType: 'json',
      cache: false,
      url: 'js/cookies.json',
      success: function(data) {
        for(var i = 0, l = data.cookies.length; i<l; i++) {
          self.addCookie(data.cookies[i]);
        }
      }
    });
  },

  timerTest: function() {
    console.time('Timer Test');
    var arr = new Array(50000),
        i = 0;

    while(i < arr.length) {
      arr[i] = 'item ' + i;
      i++;
    }
    console.timeEnd('Timer Test');
  }

};

//Let's instantiate everything
$(document).ready(function() {
  showit.init();
});

