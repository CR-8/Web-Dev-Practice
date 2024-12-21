function GeneratePassword( size , LowerCase , UpperCase , Symbol , Num ){

    const lowerchars = "abcdefghijklmnopqrstuvwxyz" ;
    const upperchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" ;
    const numbers = "0123456789" ;
    const symbols = "!@#$%^&*()_+-=" ;

    let allowedchar = "" ;
    let password = "" ;

    allowedchar += LowerCase ? lowerchars : "" ;
    allowedchar += UpperCase ? upperchars : "" ;
    allowedchar +=  Num ? numbers : "" ;
    allowedchar += Symbol ? symbols : "" ;

    if(size <= 0){
        return "Password size must be greater than 0" ;
    }
    if(allowedchar.length === 0){
        return "At least one character type must be selected" ;
    }

    for( let i = 0 ; i < size ; i++){
        const randindex = Math.floor(Math.random()*allowedchar.length) ;
        password += allowedchar[randindex] ;
    }

    return password;    
}

function HandleGenerate(){

const Size = document.getElementById("inputlen").value;
const size = Number(Size) ;
const LowerCase = document.getElementById("lc").checked;
const UpperCase = document.getElementById("uc").checked;
const Symbol = document.getElementById("sy").checked;
const Num = document.getElementById("num").checked;


const password = GeneratePassword( size , LowerCase , UpperCase , Symbol , Num );

const output = document.getElementById("password");
output.textContent = ` Password is : ${password} ` ;

}