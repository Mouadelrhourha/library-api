const password = '1234';

const middlewarePassword = function(req,res,next){

  const passwordHeaders = req.headers.password;
  if(passwordHeaders === password){
    next();
  }else{
    res.status(401).json({message : 'password inccorect'});
  }
};

module.exports={
  middlewarePassword
};
