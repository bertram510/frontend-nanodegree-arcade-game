var playerLives = 3;
document.getElementById('playerLives').innerHTML = playerLives;

// Enemies our player must avoid
var Enemy = function(xPosition, yPosition) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = xPosition;
    this.y = yPosition;
    this.speed = (Math.floor(Math.random() * 10) + 1) * 20;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x += (this.speed * dt);
    }
    else {this.x = -50;}

	// If the enemy and the player collide.
    if(this.x < player.x + 30 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y) {
        playerLives -= 1;
        document.getElementById('playerLives').innerHTML = playerLives;
        if (playerLives === 0) {
            swal({
                title: "Game Over!",
                text: "You ran out of lives!",
                icon: "error",
                button: "Play Again",
            });
            playerLives = 3;
            document.getElementById('playerLives').innerHTML = playerLives;
        }
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 320;
};

Player.prototype.update = function() {
    // If the player reaches the water
	if (player.y < 20) {
        swal({
            title: "Good job!",
            text: "You have won!",
            icon: "success",
            button: "Play Again",
        });
        playerLives = 3;
        document.getElementById('playerLives').innerHTML = playerLives;
        this.reset();
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyCode) {
    if(keyCode == 'left' && this.x > 0) {
        this.x -= 50;
    }
    if(keyCode == 'right' && this.x < 400) {
        this.x += 50;
    }
    if(keyCode == 'up' && this.y > 3) {
        this.y -= 50;
    }
    if(keyCode == 'down' && this.y < 400) {
        this.y += 50;
    }
}

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 320;
};
// Now instantiate your objects.
var enemy1 = new Enemy(-50, 60);
var enemy2 = new Enemy(-150, 140);
var enemy3 = new Enemy(-250, 230);
var enemy4 = new Enemy(-350, 140);
var enemy5 = new Enemy(-450, 60);
var enemy6 = new Enemy(-550, 230);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
