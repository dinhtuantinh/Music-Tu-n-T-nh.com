const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicThumbnail = document.querySelector(".music-thumb");
const musicImage = document.querySelector(".music-thumb img");
const playRepeat = document.querySelector(".play-repeat");

let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
// const musics = ["holo.mp3", "summer.mp3", "spark.mp3", "home.mp3"];
const musics = [{
        id: 1,
        title: "Em luôn trong tim anh",
        file: "Em luôn trong tim anh.mp3",
        image: "https://hinhgaixinh.com/wp-content/uploads/2021/07/20210521-gai-xinh-goi-cam-1.jpg",
    },
    {
        id: 2,
        title: "Em say rồi",
        file: "Em say rồi.mp3",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/tong-hop-anh-gai-xinh-dep-nhat-tuan-qua-4.jpg",
    },
    {
        id: 3,
        title: "Người lạ thoáng qua",
        file: "Người lạ thoáng qua.mp3",
        image: "https://gamek.mediacdn.vn/2019/9/3/photo-1-15674798154701613127382.jpg",
    },
    {
        id: 4,
        title: "Chạy về nơi phía anh",
        file: "Chạy về nơi phía anh.mp3",
        image: "https://tackexinh.com/wp-content/uploads/2021/03/hinh-nen-gai-xinh-2k-cho-pc.jpg",
    },
    {
        id: 5,
        title: "Chạy về khóc với anh",
        file: "Chạy về khóc với anh.mp3",
        image: "https://3.bp.blogspot.com/-yYBOunJB350/XON-C2a8PEI/AAAAAAAANvg/iKZg6RCAUREoYv-cBSc0WKXHVwmCc4FogCLcBGAs/s1600/Anh-Nen-Gai-Xinh-4K_Ongtv.Net-%2B0.jpg",
    },
    {
        id: 6,
        title: "Anh đã hiểu tình em",
        file: "Anh đã hiểu tình em.mp3",
        image: "https://allimages.sgp1.digitaloceanspaces.com/excelcrackercom/2019/11/hinh-nen-girl-xinh-4k-26.jpg",
    },
    {
        id: 7,
        title: "Ít nhưng dài lâu",
        file: "Ít nhưng dài lâu.mp3",
        image: "https://bienthuy.com/bienthuy-img/2020/02/hinh-nen-girl-xinh-4k-cho-laptop17-scaled.jpg",
    },
    {
        id: 8,
        title: "Chỉ bằng cái gật đầu",
        file: "Chỉ bằng cái gật đầu.mp3",
        image: "https://elmaliturta.com/wp-content/uploads/2021/07/hinh-gai-xinh-deo-mat-kinh-toc-dai.jpg",
    },
    {
        id: 9,
        title: "Trả lại anh",
        file: "Trả lại anh.mp3",
        image: "https://hinhgaixinh.com/wp-content/uploads/2021/07/20210627-vo-thuy-hang-6-835x1254.jpg",
    },
    {
        id: 10,
        title: "Bí mật tam giác vàng",
        file: "Bí mật tam giác vàng.mp3",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Yw7SeJo3zSfNXrO5HUBD2xwIUERsINBpXQ&usqp=CAU",
    },
];
/**
 * Music
 * id: 1
 * title: Holo
 * file: holo.mp3 
 * image: unsplash
 */
let timer;
let repeatCount = 0;
playRepeat.addEventListener("click", function() {
    if (isRepeat) {
        isRepeat = false;
        playRepeat.removeAttribute("style");
    } else {
        isRepeat = true;
        playRepeat.style.color = "#ffb86c";
    }
});
nextBtn.addEventListener("click", function() {
    changeSong(1);
});
prevBtn.addEventListener("click", function() {
    changeSong(-1);
});
song.addEventListener("ended", handleEndedSong);

function handleEndedSong() {
    repeatCount++;
    if (isRepeat && repeatCount === 1) {
        // handle repeat song
        isPlaying = true;
        playPause();
    } else {
        changeSong(1);
    }
}

function changeSong(dir) {
    if (dir === 1) {
        // next song
        indexSong++;
        if (indexSong >= musics.length) {
            indexSong = 0;
        }
        isPlaying = true;
    } else if (dir === -1) {
        // prev song
        indexSong--;
        if (indexSong < 0) {
            indexSong = musics.length - 1;
        }
        isPlaying = true;
    }
    init(indexSong);
    // song.setAttribute("src", `./music/${musics[indexSong].file}`);
    playPause();
}
playBtn.addEventListener("click", playPause);

function playPause() {
    if (isPlaying) {
        musicThumbnail.classList.add("is-playing");
        song.play();
        playBtn.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
        isPlaying = false;
        timer = setInterval(displayTimer, 500);
    } else {
        musicThumbnail.classList.remove("is-playing");
        song.pause();
        playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
        isPlaying = true;
        clearInterval(timer);
    }
}

function displayTimer() {
    const { duration, currentTime } = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remainingTime.textContent = formatTimer(currentTime);
    if (!duration) {
        durationTime.textContent = "00:00";
    } else {
        durationTime.textContent = formatTimer(duration);
    }
}

function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}
rangeBar.addEventListener("change", handleChangeBar);

function handleChangeBar() {
    song.currentTime = rangeBar.value;
}

function init(indexSong) {
    song.setAttribute("src", `./music/${musics[indexSong].file}`);
    musicImage.setAttribute("src", musics[indexSong].image);
    musicName.textContent = musics[indexSong].title;
}
displayTimer();
init(indexSong);