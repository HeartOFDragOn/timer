var timer = function() {
	
	var 
		zero = ['00011000',
			  	'00111100', 
				'01100110',
			 	'01100110',
				'01100110',
				'01100110',
				'00111100',
				'00011000'
			   ],
		one =  [
				'00011000',
				'00111000',
				'01111000',
				'00011000',
				'00011000',
				'00011000',
				'01111110',
				'01111110'
			   ],
		two =  [
				'00011100',
				'00110110',
				'01100110',
				'00001100',
				'00011000',
				'00110000',
				'01111110',
				'01111110'
			   ],
		three =[
				'00111100',
				'01100110',
				'00000110',
				'00001100',
				'00111100',
				'00000110',
				'01100110',
				'00111100'
			   ],
		four = [
				'00001100',
				'00011100',
				'00111100',
				'01101100',
				'11001100',
				'11111111',
				'00001100',
				'00001100'
			   ],
		five = [
				'11111111',
				'11111111',
				'11000000',
				'11111111',
				'11111111',
				'00000011',
				'11111111',
				'11111111'
			   ],
		six =  [
				'11111111',
				'11111111',
				'11000000',
				'11000000',
				'11111111',
				'11000011',
				'11000011',
				'11111111'
			   ],
		seven =[
				'11111111',
				'11111111',
				'00000110',
				'00001100',
				'00011000',
				'00110000',
				'00110000',
				'00110000'
			   ],
		eight =[
				'11111111',
				'11000011',
				'11000011',
				'11111111',
				'11111111',
				'11000011',
				'11000011',
				'11111111'
			   ],
		nine = [
				'11111111',
				'11000011',
				'11000011',
				'11111111',
				'00000011',
				'00000011',
				'00000011',
				'11111111'
			   ];
		colon =[
				'000000',
				'001100',
				'001100',
				'000000',
				'000000',
				'001100',
				'001100',
				'000000',
			   ];
	var num = {
		1: one,
		2: two,
		3: three,
		4: four,
		5: five,
		6: six,
		7: seven,
		8: eight,
		9: nine,
		0: zero
	};
	var 
		WIDTH, 
		HEIGHT,
		HOUR,
		MINUTE,
		SECOND; 


	function init() {
		var ball = {
			startX: 400,
			startY: 200,
			r: 10,
			vx: -10,
			vy: -5,
			gy: 5,
			zuX: 0.05,
			zuY: 1,
			color: '#F00'
		}
		var $can = $('#timer')[0];
		var ctx = $can.getContext('2d');
		WIDTH = $can.width;
		HEIGHT = $can.height;
		HOUR = 12;
		MINUTE = 30;
		SECOND = 50;

		var balls = [];
		balls.push(ball);
		setInterval(function() {
			ctx.clearRect(0, 0, WIDTH, HEIGHT);
			for(var i = 0; i < balls.length; i++) {
				render(balls[i], ctx);
				update(balls[i]);
			}
		}, 50);
	}

	function update(ball) {
		ball = measure(ball);
	}

	function measure(ball) {
		var dirX = ball.vx >= 0 ? 1 : -1;
		var dirY = ball.vy >= 0 ? 1 : -1;
		if(ball.startX + ball.vx + ball.r >= WIDTH) {
			ball.startX = WIDTH - ball.r;
			ball.vx = -ball.vx;
		} else if (ball.startX + ball.vx - ball.r <= 0) {
			ball.startX = ball.r;
			ball.vx = -ball.vx;
		} else {
			ball.startX = ball.startX + ball.vx;
		}
		if (Math.abs(ball.vx - dirX * ball.zuX) < 2 * ball.zuX ) {
			ball.vx = 0;
		} else {
			ball.vx = ball.vx - dirX * ball.zuX;
		}

		if(ball.startY + ball.vy + ball.r >= HEIGHT) {
			ball.startY = HEIGHT - ball.r;
			ball.vy = -ball.vy;
		} else {
			ball.startY = ball.startY + ball.vy;
		}
		ball.vy = ball.vy + ball.gy - dirY * ball.zuY;
		return ball
	}

	function render(ball, ctx) {
		ctx.fillStyle = ball.color;
		ctx.beginPath();
		ctx.arc(ball.startX, ball.startY, ball.r, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	}

	function paintNumber(number, startWidth, startHeight) {
		for(var i = 0; i < 8; i ++) {
			for(var j = 0; j < number[i].length; j++) {
				if(number[i][j] === '1') {
					var P = point;
					P.y = i * 5 + i * 2 * r + startHeight;
					P.x = j * 5 + j * 2 * r + startWidth;
					paint(P);
				}
			}
		}
	}

	function clearNum(startWidth, startHeight) {
		context.clearRect(startWidth - r, startHeight - r, 195, 195);
	}

	this.run = function() {
		init();
	}
}

$(function() {
	var t = new timer();
	t.run();
});