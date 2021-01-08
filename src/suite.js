
function somar1(a, b){
    return a+b;
}
function sub(a) {
    return a;
}
const lista = [];
const mau = 'mauricio';
for (const letra in mau) {
  lista.push(mau[letra]);
}

window.document.addEventListener('click', ()=> {
  console.log('aewwww');
});
console.log("oi");
console.log(lista);
module.exports = {
    somar1,
    sub
};
