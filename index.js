import{a as l,i as n}from"./assets/vendor-BO1i2NM4.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const o of e.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function r(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(t){if(t.ep)return;t.ep=!0;const e=r(t);fetch(t.href,e)}})();const u={BASE_URL:"https://sound-wave.b.goit.study/api",ENDPOINTS:{genres:()=>"/genres",artists:()=>"/artists",artistById:s=>`/artists/${s}`,artistByIdWithAlbums:s=>`/artists/${s}/albums`,feedbacks:()=>"/feedbacks"},PER_PAGE:8},{BASE_URL:p,ENDPOINTS:d,PER_PAGE:c}=u;l.defaults.baseURL=p;const f=async({page:s=1,genre:i,name:r,sortName:a}={})=>{const{data:t}=await l.get(d.artists(),{params:{page:s,limit:c,...!!i&&{genre:i},...!!r&&{name:r},...!!a&&{sortName:a}}}),e=t.totalArtists||0,o=s>=Math.ceil(e/c);return{data:t,isLastPage:o}},m={artistsList:document.querySelector(".artists-list")},g=(s="")=>CSS.supports("-webkit-line-clamp","2")&&CSS.supports("display","-webkit-box")?s:s.length>80?s.slice(0,80).trim()+"...":s;function h(s){const i=s.map(r=>{const a=r.genres.map(e=>`<li class="genres-list-item">${e}</li>`).join(""),t=g(r.strBiographyEN);return`<li class="artists-list-item">
                <img class="artist-image"
                  src="${r.strArtistThumb}" 
                  alt="${r.strArtist}" />
                <ul class="genres-list">
                    ${a}
                </ul>
                <h3 class="artist-name">${r.strArtist}</h3>
                <p class="artist-descr">${t}</p>
                <button type="button" class="artist-btn-learn-more">
                    <span>Learn More</span>
                    <span>
                        <svg class="artist-learn-svg" width="14" height="14">
                            <use href="/img/sprite.svg#next-icon"></use>
                        </svg>
                    </span>
                </button>
            </li>`}).join("");m.artistsList.insertAdjacentHTML("beforeend",i)}async function y(){try{const{data:s}=await f();h(s.artists)}catch(s){s.response?n.error({message:`Error ${s.response.status}: ${s.response.data}`}):n.error({message:`Error: ${s.message}`})}}y();
//# sourceMappingURL=index.js.map
