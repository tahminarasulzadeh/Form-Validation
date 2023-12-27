const createResource = (title, body) => {
  // text elements
  const resTitle = document.getElementById("title");
  const resBody = document.getElementById("body");
  const smTitle = document.getElementById("sm-title");
  const smBody = document.getElementById("sm-body");

  const isValid = errVal(resTitle, resBody, smTitle, smBody, title, body);

  //fetch
  if (isValid) {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        resTitle.innerHTML = json.title;
        resBody.innerHTML = json.body;
         smTitle.innerHTML = "";
        smBody.innerHTML = "";
  
        title = "";
        body = "";
      })
      .catch((err) => console.error(err.message));
  }

};

// form
const form = document.forms.post;
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const titleInput = form.title.value;
  const bodyInput = form.body.value;
  createResource(titleInput, bodyInput);
});

  // error
const errVal = (resTitle, resBody, smTitle, smBody, title, body) => {
 const IS_EMPTY = "TITLE FIELD CANNOT BE EMPTY";
 const IS_EMPTY2 = "BODY FIELD CANNOT BE EMPTY";
  const MAX_LENGTH = "MAX LENGTH 200";
  const MIN_LENGTH = "MIN LENGTH 10";
  let isValid = true;

  if (!title) {
    smTitle.innerHTML = IS_EMPTY;
    isValid = false;
  } else if (title.length < 10) {
    smTitle.innerHTML = MIN_LENGTH;
    isValid = false;
  }

  if (!body) {
    smBody.innerHTML = IS_EMPTY2;
    isValid = false;
  } else if (body.length > 20) {
    smBody.innerHTML = MAX_LENGTH;
    isValid = false;
  }
  return isValid;
};
