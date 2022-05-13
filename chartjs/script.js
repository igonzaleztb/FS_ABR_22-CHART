document.getElementById("search-button").addEventListener("click", () => {
  let pokeToSearch = document.getElementById("input-poke").value;

 

  if(pokeToSearch!=""){

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeToSearch}`)
    .then((response) => response.json())
    .then((data) => {
      var pokeData = data;
     
      console.log(pokeData)
   
      var dataPoke = {
        name: pokeData.name,
        experience: pokeData.base_experience,
        height: pokeData.height,
        weight: pokeData.weight,
        abilities: pokeData.abilities,
      };

     


      const ctx = document.getElementById("myChart").getContext("2d");
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Experiencia", "Habilidades", "Peso", "Altura"],
          datasets: [
            {
              label: `Pokemon: ${dataPoke.name}`,
              data: [
                `${dataPoke.experience}`,
                `${dataPoke.abilities}`,
                `${dataPoke.weight}`,
                `${dataPoke.height}`,
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              //añade borde a las columnas
              borderWidth: 2,
            },
          ],
        },
        options: {
          scales: {
            y: {
              //comienza por 0
              beginAtZero: false,
            },
          },
        },
      });
      document.getElementById("result").innerHTML= `<img src='${pokeData.sprites.other.home.front_default}' >`
      document.getElementById("result-name").innerHTML= `${pokeData.name} `

    });

  document.getElementById("search-div").style.display = "none";

  document.getElementById("search-again").style.display = "block";
  



  }else{


    alert("introduce un pokemon")
  }

 

});

//4 tipos de pokemon  ejem,plo : agua, tierra, volador , fuego...etc....


function reset (){

    location.reload()
}