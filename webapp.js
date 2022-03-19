const form = document.querySelector('#searchform');
const res = document.querySelector('#result');
var upd;
form.addEventListener('submit', (e) => {
    if(upd){
        clearTimeout(upd);
    }
    e.preventDefault();
    const ctype = form.elements.cointype.value;

    fetchprice(ctype);
});
const fetchprice = async (ctype) => {
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=INR`);
    // console.log(r);
    const price = r.data.coin.price;
    const change = r.data.coin.priceChange1d;
    
    const volume = r.data.coin.volume;
    const base = r.data.coin.name;
    const target= 'INR';
    var col ="green";
    if(change<0){
     col = "red";
    }
    res.innerHTML = ` <tr>
    <td style="color: white; font-family: 'Rokkitt', serif;background-color: #54c9a6; "> Property </td>
     <td style="color: white; font-family: 'Rokkitt', serif;background-color: #54c9a6;">value </td>
   </tr>
   <tr>
       <td style="color: white; font-family: 'Rokkitt', serif;">${base}</td>
       <td style ="color:${col}" > ${price} ${target}</td>
   </tr><tr>
           <td style="color: white; font-family: 'Rokkitt', serif;"> change(24hrs) </td>
           <td style ="color:${col}" >${change} ${target}</td>
       </tr><tr>
           <td style="color: white; font-family: 'Rokkitt', serif;">volume(24hrs)</td>
           <td style="color: white; font-family: 'Rokkitt', serif;">${volume}</td>
       </tr> `

upd = setTimeout(()=> fetchprice(ctype),10000);

}
