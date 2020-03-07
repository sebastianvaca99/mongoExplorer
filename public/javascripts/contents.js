/* eslint-disable no-redeclare */
const populatecontent = contents => {
  const contentUl = document.getElementById("bodydinamico");

  contentUl.innerHTML = "";

  contents.forEach(c => {
    const colLi = document.createElement("tr");

    colLi.textContent = `${c.id} : ${c.name}`;

    contentUl.appendChild(colLi);
  });
};

function traercontenido() {
  const sele = document.getElementById("bdropdown");
  const select = document.getElementById("cdropdown");
  console.log(select);
  const quer = sele.options[sele.selectedIndex].value;
  const query = select.options[select.selectedIndex].value;

  fetch(`/content/${quer}/${query}`)
    .then(res => res.json())
    .then(generateTable)
    .catch();
}

const generateTable = contents => {
  const numberRegisters = contents.length;
  console.log(contents);
  if (numberRegisters > 0) {
    const table = document.createElement("table");
    table.style.width = "50%";
    table.setAttribute("border", "1");
    table.setAttribute("cellspacing", "0");
    table.setAttribute("cellpadding", "5");

    const col = [];
    for (var i = 0; i < numberRegisters; i++) {
      for (var key in contents[i]) {
        if (col.indexOf(key) === -1) {
          col.push(key);
        }
      }
    }

    const hRow = document.createElement("tr");

    for (var i = 0; i < col.length; i++) {
      const th = document.createElement("th");
      th.innerHTML = col[i];
      hRow.appendChild(th);
    }
    table.appendChild(hRow);

    const tBody = document.createElement("tbody");

    for (var i = 0; i < numberRegisters; i++) {
      const bRow = document.createElement("tr"); // CREATE ROW FOR EACH RECORD .

      for (var j = 0; j < col.length; j++) {
        var td = document.createElement("td");
        td.innerHTML = contents[i][col[j]];
        bRow.appendChild(td);
      }
      tBody.appendChild(bRow);
    }
    table.appendChild(tBody);
    const divContainer = document.getElementById("myContacts");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
  }
};
