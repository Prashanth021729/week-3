/* JWTs
 #Write a function that takes in a username and password and returns a JWT token with the username encoded. 
 Should return null if the username is not a valid email or if the password is less than 6 characters. 
 Try using the zod library here
 - Write a function that takes a jwt as input and returns true if the jwt can be DECODED (not verified).
  Return false otherwise
 - Write a function that takes a jwt as input and returns true if the jwt can be VERIFIED. 
 Return false otherewise
 - To test, go to the 02-jwt folder and run `npx jest ./tests`*/

const z = require('zod');
const jwt = require('jsonwebtoken');

const emailSchema = z.string().email();
const passwordSchema = z.string().min(6);


function jwtTokenGenerator(username, password){
    const usernameResponse = emailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);
    if(!usernameResponse.success || !passwordResponse.success){
        return null;
    }
    const token = jwt.sign({username},"secret");
    return token;

};

function  isDecoded(token){
    const response = jwt.decode(token);
    if(response){
        return true;
    }
    return false;
};

function isVerified(token){
    const result = jwt.verify(token, "secret");
    if(result){
        return true;
    }
    return false;
};

