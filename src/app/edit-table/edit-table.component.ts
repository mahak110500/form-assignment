import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdataService } from '../userdata.service';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {
  
  dataInfo=[]

  constructor(private userData:UserdataService,private router:ActivatedRoute,private Onrouter: Router ) { }

  dataFetched;
  idFetched: any;

  ngOnInit(): void {
    //to get the data to auto fill in input fields
		this.dataInfo = this.userData.getUserdata;

    
		console.log('this.router.snapshot.params.id');
		const objIndex = this.userData.getUserdata.findIndex((obj => obj.id == this.router.snapshot.params.id));

		this.dataFetched = (this.userData.getUserdata[objIndex].data)
		this.idFetched = (this.userData.getUserdata[objIndex].id)



  }

 

  // deleteRow(d){
	// 	console.log(d)
	// 	const index = this.userData.getUserdata.indexOf(d);
	// 	this.userData.getUserdata.splice(index, 1);
	// }

}
