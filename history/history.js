let data=JSON.parse(localStorage.getItem("data"));
let historyName=document.querySelector("#book-container");
if(data){

        
        console.log(historyName)
        item=data;
        console.log(item)
        item=item.map((ite,i)=>{
            console.log(i+1+ite[i+1])
            return `
            <a  href="../searchedPage/searched.html"  onclick=" return fun(${i})">
                <div id="flex-box" col-12 style="color:white; border:1px solid white; padding:32px">
                    <span><b>${(i+1)+". "+ite[i+1] }</b></span>
                    <span><b>Search On: ${ite["Searched On"] }</b></span>
                </div>
            </a>
            `
        })

        {/* <a href="#Foo" onclick="return runMyFunction();">Do it!</a>
        and

        function runMyFunction() {
        //code
        return true;
        } */}

        historyName.innerHTML=item.join("");
}

// let linkTag=document.querySelector("#link-tag")
// console.log(linkTag)

function fun(i)
{
    // e.preventDefault();
   
       
    localStorage.setItem("userIndexWhichIsClicked",i);
        return true;
   
   
}


//code when user click on the clrear button.

let btnClear=document.querySelector("button");

btn.addEventListener("click",clearData)

function clearData()
{
    console.log("shs")
    localStorage.clear();
    historyName.innerHTML="";

    window.location.href="../landingPage/landingPage.html"
}