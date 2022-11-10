const router = require('express').Router()

const authCheck = (req, res, next) => {
	if(!req.user) {
		// if user is not logged in
		res.redirect('/auth/login')
	} else {
		next()
	}
}

router.get('/', authCheck, (req, res) => {
  var user = ""
  var logoutDisplay = ''
  var loginDisplay = ''
  var getUser = function() {
    if (req.user) {
      user = req.user
    } else {
      user = ""
    }
  }
  var toggleLoginRegister = function() {
    if(req.user) {
      logoutDisplay = 'block'
      loginDisplay = 'none'
      registerDisplay = 'none'
    } else {
      logoutDisplay = 'none'
      loginDisplay = 'block'
      registerDisplay = 'block'
    }
  }
  toggleLoginRegister();
  getUser();
    res.render('profile', {
    user:user, 
    assets: "../.", 
    logoutDisplay: logoutDisplay, 
    loginDisplay: loginDisplay, 
    registerDisplay: registerDisplay 
  });
})

module.exports = router