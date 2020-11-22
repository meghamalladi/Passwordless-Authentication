function validate(event, state){
  const numbers = /^[+]+[0-9]/
  var phonenum= document.getElementById("phone").value;
  let err="";
  if (!phonenum.match(numbers)){
      err = "Phonenumber should start with the area code and contain only numbers!!"
      document.getElementById("phone").value= "";

  }
  return err;
};


export default validate;