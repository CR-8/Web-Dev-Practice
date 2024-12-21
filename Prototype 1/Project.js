// RANDOM NUMBER GENERATOR

const button = document.getElementById('random_button');
const min = 1 ;
const max = 9 ;


button.onclick = function(){
    const rand1 = Math.floor(Math.random() * ( max - min + 1)) + min;
    const rand2 = Math.floor(Math.random() * ( max - min + 1)) + min;
    const rand3 = Math.floor(Math.random() * ( max - min + 1)) + min;

    document.getElementById('char1').textContent = rand1 ; 
    document.getElementById('char2').textContent = rand2 ; 
    document.getElementById('char3').textContent = rand3 ; 
}
