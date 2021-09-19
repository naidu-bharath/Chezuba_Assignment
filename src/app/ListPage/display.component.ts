import { Component, OnInit, ViewChild } from '@angular/core';
import { DisplayService } from './display.service';
import { alldata } from './display.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  Data_Complete: alldata[] = [];
  Data_Thirds: alldata[] = [];
  Data_Fifths: alldata[] = [];
  Data_Magic: alldata[] = [];

  Temp_Data_Thirds: alldata[] = [];
  Temp_Data_Fifths: alldata[] = [];
  Temp_Data_Magic: alldata[] = [];

  constructor(private _CallAPI: DisplayService, private _Spinner: NgxSpinnerService) { }
  displayedColumns: string[] = [ 'id', 'Userid','Cat', 'title', 'body','ope'];

  dataSource: MatTableDataSource<alldata>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this._Spinner.show();
    this._CallAPI.POST_Call().subscribe((data) => {
      this._Spinner.hide();
      if (data != null && data != undefined) {
        this.Data_Complete = data;  

        this.Data_Complete.forEach((item) => {
          if ((item.id % 3 == 0) && this.Check_Is_Thirds(item.id)) {
            if ((item.id % 5 == 0) && this.Check_Is_Fifths(item.id)) {
              item.category = 'magic';
              this.Data_Magic.push(item)
            }
            else {
              item.category = 'thirds';
              this.Data_Thirds.push(item)
            }
          }
          else if ((item.id % 5 == 0) && this.Check_Is_Fifths(item.id)) {
            item.category = 'fifths';
            this.Data_Fifths.push(item)
          }

        })

        this.Temp_Data_Thirds = this.Data_Thirds;
        this.Temp_Data_Fifths = this.Data_Fifths;
        this.Temp_Data_Magic = this.Data_Magic;

        this.dataSource = new MatTableDataSource<alldata>(this.Temp_Data_Thirds);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;   
      }

    })
  }

  applyFilter(filterValue: string) {
    this.filterText = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Active_Tab:string = 'Thirds'
  filterText = '';

  display(tab:any){
   
    this.Active_Tab = tab['tab']['textLabel'];
   
    this._Spinner.show();
    if(this.Active_Tab == 'Thirds')
    {
      this.dataSource = new MatTableDataSource<alldata>(this.Temp_Data_Thirds);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  
    }
    else if(this.Active_Tab == 'Fifths')
    {
      this.dataSource = new MatTableDataSource<alldata>(this.Temp_Data_Fifths);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  
    }
    else if(this.Active_Tab == 'Magic')
    {
      this.dataSource = new MatTableDataSource<alldata>(this.Temp_Data_Magic);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  
    }
    this._Spinner.hide();
  }

  Reset()
  {
    if(this.Active_Tab == 'Thirds')
    {
      this.Temp_Data_Thirds = this.Data_Thirds;
      
      this.dataSource = new MatTableDataSource<alldata>(this.Temp_Data_Thirds);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  
    }
    else if(this.Active_Tab == 'Fifths')
    {
      this.Temp_Data_Fifths = this.Data_Fifths;
     
      this.dataSource = new MatTableDataSource<alldata>(this.Temp_Data_Fifths);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  
    }
    else if(this.Active_Tab == 'Magic')
    {
      this.Temp_Data_Magic = this.Data_Magic;
      this.dataSource = new MatTableDataSource<alldata>(this.Temp_Data_Magic);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  
    }
    this._Spinner.hide();
  }

  Delete(element:string)
  {
    this.dataSource = new MatTableDataSource(this.dataSource.data.filter(d => d.id !== Number(element)));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  

    if(this.Active_Tab == 'Thirds'){
      this.Temp_Data_Thirds = this.Temp_Data_Thirds.filter(d => d.id !== Number(element));
    }
    else if(this.Active_Tab == 'Fifths'){
      this.Temp_Data_Fifths = this.Temp_Data_Fifths.filter(d => d.id !== Number(element));
    }
    else if(this.Active_Tab == 'Magic'){
      this.Temp_Data_Magic = this.Temp_Data_Magic.filter(d => d.id !== Number(element));
    }

  }

  Check_Is_Thirds(num: number) {
    let sum: number = this.get_sum_Of_Digits(num);
    let Reminder2: number = Math.floor(sum) % 3;
    if (Reminder2 == 0)
      return true;
    else
      return false;

  }

  Check_Is_Fifths(num: number) {
    let sum: number = this.get_sum_Of_Digits(num);
    let Reminder2: number = Math.floor(sum) % 5;
    if (Reminder2 == 0)
      return true;
    else
      return false;
  }


  get_sum_Of_Digits(num: number): number {
    let sum: number = 0;
    while (num > 0) {
      let m: number = Math.floor(num) % 10;
      sum = sum + Math.floor(m);
      num = Math.floor(Math.floor(num) / 10);
    }
    return sum;
  }

}
