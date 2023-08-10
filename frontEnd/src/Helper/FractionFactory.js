export default function FractionFactory (decimal) {
  if (decimal % 1 === 0 || isNaN(Number(decimal)) || typeof Number(decimal) !== 'number') {
    return decimal;
  }

  const gcd = (a, b) => {
    if (a === 0) {
      return b;
    } else if (b === 0) {
      return a;
    } else if (a < b) {
      return gcd(a, b % a);
    } else {
      return gcd(b, a % b);
    }
  };

  let letVal = Math.floor(decimal);
  let fVal = decimal - letVal;
  let pVal = 1000000000;
  let gcdVal = gcd(Math.round(fVal * pVal), pVal);
  let num = Math.round(fVal * pVal) / gcdVal;
  let deno = pVal / gcdVal;
  if (num > deno) {
    let mixedVal = Math.floor(num / deno);
    num = num % deno;
    return `${letVal ? `${letVal} ` : ''}${mixedVal} ${num}/${deno}`;
  } else {
    return `${letVal ? `${letVal} ` : ''}${num}/${deno}`;
  }
}