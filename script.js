document.addEventListener("DOMContentLoaded", () => {
    const chicken = document.getElementById("chicken");
    const buckets = document.querySelectorAll(".bucket");
    const resultPopup = document.getElementById("resultPopup");
    const resultMessage = document.getElementById("resultMessage");
    const playAgainBtn = document.getElementById("playAgainBtn");
    const scoreDisplay = document.getElementById("scoreDisplay");
    const playGameBtn = document.getElementById("playGameBtn");
    const footerText = document.getElementById("footerText");
    const loadingSpinner = document.getElementById("loadingSpinner");
    let correctBucketIndex = 0;
    let score = 0;

    function hideLoadingSpinner() {
        loadingSpinner.style.display = "none";
    }

    window.onload = () => {
        hideLoadingSpinner();
    };

    function startGame() {
        playGameBtn.style.display = "none"; // Hide Play Game button
        footerText.textContent = "The Cards are shuffling";

        chicken.style.opacity = "1";
        correctBucketIndex = Math.floor(Math.random() * 3);
        const targetBucket = buckets[correctBucketIndex];
        const targetBucketRect = targetBucket.getBoundingClientRect();

        chicken.style.left = `${targetBucketRect.left + (targetBucketRect.width / 2) - (chicken.offsetWidth / 2)}px`;
        chicken.style.top = `${targetBucketRect.top - chicken.offsetHeight}px`;

        setTimeout(() => {
            chicken.style.top = `${targetBucketRect.top}px`;
            chicken.style.opacity = "0";

            setTimeout(shuffleBuckets, 1000);
        }, 1000);
    }

    function shuffleBuckets() {
        const numShuffles = 5;
        let positions = [0, 1, 2];

        for (let i = 0; i < numShuffles; i++) {
            setTimeout(() => {
                positions = shuffleArray(positions);

                buckets.forEach((bucket, index) => {
                    const newIndex = positions[index];
                    bucket.style.transform = `translateX(${(newIndex - index) * 100}px)`;
                });
            }, i * 500);
        }

        setTimeout(() => {
            buckets.forEach(bucket => bucket.style.transform = "");
            enableClick();
        }, numShuffles * 500 + 500);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function enableClick() {
        buckets.forEach((bucket, index) => {
            bucket.removeEventListener("click", handleBucketClick);
            bucket.addEventListener("click", handleBucketClick);

            function handleBucketClick() {
                checkChoice(index);
            }
        });
    }

    function checkChoice(index) {
        if (index === correctBucketIndex) {
            resultMessage.textContent = "Congrats! You found the ring!";
            updateScore();
        } else {
            resultMessage.innerHTML = `
                Wrong choice! Try again.<br>
                <a href="https://play.rhym.io/" target="_blank" class="buy-now-btn">Buy Now</a>
            `;
        }

        showPopup();
    }

    function updateScore() {
        score += 10;
        scoreDisplay.textContent = `Score: ${score}`;
    }

    function showPopup() {
        resultPopup.style.display = "block";
    }

    function hidePopup() {
        resultPopup.style.display = "none";
    }

    playAgainBtn.addEventListener("click", () => {
        hidePopup();
        startGame();
    });

    playGameBtn.addEventListener("click", startGame);
});

window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 3000); //loader time//
});
