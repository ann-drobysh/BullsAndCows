let secretNumber, arrayForSecretNumber;
function getRandomNumber(){
    secretNumber = Math.round(Math.random()* 10000);
    console.log(secretNumber);
    arrayForSecretNumber = Array.from(String(secretNumber));
    console.log(arrayForSecretNumber);
    if (checkIfNumberCorrect(arrayForSecretNumber)) 
        {return arrayForSecretNumber} 
    else {return getRandomNumber()};    
}
getRandomNumber();

function checkIfNumberCorrect(number) {
    let copyOfNumberArr = [...number]; 
    if (copyOfNumberArr.length != 4) {
        return false;
    }    
    let sortedArrayForSecretNum = copyOfNumberArr.sort();
    for (let i = 0; i < sortedArrayForSecretNum.length; i++) {
        if (sortedArrayForSecretNum[i] != sortedArrayForSecretNum[i+1]) {            
            continue;
        } else {
           return false;          
        }
    }
    return true;
}

document.querySelector('.attempt').addEventListener("click", function(){
    let numberInputByUser = document.querySelector('.input-number').value;
    console.log(numberInputByUser);    
    let arrayForUsersNumber = Array.from(String(numberInputByUser));
    if (checkIfNumberCorrect(arrayForUsersNumber)) 
        {
         countBullsAndCows(arrayForSecretNumber, arrayForUsersNumber);
         document.querySelector('.input-number').focus();
         document.querySelector('.input-number').value = '';
        } 
    else {document.querySelector('.input-hint-error').classList.add("input-hint-visible")
    };      
})

document.querySelector('.input-number').addEventListener("focus", function() {
    document.querySelector('.input-hint-error').classList.remove("input-hint-visible");}
);

function countBullsAndCows(computerNumber, userNumber) {
    if (computerNumber.toString() === userNumber.toString()) {
        return document.querySelector('.communication').showModal();
    }
    else {     
    let bulls = 0;
    let cows = 0;
    for (let i = 0; i < computerNumber.length; i++) {
        for (let j = 0; j < userNumber.length; j++) {
            if (computerNumber[i] == userNumber[j] && i == j){bulls += 1;}
            else if (computerNumber[i] == userNumber[j] && i != j){cows += 1;}
            else {continue;}
        }
    }
    console.log(bulls);
    console.log(cows);
    let table = document.querySelector('.table');
    let row = table.insertRow();
    let cell1 = row.insertCell();
    let cell2 = row.insertCell();
    let cell3 = row.insertCell();
    cell1.innerHTML = userNumber.join('');
    cell2.innerHTML = bulls;
    cell3.innerHTML = cows;
    return {
        bulls,
        cows
    };
    }
}

document.querySelector('.reset').addEventListener("click", function(){
    location.reload();
});
document.querySelector('.rules').addEventListener("click", function(){
    document.querySelector('.rules-modal').showModal();
});
document.querySelector('.close-modal-btn').addEventListener("click", function(){
    document.querySelector('.rules-modal').close();
});
