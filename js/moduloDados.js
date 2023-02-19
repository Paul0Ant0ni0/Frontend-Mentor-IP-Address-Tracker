const componentes = [
    {
        search: document.getElementById("search_input"),
        elements: document.querySelectorAll("h3"),
        btn: document.querySelector("button"),
        toastComponent: document.getElementById('liveToast'),
        autoriz: document.querySelectorAll('button'),
        dialog: window.meuDialog
    },

];

const BASE_URL = [
    {
        geo_ipify:`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_zPLzO87bvNEiNTYPhyfzpLbopBpdw&ipAddress`,
        ipify: 'https://api.ipify.org?format=json'
    }
]


export { componentes };
export { BASE_URL };