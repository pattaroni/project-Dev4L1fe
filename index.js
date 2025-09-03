import{a as g,S as T,i as f,P as x}from"./assets/vendor-WtVtfYKs.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const C={BASE_URL:"https://sound-wave.b.goit.study/api",ENDPOINTS:{genres:()=>"/genres",artists:()=>"/artists",artistById:e=>`/artists/${e}`,artistByIdWithAlbums:e=>`/artists/${e}/albums`,feedbacks:()=>"/feedbacks"},PER_PAGE:8},{BASE_URL:F,ENDPOINTS:y,PER_PAGE:S}=C;g.defaults.baseURL=F;const j=async()=>{const{data:e}=await g.get(y.genres());return e},q=async({page:e=1,genre:t,name:n,sortName:s}={})=>{const{data:a}=await g.get(y.artists(),{params:{page:e,limit:S,...!!t&&{genre:t},...!!n&&{name:n},...!!s&&{sortName:s}}}),i=a.totalArtists||0,o=Math.ceil(i/S),l=e>=o;return{artists:a.artists||[],isLastPage:l,totalItems:i,perPage:S}},D=async e=>{const{data:t}=await g.get(y.artistById(e));return t},O=async e=>{const{data:t}=await g.get(y.artistByIdWithAlbums(e));return t},H=async(e=1,t=10)=>{const{data:n}=await g.get(y.feedbacks(),{params:{page:e,limit:t}}),s=n.data||[],a=n.total||0,i=e>=Math.ceil(a/t);return{feedbacks:s,isLastPage:i}},r={artistsList:document.querySelector(".artists-list"),containerEL:document.querySelector(".container"),loader:document.querySelector(".loader"),artistsPagination:document.querySelector("#artists-pagination"),feedbackContainer:document.querySelector(".section-feedback .container"),genreSelect:document.querySelector("#genre-select"),sortSelect:document.querySelector("#sort-select"),searchInput:document.querySelector(".filters-search-input"),searchBtn:document.querySelector(".filters-search-btn"),resetBtn:document.querySelector(".filters-reset-btn"),emptyResetBtn:document.querySelector(".empty-reset-btn"),toggleBtn:document.querySelector(".filters-toggle-btn"),filtersWrapper:document.querySelector(".filters-wrapper"),artistsLoader:document.querySelector(".artists-loader"),modalArtistLoader:document.querySelector(".modal-artist-loader")},m="/project-Dev4L1fe/assets/sprite-BCLXoa-8.svg",U=(e="")=>CSS.supports("-webkit-line-clamp","2")&&CSS.supports("display","-webkit-box")?e:e.length>80?e.slice(0,80).trim()+"...":e,d={create(e){if(!e)return;let t=e.querySelector(".loader");return t||(e.insertAdjacentHTML("beforeend",'<span class="loader hidden"></span>'),t=e.querySelector(".loader")),{loaderEl:t,parent:e}},show({loaderEl:e,parent:t}={}){!e||!t||(e?.classList.remove("hidden"),t===document.querySelector(".artists-loader")&&(t.style.display="flex",e?.classList.remove("hidden")))},hide({loaderEl:e,parent:t}={}){!e||!t||(e?.classList.add("hidden"),t===document.querySelector(".artists-loader")&&(t.style.display="none",e?.classList.add("hidden")))}},W=({page:e,visiblePages:t,itemsPerPage:n,totalItems:s}={})=>({totalItems:s,itemsPerPage:n,page:e,visiblePages:t,centerAlign:!0,usageStatistics:!1,template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:({type:a})=>`<a href="#" class="tui-page-btn tui-${a}"><svg class="pagination-${a==="next"?"right":"left"}-icon"><use href="${m}#${a==="next"?"right":"left"}-arrow-icon"></use></svg></a>`,disabledMoveButton:({type:a})=>`<span class="tui-page-btn tui-is-disabled tui-${a}"><svg class="icon-disabled pagination-${a==="next"?"right":"left"}-icon"><use href="${m}#${a==="next"?"right":"left"}-arrow-icon"></use></svg></span>`,moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}}),R=e=>e<768?3:e>=768&&e<1440?4:5,G=e=>{if(!e||isNaN(e))return"N/A";const t=Math.floor(e/1e3),n=Math.floor(t/60),s=t%60;return`${n}:${s.toString().padStart(2,"0")}`};function B(e){r.artistsList.innerHTML=e.map(t=>{const n=t.genres.map(a=>`<li class="genres-list-item">${a}</li>`).join(""),s=U(t.strBiographyEN);return`<li class="artists-list-item" data-id="${t._id}">
        <img class="artist-image" src="${t.strArtistThumb}" alt="${t.strArtist}" />
        <ul class="genres-list">${n}</ul>
        <h3 class="artist-name">${t.strArtist}</h3>
        <p class="artist-descr">${s}</p>
        <button type="button" class="artist-btn-learn-more">
          <span>Learn More</span>
          <span>
            <svg class="artist-learn-svg" width="14" height="14">
              <use href="${m}#next-icon"></use>
            </svg>
          </span>
        </button>
      </li>`}).join("")}const V=e=>{const t=document.querySelector(".section-feedback .container");if(!t)return console.error("Container not found");const n=`
    <div class="feedback-slider swiper">
      <div class="swiper-wrapper">
        ${e.map(o=>`
          <div class="swiper-slide">
            <div class="feedback-card">
              <div class="stars">${_(o.rating)}</div>
              <p class="comment">"${o.descr}"</p>
              <h3 class="comm-name">${o.name}</h3>
            </div>
          </div>
        `).join("")}
      </div>
      <div class="swiper-button-prev">
        <svg class="icon">
          <use href="${m}#left-arrow-icon"></use>

        </svg>
      </div>
      <div class="swiper-button-next">
        <svg class="icon">
          <use href="${m}#right-arrow-icon"></use>

        </svg>
      </div>
      <div class="custom-pagination">
        <span class="bullet bullet-left"></span>
        <span class="bullet bullet-middle"></span>
        <span class="bullet bullet-right"></span>
      </div>
    </div>
  `;t.insertAdjacentHTML("beforeend",n);const s=t.querySelector(".feedback-slider");if(!s)return console.error("Swiper container not found");const a=new T(s,{spaceBetween:30,slidesPerView:1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},on:{init(o){i(o)},slideChange(o){i(o)}}});document.querySelector(".swiper-button-next")?.addEventListener("click",()=>{a.slideNext()}),document.querySelector(".swiper-button-prev")?.addEventListener("click",()=>{a.slidePrev()});function i(o){const l=o.slides.length,u=o.activeIndex,h=o.el.querySelector(".bullet-left"),b=o.el.querySelector(".bullet-middle"),L=o.el.querySelector(".bullet-right");!h||!b||!L||(h.classList.remove("active"),b.classList.remove("active"),L.classList.remove("active"),u===0?h.classList.add("active"):u===l-1?L.classList.add("active"):b.classList.add("active"))}};function _(e){const t=Math.round(e),n=5-t;return'<span class="stars">'+'<span class="fa fa-star checked"></span>'.repeat(t)+'<span class="fa fa-star" style="color: #fff;"></span>'.repeat(n)+"</span>"}async function Y(e,t){const n=d.create(r.modalArtistLoader);d.show(n),r.modalArtistLoader.style.display="flex";try{const s=await D(e),a=await O(e),i=Array.isArray(a.albumsList)?a.albumsList.filter(l=>l&&typeof l=="object"):[],o=s.genres?.map(l=>`<span class="genre-chip">${l}</span>`).join("")||"";t.innerHTML=`
      <h2 class="modal-title">${s.strArtist||"Unknown Artist"}</h2>

      <div class="modal-header">
        <img src="${s.strArtistThumb||""}" alt="${s.strArtist}" class="modal-img" />
        <div class="modal-info">
          <div class="modal-info-container">
          <div class="modal-info-group">
            <p><span>Years active</span> ${s.intFormedYear||"N/A"}-${s.intDiedYear||"present"}</p>
            <p><span>Sex</span> ${s.strGender||"N/A"}</p>
            </div>
            <div class="modal-info-group">
            <p><span>Members</span> ${s.intMembers||"N/A"}</p>
            <p><span>Country</span> ${s.strCountry||"N/A"}</p>
            </div>
          </div>
          <div><span>Biography</span><p>${s.strBiographyEN||"N/A"}</p></div>
          <div class="modal-genres">${o}</div>
        </div>
      </div>
      <h3 class="albums-heading">Albums</h3>
