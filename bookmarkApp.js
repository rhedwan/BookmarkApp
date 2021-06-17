const body = document.body ;
const input = document.querySelector('input[type=text')
const overlay = document.querySelector('.overlay')

function showFloater() {
    body.classList.add('show-floater')
}

function closeFloater() {
    if (body.classList.contains('show-floater')) {
        body.classList.remove('show-floater');
         }
}


input.addEventListener('focusin', showFloater)
input.addEventListener('focusout', closeFloater )
overlay.addEventListener('click', closeFloater )

/* ============================================= */

localStorage.setItem('my_thing', 'something')

const bookmarksList = document.querySelector('.bookmarks-list')
const bookmarkForm = document.querySelector('.bookmark-form')
const bookmarkInput = document.querySelector('input[type=text]')
const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
const apiUrl = 'https://opengraph.io/api/1.0/site';
const appId = '58858c7bcf07b61e64257391';

const myUrl = encodeURIComponent('https://dashboard.opengraph.io/register')
fillBookmarksList(bookmarks)


function createBookmark(e) {
    e.preventDefault();

    if (!bookmarkInput.value){
        alert("We need info!!..")
        return ;
    }

    // add a new bookmark to the bookmarks

    const url = encodeURIComponent(bookmarkInput.value)
    fetch(`${apiUrl}/${url}?app_id=${appId}`)
        .then(response => response.json())
        .then(data => {

            // const title = data.hybridGraph.title
            // console.log(data.hybridGraph.title)


            // const title = bookmarkInput.value ;
            const bookmark = {
                title:  data.hybridGraph.title,
                image:  data.hybridGraph.image,
                link:  data.hybridGraph.url
            } ;
            bookmarks.push(bookmark)

            fillBookmarksList(bookmarks)
            storeBookmarks(bookmarks)
            bookmarkForm.reset();
        })
        .catch(error => {
            alert('There was a problem getting info!');
        });
    

    /* const title = bookmarkInput.value ;
    const bookmark = {
        title: title
    } ;
    bookmarks.push(bookmark)

    fillBookmarksList(bookmarks)
    storeBookmarks(bookmarks)
    bookmarkForm.reset(); */


    // console.table(bookmarks)

    // save that bookmark list to localstorage


    /* const title = bookmarkInput.value ;
    const bookmark = document.createElement('a')
    

    bookmark.className = 'bookmark'
    bookmark.innerText = title 
    bookmark.href = '#'
    bookmark.target = '_blank'

    bookmarksList.appendChild(bookmark)
    bookmarkForm.reset();
    console.log(bookmark) */
}
function fillBookmarksList(bookmarks = []) {

    bookmarksList.innerHTML = bookmarks.map((bookmark, i) =>{
        return `
         <a href="${bookmark.link}" class="bookmark" data-id="${i}">
            <div class="img" style="background-image:url('${bookmark.image}')"></div>
            <div class="title">${bookmark.title}</div>
            <span class="glyphicon glyphicon-remove"></span>
         </a>
        
        `
    }).join('')

   /* let bookmarksHtml = ' ' ;
   for(let i= 0; i < bookmarks.length ; i++ ){
        bookmarksHtml += `
         <a href="#" class="bookmark">
            ${bookmarks[i].title}
         </a>
        
        `
    } */
    // bookmarksList.innerHTML = bookmarksHtml
    // console.log(bookmarksHtml)
}

function removeBookmark(e) {
    if(!e.target.matches('.glyphicon-remove')) return ;

    const index = e.target.parentNode.dataset.id ;
    console.dir(index)

    bookmarks.splice(index, 1)
    fillBookmarksList(bookmarks)
    storeBookmarks(bookmarks)

    // console.log('hello')
    // console.log(e)
}

function storeBookmarks(bookmarks = []) {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
}

bookmarkForm.addEventListener('submit', createBookmark)
bookmarksList.addEventListener('click', removeBookmark)