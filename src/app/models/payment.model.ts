

export class Payment {

  cant  : number;
  month : number;
  year  : number;

  constructor( cant:number, month:number, year:number ) {
    this.cant = cant;
    this.month = month;
    this.year = year;
  }


  //asdfasfd
  //status of month
  status(){

    let thisMonth = new Date().getMonth() + 1;
    let today = new Date().getDay();


    if (this.cant > 0) {
      return 'Al día';
    }else{
      if (thisMonth > this.month ) {
        return 'Atrasado';
      } else if (thisMonth == this.month && today < 20){
        return 'En tiempo';
      }else{
        return '';
      }
    }
  }
}
