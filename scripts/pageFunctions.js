const panButton = document.querySelector("#panToTop");
const popScoreDisplay = document.querySelector("#popScoreDisplay");
const currentPage = document.querySelector("#currentPage");


let scrollScore = 0;
let popScore = 0;
let popped = false;





window.onscroll = () => {
	scrollFunction();
	scrollScore++;
	if (scrollScore % 20 === 0) {
		bubbleSpawn()
	}
}

window.onload = () => {
	if (localStorage.getItem('popScore') !== null) {
		popScore = localStorage.getItem('popScore');
		popScoreDisplay.style.display = 'block';
		popScoreDisplay.textContent = `Bubbles Popped: ${popScore}`
	}

	if (sessionStorage.getItem('sessionPopped') !== null) {
		popped = true;
	}


	setInterval(() => {
		bubbleSpawn()
	}, 10000)

	if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        setTimeout(() => {
        	nextPageBtn.style.display = "flex";
        }, 4000)
    }
}


const scrollFunction = () => {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		panButton.style.display = "block";
	} else {
		panButton.style.display = "none";
	}

    if (window.scrollY + window.innerHeight >= document.body.scrollHeight -1) {
        nextPageBtn.style.display = "flex";
    }
}


const bubbleSpawn = () => {
	const newBubble = document.createElement("div");
	let bubbleSize = `${Math.floor(Math.random() * 5) * 20 + 20}px`
	let bubbleColor = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},0.2)`
	
	newBubble.style.position = 'fixed';
	newBubble.style.height = bubbleSize;
	newBubble.style.width = bubbleSize;
	newBubble.style.background = bubbleColor;
	newBubble.style.borderRadius = '50%';
	newBubble.style.top = `${Math.floor(Math.random() * 100)}vw`;
	newBubble.style.left = `${Math.floor(Math.random() * 100)}vw`;
	newBubble.addEventListener('click', () => {
		popBubble(newBubble)
		if (!popped) {
			popped = true;
			alert('Keep exploring to pop more bubbles! More bubbles will spawn as you explore the page! (Your progress will still be saved even after you exit the browser)')
			popScoreDisplay.style.display = 'block';
			popScoreDisplay.textContent = `Bubbles Popped: ${popScore}`			
		}
	});
	document.body.appendChild(newBubble);
}

const popBubble = (bubble) => {
	popScore++;
	bubble.remove()
	popScoreDisplay.textContent = `Bubbles Popped: ${popScore}`
	localStorage.setItem('popScore', popScore);
	sessionStorage.setItem('sessionPopped', true);
}




const nextPageFunction = () => {
	window.location.href = currentPage.nextElementSibling.childNodes[0].getAttribute("href");
}

if (currentPage.textContent !== "CONTACT") {
	const nextPageBtn = document.createElement("div");
	nextPageBtn.setAttribute("id", "nextPageBtn");

	nextPageBtn.innerText = ">"; 

	nextPageBtn.onclick = nextPageFunction;

	document.body.appendChild(nextPageBtn)
}

