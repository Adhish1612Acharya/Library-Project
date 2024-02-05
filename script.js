//Searching book code;

let url="https://openlibrary.org/search.json?sort=title&author=";

let loading_div=document.querySelector(".loading_img");
loading_div.classList.add("display_none");

let h3=document.querySelector("h3");
h3.classList.add("display_none");

let h2=document.querySelector("h2");
h2.classList.add("display_none");

let inp=document.querySelector("#lib-inp");

let inp2=document.createElement("input");
inp2.setAttribute("type","checkbox");

let search_btn=document.querySelector("#search_btn");

let add_btn=document.querySelector("#add_btn");
add_btn.classList.add("display_none");

let book_name_div=document.querySelector(".book_name_list");

let ol1=document.querySelector(".book_list");

let ol2=document.querySelector(".fav_book_list");

let user_book_list=document.querySelector(".user_book_list");

let author;

search_btn.addEventListener("click",async ()=>{
    search_btn.classList.add("display_none");
    loading_div.classList.remove("display_none");
    h3.classList.add("display_none");
    add_btn.classList.add("display_none");
    book_name_div.classList.add("book_name_list");
    book_name_div.classList.remove("max-content");
    ol1.innerText="";
    author=inp.value;
    let docs=await call_api_author(author);
    if(docs.length==0){
        h2.classList.remove("display_none");
        loading_div.classList.add("display_none");
        search_btn.classList.remove("display_none");
    }else{
        h2.classList.add("display_none");
        title_name(docs);
    }
});

async function call_api_author(author){
    try{
        let book_data=await axios.get(url+author);
        return book_data.data.docs;
    }
    catch(err){
       return err;
    }
}

function title_name(docs){
    for(i=0;i<docs.length;i++){
        let doc1=docs[i].title.toUpperCase();
        if(i==docs.length-1){
               let li=document.createElement("li");
                li.classList.add("list_classname");
                li.classList.add("reference_class");
                li.innerText=doc1;
                let inp2=document.createElement("input");
                inp2.setAttribute("type","checkbox");
                inp2.classList.add("book_title_checkbox");
                // console.log(doc1);
                ol1.append(li);             
                li.append(inp2);
                break;
        }
        let doc2=docs[i+1].title.toUpperCase();
            if(doc1===doc2){
                continue;
               }else{
                   let li=document.createElement("li");
                 li.classList.add("list_classname");
                    li.innerText=doc1;
                    let inp2=document.createElement("input");
                    inp2.setAttribute("type","checkbox");
                    inp2.classList.add("book_title_checkbox");
                    // console.log(doc1);
                    h3.classList.remove("display_none");
                    ol1.append(li);             
                    li.append(inp2);
               }
        }
        book_name_div.classList.remove("book_name_list");
        book_name_div.classList.add("max-content");
        user_book_list.classList.remove("user_book_list");
        user_book_list.classList.add("max-content");
        add_btn.classList.remove("display_none");
        inp.value="";
        loading_div.classList.add("display_none");
        search_btn.classList.remove("display_none");
}

//User booklist code;

add_btn.addEventListener("click",()=>{
    let created_checkboxes=document.querySelectorAll(".book_title_checkbox");
    for(let created_checkbox of created_checkboxes){
             if(created_checkbox.checked==true){
                created_checkbox.classList.add("display_none");
                created_checkbox.checked=false;
                let li2=document.createElement("li");
                li2.classList.add("user_book_list_classname");
               let parent_checkbox_text=created_checkbox.parentElement.innerText;
                li2.append(parent_checkbox_text);
                let delete_btn=document.createElement("button");
                delete_btn.classList.add("delete_btn");
                delete_btn.classList.add("delete_btn_style");
                delete_btn.innerText="Delete";
                li2.append(delete_btn);
                ol2.append(li2);
             }
             scrollTo();
    }

    }
);

let delete_btn_function=document.querySelector(".delete_btn");
ol2.addEventListener("click",(event)=>{
    if(event.target.nodeName="BUTTON"){
     let parentelement=event.target.parentElement;
     ol2.removeChild(parentelement);
    }
}
)

function scrollTo(){
   user_book_list.scrollIntoView({behavior:"smooth"});
};
