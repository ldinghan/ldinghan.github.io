const introTexts = document.querySelectorAll(".intro_text");
const currentIntroText = document.querySelector("#currentIntroText");


const displayIntro = () => {
	currentIntroText.classList.add('loading');
	const type = (i, t, ie) => {
	    input = ie.innerHTML;
	    currentIntroText.innerHTML += input.charAt(i);
	    setTimeout(function(){
	        ((i < input.length - 1) ? type(i+1, t, ie) : false);
	    }, t);
	}

	const showNext = (text) => {
		return new Promise((resolve, reject) => {
		setTimeout(() => {
			currentIntroText.classList.remove('loading');
			currentIntroText.innerHTML = "";
			type(0,100,text)
			resolve();
		}, 4000)

		})
	}
	
	const transitionPage = () => {
		setTimeout(() => {
			currentIntroText.innerHTML = "";
			currentIntroText.classList.add('transition');
			displayPage()		
		}, 4000)

	}
	
	const displayPage = () => {
		setTimeout(() => {
			window.location.href="home.html";
		}, 2000)
	}


	showNext(introTexts[0])
		.then(() => showNext(introTexts[1]))
		.then(() => transitionPage())
}

displayIntro()




