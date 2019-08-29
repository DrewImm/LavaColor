# LavaColor
Beautiful Javascript background gradients

LavaColor Example: https://stateless.studio/contact

## Installation

### npm

```
npm i lavacolor
```

## Usage

Checkout index.html and sample.js here to see an example.

In your html:
```html
<div id="lavacolor"></div>
```

In your JS/TS:
```js
var mylava = new LavaColor();
mylava.setColor(85, 190, 85, 85, 85, 190);
mylava.paint('lavacolor');
```

### Options

**mylava.setColor(r1, g1, b1, r2, g2, b2);**
Set the color of the gradient.

**mylava.setSpeed(X)**
Set the speed of the animation. Default is 0.1

**mylava.setRotation(X)**
Rotation amount, from 0-360, in which the gradient should start. Default is 0

**mylava.setAmplitude(X)**
Set how far the colors will deviate. For example, 1 will keep the colors nearly identical, while 100 will change the color intensly.

Default is 30, range is 1-128.

**Advanced**
Note that the amplitude PLUS each color should'nt add up to much more than 255 or fall below 0.

**mylava.setSineOffset(X)**
Set the shift phase. https://en.wikipedia.org/wiki/Phase_(waves)#Phase_shift

### Multiple Paint Targets

You can paint the same gradient to many elements for a matching effect. Just give them each a unique id and add them as paint targets!

```js
var mylava = new LavaColor();
mylava.setColor(85, 190, 85, 85, 85, 190);
mylava.paint('lavacolor1');
mylava.paint('lavacolor2');
mylava.paint('cool-div');
```
