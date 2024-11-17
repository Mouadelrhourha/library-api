class HttpError extends Error{
  status ;
  constructor(status , message){
    super(message);
    this.status=status;
  }

};

class BadRequest extends HttpError {
  constructor(message){
    super(400 , message );
  }
}
class NotFound extends HttpError {
  constructor(message='not found'){
    super(404 , message );
  }
}
class DuplicatedException extends HttpError{
  constructor(message='categorie duplicated') {
    super(409,message);
        
  }

}

module.exports={
  HttpError,BadRequest,NotFound,DuplicatedException
};