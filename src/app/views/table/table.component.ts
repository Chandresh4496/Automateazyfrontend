import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CustomStorageService } from 'src/app/service/custom-storage.service';
import { HttpTransferService } from 'src/app/service/http-transfer.service';

@Component({
  selector: 'view-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  columnList:any=[
    {headerName:'',key:'seq',checkbox:true},
    {headerName:'Lead Id',key:'id',cellClass:'tv-theme-color',width:150},
    {headerName:'Name',key:'name',cellClass:'tv-theme-color',width:150},
    {headerName:'Phone',key:'phone',width:150},
    {headerName:'Email',key:'email',cellClass:'tv-email-cell',width:150},
    {headerName:'Priority',key:'priority',width:150},
    {headerName:'Lead Type',key:'lead_type',width:150},
    {headerName:'Lead Owner',width:150},
  ]
  filterJson:any={
    "id": "",
    "name": "",
    "priority": "",
    "lead_type": "all",
    "isUntouched": 0,
    "source": "",
    "sdate": "",
    "edate": "",
    "uStartDate": "",
    "uEndDate": "",
    "activitySDate": "",
    "activityEndDate": "",
    "user_role": 1,
    "vc": 0,
    "page_no": 1,
    "limit": 10,
    "type": "",
    "leadStageCreator": "",
    "firstStageLeadAction": "",
    "secondStageLeadAction": "",
    "thirdStageLeadAction": "",
    "fourthStageLeadAction": "",
    "fifthStageLeadAction": "",
    "lastFirstStageLeadAction": "",
    "lastSecondStageLeadAction": "",
    "lastThirdStageLeadAction": "",
    "lastFouthStageLeadAction": "",
    "lastFifthStageLeadAction": "",
    "sub_stage": "",
    "allleadaction": "",
    "clgId": "",
    "sortKey": "lead_times_at",
    "sortOrder": "-1",
    "format": "search",
    "accessAllLeads": 1,
    "state": "",
    "city": "",
    "course": "",
    "stateName": "",
    "cityName": "",
    "courseName": "",
    "category": "",
    "noOfReEnquiry": "",
    "reEnquiryOperation": "",
    "noOfApplicationForm": "",
    "applicationFormOperation": "",
    "lead_score": "",
    "leadScoreOpreation": "",
    "lead_stage_count": "",
    "leadStageCountOpreation": "",
    "recentReEnquiredAtOperation": "",
    "lastReEnquiredAtOperation": "",
    "recentLeadStageAtOperation": "",
    "leadActivityAtOperation": "",
    "createdAtOperation": "",
    "updatedAtOperation": "",
    "leadAssignAtOperation": "",
    "reEnquiredClg": "",
    "lastReEnquiredClg": "",
    "reEnquiredClgSource": "",
    "reEnquiredsdate": "",
    "reEnquirededate": "",
    "reLastEnquiredsdate": "",
    "reLastEnquirededate": "",
    "utmSource": "",
    "utmCampaign": "",
    "utmMedium": "",
    "reEnquiredUtmSource": "",
    "reEnquiredUtmMedium": "",
    "reEnquiredUtmCampaign": "",
    "fw_sdate": "",
    "fw_edate": "",
    "n_id": "",
    "recentLeadStageStartDate": "",
    "recentLeadStageEndDate": "",
    "leadAssigneeStartDate": "",
    "leadAssigneeEndDate": "",
    "oldUserId": "",
    "reAssignedUserId": "",
    "activity_event": "",
    "publisher_tenant_id": "",
    "org_location_name": "",
    "sinceLeadOwnerChange": "",
    "createdAtAgeTimeGap": "",
    "ownerAssignmentAtAgeTimeGap": "",
    "stageCreatedAtAgeTimeGap": " ",
    "primary_source": "",
    "secondary_source": "",
    "tertiary_source": "",
    "last_source": ""
}
@Output() setItemCount:EventEmitter<number> = new EventEmitter();
itemDataList:any=[]
isLoading:boolean=true
isRedirectToLogin:boolean=false
paggingInfo:any={pageNo:1,limit:10,totalPageCount:0,pageLimitIndex:1}

  constructor(private httpService:HttpTransferService,private customStorage:CustomStorageService,private router: Router){
    
  }
  ngOnInit(){
    this.getLeadData()
  }
  getLeadData(){
    this.isLoading=true
    let json=this.filterJson;
    json.page_no=this.paggingInfo.pageNo || 1;
    json.limit=this.paggingInfo.limit || 1;
    this.httpService.getLeads(this.filterJson).subscribe(res=>{
      if(res.code==200){
        this.itemDataList=[]
        res.data.forEach((data:any)=>{
          this.itemDataList.push(data)
        })
        this.paggingInfo.totalItemCount=res.count
        this.setItemCount.emit(res.count)
        this.paggingInfo.totalPageCount=Math.ceil(this.paggingInfo.totalItemCount/this.paggingInfo.limit)

      }
      setTimeout(()=>{this.isLoading=false},80);
    },err=>{
      this.isLoading=false
      if(err.status==401){
        this.customStorage.clearAllData()
        this.isRedirectToLogin=true
        setTimeout(()=>{
          this.router.navigate(['/login']); //redirect to the login page
        },140)
      }
    })
  }

  //
}
