let users=JSON.parse(localStorage.getItem("users")||"[]");
let nameInput=document.getElementById("name");
let ageInput=document.getElementById("age");
let weightInput=document.getElementById("weight");
let heightInput=document.getElementById("height");
let addUserbtn=document.getElementById("addUserBtn");
let userTable=document.getElementById("userTable");

addUserbtn.addEventListener("click",() => {
    let name=nameInput.value.trim();
    let age=parseInt(ageInput.value);
    let weight=parseFloat(weightInput.value);
    let height=parseFloat(heightInput.value);

    if(!name || !age || !weight || !height){
        alert("Please fill all fields!");
        return;
    }


    let bmi=(weight/((height/100)** 2)).toFixed(2);
    let advice="";
    if(bmi<18.5)advice="Underweight: Eat more calories and protein";
    else if(bmi>=18.5 && bmi <=24.9)advice="Normal: Keep up the good work!";
    else advice="Overweight: Exercise & maintain diet";

    let user={name,age,weight,height,bmi,advice};
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    displayUsers();
    clearInputs();
});

function displayUsers(){
    userTable.innerHTML="";
    users.forEach((u,index)=>{
        let bmiClass="";
        if(u.bmi<18.5)bmiClass="underweight";
        else if(u.bmi>=18.5 && u.bmi<= 24.9)bmiClass="normal";
        else bmiClass="overweight";

        let row=document.createElement("tr");
        row.className=bmiClass;
        row.innerHTML=`
        <td>${u.name}</td>
        <td>${u.age}</td>
        <td>${u.weight}</td>
        <td>${u.height}</td>
        <td>${u.bmi}</td>
        <td>${u.advice}</td>
        <td><button class="delete-btn" onclick="deleteUser(${index})">Delete</button></td>
        `;
        userTable.appendChild(row);
    });
}

function deleteUser(index){
    users.splice(index,1);
    localStorage.setItem("users",JSON.stringify(users));
    displayUsers();
}

function clearInputs(){
    nameInput.value="";
    ageInput.value="";
    weightInput.value="";
    heightInput.value="";
}

displayUsers();
