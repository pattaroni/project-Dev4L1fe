import{a as l,i as n}from"./assets/vendor-BO1i2NM4.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(t){if(t.ep)return;t.ep=!0;const e=r(t);fetch(t.href,e)}})();const p={BASE_URL:"https://sound-wave.b.goit.study/api",ENDPOINTS:{genres:()=>"/genres",artists:()=>"/artists",artistById:s=>`/artists/${s}`,artistByIdWithAlbums:s=>`/artists/${s}/albums`,feedbacks:()=>"/feedbacks"},PER_PAGE:8},{BASE_URL:u,ENDPOINTS:d,PER_PAGE:c}=p;l.defaults.baseURL=u;const f=async({page:s=1,genre:i,name:r,sortName:o}={})=>{const{data:t}=await l.get(d.artists(),{params:{page:s,limit:c,...!!i&&{genre:i},...!!r&&{name:r},...!!o&&{sortName:o}}}),e=t.totalArtists||0,a=s>=Math.ceil(e/c);return{data:t,isLastPage:a}},m={artistsList:document.querySelector(".artists-list")},g=(s="")=>CSS.supports("-webkit-line-clamp","2")&&CSS.supports("display","-webkit-box")?s:s.length>80?s.slice(0,80).trim()+"...":s,h="/project-Dev4L1fe/assets/sprite-BPrKXWfu.svg";function y(s){const i=s.map(r=>{const o=r.genres.map(e=>`<li class="genres-list-item">${e}</li>`).join(""),t=g(r.strBiographyEN);return`<li class="artists-list-item">
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
                          <use href="${h}#next-icon"></use>
                        </svg>
                    </span>
                </button>
            </li>`}).join("");m.artistsList.insertAdjacentHTML("beforeend",i)}async function b(){try{const{data:s}=await f();y(s.artists)}catch(s){s.response?n.error({message:`Error ${s.response.status}: ${s.response.data}`}):n.error({message:`Error: ${s.message}`})}}b();
//# sourceMappingURL=index.js.map
