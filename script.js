function updateHours(){
// assign colors to time past(grey)/present(red)/future(green)
// same this for the function in the main except filtering this through the hour class
$('.hour').each(function(){
    // this grabs the time 9am-5pm using moment 
    // ('LT') which means 8:40am is turned into text or in this case a string
    // (this) in this case I'm pretty sure just means a global variable
    var hours= moment($(this).text(), 'LT');
    // this is going to round up the nearest integer so 8:40am turns into 9am
    // using duration with difference to get the duration between two values in this case when one hour starts and when another ends
    // asHours makes sure it gets the length of the duration in hours because hours just gets all the hours within a day
    // so in theory this should go from 9am-10am and hit 0 because of difference and just keep cycling through all the hours
    var hoursLength= Math.ceil(moment.duration(hours.diff(moment())).asHours());
    // using parseInt because I turned the time into a string
    // if hoursLength is less than 0 than that means the time has past
    if (parseInt(hoursLength)< 0) {
        // adding past class, using next to grab the nearest sibling within the class
        $(this).next().addClass("past");
    }
    // chaining the if statment, saying if hoursLength reaches 0 and truly equals 0 this should be the present time
   else if (parseInt(hoursLength)=== 0){
    //    adding present class
        $(this).next().addClass("present");
   }
//    if both are not true then time must be in the future
   else{
    //    adding future class
        $(this).next().addClass("future");
   }
})
}
// this function handles save
function handleSave(e){
// this var graps the content in the text box
console.log(e.target)
var descValue= $(e.target).siblings('.description').val()?.trim();
// this var gets the id/content for the hour time block
var hourId= $(e.target).closest('.time-block').attr('id');
// saves the content key is the hour id and descValue is the value
localStorage.setItem(hourId, descValue);
// adds a nice save feature to know you have saved something using jquery
if (e.target) {
    // I added a class called hide and assign it to the div I created that has the id of save-check
    $('#save-check').removeClass('hide')
    // stays visible for 2 seconds (2000 miliseconds)
    .delay(2000)
    // queues into a function where I use this as a global variable you can also use the id again since it does the samething
    // this re-adds the hide class and dequeue is there to make sure it doesn't think anything else is queued after this
    .queue(function() {
        $(this).addClass( 'hide' ).dequeue();
      });
}
}
function main() {
    // when you click on saveBtn then it will save what you wrote down, make it first just incase that way it works first right away
    $(document).on('click', '.saveBtn', handleSave);
    updateHours();
    // using moment.js this sets what current month, day, year, and time it is under the currentDay Id
    $('#currentDay').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    // this specific line basically loops through each function to look for what I typed in this case variables that way they are gloabally defined
    // it's being filtered through the class of .description because that is where the text is being placed
    $('.description').each(function(){
        // making global variable to get the what I saved in local storage
        // after console logging since I am already going through the description class so just logging  localstorage.getItem(hourId)--
        // --gave me the values and i didn't need to add/define descValue since I already am filtering this through the class where the text is being held
        // (this) refers to the object it belongs to which in this case is this=e.target
            var hourId = $(this).closest('.time-block').attr('id');
            // this variable name actually doesn't just need one that way I can say what is being saved through text
            // left it to say description to avoid confusion
            var description = localStorage.getItem(hourId);
            $(this).text(description);
        })
    
    
}
// makes sure load event doesn't miss short hand for saying $(document).ready(main)
// load event loads the main
$(main)