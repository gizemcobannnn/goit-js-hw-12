import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import axios from 'axios'; 

let input="";
let page=1; 
const PER_PAGE=40;
let loadButton = null; 

document.addEventListener("DOMContentLoaded", () => {

document.getElementById("search-images").addEventListener("input",(event)=>{
    input = event.target.value;
    console.log(input);
        // Eğer arama kutusu boşsa butonu devre dışı bırak
        if (input === "") {
          document.getElementById("button-search").setAttribute("disabled", true);
      } else {
        document.getElementById("button-search").removeAttribute("disabled"); // Butonu etkinleştir
      }
});

document.getElementById("button-search").addEventListener("click",()=>{
    if (input.trim() !== "")
    page=1;
    document.getElementById("gallery").innerHTML = ""; // Galeriyi temizle


    fetchImages(input);
    

})

});//DOMContentLoaded

input="";
let totalHits;

async function fetchImages(query) {


    const API_KEY="46148629-af6e53c51d7dfe0604412e9db";
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=${PER_PAGE}&page=${page}`;
    try{
        const response = await axios.get(URL);
        totalHits = response.data.totalHits; // Correctly assign totalHits
        const hits = response.data.hits; // Correctly destructure hits
      
        //bos bir dizi donduyse bu mesaji kullaniciya göstericem
        if (totalHits === 0){
            iziToast.show({
                title: 'No Images',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight', // Bildirimin konumu
                timeout: 5000, // 5 saniye sonra otomatik kapanır
                color: 'warning', // Bildirim rengi (success, warning, info, error)
            });
            if (loadButton) {
              loadButton.style.display = 'none'; // Hide button
          }
            return;
        }
        displayImages(hits);
    }   
    catch(e){
        console.log("Photos can't taken");
        iziToast.error({
            title: 'Error',
            message: e.message,
            position: 'topRight'
        });
    }
    console.log(`Current Page: ${page}, Per Page: ${PER_PAGE}, Total Hits: ${totalHits}`);
  }

  function updateLoadMoreButton(totalHits) {
    const loadedImages = page * PER_PAGE;
    
    if (loadedImages >= totalHits) {
      if (loadButton) {
        loadButton.style.display = 'none'; // Hide button
    }
        iziToast.show({
            title: 'End of Results',
            message: "We're sorry, but you've reached the end of search results.",
            position: 'topRight',
            timeout: 5000,
            color: 'info',
        });
    } else {
        // Create load button if it doesn't exist
        if (!loadButton) {
          loadButton = document.createElement('button');
          loadButton.id = "load";
          loadButton.textContent = "Load More";

          document.getElementById("gallery").insertAdjacentElement('afterend', loadButton);

            // Add event listener once when the button is created
            loadButton.addEventListener('click', () => {
              page++; // Increment page
              fetchImages(input); // Fetch images based on input
          });
      }
      document.getElementById("gallery").insertAdjacentElement('afterend', loadButton);

      loadButton.style.display = 'block'; // Show button

    }
}
  



function displayImages(images){
    const imagediv = document.getElementById("image-results");
    const galleryUl = document.getElementById("gallery");

  
    images.forEach(image => {


        const img = document.createElement("img");
        img.src = image.webformatURL;
        img.alt = image.tags;
        img.dataset.source = image.largeImageURL; // dataset.source ekle


        const link=document.createElement("a");
        link.classList.add("link-a");
        link.href = image.largeImageURL;
        link.setAttribute("data-lightbox", "gallery"); // SimpleLightbox için gerekli
        link.appendChild(img);

                // Bilgileri içeren div oluştur
        const imgList = document.createElement("li");
        imgList.classList.add("image-list");
        imgList.appendChild(link);

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("image-info");

        const likes = document.createElement("p");
        likes.innerHTML=`<div class="notes">
        <p class="foto-note" id="likes">Likes</p>
        <p>${image.likes}</p>`;

        const views = document.createElement("p");
        views.innerHTML=`<div class="notes">
        <p class="foto-note" id="views">Views</p>
        <p>${image.views}</p>`;

        const comments = document.createElement("p");
        comments.innerHTML=`<div class="notes">
        <p class="foto-note" id="comments">Comments</p>
        <p> ${image.comments}</p>
        </div>`;

        const download = document.createElement("p");
        download.innerHTML=`<div class="notes">
        <p class="foto-note" id="download">Downloads</p>
        <p>${image.downloads}</p>
        </div>`;

        infoDiv.appendChild(likes);
        infoDiv.appendChild(views);
        infoDiv.appendChild(comments);
        infoDiv.appendChild(download);

        imgList.appendChild(infoDiv);

        galleryUl.appendChild(imgList);
        imagediv.appendChild(galleryUl);
        document.body.appendChild(imagediv);

    });
 

    new SimpleLightbox('#gallery a', {
        captionsData: 'alt',
        captionDelay: 250
      });

  
  
      updateLoadMoreButton(totalHits);

}


export function clickTheElements(){
    const imagesDom = document.querySelectorAll('.link-a');
    let currentLightBox = null; 
    let currentIndex = 0;

  imagesDom.forEach((link,index) => 
  {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        currentIndex=index;

        if (event.target.nodeName !== "IMG") {
          return; // kullanıcı fotografların arasına tıkladı
        }
        const selectedImageSrc = link.getAttribute('href');
        const selectedImageAlt = link.querySelector('img').alt;
  
          const modal = new SimpleLightbox(
            {
              items: [
                {
                    src: selectedImageSrc,
                    alt: selectedImageAlt,
                },
                ...Array.from(imagesDom).map(img => ({
                    src: img.getAttribute('href'),
                    alt: img.querySelector('img').alt,
                }))
            ],
            captionsData: `${selectedImageAlt}`, // Açıklama için title özniteliğini kullan
            captionDelay: 250
          });
          modal.showModal();
          currentLightBox = modal;
                      // Modal içeriğini güncelle
                      modal.on('show.simplelightbox', () => {
                        modal.select(currentIndex);
                    });
          const prevBtn = modal.element().querySelector('#prev');
          const nextBtn = modal.element().querySelector('#next');

          prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : imagesDom.length - 1;
            updateModal(modal, imagesDom[currentIndex]);

            const newSrc = imagesDom[currentIndex].querySelector('img').dataset.source; // Doğru kaynak
            const newAlt = imagesDom[currentIndex].querySelector('img').alt; // Alt metni al
            modal.element().querySelector('img').src = newSrc;
            modal.element().querySelector('img').alt = newAlt;
          });
      
          nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex < imagesDom.length - 1) ? currentIndex + 1 : 0;
            updateModal(modal, imagesDom[currentIndex]);

            const newSrc = imagesDom[currentIndex].querySelector('img').dataset.source; // Doğru kaynak
            const newAlt = imagesDom[currentIndex].querySelector('img').alt; // Alt metni al
            modal.element().querySelector('img').src = newSrc;
            modal.element().querySelector('img').alt = newAlt;
          });
  
          
      const onKeyDownEsc = (event)=>{
        if((event.key === "Escape" || event.key === "Esc") && currentLightBox){
        currentLightBox.close();
        document.removeEventListener("keydown",onKeyDownEsc);
        currentLightBox = null;
      }
  
    }

    document.addEventListener("keydown",onKeyDownEsc);
    
      });
  });

}