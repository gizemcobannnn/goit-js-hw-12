import{a as L,i as p,S as v}from"./assets/vendor-D73Uttp0.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function d(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=d(e);fetch(e.href,t)}})();let l="",c=1;const u=40;let n=null;document.addEventListener("DOMContentLoaded",()=>{document.getElementById("search-images").addEventListener("input",s=>{l=s.target.value,console.log(l),l===""?document.getElementById("button-search").setAttribute("disabled",!0):document.getElementById("button-search").removeAttribute("disabled")}),document.getElementById("button-search").addEventListener("click",()=>{l.trim()!==""&&(c=1),document.getElementById("gallery").innerHTML="",E(l)})});l="";let m;async function E(s){const d=`https://pixabay.com/api/?key=46148629-af6e53c51d7dfe0604412e9db&q=${encodeURIComponent(s)}&image_type=photo&per_page=${u}&page=${c}`;try{const o=await L.get(d);m=o.data.totalHits;const e=o.data.hits;if(m===0){p.show({title:"No Images",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:5e3,color:"warning"}),n&&(n.style.display="none");return}I(e)}catch(o){console.log("Photos can't taken"),p.error({title:"Error",message:o.message,position:"topRight"})}console.log(`Current Page: ${c}, Per Page: ${u}, Total Hits: ${m}`)}function b(s){c*u>=s?(n&&(n.style.display="none"),p.show({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:5e3,color:"info"})):(n||(n=document.createElement("button"),n.id="load",n.textContent="Load More",document.getElementById("gallery").insertAdjacentElement("afterend",n),n.addEventListener("click",()=>{c++,E(l)})),document.getElementById("gallery").insertAdjacentElement("afterend",n),n.style.display="block")}function I(s){const a=document.getElementById("image-results"),d=document.getElementById("gallery");s.forEach(o=>{const e=document.createElement("img");e.src=o.webformatURL,e.alt=o.tags,e.dataset.source=o.largeImageURL;const t=document.createElement("a");t.classList.add("link-a"),t.href=o.largeImageURL,t.setAttribute("data-lightbox","gallery"),t.appendChild(e);const i=document.createElement("li");i.classList.add("image-list"),i.appendChild(t);const r=document.createElement("div");r.classList.add("image-info");const g=document.createElement("p");g.innerHTML=`<div class="notes">
        <p class="foto-note" id="likes">Likes</p>
        <p>${o.likes}</p>`;const f=document.createElement("p");f.innerHTML=`<div class="notes">
        <p class="foto-note" id="views">Views</p>
        <p>${o.views}</p>`;const y=document.createElement("p");y.innerHTML=`<div class="notes">
        <p class="foto-note" id="comments">Comments</p>
        <p> ${o.comments}</p>
        </div>`;const h=document.createElement("p");h.innerHTML=`<div class="notes">
        <p class="foto-note" id="download">Downloads</p>
        <p>${o.downloads}</p>
        </div>`,r.appendChild(g),r.appendChild(f),r.appendChild(y),r.appendChild(h),i.appendChild(r),d.appendChild(i),a.appendChild(d),document.body.appendChild(a)}),new v("#gallery a",{captionsData:"alt",captionDelay:250}),b(m)}
//# sourceMappingURL=index.js.map
