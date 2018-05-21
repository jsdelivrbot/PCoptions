import { Component, OnInit,ChangeDetectorRef,ViewEncapsulation} from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import {GlobalData} from "../../../../providers/GlobalData";
import { ElMessageService } from 'element-angular';
import {FormBuilder, Validators} from '@angular/forms';
import { myService } from "../myService";
import { element } from 'protractor';
@Component({
  selector: 'app-bankCard',
  templateUrl: './bankCard.component.html',
  styleUrls: ['./bankCard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BankCardComponent implements OnInit {
  public id:number;
  public bankData:any=[];
  public noData:boolean=false;
  public showDialog:boolean=false;
  public bankId:any;//删除银行卡
  public step:number=1;
  public bankListData:any[] = [];
  public options:any[]=[];
  public defaultbank:string;//默认选择银行
  public choosedbank:string;//银行code
  public branch:string;//支行
  public choosedplace:string;//选择地区
  public bankForm:any;//表单

  	constructor(
      // private route:ActivatedRoute,
      private globalData:GlobalData,
      private changeDetectorRef:ChangeDetectorRef,
      private formBuilder: FormBuilder,
      public myService:myService,
      public message: ElMessageService,
    ) { 
		this.bankForm = this.formBuilder.group({
			banknumber:['',[Validators.required,Validators.minLength(16),Validators.maxLength(21)]],
    	});
		//获取银行列表
		myService.getBanks()
		.subscribe(res => {
			if(res.success=="true"){
				if(!res.data)return;
				this.defaultbank=res.data[0].bankName;
				this.choosedbank=res.data[0].bankCode;
				res.data.forEach((value,index,arr)=>{
					this.bankListData.push({
						label: value.bankName, value: value.bankCode
					})
				})
			}else{
				this.message['error'](res.errorMsg)
			}
		})
		//获取城市列表
		myService.getCityData()
		.subscribe(res => {
			res.forEach(element1=>{
				if(element1.children){
					element1.children.forEach(element2=>{
						element1.value=element1.label;
						if(element2.children){
							element2.value=element2.label;
							element2.children.forEach(element3=>{
								element3.value=element3.label;
							})
						}
					})
				}
			})
			this.options=res;
		})
    }
  	ngOnInit() {
     	//获取银行卡
		this.myService.getBankCard(this.globalData.userId)
		.subscribe(res => {
			if(res.success=="true"){
				if(res.data.length==0){
					this.noData=true;
				}
				this.bankData=res.data;
			}else{
				this.noData=true;
				this.message['error'](res.errorMsg)
			}
		})
	}
	//添加银行卡
	addCard(val){
		if(this.globalData.cardCount>2){
			this.message['warning']('最多添加三张银行卡');
			return;
		}
		this.myService.addBankCard(this.choosedbank,val.banknumber,this.branch ,this.choosedplace,this.choosedplace)
		.subscribe(res => {
			if(res.success=="true"){
				this.globalData.isBankCard=true;
				this.globalData.cardCount++;
				this.message['success']('添加成功')
			}else{
				this.message['error'](res.errorMsg)
			}
		})
	}
	//选择银行
	chooseBank(val){
		this.choosedbank=val.value;
		this.defaultbank=val.label;
	}
	//选择地区
	choosePlace(val){
		let temp='';
		val.forEach(element => {
			temp=temp+element+" ";
		});
		this.choosedplace=temp;
		console.log(this.choosedplace)
	}
	//对话框
	dialog(val){
		this.showDialog=true;
		this.bankId=val;
	}
	//解绑银行卡
	delCard(val){
		if(!val){
			this.showDialog=false;
		}else{
			this.myService.delBankCard(this.globalData.userId,this.bankId)
			.subscribe(res => {
				if(res.success=="true"){
					let temparr=[];
					this.bankData.forEach((value,index,arr)=>{
						if(value.id!=this.bankId){
							temparr.push(value)
						}
					})
					this.bankData=temparr;
					this.globalData.cardCount--;
					this.showDialog=false;
					this.message['success']('解绑成功')
				}else{
					this.showDialog=false;
					this.message['error'](res.errorMsg)
				}
			})
		}
	}
	//下一步添加银行卡
	nwxtStep(){
		this.step=2;
	}
}
