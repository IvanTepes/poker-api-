const baseURL =  "https://deckofcardsapi.com/api/deck/new/draw/?count=5";

function getData(cards, cb) {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", baseURL);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
        console.log(response.text)
    };
}

function getTableHeaders(obj) {
    let tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });

    return `<tr>${tableHeaders}</tr>`
}


function writeToDocument(cards) {
    let tableRows = [];
    let el = document.getElementById("data");

    el.innerHTML = "";
    
    getData(cards, function(data) {
        data = data.cards;
         let tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
           /*  el.innerHTML += '<P>'+ item.image +'</P>'; */
            let dataRow = [];

            Object.keys(item).forEach(function(key) {
                let rowData = item[key].toString();
                let truncatedData = rowData.substring(0, 15)
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`
        
    });
}


