const socket = io("http://localhost:9000"); // Connect to / ie "main" namespace/endpoint

// listen for nsList which is a list of all the namespaces.
socket.on("nsList", nsData => {
  console.log("The list of namespaces has arrived");
  // console.log(nsData);

  // Take the list and update the DOM
  let namespacesDiv = document.querySelector(".namespaces");
  namespacesDiv.innerHTML = "";
  nsData.forEach(ns => {
    namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}><img src="${ns.img}"</img></div>`;
  });

  // Add a click listener for each namespace
  // console.dir(document.getElementsByClassName("namespace"));
  // console.dir(document.querySelectorAll(".namespace"));

  // Add a click listener for each namespace
  Array.from(document.getElementsByClassName("namespace")).forEach(elem => {
    // console.log(elem);
    elem.addEventListener("click", e => {
      // console.dir(e.target);
      const nsEndpoint = elem.getAttribute("ns");
      console.log(`${nsEndpoint} I should go to now`);

      // Next we want to join the namespace when clicked.
    });
  });

  joinNs("/wiki");
});
