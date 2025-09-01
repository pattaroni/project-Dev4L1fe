import{a as b,S as E,i as L,P}from"./assets/vendor-WtVtfYKs.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(t){if(t.ep)return;t.ep=!0;const i=n(t);fetch(t.href,i)}})();const $={BASE_URL:"https://sound-wave.b.goit.study/api",ENDPOINTS:{genres:()=>"/genres",artists:()=>"/artists",artistById:e=>`/artists/${e}`,artistByIdWithAlbums:e=>`/artists/${e}/albums`,feedbacks:()=>"/feedbacks"},PER_PAGE:8},{BASE_URL:k,ENDPOINTS:w,PER_PAGE:f}=$;b.defaults.baseURL=k;const A=async({page:e=1,genre:s,name:n,sortName:a}={})=>{const{data:t}=await b.get(w.artists(),{params:{page:e,limit:f,...!!s&&{genre:s},...!!n&&{name:n},...!!a&&{sortName:a}}}),i=t.totalArtists||0,r=Math.ceil(i/f),o=e>=r;return{artists:t.artists||[],isLastPage:o,totalItems:i,perPage:f}},q=async(e=1,s=10)=>{const{data:n}=await b.get(w.feedbacks(),{params:{page:e,limit:s}}),a=n.data||[],t=n.total||0,i=e>=Math.ceil(t/s);return{feedbacks:a,isLastPage:i}},m={artistsList:document.querySelector(".artists-list"),containerEL:document.querySelector(".container"),loader:document.querySelector(".loader"),artistsPagination:document.querySelector("#artists-pagination")},l="/project-Dev4L1fe/assets/sprite-BCLXoa-8.svg",M=(e="")=>CSS.supports("-webkit-line-clamp","2")&&CSS.supports("display","-webkit-box")?e:e.length>80?e.slice(0,80).trim()+"...":e,g={create(e){return e?(e.insertAdjacentHTML("beforeend",'<span class="loader hidden"></span>'),e.querySelector(".loader")):void 0},show(e){e?.classList.remove("hidden")},hide(e){e?.classList.add("hidden")}},I=({page:e,visiblePages:s,itemsPerPage:n,totalItems:a}={})=>({totalItems:a,itemsPerPage:n,page:e,visiblePages:s,centerAlign:!0,usageStatistics:!1,template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:({type:t})=>`<a href="#" class="tui-page-btn tui-${t}"><svg class="pagination-${t==="next"?"right":"left"}-icon"><use href="${l}#${t==="next"?"right":"left"}-arrow-icon"></use></svg></a>`,disabledMoveButton:({type:t})=>`<span class="tui-page-btn tui-is-disabled tui-${t}"><svg class="icon-disabled pagination-${t==="next"?"right":"left"}-icon"><use href="${l}#${t==="next"?"right":"left"}-arrow-icon"></use></svg></span>`,moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}}),B=e=>e<768?3:e>=768&&e<1440?4:5;function x(e){m.artistsList.innerHTML=e.map(s=>{const n=s.genres.map(t=>`<li class="genres-list-item">${t}</li>`).join(""),a=M(s.strBiographyEN);return`<li class="artists-list-item">
        <img class="artist-image" src="${s.strArtistThumb}" alt="${s.strArtist}" />
        <ul class="genres-list">${n}</ul>
        <h3 class="artist-name">${s.strArtist}</h3>
        <p class="artist-descr">${a}</p>
        <button type="button" class="artist-btn-learn-more">
          <span>Learn More</span>
          <span>
            <svg class="artist-learn-svg" width="14" height="14">
              <use href="${l}#next-icon"></use>
            </svg>
          </span>
        </button>
      </li>`}).join("")}const T=e=>{const s=document.querySelector(".section-feedback .container");if(!s)return console.error("Container not found");const n=`
    <div class="feedback-slider swiper">
      <div class="swiper-wrapper">
        ${e.map(r=>`
          <div class="swiper-slide">
            <div class="feedback-card">
              <div class="stars">${C(r.rating)}</div>
              <p class="comment">"${r.descr}"</p>
              <h3 class="comm-name">${r.name}</h3>
            </div>
          </div>
        `).join("")}
      </div>
      <div class="swiper-button-prev">
        <svg class="icon">
          <use href="${l}#left-arrow-icon"></use>

        </svg>
      </div>
      <div class="swiper-button-next">
        <svg class="icon">
          <use href="${l}#right-arrow-icon"></use>

        </svg>
      </div>
      <div class="custom-pagination">
        <span class="bullet bullet-left"></span>
        <span class="bullet bullet-middle"></span>
        <span class="bullet bullet-right"></span>
      </div>
    </div>
  `;s.insertAdjacentHTML("beforeend",n);const a=s.querySelector(".feedback-slider");if(!a)return console.error("Swiper container not found");const t=new E(a,{spaceBetween:30,slidesPerView:1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},on:{init(r){i(r)},slideChange(r){i(r)}}});document.querySelector(".swiper-button-next")?.addEventListener("click",()=>{t.slideNext()}),document.querySelector(".swiper-button-prev")?.addEventListener("click",()=>{t.slidePrev()});function i(r){const o=r.slides.length,c=r.activeIndex,d=r.el.querySelector(".bullet-left"),u=r.el.querySelector(".bullet-middle"),p=r.el.querySelector(".bullet-right");!d||!u||!p||(d.classList.remove("active"),u.classList.remove("active"),p.classList.remove("active"),c===0?d.classList.add("active"):c===o-1?p.classList.add("active"):u.classList.add("active"))}};function C(e){const s=Math.round(e),n=5-s;return'<span class="stars">'+'<span class="fa fa-star checked"></span>'.repeat(s)+'<span class="fa fa-star" style="color: #fff;"></span>'.repeat(n)+"</span>"}async function O(){const e=g.create(m.artistsList);let s=null,n=window.innerWidth;async function a(i=1){g.show(e);try{const{artists:r,totalItems:o,perPage:c}=await A({page:i});x(r),s||t(o,c,i)}catch(r){r.response?L.error({message:`Error ${r.response.status}: ${r.response.data}`}):L.error({message:`Error: ${r.message}`})}finally{g.hide(e)}}function t(i,r,o=1){s=new P(m.artistsPagination,I({page:o,visiblePages:B(n),itemsPerPage:r,totalItems:i})),s.on("afterMove",c=>{a(c.page)})}await a(1)}async function N(){try{const{feedbacks:e}=await q(1,10);if(!Array.isArray(e))throw new Error("Feedbacks is not an array");T(e)}catch(e){console.error("Feedback fetch error:",e)}}const v=document.getElementById("toTop");window.addEventListener("scroll",()=>{window.scrollY>600?v.classList.add("show"):v.classList.remove("show")});v.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});const j=document.querySelector(".burger-menu"),S=document.querySelector(".mobile-menu"),D=document.querySelector(".mobile-menu-close"),h=document.querySelector(".overlay"),F=document.querySelectorAll(".nav-list-m a");function R(){S.classList.add("active"),h.classList.add("active")}function y(){S.classList.remove("active"),h.classList.remove("active")}j.addEventListener("click",R);D.addEventListener("click",y);h.addEventListener("click",y);F.forEach(e=>{e.addEventListener("click",function(s){s.preventDefault();const n=this.getAttribute("href"),a=document.querySelector(n);a&&a.scrollIntoView({behavior:"smooth"}),y()})});O();N();
//# sourceMappingURL=index.js.map
