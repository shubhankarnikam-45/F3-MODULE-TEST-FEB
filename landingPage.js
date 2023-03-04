//code for the search page.
let bookContainer=document.querySelector("#book-container")
let btn=document.querySelector("#btn")
let historyTag=document.querySelector("a")


//creating array to store the user search history.
const arr=[];


//if localStorage is not empty then it redirec to the history.html page
if(localStorage.getItem("data"))
{
    console.log("S");
    // historyTag.setAttribute("href","../history/history.html");
    //document.querySelector('a').setAttribute("href", "../history/history.html");
    window.location.href = "./history.html";
}



//code for history which is in header

//addevent listener in the search button
btn.addEventListener("click",SearchBooks)
id=1;
async function SearchBooks(e)
{
  e.preventDefault();

  if(localStorage.getItem("data") || id>=1)
    {
        console.log("S");
        // historyTag.setAttribute("href","../history.html");
        document.querySelector('a').setAttribute("href", "./history.html");
        //window.location.href = "../history/history.html";
    }
    else
    {
        alert("NO RESULT FOUND IN HISTORY")
    }
    let response=await fetch("https://www.googleapis.com/books/v1/volumes?q=percy+jackson");
    let data=await response.json();
    let item=data.items;
    console.log(data)
    // console.log(item.volumeInfo.imageLinks.thumbnail)
   
    //here we getting the value in input field.
    let enterResult=document.querySelector("input").value;

    //converting the entered result in the lower case.
    let enterResultToLowerCase=enterResult.toLowerCase();


    //if the search bar is empty then no any operation

    if(enterResult.length!=0){
    //getting time and data
    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
   
   

    //storing the data in the localStorage to display on the history.html page
    let obj={};
    obj[id++]=enterResultToLowerCase;
    obj["Searched On"]=`${cDay}/${cMonth}/${cYear} at  ${new Date().toLocaleTimeString()}`;
    arr.push(obj)
   
    localStorage.setItem("data",JSON.stringify(arr));





   

   

   
    item=item.map((product,i)=>{

    
    //converting title to lower case.
    let titleToLowerCase=product.volumeInfo.title.toLowerCase();

    //converting author name ot lowe case.
    let authorNameToLowerCase=product.volumeInfo.authors[0].toLowerCase();


    if(enterResultToLowerCase.length>1 ){

    if(titleToLowerCase.indexOf(enterResultToLowerCase) >-1|| authorNameToLowerCase.indexOf(enterResultToLowerCase)>-1 )
    {
        return `
        <div class="col-sm-4 pt-5" >
            <div class="card" style="height:700px" >
                <img style="height:400px" src="${product.volumeInfo.imageLinks.thumbnail}" class="card-img-top" alt="image" >
                <div class="card-body">
                    <h5 class="card-title">Title</h5>
                    <p class="card-text">${product.volumeInfo.title}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><b>Author:</b>${product.volumeInfo.authors}</li>
                    <li class="list-group-item"><b>Page Count:</b>${product.volumeInfo.pageCount}</li>
                    <li class="list-group-item"><b>Publisher:</b>${product.volumeInfo.publisher}</li>
                </ul>
    
                <button class="main-btn">Buy Now</button>
                
            </div>
        </div>`
    }

   
}
   
    })

console.log(item)
    bookContainer.innerHTML=item.join("");
//after entering the value we clear the value also
 document.querySelector("input").value="";
}
   
}

