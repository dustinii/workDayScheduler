$(function () {
  displayCurrentDate();
  loadSavedEvents();
  updateTimeBlockColors();

  $(".saveBtn").on("click", saveDescription);
  setInterval(updateTimeBlockColors, 60000); // Refreshes time block colors every minute
});

function displayCurrentDate() {
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
}

function updateTimeBlockColors() {
  var currentHour = 10;

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

function loadSavedEvents() {
  $(".time-block").each(function () {
      var timeBlockId = $(this).attr("id");
      var savedEvent = localStorage.getItem(timeBlockId);

      if (savedEvent) {
          $(this).children(".description").val(savedEvent);
      }
  });
}

function saveDescription() {
  var textAreaValue = $(this).siblings(".description").val();
  var timeBlockId = $(this).parent().attr("id");
  localStorage.setItem(timeBlockId, textAreaValue);
}