// Dice Roller Program 

function Roll(){

    const attempt = document.getElementById("Inputfield").value;
    const result = document.getElementById("dicenumber");
    const image = document.getElementById("diceimage");
    const value = [];
    const img = [];

    for( let i = 0 ; i < attempt ; i++){
        const val = Math.floor(Math.random() * 6 ) + 1 ;
        // console.log(val);
        value.push(val);
        img.push(`<img src ="Assets/${val}.png">`);
    }
    // console.log(value);
    result.textContent = `Dice : ${value.join(' , ')}`; 
    image.innerHTML = img.join(' ');
    img.style.height.width = 60;
}