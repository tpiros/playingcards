//Cards: from 1-13, where 1: Ace, 11: Jack, 12: Queen, 13: King
//Symbols: hearts, dimonds, clubs, spades -> h, d, c, s
//Therefore 1S is the Ace of Spades, 11H is the Jack of Hearts, 7C is the Seven of Clubs --> remember: http://youtu.be/1iwC2QljLn4

function Game() {
  this.pack = this._shufflePack(this._createPack());
}
//sets up two times 52 cards as a pack
Game.prototype._createPack = function() {
  var suits = ["H", "C", "S", "D"];
  var pack = [];
  var n = 12;
  var index = n / suits.length;
  var packCount= 0;
  for(i = 0; i <= 3; i++)
      for(j = 1; j <= index; j++) {
        pack[packCount++] = j + suits[i];
      }
  finalPack = pack.concat(pack);
  return finalPack;
}
//shuffles the pack - based on the Fisher-Yates algorithm
Game.prototype._shufflePack = function(pack) {
  var i = pack.length, j, tempi, tempj;
  if (i === 0) return false;
  while (--i) {
     j = Math.floor(Math.random() * (i + 1));
     tempi = pack[i]; tempj = pack[j]; pack[i] = tempj; pack[j] = tempi;
   }
  return pack;
}
//draw one card from the pack of cards, initial T|F appends cards in hand
  Game.prototype.drawCard = function(pack, amount, hand, initial) {
    var cards = [];
    cards = pack.slice(0, amount);
    pack.splice(0, amount);
    if (!initial) {
      hand.push.apply(hand, cards); 
    }
    return cards;
  }
//plays a card with specific index, from specific hand, and places the card on the table
Game.prototype.playCard = function(index, hand, table) {
  var v = hand.splice(index, 1); //we can only play one card at a time at the moment
  table.push.apply(table, v);
}
//at the start of the game, we put one card to the table from the pack (top card of the deck)
Game.prototype.playFirstCardToTable = function(pack) {
  return  pack.splice(0,1);
}
//returns all the cards on the table - so we can reshuffle it and use it as a new pack
Game.prototype.cardsOnTable = function(table, card) {
  if (card) {
    return table.concat(card);
  } else {
    return table;
  }
}
//returns the last card on the table
Game.prototype.last = function(array) {
  return array[array.length - 1];
}
Game.prototype.lastCardOnTable = function(table) {
  return utils.last(table);
}

module.exports = Game;
