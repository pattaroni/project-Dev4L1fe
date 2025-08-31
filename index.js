import{a as m,S as E,i as b}from"./assets/vendor-F9iMMrrb.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(s){if(s.ep)return;s.ep=!0;const n=r(s);fetch(s.href,n)}})();const k={BASE_URL:"https://sound-wave.b.goit.study/api",ENDPOINTS:{genres:()=>"/genres",artists:()=>"/artists",artistById:e=>`/artists/${e}`,artistByIdWithAlbums:e=>`/artists/${e}/albums`,feedbacks:()=>"/feedbacks"},PER_PAGE:8},{BASE_URL:A,ENDPOINTS:y,PER_PAGE:g}=k;m.defaults.baseURL=A;const $=async({page:e=1,genre:t,name:r,sortName:a}={})=>{const{data:s}=await m.get(y.artists(),{params:{page:e,limit:g,...!!t&&{genre:t},...!!r&&{name:r},...!!a&&{sortName:a}}}),n=s.totalArtists||0,i=e>=Math.ceil(n/g);return{data:s,isLastPage:i}},q=async(e=1,t=10)=>{const{data:r}=await m.get(y.feedbacks(),{params:{page:e,limit:t}}),a=r.data||[],s=r.total||0,n=e>=Math.ceil(s/t);return{feedbacks:a,isLastPage:n}},L={artistsList:document.querySelector(".artists-list"),containerEL:document.querySelector(".container"),loader:document.querySelector(".loader")},M=(e="")=>CSS.supports("-webkit-line-clamp","2")&&CSS.supports("display","-webkit-box")?e:e.length>80?e.slice(0,80).trim()+"...":e,o={create(e){return e?(e.insertAdjacentHTML("beforeend",'<span class="loader hidden"></span>'),e.querySelector(".loader")):void 0},show(e){e?.classList.remove("hidden")},hide(e){e?.classList.add("hidden")}},u="/project-Dev4L1fe/assets/sprite-BCLXoa-8.svg";function P(e){const t=e.map(r=>{const a=r.genres.map(n=>`<li class="genres-list-item">${n}</li>`).join(""),s=M(r.strBiographyEN);return`<li class="artists-list-item" data-id="${r._id}">
                <img class="artist-image"
                  src="${r.strArtistThumb}" 
                  alt="${r.strArtist}" />
                <ul class="genres-list">
                    ${a}
                </ul>
                <h3 class="artist-name">${r.strArtist}</h3>
                <p class="artist-descr">${s}</p>
                <button type="button" class="artist-btn-learn-more">
                    <span>Learn More</span>
                    <span>
                        <svg class="artist-learn-svg" width="14" height="14">
                          <use href="${u}#next-icon"></use>
                        </svg>
                    </span>
                </button>
            </li>`}).join("");L.artistsList.insertAdjacentHTML("beforeend",t)}const I=e=>{const t=document.querySelector(".section-feedback .container");if(!t)return console.error("Container not found");const r=`
    <div class="feedback-slider swiper">
      <div class="swiper-wrapper">
        ${e.map(i=>`
          <div class="swiper-slide">
            <div class="feedback-card">
              <div class="stars">${T(i.rating)}</div>
              <p class="comment">"${i.descr}"</p>
              <h3 class="comm-name">${i.name}</h3>
            </div>
          </div>
        `).join("")}
      </div>
      <div class="swiper-button-prev">
        <svg class="icon">
          <use href="${u}#left-arrow-icon"></use>

        </svg>
      </div>
      <div class="swiper-button-next">
        <svg class="icon">
          <use href="${u}#right-arrow-icon"></use>

        </svg>
      </div>
      <div class="custom-pagination">
        <span class="bullet bullet-left"></span>
        <span class="bullet bullet-middle"></span>
        <span class="bullet bullet-right"></span>
      </div>
    </div>
  `;t.insertAdjacentHTML("beforeend",r);const a=t.querySelector(".feedback-slider");if(!a)return console.error("Swiper container not found");const s=new E(a,{spaceBetween:30,slidesPerView:1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},on:{init(i){n(i)},slideChange(i){n(i)}}});document.querySelector(".swiper-button-next")?.addEventListener("click",()=>{s.slideNext()}),document.querySelector(".swiper-button-prev")?.addEventListener("click",()=>{s.slidePrev()});function n(i){const S=i.slides.length,h=i.activeIndex,c=i.el.querySelector(".bullet-left"),l=i.el.querySelector(".bullet-middle"),d=i.el.querySelector(".bullet-right");!c||!l||!d||(c.classList.remove("active"),l.classList.remove("active"),d.classList.remove("active"),h===0?c.classList.add("active"):h===S-1?d.classList.add("active"):l.classList.add("active"))}};function T(e){const t=Math.round(e),r=5-t;return'<span class="stars">'+'<span class="fa fa-star checked"></span>'.repeat(t)+'<span class="fa fa-star" style="color: #fff;"></span>'.repeat(r)+"</span>"}async function B(){let e;try{e=o.create(L.artistsList),o.show(e);const{data:t}=await $();o.show(e),P(t.artists)}catch(t){t.response?b.error({message:`Error ${t.response.status}: ${t.response.data}`}):b.error({message:`Error: ${t.message}`})}finally{o.hide(e)}}async function C(){try{const{feedbacks:e}=await q(1,10);if(!Array.isArray(e))throw new Error("Feedbacks is not an array");I(e)}catch(e){console.error("Feedback fetch error:",e)}}const p=document.getElementById("toTop");window.addEventListener("scroll",()=>{window.scrollY>600?p.classList.add("show"):p.classList.remove("show")});p.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});const N=document.querySelector(".burger-menu"),w=document.querySelector(".mobile-menu"),O=document.querySelector(".mobile-menu-close"),f=document.querySelector(".overlay"),j=document.querySelectorAll(".nav-list-m a");function x(){w.classList.add("active"),f.classList.add("active")}function v(){w.classList.remove("active"),f.classList.remove("active")}N.addEventListener("click",x);O.addEventListener("click",v);f.addEventListener("click",v);j.forEach(e=>{e.addEventListener("click",function(t){t.preventDefault();const r=this.getAttribute("href"),a=document.querySelector(r);a&&a.scrollIntoView({behavior:"smooth"}),v()})});B();C();
//# sourceMappingURL=index.js.map
