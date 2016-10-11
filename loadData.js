var states={}
var counties={}
var request = new XMLHttpRequest();

//Filling States
request.open("GET", "http://api.census.gov/data/2015/acs1?get=NAME,B01003_001E&for=state:*&key=", false);
request.send();
request=JSON.parse(request.response)

for(i=1;i<=52;i++){
	temp={"id":parseInt(request[i][2]),"counties":{}}
	states[request[i][0]]=temp
}


//Filling  Counties
request = new XMLHttpRequest();
request.open("GET", "http://api.census.gov/data/2015/acs1?get=NAME,B01003_001E&for=county:*&key=", false);
request.send();
request=JSON.parse(request.response)
for(i=1;i<=830;i++){
	states[request[i][0].split(", ")[1]]["counties"][parseInt(request[i][3])]=request[i][0]
}
asd
console.log(states)

//Finding state with id = 2
var id=2
for(var state in states) {
    if(states[state].id==2)console.log(state)
}

//Finding data about Arizona
console.log(states["Arizona"])

//Finding id of Cochise County, Arizona
