var timer = function() {
	
	var 
		zero = [
				'0011100',
			  	'0110110', 
				'1100011',
			 	'1100011',
				'1100011',
				'1100011',
				'1100011',
				'1100011',
				'0110110',
				'0011100'
			   ],
		one =  [
				'0001100',
			  	'0111100', 
				'0001100',
			 	'0001100',
				'0001100',
				'0001100',
				'0001100',
				'0001100',
				'0001100',
				'1111111'
			   ],
		two =  [
				'0111110',
			  	'1100011', 
				'0000011',
			 	'0000110',
				'0001100',
				'0011000',
				'0110000',
				'1100000',
				'1100000',
				'1111111'
			   ],
		three =[
				'1111111',
			  	'0000011', 
				'0000110',
			 	'0001100',
				'0011100',
				'0001100',
				'0000110',
				'0000011',
				'1100011',
				'0111110'
			   ],
		four = [
				'0000110',
			  	'0001110', 
				'0011110',
			 	'0110110',
				'1100110',
				'1111111',
				'0000110',
				'0000110',
				'0000110',
				'0001111'
			   ],
		five = [
				'1111111',
			  	'1100000', 
				'1100000',
			 	'1111110',
				'0000011',
				'0000011',
				'0000011',
				'0000011',
				'1100011',
				'0111110'
			   ],
		six =  [
				'0000110',
			  	'0011000', 
				'0110000',
			 	'1100000',
				'1100000',
				'1101110',
				'1100011',
				'1100011',
				'1100011',
				'0111110'
			   ],
		seven =[
				'1111111',
			  	'1100011', 
				'0000110',
			 	'0000110',
				'0001100',
				'0001100',
				'0011000',
				'0011000',
				'0011000',
				'0011000'
			   ],
		eight =[
				'0111110',
			  	'1100011', 
				'1100011',
			 	'1100011',
				'0111110',
				'1100011',
				'1100011',
				'1100011',
				'1100011',
				'0111110'
			   ],
		nine = [
				'0111110',
			  	'1100011', 
				'1100011',
			 	'1100011',
				'0111011',
				'0000011',
				'0000011',
				'0000110',
				'0001100',
				'0110000'
			   ];
		colon =[
				'0000',
			  	'0000', 
				'0110',
			 	'0110',
				'0000',
				'0000',
				'0110',
				'0110',
				'0000',
				'0000'
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
		0: zero,
		'c': colon
	};
	var 
		WIDTH, 
		HEIGHT,
		HOUR,
		MINUTE,
		SECOND,
		STARTX,
		STARTY,
		RADIUS,
		INTERVAL; 
	var timeStartX = [];

	function init() {
		var $can = $('#timer')[0];
		var ctx = $can.getContext('2d');
		WIDTH = $can.width;
		HEIGHT = $can.height;
		HOUR = 12;
		MINUTE = 30;
		SECOND = 50;
		STARTX = 140;
		STARTY = 200;
		RADIUS = 8;
		INTERVAL = 50;
		timeStartX = [
			STARTX,
			STARTX + RADIUS * 19,
			STARTX + RADIUS * 35,
			STARTX + RADIUS * 45,
			STARTX + RADIUS * 64,
			STARTX + RADIUS * 81,
			STARTX + RADIUS * 92,
			STARTX + RADIUS * 111,
		];

		update(ctx, HOUR, MINUTE, SECOND);
	}

	function update(ctx, hours, minutes, seconds) {
		var time = [hours, minutes, seconds];
		var before = [];
		var balls = [];
		setInterval(function() {
			clear(ctx);
			before = time;
			time = caculateTime(time);
			balls.push(addBalls(ctx, before, time));
			drawTimer(ctx, time);
			balls = drawBalls(balls, ctx);
		}, INTERVAL);
	}

	function drawBalls(balls, ctx) {
		for(var i = 0;i < balls.length; i++) {
			for(var j = 0;j < balls[i].length; j++) {
				render(balls[i][j], ctx);
				balls[i][j] = measure(balls[i][j]);
				if(isStop(balls[i][j])) {
					balls[i].splice(j, 1);
				}
			}
			if(balls[i].length === 0) {
				balls.splice(i, 1);
			}
		}
		return balls;
	}

	function isStop(ball) {
		if(ball.vx === 0 && ball.vy === 0 && ball.startY >= (HEIGHT - RADIUS)) {
			return true;
		}
		return false;
	}

	function addBalls(ctx, before, now) {
		var balls = [];
		for(var i = 0;i < 3;i++) {
			if(before[i] !== now[i]) {
				if(parseInt(before[i] / 10) !== parseInt(now[i] / 10)) {
					balls = balls.concat(addBall(timeStartX[i * 3], num[parseInt(before[i] / 10)]));
				}
				if(parseInt(before[i] % 10 / 1) !== parseInt(now[i] % 10 / 1)) {
					balls = balls.concat(addBall(timeStartX[i * 3 + 1], num[parseInt(before[i] % 10 / 1)]));
				}
			}
		}
		return balls;
	}

	function addBall(startx, number) {
		var balls = [];
		for(var i = 0;i < 10;i++) {
			for(var j = 0;j < number[i].length;j++) {
				if(number[i][j] === '1') {
					var ball = {
						startX: startx + j * (RADIUS * 2 + 2),
						startY: STARTY + i * (RADIUS * 2 + 2),
						r: RADIUS,
						vx: Math.pow(-1, parseInt((Math.random() * 100))) * 5,
						vy: -5,
						gy: 5,
						zuX: 0.01,
						zuY: 0.5 * (Math.random() * 1).toFixed(1) + 0.5,
						color: '#' + (Math.random() * 0xffffff << 0).toString(16)
					}
					balls.push(ball);
				}
			}
		}
		return balls;
	}

	function caculateTime(time) {
		var stamp = time[0] * 3600 + time[1] * 60 + time[2] - INTERVAL / 1000;
		hours = parseInt(stamp / 3600);
		minutes = parseInt((stamp - hours * 3600) / 60);
		seconds = stamp - hours * 3600 - 60 * minutes;
		if(seconds < 0) {
			hours = 0;
			minutes = 0;
			seconds = 0;
		}
		return [hours, minutes, seconds]
	}

	function drawTimer(ctx, time) {
		drawNum(ctx, timeStartX[0], STARTY, num[parseInt(time[0] / 10)]);
		drawNum(ctx, timeStartX[1], STARTY, num[time[0] % 10]);
		drawNum(ctx, timeStartX[2], STARTY, num['c']);
		drawNum(ctx, timeStartX[3], STARTY, num[parseInt(time[1] / 10)]);
		drawNum(ctx, timeStartX[4], STARTY, num[time[1] % 10]);
		drawNum(ctx, timeStartX[5], STARTY, num['c']);
		drawNum(ctx, timeStartX[6], STARTY, num[parseInt(time[2] / 10)]);
		drawNum(ctx, timeStartX[7], STARTY, num[parseInt(time[2] % 10) / 1]);
	}

	function drawNum(ctx, x, y, number) {
		for(var i = 0;i < 10;i++) {
			for(var j = 0;j < number[i].length;j++) {
				if(number[i][j] === '1') {
					var ball = {
						startX: x + j * (RADIUS * 2 + 2),
						startY: y + i * (RADIUS * 2 + 2),
						r: RADIUS,
						vx: -10,
						vy: -5,
						gy: 5,
						zuX: 0.05,
						zuY: 1,
						color: '#9AFF9A'
					}
					render(ball, ctx);
				}
			}
		}
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
		if(Math.abs(ball.vy - ball.zuY) < ball.zuY * 2 && ball.startY <= (HEIGHT - RADIUS)) {
			ball.vy = 0;
		}
		return ball
	}

	function render(ball, ctx) {
		ctx.fillStyle = ball.color;
		ctx.beginPath();
		ctx.arc(ball.startX, ball.startY, ball.r, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	}

	function clear(context) {
		context.clearRect(0, 0, WIDTH, HEIGHT);
	}

	this.run = function() {
		init();
	}
}

$(function() {
	var t = new timer();
	t.run();
});