export function getUserGestureIfNeeded() {
    if (isIOS()) {
        const userGestureButton = document.getElementById('user-gesture-button')
        userGestureButton.style.display = 'block';
        return new Promise((resolve, reject) => {
            userGestureButton.addEventListener('click', async () => {
                userGestureButton.remove();
                resolve("User gesture detected.");
            });
        });
    }
    return Promise.resolve("No gesture needed.");
}


function isIOS() {
	return /iP(ad|hone|od)/.test(navigator.userAgent) ||
		(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

