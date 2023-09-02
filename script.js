
$(function () {
  displayCurrentDate();
  loadTimeBlockDescriptions();

  $(".saveBtn").on("click", saveDescription);

  updateTimeBlockColors(); // Add this line to call the function when the DOM is ready

  setInterval(updateTimeBlockColors, 60000); // Update the colors every minute
});

function updateTimeBlockColors() {
  var currentHour = dayjs().hour();

  $(".time-block").each(function () {
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

    if (timeBlockHour < currentHour) {
      $(this).addClass("past").removeClass("present future");
    } else if (timeBlockHour === currentHour) {
      $(this).addClass("present").removeClass("past future");
    } else {
      $(this).addClass("future").removeClass("past present");
    }
  });
}

// Function to load saved events from localStorage
function loadSavedEvents() {
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var savedEvent = localStorage.getItem(timeBlockId);

    if (savedEvent) {
      $(this).children(".description").val(savedEvent);
    }
  });
}

// Wrap all code that interacts with the DOM in a call to jQuery
$(document).ready(function () {
  // Display the current date
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  // Save button click event
  $(".saveBtn").on("click", function () {
    var textAreaValue = $(this).siblings(".description").val();
    var timeBlockId = $(this).parent().attr("id");
    localStorage.setItem(timeBlockId, textAreaValue);
  });

  // Update the time block colors
  updateTimeBlockColors();

  // Load saved events
  loadSavedEvents();
});