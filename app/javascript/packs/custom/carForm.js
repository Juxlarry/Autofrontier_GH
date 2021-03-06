var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("carForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i = 0, c, rs, ri, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  z = x[currentTab].getElementsByTagName("select");
  c = x[currentTab].getElementsByClassName("selectedTab");
 
  // A loop that checks every input field in the current tab:


  console.log("selected tab object --" + JSON.stringify(c));


  console.log("length of inputs --" + y.length);

  console.log("length of selects --" + z.length);
  console.log("number in class selectedTab --" + c.length);




  $('.selectedTab').each(function(){

     console.log(i);

     console.log($(this));

     var res = $(this).prop('value');

     console.log("results from input --- " +res);

    if($(this).prop('required') && res != ""){
      console.log(" Valid True 1");
    } else if (!$(this).prop('required') && res == ""){
      console.log(" Valid True 2");
    } 
    else if($(this).prop('required') &&  res == "") { 
      console.log("Valid False");

      $(this).addClass( "invalid" );

      // var newClass = $(this).prop('className');

      // newClass += " invalid";
      // and set the current valid status to false:
      valid = false;
    }

    i++;

  })

  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}


