'use strict';//37 mongoDATa

module.exports = function(_,passport,User){

      return {

          SetRouting:function(router){

                router.get('/',this.indexPage);
                router.get('/signup',this.getSignUp);

                router.get('/auth/facebook/callback',this.facebookLogin);

                router.get('/auth/facebook',this.getFacebookLogin);
                router.post('/',User.SigninValidation,this.postSignIn);
                router.post('/signup',User.SignUpValidation,this.postSignUp);


          },
          getFacebookLogin:passport.authenticate('facebook',{
            scope:'email'
          }),
          facebookLogin:passport.authenticate('facebook',{
            successRedirect:'/home',
            failureRedirect:'/signup',
            failureFlash:true
          }),

          indexPage:function(req,res){

            const errors = req.flash('error');
            return res.render('index',{title:'ChatApp | Login',messages:errors,hasErrors:errors.length > 0});
          },
          getSignUp:function(req,res){

            const errors = req.flash('error');
            return res.render('signup',{title:'ChatApp | Login',messages:errors,hasErrors:errors.length > 0});
          },
          postSignIn:passport.authenticate('local.login',{

            successRedirect:'/home',
            failureRedirect:'/',
            failureFlash:true

          }),

          postSignUp:passport.authenticate('local.signup',{

              successRedirect:'/home',
              failureRedirect:'/signup',
              failureFlash:true

          })

          }
        }
