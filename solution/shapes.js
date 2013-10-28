var extend = function(object1, object2) {
  for (var key in object2) {
    object1['_' + key] = object2[key]
  }
}

var Shape = function(options) {
  extend(this, options)
}

Shape.prototype.stroke = function(setting) {
  if(setting) {
    if(typeof setting !== 'string') throw new Error('stroke must be a String. (either rgb(_,_,_) or a css approved color)');
    this._stroke = setting;
    return this;
  }
  return this._stroke;
}

Shape.prototype.strokeWidth = function(setting) {
  if(setting) {
    if(isNaN(setting)) throw new Error('strokeWidth must be a number');
    this._strokeWidth = setting;
    return this;
  }
  return this._strokeWidth;
}

Shape.prototype.draw = function(parent) {
  var element = document.createElementNS("http://www.w3.org/2000/svg", this.type);
  element.setAttribute('stroke', this._stroke || 'black');
  element.setAttribute('stroke-width', this._strokeWidth || 0);
  if(this.type === 'line') {
    element.setAttribute('x1', this._x1 || 0);
    element.setAttribute('y1', this._y1 || 0);
    element.setAttribute('x2', this._x2 || 0);
    element.setAttribute('y2', this._y2 || 0);
  } else {
    element.setAttribute('fill', this._fill || 'black');
    if(this.type === 'circle'){
      element.setAttribute('r', this._width >> 1 || 0);
      element.setAttribute('cx', this._cx || 0);
      element.setAttribute('cy', this._cy || 0);
    }
    if(this.type === 'rect') {
      if (this.isSquare) {
        element.setAttribute('x', this._cx - (this._width >> 1) || this._cx - (this._height >> 1) || 0);
        element.setAttribute('y', this._cy - (this._width >> 1) || this._cy - (this._height >> 1) || 0);
        element.setAttribute('width', this._width || this._height || 0);
        element.setAttribute('height', this._width || this._height || 0);
      } else {
        element.setAttribute('x', this._cx - (this._width >> 1)|| 0);
        element.setAttribute('y', this._cy - (this._height >> 1) || 0);
        element.setAttribute('width', this._width || 0);
        element.setAttribute('height', this._height || 0);
      }
    }
  }
  parent.appendChild(element);
  return this;
}

var Line = function(options) {
  // x1, y1, x2, y2, stroke, strokeWidth
  Shape.apply(this, arguments);
  this.type = 'line';
}

Line.prototype = Object.create(Shape.prototype);

Line.prototype.x1 = function(setting) {
  if(setting) {
    if(isNaN(setting)) throw new Error('x1 must be a number');
    this._x1 = setting;
    return this;
  }
  return this._x1;
}

Line.prototype.y1 = function(setting) {
  if(setting) {
    if(isNaN(setting)) throw new Error('y1 must be a number');
    this._y1 = setting;
    return this;
  }
  return this._y1;
}

Line.prototype.x2 = function(setting) {
  if(setting) {
    if(isNaN(setting)) throw new Error('x2 must be a number');
    this._x2 = setting;
    return this;
  }
  return this._x2;
}

Line.prototype.y2 = function(setting) {
  if(setting) {
    if(isNaN(setting)) throw new Error('y2 must be a number');
    this._y2 = setting;
    return this;
  }
  return this._y2;
}

var Circle = function(options) {
  // cx, cy, center, width, stroke, strokeWidth, fill
  Shape.apply(this, arguments);
  this.type = 'circle';
}

Circle.prototype = Object.create(Shape.prototype);

Circle.prototype.cx = function(setting) {
  if(setting) {
    if(isNaN(setting)) throw new Error('cx must be a number');
    this._cx = setting;
    return this;
  }
  return this._cx;
}

Circle.prototype.cy = function(setting) {
  if(setting) {
    if(isNaN(setting)) throw new Error('cy must be a number');
    this._cy = setting;
    return this;
  }
  return this._cy;
}

Circle.prototype.center = function(cx, cy) {
  if(cx || cy) {
    this._cx = cx;
    if(isNaN(cx)) throw new Error('cx must be a number');
    if(isNaN(cy)) throw new Error('cy must be a number');
    this._cy = cy;
    return this;
  }
  return [this._cx, this._cy];
}

Circle.prototype.width = function(setting) {
  if(setting) {
    if(isNaN(setting)) throw new Error('width must be a number');
    this._width = setting;
    return this;
  }
  return this._width;
}

