const saveBookmark = e =>{
    e.preventDefault();
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName,siteUrl)){
        return false;
    }
    
    let bookmark = {
        name: siteName,
        url: siteUrl
    }
    if(localStorage.getItem('bookmarks')=== null){
        const bookmarks= [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }

    document.getElementById('myForm').reset();
    fetchbookmark();

}

//deleting the bookmark
const deleteBookmark = url => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(i=0; i< bookmarks.length; i++){
        if(bookmarks[i].url == url){
            bookmarks.splice(i,1);
        }
    }
    fetchbookmark();
    e.preventDefault();
}

const fetchbookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    const bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';
    for(i=0; i< bookmarks.length; i++) {
        const name = bookmarks[i].name;
        const url = bookmarks[i].url;
    

    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+ name +
                                  ' <a class="btn btn-default" target="_blank" href="'+addhttp(url)+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
    }
}

const validateForm = (siteName,siteUrl) => {
    if(!siteName || !siteUrl){
        alert('please fill in the form');
        return false;
    }

    //regular expression
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);   

    if(!siteUrl.match(regex)){
        alert('please enter valid URL')
        return false;
    }
    return true;
}

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
  }
  
document.getElementById('myForm').addEventListener('submit',saveBookmark);