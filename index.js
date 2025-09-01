import{a as b,S as k,i as L,P as E}from"./assets/vendor-WtVtfYKs.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=n(t);fetch(t.href,a)}})();const P={BASE_URL:"https://sound-wave.b.goit.study/api",ENDPOINTS:{genres:()=>"/genres",artists:()=>"/artists",artistById:e=>`/artists/${e}`,artistByIdWithAlbums:e=>`/artists/${e}/albums`,feedbacks:()=>"/feedbacks"},PER_PAGE:8},{BASE_URL:$,ENDPOINTS:w,PER_PAGE:g}=P;b.defaults.baseURL=$;const A=async({page:e=1,genre:s,name:n,sortName:i}={})=>{const{data:t}=await b.get(w.artists(),{params:{page:e,limit:g,...!!s&&{genre:s},...!!n&&{name:n},...!!i&&{sortName:i}}}),a=t.totalArtists||0,r=Math.ceil(a/g),o=e>=r;return{artists:t.artists||[],isLastPage:o,totalItems:a,perPage:g}},q=async(e=1,s=10)=>{const{data:n}=await b.get(w.feedbacks(),{params:{page:e,limit:s}}),i=n.data||[],t=n.total||0,a=e>=Math.ceil(t/s);return{feedbacks:i,isLastPage:a}},u={artistsList:document.querySelector(".artists-list"),containerEL:document.querySelector(".container"),loader:document.querySelector(".loader"),artistsPagination:document.querySelector("#artists-pagination"),feedbackContainer:document.querySelector(".section-feedback .container")},l="/project-Dev4L1fe/assets/sprite-BCLXoa-8.svg",M=(e="")=>CSS.supports("-webkit-line-clamp","2")&&CSS.supports("display","-webkit-box")?e:e.length>80?e.slice(0,80).trim()+"...":e,c={create(e){return e?(e.insertAdjacentHTML("beforeend",'<span class="loader hidden"></span>'),e.querySelector(".loader")):void 0},show(e){e?.classList.remove("hidden")},hide(e){e?.classList.add("hidden")}},I=({page:e,visiblePages:s,itemsPerPage:n,totalItems:i}={})=>({totalItems:i,itemsPerPage:n,page:e,visiblePages:s,centerAlign:!0,usageStatistics:!1,template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:({type:t})=>`<a href="#" class="tui-page-btn tui-${t}"><svg class="pagination-${t==="next"?"right":"left"}-icon"><use href="${l}#${t==="next"?"right":"left"}-arrow-icon"></use></svg></a>`,disabledMoveButton:({type:t})=>`<span class="tui-page-btn tui-is-disabled tui-${t}"><svg class="icon-disabled pagination-${t==="next"?"right":"left"}-icon"><use href="${l}#${t==="next"?"right":"left"}-arrow-icon"></use></svg></span>`,moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}}),B=e=>e<768?3:e>=768&&e<1440?4:5;function C(e){u.artistsList.innerHTML=e.map(s=>{const n=s.genres.map(t=>`<li class="genres-list-item">${t}</li>`).join(""),i=M(s.strBiographyEN);return`<li class="artists-list-item">
        <img class="artist-image" src="${s.strArtistThumb}" alt="${s.strArtist}" />
        <ul class="genres-list">${n}</ul>
        <h3 class="artist-name">${s.strArtist}</h3>
        <p class="artist-descr">${i}</p>
        <button type="button" class="artist-btn-learn-more">
          <span>Learn More</span>
          <span>
            <svg class="artist-learn-svg" width="14" height="14">
              <use href="${l}#next-icon"></use>
            </svg>
          </span>
        </button>
      </li>`}).join("")}const x=e=>{const s=document.querySelector(".section-feedback .container");if(!s)return console.error("Container not found");const n=`
    <div class="feedback-slider swiper">
      <div class="swiper-wrapper">
        ${e.map(r=>`
          <div class="swiper-slide">
            <div class="feedback-card">
              <div class="stars">${T(r.rating)}</div>
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
  `;s.insertAdjacentHTML("beforeend",n);const i=s.querySelector(".feedback-slider");if(!i)return console.error("Swiper container not found");const t=new k(i,{spaceBetween:30,slidesPerView:1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},on:{init(r){a(r)},slideChange(r){a(r)}}});document.querySelector(".swiper-button-next")?.addEventListener("click",()=>{t.slideNext()}),document.querySelector(".swiper-button-prev")?.addEventListener("click",()=>{t.slidePrev()});function a(r){const o=r.slides.length,d=r.activeIndex,p=r.el.querySelector(".bullet-left"),f=r.el.querySelector(".bullet-middle"),m=r.el.querySelector(".bullet-right");!p||!f||!m||(p.classList.remove("active"),f.classList.remove("active"),m.classList.remove("active"),d===0?p.classList.add("active"):d===o-1?m.classList.add("active"):f.classList.add("active"))}};function T(e){const s=Math.round(e),n=5-s;return'<span class="stars">'+'<span class="fa fa-star checked"></span>'.repeat(s)+'<span class="fa fa-star" style="color: #fff;"></span>'.repeat(n)+"</span>"}async function O(){let e=null,s=window.innerWidth;async function n(t=1){const a=c.create(u.artistsList);c.show(a);try{const{artists:r,totalItems:o,perPage:d}=await A({page:t});C(r),e||i(o,d,t)}catch(r){r.response?L.error({message:`Error ${r.response.status}: ${r.response.data}`}):L.error({message:`Error: ${r.message}`})}finally{c.hide(a)}}function i(t,a,r=1){e=new E(u.artistsPagination,I({page:r,visiblePages:B(s),itemsPerPage:a,totalItems:t})),e.on("afterMove",o=>{n(o.page)})}await n(1)}async function N(){const e=c.create(u.feedbackContainer);c.show(e);try{const{feedbacks:s}=await q(1,10);if(!Array.isArray(s))throw new Error("Feedbacks is not an array");x(s)}catch(s){console.error("Feedback fetch error:",s)}finally{c.hide(e)}}const v=document.getElementById("toTop");window.addEventListener("scroll",()=>{window.scrollY>600?v.classList.add("show"):v.classList.remove("show")});v.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});const j=document.querySelector(".burger-menu"),S=document.querySelector(".mobile-menu"),D=document.querySelector(".mobile-menu-close"),h=document.querySelector(".overlay"),F=document.querySelectorAll(".nav-list-m a");function R(){S.classList.add("active"),h.classList.add("active"),document.body.classList.add("lock")}function y(){S.classList.remove("active"),h.classList.remove("active"),document.body.classList.remove("lock")}j.addEventListener("click",R);D.addEventListener("click",y);h.addEventListener("click",y);F.forEach(e=>{e.addEventListener("click",function(s){s.preventDefault();const n=this.getAttribute("href"),i=document.querySelector(n);i&&i.scrollIntoView({behavior:"smooth"}),y()})});O();N();
//# sourceMappingURL=index.js.map
