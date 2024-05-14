document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('graph');
    const ctx = canvas.getContext('2d');
  
    const width = canvas.width;
    const height = canvas.height;
    const scale = 20; // Scale for the graph
  
    // Function to plot
    function f(x) {
      return 1 / x;
    }
  
    // Draw axes
    function drawAxes() {
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.strokeStyle = 'black';
      ctx.stroke();
    }
  
    // Plotting the function
    function plotFunction() {
      ctx.beginPath();
      
      // Starting point (just right of x = 0)
      ctx.moveTo(width / 2 + 1/scale, height / 2 - scale * f(1/scale));
  
      // Only draw positive y values (y > 0)
      for (let i = 1; i < width / 2; i++) {
        let x = i / scale;
        let y = f(x);
        if (y > 0) {
          ctx.lineTo(width / 2 + i, height / 2 - scale * y);
        }
      }
  
      ctx.moveTo(width / 2 - 1/scale, height / 2 - scale * f(-1/scale));
  
      for (let i = -1; i > -width / 2; i--) {
        let x = i / scale;
        let y = f(x);
        if (y > 0) {
          ctx.lineTo(width / 2 + i, height / 2 - scale * y);
        }
      }
      ctx.lineWidth = 15
      ctx.strokeStyle = 'Red';
      ctx.stroke();
    }
  
    // Draw the axes and the function
    drawAxes();
    plotFunction();
  });
  

//   second graph
document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('circleCanvas');
    const ctx = canvas.getContext('2d');
  
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 50; // Radius of the circle
  
    // Function to draw the axes
    function drawAxes() {
      ctx.beginPath();
      ctx.moveTo(0, centerY);       // Start at the left middle side of the canvas
      ctx.lineTo(width, centerY);   // Draw line across the horizontal middle
      ctx.moveTo(centerX, 0);       // Start at the top center of the canvas
      ctx.lineTo(centerX, height);  // Draw line down the vertical center
      ctx.strokeStyle = 'black';    // Color of the axes
      ctx.lineWidth = 1;            // Width of the axes lines
      ctx.stroke();
    }
  
    // Draw a circle
    function drawCircle() {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = 'Red'; // Color of the circle's outline
      ctx.lineWidth = 15; // Thickness of the outline
      ctx.stroke();
    }
  
    // Optionally fill the circle
    
    // Execute drawing functions
    drawAxes();
    drawCircle();
    fillCircle(); // Remove this line if you don't want the circle filled
  });
  

//   third graph
document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
  
    const width = canvas.width;
    const height = canvas.height;
    const scale = 50; // Adjust scale to fit the graph within the canvas nicely
  
    // Function to draw the axes
    function drawAxes() {
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2); // X-axis
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height); // Y-axis
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  
    // Plotting the U-shaped function y = -x^2
    function plotFunction() {
      ctx.beginPath();
      // Adjust the function plotting to center and scale the curve
      for (let x = -width / 2 / scale; x <= width / 2 / scale; x += 0.1) {
        let y = -Math.pow(x, 2); // -x^2 function for U shape
        ctx.lineTo(width / 2 + x * scale, height / 2 + y * scale); // Move to points on the curve
      }
      ctx.lineWidth = 15
  
      ctx.strokeStyle = 'Red';
      ctx.stroke();
    }
  
    // Draw the axes and the function
    drawAxes();
    plotFunction();
  });

  
//   fourth graph

document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('axisCanvas');
    const ctx = canvas.getContext('2d');
  
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 40; // Radius for the 'C' shapes
    const lineWidth = 1; // Width of the lines for the axes
    const verticalSpacing = 10; // Space between the two 'C's
  
    // Function to draw a 'C'
    function drawC(x, y, clockwise = false) {
      ctx.beginPath();
      const startAngle = clockwise ? Math.PI / 2 : 3 * Math.PI / 2;
      const endAngle = clockwise ? -Math.PI / 2 : Math.PI / 2;
      ctx.arc(x, y, radius, startAngle, endAngle, !clockwise);
      ctx.lineWidth = 15;
      ctx.strokeStyle = 'Red';
      ctx.stroke();
      
    }
  
    // Function to draw the axes
    function drawAxes() {
      ctx.beginPath();
      // Y-axis
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, canvas.height);
      // X-axis
      ctx.moveTo(0, centerY);
      ctx.lineTo(canvas.width, centerY);
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = 'black';
      ctx.stroke();
    }
  
    // Drawing everything
    drawAxes();
    // Draw the 'C's positioned symmetrically about the Y-axis and stacked vertically
    drawC(centerX + radius + 5, centerY - radius - verticalSpacing, false); // Upper 'C'
    drawC(centerX + radius + 5, centerY + radius + verticalSpacing, false); // Lower 'C', directly below the first
  
  });
  