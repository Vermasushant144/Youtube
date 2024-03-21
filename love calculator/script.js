function calculateLove() {
    var yourName = document.getElementById("yourName").value.trim();
    var partnerName = document.getElementById("partnerName").value.trim();
  
    if (yourName === "" || partnerName === "") {
      alert("Please enter both names.");
      return;
    }
  
    var loveScore = Math.random() * 100;
    loveScore = Math.floor(loveScore) + 1;
  
    var resultText = yourName + " and " + partnerName + "'s Love Score is " + loveScore + "%";
    document.getElementById("result").innerText = resultText;
  }
  