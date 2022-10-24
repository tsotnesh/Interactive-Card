'use strict'

// buttonebi da alertebi, romelsac unda daukavshirdes javaskripti, imati chamonatvale, zogi id-ti da zogi klasit.

const btnConfirm = document.querySelector(".btn");
const formClass = document.querySelector(".formclass");
const afterConfirm = document.querySelector(".after-confirm");
const inputName = document.querySelector("#fname");
const inputCardNumber = document.querySelector("#cnumber");
const inputMonth = document.querySelector("#month");
const inputYear = document.querySelector("#year");
const inputCVC= document.querySelector("#cvc");
const continueButton = document.querySelector("#btn");
const alertext1 = document.querySelector("#alertname");
const alertext2 = document.querySelector("#alertnumber");
const alerttext3 = document.querySelector("#alertmonth");
const alerttext4 =document.querySelector("#alertyear");
const alerttext5 =document.querySelector("#alertcvc");

// es sachiroa rom mudmivad gverdi ar refreshdebodes, sachiro da mnishvnelovani parametria.
function mySubmitFunction(e) {
    e.preventDefault();
    someBug();
    return false;
}


// gamovides thank you fanjara da input velebi rom waishalos eg funkciaa.
const afterConfirmClick = function() {
    formClass.classList.add("hidden");
    afterConfirm.classList.remove("hidden");
}


// es methodi, an funkcia ufrosworad amowmebs sheyvanil stringshi tua ricxvebi, da tu aris alert gamaogdebs
//tu ara da chveulebrivad gaushvebs shemowmebaze.
function checkStringForNumbers(input){
    let str = input;
    for( let i = 0; i < str.length; i++){
        if(!isNaN(str.charAt(i)) && (str.charAt(i) !== ' ')){   
            return true;
        }
    }
    return false;
}

// tve rom sworad iyos ornishna ricxvebshi magistvisaa es kodi, da rom ar daiweros 12ze magali ornishna
//ricxvi, amis shemowmebis uketesi gzebicaa ratkamunda magram am etapze es methodi iyos.
    
    function checkMonth(c) {
    if (Number(c.charAt(0)) === 0 && Number(c.charAt(1))!==0) {
        return true;
    } else if(Number(c) === 10 || Number(c) === 11 || Number(c) === 12) {
        return true;
    } else {
        return false;
    }
    
}



// funkcia ra xdeba confirm buttonis shemdeg yvelaferi aq aris gawerili.
const ConfirmNext = function  () {
    const text = inputName.value;
    const numcard = inputCardNumber.value;
    const nummonth = inputMonth.value;
    const numyear = inputYear.value;
    const numcvc = inputCVC.value;
    const shortyear = numyear.substring(2);
    
    //es mchirdeba rom kavshiri moxdes sheyvanili monacemis sisworesa da shemdeg ukve axali fanjris gamogdebastan
    //dakavshirebit, plus sheyvanili monacemebi sworad rom gamochndnen ekranze
    let checkname=0;
    let checknumber=0;
    let checkmonth =0;
    let checkyear =0;
    let checkcvc=0;
    
    //es sachiroa rom sheyvanili baratis nomeri ekranze daishalos, amaze martivadac daiwereboda eg kodi mara:)
    const screennumcard = numcard.substring(0,4) + " " + numcard.substring(4,8) + " " +numcard.substring(8,12) + " " + numcard.substring(12,16);
    
    // methodi romelic amowmebs rom strigshi rame symbolo ar shediodes. esec sachiroa wesit.
    function checkIfStringHasSpecialChar(_string)
{
    let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(spChars.test(_string)){
      return true;
    } else {
      return false;
    }
}
    //gadis cardholdername shemowmebas.
    if(checkStringForNumbers(text) || checkIfStringHasSpecialChar(text)) {
        alertext1.classList.remove("hidden");
        checkname=1;
        } else {
        checkname=0;
        alertext1.classList.add("hidden");
}


    //gadis baratis nomris shemowmebas, ricxvebis garda asoebi rom ar shevidnen da plus zoma 16 ro unda
    //iyos.
    if(!Number.isInteger(Number(numcard)) || (numcard.length !== 16)) {
            alertext2.classList.remove("hidden");
            checknumber=1;       
     } else {
        checknumber=0;
        alertext2.classList.add("hidden");
            
    }
    //tvis ricxvis shemowmeba gadis, tu arasworia gamova alerti, tu sworia araferic ar gamova.
    if(!Number.isInteger(Number(nummonth)) || (nummonth.length !== 2)) {
        alerttext3.classList.remove("hidden");
        checkmonth=1;
    } else {
        if (checkMonth(nummonth)) {
        alerttext3.classList.add("hidden");
        checkmonth=0;
        } else {
        alerttext3.classList.remove("hidden");
        checkmonth=1;
        }        
    }
    //aq mowmdeba welis siswore, ar gacdes 4s sigrdzes da asoebi ar chaiweros.
    if(!Number.isInteger(Number(numyear)) || (numyear.length !== 4)) {
        alerttext4.classList.remove("hidden");
        checkyear =1;  
    } else {
        alerttext4.classList.add("hidden");
        checkyear =0;
        
    }
    
    //cvc-s shemowmeba gvaqvs aq.
    if(!Number.isInteger(Number(numcvc)) || (numcvc.length !== 3)) {
        alerttext5.classList.remove("hidden");
        checkcvc=1;
    } else {
        alerttext5.classList.add("hidden");
        checkcvc=0;
    }
    
    //tu yvelaferi wesrigshia mashin gadavalt axal etapze, da baratze monacemebi sheicvleba.
    if ((checkname+checkmonth+checkyear+checknumber+checkcvc)===0) {
        afterConfirmClick();
        document.getElementById("screen-card-number").textContent = screennumcard;
        document.getElementById("card-holder-name").textContent= text.toUpperCase();
        document.getElementById("date-card").textContent = `${nummonth}/${shortyear}`
        document.getElementById("card-cvc").textContent = numcvc;
    }

}

    // aq piriqit thank you ishleba da isev input velshi vbrundebit, ogond initialization gvinda
    //anu parametrebi unda gadaresettdnenn da grafebi dacarieldes.
    const afterContinueClick = function() {
        formClass.classList.remove("hidden");
        afterConfirm.classList.add("hidden");
        document.getElementById("screen-card-number").textContent = "0000 0000 0000 0000";
        document.getElementById("card-holder-name").textContent = "CARDHOLDER NAME";
        document.getElementById("date-card").textContent = "00/00";
        document.getElementById("card-cvc").textContent = "000";
        inputName.value = "";
        inputCardNumber.value = "";
        inputMonth.value = "";
        inputYear.value = "";
        inputCVC.value = "";
    }

//listenerebi romlebmac es funkciebi unda sheasrulon.
btnConfirm.addEventListener('click', ConfirmNext);
continueButton.addEventListener('click', afterContinueClick);





