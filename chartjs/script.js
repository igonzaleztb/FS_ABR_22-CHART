var section = document.getElementById("listado");
var abc = document.getElementById("nav-abc");

for (let i = 65; i < 91; i++) {
  var li = document.createElement("li");
  var textLi = document.createTextNode(String.fromCharCode(i));
  var n = String.fromCharCode(i);
  li.appendChild(textLi);
  li.setAttribute("onclick", `filtrar(this.innerText)`);
  abc.appendChild(li);
}

function filtrar(letra) {
  var names = JSON.parse(localStorage.getItem("names"));
  var min = letra.toLowerCase();
 
  console.log(names)

  var ordenado = names.filter((name) => name[0] == min);
  console.log(ordenado);

  var sectionLis = document.querySelectorAll("#listado p");

  for (let a = 0; a < sectionLis.length; a++) {
    document.getElementById("listado").childNodes[0].remove();
  }
  for (let i = 0; i < ordenado.length; i++) {
    var p = document.createElement("p");
    var textName = document.createTextNode(`${ordenado[i]}`);
    p.appendChild(textName);
    section.appendChild(p);
    document.body.appendChild(section);
  }
}

fetch(`https://pokeapi.co/api/v2/pokemon?offset=20&limit=1126`)
  .then((response) => response.json())
  .then((data) => {
    var pokeData = data.results;
    const pokeName = [];
    for (let i = 0; i < pokeData.length; i++) {
      pokeName.push(pokeData[i].name);
    }
    pokeName.sort();
    for (let i = 0; i < pokeName.length; i++) {
      var p = document.createElement("p");
      var textName = document.createTextNode(`${pokeName[i]}`);
      p.appendChild(textName);
      section.appendChild(p);
      document.body.appendChild(section);
    }
    console.log(pokeName);
    localStorage.setItem("names", JSON.stringify(pokeName));

    document.getElementById("search-button").addEventListener("click", () => {
      let pokeToSearch = document.getElementById("input-poke").value;
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokeToSearch}`)
        .then((response) => response.json())
        .then((data) => {
          var pokeData = data;
          var dataPoke = {
            name: pokeData.name,
            experience: pokeData.base_experience,
            height: pokeData.height,
            weight: pokeData.weight,
            abilities: pokeData.abilities,
          };

          console.log(dataPoke);

          const ctx = document.getElementById("myChart").getContext("2d");
          const myChart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: ["Experiencia", "Habilidades", "Peso", "Altura"],
              datasets: [
                {
                  label: "# of Votes",
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
        });
    });
  });
