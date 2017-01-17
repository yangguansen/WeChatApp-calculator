var writeFirst, writeSecond;//运算中的第一个数值和第二个数值
var writeArr = "";          //输入框中显示的数字
var calItem;                //运算项+-*/
var calResult;              //运算结果
Page({
    data:{
        result:"0",
        XMLItem:[
            {             
                class:'body-1',
                item : [
                    {key:'+', tapclass : 'chooseOperation'},
                    {key:'-', tapclass : 'chooseOperation'},
                    {key:'*', tapclass : 'chooseOperation'},         
                    {key:'/', tapclass : 'chooseOperation'}
                ]
            },
            {                
                class:'body-2',
                item : [
                    {key:'1', tapclass : 'chooseNum'},
                    {key:'2', tapclass : 'chooseNum'},
                    {key:'3', tapclass : 'chooseNum'},         
                    {key:'←', tapclass : 'deleteNum'}
                ]
            },
            {
                class:'body-3',
                item : [
                    {key:'4', tapclass : 'chooseNum'},
                    {key:'5', tapclass : 'chooseNum'},
                    {key:'6', tapclass : 'chooseNum'},         
                    {key:'C', tapclass : 'clearNum'}
                ]
            }
        ],
        body4parentItem : [
            {
                class:'body-4',
                item:[
                     {key:'7', tapclass : 'chooseNum'},
                    {key:'8', tapclass : 'chooseNum'},
                    {key:'9', tapclass : 'chooseNum'}         
                ]
            },
            {
                class:'body-5',
                item:[
                     {key:'0', tapclass : 'chooseNum'},
                    {key:'.', tapclass : 'chooseDot'}    
                ]
            }
        ],
        
    },
    initvariable : function(){
        calResult = undefined;
        writeFirst = undefined;
        writeSecond = undefined;
        writeArr = '';
        this.setData({
            result:'0'
        }) 
    },   
    chooseNum : function(e){
        if(typeof calItem == 'undefined' && typeof writeSecond !== 'undefined'){           
           this.initvariable();         
        }
        var keyValue = e.target.dataset.key;
        if(writeArr.substr(0, 1) == '0' && String(keyValue) == '0'){return}//屏蔽首位和第二位数字都是0的情况
        writeArr+=String(keyValue);
        this.setData({
            result:writeArr
        })
    },
    chooseOperation : function(e){
        if(writeFirst  && writeArr){
            writeSecond = writeArr;
            this.calNum();            
            calItem = e.target.dataset.key;
        } else {
            calItem = e.target.dataset.key;
            writeFirst = writeArr;
        }       
        writeArr = "";           
    },
    calNum:function(){
        typeof calResult == 'undefined' ? writeSecond = writeArr : writeFirst = calResult;writeSecond = writeArr;
        switch (calItem){
            case '+':
                calResult = Number(writeFirst) + Number(writeSecond);    
                break;
            case '-':
                calResult = Number(writeFirst) - Number(writeSecond);    
                break;
            case '*':
                calResult = Number(writeFirst) * Number(writeSecond);    
                break;
            case '/':
                calResult = Number(writeFirst) / Number(writeSecond);    
                break;
        }
         
        this.setData({
            result : calResult
        })
        calItem = undefined;
        writeFirst = calResult;
        writeSecond = undefined;
        writeArr = "";
    },
    chooseDot:function(){
        if(writeArr.indexOf(".")> -1){
            return
        }
        if(writeArr == ""){
            writeArr+="0.";
        } else{
             writeArr+=".";
        }
        
        this.setData({
            result:writeArr
        })
    },
    deleteNum: function(){
        if(this.data.result == calResult){
            calItem = undefined;
            this.initvariable();
        }
       writeArr == "0" ? function(){return} : {};           //面板数字为0时，按退位键不再响应
       writeArr = writeArr.substring(0,writeArr.length-1);  //退位键删除最后一位数字    
        this.setData({
            result : writeArr == "" ? '0' : writeArr
        })
    },
    clearNum : function(){
        calItem = undefined;
         this.initvariable();
    }
})