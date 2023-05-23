import { Component } from '@angular/core';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  template: `
    <div class='main__container'>
      <div class='content__block'>
        <div class='exchange-rate__block'>
          <h1>Current exchange rate</h1>
          <div class='current__price'>
            <h2>USD: {{ dollarRate }} UAH</h2>
            <h2>EUR: {{ euroRate }} UAH</h2>
          </div>
        </div>
        <div class='exchange__functional-block'>
          <div class='exchange__functional-content'>
            <div class='input__block'>
              <div class='text__style'>Amount</div>
              <input #myInput (keyup)=getInputValue(myInput.value)/>
            </div>
            <div class='select__block'>
              <div class='text__style'>From</div>
              <select #select1 (change)=getSelectOneValue(select1.value)>
                <option value="select" selected>Select currency</option>
                <option value="UAH">UAH</option>
                <option value="USD">USD</option>
                <option value="EURO">EURO</option>
              </select>
            </div>
            <div class='button__block' (click)=getValue() >
              <img src='https://static.vecteezy.com/system/resources/previews/000/589/868/original/vector-exchange-icon.jpg' alt='image'>
            </div>
            <div class='select__block'>
              <div class='text__style'>To</div>
              <select #select2 (change)=getSelectTwoValue(select2.value)>
                <option value="select" selected>Select currency</option>
                <option value="UAH">UAH</option>
                <option value="USD">USD</option>
                <option value="EURO">EURO</option>
              </select>
            </div>
          </div>
          <div class='result__block'>
            <h1>{{ result }}</h1>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
  h1{
    margin:0;
  }
  input{
    height:45px;
    width:320px;
    border-radius: 8px;
    border:1px solid grey;
    font-size:16px;
  }
  select{
    height:50px;
    width:320px;
    border-radius: 8px;
    border:1px solid grey;
    font-size:16px;
  }
  .main__container{
    width:100%;
    height:500px;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .content__block{
    margin-top:150px;
    height:500px;
    width:1200px;
    border:1px solid grey;
    border-radius:8px;
    box-shadow: 0px 6px 6px 2px rgba(35, 55, 80, 0.3);
  }
  .exchange-rate__block {
    text-align:center;
    margin-top:20px;
  }
  .current__price{
    display:flex;
    justify-content:center;
  }
  .exchange__functional-block{
    max-width:1100px;
    margin: 0 auto;
    margin-top: 75px;
  }
  .exchange__functional-content{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:30px
  }
  .text__style{
    font-size:18px;
    font-weight:bold;
  }
  h2+h2{
    margin-left:15px;
  }
  .button__block{
    margin-top:15px;
  }
  img{
    height:50px;
    width:50px;
    cursor:pointer;
  }
`]
})
export class AppComponent {
  dollarRate: any;
  euroRate: any;
  result: any;
  displayValue = '';
  selectOne = '';
  selectTwo = '';
  imagePath = 'images/transfer.png'

  constructor(private userService: UserService) {
    this.userService.getData().subscribe((data: any) => {
      this.dollarRate = data['24'].rate.toFixed(2);
      this.euroRate = data['31'].rate.toFixed(2);
      console.log(data);
    });
  }

  getInputValue(val: any) {
    console.log(val)
    this.displayValue = val;
  }
  getSelectOneValue(val: any) {
    console.log(val)
    this.selectOne = val;
  }
  getSelectTwoValue(val: any) {
    console.log(val)
    this.selectTwo = val;
  }
  getValue() {
    const inputValue = parseFloat(this.displayValue)
    if (this.selectOne === 'UAH' && this.selectTwo === 'USD') {
      this.result = 'you will get:' + (+(inputValue / this.dollarRate).toFixed(2)) + 'USD'
    } else if (this.selectOne === 'UAH' && this.selectTwo === 'EURO') {
      this.result = 'you will get:' + (+(inputValue / this.euroRate).toFixed(2)) + 'EURO'
    } else if (this.selectOne === 'USD' && this.selectTwo === 'UAH') {
      this.result = 'you will get:' + (+(inputValue * this.dollarRate).toFixed(2)) + 'UAH'
    } else if (this.selectOne === 'USD' && this.selectTwo === 'EURO') {
      this.result = 'you will get:' + (+((inputValue * this.dollarRate) / this.euroRate).toFixed(2)) + 'EURO'
    } else if (this.selectOne === 'EURO' && this.selectTwo === 'UAH') {
      this.result = 'you will get:' + (+(inputValue * this.euroRate).toFixed(2)) + 'UAH'
    } else if (this.selectOne === 'EURO' && this.selectTwo === 'USD') {
      this.result = 'you will get:' + (+((inputValue * this.euroRate) / this.dollarRate).toFixed(2)) + 'USD'
    } else {
      this.result = 'Please select currency';
    }
  }
}