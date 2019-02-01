(function(document, window) {
   'use strict';

   var gallery;
   var assocImg = 'bonaro'; //images associated with this word

   function searchPhotos(text, page) {
      page = page > 0 ? page : 1;

      Flickr.searchText({
         text: text,
         per_page: 10,
         jsoncallback: 'Website.Homepage.showPhotos',
         page: page
      });
   }

   function createPager(element, parameters) {
      var pagesToShow = 5;
      var url = '/search/' + assocImg + '/';
      element.textContent = '';

      var previousLinks = {
         '&lt;&lt;': 1,
         '&lt;': (parameters.currentPage - 1 || parameters.currentPage)
      };

      for (var key in previousLinks) {
         link = document.createElement('a');
         link.href = url + previousLinks[key];
         link.innerHTML = '<span class="js-page-number visually-hidden">' + previousLinks[key] + '</span>' + key;
         var listItem = document.createElement('li');
         listItem.appendChild(link);
         element.appendChild(listItem);
      }

      // Avoid showing less than 6 pages in the pager because the user reaches the end
      var pagesDifference = parameters.pagesNumber - parameters.currentPage;
      var startIndex = parameters.currentPage;
      if (pagesDifference < pagesToShow) {
         startIndex = parameters.currentPage - (pagesToShow - pagesDifference - 1) || 1;
      }
      var link;
      for(var i = startIndex; i < parameters.currentPage + pagesToShow && i <= parameters.pagesNumber; i++) {
         link = document.createElement('a');
         link.href = url + i;
         link.innerHTML = '<span class="js-page-number">' + i + '</span>';
         if (i === parameters.currentPage) {
            link.className += ' current';
         }
         listItem = document.createElement('li');
         listItem.appendChild(link);
         element.appendChild(listItem);
      }

      var nextLinks = {
         '&gt;': (parameters.currentPage === parameters.pagesNumber ? parameters.pagesNumber : parameters.currentPage + 1),
         '&gt;&gt;': parameters.pagesNumber
      };

      for (key in nextLinks) {
         link = document.createElement('a');
         link.href = url + nextLinks[key];
         link.innerHTML = '<span class="js-page-number visually-hidden">' + nextLinks[key] + '</span>' + key;
         var listItem = document.createElement('li');
         listItem.appendChild(link);
         element.appendChild(listItem);
      }
   }

   function showPhotos(data) {
      createPager(
         document.getElementsByClassName('js-thumbnails__pager')[0], {
            query: assocImg,
            currentPage: data.photos.page,
            pagesNumber: data.photos.pages
         }
      );

      gallery = new Gallery(data.photos.photo, document.getElementsByClassName('js-gallery__image')[0]);
      gallery.createThumbnailsGallery(document.getElementsByClassName('js-thumbnails__list')[0]);
   }

   function closeModal(){
      var closeBtn = document.querySelector('.gallery__close');
      closeBtn.addEventListener('click', function(event){
         event.target.parentNode.parentNode.classList.add('hidden');
      })

   }

   function init() {
      searchPhotos(assocImg, 1);

      document.getElementsByClassName('js-thumbnails__pager')[0].addEventListener('click', function(event) {
         event.preventDefault();
         var page;
         var currentLink = this.getElementsByClassName('current')[0];
         if (event.target.nodeName === 'SPAN') {
            page = event.target.textContent;
         } else if (event.target.nodeName === 'A') {
            page = event.target.getElementsByClassName('js-page-number')[0].textContent;
         }

         // Avoid reloading the same page
         if (page && page !== currentLink.getElementsByClassName('js-page-number')[0].textContent) {
            searchPhotos(assocImg, page);
         }
      });

      // Kickstart the page
      searchPhotos(assocImg, 1);
      closeModal();
   }

   window.Website = Utility.extend(window.Website || {}, {
      Homepage: {
         init: init,
         showPhotos: showPhotos
      }
   });
})(document, window);

Website.Homepage.init();