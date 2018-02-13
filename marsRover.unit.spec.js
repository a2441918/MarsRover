describe('MarsRover', function() {

    describe('has starting point (x,y) and ', function() {
        it('should set starting location', function() {
            var mr = new MarsRover([9, 15]);
            expect(mr.location).toEqual([9, 15]);
        });
        it('should use default starting location value 0x0 when not assigned', function() {
            var mr = new MarsRover();
            expect(mr.location).toEqual([0, 0]);
        });
        it('should set direction from specified input', function() {
            var mr = new MarsRover([9, 15], 'N');
            expect(mr.direction).toEqual('N');
        });
        it('should use default starting direction value is not assigned', function() {
            var mr = new MarsRover([9, 15]);
            expect(mr.direction).toEqual('N');
        });
    });

    describe('The rover receives a character array of commands and ', function() {
        it('should set commands array', function() {
            var mr = new MarsRover([7, 19], 'N');
            mr.commands(['f', 'f', 'f', 'b', 'l', 'r']);
            expect(mr.commands()).toEqual(['f', 'f', 'f', 'b', 'l', 'r']);
        });
    });

    describe('Make rover go forward/backward (f,b)', function() {
        it('should increase Y when moving north', function() {
            var mr = new MarsRover([7, 19], 'N');
            mr.commands(['f', 'f']);
            expect(mr.location).toEqual([7, 21]);
        });
        it('should decrease Y when moving south', function() {
            var mr = new MarsRover([7, 19], 'S');
            mr.commands(['f']);
            expect(mr.location).toEqual([7, 18]);
        });
        it('should reduce X when moving west', function() {
            var mr = new MarsRover([7, 19], 'W');
            mr.commands(['f']);
            expect(mr.location).toEqual([6, 19]);
        });
        it('should increase X when moving east', function() {
            var mr = new MarsRover([7, 19], 'E');
            mr.commands(['f']);
            expect(mr.location).toEqual([8, 19]);
        });
        it('should decrease Y when moving backwards facing north', function() {
            var mr = new MarsRover([7, 19], 'N');
            mr.commands(['b']);
            expect(mr.location).toEqual([7, 18]);
        });
        it('should increase Y when moving backwards facing south', function() {
            var mr = new MarsRover([7, 19], 'S');
            mr.commands(['b']);
            expect(mr.location).toEqual([7, 20]);
        });
        it('should increase X when moving backwards facing west', function() {
            var mr = new MarsRover([7, 19], 'W');
            mr.commands(['b']);
            expect(mr.location).toEqual([8, 19]);
        });
        it('should reduce X when moving backwards facing east', function() {
            var mr = new MarsRover([7, 19], 'E');
            mr.commands(['b']);
            expect(mr.location).toEqual([6, 19]);
        });
    });


    describe('Implement wrapping from one edge of the grid to another (planets are spheres after all)', function() {
        it('should assign grid size', function() {
            var mr = new MarsRover([7, 19], 'N', [15, 35]);
            expect(mr.grid).toEqual([15, 35]);
        });
        it('should use default value 150x150 when grid is not assigned', function() {
            var mr = new MarsRover([7, 19], 'N');
            expect(mr.grid).toEqual([150, 150]);
        });
        it('should return X to grid end when grid is passed from west', function() {
            var mr = new MarsRover([7, 19], 'E', [35, 35]);
            mr.commands(['b']);
            expect(mr.location).toEqual([6, 19]);
        });
        it('should return Y to grid end when grid is passed from north', function() {
            var mr = new MarsRover([7, 19], 'N', [35, 35]);
            mr.commands(['f']);
            expect(mr.location).toEqual([7, 20]);
        });
    });

    describe('Check for obstacles and step back if one', function() {
        it('should assign obstacles', function() {
            var mr = new MarsRover([7, 19], 'N', [12, 33], [[5, 5], [3, 7]]);
            expect(mr.obstacles).toEqual([[5, 5], [3, 7]]);
        });
        it('should use empty array when obstacles are not assigned', function() {
            var mr = new MarsRover([7, 19], 'N');
            expect(mr.obstacles.length).toEqual(0);
        });
        it('should not move to the obstacle', function() {
            var mr = new MarsRover([0, 0], 'S');
            mr.obstacles = [[8, 2], [7, 0]];
            mr.commands(['f', 'f', 'f']);
            expect(mr.location).toEqual([0, 97]);
        });
        it('should stop when obstacle is detected', function() {
            var mr = new MarsRover([0, 0], 'N');
            mr.obstacles = [[0, 3]];
            mr.commands(['f', 'f', 'f', 'l', 'f']);
            expect(mr.location).toEqual([0, 2]);
        });
        it('should set status to obstacle when one is detected', function() {
            var mr = new MarsRover([0, 0], 'N');
            mr.obstacles = [[0, 1]];
            mr.commands(['f']);
            expect(mr.status).toEqual('obstacle');
        });
        it('should leave status to Yaay when obstacle is NOT detected', function() {
             var mr = new MarsRover([0, 0], 'E');
             mr.commands(['f']);
             expect(mr.status).toEqual('Yaay');
        });
    });

});