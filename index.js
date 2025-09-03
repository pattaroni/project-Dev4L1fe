import{a as L,S as V,i as A,P as G}from"./assets/vendor-WtVtfYKs.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function a(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=a(s);fetch(s.href,n)}})();const Y={BASE_URL:"https://sound-wave.b.goit.study/api",ENDPOINTS:{genres:()=>"/genres",artists:()=>"/artists",artistById:e=>`/artists/${e}`,artistByIdWithAlbums:e=>`/artists/${e}/albums`,feedbacks:()=>"/feedbacks"},PER_PAGE:8},{BASE_URL:z,ENDPOINTS:k,PER_PAGE:q}=Y;L.defaults.baseURL=z;const K=async()=>{const{data:e}=await L.get(k.genres());return e},C=async({page:e=1,genre:t,name:a,sortName:r}={})=>{const{data:s}=await L.get(k.artists(),{params:{page:e,limit:q,...!!t&&{genre:t},...!!a&&{name:a},...!!r&&{sortName:r}}}),n=s.totalArtists||0,o=Math.ceil(n/q),u=e>=o;return{artists:s.artists||[],isLastPage:u,totalItems:n,perPage:q}},X=async e=>{const{data:t}=await L.get(k.artistById(e));return t},J=async e=>{const{data:t}=await L.get(k.artistByIdWithAlbums(e));return t},Q=async e=>{const{data:t}=await L.post(k.feedbacks(),e);return t},Z=async(e=1,t=10)=>{const{data:a}=await L.get(k.feedbacks(),{params:{page:e,limit:t}}),r=a.data||[],s=a.total||0,n=e>=Math.ceil(s/t);return{feedbacks:r,isLastPage:n}},i={artistsList:document.querySelector(".artists-list"),containerEL:document.querySelector(".container"),loader:document.querySelector(".loader"),artistsPagination:document.querySelector("#artists-pagination"),feedbackContainer:document.querySelector(".section-feedback .container"),genreSelect:document.querySelector("#genre-select"),sortSelect:document.querySelector("#sort-select"),searchInput:document.querySelector(".filters-search-input"),searchBtn:document.querySelector(".filters-search-btn"),resetBtn:document.querySelector(".filters-reset-btn"),emptyResetBtn:document.querySelector(".empty-reset-btn"),toggleBtn:document.querySelector(".filters-toggle-btn"),filtersWrapper:document.querySelector(".filters-wrapper"),artistsLoader:document.querySelector(".artists-loader"),modalArtistLoader:document.querySelector(".modal-artist-loader")},S="/project-Dev4L1fe/assets/sprite-BCLXoa-8.svg",ee=(e="")=>CSS.supports("-webkit-line-clamp","2")&&CSS.supports("display","-webkit-box")?e:e.length>80?e.slice(0,80).trim()+"...":e,f={create(e){if(!e)return;let t=e.querySelector(".loader");return t||(e.insertAdjacentHTML("beforeend",'<span class="loader hidden"></span>'),t=e.querySelector(".loader")),{loaderEl:t,parent:e}},show({loaderEl:e,parent:t}={}){!e||!t||(e?.classList.remove("hidden"),t===document.querySelector(".artists-loader")&&(t.style.display="flex",e?.classList.remove("hidden")))},hide({loaderEl:e,parent:t}={}){!e||!t||(e?.classList.add("hidden"),t===document.querySelector(".artists-loader")&&(t.style.display="none",e?.classList.add("hidden")))}},te=({page:e,visiblePages:t,itemsPerPage:a,totalItems:r}={})=>({totalItems:r,itemsPerPage:a,page:e,visiblePages:t,centerAlign:!0,usageStatistics:!1,template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:({type:s})=>`<a href="#" class="tui-page-btn tui-${s}"><svg class="pagination-${s==="next"?"right":"left"}-icon"><use href="${S}#${s==="next"?"right":"left"}-arrow-icon"></use></svg></a>`,disabledMoveButton:({type:s})=>`<span class="tui-page-btn tui-is-disabled tui-${s}"><svg class="icon-disabled pagination-${s==="next"?"right":"left"}-icon"><use href="${S}#${s==="next"?"right":"left"}-arrow-icon"></use></svg></span>`,moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}}),se=e=>e<768?3:e>=768&&e<1440?4:5,re=e=>{if(!e||isNaN(e))return"N/A";const t=Math.floor(e/1e3),a=Math.floor(t/60),r=t%60;return`${a}:${r.toString().padStart(2,"0")}`};function T(e){const t=e.el.querySelector(".swiper-button-prev"),a=e.el.querySelector(".swiper-button-next");e.isBeginning?t.classList.add("swiper-button-disabled"):t.classList.remove("swiper-button-disabled"),e.isEnd?a.classList.add("swiper-button-disabled"):a.classList.remove("swiper-button-disabled"),e.slides.length<=e.params.slidesPerView&&(t.classList.add("swiper-button-disabled"),a.classList.add("swiper-button-disabled"))}function D(e){i.artistsList.innerHTML=e.map(t=>{const a=t.genres.map(s=>`<li class="genres-list-item">${s}</li>`).join(""),r=ee(t.strBiographyEN);return`<li class="artists-list-item" data-id="${t._id}">
        <img class="artist-image" src="${t.strArtistThumb}" alt="${t.strArtist}" />
        <ul class="genres-list">${a}</ul>
        <h3 class="artist-name">${t.strArtist}</h3>
        <p class="artist-descr">${r}</p>
        <button type="button" class="artist-btn-learn-more">
          <span>Learn More</span>
          <span>
            <svg class="artist-learn-svg" width="14" height="14">
              <use href="${S}#next-icon"></use>
            </svg>
          </span>
        </button>
      </li>`}).join("")}const ae=e=>{const t=document.querySelector(".section-feedback .container");if(!t)return console.error("Container not found");const a=`
    <div class="feedback-slider swiper">
      <div class="swiper-wrapper">
        ${e.map(o=>`
          <div class="swiper-slide">
            <div class="feedback-card">
              <div class="stars">${ne(o.rating)}</div>
              <p class="comment">"${o.descr}"</p>
              <h3 class="comm-name">${o.name}</h3>
            </div>
          </div>
        `).join("")}
      </div>
      <div class="swiper-button-prev">
        <svg class="icon">
          <use href="${S}#left-arrow-icon"></use>

        </svg>
      </div>
      <div class="swiper-button-next">
        <svg class="icon">
          <use href="${S}#right-arrow-icon"></use>

        </svg>
      </div>
      <div class="custom-pagination">
        <span class="bullet bullet-left"></span>
        <span class="bullet bullet-middle"></span>
        <span class="bullet bullet-right"></span>
      </div>
    </div>
  `;t.insertAdjacentHTML("beforeend",a);const r=t.querySelector(".feedback-slider");if(!r)return console.error("Swiper container not found");const s=new V(r,{spaceBetween:30,slidesPerView:1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},on:{init(o){n(o),T(o)},slideChange(o){n(o),T(o)}}});document.querySelector(".swiper-button-next")?.addEventListener("click",()=>{s.slideNext()}),document.querySelector(".swiper-button-prev")?.addEventListener("click",()=>{s.slidePrev()});function n(o){const u=o.slides.length,c=o.activeIndex,d=o.el.querySelector(".bullet-left"),g=o.el.querySelector(".bullet-middle"),m=o.el.querySelector(".bullet-right");!d||!g||!m||(d.classList.remove("active"),g.classList.remove("active"),m.classList.remove("active"),c===0?d.classList.add("active"):c===u-1?m.classList.add("active"):g.classList.add("active"))}};function ne(e){const t=Math.round(e),a=5-t;return'<span class="stars">'+'<span class="fa fa-star checked"></span>'.repeat(t)+'<span class="fa fa-star" style="color: #fff;"></span>'.repeat(a)+"</span>"}async function ie(e,t){const a=f.create(i.modalArtistLoader);f.show(a),i.modalArtistLoader.style.display="flex";try{const r=await X(e),s=await J(e),n=Array.isArray(s.albumsList)?s.albumsList.filter(u=>u&&typeof u=="object"):[],o=r.genres?.map(u=>`<span class="genre-chip">${u}</span>`).join("")||"";t.innerHTML=`
      <h2 class="modal-title">${r.strArtist||"Unknown Artist"}</h2>

      <div class="modal-header">
        <img src="${r.strArtistThumb||""}" alt="${r.strArtist}" class="modal-img" />
        <div class="modal-info">
          <div class="modal-info-container">
          <div class="modal-info-group">
            <p><span>Years active</span> ${r.intFormedYear||"N/A"}-${r.intDiedYear||"present"}</p>
            <p><span>Sex</span> ${r.strGender||"N/A"}</p>
            </div>
            <div class="modal-info-group">
            <p><span>Members</span> ${r.intMembers||"N/A"}</p>
            <p><span>Country</span> ${r.strCountry||"N/A"}</p>
            </div>
          </div>
          <div><span>Biography</span><p>${r.strBiographyEN||"N/A"}</p></div>
          <div class="modal-genres">${o}</div>
        </div>
      </div>
      <h3 class="albums-heading">Albums</h3>
