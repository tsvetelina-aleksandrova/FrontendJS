$(document).ready(function(){
   $('#fullpage').fullpage({
      anchors:['loginPage', 'aboutPage', 'signupPage'],
      navigation: true,
      navigationTooltips: ['Log in', 'About', 'Sign up'],
      menu: '#header-nav-menu'
   });
});