<div class="albums-container">
  ${i.length>0?i.map(l=>`
      <div class="album-card">
        <h4 class="album-title">${l.strAlbum||"Unknown Album"}</h4>
        <div class="album-tracks-header">
        <p>Track</p>
        <div class="track-info">
          <p>Time</p>
          <p>Link</p>
        </div>
        </div>
        <ul class="album-tracklist">
          ${l?.tracks?.length?l.tracks.map(u=>`
              <li class="album-track-item">
                <h5>${u.strTrack||"Track"}</h5>
                <div class="track-info">
                  <p>
                    ${G(u.intDuration)}
                  </p>
                  <a class="track-video-link ${u.movie?"":"track-video-link-hidden"}" 
                      href="${u.movie||"#"}" target="_blank" rel="noopener noreferrer">
                    <svg class="track-video-icon icon-hidden">
                      <use href="${m}#youtube-icon"></use>
                    </svg>
                  </a>
                </div>
              </li>`).join(""):'<li class="album-track-item">No tracks available</li>'}
        </ul>
      </div>
    `).join(""):"<p>No albums found</p>"}
</div>`}catch(s){console.error("Modal render error:",s),t.innerHTML="<p>Error loading artist data</p>"}finally{d.hide(n),r.modalArtistLoader.style.display="none"}}const v=document.getElementById("artist-modal"),I=v.querySelector(".modal-content-container"),z=document.getElementById("close-modal");async function K(e){v.classList.add("is-open"),document.body.style.overflow="hidden",await Y(e,I),document.addEventListener("keydown",M)}function k(){v.classList.remove("is-open"),document.body.style.overflow="auto",document.removeEventListener("keydown",M),I.innerHTML=""}function M(e){e.key==="Escape"&&k()}z?.addEventListener("click",k);v.addEventListener("click",e=>{e.target===v&&k()});async function X(){async function e(t=1){const n=d.create(r.artistsLoader);d.show(n),r.artistsLoader.style.display="flex";try{const s=await q({page:t});P(s.totalItems,s.perPage),B(s.artists)}catch(s){s.response?f.error({message:`Error ${s.response.status}: ${s.response.data}`}):f.error({message:`Error: ${s.message}`})}finally{d.hide(n),r.artistsLoader.style.display="none",document.querySelector(".artists-subtitle").scrollIntoView({behavior:"smooth"})}}await e(1)}async function J(){const e=d.create(r.feedbackContainer);d.show(e);try{const{feedbacks:t}=await H(1,10);if(!Array.isArray(t))throw new Error("Feedbacks is not an array");V(t)}catch(t){console.error("Feedback fetch error:",t)}finally{d.hide(e)}}let c={genre:"",sortName:"",name:"",page:1};async function Q(){await Z(),ee()}async function Z(){try{const t=(await j()).map(n=>`<option value="${n.genre}">${n.genre}</option>`).join("");r.genreSelect.innerHTML='<option value="" disabled selected hidden>Genre</option>'+t}catch(e){f.error({message:"Failed to load genres"}),console.error(e)}}function ee(){r.genreSelect.addEventListener("change",()=>{c.genre=r.genreSelect.value,c.page=1,p()}),r.sortSelect.addEventListener("change",()=>{const e=r.sortSelect.value;c.sortName=e==="az"?"asc":e==="za"?"desc":"",c.page=1,p()}),r.searchBtn.addEventListener("click",e=>{e.preventDefault(),c.name=r.searchInput.value.trim(),c.page=1,p()}),r.searchInput.addEventListener("keydown",e=>{e.key==="Enter"&&(e.preventDefault(),c.name=r.searchInput.value.trim(),c.page=1,p())}),r.resetBtn.addEventListener("click",()=>{r.genreSelect.value="",r.sortSelect.value="",r.searchInput.value="",c={genre:"",sortName:"",name:"",page:1},p()}),r.emptyResetBtn&&r.emptyResetBtn.addEventListener("click",()=>{r.genreSelect.value="",r.sortSelect.value="",r.searchInput.value="",c={genre:"",sortName:"",name:"",page:1},document.querySelector(".artists-empty-state").classList.add("is-hidden"),p()}),r.toggleBtn&&r.filtersWrapper&&r.toggleBtn.addEventListener("click",()=>{r.filtersWrapper.classList.toggle("is-open");const e=r.toggleBtn.getAttribute("aria-expanded")==="true";r.toggleBtn.setAttribute("aria-expanded",String(!e))})}let E=null;async function p(){const e=d.create(r.artistsLoader);d.show(e);try{const t=await q(c);if(!t||!Array.isArray(t.artists))throw new Error("Invalid API response structure");t.artists.length===0?(r.artistsList.innerHTML="",document.querySelector(".artists-empty-state").classList.remove("is-hidden"),r.artistsPagination.innerHTML=""):(document.querySelector(".artists-empty-state").classList.add("is-hidden"),B(t.artists),P(t.totalItems,t.perPage))}catch{f.error({message:"Failed to load filtered artists"})}finally{d.hide(e),r.artistsLoader.style.display="none",document.querySelector(".artists-subtitle").scrollIntoView({behavior:"smooth"})}}function P(e,t){let n=window.innerWidth;E=new x(r.artistsPagination,W({page:c.page,visiblePages:R(n),itemsPerPage:t,totalItems:e})),E.on("afterMove",s=>{c.page=s.page,p()})}const te=()=>{r.artistsList.addEventListener("click",async e=>{const t=e.target.closest(".artist-btn-learn-more");if(t?.nodeName!=="BUTTON")return;const n=t.closest(".artists-list-item")?.dataset?.id;if(!n){f.error({message:"Unable to find this artist. Please try again later."});return}K(n)})},w=document.getElementById("toTop");window.addEventListener("scroll",()=>{window.scrollY>600?w.classList.add("show"):w.classList.remove("show")});w.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});const se=document.querySelector(".burger-menu"),N=document.querySelector(".mobile-menu"),re=document.querySelector(".mobile-menu-close"),A=document.querySelector(".overlay"),ae=document.querySelectorAll(".nav-list-m a");function ne(){N.classList.add("active"),A.classList.add("active"),document.body.classList.add("lock")}function $(){N.classList.remove("active"),A.classList.remove("active"),document.body.classList.remove("lock")}se.addEventListener("click",ne);re.addEventListener("click",$);A.addEventListener("click",$);ae.forEach(e=>{e.addEventListener("click",function(t){t.preventDefault();const n=this.getAttribute("href"),s=document.querySelector(n);s&&s.scrollIntoView({behavior:"smooth"}),$()})});X();J();Q();te();
//# sourceMappingURL=index.js.map
