// tracking turns
let activePlayer = 'X';
// Move store
let selectedSquares = [];

// Placing!
function placeXOrO(squareNumber) {
    // This condition ensures a square hasn't been already placed.
    // The .some() method checks each element of selectedSquare array for repeats
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        // retrieves the html element id that was clicked.
        let select = document.getElementById(squareNumber);
        // turn check
        if (activePlayer === 'X') { // X turn
            select.style.backgroundImage = 'url("./media/images/x.png")';
        } else { // O turn
            select.style.backgroundImage = 'url("./media/images/o.png")';
        }
        // squareNumber and activePlayer are concatenated together and added to selectedSquares
        selectedSquares.push(squareNumber + activePlayer);
        // calls for win condition
        checkWinConditions();
        // changes turns
        if (activePlayer === 'X') {
            activePlayer = 'O';
        } else {
            activePlayer = 'X';
        }
        // sound POG
        audio("./media/sounds/place.mp3");
        // checks if computers turn.
        if (activePlayer === 'O') {
            disableClick();
            setTimeout(function() {computersTurn();}, 300);  //waits 300ms before computer places an image
        }
        return true;
    }
    // Computer chooses random square
    function computersTurn() {
        let success = false;
        let pickASquare;
        // runs until picking an empty square
        while (!success) {
            // A random number between 0-8 is selected.
            pickASquare = String(Math.floor(Math.random() * 9));
            if (placeXOrO(pickASquare)) {
                // calls the function
                placeXOrO(pickASquare);
                // changes our loop condition 
                success = true;
            }
        }
    }
}

function checkWinConditions() {
    // X 0, 1, 2 condition
    if      (arrayIncludes('0X', '1X', '2X')) {drawWinLine(50, 100, 558, 100)}
    // X 3, 4, 5 condition
    else if (arrayIncludes('3X', '4X', '5X')) {drawWinLine(50, 304, 558, 304)}
    // X 6, 7, 8 condition
    else if (arrayIncludes('6X', '7X', '8X')) {drawWinLine(50, 508, 558, 508)}
    // X 0, 3, 6 condition
    else if (arrayIncludes('0X', '3X', '6X')) {drawWinLine(100, 50, 100, 558)}
    // X 1, 4, 7 condition
    else if (arrayIncludes('1X', '4X', '7X')) {drawWinLine(304, 50, 304, 558)}
    // X 2, 5, 8 condition
    else if (arrayIncludes('2X', '5X', '8X')) {drawWinLine(508, 50, 508, 558)}
    // X 6, 4, 2 condition
    else if (arrayIncludes('6X', '4X', '2X')) {drawWinLine(100, 508, 510, 90)}
    // X 0, 4, 8 condition
    else if (arrayIncludes('0X', '4X', '8X')) {drawWinLine(100, 100, 520, 520)}
    // O 0, 1, 2 condition
    else if (arrayIncludes('0O', '1O', '2O')) {drawWinLine(50, 100, 558, 100)}
    // O 3, 4, 5 condition
    else if (arrayIncludes('3O', '4O', '5O')) {drawWinLine(50, 304, 558, 304)}
    // O 6, 7, 8 condition
    else if (arrayIncludes('6O', '7O', '8O')) {drawWinLine(50, 508, 558, 508)}
    // O 0, 3, 6 condition
    else if (arrayIncludes('0O', '3O', '6O')) {drawWinLine(100, 50, 100, 558)}
    // O 1, 4, 7 condition
    else if (arrayIncludes('1O', '4O', '7O')) {drawWinLine(304, 50, 304, 558)}
    // O 2, 5, 8 condition
    else if (arrayIncludes('2O', '5O', '8O')) {drawWinLine(508, 50, 508, 558)}
    // O 6, 4, 2 condition
    else if (arrayIncludes('6O', '4O', '2O')) {drawWinLine(100, 508, 510, 90)}
    // O 0, 4, 8 condition
    else if (arrayIncludes('0O', '4O', '8O')) {drawWinLine(100, 100, 520, 520)}
    // tie check
    else if (selectedSquares.length >= 9) {
        audio('./media/sounds/tie.mp3');
        setTimeout(function() {resetGame();}, 1000); //
    }
    // Checks if any win conditions are met
    function arrayIncludes(squareA, squareB, squareC) {
        // Checks for 3 in a row
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        // If all 3 are true executes the drawWinLine function
        if (a === true && b === true && c === true) {return true}
    }
}

// makes our body element temporarily unclickable.
function disableClick() {
    body.style.pointerEvents = 'none';
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 500); // Player can click 500ms after timeout
}

function audio(audioURL) {
    // Create a new audio object
    let audio = new Audio(audioURL);
    audio.play();   // plays the audio
}

//draws win lines
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    // accesses html canvas element.
    const canvas = document.getElementById('win-lines');
    // This line gives us access to methods for canvas
    const c = canvas.getContext('2d');
    // Start for x
    let x1 = coordX1,
        // Start for y
        y1 = coordY1,
        // End for X
        x2 = coordX2,
        // End for Y
        y2 = coordY2,
        // Temp stores x to update in animation loop
        x = x1,
        // Temp stores y to update in animation loop
        y = y1;

        // Interacting with the canvas
    function animateLineDrawing() {
        // Creates a loop
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        // clears content from last loop
        c.clearRect(0, 0, 608, 608);
        // Starts a new path
        c.beginPath();
        // Moves to the starting point
        c.moveTo(x1, y1);
        // Indicates the end point of the line
        c.lineTo(x, y)
        // Sets width of line.
        c.lineWidth = 10;
        // Sets color of the line.
        c.strokeStyle = 'rgba(70, 255, 33, 0.8)';
        // Draws
        c.stroke();
        // Checks for endpoint
        if (x1 <= x2 && y1 <= y2) {
            if (x < x2) {x += 10;}
            if (y < y2) {y += 10;}
            // cancels animation loop
            if (x >= x2 && y >= y2) {cancelAnimationFrame(animationLoop);}
        }
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) {x += 10;}
            if (y > y2) {y -= 10;}
            // cancels animation loop
            if (x >= x2 && y <= y2) {cancelAnimationFrame(animationLoop);}
        }
    }
    // Clears our canvas after our win line is drawn
    function clear() {
        const animationLoop = requestAnimationFrame(clear);
        // Clears canvas
        c.clearRect(0, 0, 608, 608);
        // Stops animation loop.
        cancelAnimationFrame(animationLoop);
    }
    // Disallows clicking
    disableClick();
    // Plays win sound
    audio('./media/sounds/winGame.mp3');
    // Calls the main animation loop.
    animateLineDrawing();
    // Waits a second before clearing and resetting game
    setTimeout(function() {clear(); resetGame();}, 1000);
}

// Resets the game in tie or win
function resetGame() {
    for (let i = 0; i < 9; i++) {
        let square = document.getElementById(String(i));
        // Removes game pieces
        square.style.backgroundImage = '';
    }
    // Resets array
    selectedSquares = [];
}
