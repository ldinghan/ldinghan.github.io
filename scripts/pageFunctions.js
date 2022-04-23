panButton = document.querySelector("#panToTop");

window.onscroll = function() {scrollFunction()}

const scrollFunction = () => {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		panButton.style.display = "block";
	} else {
		panButton.style.display = "none";
	}
}
