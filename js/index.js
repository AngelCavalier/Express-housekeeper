function Express(fWeight,nWeight,time){
    this.fWeight = fWeight;
    this.nWeight = nWeight;
    this.time = time;
}

function Company(expresses) {
    this.expresses = expresses;
}

function initCompany(){
    var companys = new Array(5);

    var exps1 = new Array(10);
    var exps2 = new Array(10);
    var exps3 = new Array(10);
    var exps4 = new Array(10);
    var exps5 = new Array(10);

    //中通
    exps1[0]= new Express(15,8,2.8);
    exps1[1]= new Express(15,8,2.1);
    exps1[2]= new Express(15,8,2);
    exps1[3]= new Express(15,8,2.1);
    exps1[4]= new Express(10,5,1);
    exps1[5]= new Express(15,8,2);
    exps1[6]= new Express(15,8,2.1);
    exps1[7]= new Express(20,11,2.1);
    exps1[8]= new Express(15,8,2.8);
    exps1[9]= new Express(15,8,2);
    companys[0]= new Company(exps1);

    //圆通
    exps2[0]= new Express(12,6,2.6);
    exps2[1]= new Express(12,6,2.7);
    exps2[2]= new Express(12,6,2.5);
    exps2[3]= new Express(12,6,1.8);
    exps2[4]= new Express(10,6,1.2);
    exps2[5]= new Express(12,6,1.8);
    exps2[6]= new Express(12,6,1.8);
    exps2[7]= new Express(12,6,2.8);
    exps2[9]= new Express(12,6,2.9);
    exps2[9]= new Express(12,6,1.7);
    companys[1]= new Company(exps2);

    //申通
    exps3[0]= new Express(12,8,3);
    exps3[1]= new Express(12,8,2);
    exps3[2]= new Express(12,8,4);
    exps3[3]= new Express(12,8,2.8);
    exps3[4]= new Express(10,2,1);
    exps3[5]= new Express(12,8,1.8);
    exps3[6]= new Express(12,8,3);
    exps3[7]= new Express(12,8,1.9);
    exps3[8]= new Express(12,8,3);
    exps3[9]= new Express(12,8,1.8);
    companys[2]= new Company(exps3);

    //韵达
    exps4[0]= new Express(12,8,3);
    exps4[1]= new Express(12,8,3);
    exps4[2]= new Express(12,8,1.9);
    exps4[3]= new Express(12,8,3);
    exps4[4]= new Express(8,4,0.7);
    exps4[5]= new Express(12,8,1.8);
    exps4[6]= new Express(12,8,1.8);
    exps4[7]= new Express(12,8,1.8);
    exps4[8]= new Express(12,8,3);
    exps4[9]= new Express(12,8,1.8);
    companys[3]= new Company(exps4);

    //邮政
    exps5[0]= new Express(5,1,3.1);
    exps5[1]= new Express(5,1,2.8);
    exps5[2]= new Express(8,1.5,3.1);
    exps5[3]= new Express(5,1,2.8);
    exps5[4]= new Express(10,2,1.8);
    exps5[5]= new Express(8,1.5,2.8);
    exps5[6]= new Express(8,1.5,3.1);
    exps5[7]= new Express(8,1.5,2.8);
    exps5[8]= new Express(8,1.5,3.1);
    exps5[9]= new Express(8,1.5,2);
    companys[4]= new Company(exps5);

    return companys;

}

function getCheapestCompany(weight,companys,destination){
    var baseWeight = 10;
    var data = {
        minIndex : 0,
        money : 0
    }
    if(weight<=1){
        data.money = companys[0].expresses[destination].fWeight;
        data.minIndex = 0;
        for(var i=0;i<5;i++){
            var express = companys[i].expresses[destination];
            if(express.fWeight<data.money){
                data.money = express.fWeight;
                data.minIndex = i;
            }
        }
        return data;
    }
    if(weight>1) {
        data.money = (weight-1)*companys[0].expresses[destination].nWeight + companys[0].expresses[destination].fWeight;
        data.minIndex = 0;
        for(var i=0;i<5;i++){
            var cost = (weight-1)*companys[i].expresses[destination].nWeight + companys[i].expresses[destination].fWeight;
            if(cost<data.money){
                data.money;
                data.minIndex = i;
            }
        }
        return data;
    }
}

function getFastCompany(companys,destination){
    var data = {
        minIndex : 0,
        time : 0
    }
    data.time = companys[0].expresses[destination].time;
    data.minIndex = 0;
    for(var i=0;i<5;i++){
        var express = companys[i].expresses[destination];
        if(express.time<data.time){
            data.time = express.time;
            data.minIndex = i;
        }
    }
    return data;
}


function getResult(){
    var weight = document.getElementById('weight').value;
    var destination =$('#toPlace').val();

    var reg = /^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/;
    if(weight<=0||weight==null||!reg.test(weight)){
        alert('请输入正确地物件重量');
        return;
    }
    document.getElementById('detail').style.display = "block";
    var companys = initCompany();
    var cheapestData = getCheapestCompany(weight,companys,destination);
    var cheapsetName = getResultByIndex(cheapestData.minIndex);
    var fastData = getFastCompany(companys,destination);
    var fastName = getResultByIndex(fastData.minIndex);

    var tips = document.getElementById('tips');
    var text = '最便宜的快递是：<span class="red">'+cheapsetName+'</span> 预算：<span class="red">'+cheapestData.money+'</span>元<br><br>最快的快递公司是：<span class="red">'+fastName+'</span> 用时：<span class="red">'+fastData.time+'</span>天';
    tips.innerHTML = text;
}

function getResultByIndex(index){
    var resultName = "";
    switch(index){
        case 0:resultName = '<a href="https://my.zto.com/create" target="_blank">中通快递</a>';break;
        case 1:resultName = '<a href="https://ec.yto.net.cn/home" target="_blank">圆通快递</a>';break;
        case 2:resultName = '<a href="https://my.sto.cn/" target="_blank">申通快递</a>';break;
        case 3:resultName = '<a href="http://membernew.yundasys.com:15116/member.website/pages/I_want_send/I_want_send.html" target="_blank">韵达快递</a>';break;
        case 4:resultName = '<a href="http://www.11183.com.cn/ec/order/index" target="_blank">邮政快递</a>';break;
    }
    return resultName;
}

var popClose = document.getElementById('shutdown');
popClose.addEventListener('click',function(){
    document.querySelector('.popup').style.display="none";
});
