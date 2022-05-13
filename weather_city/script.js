
 document.getElementById("search_city").addEventListener("click", ()=>{

    let city = document.getElementById("city_name").value

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1309e05b19d8c4c295e85e5ed48c1b02 ` ).then((response) => response.json())
    .then((data) => {
    
    
        console.log(data )


        let cityStats = {

            temp: data.main.temp,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            presion: data.main.pressure,
            humedad: data.main.humidity


        }

   


        document.getElementById("result").style.display="block"
        
 
         new Chartist.Line('#chart1', {
              labels: [ "presion", "humedad","temperatura", "temp Min","temp Max"],
            series: [[cityStats.presion,cityStats.humedad, , cityStats.temp, cityStats.temp_min,  cityStats.temp_max]]   

    

            /*  labels: [1, 2, 3, 4],
            series: [[5, 2, 8, 3]]  */ 
        });
        
          // Initialize a Line chart in the container with the ID chart2
           new Chartist.Bar('#chart2', {
            labels: ["humedad", "presion", "temperatura", "temp Min","temp Max"],
            series: [[cityStats.humedad, cityStats.presion, cityStats.temp, cityStats.temp_min]]  
          });  
    
    })
 




})
/* 
 */

 

 




 
 

 