	if(!localStorage.questablend){
		let temp = {
			level: 1,
			budget: 0,
			dyes: ["Black", "White"]
		};
		localStorage.questablend = JSON.stringify(temp)
	}
	let userData = JSON.parse(localStorage.questablend);

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
		let tempImg = new Image()
		tempImg.setAttribute("src", "images/drops/" + buckets.children[i].querySelector(".cans").id.slice(4) + ".png")
		buckets.children[i].querySelector(".cans").dropImg = tempImg
		buckets.children[i].querySelector(".cans").addEventListener("click", function(){
			blend(buckets.children[i].querySelector(".cans").id.slice(4))
			let temp = document.createElement("img");
			buckets.children[i].appendChild(temp)
			temp.setAttribute("class", "drops")
			temp.setAttribute("src", buckets.children[i].querySelector(".cans").dropImg.src)
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

	let curOrder;
	let curToler;
	let nextOrder;
	let orderNow = false
	let custLeftCount = config.levels[userData.level].customers.length
	let curIncome = 0;
	let custMaxPay;

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
		curOrder = tempColor

		for(let i in Object.keys(config.customers))
			if (Object.keys(config.customers)[i] == config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount][0]){
				curToler = Object.values(config.customers)[i].diffMax; break;
			}
			

		if(config.levels[userData.level].customers.length > 1){
			if(config.levels[userData.level].customers[1].length > 2){
				let randomIndex = Math.floor(Math.random()*(config.levels[userData.level].customers[1].length-1))
				tempColor = config.levels[userData.level].customers[1][randomIndex+1]
			}
			else {
				tempColor = config.levels[userData.level].customers[1][1]
			}
			newOrder(custB.querySelector("canvas"), tempColor)
			nextOrder = tempColor
		}

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
			custA.querySelector("img").setAttribute("src", "images/customers/" + config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount][0]+ ".png")
			if(config.levels[userData.level].customers.length > 1)
				custB.querySelector("img").setAttribute("src", "images/customers/" + config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount + 1][0]+ ".png")
			custA.classList.add("cust0Walking")
			custA.style.left = "7vh"
		}, 7000)
		setTimeout(function(){
			custA.classList.remove("cust0Walking")
			orderNow = true
			custA.querySelector("canvas").style.display = "block"
			let time;
			for(let i in Object.keys(config.customers)){
				if (Object.keys(config.customers)[i] == config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount][0]){
					time = Object.values(config.customers)[i].time;
					custMaxPay = Object.values(config.customers)[i].pay; break;
				}
			}
			custStartTiming(custA.querySelector("canvas"), time)
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
		paymentInfo.style.opacity = 1
		paymentInfo.style.top = "5vh"

		setTimeout(function(){
			paymentInfo.style.opacity = 0
			paymentInfo.style.top = "15vh"
		}, 1500)
		angryFlag = 0
		custA.querySelector("canvas").style.display = "none"
		custB.querySelector("canvas").style.display = "none"
		if(custLeftCount > 0){
			custLeftCount--
			setTimeout(function(){
				custLeftStat.querySelector("p").innerHTML = custLeftCount + " left"
				custLeftStat.querySelector("img").style.transform = "translateY(-4vh) scale(1.6) rotate(-5deg)";
				setTimeout(function(){
					custLeftStat.querySelector("img").style.transform = "";
				}, 100)
			}, 1000)
		}
		setTimeout(function(){curOrder = nextOrder}, 500)
		if(custA.style.left == "7vh"){
			orderNow = false
			custA.classList.add("cust0Walking")
			custA.style.left = "-125vh"

			if(custLeftCount > 0){				
				custB.classList.add("cust0Walking")
				custB.style.left = "7vh"
				setTimeout(function(){
					custB.classList.remove("cust0Walking")
					orderNow = true
					custB.querySelector("canvas").style.display = "block"
					let time;
					for(let i in Object.keys(config.customers)){
						if (Object.keys(config.customers)[i] == config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount][0]){
							time = Object.values(config.customers)[i].time;
							curToler = Object.values(config.customers)[i].diffMax;
							custMaxPay = Object.values(config.customers)[i].pay; break;
						}
					}
					custStartTiming(custB.querySelector("canvas"), time)
					custA.classList.remove("cust0Walking")

					if(custLeftCount > 1){
						custA.querySelector("img").setAttribute("src", "images/customers/" + config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount + 1][0]+ ".png")
						let tempColor;
						if(config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount + 1].length > 2){
							let randomIndex = Math.floor(Math.random()*(config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount + 1].length-1))
							tempColor = config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount + 1][randomIndex+1]
						}
						else {
							tempColor = config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount + 1][1]
						}

						newOrder(custA.querySelector("canvas"), tempColor)
						nextOrder = tempColor

						custA.querySelector("canvas").style.display = "none"
					}
				}, 1750)
			}
		}
		else {
			orderNow = false
			custB.classList.add("cust0Walking")
			custB.style.left = "-125vh"
			if(custLeftCount > 0){
				custA.classList.add("cust0Walking")
				custA.style.left = "7vh"
				curOrder = nextOrder

				setTimeout(function(){
					orderNow = true
					custA.classList.remove("cust0Walking")
					custA.querySelector("canvas").style.display = "block"
					let time;
					for(let i in Object.keys(config.customers)){
						if (Object.keys(config.customers)[i] == config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount][0]){
							time = Object.values(config.customers)[i].time; 
							curToler = Object.values(config.customers)[i].diffMax;
							custMaxPay = Object.values(config.customers)[i].pay; break;
						}
					}
					custStartTiming(custA.querySelector("canvas"), time)
					custB.classList.remove("cust0Walking")

					if(custLeftCount > 1){
						custB.querySelector("img").setAttribute("src", "images/customers/" + config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount + 1][0]+ ".png")
						let tempColor;
						if(config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount + 1].length > 2){
							let randomIndex = Math.floor(Math.random()*(config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount + 1].length-1))
							tempColor = config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount + 1][randomIndex+1]
						}
						else {
							tempColor = config.levels[userData.level].customers[config.levels[userData.level].customers.length - custLeftCount + 1][1]
						}
						
						nextOrder = tempColor
						newOrder(custB.querySelector("canvas"), tempColor)
						custB.querySelector("canvas").style.display = "none"
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
		data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlAAAAI5CAYAAABuGQTXAAAgAElEQVR4Ae3dz+8+x30YdlJSk9R1k8oUZYq06yAwghyKJocWPfRUlJLoHHroMQ6aNP+AdMytx5BfAoVbFEUPqWUDMQwjDYzUUMHagqoahqpCVUWKVRVGpsEoEkVK4g9Bv0zTVDtv8TvUcL87u7P77D7P/ngtsJ/dZ3Z3duY1+2M+u7O7992nI0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQILCQwP0LxSMaAgQIEKgLPJQmfTz1j6X+Q6nPx94Y9o2n4J+E52nxO3c57P/LAXeH8Tv3eZ4fV+aJ4Jgnz//NNP5U6n8t9S+lXkeAwIhA3slGZjOZAAECBEYE+ipJcYx9T+pj+P6R5bcw+bspEVGpiopXrlzFsKxgxbiOwOkFVKBOvwkAIEBgokBcQepeTdpTJWlidt81e1SwonKVK1gxMVe0ciXrv0lhKlkhozu0gArUoYtX5ggQWEDg4RRHWWGKytLPLRDvUaN4LWWsexUrV67cIjxqqZ8wXypQJyx0WSZAYFCgW2GK4+QDg0uY2CrwSpoxV65ypcoVq1Y9821KQAVqU8UhMQQI3ECg75bcB26QjrOuMipV+ZZgrlS5UnXWrWFH+VaB2lFhSSoBAosK5CtNfz/F+uCiMY9H9om764wrW7HuaID+s6lfs4uKyvdT/73UR1umb98d/r003Fr3akpQX6VK26qtldSJ06MCdeLCl3UCJxPoPiX3vpT/Ndsy/d8p/l9M/bUrZ0sVa7Rlej71/8FSEV4YjytVFwJanAABAgQItArE7bknUv9M6r+V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fkLRERgQ6P7jkmfNlay+37Gf5fNAjNd+R3h08Y9LrCe68p8Y++fbJv4SIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjMEPj/AbuJb0/WAj1EAAAAAElFTkSuQmCC	
	`;
	img = new Image();
	img.src = imageSplashSmall
	imageSplashSmall = img;

	let curBlend;

	function blend(newColor){
		const ctx = splash.getContext("2d")
		paintPour.currentTime = 0
		paintPour.play()
		setTimeout(function(){
			if(currentDyes.length == 0)
				ctx.drawImage(imageSplash, 0, 0, splash.width, splash.height)
			currentDyes.push(newColor)

			let finalColor = averageColor(nameToHex(currentDyes));
			curBlend = finalColor
			fillCTX(splash, finalColor)
		}, 600)
	}

	function fillCTX(canvas, fillColor){
		const ctx = canvas.getContext("2d")
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

	    const aa = targetColor
	    const bb = replacement
	    if(aa[0] === bb[0] && aa[1] === bb[1] && aa[2] === bb[2] && aa[3] === bb[3]) return

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
		    "Magenta": "#ff00ff"
		  };
		  return colors.map(c => colorMap[c] || null);
	}

	let inputColors = ["Black", "White", "Green"];
	let hexColors = nameToHex(inputColors);

	function averageColor(hexColors) {
	    let r = 0, g = 0, b = 0;

	    hexColors.forEach(hex => {
	        hex = hex.replace("#", "");

	        // Parse the hex into RGB
	        let num = parseInt(hex, 16);
	        r += (num >> 16) & 255;
	        g += (num >> 8) & 255;
	        b += num & 255;
	    });

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

	let isServing = false

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
	let timing;

	document.addEventListener("touchend", function(){
		if(splash.getBoundingClientRect().left < window.innerHeight*0.95)
			isServing = true
		if(isTouched){
			if(isServing && currentDyes.length > 0 && orderNow){
				let perc = verifyOrder(curOrder, curBlend, curToler)
			
				if(custA.style.left == "7vh"){
					custA.querySelector("p").innerHTML = Math.round(perc*100) + "%";
					custA.querySelector("p").style.opacity = 1
				}
				else{
					custB.querySelector("p").innerHTML = Math.round(perc*100) + "%";
					custB.querySelector("p").style.opacity = 1
				}

				setTimeout(function(){
					custA.querySelector("p").style.opacity = 0
					custB.querySelector("p").style.opacity = 0
				}, 490)
				if(perc){
					if(timing != null) clearInterval(timing)
					curIncome += Math.round(perc * custMaxPay);
					paymentInfo.innerHTML = "+$" + Math.round(perc * custMaxPay) + " Revenue"
					paymentInfo.style.color = "#4f4"
					setTimeout(function(){
						if(custA.style.left == "7vh"){
							custA.querySelector("canvas").style.display = "none"
						}
						else{
							custB.querySelector("canvas").style.display = "none"
						}

						swapCust()
						const income = salaryStat.querySelector("p")
						paySound.play()
						income.innerHTML = "$" + curIncome;
						income.style.color = "#8f0"
						income.style.transform = "translate(0%, -50%) scale(1.8)"
						income.style.fontWeight = 900
						setTimeout(function(){
							income.style.color = "white"
							income.style.transform = "translate(0%, -50%)"
							income.style.fontWeight = 700
						}, 170)
						angryFlag = 0
					},500)
				}
				else {
					setTimeout(function(){
						oldSecs = curSecs
					}, 500)
				}

				splash.getContext("2d").clearRect(0, 0, splash.width, splash.height)
				currentDyes = [];
				setTimeout(function(){
					splash.style.transition = "none";
					splash.style.transform = "translate(-50%, -50%)"
					splash.style.transition = "transform 0.3s";
				}, 300)
			}
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
		isServing = false
	})

function newOrder(canvas, color){

	const ctx = canvas.getContext("2d");
	const center = canvas.width/2

	let topData;

	ctx.clearRect(0,0,canvas.width,canvas.height)
	ctx.beginPath()
	ctx.arc(center, center, Math.round(canvas.width*0.4), 0, 2 * Math.PI);
	ctx.fillStyle = "white";
	ctx.fill();

	const toScale = 0.6
	ctx.drawImage(imageSplashSmall, canvas.width*(1-toScale)/2, canvas.height*(1-toScale)/2, canvas.width*toScale, canvas.height*toScale)

	fillCTX(canvas, color)

	topData = new Image()
	topData.src = canvas.toDataURL()
	canvas.topData = topData

	ctx.beginPath()
	ctx.arc(center, center, Math.round(canvas.width*0.48), 0, 2 * Math.PI);
	ctx.fillStyle = "black";
	ctx.fill();
}

let angryFlag = 0
function angry(level){
	let elem;
	console.log()
	if(custA.getBoundingClientRect().left > 0) elem = custA 
	else elem = custB

	function temp(){
		elem.querySelector("h3").style.transform = "translate(-50%, -50%) rotate(-15deg) scale(1.5)";
		setTimeout(function(){
			elem.querySelector("h3").style.transform = "translate(-50%, -50%) rotate(-15deg)";
		}, 250)
	}

	if(level == 1 && angryFlag < 1){
		elem.querySelector("h3").innerHTML = "!"
		temp()
		angryFlag = 1
	}
	else if (level == 2 && angryFlag < 2){
		elem.querySelector("h3").innerHTML = "!!"
		temp()
		angryFlag = 2
	}
	else if (level == 3 && angryFlag < 3){
		elem.querySelector("h3").innerHTML = "!!!"
		temp()
		angryFlag = 3
		setTimeout(function(){
			elem.querySelector("h3").innerHTML = ""
			angryFlag = 0
		},1500)
	}
}

let curSecs;
let targetSecs;
let secDecre = 0.08
let oldSecs;

function custStartTiming(canvas, secs){
	curSecs = targetSecs = secs
	oldSecs = targetSecs * 2
	const ctx = canvas.getContext("2d");
	const center = canvas.width/2

	timing = setInterval(function(){
		if(curSecs <= 0){
			clearInterval(timing)
			paymentInfo.style.color = "red"
			paymentInfo.innerHTML = "-$3 Wage"
			swapCust()
		}

		if(curSecs <= (oldSecs - targetSecs*0.4))
			secDecre = 0.05
		else
			secDecre = 0.5

		curSecs -= secDecre
		if(curSecs >= 0.4*secs)
			ctx.fillStyle = "#0c3"
		else if(curSecs >= 0.2*secs){
			angry(1)
			ctx.fillStyle = "#db0"
		}
		else if(curSecs >= 0){
			angry(2)
			ctx.fillStyle = "#d00"
		}
		else{
			angry(3)	
		}

		ctx.beginPath()
		ctx.arc(center, center, Math.round(canvas.width*0.44), 0, 2 * Math.PI);
		ctx.fill();

		ctx.beginPath()
		ctx.moveTo(center,center)
		let perc = Math.abs(targetSecs - curSecs)/targetSecs
		ctx.arc(center, center, Math.round(canvas.width*0.44), 1.5 * Math.PI, (1.5 + (perc*2)) * Math.PI);
		ctx.closePath()
		ctx.fillStyle = "white"
		ctx.fill()

		ctx.drawImage(canvas.topData,0,0)
	}, 50)
}
function verifyOrder(color1, color2, tolerance){
	color1 = color1.slice(1)
	color1 = [parseInt(color1[0] + color1[1], 16), parseInt(color1[2] + color1[3], 16), parseInt(color1[4] + color1[5], 16)]
	color2 = color2.slice(1)
	color2 = [parseInt(color2[0] + color2[1], 16), parseInt(color2[2] + color2[3], 16), parseInt(color2[4] + color2[5], 16)]
	
	rDiff = Math.abs(color1[0] - color2[0])
	gDiff = Math.abs(color1[1] - color2[1])
	bDiff = Math.abs(color1[2] - color2[2])

	let diff = (rDiff + gDiff + bDiff)/3
	let perc = diff/tolerance
	perc = 1 - (Math.pow(perc * 4, 2)/13.5)

	if (perc <= 0) return 0
	else return perc
}
