function Map(rows, collumns) {
  this.SIZE = 32;
  this.victory = false;
  this.tesouros = 0;
  this.cells = [];
  for (var r = 0; r < rows; r++) {
    this.cells[r] = [];
    for (var c = 0; c < collumns; c++) {
      this.cells[r][c] = 0;
    }
  }
}

Map.prototype.desenhar = function (ctx, img) {

  for (var r = 0; r < this.cells.length; r++) {
    for (var c = 0; c < this.cells[0].length; c++) {
      if(this.cells[r][c]==0){
        ctx.fillStyle = "white";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
      if(this.cells[r][c]==1){
        ctx.fillStyle = "black";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE); 
      }
      if(this.cells[r][c]==2){
        ctx.fillStyle = "blue";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
      if(this.cells[r][c]==3){
        ctx.fillStyle = "green";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
    }
  }


  for (var i = 0; i < this.tesouros.length; i++) {
      this.tesouros[i].desenharQuadrado(ctx);
  }

};

Map.prototype.showInformations = function(ctx, tempo){
  ctx.fillStyle = "black";
  ctx.font="20px Verdana";
  ctx.fillText("Tempo: ", 385, 20);
  ctx.fillStyle = "red";
  ctx.fillRect(385,30,tempo,15);
}
Map.prototype.setCells = function (newCells) {
  for (var i = 0; i < newCells.length; i++) {
    for (var j = 0; j < newCells[i].length; j++) {
      switch (newCells[i][j]) {
        case 1:
          this.cells[i][j] = 1;
          break;
        case 2:
          this.cells[i][j] = 2;
          break;
        case 3:
          this.cells[i][j] = 3;
          this.tesouros++;
          break;
        default:
          this.cells[i][j] = 0;
      }
    }
  }
};