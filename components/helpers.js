
export default  async function getQuote() {
  let url = "https://api.quotable.io/random";
  await fetch(url, { mode: 'no-cors' })
  .then(response => response.text())
  .then(data => {
    // deal with the data that the server sent back
    console.log(data)
    setData(response);
  })
  .catch(error => {
    // handle your failures here
      console.log('DUN FUCKED Up'+error.message)
  })
}
/*
    document.addEventListener("DOMContentLoaded", function () {
      const p = new User();
      let j = new Journal();
      if (check() === true) {
        const local = JSON.parse(localStorage.getItem("Journal"));
        document.getElementById("submit").addEventListener("click", (event) => {
          j.enterJournal(local, event);
          updateLocal(j);
        });
        document.getElementById("name").addEventListener("click", (event) => {
          p.getData(event);
        });
        document.getElementById("delete").addEventListener("click", () => {
          j.reset();
        });
        document.getElementById("display").addEventListener("click", () => {
          j.display();
        });
      } else {
        document.getElementById("entry").addEventListener("click", (event) => {
          j.enterJournal(undefined, event);
          updateLocal(j);
        });
        document.getElementById("name").addEventListener("click", (event) => {
          p.getData(event);
        });
      }
    });
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    document.writeln(today);

*/
