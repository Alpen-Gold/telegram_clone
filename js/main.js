// let bgBigElement = document.querySelector(".bg-big-element");
// let buttonStartEditor = document.querySelector("#button-start-editor");
// let editorBg = document.querySelector("#editor-bg");
// editorBg.style.display = "none";
// // ===============================
// buttonStartEditor.addEventListener("click", function () {
//   bgBigElement.style.display = "none";
//   editorBg.style.display = "";
// });

// ========================================

let HTMLcard = document.querySelector("#HTMLcard");
let CSScard = document.querySelector("#CSScard");
let JScard = document.querySelector("#JScard");
let previewCard = document.querySelector("#previewCard");
let dataIndex = 0;
let projectСhoose = false;
let projectDisplay = document.querySelector("#project-display");

// =======================================

let startProject = () => {
  makeCodeEditorHtml("<!-- HTML -->", "editorCodeHTML");
  makeCodeEditorCss("/* CSS */", "editorCodeCSS");
  makeCodeEditorJs("// JS ", "editorCodeJS");
};

let makePreview = () => {
  if (projectСhoose) {
    console.log("refresh !");
    // console.log(editorHtml.getValue());
    // console.log(editorCss.getValue());
    // console.log(editorJs.getValue());

    let editorPreview =
      document.getElementById("preview").contentWindow.document;
    editorPreview.open();
    editorPreview.write(`
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Project</title>
    <!-- bootstrap link -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
      crossorigin="anonymous"
    />

   
    <!-- icon -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
      integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />

    <style>
    
  ${editorCss.getValue()}

    </style>
  </head>
  <body>
   
  ${editorHtml.getValue()}

    <!-- ======================================================================== -->

    <script
      src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
      integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"
      integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD"
      crossorigin="anonymous"
    ></script>

    <!-- axios -->

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>



    
    <script>
    
    ${editorJs.getValue()}
    </script>
    
  </body>
</html>

    `);
    editorPreview.close();

    // console.log(editorPreview);
    console.log(dataIndex, "project index");
    console.log(data[dataIndex].all_code);
    Object.values(data[dataIndex].all_code).map((item, i) => {
      if (i === 0) {
        data[dataIndex].all_code.code_html = String(editorHtml.getValue());
        console.log("qiymat", item);
      } else if (i === 1) {
        data[dataIndex].all_code.code_css = String(editorCss.getValue());
        console.log("qiymat", item);
      } else if (i === 2) {
        data[dataIndex].all_code.code_js = String(editorJs.getValue());
        console.log("qiymat", item);
      }
    });

    setLocal();
    console.log(data);
  } else {
    console.log("project tanlang!");
    projectDisplay.classList.remove("d-none");
    document.querySelector("#project_name").innerHTML = "Project-Tanlang";
  }
};

let menuProject = () => {
  let dataProjects = document.querySelector("#dataProjects");
  dataProjects.innerHTML = "";

  data.map((item, index) => {
    dataProjects.innerHTML += `
    
    <li class="list-group-item list-group-item-action" onclick="project(${index})">${item.name}</li>

    `;
  });
};

let setNewProject = () => {
  projectСhoose = true;

  dataIndex = data.length;
  console.log(dataIndex, "project index");

  // let project_name = document.querySelector("#project_name");
  let inputNewProject = document.querySelector("#inputNewProject").value;
  document.querySelector("#inputNewProject").value = "";
  document.querySelector("#project_name").innerHTML = inputNewProject;

  data.push({
    id: data.length + 1,
    name: inputNewProject,
    all_code: {
      code_html: "",
      code_css: "",
      code_js: "",
    },
  });

  document.querySelector("#editorCodeHTML").innerHTML = "";

  document.querySelector("#editorCodeCSS").innerHTML = "";

  document.querySelector("#editorCodeJS").innerHTML = "";
  projectDisplay.classList.remove("d-none");
  document.querySelector("#project_name").innerHTML = data[dataIndex].name;

  startProject();

  setLocal();

  menuProject();
  console.log(data);
};

let project = async (indexItem) => {
  projectСhoose = true;
  dataIndex = indexItem;
  console.log(dataIndex);
  projectDisplay.classList.remove("d-none");
  document.querySelector("#project_name").innerHTML = data[indexItem].name;
  console.log(data[indexItem]);

  // HTML editor project Edit
  document.querySelector("#editorCodeHTML").innerHTML = "";
  makeCodeEditorHtml(
    String(data[indexItem].all_code.code_html),
    "editorCodeHTML"
  );

  // CSS editor project Edit
  document.querySelector("#editorCodeCSS").innerHTML = "";
  makeCodeEditorCss(String(data[indexItem].all_code.code_css), "editorCodeCSS");

  // JS editor project Edit
  document.querySelector("#editorCodeJS").innerHTML = "";
  makeCodeEditorJs(String(data[indexItem].all_code.code_js), "editorCodeJS");
};

let setLocal = () => {
  localStorage.setItem("data", JSON.stringify(data));
};

// fullscreen code start

let fullscreenButton = document.querySelector("#screenButton");

function toggleFullscreen() {
  let doc = window.document;
  let docEl = doc.documentElement;

  let requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen;
  let exitFullScreen =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen;

  if (
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    if (requestFullScreen) {
      requestFullScreen.call(docEl);
    }
  } else {
    if (exitFullScreen) {
      exitFullScreen.call(doc);
    }
  }
}

document.querySelector("#html").addEventListener("click", function () {
  console.log("html");

  HTMLcard.classList.remove("d-none");
  CSScard.classList.add("d-none");
  JScard.classList.add("d-none");

  previewCard.classList.remove("col-12");
  previewCard.classList.add("col-lg-8");
  previewCard.classList.add("col-sm-6");
  previewCard.classList.add("col-12");
});

document.querySelector("#css").addEventListener("click", function () {
  console.log("css");

  CSScard.classList.remove("d-none");
  HTMLcard.classList.add("d-none");
  JScard.classList.add("d-none");

  previewCard.classList.remove("col-12");
  previewCard.classList.add("col-lg-8");
  previewCard.classList.add("col-sm-6");
  previewCard.classList.add("col-12");
});

document.querySelector("#js").addEventListener("click", function () {
  console.log("js");

  JScard.classList.remove("d-none");
  CSScard.classList.add("d-none");
  HTMLcard.classList.add("d-none");

  previewCard.classList.remove("col-12");
  previewCard.classList.add("col-lg-8");
  previewCard.classList.add("col-sm-6");
  previewCard.classList.add("col-12");
});

document.querySelector("#all").addEventListener("click", function () {
  console.log("all");

  JScard.classList.remove("d-none");
  CSScard.classList.remove("d-none");
  HTMLcard.classList.remove("d-none");

  previewCard.classList.remove("col-lg-8");
  previewCard.classList.remove("col-sm-6");
  previewCard.classList.add("col-12");
});

document.querySelector("#buttonSearchProject").addEventListener("click", () => {
  console.log("search");

  let searchName = document.querySelector("#inputSearchProject");

  let founded;
  data.map((item, index) => {
    if (item.name === searchName.value) {
      founded = item;
    }
  });

  console.log(founded);

  let dataProjects = document.querySelector("#dataProjects");
  dataProjects.innerHTML = `
  <li class="list-group-item" onclick="project(${founded.id - 1})">${
    founded.name
  }</li>
  `;
});

startProject();
menuProject();
