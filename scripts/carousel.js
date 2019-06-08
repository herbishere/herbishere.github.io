/*********************************************************************
 * Author:                  Herbert Diaz <diazh@oregonstate.edu>
 * Date Created:            05/21/2019
 * Last Modification Date:  05/22/2019
 * Filename:                carousel.js
 * 
 * Overview:
 *  This javascript program looks for a list of images, as indicated by
 *  the class name, "carousel-images-list-member". With that list, the
 *  program dynamically creates buttons at the single member of the
 *  class, "button-slide-selection". After the buttons have been
 *  created, selection functionality is added. Furthermore, this function
 *  implements a previous slide and next slide functionality, as well as
 *  a pause function.
 * 
 * Input:
 *  html page should have:
 *      Classes:
 *       carousel-images-list-member - the list of images
 *       button-slide-selection - the location of the slide buttons
 *       current_button_slide - the location of the prev, pause, and next
 *        buttons.
 *      IDs
 *       button-prev - previous button;
 *       button-pause - pause button;
 *       button-next - next button;
 *       current-image - the element with the current image
 * 
 * Output:
 *  Carousel Moves through each image, which can be manipulated using
 *  available buttons.
 *********************************************************************/

/* variables */
var images = document.getElementsByClassName("carousel-images-list-member");
var numImages = images.length;
var buttonPrev = document.getElementById("button-prev");
var buttonPause = document.getElementById("button-pause");
var buttonNext = document.getElementById("button-next");
var buttons;
var intervalSpeed = 2500;

/* functions */
/*********************************************************************
 * createButton()
 * 
 *  Purpose: This function makes and returns a button with the class
 *      "carousel_button_slide"
 * 
 *  Entry: none
 * 
 *  Exit: Return the completed button.
 *********************************************************************/
function createButton() {
    var button = document.createElement("button");
    button.classList.add("carousel_button_slide");
    return button;
}

/*********************************************************************
 * addButtons()
 * 
 *  Purpose: This function adds buttons to the page, depending on the
 *      number of images.
 * 
 *  Entry: none
 * 
 *  Exit: Page now has buttons.
 *********************************************************************/
function addButtons() {
    /* add buttons to navigation for each image */
    var carousel_nav = document.querySelector(".button-slide-selection");
    for (var current = 0; current < numImages; current++) {
        carousel_nav.appendChild(createButton());
    }
    /* make the first button the current button */
    document.querySelector(".carousel_button_slide").classList.add("carousel_button_slide_current");
    return document.getElementsByClassName("carousel_button_slide");
}

/*********************************************************************
 * moveFront(buttonNumber)
 * 
 *  Purpose: This function selects an image.
 * 
 *  Entry: The index containing the image being manipulated
 * 
 *  Exit: The image is now selected, the old image is not.
 *********************************************************************/
function moveFront(buttonNumber) {
    /* get current image and remove as the current */
    var oldFrontImage = document.getElementById("current-image");
    oldFrontImage.removeAttribute("id");
    /* set new current image */
    images[buttonNumber].id = "current-image";
}

/*********************************************************************
 * selectButton(buttonNumber)
 * 
 *  Purpose: This function selects a button.
 * 
 *  Entry: The index containing the button that is selected
 * 
 *  Exit: The button is now "selected", the old button is not.
 *********************************************************************/
function selectButton(buttonNumber) {
    /* get currently seleceted button and remove */
    var oldSelectedButton = document.querySelector(".carousel_button_slide_current");
    oldSelectedButton.classList.remove("carousel_button_slide_current");
    /* set new current button */
    buttons[buttonNumber].classList.add("carousel_button_slide_current");
}

/*********************************************************************
 * selectProxButton(direction)
 * 
 *  Purpose: This function selects a proximate button.
 * 
 *  Entry: The direction the button is going, "prev" or "next"
 * 
 *  Exit: The proximate button is now selected.
 *********************************************************************/
function selectProxButton(direction) {
    var currentButton = document.querySelector(".carousel_button_slide_current");
    var proxButton;
    if (direction == "next") {
        proxButton = currentButton.nextElementSibling;
        if (proxButton == null) {
            proxButton = currentButton.parentElement.firstElementChild;
        }
    } else if (direction == "prev") {
        proxButton = currentButton.previousElementSibling;
        if (proxButton == null) {
            proxButton = currentButton.parentElement.lastElementChild;
        }
    }
    /* deselect current button */
    currentButton.classList.remove("carousel_button_slide_current");
    /* set next button to the current button */
    proxButton.classList.add("carousel_button_slide_current");
}

/*********************************************************************
 * selectProxImage(direction)
 * 
 *  Purpose: This function selects a proximate image.
 * 
 *  Entry: The direction the image is going, "prev" or "next"
 * 
 *  Exit: The proximate image is now selected.
 *********************************************************************/
function selectProxImage(direction) {
    var currentImage = document.getElementById("current-image");
    var proxImage;
    if (direction == "next") {
        proxImage = currentImage.nextElementSibling;
        if (proxImage == null) {
            proxImage = currentImage.parentElement.firstElementChild;
        }
    } else if (direction == "prev") {
        proxImage = currentImage.previousElementSibling;
        if (proxImage == null) {
            proxImage = currentImage.parentElement.lastElementChild;
        }
    }
    /* deselect current Image */
    currentImage.removeAttribute("id");
    /* set next Image to the current Image */
    proxImage.id = "current-image";
}

/*********************************************************************
 * goDirection(direction)
 * 
 *  Purpose: This function combines selectProxImage and selectProxButton
 * 
 *  Entry: The direction the image is going, "prev" or "next"
 * 
 *  Exit: The proximate image/button is now selected.
 *********************************************************************/
function goDirection(direction) {
    selectProxButton(direction);
    selectProxImage(direction);
}

/* main function */

/* dynamically create buttons for each image in html */
buttons = addButtons();
/* add functionality to buttons */
for (var start = 0; start < numImages; start++) {
    var makeButtonsClick = function (buttonNumber) {
        buttons[buttonNumber].addEventListener("click", event => {
            selectButton(buttonNumber);
            moveFront(buttonNumber);
        });
    }(start);
}

/* scroll through images */
var autoScroll = setInterval(function () {
    goDirection("next");
}, intervalSpeed);

/* add functionality to next, prev, and pause buttons */
buttonNext.addEventListener("click", event => {
    goDirection("next");
});

buttonPrev.addEventListener("click", event => {
    goDirection("prev");
});

buttonPause.addEventListener("click", event => {
    if (buttonPause.classList.contains("inactive")) {
        clearInterval(autoScroll);
        buttonPause.classList.remove("inactive");
        buttonPause.classList.add("active");
        buttonPause.textContent = ">>";
    } else {
        autoScroll = setInterval(function () {
            goDirection("next");
        }, intervalSpeed);
        buttonPause.classList.remove("active");
        buttonPause.classList.add("inactive");
        buttonPause.textContent = "||";
    }
});