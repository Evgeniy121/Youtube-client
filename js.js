/* eslint-disable camelcase */
/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
let inquiry;
let masdiv = [];
const mass = [];
let WIDTH;
let COUNTONWINDOW = 1;
let countfind = 1;
let ii;
let first = false;
window.onload = function () {
  goToCircle = function (n) {
    if (ii >= 0) {
      content[ii].classList.remove('active');
      circle[icircle].classList.remove('active_circle');
    }
    // var circle=document.getElementById("circle");
    // circle.innerHTML=ii+1;
    n -= ii % 4;
    ii += n;
    console.log(ii);
    icircle = n + icircle;
    console.log(circle);
    if (icircle === 4) {
      icircle = 0; countecrCircle++;
      for (let i = 0; i < circle.length; i++) {
        circle[i].innerHTML = 4 * countecrCircle + i;
      }
    }
    if (ii >= content.length - 3) {
      countfind++;
      findAllVideo(countfind * 15, (countfind - 1) * 15);
      console.log('ищем');
    }
    content[ii].classList.add('active');
    circle[icircle].classList.add('active_circle');

  };
  search1.onclick = function () {
    ii = -1;
    const element = document.getElementById('boxs');
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    findAllVideo(15, 0);
    WIDTH = (window.innerWidth);
    COUNTONWINDOW = Math.floor(WIDTH / 380);
    if (COUNTONWINDOW > 4)COUNTONWINDOW = 4;
  };
  nextSlider.onclick = function () { go(1); };
  prevSlider.onclick = function () { prev(); };
  function findAllVideo(n, start) {
    inquiry = document.getElementById('inquiry').value;
    fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyBOvoV1n9qqVgJFVsUBGI_RDeZ-30bDEIM&type=video&part=snippet&maxResults=${n}&q=${inquiry}`)
      .then(response => response.json())
      .then((data) => { infoVideo(informationAboutVideos(data, start)); });
  }

  function informationAboutVideos(data, start) {
    let videosId = '';
    for (let i = start; i < data.items.length; i++) {
      videosId += `${data.items[i].id.videoId},`;
    }
    videosId = videosId.slice(0, -1);
    return videosId;
  }

  function infoVideo(data) {
    const url = `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=${data}&part=snippet,statistics&maxResults=15`;
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        display(data);
      });
  }
  function display(data) {
    masdiv = [];
    for (let i = 0; i < data.items.length; i++) {
      masdiv.push(createBlock(data.items[i].snippet.title, data.items[i].snippet.publishedAt, data.items[i].snippet.channelTitle, data.items[i].statistics.viewCount, data.items[i].statistics.likeCount));
    }
    for (let j = 0; j < Math.floor(masdiv.length / COUNTONWINDOW); j++) {
      const divv = document.createElement('div');
      divv.className = 'slide';

      for (let i = 0; i < COUNTONWINDOW; i++) {
        divv.appendChild(masdiv[i + j * COUNTONWINDOW]);
        console.log(masdiv[i + j * COUNTONWINDOW]);
      }

      mass.push(divv);
    }
    console.log(mass);
    const boxs = document.getElementById('boxs');
    for (let i = 0; i < Math.floor(masdiv.length / COUNTONWINDOW); i++) {
      boxs.insertBefore(mass.pop(), null);
    }
    content = document.querySelectorAll('.slide');
    console.log(content);
    circle = document.querySelectorAll('.circle');
    if (!first) { go(1); first = true; }
    for (let i = 0; i < circle.length; i++) {
      circle[i].innerHTML = 4 * countecrCircle + i;
    }
    const control = document.getElementById('control');
    control.style.display = 'flex';
  }
  let countecrCircle = 0;
  let icircle = -1;
  function go(n) {
    if (ii >= 0) {
      content[ii].classList.remove('active');
      circle[icircle].classList.remove('active_circle');
    }
    // var circle=document.getElementById("circle");
    // circle.innerHTML=ii+1;
    ii += n;
    console.log(ii);
    icircle = n + icircle;
    console.log(circle);
    if (icircle === 4) {
      icircle = 0; countecrCircle++;
      for (let i = 0; i < circle.length; i++) {
        circle[i].innerHTML = 4 * countecrCircle + i;
      }
    }
    if (ii >= content.length - 1) {
      countfind++;
      findAllVideo(countfind * 15, (countfind - 1) * 15);
      console.log('ищем');
    }
    content[ii].classList.add('active');
    circle[icircle].classList.add('active_circle');
  }
  function prev() {
    content[ii].classList.remove('active');
    circle[icircle].classList.remove('active_circle');
    if (ii - 1 >= 0) {
      --ii;
      --icircle;
      if (icircle < 0) {
        countecrCircle--; icircle = 3;
        for (let i = 0; i < circle.length; i++) {
          circle[i].innerHTML = 4 * countecrCircle + i;
        }
      }
      // var circle=document.getElementById("circle");
      // circle.innerHTML=ii;
    }
    circle[icircle].classList.add('active_circle');
    content[ii].classList.add('active');
  }
  function createBlock(description, publishedAt, name, watch, like) {
    const div = document.createElement('div');
    div.className = 'block';
    const divh1 = document.createElement('div');
    divh1.id = 'title';
    const h1 = document.createElement('h1');
    h1.innerHTML = description;
    divh1.appendChild(h1);
    div.appendChild(divh1);
    const p_name = document.createElement('p');
    p_name.id = 'name';
    p_name.innerHTML = `<i class="fa fa-male"> ${name}`;
    div.appendChild(p_name);
    const p_celendar = document.createElement('p');
    p_celendar.id = 'calendar';
    p_celendar.innerHTML = `<i class="fa fa-calendar"> ${publishedAt.slice(0, 10)}`;
    div.appendChild(p_celendar);
    const p_watch = document.createElement('p');
    p_watch.id = 'watch';
    p_watch.innerHTML = `<i class="fa fa-eye"> ${watch}`;
    div.appendChild(p_watch);
    const p_like = document.createElement('p');
    p_like.id = 'like';
    p_like.innerHTML = `${'<i class="fa fa-heart" ></i>' + '  '}${like}`;
    div.appendChild(p_like);
    return div;
  }
};
