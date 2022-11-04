
const months = ["January", "February", "March", "April",
                "May", "June", "July", "August", "September", 
                "October","November", "December"];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday",
              "Thursday", "Friday", "Saturday"];

let ID = getID();
let search = ID.item(6);
let info = ID.item(5);
getData('Cairo');   //initial Location
Border('home');

search.onclick = function(){
    getData(info.value);
}
function Border(Id){
    for(let i=0;i<5;i++){
        ID.item(i).style.cssText = 'color: white;'
    }
    document.getElementById(Id).style.cssText = 'border: 1px solid #019CD3; color: #019CD3; padding: 8px 24px; border-radius: 20px;';
}
function getID(){
    let I = document.querySelectorAll(`[id^="t"], [id^="l"],[id^="w"], 
                                      [id^="s"] ,[id^="i"], [id^="n"], 
                                      [id^="p"], [id^="h"] , [id^="c"]`);  //to get All ID
    return I;
}

function insertData(today , nextDay , nextnextDay){
    [ID.item(8).innerHTML , ID.item(9).innerHTML  , 
    ID.item(10).innerHTML  ,  ID.item(11).innerHTML ,
    ID.item(12).innerHTML ] = [today[0] , today[1] + today[2] , today[3] , today[4] , today[5] ];

    [ID.item(13).innerHTML , ID.item(14).innerHTML  , 
    ID.item(15).innerHTML  ,  ID.item(16).innerHTML ,
    ID.item(17).innerHTML ] = [nextDay[0] , `<img src="${nextDay[1]}">` , nextDay[2], nextDay[3] , nextDay[4]];

    [ID.item(18).innerHTML , ID.item(19).innerHTML  , 
    ID.item(20).innerHTML  ,  ID.item(21).innerHTML ,
    ID.item(22).innerHTML ] = [nextnextDay[0] , `<img src="${nextnextDay[1]}">` , nextnextDay[2], nextnextDay[3], nextnextDay[4]];

}

async function getData(loc){
    let todayDate = new Date();
    await fetch(`http://api.weatherapi.com/v1/forecast.json?key=98fc2a67d39b4b08b00233441220211&q=${loc}&days=7`).
    then((result)=>{
        let jsonData = result.json();
        return jsonData;
    }).then((jsonData)=>{
        let d = jsonData['forecast']['forecastday'];
        const obj = new Date(d[0]['date']);
        const obj1 = new Date(d[1]['date']);
        const obj2 = new Date(d[2]['date']);
        let today = [ days[obj.getDay()],todayDate.getDate(), months[obj.getMonth()],jsonData['location'].name ,
                      jsonData['current'].temp_c , d[0]['day']['condition']['text']];

        let nextDay = [days[obj1.getDay()] , d[1]['day']['condition']['icon'] , d[1]['day']['maxtemp_c'] , 
                       d[1]['day']['mintemp_c'], d[1]['day']['condition']['text']];

        let nextnextDay = [days[obj2.getDay()] , d[2]['day']['condition']['icon'] , d[2]['day']['maxtemp_c'] , 
                           d[2]['day']['mintemp_c'], d[2]['day']['condition']['text']];
        insertData(today , nextDay , nextnextDay);
    }).catch ((err)=>{
        ID.item(7).style.cssText = 'display: block;'
        setTimeout(function(){
            ID.item(7).style.cssText = 'display: none;'
        }, 3000)
    })
}

