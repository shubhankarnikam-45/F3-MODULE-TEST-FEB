
let bookContainer = document.querySelector("#book-container");
console.log(bookContainer)
//getting the index of book data to be shown in output using localstorage.
let index = JSON.parse(localStorage.getItem("userIndexWhichIsClicked"));

//getting the all localstorage data of book item.
let items = JSON.parse(localStorage.getItem("data"));
console.log(items)

//here our desied item form localStorage.
let desirdItem = items[index]
console.log(desirdItem)

let arr = [];
arr.push(desirdItem)
let item = arr;
item = item.map((ite) => {
    return `
    <a  href="searched.html"  onclick=" return fun(${index})">
    <div id="flex-box" col-12 style="color:white; border:1px solid white; padding:32px">
        <span><b>${(index + 1) + ". " + ite[index + 1]}</b></span>
        <span><b>Search On: ${ite["Searched On"]}</b></span>
    </div>
</a> 


    `
});
console.log(item)

bookContainer.innerHTML = item.join("")

//adding data (book data)









SearchBooks();
async function SearchBooks()
{


    let response=await fetch("https://www.googleapis.com/books/v1/volumes?q=percy+jackson");
    let data=await response.json();
    let item1=data.items;
    console.log(item1)
    // console.log(item.volumeInfo.imageLinks.thumbnail)
   
   
   





   

   

   
    item1=item1.map((product,i)=>{

    let name=desirdItem[index+1];
    console.log("name",name)
    enterResultToLowerCase=name.toLowerCase();
    //converting title to lower case.
    let titleToLowerCase=product.volumeInfo.title.toLowerCase();

    //converting author name ot lowe case.
    let authorNameToLowerCase=product.volumeInfo.authors[0].toLowerCase();
        console.log(enterResultToLowerCase,titleToLowerCase,authorNameToLowerCase)

    if(titleToLowerCase.indexOf(enterResultToLowerCase) >-1|| authorNameToLowerCase.indexOf(enterResultToLowerCase)>-1)
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

   
   
   
    })
    console.log(item1)

 bookContainer.innerHTML+=item1.join("");

}
