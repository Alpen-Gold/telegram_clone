let chatsBtn = document.querySelector("#chats-btn");
let cardsChats = document.querySelector("#cards-chats");
let tugash = document.querySelector(".tugash");
let saveNewUcer = document.querySelector("#save-new-ucer");
let notMeassege = document.querySelector(".not-meassege");
let back = document.querySelector("#back");
let profileBtn = document.querySelector("#profile-btn");
let enterMenuElement = document.querySelector(".start-01");
let profile = document.querySelector("#profile");
let toChange = document.querySelector("#to-change");
let editedImg = document.querySelector("#edited-img");
let modalImgProfileBtn = document.querySelector("#modal-img-profile-btn");

let local = () => {
  localStorage.setItem("data", JSON.stringify(dataChats));
  localStorage.setItem("dataProfile", JSON.stringify(dataProfile));
};

let dataChats = JSON.parse(localStorage.getItem("data")) || dataTelege;
let dataProfile = JSON.parse(localStorage.getItem("dataProfile")) || {};

chatsBtn.addEventListener("click", addChats);

const myModal = new bootstrap.Modal(document.querySelector("#exampleModal"), {
  keyboard: false,
});

const editedImgProfileModal = new bootstrap.Modal(
  document.querySelector("#editedImgProfile"),
  {
    keyboard: false,
  }
);

const editedImgSendUcer = new bootstrap.Modal(
  document.querySelector("#editedImgSendUcer"),
  {
    keyboard: false,
  }
);

const editedVideoSendUcer = new bootstrap.Modal(
  document.querySelector("#editedVideoSendUcer"),
  {
    keyboard: false,
  }
);

const editedLocationSendUcer = new bootstrap.Modal(
  document.querySelector("#editedLocationSendUcer"),
  {
    keyboard: false,
  }
);

function addChats() {
  enterMenuElement.classList.remove("d-none");
  tugash.classList.remove("d-none");
  profile.classList.add("d-none");

  cardsChats.innerHTML = ``;

  dataChats.map((item, itemIndex) => {
    cardsChats.innerHTML += `
   <li onclick="ucerMassegeOpen(${itemIndex})">
   
   <div style="display: flex; align-items: center" >
   <img src="${item.img}" alt="" />
   <div>
     <h1>${item.name}</h1>
     
   </div>
 </div>

 <div>
   <p style="font-size: 15px; color: #8197a8; margin:0; padding:0;">${dataChats[itemIndex].time}</p>
 </div>
   
   
   </li>
   

    `;
  });
}

let ucerMassegeOpen = (itemIndex) => {
  tugash.innerHTML = "";

  notMeassege.style.display = "none";

  autoScroll();

  tugash.innerHTML += `
  
  <div id="info-ucer" class="mb-3">
  <div style="display: flex; align-items: center">
    <img src="${dataChats[itemIndex].img}" alt="" />
    <div>
      <h1>${dataChats[itemIndex].name}</h1>
    </div>
  </div>

  <div>
    <p style="font-size: 15px; color: #8197a8;padding 0; margin:0;">${
      dataChats[itemIndex].time
    }</p>
  </div>
</div>

${dataChats[itemIndex].masseges
  .map((item, index) => {
    console.log(item);
    if (dataChats[itemIndex].masseges[index].type === "sent") {
      return `
    <div class="mesege-rigth">
    <p><span class="text-rigth">${dataChats[itemIndex].masseges[index].text}</span></p>
  </div>
    `;
    }

    if (dataChats[itemIndex].masseges[index].type === "receiver") {
      return `<div class="mesege-left">
    <p><span class="text-left">${dataChats[itemIndex].masseges[index].text}</span></p>
  </div>`;
    }

    if (dataChats[itemIndex].masseges[index].paperType === "img") {
      return `<div class="mesege-rigth">
      <img src="${dataChats[itemIndex].masseges[index].text}" alt="" id="img-send-massege" />  
    </div>`;
    }

    if (dataChats[itemIndex].masseges[index].paperType === "video") {
      return `<div class="mesege-rigth">
      
    <video id="img-send-massege" controls>
    <source src="${dataChats[itemIndex].masseges[index].text}" type="video/mp4">
    <source src="mov_bbb.ogg" type="video/ogg">
    Your browser does not support HTML video.
    </video> 
    </div>`;
    }

    if (dataChats[itemIndex].masseges[index].paperType === "location") {
      return `
      <div class="mesege-rigth">
      <iframe id="img-send-massege" src="${dataChats[itemIndex].masseges[index].text}"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
       </div>`;
    }
  })
  .join("")}


<div class="send-message">
<button class="btn ms-3" id="button-send"><label for="file"><i class="fa-regular fa-folder-open"></i></label>
<input type="file" id="file" class="d-none" />
</button>
<input type="text" id="send-message-btn"placeholder="Enter text  . . ." />
<div class="d-flex align-items-center">
<button class="btn" id="button-send" ><i class="fa-regular fa-face-grin-wide"></i></button>
<div class="dropup-center dropup">
  <button class="btn" id="button-send"  data-bs-toggle="dropdown" aria-expanded="false">
  <i class="fa-solid fa-paperclip"></i>
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#"  onclick="buttonSendPaper(${itemIndex})">img</a></li>
    <li><a class="dropdown-item" href="#" onclick="buttonSendPaperVideo(${itemIndex})">Video</a></li>
    <li><a class="dropdown-item" href="#" onclick="buttonSendPaperLocation(${itemIndex})">Location</a></li>
  </ul>
</div>
<button class="btn" id="button-send" onclick="buttonSend(${itemIndex})"><i class="fa-solid fa-paper-plane"></i></button>

</div></div>

  `;
  autoScroll();
};

