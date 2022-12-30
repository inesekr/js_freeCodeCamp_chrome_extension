let myLeads = [];

// myLeads=JSON.parse(myLeads);
// myLeads.push("www.epiclead.com");

// myLeads= JSON.stringify(myLeads);

// console.log(typeof myLeads);

const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

// localStorage.setItem("myLeads", "www.examplelead.com");

// console.log(localStorage.getItem("myLeads"));

// localStorage.clear();

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
// console.log(leadsFromLocalStorage);

if (leadsFromLocalStorage){
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

// const tabs= [
//   {url: "https://www.linkedin.com/in/per-harald-borgen/"}
// ];

tabBtn.addEventListener("click", function(){
  // console.log(tabs[0].url);
  chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  })
})

function render(leads){
  let listItems= "";
  for (let i=0; i<leads.length; i++){
    // listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads + "</a></li>";
    listItems += `
      <li>
        <a target='_blank' href='${leads[i]}'>
          ${leads[i]}
        </a>
      </li>
      `;
  
    // ulEl.innerHTML+= "<li>" + myLeads[i] + "</li>";
  }
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function(){
  localStorage.clear();
  myLeads=[];
  // ulEl.innerHTML="";
  render(myLeads);
})

inputBtn.addEventListener("click", function(){
  myLeads.push(inputEl.value);
  inputEl.value= "";

localStorage.setItem("myLeads", JSON.stringify(myLeads));

  render(myLeads);
  // console.log(localStorage.getItem("myLeads"));
})

// or this way: 
// const li = document.createElement ("li");
// li.textContent = myLeads[i];
// ulEl.append(li);