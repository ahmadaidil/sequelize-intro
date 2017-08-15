module.exports = function saltGenerator(){
  let word = '0123456789abcdefghijk'.split('');
  let salt = [];
  for(let i=0; i<8; i++){
    let rand = Math.floor(Math.random()*word.length);
    salt.push(word[rand]);
  }
  return salt.join('');
}
