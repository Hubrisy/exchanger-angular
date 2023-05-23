import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})

// const getDollar:any = document.getElementById('dollar')
// const getEuro:any = document.getElementById('euro')

// fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data)
//     getDollar.innerHTML = 'Доллар:' + data[24].rate.toFixed(2) + "грн"
//     getEuro.innerHTML = 'Євро:' + data[31].rate.toFixed(2) + "грн"
//   });

export class UserService {
    constructor(private http: HttpClient) { }
    getData () {
        let url='https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
        return this.http.get(url)
    }
}