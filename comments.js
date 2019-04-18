class DisplayContent {
  constructor(data) {
    this.posts = data;
    this.outputHtml = ``;
    this.displayPosts();
  }
  displayPosts(){
    let outputHtml = ``;
    this.posts.forEach(function (curr) {
      //replace all '\n' with <br>
      let body = curr.body.replace(/\n/g, "<br>");
      outputHtml +=`<article>
      <h2 data-posts="title">${curr.title}</h2>
      <p data-posts="body">
          ${body}
      </p>

      <button data-posts="id" value="${curr.id}" type="button">Show comments</button>

      <section class="comments" id="comments-${curr.id}" hidden>`;
      //comments = data;
      outputHtml += `
      </section>
      </article>`;
      
    });
    $("#posts").html(outputHtml);
   
  (function (window) {
      'use strict';
    
      const BUTTON_SELECTOR = '[data-posts="id"]';
    
      let buttons = document.querySelectorAll(BUTTON_SELECTOR);
    
      buttons.forEach(function (button) {
        'use strict';
        //buttonClicked checks to see if the button has been clicked
        //if it has been clicked then the comments should have been loaded in already
        let buttonClicked = false;
        let sectionSelector = `#comments-${button.value}`;
        let commentSection = document.querySelector(sectionSelector);
    
        button.addEventListener('click', function (event) {
          if (commentSection.hidden) {
            //if button has not been clicked load comments
            //if not then the comments should already be in the section
            if(!buttonClicked) {
              //get path to comments          
              let str = 'https://jsonplaceholder.typicode.com/comments?postId=';
              str += button.value;
              //display comments
              $("#comments-" + button.value).html(`<h3>Comments</h3>`);
              //parse through json to display the comments with proper information
              fetch(str)
              .then(response => response.json())
              .then(json => {
                json.forEach(function (comment) {
                  let commBody = comment.body.replace(/\n/g, "<br>");
                  let ouputComments = `<p data-comments="body">${commBody}</p>
                  <address data-comments="name">
                      <a data-comments="email" href="mailto:${comment.email}">${comment.name}</a>
                  </address>`
                  $(`#comments-${comment.postId}`).append(ouputComments);
                });
              });
              buttonClicked = true;
            }
            commentSection.hidden = false;
            button.textContent = 'Hide comments';
          } else {
            commentSection.hidden = true;
            button.textContent = 'Show comments';
          }
          event.preventDefault();
        });
      });
    })(window);
  }
}

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => {
    new DisplayContent(json);
  });

  