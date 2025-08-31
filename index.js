import{a as p,i as l}from"./assets/vendor-BO1i2NM4.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();const f={BASE_URL:"https://sound-wave.b.goit.study/api",ENDPOINTS:{genres:()=>"/genres",artists:()=>"/artists",artistById:s=>`/artists/${s}`,artistByIdWithAlbums:s=>`/artists/${s}/albums`,feedbacks:()=>"/feedbacks"},PER_PAGE:8},{BASE_URL:m,ENDPOINTS:h,PER_PAGE:d}=f;p.defaults.baseURL=m;const g=async({page:s=1,genre:e,name:i,sortName:o}={})=>{const{data:t}=await p.get(h.artists(),{params:{page:s,limit:d,...!!e&&{genre:e},...!!i&&{name:i},...!!o&&{sortName:o}}}),r=t.totalArtists||0,a=s>=Math.ceil(r/d);return{data:t,isLastPage:a}},u={artistsList:document.querySelector(".artists-list"),loader:document.querySelector(".loader")},y=(s="")=>CSS.supports("-webkit-line-clamp","2")&&CSS.supports("display","-webkit-box")?s:s.length>80?s.slice(0,80).trim()+"...":s,n={create(s){return s?(s.insertAdjacentHTML("beforeend",'<span class="loader hidden"></span>'),s.querySelector(".loader")):void 0},show(s){s?.classList.remove("hidden")},hide(s){s?.classList.add("hidden")}},L="/project-Dev4L1fe/assets/sprite-DpWu6vF8.svg";function b(s){const e=s.map(i=>{const o=i.genres.map(r=>`<li class="genres-list-item">${r}</li>`).join(""),t=y(i.strBiographyEN);return`<li class="artists-list-item" data-id="${i._id}">
                <img class="artist-image"
                  src="${i.strArtistThumb}" 
                  alt="${i.strArtist}" />
                <ul class="genres-list">
                    ${o}
                </ul>
                <h3 class="artist-name">${i.strArtist}</h3>
                <p class="artist-descr">${t}</p>
                <button type="button" class="artist-btn-learn-more">
                    <span>Learn More</span>
                    <span>
                        <svg class="artist-learn-svg" width="14" height="14">
                          <use href="${L}#next-icon"></use>
                        </svg>
                    </span>
                </button>
            </li>`}).join("");u.artistsList.insertAdjacentHTML("beforeend",e)}async function w(){let s;try{s=n.create(u.artistsList),n.show(s);const{data:e}=await g();n.show(s),b(e.artists)}catch(e){e.response?l.error({message:`Error ${e.response.status}: ${e.response.data}`}):l.error({message:`Error: ${e.message}`})}finally{n.hide(s)}}const c=document.getElementById("toTop");window.addEventListener("scroll",()=>{window.scrollY>600?c.classList.add("show"):c.classList.remove("show")});c.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});w();
//# sourceMappingURL=index.js.map
