function toggle() {
    var x = document.getElementById("tog");
    if (document.getElementById("tog").innerHTML === "Closest To You") {
        document.getElementById("tog").innerHTML = "Top Rated";
        console.log(document.getElementById("tog"))
    } else {
      x.innerHTML = "Closest To You";
      console.log(document.getElementById("tog"))
    }
  }