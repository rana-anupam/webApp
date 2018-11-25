const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    res.redirect('/');
});

// auth with google+
router.get('/google', passport.authenticate('google', { scope: [
       'https://www.googleapis.com/auth/plus.login',
       'https://www.googleapis.com/auth/plus.profile.emails.read',
        'https://www.googleapis.com/auth/plus.me',
      'https://www.googleapis.com/auth/userinfo.profile']
}));

router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email']}));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// auth for checking loggedIn
router.post('/user', (req, res) => {
  //console.log(req.user);
  if(req.user){
    res.json({id:req.user._id,email:req.user.email,loggedIn:true,firstName:req.user.firstName,lastName:req.user.lastName,thumbnail:req.user.thumbnail});
  }
  else{
    res.json({loggedIn:false});
  }

});


module.exports = router;
