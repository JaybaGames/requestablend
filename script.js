	if(!localStorage.questablend){
		let temp = {
			level: 1,
			budget: 0,
			dyes: ["Black", "White"]
		};
		localStorage.questablend = JSON.stringify(temp)
	}
	let userData = JSON.parse(localStorage.questablend);

	const config = {
		levels: [{},
			{
				number: 1,
				customers: [
					["builder", "#ffffff"],
					["builder", "#000000"],
					["builder", "#808080"],
				]
			}, 
			{
				number: 2,
				customers: [
					["builder", "#808080"],
					["builder", "#555555"],
					["builder", "#aaaaaa"]
				]
			},
			{
				number: 3,
				customers: [
					["builder", "#808080", "#555555", "#aaaaaa"],
					["painter", "random"],
					["builder", "random"]
				]
			}
		],
		dyePerLevel: [
			["Red", 3]
		],
		customers: {
			builder: {
				time: 15,
				dyeMaxCount: 2,
				pay: 5,
				diffMax: 60
			},
			painter: {
				time: 25,
				dyeMaxCount: 3,
				pay: 12,
				diffMax: 30
			}
		}
	}

	let rightMusic = document.querySelector("#musicIntro");
	const fullscreener = document.querySelector("#fullscreener");
	const pauseButton = document.querySelector("#pauseButton");
	const resumeButton = document.querySelector("#resumeButton");
	const pauseScreen = document.querySelector("#pauseScreen");
	const mainMenuButton = document.querySelector("#mainMenuButton");
	const frame2 = document.querySelector("#frame2")
	const goalPlatform = document.querySelector("#goalPlatform")
	const custLeftStat = document.querySelector("#customerLeftStatus");
	const salaryStat = document.querySelector("#salaryStatus");
	const buckets = document.querySelector("#buckets")
	const workplace = document.querySelector("#workplace")
	const clickableSound = document.querySelector("#clickableSound")
	const splash = document.querySelector("#splash")

	for(let i = 0; i < buckets.children.length; i++){
		let alright = false
		for(let j of userData.dyes){
			if(j == buckets.children[i].querySelector(".cans").id.slice(4)){
				alright = true
				
				break;
			}
		}
		if(!alright)
			buckets.children[i].mustRemove = true;
	}
	for(let i = buckets.children.length - 1; i >= 0; i--){
		if(buckets.children[i].mustRemove)
			buckets.children[i].remove()
	}
	for(let i = 0; i < buckets.children.length; i++){
		buckets.children[i].querySelector(".cans").addEventListener("click", function(){
			blend(buckets.children[i].querySelector(".cans").id.slice(4))
			let temp = document.createElement("img");
			buckets.children[i].appendChild(temp)
			temp.setAttribute("class", "drops")
			temp.setAttribute("src", "images/drops/" + buckets.children[i].querySelector(".cans").id.slice(4) + ".png")
			setTimeout(function(){
				temp.style.bottom = "120%";	
			}, 100)
			setTimeout(function(){
				temp.style.bottom = "200%";	
				let middle = (buckets.children.length - 1)/2
				let counted = (-((i - middle)/2)) * 300
				temp.style.left = (50 + counted)  + "%"
			}, 400)
			setTimeout(function(){
				buckets.children[i].removeChild(temp)
			}, 650)
		})
	}

	if(userData.dyes.length <= 4){
		let spaces = (100 - (buckets.children.length * 24))/(buckets.children.length+1);
		for(let bucket of buckets.children){
			bucket.style.width = "24%";
			bucket.style.height = "27vh";
			bucket.style.marginLeft = spaces + "%";
		}
	}

	fullscreener.querySelector("button").onclick = function(){
		fullscreener.querySelector("button").style.filter = "brightness(70%)"
		document.body.requestFullscreen();
		rightMusic.play()
	}

	playButton = document.querySelector("#playButton");
	playButton.onclick = function(){
		frame2.style.left = "0%";
		const levelDiv = document.querySelector("#levelDiv");
		const goal = document.querySelector("#goal")
		startLevel()
		rightMusic.pause();
		rightMusic = document.querySelector("#musicDuring");
		rightMusic.currentTime = 0
		rightMusic.play(); rightMusic.volume = 1
	}
	pauseButton.onclick = function(){
		rightMusic.pause()
		pauseScreen.style.display = "block"
		const pauseSound = document.querySelector("#pauseSound")
		pauseSound.currentTime = 0
		pauseSound.play()
	}
	resumeButton.onclick = function(){
		pauseScreen.style.display = "none"
		rightMusic.play()
	}
	mainMenuButton.onclick = function(){
		rightMusic.pause()
		leaveLevel();
		frame2.style.left = "100%";
		rightMusic = document.querySelector("#musicIntro");
		rightMusic.currentTime = 0
		rightMusic.play()
	}

	let custLeftCount = config.levels[userData.level].customers.length
	function startLevel(){
		custLeftStat.querySelector("p").innerHTML = custLeftCount + " left";
		pauseScreen.style.display = "none"
		levelDiv.children[1].innerHTML = userData.level;
		levelDiv.style.paddingTop = "10px"
		levelDiv.style.display = "block";
		levelDiv.children[0].style.opacity = "1";
		levelDiv.children[1].style.opacity = "1";
		levelDiv.style.top = "50%";
		levelDiv.style.left = "50%";
		levelDiv.style.transform = "translate(-50%, -50%)"
		goal.style.top = "50%";
		goal.style.left = "50%";
		goal.style.transform = "translate(-50%, -50%) scale(115%)";
		goal.style.opacity = 0;

		let tempColor;
		if(config.levels[userData.level].customers[0].length > 2){
			let randomIndex = Math.floor(Math.random()*(config.levels[userData.level].customers[0].length-1))
			tempColor = config.levels[userData.level].customers[0][randomIndex+1]
		}
		else {
			tempColor = config.levels[userData.level].customers[0][1]
		}
		newOrder(custA.querySelector("canvas"), tempColor)

		if(config.levels[userData.level].customers.length > 1){
			if(config.levels[userData.level].customers[1].length > 2){
				let randomIndex = Math.floor(Math.random()*(config.levels[userData.level].customers[1].length-1))
				tempColor = config.levels[userData.level].customers[1][randomIndex+1]
			}
			else {
				tempColor = config.levels[userData.level].customers[1][1]
			}
		}
		newOrder(custB.querySelector("canvas"), tempColor)

		setTimeout(function(){
			levelDiv.style.opacity = "1";
		}, 700)
		setTimeout(function(){
			levelDiv.style.transform = "translate(-50%, -50%) scale(50%)";
			levelDiv.style.top = "20%";
		}, 2000)
		setTimeout(function(){
			levelDiv.style.transform = "translate(-50%, -50%) scale(35%)";
			levelDiv.style.top = "5%";
			levelDiv.style.paddingTop = "70px"
		}, 5700)
		setTimeout(function(){
			goal.style.opacity = "1";
		}, 3000)
		setTimeout(function(){
			goal.style.transform = "translate(0%, 0%) scale(70%)";
			goal.style.left = "1%"
			goal.style.top = "0%"
			goalPlatform.style.bottom = "87%";
		}, 5700)
		setTimeout(function(){
			pauseButton.style.top = "2vh";
			custLeftStat.children[0].style.left = "0%";
			salaryStat.children[0].style.right = "5%";
			workplace.style.right = "5vh";
		}, 6300)
		setTimeout(function(){
			custA.setAttribute("src", "images/customers/" + config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount][0]+ ".png")
			custA.classList.add("cust0Walking")
			custA.style.left = "7vh"
		}, 7000)
		setTimeout(function(){
			custA.classList.remove("cust0Walking")
		}, 8750)
	}
	function leaveLevel(){
		custLeftStat.children[0].style.left = "300%";
		salaryStat.children[0].style.right = "300%";
		goal.style.top = "-40%";
		goalPlatform.style.bottom = "100%";
		levelDiv.style.top = "-50%"
		pauseButton.style.top = "-40%"
		workplace.style.right = "-85vh";
		for(i of document.querySelectorAll(".cust0")){
			if(i.style.left == "7vh"){
				i.style.transition = "left 0.5s"
				i.style.left = "250vh"
				const eto = i
				setTimeout(function(){
					eto.style.transition = "none"
					eto.style.left = "-125vh"
				}, 750)
				setTimeout(function(){
					eto.style.transition = "left 1.5s"
				}, 800)
			}
		}
		setTimeout(function(){
			levelDiv.style.opacity = "0";
			custLeftStat.children[0].style.left = "100%";
			salaryStat.children[0].style.right = "105%";
		}, 500)
	}

	function swapCust() {
		if(custLeftCount > 0){
			custLeftStat.querySelector("p").innerHTML = --custLeftCount + " left"
			custLeftStat.querySelector("img").style.transform = "translateY(-4vh) scale(1.6) rotate(-5deg)";
			setTimeout(function(){
				custLeftStat.querySelector("img").style.transform = "";
			}, 100)
		}
		if(custA.style.left == "7vh"){
			custA.classList.add("cust0Walking")
			custA.style.left = "-125vh"
			if(custLeftCount > 0){
				custB.setAttribute("src", "images/customers/" + config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount][0]+ ".png")
				custB.classList.add("cust0Walking")
				custB.style.left = "7vh"
				setTimeout(function(){
					custB.classList.remove("cust0Walking")
					custA.classList.remove("cust0Walking")

					if(custLeftCount > 1){
						let tempColor;
						if(config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount + 1].length > 2){
							let randomIndex = Math.floor(Math.random()*(config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount + 1].length-1))
							tempColor = config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount + 1][randomIndex+1]
						}
						else {
							tempColor = config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount + 1][1]
						}

						newOrder(custA.querySelector("canvas"), tempColor)
					}
				}, 1750)
			}
		}
		else {
			custB.classList.add("cust0Walking")
			custB.style.left = "-125vh"
			if(custLeftCount > 0){
				custA.setAttribute("src", "images/customers/" + config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount][0]+ ".png")
				custA.classList.add("cust0Walking")
				custA.style.left = "7vh"
				setTimeout(function(){
					custA.classList.remove("cust0Walking")
					custB.classList.remove("cust0Walking")

					if(custLeftCount > 1){
						let tempColor;
						if(config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount + 1].length > 2){
							let randomIndex = Math.floor(Math.random()*(config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount + 1].length-1))
							tempColor = config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount + 1][randomIndex+1]
						}
						else {
							tempColor = config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount + 1][1]
						}

						newOrder(custB.querySelector("canvas"), tempColor)
					}
				}, 1750)
			}
		}
	}

	window.onload = function(){
		verifyScreen()
	}

	function verifyScreen(){
		if (window.orientation === 0 || window.orientation === 180) {
			fullscreener.style.display = "block"
		    fullscreener.querySelector("p").innerHTML = "Please rotate your phone to landscape mode for a better experience."
			fullscreener.querySelector("button").disabled = true;
			fullscreener.querySelector("button").style.filter = "contrast(30%)";
			rightMusic.pause()
		} else {
			fullscreener.querySelector("button").disabled = false;
			fullscreener.querySelector("button").style.filter = "none";
			if (document.fullscreenElement) {
				fullscreener.style.display = "none"
				rightMusic.play()
			} else {  
				fullscreener.querySelector("p").innerHTML = "Set the view to fullscreen to play and for a better experience."
				fullscreener.style.display = "block"
				rightMusic.pause()
			}
		}
	}

	document.addEventListener("fullscreenchange", () => {
		verifyScreen()
	});
	window.addEventListener("orientationchange", () => {
	  	verifyScreen()
	});

	for(let elem of document.querySelectorAll(".clickableSound")){
		elem.addEventListener("click", function(){
			clickableSound.currentTime = 0
			clickableSound.play()
		})
	}

	let currentDyes = [];

	let imageSplash = `
		data:image/png;base64,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	
	`;
	let img = new Image();
	img.src = imageSplash
	imageSplash = img;
	let imageSplashSmall = `
		data:image/png;base64,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
	`;
	img = new Image();
	img.src = imageSplashSmall
	imageSplashSmall = img;

	function blend(newColor){
		const ctx = splash.getContext("2d", {willReadFrequently: true})
		paintPour.currentTime = 0
		paintPour.play()
		setTimeout(function(){
			if(currentDyes.length == 0)
				ctx.drawImage(imageSplash, 0, 0, splash.width, splash.height)
			currentDyes.push(newColor)

			let finalColor = averageColor(nameToHex(currentDyes));
			fillCTX(splash, finalColor)
		}, 600)
	}

	function fillCTX(canvas, fillColor){
		const ctx = canvas.getContext("2d", {willReadFrequently: true})
		let x = splash.width/2
		let y = splash.height/2
		const imageData = ctx.getImageData(0, 0, splash.width, splash.height);
    	const data = imageData.data;

    	const index = (y * splash.width + x) * 4;
	    const targetColor = [data[index], data[index+1], data[index+2], data[index+3]];

	    hex = fillColor.replace("#", "");
	    const bigint = parseInt(hex, 16);
	    const replacement = [
	        (bigint >> 16) & 255,
	        (bigint >> 8) & 255,
	        bigint & 255,
	        255
	    ];

   		if (colorsMatch(targetColor, replacement)) return;

    	const stack = [[x, y]];

	    while (stack.length) {
	        const [cx, cy] = stack.pop();
	        const index = (cy * splash.width + cx) * 4;
	        const currentColor = [data[index], data[index+1], data[index+2], data[index+3]];

	        if (colorsMatch(currentColor, targetColor)) {
	            setPixel(data, cx, cy, replacement);

	            stack.push([cx + 1, cy]);
	            stack.push([cx - 1, cy]);
	            stack.push([cx, cy + 1]);
	            stack.push([cx, cy - 1]);
	        }
	    }
    	ctx.putImageData(imageData, 0, 0);
	}

	function setPixel(data, x, y, color) {
	    const index = (y * splash.width + x) * 4;
	    [data[index], data[index+1], data[index+2], data[index+3]] = color;
	}

	function colorsMatch(a, b) {
	    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
	}

	function nameToHex(colors) {
	  const colorMap = {
	    "Black": "#000000",
	    "White": "#ffffff",
	    "Green": "#00ff00",
	    "Red": "#ff0000",
	    "Blue": "#0000ff",
	    "Yellow": "#ffff00",
	    "Cyan": "#00ffff",
	    "Magenta": "#ff00ff",
	    // Add more if needed
	  };
	  return colors.map(c => colorMap[c] || null); // returns null if not found
	}

	// Example
	let inputColors = ["Black", "White", "Green"];
	let hexColors = nameToHex(inputColors);

	function averageColor(hexColors) {
	    let r = 0, g = 0, b = 0;

	    hexColors.forEach(hex => {
	        // Remove "#" if present
	        hex = hex.replace("#", "");

	        // Parse the hex into RGB
	        let num = parseInt(hex, 16);
	        r += (num >> 16) & 255;
	        g += (num >> 8) & 255;
	        b += num & 255;
	    });

	    // Average
	    let count = hexColors.length;
	    r = Math.round(r / count);
	    g = Math.round(g / count);
	    b = Math.round(b / count);

	    // Convert back to hex
	    let result = "#" + [r, g, b].map(x =>
	        x.toString(16).padStart(2, "0")
	    ).join("");

	    return result;
	}

	function deleteFocus(){deleteButton.setAttribute("src", "images/icons/deleteFocus.png")}
	function deleteUnfocus(){deleteButton.setAttribute("src", "images/icons/deleteUnfocus.png")}
	deleteButton.addEventListener("touchstart", deleteFocus)
	deleteButton.addEventListener("mousedown", deleteFocus)
	deleteButton.addEventListener("touchend", deleteUnfocus)
	deleteButton.addEventListener("mouseup", deleteUnfocus)
	deleteButton.addEventListener("click", function(){
		splash.style.transform = "translate(100%, -180%) rotate(120deg)"
		deleteSound.currentTime = 0
		deleteSound.play()
		setTimeout(function(){
			splash.getContext("2d").clearRect(0, 0, splash.width, splash.height)
			splash.style.transition = "none";
			splash.style.transform = "translate(-50%, -50%)"
			splash.style.transition = "transform 0.3s";
		}, 300)
		currentDyes = [];
	})

	let startX = 0, startY = 0, moveX = 0, moveY = 0, targetX = 0, targetY = 0, curX = 0, curY = 0, isTouched = false, animID;
	let anim  = function(){
		curX += (targetX - curX) * 0.2
		curY += (targetY - curY) * 0.2
		
		splash.style.left = "calc(50% + " + curX + "px)"
		splash.style.top = "calc(36% + " + curY + "px)"

		animID = requestAnimationFrame(anim)
	}
	splash.addEventListener("touchstart", function(ev){
		isTouched = true;
		startX = ev.touches[0].clientX
		startY = ev.touches[0].clientY

		animID = requestAnimationFrame(anim)
	})
	document.addEventListener("touchmove", function(ev){
		if(isTouched){
			moveX = ev.touches[0].clientX
			moveY = ev.touches[0].clientY
			targetX = moveX - startX
			targetY= moveY - startY

		}
	})
	document.addEventListener("touchend", function(){
		if(isTouched){
			swapCust()
		}
		isTouched = false;
		startX = startY = moveX = moveY = targetX = targetY = curX = curY = 0
		cancelAnimationFrame(animID)
		splash.style.transition = "transform 0.3s, left 0.3s, top 0.3s"
		splash.style.top = "36%"
		splash.style.left = "50%"
		setTimeout(function(){
			splash.style.transition = "transform 0.3s"
		}, 300)
	})

function newOrder(canvas, color){
	const ctx = canvas.getContext("2d");
	const center = canvas.width/2

	ctx.beginPath()
	ctx.arc(center, center, Math.round(canvas.width*0.42), 0, 2 * Math.PI);
	ctx.fillStyle = "black";
	ctx.fill();

	ctx.beginPath()
	ctx.arc(center, center, Math.round(canvas.width*0.4), 0, 2 * Math.PI);
	ctx.fillStyle = "white";
	ctx.fill();

	const toScale = 0.6
	ctx.drawImage(imageSplashSmall, canvas.width*(1-toScale)/2, canvas.height*(1-toScale)/2, canvas.width*toScale, canvas.height*toScale)
	

	fillCTX(canvas, color)
}