let buttonSend = (itemIndex) => {
  let sendInput = document.querySelector("#send-message-btn");

  dataChats[itemIndex].masseges.push({
    type: "sent",
    text: `${String(sendInput.value)}`,
  });

  local();
  ucerMassegeOpen(itemIndex);

  document.querySelector("#send-message-btn").value = "";
};

let addNewUcer = () => {
  myModal.show();
};

saveNewUcer.addEventListener("click", function () {
  let modalInput = document.querySelector("#modal-input").value;

  dataChats.push({
    id: `${dataChats.length + 1}`,
    img: "img/icon-5359554_640.webp",
    name: `${modalInput}`,
    time: "12:23",
    masseges: [],
  });

  local();

  document.querySelector("#modal-input").value = "";

  addChats();

  myModal.hide();
});

let searchUcer = () => {
  let searchInput = document.querySelector(".search-input").value;

  let item = dataChats.filter((item) => {
    return item.name.toLowerCase() === searchInput.toLowerCase();
  });

  let itemBoolean = dataChats.find((item) => {
    return item.name.toLowerCase() === searchInput.toLowerCase();
  });

  if (Boolean(itemBoolean)) {
    back.classList.remove("d-none");

    cardsChats.innerHTML = `

  <li onclick="ucerMassegeOpen(${Number(Object.values(item[0])[0] - 1)})")>
  <div style="display: flex; align-items: center" >
  <img src="${Object.values(item[0])[1]}" alt="" />
  <div>
    <h1 class="text-white">${Object.values(item[0])[2]}</h1>
   
  </div>
  </div>
  <div>
  <p style="font-size: 15px; color: #8197a8; margin:0; padding:0;">${
    Object.values(item[0])[3]
  }</p>
  </div>
  </li>

  
  `;
  } else {
    alert("Topolmadi !");
  }
};

back.addEventListener("click", function () {
  back.classList.add("d-none");
  addChats();
});

profileBtn.addEventListener("click", myProfile);

function myProfile() {
  enterMenuElement.classList.add("d-none");
  tugash.classList.add("d-none");
  profile.classList.remove("d-none");

  document.querySelector("#profile-name").value = dataProfile.name;
  document.querySelector("#profile-suraname").value = dataProfile.surname;
  document.querySelector("#profile-phone").value = dataProfile.phone;
  document.querySelector("#profile-nik-name").value = dataProfile.nik_name;
  document.querySelector("#profile-img").src = dataProfile.img;

  local();
}

toChange.addEventListener("click", function () {
  let profileName = document.querySelector("#profile-name").value;
  let profileSuraname = document.querySelector("#profile-suraname").value;
  let profilePhone = document.querySelector("#profile-phone").value;
  let profileNikName = document.querySelector("#profile-nik-name").value;
  let profileImg = document.querySelector("#profile-img").src;

  dataProfile = {
    img: profileImg,
    name: profileName,
    surname: profileSuraname,
    nik_name: profileNikName,
    phone: profilePhone,
  };
  console.log(dataProfile);

  myProfile();
});

editedImg.addEventListener("click", function () {
  editedImgProfileModal.show();
});

modalImgProfileBtn.addEventListener("click", function () {
  let itemImg = document.querySelector("#modal-img-profile-input").value;
  if (itemImg !== "") {
    document.querySelector("#profile-img").src = itemImg;
  } else {
    document.querySelector("#profile-img").src = "img/icon-5359554_640.webp";
  }
});

const autoScroll = () => {
  tugash.scrollTop = tugash.scrollHeight;
};

let topIndex = 0;
let buttonSendPaper = (itemIndex) => {
  topIndex = itemIndex;

  editedImgSendUcer.show();
};

let modalImgSendBtn = () => {
  let itemImg = document.querySelector("#modal-img-sent-input");

  dataChats[topIndex].masseges.push({
    type: "img",
    paperType: "img",
    text: `${String(itemImg.value)}`,
  });

  ucerMassegeOpen(topIndex);
  console.log(dataChats[topIndex].masseges);

  local();
};

let buttonSendPaperVideo = (itemIndex) => {
  topIndex = itemIndex;

  editedVideoSendUcer.show();
};

let buttonSendPaperLocation = (itemIndex) => {
  topIndex = itemIndex;

  editedLocationSendUcer.show();
};

// text: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11985.045614655412!2d69.2142265345641!3d41.32492880333903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bb7a0ebbae3%3A0xf9e01b5d45fc68cd!2sPDP%20Academy!5e0!3m2!1sru!2s!4v1688571918099!5m2!1sru!2s`,

let modalLocationSendBtn = () => {
  let itemImgLocation = document.querySelector("#modal-location-sent-input");

  dataChats[topIndex].masseges.push({
    type: "location",
    paperType: "location",
    text: `${String(itemImgLocation.value)}`,
  });

  ucerMassegeOpen(topIndex);

  local();
};

let modalVideoSendBtn = () => {
  let itemImg = document.querySelector("#modal-video-sent-input");

  dataChats[topIndex].masseges.push({
    type: "video",
    paperType: "video",
    text: `${String(itemImg.value)}`,
  });

  ucerMassegeOpen(topIndex);
  console.log(dataChats[topIndex].masseges);

  local();
};
addChats();
