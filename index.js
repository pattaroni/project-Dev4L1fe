import{a as b,S as E,i as L,P as k}from"./assets/vendor-WtVtfYKs.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const P={BASE_URL:"https://sound-wave.b.goit.study/api",ENDPOINTS:{genres:()=>"/genres",artists:()=>"/artists",artistById:e=>`/artists/${e}`,artistByIdWithAlbums:e=>`/artists/${e}/albums`,feedbacks:()=>"/feedbacks"},PER_PAGE:8},{BASE_URL:$,ENDPOINTS:w,PER_PAGE:g}=P;b.defaults.baseURL=$;const A=async({page:e=1,genre:t,name:n,sortName:a}={})=>{const{data:s}=await b.get(w.artists(),{params:{page:e,limit:g,...!!t&&{genre:t},...!!n&&{name:n},...!!a&&{sortName:a}}}),i=s.totalArtists||0,r=Math.ceil(i/g),o=e>=r;return{artists:s.artists||[],isLastPage:o,totalItems:i,perPage:g}},q=async(e=1,t=10)=>{const{data:n}=await b.get(w.feedbacks(),{params:{page:e,limit:t}}),a=n.data||[],s=n.total||0,i=e>=Math.ceil(s/t);return{feedbacks:a,isLastPage:i}},u={artistsList:document.querySelector(".artists-list"),containerEL:document.querySelector(".container"),loader:document.querySelector(".loader"),artistsPagination:document.querySelector("#artists-pagination")},d="/project-Dev4L1fe/assets/sprite-BCLXoa-8.svg",M=(e="")=>CSS.supports("-webkit-line-clamp","2")&&CSS.supports("display","-webkit-box")?e:e.length>80?e.slice(0,80).trim()+"...":e,l={create(e){return e?(e.insertAdjacentHTML("beforeend",'<span class="loader hidden"></span>'),e.querySelector(".loader")):void 0},show(e){e?.classList.remove("hidden")},hide(e){e?.classList.add("hidden")}},I=({page:e,visiblePages:t,itemsPerPage:n,totalItems:a}={})=>({totalItems:a,itemsPerPage:n,page:e,visiblePages:t,centerAlign:!0,usageStatistics:!1,template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:({type:s})=>`<a href="#" class="tui-page-btn tui-${s}"><svg class="pagination-${s==="next"?"right":"left"}-icon"><use href="${d}#${s==="next"?"right":"left"}-arrow-icon"></use></svg></a>`,disabledMoveButton:({type:s})=>`<span class="tui-page-btn tui-is-disabled tui-${s}"><svg class="icon-disabled pagination-${s==="next"?"right":"left"}-icon"><use href="${d}#${s==="next"?"right":"left"}-arrow-icon"></use></svg></span>`,moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}}),B=e=>e<768?3:e>=768&&e<1440?4:5;function x(e){u.artistsList.innerHTML=e.map(t=>{const n=t.genres.map(s=>`<li class="genres-list-item">${s}</li>`).join(""),a=M(t.strBiographyEN);return`<li class="artists-list-item">
        <img class="artist-image" src="${t.strArtistThumb}" alt="${t.strArtist}" />
        <ul class="genres-list">${n}</ul>
        <h3 class="artist-name">${t.strArtist}</h3>
        <p class="artist-descr">${a}</p>
        <button type="button" class="artist-btn-learn-more">
          <span>Learn More</span>
          <span>
            <svg class="artist-learn-svg" width="14" height="14">
              <use href="${d}#next-icon"></use>
            </svg>
          </span>
        </button>
      </li>`}).join("")}const T=e=>{const t=document.querySelector(".section-feedback .container");if(!t)return console.error("Container not found");const n=`
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
          <use href="${d}#left-arrow-icon"></use>

        </svg>
      </div>
      <div class="swiper-button-next">
        <svg class="icon">
          <use href="${d}#right-arrow-icon"></use>

        </svg>
      </div>
      <div class="custom-pagination">
        <span class="bullet bullet-left"></span>
        <span class="bullet bullet-middle"></span>
        <span class="bullet bullet-right"></span>
      </div>
    </div>
  `;t.insertAdjacentHTML("beforeend",n);const a=t.querySelector(".feedback-slider");if(!a)return console.error("Swiper container not found");const s=new E(a,{spaceBetween:30,slidesPerView:1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},on:{init(r){i(r)},slideChange(r){i(r)}}});document.querySelector(".swiper-button-next")?.addEventListener("click",()=>{s.slideNext()}),document.querySelector(".swiper-button-prev")?.addEventListener("click",()=>{s.slidePrev()});function i(r){const o=r.slides.length,c=r.activeIndex,p=r.el.querySelector(".bullet-left"),f=r.el.querySelector(".bullet-middle"),m=r.el.querySelector(".bullet-right");!p||!f||!m||(p.classList.remove("active"),f.classList.remove("active"),m.classList.remove("active"),c===0?p.classList.add("active"):c===o-1?m.classList.add("active"):f.classList.add("active"))}};function C(e){const t=Math.round(e),n=5-t;return'<span class="stars">'+'<span class="fa fa-star checked"></span>'.repeat(t)+'<span class="fa fa-star" style="color: #fff;"></span>'.repeat(n)+"</span>"}async function O(){const e=l.create(u.artistsList);let t=null,n=window.innerWidth;async function a(i=1){l.show(e);try{const{artists:r,totalItems:o,perPage:c}=await A({page:i});x(r),t||s(o,c,i)}catch(r){r.response?L.error({message:`Error ${r.response.status}: ${r.response.data}`}):L.error({message:`Error: ${r.message}`})}finally{l.hide(e)}}function s(i,r,o=1){t=new k(u.artistsPagination,I({page:o,visiblePages:B(n),itemsPerPage:r,totalItems:i})),t.on("afterMove",c=>{a(c.page)})}await a(1)}async function N(){const e=l.create(u.containerEL);l.show(e);try{const{feedbacks:t}=await q(1,10);if(!Array.isArray(t))throw new Error("Feedbacks is not an array");T(t)}catch(t){console.error("Feedback fetch error:",t)}finally{l.hide(e)}}const v=document.getElementById("toTop");window.addEventListener("scroll",()=>{window.scrollY>600?v.classList.add("show"):v.classList.remove("show")});v.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});const j=document.querySelector(".burger-menu"),S=document.querySelector(".mobile-menu"),D=document.querySelector(".mobile-menu-close"),h=document.querySelector(".overlay"),F=document.querySelectorAll(".nav-list-m a");function R(){S.classList.add("active"),h.classList.add("active"),document.body.classList.add("lock")}function y(){S.classList.remove("active"),h.classList.remove("active"),document.body.classList.remove("lock")}j.addEventListener("click",R);D.addEventListener("click",y);h.addEventListener("click",y);F.forEach(e=>{e.addEventListener("click",function(t){t.preventDefault();const n=this.getAttribute("href"),a=document.querySelector(n);a&&a.scrollIntoView({behavior:"smooth"}),y()})});O();N();
//# sourceMappingURL=index.js.map
