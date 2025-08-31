import{a as p,i as c}from"./assets/vendor-BO1i2NM4.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const n of e.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function r(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(t){if(t.ep)return;t.ep=!0;const e=r(t);fetch(t.href,e)}})();const u={BASE_URL:"https://sound-wave.b.goit.study/api",ENDPOINTS:{genres:()=>"/genres",artists:()=>"/artists",artistById:s=>`/artists/${s}`,artistByIdWithAlbums:s=>`/artists/${s}/albums`,feedbacks:()=>"/feedbacks"},PER_PAGE:8},{BASE_URL:d,ENDPOINTS:f,PER_PAGE:l}=u;p.defaults.baseURL=d;const m=async({page:s=1,genre:i,name:r,sortName:o}={})=>{const{data:t}=await p.get(f.artists(),{params:{page:s,limit:l,...!!i&&{genre:i},...!!r&&{name:r},...!!o&&{sortName:o}}}),e=t.totalArtists||0,n=s>=Math.ceil(e/l);return{data:t,isLastPage:n}},g={artistsList:document.querySelector(".artists-list")},h=(s="")=>CSS.supports("-webkit-line-clamp","2")&&CSS.supports("display","-webkit-box")?s:s.length>80?s.slice(0,80).trim()+"...":s,y="/project-Dev4L1fe/assets/sprite-DpWu6vF8.svg";function L(s){const i=s.map(r=>{const o=r.genres.map(e=>`<li class="genres-list-item">${e}</li>`).join(""),t=h(r.strBiographyEN);return`<li class="artists-list-item" data-id="${r._id}">
                <img class="artist-image"
                  src="${r.strArtistThumb}" 
                  alt="${r.strArtist}" />
                <ul class="genres-list">
                    ${o}
                </ul>
                <h3 class="artist-name">${r.strArtist}</h3>
                <p class="artist-descr">${t}</p>
                <button type="button" class="artist-btn-learn-more">
                    <span>Learn More</span>
                    <span>
                        <svg class="artist-learn-svg" width="14" height="14">
                          <use href="${y}#next-icon"></use>
                        </svg>
                    </span>
                </button>
            </li>`}).join("");g.artistsList.insertAdjacentHTML("beforeend",i)}async function b(){try{const{data:s}=await m();L(s.artists)}catch(s){s.response?c.error({message:`Error ${s.response.status}: ${s.response.data}`}):c.error({message:`Error: ${s.message}`})}}const a=document.getElementById("toTop");window.addEventListener("scroll",()=>{window.scrollY>600?a.classList.add("show"):a.classList.remove("show")});a.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});b();
//# sourceMappingURL=index.js.map
