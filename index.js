import{a as l,i as a}from"./assets/vendor-BO1i2NM4.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const e of s)if(e.type==="childList")for(const n of e.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function r(s){const e={};return s.integrity&&(e.integrity=s.integrity),s.referrerPolicy&&(e.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?e.credentials="include":s.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(s){if(s.ep)return;s.ep=!0;const e=r(s);fetch(s.href,e)}})();const u={BASE_URL:"https://sound-wave.b.goit.study/api",ENDPOINTS:{genres:()=>"/genres",artists:()=>"/artists",artistById:t=>`/artists/${t}`,artistByIdWithAlbums:t=>`/artists/${t}/albums`,feedbacks:()=>"/feedbacks"},PER_PAGE:8},{BASE_URL:p,ENDPOINTS:d,PER_PAGE:c}=u;l.defaults.baseURL=p;const f=async({page:t=1,genre:i,name:r,sortName:o}={})=>{const{data:s}=await l.get(d.artists(),{params:{page:t,limit:c,...!!i&&{genre:i},...!!r&&{name:r},...!!o&&{sortName:o}}}),e=s.totalArtists||0,n=t>=Math.ceil(e/c);return{data:s,isLastPage:n}},m={artistsList:document.querySelector(".artists-list")},g=(t="")=>CSS.supports("-webkit-line-clamp","2")&&CSS.supports("display","-webkit-box")?t:t.length>80?t.slice(0,80).trim()+"...":t;function h(t){const i=t.map(r=>{const o=r.genres.map(e=>`<li class="genres-list-item">${e}</li>`).join(""),s=g(r.strBiographyEN);return`<li class="artists-list-item">
                <img class="artist-image"
                  src="${r.strArtistThumb}" 
                  alt="${r.strArtist}" />
                <ul class="genres-list">
                    ${o}
                </ul>
                <h3 class="artist-name">${r.strArtist}</h3>
                <p class="artist-descr">${s}</p>
                <button type="button" class="artist-btn-learn-more">
                    <span>Learn More</span>
                    <span>
                        <svg class="artist-learn-svg" width="14" height="14">
                            <use href="/img/sprite.svg#next-icon"></use>
                        </svg>
                    </span>
                </button>
            </li>`}).join("");m.artistsList.insertAdjacentHTML("beforeend",i)}async function y(){try{const{data:t}=await f();console.log(t),h(t.artists)}catch(t){t.response?a.error({message:`Error ${t.response.status}: ${t.response.data}`}):a.error({message:`Error: ${t.message}`})}}document.addEventListener("DOMContentLoaded",y());
//# sourceMappingURL=index.js.map
