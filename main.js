let text = document.getElementById("text");
let link = document.getElementById("link");
let btn = document.getElementById("btn");
let imageAPI = document.getElementsByClassName("imageAPI")[0];

let url = "https://66e7e6a8b17821a9d9da6f51.mockapi.io/imgAPI";

btn.addEventListener("click", () => {
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      title: text.value,
      image: link.value,
    }),
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      location.reload();
    });
});

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.map((result) => {
      let dev = document.createElement("div");
      let img = document.createElement("img");
      let title = document.createElement("h1");
      let dev2 = document.createElement("div");
      let del = document.createElement("button");

      img.src = result.image;
      title.textContent = result.title;

      dev.appendChild(img);
      dev2.appendChild(title);
      dev.setAttribute("class", "card");

      dev2.setAttribute("class", "title");
      del.textContent = "Delete";
      dev2.appendChild(del);
      del.onclick = function () {
        fetch(`${url}/${result.id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              imageAPI.removeChild(dev);
            }
          })
          .catch((error) => console.error("Error:", error));
      };

      dev.appendChild(dev2);
      imageAPI.appendChild(dev);
    });
  });
