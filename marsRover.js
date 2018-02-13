function MarsRover(location, direction, grid, obstacles) {

    this.location = (!location) ? [0, 0] : location;
    this.direction = (!direction) ? 'N' : direction;
    this.grid = (!grid) ? [150, 150] : grid;
    this.obstacles = (!obstacles) ? [] : obstacles;
    this.status = 'Yaay';

    /**
     * Array of commands to be sent to the rover to do
     * @param commands
     * @returns {*}
     */
    this.commands = function(commands) {
        if (commands === undefined) { 
            return this.commandsArray;
        } else { 
            for (let command of commands) {
                if (command === 'f' || command === 'b') {
                    /**
                     * Moves rover based on front or back
                     */
                    if (!moveRover(command)) {
                        break;
                    } 
                } else if (command === 'l' || command === 'r') {
                    /**
                     * Turns the rover left or right based on command
                     */
                    turnRover(command);
                }
            }
            resetLocation();
            this.commandsArray = commands;
        }
    };

    /**
     * Resets current location of rover
     */
    const resetLocation = () => {
        this.location = [
            (this.location[0] + this.grid[0]) % this.grid[0],
            (this.location[1] + this.grid[1]) % this.grid[1]
        ]
    };

    /**
     * Moves rover based on command 'front' or 'back'
     * @param command
     * @returns {boolean}
     */
    const moveRover = (command) => {
        let xIncrement = 0;
        let yIncrement = 0;
        if (this.direction === 'N') {
            yIncrement = 1;
        } else if (this.direction === 'E') { 
            xIncrement = 1;
        } else if (this.direction === 'W') { 
            xIncrement = -1;
        } else if (this.direction === 'S') { 
            yIncrement = -1;
        }
        if (command === 'b') { 
            xIncrement *= -1;
            yIncrement *= -1;
        }
        let newLocation = [this.location[0] + xIncrement, this.location[1] + yIncrement];
        if (isObstaclePresent(newLocation)) {
            return false;
        }
        this.location = newLocation;
        return true;
    };

    /**
     * Checks if a obstacle is present
     * @param newLocation
     * @returns {boolean}
     */
    const isObstaclePresent = (newLocation) => {
        for (let index = 0; index < this.obstacles.length; index++) {
            if (newLocation.toString() == this.obstacles[index].toString()) {
                this.status = 'obstacle';
                return true;
            }
        }
        return false;
    };

    /**
     * List of directions
     * @type {[string,string,string,string]}
     */
    const directions = ['N', 'E', 'W', 'S'];

    const directionAsNumber = (direction) => {
        for (let index = 0; index < 4; index++) {
            if (directions[index] === direction) return index;
        }
    };

    /**
     * Turns rover left or right based on command
     * @param command
     */
    const turnRover = (command) => {
        let directionNumber = directionAsNumber(this.direction);
        if (command === 'l') { 
            directionNumber = (directionNumber + 3) % 4;
        } else { 
            directionNumber = (directionNumber + 1) % 4;
        }
        this.direction = directions[directionNumber];
    }
}

let mr = new MarsRover([9, 9], 'N', [10, 10]);
mr.commands(['f']);

console.log(mr.location);
