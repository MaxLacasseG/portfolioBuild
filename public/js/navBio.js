window.addEventListener("load", ()=>{
    let lis = document.querySelectorAll(".listeProjets ul li");
    let sectionParent = document.querySelector("div.desc");
    let sections = sectionParent.querySelectorAll("section");

    for(let li of lis){
        console.log(li)
        li.addEventListener('click',(evt)=>{
            enleverLienCourant();
            li.classList.add("courant");
            cacherDiv();
            let nomSection = li.dataset.section;
            sectionParent.querySelector("."+nomSection).style.display ="block";
        },false);
    }

    const enleverLienCourant = ()=>{
        for(let li of lis){
            li.classList.remove("courant");
        }
    }
    const cacherDiv = ()=>{
        for(let section of sections){
            section.style.display = "none";
        }
    }
},false);