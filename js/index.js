import { BASE_URL, componentes } from './moduloDados.js';

let map = L.map('map').setView([51.505, -0.09], 13);
document.body.onclick = function() {
    if(event.target ==  componentes[0].dialog){
        event.target.addEventListener('click', () => {
            componentes[0].dialog.classList.add("modal-close");
            setInterval(() => {
                componentes[0].dialog.close();
            }, 1000);
          
        });
    }
 
  }

componentes[0].btn.addEventListener("click", async () => {
    const ip = componentes[0].search.value;
    (ip != "") ? await getIp(ip) : error();
    componentes[0].search.value = "";
});


async function getIp(ip) {

    const request = new Request(`${BASE_URL[0].geo_ipify}=${ip}`);
    await fetch(request)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na solicitação. Status do código: " + response.data.status);
            }
            return response.json();
        })
        .then(data => {
            sessionStorage.setItem("ip", JSON.stringify(data));
            render(data);
        })
        .catch(error => {
            console.error("Ocorreu um erro: " + error);
        });
}

async function getIpClient() {
    setInterval(() => {
        componentes[0].dialog.classList.add("shadow");
    }, 1200)
    componentes[0].dialog.showModal();
    let auth = (sessionStorage.getItem("auth")) ? true : false;
    getValue(auth);
    componentes[0].autoriz[2].addEventListener("click", () => {
        auth = true;
        sessionStorage.setItem("auth", true);
        componentes[0].dialog.classList.add("modal-close");
        setInterval(() => {
            componentes[0].dialog.close();
        }, 1000);
        getValue(auth);
    });
    componentes[0].autoriz[3].addEventListener("click", () => {
        auth = false;
        componentes[0].dialog.classList.add("modal-close");
        setInterval(() => {
            componentes[0].dialog.close();
        }, 1000);
        getIp("8.8.8.8")
        

    });


}

function initialize() {
    if (sessionStorage.length > 0) {
        const data = JSON.parse(sessionStorage.getItem("ip"));
        (data != null) ? render(data) : getIp("8.8.8.8");

    }
}

async function getValue(auth) {
    if (auth) {
        try {
            const ip = await axios.get(BASE_URL[0].ipify);
            const response = await axios.get(`https://ipinfo.io/[${ip.data.ip}]?token=c29aae0a94fb73`);
            const locat = response.data.loc;
            const regex = /^(-?\d+\.\d+),(-?\d+\.\d+)$/;
            const matches = locat.match(regex);
            const lat = matches[1].replace(/-/g, "");
            const lng = matches[2].replace(/-/g, "");
            const data = {
                ip: response.data.ip,
                isp: response.data.org,
                location: {
                    city: response.data.city,
                    country: response.data.country,
                    postalCode: response.data.postal,
                    region: response.data.region,
                    timezone: response.data.timezone,
                    lat: lat,
                    lng: lng
                }
            }
            render(data)

        } catch (error) {
            console.error(error);
        }
    }
}

function render(data) {
    componentes[0].elements[0].innerText = data.ip;
    componentes[0].elements[1].innerText = `${data.location.city}, ${data.location.country} ${data.location.postalCode} ${data.location.region}`;
    componentes[0].elements[2].innerText = data.location.timezone;
    componentes[0].elements[3].innerText = data.isp;
    const greenIcon = L.icon({
        iconUrl: './assets/images/icon-location.svg',

        iconSize: [38, 95],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76]
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    L.marker([data.location.lat, data.location.lng], { icon: greenIcon }).addTo(map);
}


function error() {
    componentes[0].search.classList.add("error");
    const toast = new bootstrap.Toast(componentes[0].toastComponent);
    toast.show();
    setInterval(() => {
        componentes[0].search.classList.remove("error")
    }, 5000);
}

getIpClient();
initialize()