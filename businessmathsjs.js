const costPrice = document.getElementById('costPrice');
const sellingPrice = document.getElementById('sellingPrice');
const marketPrice = document.getElementById('marketPrice');
const profitAmount = document.getElementById('profitAmount');
const profitPercentage = document.getElementById('profitPercentage');
const lossAmount = document.getElementById('lossAmount');
const lossPercentage = document.getElementById('lossPercentage');
const resultDiv = document.getElementById('result');
const clearBtn = document.getElementById('clearBtn');
const calculateBtn = document.getElementById('calculateBtn');
const quantity = document.getElementById('quantity');
quantity.addEventListener('input', () => {
  if(quantity.value === '' || parseInt(quantity.value) < 1){
    quantity.value = 1;
  }
});

function calculate() {
  let cp = parseFloat(costPrice.value) || 0;
  let sp = parseFloat(sellingPrice.value) || 0;
  let mp = parseFloat(marketPrice.value) || 0;
  let pAmt = parseFloat(profitAmount.value) || 0;
  let pPer = parseFloat(profitPercentage.value) || 0;
  let lAmt = parseFloat(lossAmount.value) || 0;
  let lPer = parseFloat(lossPercentage.value) || 0;
  let qty = parseInt(quantity.value) || 1;
  let computedCP = cp, computedSP = sp, computedMP = mp;
  let computedProfit = 0, computedProfitPer = 0, computedLoss = 0, computedLossPer = 0;
  if(cp && sp){
    if(sp > cp){ computedProfit = sp - cp; computedProfitPer = (computedProfit / cp) * 100; } 
    else if(cp > sp){ computedLoss = cp - sp; computedLossPer = (computedLoss / cp) * 100; }
    computedMP = sp;
  }
  else if(cp && pAmt){
    computedSP = cp + pAmt;
    computedProfit = pAmt;
    computedProfitPer = (pAmt / cp) * 100;
    computedMP = computedSP;
  }
  else if(cp && pPer){
    computedProfit = (pPer / 100) * cp;
    computedSP = cp + computedProfit;
    computedProfitPer = pPer;
    computedMP = computedSP;
  }
  else if(cp && lAmt){
    computedSP = cp - lAmt;
    computedLoss = lAmt;
    computedLossPer = (lAmt / cp) * 100;
    computedMP = computedSP;
  }
  else if(cp && lPer){
    computedLoss = (lPer / 100) * cp;
    computedSP = cp - computedLoss;
    computedLossPer = lPer;
    computedMP = computedSP;
  }
  else if(sp && pAmt){
    computedCP = sp - pAmt;
    computedProfit = pAmt;
    computedProfitPer = (pAmt / computedCP) * 100;
    computedMP = sp;
  }
  else if(sp && pPer){
    computedCP = sp / (1 + pPer / 100);
    computedProfit = sp - computedCP;
    computedProfitPer = (computedProfit / computedCP) * 100;
    computedMP = sp;
  }
  else if(sp && lAmt){
    computedCP = sp + lAmt;
    computedLoss = lAmt;
    computedLossPer = (lAmt / computedCP) * 100;
    computedMP = sp;
  }
  else if(sp && lPer){
    computedCP = sp / (1 - lPer / 100);
    computedLoss = computedCP - sp;
    computedLossPer = (computedLoss / computedCP) * 100;
    computedMP = sp;
  }
  computedProfit *= qty;
  computedLoss *= qty;
  costPrice.value = computedCP ? computedCP.toFixed(2) : '';
  sellingPrice.value = computedSP ? computedSP.toFixed(2) : '';
  marketPrice.value = computedMP ? computedMP.toFixed(2) : '';
  profitAmount.value = computedProfit ? computedProfit.toFixed(2) : '';
  profitPercentage.value = computedProfitPer ? computedProfitPer.toFixed(2) : '';
  lossAmount.value = computedLoss ? computedLoss.toFixed(2) : '';
  lossPercentage.value = computedLossPer ? computedLossPer.toFixed(2) : '';
  let resultText = '';
  if(computedProfit) resultText = `Profit: ${computedProfit.toFixed(2)} (${computedProfitPer.toFixed(2)}%)`;
  else if(computedLoss) resultText = `Loss: ${computedLoss.toFixed(2)} (${computedLossPer.toFixed(2)}%)`;
  else resultText = 'Result will appear here';
  resultDiv.textContent = resultText;
}
clearBtn.addEventListener('click', () => {
  [costPrice, sellingPrice, marketPrice, profitAmount, profitPercentage, lossAmount, lossPercentage].forEach(i => i.value = '');
  resultDiv.textContent = 'Result will appear here';
});
calculateBtn.addEventListener('click', calculate);

function updateInterest() {
  const pEl = document.getElementById("principal");
  const rEl = document.getElementById("rate");
  const tEl = document.getElementById("time");
  const siEl = document.getElementById("simpleInterest");
  const ciEl = document.getElementById("compoundInterest");
  const output = document.getElementById("interestResult");
  let P = parseFloat(pEl.value);
  let R = parseFloat(rEl.value);
  let T = parseFloat(tEl.value);
  let SI = parseFloat(siEl.value) || NaN;
  let CI = parseFloat(ciEl.value) || NaN;
  if (!isNaN(P) && !isNaN(R) && !isNaN(T) && isNaN(SI) && isNaN(CI)) {
    SI = (P * R * T) / 100;
    CI = P * (Math.pow((1 + R / 100), T)) - P;
    siEl.value = SI.toFixed(2);
    ciEl.value = CI.toFixed(2);
    output.innerText = `Simple Interest = ₹${SI.toFixed(2)}\nCompound Interest = ₹${CI.toFixed(2)}`;
  }
  else if (!isNaN(P) && !isNaN(R) && !isNaN(T) && !isNaN(SI) && isNaN(CI)) {
    CI = P * (Math.pow((1 + R / 100), T)) - P;
    ciEl.value = CI.toFixed(2);
    output.innerText = `Simple Interest = ₹${SI.toFixed(2)}\nCompound Interest = ₹${CI.toFixed(2)}`;
  }
  else if (!isNaN(P) && !isNaN(R) && !isNaN(T) && isNaN(SI) && !isNaN(CI)) {
    SI = (P * R * T) / 100;
    siEl.value = SI.toFixed(2);
    output.innerText = `Simple Interest = ₹${SI.toFixed(2)}\nCompound Interest = ₹${CI.toFixed(2)}`;
  }
  else if (!isNaN(SI) && !isNaN(CI) && (isNaN(P) || isNaN(R) || isNaN(T))) {
    output.innerText = `Both SI and CI provided.\nCannot uniquely determine P, R, T without more data.`;
  }
  else {output.innerText = "Interest result will appear here";}
}
