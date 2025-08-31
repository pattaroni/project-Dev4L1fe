import{a as f,S as w,i as v}from"./assets/vendor-F9iMMrrb.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();const L={BASE_URL:"https://sound-wave.b.goit.study/api",ENDPOINTS:{genres:()=>"/genres",artists:()=>"/artists",artistById:e=>`/artists/${e}`,artistByIdWithAlbums:e=>`/artists/${e}/albums`,feedbacks:()=>"/feedbacks"},PER_PAGE:8},{BASE_URL:S,ENDPOINTS:b,PER_PAGE:h}=L;f.defaults.baseURL=S;const E=async({page:e=1,genre:s,name:i,sortName:n}={})=>{const{data:t}=await f.get(b.artists(),{params:{page:e,limit:h,...!!s&&{genre:s},...!!i&&{name:i},...!!n&&{sortName:n}}}),r=t.totalArtists||0,a=e>=Math.ceil(r/h);return{data:t,isLastPage:a}},k=async(e=1,s=10)=>{const{data:i}=await f.get(b.feedbacks(),{params:{page:e,limit:s}}),n=i.data||[],t=i.total||0,r=e>=Math.ceil(t/s);return{feedbacks:n,isLastPage:r}},g={artistsList:document.querySelector(".artists-list"),containerEL:document.querySelector(".container"),loader:document.querySelector(".loader")},A=(e="")=>CSS.supports("-webkit-line-clamp","2")&&CSS.supports("display","-webkit-box")?e:e.length>80?e.slice(0,80).trim()+"...":e,o={create(e){return e?(e.insertAdjacentHTML("beforeend",'<span class="loader hidden"></span>'),e.querySelector(".loader")):void 0},show(e){e?.classList.remove("hidden")},hide(e){e?.classList.add("hidden")}},u="/project-Dev4L1fe/assets/sprite-DpWu6vF8.svg";function $(e){const s=e.map(i=>{const n=i.genres.map(r=>`<li class="genres-list-item">${r}</li>`).join(""),t=A(i.strBiographyEN);return`<li class="artists-list-item" data-id="${i._id}">
                <img class="artist-image"
                  src="${i.strArtistThumb}" 
                  alt="${i.strArtist}" />
                <ul class="genres-list">
                    ${n}
                </ul>
                <h3 class="artist-name">${i.strArtist}</h3>
                <p class="artist-descr">${t}</p>
                <button type="button" class="artist-btn-learn-more">
                    <span>Learn More</span>
                    <span>
                        <svg class="artist-learn-svg" width="14" height="14">
                          <use href="${u}#next-icon"></use>
                        </svg>
                    </span>
                </button>
            </li>`}).join("");g.artistsList.insertAdjacentHTML("beforeend",s)}const P=e=>{const s=document.querySelector(".section-feedback .container");if(!s)return console.error("Container not found");const i=`
    <div class="feedback-slider swiper">
      <div class="swiper-wrapper">
        ${e.map(a=>`
          <div class="swiper-slide">
            <div class="feedback-card">
              <div class="stars">${q(a.rating)}</div>
              <p class="comment">"${a.descr}"</p>
              <h3 class="comm-name">${a.name}</h3>
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
  `;s.insertAdjacentHTML("beforeend",i);const n=s.querySelector(".feedback-slider");if(!n)return console.error("Swiper container not found");const t=new w(n,{spaceBetween:30,slidesPerView:1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},on:{init(a){r(a)},slideChange(a){r(a)}}});document.querySelector(".swiper-button-next")?.addEventListener("click",()=>{t.slideNext()}),document.querySelector(".swiper-button-prev")?.addEventListener("click",()=>{t.slidePrev()});function r(a){const y=a.slides.length,m=a.activeIndex,c=a.el.querySelector(".bullet-left"),l=a.el.querySelector(".bullet-middle"),d=a.el.querySelector(".bullet-right");!c||!l||!d||(c.classList.remove("active"),l.classList.remove("active"),d.classList.remove("active"),m===0?c.classList.add("active"):m===y-1?d.classList.add("active"):l.classList.add("active"))}};function q(e){const s=Math.round(e),i=5-s;return'<span class="stars">'+'<span class="fa fa-star checked"></span>'.repeat(s)+'<span class="fa fa-star" style="color: #fff;"></span>'.repeat(i)+"</span>"}async function I(){let e;try{e=o.create(g.artistsList),o.show(e);const{data:s}=await E();o.show(e),$(s.artists)}catch(s){s.response?v.error({message:`Error ${s.response.status}: ${s.response.data}`}):v.error({message:`Error: ${s.message}`})}finally{o.hide(e)}}async function T(){try{const{feedbacks:e}=await k(1,10);if(!Array.isArray(e))throw new Error("Feedbacks is not an array");P(e)}catch(e){console.error("Feedback fetch error:",e)}}const p=document.getElementById("toTop");window.addEventListener("scroll",()=>{window.scrollY>600?p.classList.add("show"):p.classList.remove("show")});p.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});I();T();
//# sourceMappingURL=index.js.map