<div class="albums-container">
  ${n.length>0?n.map(u=>`
      <div class="album-card">
        <h4 class="album-title">${u.strAlbum||"Unknown Album"}</h4>
        <div class="album-tracks-header">
        <p>Track</p>
        <div class="track-info">
          <p>Time</p>
          <p>Link</p>
        </div>
        </div>
        <ul class="album-tracklist">
          ${u?.tracks?.length?u.tracks.map(c=>`
              <li class="album-track-item">
                <h5>${c.strTrack||"Track"}</h5>
                <div class="track-info">
                  <p>
                    ${re(c.intDuration)}
                  </p>
                  <a class="track-video-link ${c.movie?"":"track-video-link-hidden"}" 
                      href="${c.movie||"#"}" target="_blank" rel="noopener noreferrer">
                    <svg class="track-video-icon icon-hidden">
                      <use href="${S}#youtube-icon"></use>
                    </svg>
                  </a>
                </div>
              </li>`).join(""):'<li class="album-track-item">No tracks available</li>'}
        </ul>
      </div>
    `).join(""):"<p>No albums found</p>"}
</div>`}catch(r){console.error("Modal render error:",r),t.innerHTML="<p>Error loading artist data</p>"}finally{f.hide(a),i.modalArtistLoader.style.display="none"}}const E=document.getElementById("artist-modal"),_=E.querySelector(".modal-content-container"),oe=document.getElementById("close-modal");async function ce(e){E.classList.add("is-open"),document.body.style.overflow="hidden",await ie(e,_),document.addEventListener("keydown",j)}function B(){E.classList.remove("is-open"),document.body.style.overflow="auto",document.removeEventListener("keydown",j),_.innerHTML=""}function j(e){e.key==="Escape"&&B()}oe?.addEventListener("click",B);E.addEventListener("click",e=>{e.target===E&&B()});async function le(){async function e(t=1){const a=f.create(i.artistsLoader);f.show(a),i.artistsLoader.style.display="flex";try{const r=await C({page:t});H(r.totalItems,r.perPage),D(r.artists)}catch(r){r.response?A.error({message:`Error ${r.response.status}: ${r.response.data}`}):A.error({message:`Error: ${r.message}`})}finally{f.hide(a),i.artistsLoader.style.display="none"}}await e(1)}async function de(){const e=f.create(i.feedbackContainer);f.show(e);try{const{feedbacks:t}=await Z(1,10);if(!Array.isArray(t))throw new Error("Feedbacks is not an array");ae(t)}catch(t){console.error("Feedback fetch error:",t)}finally{f.hide(e)}}let p={genre:"",sortName:"",name:"",page:1};async function ue(){await me(),pe()}async function me(){try{const t=(await K()).map(a=>`<option value="${a.genre}">${a.genre}</option>`).join("");i.genreSelect.innerHTML='<option value="" disabled selected hidden>Genre</option>'+t}catch(e){A.error({message:"Failed to load genres"}),console.error(e)}}function pe(){i.genreSelect.addEventListener("change",()=>{p.genre=i.genreSelect.value,p.page=1,h()}),i.sortSelect.addEventListener("change",()=>{const e=i.sortSelect.value;p.sortName=e==="az"?"asc":e==="za"?"desc":"",p.page=1,h()}),i.searchBtn.addEventListener("click",e=>{e.preventDefault(),p.name=i.searchInput.value.trim(),p.page=1,h()}),i.searchInput.addEventListener("keydown",e=>{e.key==="Enter"&&(e.preventDefault(),p.name=i.searchInput.value.trim(),p.page=1,h())}),i.resetBtn.addEventListener("click",()=>{i.genreSelect.value="",i.sortSelect.value="",i.searchInput.value="",p={genre:"",sortName:"",name:"",page:1},h()}),i.emptyResetBtn&&i.emptyResetBtn.addEventListener("click",()=>{i.genreSelect.value="",i.sortSelect.value="",i.searchInput.value="",p={genre:"",sortName:"",name:"",page:1},document.querySelector(".artists-empty-state").classList.add("is-hidden"),h()}),i.toggleBtn&&i.filtersWrapper&&i.toggleBtn.addEventListener("click",()=>{i.filtersWrapper.classList.toggle("is-open");const e=i.toggleBtn.getAttribute("aria-expanded")==="true";i.toggleBtn.setAttribute("aria-expanded",String(!e))})}let x=null;async function h(){const e=f.create(i.artistsLoader);f.show(e);try{const t=await C(p);if(!t||!Array.isArray(t.artists))throw new Error("Invalid API response structure");t.artists.length===0?(i.artistsList.innerHTML="",document.querySelector(".artists-empty-state").classList.remove("is-hidden"),i.artistsPagination.innerHTML=""):(document.querySelector(".artists-empty-state").classList.add("is-hidden"),D(t.artists),H(t.totalItems,t.perPage))}catch{A.error({message:"Failed to load filtered artists"})}finally{f.hide(e),i.artistsLoader.style.display="none",document.querySelector(".artists-subtitle").scrollIntoView({behavior:"smooth"})}}function H(e,t){let a=window.innerWidth;x=new G(i.artistsPagination,te({page:p.page,visiblePages:se(a),itemsPerPage:t,totalItems:e})),x.on("afterMove",r=>{p.page=r.page,h()})}const fe=()=>{i.artistsList.addEventListener("click",async e=>{const t=e.target.closest(".artist-btn-learn-more");if(t?.nodeName!=="BUTTON")return;const a=t.closest(".artists-list-item")?.dataset?.id;if(!a){A.error({message:"Unable to find this artist. Please try again later."});return}ce(a)})},$=document.getElementById("toTop");window.addEventListener("scroll",()=>{window.scrollY>600?$.classList.add("show"):$.classList.remove("show")});$.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});const ge=document.querySelector(".burger-menu"),O=document.querySelector(".mobile-menu"),ve=document.querySelector(".mobile-menu-close"),M=document.querySelector(".overlay"),be=document.querySelectorAll(".nav-list-m a");function ye(){O.classList.add("active"),M.classList.add("active"),document.body.classList.add("lock")}function N(){O.classList.remove("active"),M.classList.remove("active"),document.body.classList.remove("lock")}ge.addEventListener("click",ye);ve.addEventListener("click",N);M.addEventListener("click",N);be.forEach(e=>{e.addEventListener("click",function(t){t.preventDefault();const a=this.getAttribute("href"),r=document.querySelector(a);r&&r.scrollIntoView({behavior:"smooth"}),N()})});function he(e,t={}){const a=t.max??5,r=t.scoreName??"rating";e.innerHTML="",e.classList.add("star-rating");let s=0;const n=document.createElement("input");n.type="hidden",n.name=r,n.value="0",e.appendChild(n);const o=[];for(let c=1;c<=a;c++){const d=document.createElement("button");d.type="button",d.setAttribute("aria-label",`${c} star${c>1?"s":""}`),d.dataset.value=String(c),e.appendChild(d),o.push(d)}function u(c){const d=Math.floor(c);o.forEach((g,m)=>{g.classList.remove("is-on","is-hover"),m<d&&g.classList.add("is-on")})}e.addEventListener("mousemove",c=>{const d=c.target.closest("button");if(!d)return;const g=Number(d.dataset.value);o.forEach(m=>m.classList.remove("is-hover"));for(let m=0;m<g;m++)o[m].classList.add("is-hover")}),e.addEventListener("mouseleave",()=>{o.forEach(c=>c.classList.remove("is-hover")),u(s)}),e.addEventListener("click",c=>{const d=c.target.closest("button");if(!d)return;s=Number(d.dataset.value),n.value=String(s),u(s)}),u(s)}function Le({name:e,rating:t,descr:a}){const r={},s=(e??"").trim();(s.length<2||s.length>16)&&(r.name="Name must be 2–16 characters.");const n=Number(t);(!Number.isFinite(n)||n<1||n>5)&&(r.rating="Rating must be between 1 and 5.");const o=(a??"").trim();return(o.length<10||o.length>512)&&(r.descr="Message must be 10–512 characters."),r}function F(){const e=document.getElementById("feedback-modal");if(!e)return;const t=e.querySelector(".modal__close"),a=e.querySelector(".modal__backdrop"),r=e.querySelector("#fb-name"),s=e.querySelector(".modal__form"),n=e.querySelector("#star-rating"),o='#open-modal, [data-open="feedback-modal"]';let u=!1;const c=()=>{s.querySelectorAll(".form-error").forEach(l=>l.remove()),s.querySelectorAll(".field-invalid").forEach(l=>l.classList.remove("field-invalid")),s.querySelectorAll('[aria-invalid="true"]').forEach(l=>l.removeAttribute("aria-invalid"))},d=(l,b)=>{l?.classList?.add("field-invalid"),l?.insertAdjacentHTML("beforeend",`<div class="form-error">${b}</div>`)},g=()=>document.body.classList.add("modal-open"),m=()=>document.body.classList.remove("modal-open"),R=()=>{e.classList.add("active"),g(),setTimeout(()=>r?.focus(),0),!u&&n&&(he(n,{max:5}),u=!0)},U=()=>{if(!n)return;const l=n.querySelector('input[name="rating"]');l&&(l.value="0"),n.querySelectorAll("button").forEach(b=>b.classList.remove("is-on","is-half","is-hover","is-hover-half"))},w=()=>{e.classList.remove("active"),m()};document.addEventListener("click",l=>{l.target.closest(o)&&(l.preventDefault(),R())}),t?.addEventListener("click",w),a?.addEventListener("click",w),document.addEventListener("keydown",l=>{l.key==="Escape"&&e.classList.contains("active")&&w()}),t&&!("disabled"in t)&&(t.setAttribute("role","button"),t.setAttribute("tabindex","0"),t.addEventListener("keydown",l=>{(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),w())})),s?.addEventListener("submit",async l=>{l.preventDefault();const b=new FormData(s),I={name:(b.get("name")||"").toString().trim(),rating:Number(n?.querySelector('input[name="rating"]')?.value||"0"),descr:(b.get("message")||"").toString().trim()};c();const y=Le(I);if(Object.keys(y).length){if(y.name){const v=s.querySelector(".form__group_1");v?.querySelector("input")?.setAttribute("aria-invalid","true"),d(v,y.name)}if(y.descr){const v=s.querySelector(".form__group_2");v?.querySelector("textarea")?.setAttribute("aria-invalid","true"),d(v,y.descr)}y.rating&&n?.insertAdjacentHTML("afterend",`<div class="form-error">${y.rating}</div>`);return}const P=s.querySelector(".fb-modal-btn");P?.setAttribute("disabled","true");try{await Q(I),s.reset(),U(),c(),w()}catch(v){const W=v?.response?.data?.message||v?.message||"Something went wrong. Try again.";s.insertAdjacentHTML("afterbegin",`<div class="form-error">${W}</div>`)}finally{P?.removeAttribute("disabled")}})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",F):F();le();de();ue();fe();
//# sourceMappingURL=index.js.map
