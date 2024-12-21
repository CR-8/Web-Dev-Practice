// fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
//     .then(response => {

//         if ( !response.ok ){
//             throw new Error ("Could not fetch resource");
//         }

//         return response.json();

//     })
//     .then( data => console.log(data.name))
//     .catch((error) => console.error(error));



async function fetchPokemon(){

    try{

        const name = document.getElementById("search").value.toLowerCase();
        console.log(name)
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        console.log(response)

        if (!response.ok){
            throw new Error ("Could not fetch Data");

        }

        const data = await response.json();
        console.log(data)
        const pokeSprite = data.sprites.front_default;
        console.log(pokeSprite)
        const image = document.getElementById("sprite")
        image.innerHTML = `<img src="${pokeSprite}" alt="pokemon" />`;
        image.style.display = "block";
    }
    catch(error){
        console.error(error);
    }
}