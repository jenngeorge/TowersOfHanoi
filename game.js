class Game{
  constructor(reader){
    this.stacks = [[1],[3, 2], []];
    this.reader = reader;
  }

  getMove(callback, completionCallback) {
    this.print();
    let game = this;
    this.reader.question("where do you want to move? in form: (start, end)", function (answer) {
      let answerArr = answer.split(",").map(el => parseInt(el));
      let startIndex = answerArr[0];
      let endIndex = answerArr[1];

      if(callback(startIndex, endIndex)){
        console.log("everything is fine.");
        game.run(completionCallback);
      } else{
        console.log("Invalid move.");
      }
    });
  }

  isValidMove(startTowerIdx, endTowerIdx) {
    if (startTowerIdx === endTowerIdx){
      return false;
    }

    let startTower = this.stacks[startTowerIdx];
    let endTower = this.stacks[endTowerIdx];

    if(startTower.length === 0){
      return false;
    }

    if (Math.min(...startTower) < Math.max(...endTower) || endTower.length === 0){
      return true;
    } else{
      return false;
    }
  }

  move(startTowerIdx, endTowerIdx){
    if(this.isValidMove(startTowerIdx, endTowerIdx)){
      this.stacks[endTowerIdx].push(this.stacks[startTowerIdx].pop());
      return true;
    } else {
      return false;
    }
  }

  print() {
    console.log(JSON.stringify(this.stacks));
  }

  isWon() {
    if( this.stacks[1].length === 3 || this.stacks[2].length === 3){
      return true;
    } else{
      return false;
    }
  }

  run(completionCallback) {
    if(this.isWon()){
      console.log("You Won!");
      completionCallback();
    } else{
      this.getMove(this.move.bind(this), completionCallback);
    }
  }
}

module.exports = Game;
