module.exports = score => {
  if(score > 85){
    return 'A';
  }else if(score>70){
    return 'B';
  }else if(score > 55){
    return 'C';
  }else if(score <= 55 && score > 0){
    return 'E';
  }else if(score == null){
    return 'empty';
  }else{
    return 'empty';
  }
}
