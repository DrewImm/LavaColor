var LavaColor = function()
{

    this.targets = [];

    this.rot = 0;
    this.r1 = 0;
    this.g1 = 0;
    this.b1 = 0;
    this.r2 = 0;
    this.g2 = 0;
    this.b2 = 0;
    this.speed = 0.1;
    this.lastRender = 0;
    this.deltaTime = 0;
    this.sineAmplitude = 30;
    this.sineFrequency = 2;
    this.sinePhase = 0;
    this.sineT = 0;
    this.DELTATIME = 1 / 60;

    /**
     * Get sine wave point
     */
    this.getSinePoint = (t, phase, amplitude) => {

        if (phase == undefined) {
            phase = this.sinePhase;
        }

        if (amplitude == undefined) {
            amplitude = this.sineAmplitude;
        }

        return amplitude * Math.sin(this.sineFrequency * t + phase);
    }

    /**
     * Manually set the start colors
     */
    this.setColor = (r1, g1, b1, r2, g2, b2) => {
        this.r1 = r1;
        this.g1 = g1;
        this.b1 = b1;
        this.r2 = r2;
        this.g2 = g2;
        this.b2 = b2;
    }

    /**
     * Manually set the start rotation
     */
    this.setRotation = (rotation) => {
        this.rot = rotation;
    }

    /**
     * Manually set the amplitude (change in color)
     */
    this.setAmplitude = (amplitude) => {
        this.sineAmplitude = amplitude;
    }

    /**
     * Manually set the speed
     */
    this.setSpeed = (speed) => {
        this.speed = speed;
    }

    /**
     * Recolor the target
     */
    this.recolor = () => {
        this.rot = Math.floor(Math.random() * 360);
        this.r1 = (Math.round(Math.random() * 127) + 127);
        this.g1 = (Math.round(Math.random() * 127) + 127);
        this.b1 = (Math.round(Math.random() * 127) + 127);
        this.r2 = (Math.round(Math.random() * 127) + 127);
        this.g2 = (Math.round(Math.random() * 127) + 127);
        this.b2 = (Math.round(Math.random() * 127) + 127);
        this.lastRender = 0;
        this.deltaTime = 0;
        this.deltaColor = 0;
        this.colorDirection = true;
    };

    /**
     * Check a color for boundaries
     */
    this.checkColor = (r, g, b) => {

        if (r > 200 || r < 100 ||
            g > 200 || g < 100 ||
            b > 200 || b < 100) {
            return false;
        }
        else {
            return true;
        }

    }

    /**
     * Render the target
     */
    this.render = (timestamp) => {

        // Calculate delta time
        this.deltaTime = timestamp - this.lastRender;
        this.deltaTime = Math.floor(this.deltaTime - this.DELTATIME, 0);
        this.lastRender = timestamp;

        // Calculate speed
        var speed = this.deltaTime;
        speed *= this.speed;

        this.sineT += speed / 100;

        var r1c = this.getSinePoint(this.sineT, 1);
        var g1c = this.getSinePoint(this.sineT, 1);
        var b1c = this.getSinePoint(this.sineT, 1);
        var r2c = this.getSinePoint(this.sineT, 0);
        var g2c = this.getSinePoint(this.sineT, 0);
        var b2c = this.getSinePoint(this.sineT, 0);

        var r1 = Math.floor(Math.ceil(this.r1 + r1c, 200), 100);
        var g1 = Math.floor(Math.ceil(this.g1 + g1c, 200), 100);
        var b1 = Math.floor(Math.ceil(this.b1 + b1c, 200), 100);
        var r2 = Math.floor(Math.ceil(this.r2 + r2c, 200), 100);
        var g2 = Math.floor(Math.ceil(this.g2 + g2c, 200), 100);
        var b2 = Math.floor(Math.ceil(this.b2 + b2c, 200), 100);

        this.rot += speed / 10;
        if (this.rot > 360) {
            this.rot = 0;
        }
    
        // Render to paint targets
        if (this.targets) {

            // Count number of paint targets
            var nTargets = this.targets.length;

            // Render each paint target
            for (var i = 0; i < nTargets; i++) {
                this.targets[i].style.background = "linear-gradient(" +
                    this.rot + "deg, " +
                    "rgb(" + r1 + ", " + g1 + ", " + b1 + "), " +
                    "rgb(" + r2 + ", " + g2 + ", " + b2 + ") " +
                    ")"
                ;
            }
        }

        window.requestAnimationFrame(this.render);

    };

    /**
     * Set a new target ID to paint.
     *
     * @param string id Target ID to paint
     */
    this.paint = (id) => {
        this.targets.push(document.getElementById(id));
    }

    /**
     * Start the render
     */
    this.recolor();
    window.requestAnimationFrame(this.render);

};

var mylava = new LavaColor();
mylava.setColor(
    75, 190, 75,
    75, 75, 190
);
mylava.setAmplitude(25);
mylava.setSpeed(0.1);
mylava.setRotation(100);
mylava.paint("lavatest");
mylava.paint("lava-button");


var headinglava = new LavaColor();
headinglava.paint("section1heading");