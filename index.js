document.getElementById('bookmarkForm').addEventListener('submit', function(e) {
    let websiteName = document.getElementById('websiteName').value;
    let websiteUrl = document.getElementById('websiteUrl').value;
    if(websiteName && websiteUrl) {
        e.preventDefault();
        let bookmark = {
            name: websiteName,
            url: websiteUrl
        }
        if(localStorage.getItem('bookmarks') === null) {
            let bookmarks = [];
            bookmarks.push(bookmark);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }
       else
       {
          let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
          bookmarks.push(bookmark);
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
       }
        console.log(localStorage.getItem('bookmarks'));
       // addItemTodo(value);
        document.getElementById('websiteName').value = '';
        document.getElementById('websiteUrl').value = '';
        fetchBookmarks()
     }
})

function deleteBookmark(selectedUrl){
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(let i = 0; i < bookmarks.length; i++){
        let url = bookmarks[i].url;
        if (url == selectedUrl) {
          bookmarks.splice(i, 1)
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks()
}


function fetchBookmarks(){
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let bookmarkResults = document.getElementById('BookmarksResults');
    bookmarkResults.innerHTML = '';
    for(let i = 0; i < bookmarks.length; i++){
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;
        bookmarkResults.innerHTML += '<div class="bookmark-item">'+
                                     '<h3>'+ name + 
                                     '<a class="btn" target="_blank" href="'+ url +'">Visit</a>'+
                                     '<a onclick="deleteBookmark(\''+url+'\')" class="btn delete" >Delete</a>'+
                                     '</h3>'+
                                     '</div>'

    }
}