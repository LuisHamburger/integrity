const urlApiLocal = "http://localhost:3001/api"


const getStockList = () => {
    fetch(`${urlApiLocal}/stocks`)
        .then(resp => resp.json())
        .then(resp => printStockList(resp))
        .catch(err => alert("Error al realizar la solicitud, contactar administrador."))
}


const printStockList = (data) => {

    const datosContainer = document.getElementById("datosContainer");

    data.forEach(element => {
        let divDato = document.createElement("div");
        let divImgDato = document.createElement("div");
        let imgDato = document.createElement("img");
        let h2Nombre = document.createElement("h2");
        let h2Stock = document.createElement("h2");
        let btnsDato = document.createElement("div");
        let btnEliminar = document.createElement("button");
        let imgBtnEliminar = document.createElement("img");
        let btnActualizar = document.createElement("button");
        let imgBtnActualizar = document.createElement("img");


        divDato.classList.add("dato");

        divImgDato.classList.add("imgDato");
        imgDato.src = element.img;

        h2Nombre.classList.add("datoNombre");
        h2Nombre.innerHTML = element.nombre;

        h2Stock.classList.add("datoStock");
        if (element.esCambioPositivo) {
            h2Stock.innerHTML = `${element.precio} &#x25B2`;
            h2Stock.classList.add("win");
        } else {
            h2Stock.innerHTML = `${element.precio} &#x25BC`;
            h2Stock.classList.add("lose")
        }

        btnsDato.classList.add("btnsDato");
        btnEliminar.classList.add("btnDato");
        imgBtnEliminar.src = "./recursos/trash.svg";
        btnActualizar.classList.add("btnDato");
        imgBtnActualizar.src = "./recursos/refresh.svg";


        datosContainer.appendChild(divDato);
        divDato.appendChild(divImgDato);
        divImgDato.appendChild(imgDato);
        divDato.appendChild(h2Nombre);
        divDato.appendChild(h2Stock);
        divDato.appendChild(btnsDato);
        btnsDato.appendChild(btnEliminar);
        btnsDato.appendChild(btnActualizar);
        btnEliminar.appendChild(imgBtnEliminar);
        btnActualizar.appendChild(imgBtnActualizar);


        deleteStock(btnEliminar, element.symbol);
        updateStock(btnActualizar, element.symbol);
    });

}

const addStock = () => {
    const btnAñadir = document.getElementById("btnAñadir");
    btnAñadir.addEventListener("click", (ev) => {
        deshabilitarPage();
        const symbol = document.getElementById("inputAñadir").value;
        if (!symbol) {
            location.reload()
            return alert("Symbol es obligatorio")
        }
        fetch(`${urlApiLocal}/newStock/${symbol}`, { method: 'POST' })
            .then(resp => resp.json())
            .then(resp => validateResp(resp))
            .catch(err => { alert("Error al realizar la solicitud, contactar administrador."); location.reload(); })
    })
}

const deleteStock = (btnEliminar, symbol) => {
    btnEliminar.addEventListener("click", (ev) => {
        deshabilitarPage();
        fetch(`${urlApiLocal}/deleteStock/${symbol}`, {
            method: 'DELETE'
        })
            .then(resp => resp.json())
            .then(resp => validateResp(resp))
            .catch(err => { alert("Error al realizar la solicitud, contactar administrador."); location.reload(); })
    })
}

const updateStock = (btnEliminar, symbol) => {
    btnEliminar.addEventListener("click", (ev) => {
        deshabilitarPage();
        fetch(`${urlApiLocal}/putStock/${symbol}`, { method: 'PUT' })
            .then(resp => resp.json())
            .then(resp => validateResp(resp))
            .catch(err => { alert("Error al realizar la solicitud, contactar administrador."); location.reload(); })
    })
}

const deshabilitarPage = () => {
    const contenedor = document.getElementById("contenedor");
    contenedor.classList.add("blackwhite")

    let divRing = document.createElement("div");
    divRing.classList.add("lds-dual-ring")
    divRing.id = "ring"

    contenedor.appendChild(divRing);

    const buttons = document.querySelectorAll("button");
    buttons.forEach(element => {
        element.disabled = true;
        element.classList.add("cursorNot");
    })
}


const validateResp = (resp) => {
    if (resp.error) alert("Error al realizar la solicitud, stock symbol incorrecto.")
    location.reload()
}

addStock();
getStockList();