Circle.prototype.fill = function(setting) {
  if(setting) {
    if(typeof setting !== 'string') throw new Error('fill must be a String. (either rgb(_,_,_) or a css approved color)');
    this._fill = setting;
    return this;
  }
  return this._fill;
}

var Rectangle = function(options) {
  // cx, cy, center, width, height, stroke, strokeWidth, fill
  Circle.apply(this, arguments);
  this.type = 'rect';
}

Rectangle.prototype = Object.create(Circle.prototype);

Rectangle.prototype.height = function(setting) {
  if(setting) {
    if(isNaN(setting)) throw new Error('height must be a number');
    this._height = setting;
    return this;
  }
  return this._height;
}

var Square = function(options) {
  // cx, cy, center, width, height, stroke, strokeWidth, fill
  Rectangle.apply(this, arguments);
  this.type = 'rect';
  this.isSquare = true;
}

Square.prototype = Object.create(Rectangle.prototype);

var Text = function(options) {
  // x, y, text
  extend(this, options);
  this.type = 'text';
}

Text.prototype.x = function(setting) {
  if(setting) {
    if(isNaN(setting)) throw new Error('x must be a number');
    this._x = setting;
    return this;
  }
  return this._x;
}

Text.prototype.y = function(setting) {
  if(setting) {
    if(isNaN(setting)) throw new Error('y must be a number');
    this._y = setting;
    return this;
  }
  return this._y;
}

Text.prototype.text = function(setting) {
  if(setting) {
    if(typeof setting !== 'string') throw new Error('text must be a String.');
    this._text = setting;
    return this;
  }
  return this._text;
}

Text.prototype.fontSize = function(setting) {
  if(setting) {
    if(isNaN(setting)) throw new Error('fontSize must be a number');
    this._fontSize = setting;
    return this;
  }
  return this._text;
}

Text.prototype.rotate = function(setting) {
  if(setting) {
    if(isNaN(setting)) throw new Error('rotation must be a number');
    this._rotation = setting;
    return this;
  }
  return this._text;
}

Text.prototype.draw = function(parent) {
  var element = document.createElementNS("http://www.w3.org/2000/svg", "text");
  element.setAttribute('font-size', this._fontSize || 12);
  element.setAttribute('transform', 'translate(' + (this._x || 0) + ',' + (this._y || 0) + ')rotate(' + (this._rotation || 0) + ')');
  var textNode = document.createTextNode(this._text)
  element.appendChild(textNode);
  parent.appendChild(element);
  return this;
}


// var methodApplier = function(constructor, methodList) {
//   for (var i = 0 ; i < methodList.length ; i++) {
//     if (methodList[i].type === 'int') {
//       constructor.prototype[methodList[i].name] = function(setting) {
//         if(setting) {
//           if(isNaN(setting)) throw new Error(methodList[i].name + ' must be a number');
//           this['_' + methodList[i].name] = setting;
//           return this;
//         }
//         return this['_' + methodList[i].name];
//       }
//       console.log(constructor);
//     } else {
//       constructor.prototype[methodList[i].name] = function(setting) {
//         if(setting) {
//           if(typeof setting !== 'string') throw new Error(methodList[i].name + ' must be a String. (either rgb(_,_,_) or a css approved color)');
//           this['_' + methodList[i].name] = setting;
//           return this;
//         }
//         return this['_' + methodList[i].name];
//       }
//     }
//   }
// }

// var shapeMethodArray = [{
//     name: 'stroke', type: 'string'
//   }, {
//     name: 'strokeWidth', type: 'int'
//   }, {
//     name: 'x1', type: 'int'
//   }, {
//     name: 'x2', type: 'int'
//   }, {
//     name: 'y1', type: 'int'
//   }, {
//     name: 'y2', type: 'int'
//   }, {
//     name: 'cx', type: 'int'
//   }, {
//     name: 'cy', type: 'int'
//   }, {
//     name: 'width', type: 'int'
//   }, {
//     name: 'height', type: 'int'
//   }, {
//     name: 'fill', type: 'string'
//   }];
// methodApplier(Shape, ['stroke, strokeWidth']);
// methodApplier(Line, ['x1', 'x2', 'y1', 'y2']);
// methodApplier(Circle, ['cx', 'cy', 'width', 'fill'])