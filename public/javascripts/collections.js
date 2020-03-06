const populatecollections = collections => {
  const collectionUl = document.getElementById("cdropdown");

  collectionUl.innerHTML = "";

  collections.forEach(b => {
    const bdLi = document.createElement("option");

    bdLi.textContent = `${b.name}`;

    collectionUl.appendChild(bdLi);
  });
};

function traercol() {
  const select = document.getElementById("bdropdown");
  console.log(select);
  const query = select.options[select.selectedIndex].value;
  console.log(query);
  console.log("1", query);
  fetch(`/collections/${query}`)
    .then(res => res.json())
    .then(populatecollections)
    .catch();
}
