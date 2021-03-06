var debugit = {

  eatingCookies: false,

  init: function() {
    //Let's bind our events
    this.bindEvents();
  },

  bindEvents: function() {

    $("h1 a").bind('click.pres', function(e) {
      e.preventDefault();
      this.loadCookies();
    });

    $('#submit').bind('click.pres', function(e) {
      e.preventDefault();
      this.addCookie();
    });

    $('.cookies li').bind('click.pres', function() {
      this.eatCookie();
    });

  },

  addCookie: function(cookie) {
    var self = this,
        inputEl = $('#newitem'),
        itemList = $(".our-list"),
        cookiesWrapper = null,
        newItem = (cookie) ? cookie : inputEl.val(),
        myFrag =  $('<li>' + newItem + '</li>');

    if(itemList.length) {
      itemList.append(myFrag);
    }
    else {
      cookiesWrapper = $('.cookies');
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
      url: 'js/cookies.json',
      success: function(data) {
        for(var i = 0, l = data.cookies.length; i<l; i++) {
          self.addCookie(data.cookies.i);
        }
      }
    });
  }

};

//Let's instantiate everything
$(document).ready(function() {
  debugit.init();
});

