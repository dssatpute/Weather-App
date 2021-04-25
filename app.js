window.addEventListener('load',()=>
{
    let lat,long;
    let city=document.querySelector(".header .city h2")
    let temperature=document.querySelector(" .temp h2")
    let mains=document.querySelector(".description .main span")
    let main_description=document.querySelector(".description .main_descp span")
    let humid=document.querySelector(".info .humidity span")
    let pressure=document.querySelector(".info .pressure span")
    let mintemp=document.querySelector(".info .mintemp span")
    let feels=document.querySelector(".info .feels span")
    let cityname=document.querySelector(".other .cityname")
    let search=document.querySelector(".other .search")
    // let icon=document.querySelector(".header .image .icon")


    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position=>
            {
                long=position.coords.longitude;
                lat=position.coords.latitude;
                console.log(position);
                // const preurl=`https://cors-anywhere.herokuapp.com/`
                const API=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=1d79479552b2520e02c87cad0f9303b6&units=metric`
                fetch(API).then(Response=>
                    {
                        return Response.json()
                    }).then(data=>
                        {
                            console.log(data)
                            // console.log(data.main.humidity)
                    
                            city.innerText=data.name
                            var condition=data.weather[0].main;
                            temperature.innerHTML=`<span>${data.main.temp} °C</span>`
                            mains.innerText=(data.weather[0].main)
                            main_description.innerText=": "+(data.weather[0].description)
                            humid.innerHTML=`<span>${data.main.humidity}%</span>`
                            pressure.innerText=data.main.pressure
                            mintemp.innerHTML=`<span>${data.main.temp_min} °C</span>`
                            feels.innerText=data.main.feels_like
                                
                            setIcon(condition.toLowerCase());
                        })
                        
                    
            });

            function setIcon(descp)
            {
                
                if(descp.includes("clouds"))
                {
                    let skycons=new Skycons({"color":"black"});
                    skycons.add(document.querySelector(".icon"), Skycons.CLOUDY);
                    skycons.play();
                }
                if(descp.includes("rain"))
                {
                    const skycons=new Skycons({"color":"black"});
                    skycons.add(document.querySelector(".icon"), Skycons.RAIN);
                    skycons.play();
                }
                
                if(descp.includes("clear"))
                {
                    const skycons=new Skycons({"color":"black"});
                    skycons.add(document.querySelector(".icon"), Skycons.CLEAR_DAY);
                    skycons.play();
                }
                if(descp.includes("wind"))
                {
                    const skycons=new Skycons({"color":"black"});
                    skycons.add(document.querySelector(".icon"), Skycons.WINDY);
                    skycons.play();
                }
                
                
            }
            
           
    
    }
    search.addEventListener('click',()=>
    {
        const cityother=cityname.value;
        console.log(cityother)
        const APIc=`https://api.openweathermap.org/data/2.5/weather?q=${cityother}&appid=1d79479552b2520e02c87cad0f9303b6&units=metric`

        fetch(APIc).then(Response=>
            {
                return Response.json()
            }).then(data=>
                {
                    console.log(data)
                    // console.log(data.main.humidity)
            
                    city.innerText=data.name
                    var condition=data.weather[0].main;
                    temperature.innerHTML=`<span>${data.main.temp} °C</span>`
                    mains.innerText=(data.weather[0].main)
                    main_description.innerText=": "+(data.weather[0].description)
                    humid.innerHTML=`<span>${data.main.humidity}%</span>`
                    pressure.innerText=data.main.pressure
                    mintemp.innerHTML=`<span>${data.main.temp_min} °C</span>`
                    feels.innerText=data.main.feels_like
                        
                    setIcon(condition.toLowerCase());
                })
    })
    
})