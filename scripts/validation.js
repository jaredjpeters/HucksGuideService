$(function()
{
    $("#myemailform").validate(
      {
        rules: 
        {
          fullname: 
          {
            required: true,
            minlength: 6
          },
          email: 
          {
            required: true,
            email: true
          },
          phone:
          {
            required: true,
            number:true,
            maxlength: 10,
            minlength: 10
          },
          message: 
          {
            required: true,
            minlength: 100,
            maxlength: 1024
          }
        },
        messages: 
        {
          fullname: 
          {
            required: "Please enter your full name.",
            minlength: "Please enter your full name."
          },
          email: 
          {
            required: "Please enter your email address. This is required to contact you later."
          },
          phone:
          {
              required: "Please enter a valid phone number",
              maxlength: "Your phone number can only contain 10 digits",
              minlength: "Please enter your 10 digit phone number",
              number: "Numbers only (no dashes)"
          },
          message: 
          {
            maxlength: jQuery.format("Please limit the message to {0} letters!"),
            minlength: jQuery.format("Please be more detailed, so we can better accommodate you!")
          }
        }
      });	
});