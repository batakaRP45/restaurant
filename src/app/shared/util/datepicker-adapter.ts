
var currentdate: Date = new Date();
var mo:string = (currentdate.getMonth()+1)<10?"0"+(currentdate.getMonth()+1):""+(currentdate.getMonth()+1);
var da:string = currentdate.getDate()<10?"0"+currentdate.getDate():""+currentdate.getDate();
var hh:string = currentdate.getHours()<10?"0"+currentdate.getHours():""+currentdate.getHours();
var mm:string = currentdate.getMinutes()<10?"0"+currentdate.getMinutes():""+currentdate.getMinutes();
var ss:string = currentdate.getSeconds()<10?"0"+currentdate.getSeconds():""+currentdate.getSeconds();

export const DATE = currentdate.getFullYear() + "-"+ mo + "-"+ da;
export const TIME = DATE+" "+hh+":"+mm+":"+ss;
