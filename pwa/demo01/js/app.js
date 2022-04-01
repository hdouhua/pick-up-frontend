const container = document.querySelector(".container")
const coffees = [
  { name: "Perspiciatis", image: "images/coffee1.jpg" },
  { name: "Voluptatem", image: "images/coffee2.jpg" },
  { name: "Explicabo", image: "images/coffee3.jpg" },
  { name: "Rchitecto", image: "images/coffee4.jpg" },
  { name: " Beatae", image: "images/coffee5.jpg" },
  { name: " Vitae", image: "images/coffee6.jpg" },
  { name: "Inventore", image: "images/coffee7.jpg" },
  { name: "Veritatis", image: "images/coffee8.jpg" },
  { name: "Accusantium", image: "images/coffee9.jpg" },
]

const showCoffees = () => {
  let output = ""
  for (const { name, image } of coffees) {
    output += `
              <div class="card">
                <img class="card--avatar" src=${image} />
                <h1 class="card--title">${name}</h1>
                <a class="card--link" href="#">Taste</a>
              </div>
              `
  }

  container.innerHTML = output
}

document.addEventListener("DOMContentLoaded", showCoffees)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(
        registration => console.log("service worker registered"),
        reason => console.log("service worker registration failed", reason))
      .catch(err => console.log(err))
  })

  //
  navigator.serviceWorker
    .ready
    .then(function (registration) {
      if (!registration.pushManager) {
        alert('No push notifications support.');
        return false;
      }
      //To subscribe `push notification` from push manager
      registration.pushManager
        .subscribe({
          userVisibleOnly: true //Always show notification when received
        })
        .then(function (subscription) {
          console.log('Subscribed.');
        })
        .catch(function (err) {
          console.log('Subscription error: ', err);
        });
    })


} else {
  console.log('service worker is not supported');
}
