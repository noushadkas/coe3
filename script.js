function getMenu(){
   fetch(
    "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
   )
   .then((response)=>
   response.json())
   .then((data) => {
    const cardContainer = document.getElementById("card-container");
    for(let i=1; i<=6 ; i++){
        const card = data.find((item) => item.id===i);

        // create card Element
        const cardElememt=document.createElement("div");
        cardElememt.classList.add("card");

        // create image Element
        const imgElement = document.createElement("img");
        imgElement.src=card.imgSrc;
        cardElememt.appendChild(imgElement);

        // create heading element
        const  heading= document.createElement("h3");
        heading.innerHTML=card.name;
        heading.style.color="white";
        cardElememt.appendChild(heading);

        // create price element
        const price = document.createElement("p");
        price.innerHTML=card.price;
        price.style.color="white";
        price.style.display="inline";
        
        const priceContainer=document.createElement("span");
        priceContainer.innerHTML="$";
        priceContainer.style.display="inline";
        priceContainer.style.color="white";

        const additionalText = document.createElement("span");
        additionalText.innerHTML="/-";
        additionalText.style.display="inline";
        additionalText.style.color="white";

        cardElememt.append(priceContainer,price,additionalText);

        // Create button element 
        const button = document.createElement("input");
        button.type="button";
        button.classList.add("add-button");
        button.value="+";
        button.style.backgroundColor="#363a43";
        cardElememt.append(button);

        // Append card element to the container

        cardContainer.appendChild(cardElememt);

    }
   })
   .catch((error)=>{
    console.log("An error occurred:" , error);
   });

}
 
// TakeOrder Function
function takeOrder(){
return new Promise((resolve,reject) =>
{
    setTimeout(()=>{
        fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json")
        .then((response) => response.json())
        .then((data) => {
            const order = [];
            const len = data.length;
            for(let i=0; i<3 ; i++){
                const rand = Math.floor(Math.random()*len);
                order.push(data[rand]);
            }
            resolve(order);
        })
        .catch((error)=> reject(error));
    },2500);

    
});
}

// Order preparation function
function orderPrep(){
    return new Promise((resolve,reject) =>
    {
    setTimeout(()=>{
     resolve({order_status:true , paid: false});
    },1500);
    });
}

// Pay Order Function
function payOrder(){
    return new Promise((resolve, reject)=>
    {
     setTimeout(()=>{
     resolve({order_status:true , paid : true});
     },1000);
    });
}
 

// ThankYOU Fucntion

function thankyouFnc() {
    alert("Thank you for eating with us today!");
}

window.onload = () => {
    getMenu();
    takeOrder()
    .then((order) => {
        console.log("Order placed:",order);
        return orderPrep();

    })
    .then((status) => {
        console.log("Order preparation status:",status);
        return payOrder();
    })
    .then((paymentStatus)=>{
        console.log("Payment Status",paymentStatus);
        if(paymentStatus.paid){
            thankyouFnc();
        }
    })
    .catch((error) => {
        console.log("Error occured while taking the order:",error);
    });
};