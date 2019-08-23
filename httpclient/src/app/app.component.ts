import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { Weather } from './models/weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'httpclient';
  WEATHER_API_KEY = "476e23fe1116f4e69d2a3e68672604e1"
  model = new Weather(0,0,0,'',0,0);
  constructor(private weatherSvc: WeatherService){

  }

  selectedCountry: string = "Singapore";
  imageUrl = "https://www.nea.gov.sg/assets/images/map/base-853.png";

  countries = ["Singapore", "Malaysia", "Korea", "Japan"];

  imageUrls = [
    {country: "Singapore", imageUrl:"https://www.nea.gov.sg/assets/images/map/base-853.png"},
    {country: "Malaysia", imageUrl:"https://image.shutterstock.com/image-vector/malaysia-map-260nw-245053663.jpg"},
    {country: "Korea", imageUrl:"http://asiapacific.anu.edu.au/mapsonline/sites/default/files/styles/cartogis_700x700/public/maps/bitmap/standard/2018/11/00-097_Korea_colour.png?itok=I7Cks0FF"},
    {country: "Japan", imageUrl:"https://wherewebe.com/sitebuilder/images/Japan_map_032-600x626.jpg"}
  ];

  onChange($event): void {
    this.selectedCountry = $event.target.value;
    this.ngOnInit();
  }

  ngOnInit(){
    console.log("retrieve weather !")
    this.weatherSvc.getWeather(this.selectedCountry, this.WEATHER_API_KEY).then((result)=>{
      console.log(result);
      console.log(result.main);
      this.model = new Weather(result.main.temp,result.main.pressure,result.main.humidity,result.weather[0].description,result.wind.deg,result.wind.speed);
  
      Object.keys(this.imageUrls).find(value=>{
        console.log(value);
        if(this.imageUrls[value].country === this.selectedCountry){
          this.imageUrl = this.imageUrls[value].imageUrl;
        }
      });

      //console.log()
    }).catch((error)=>{
      console.log(error);
    })
  }
}
