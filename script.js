const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemon = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonType = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const spriteContainer = document.getElementById("sprite-container");




const fetchData = async () =>{
    try{
        const pokemonNameOrId = input.value.toLowerCase();
        const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`);
        const data = await res.json();
        pokemonInfo(data);
    }catch(err){
        alert("Pokémon not found");
        console.log(err);
    }
};

const pokemonInfo = (data) =>{
    const {name,id,weight,height,types,stats,sprites} = data;
    pokemon.textContent = `${name.toUpperCase()}`;
    pokemonId.textContent = `#${id}`;
    pokemonWeight.textContent = `Weight: ${weight}`;
    pokemonHeight.textContent = `Height: ${height}`;
    spriteContainer.innerHTML =`<img src="${sprites.front_default}" id="sprite" alt="${name}"/>`


    pokemonType.innerHTML = '';


    types.forEach(t => {
        const typeName = t.type.name.toUpperCase();
        const typeElement = document.createElement('span');
        typeElement.classList.add('badge');
        typeElement.textContent = typeName;
        pokemonType.appendChild(typeElement);
    });


    hp.textContent = stats[0].base_stat;
    attack.textContent = stats[1].base_stat;
    defense.textContent = stats[2].base_stat;
    spAttack.textContent = stats[3].base_stat;
    spDefense.textContent = stats[4].base_stat;
    speed.textContent = stats[5].base_stat;
};

searchBtn.addEventListener("click",fetchData);

input.addEventListener("keydown",e=>{
    if(e.key ==="Enter"){
        e.preventDefault();
        fetchData();
    }
});