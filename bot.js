
// function typeSalesMessage(message, elementId, callback) {
//     let i = 0;

//     function displayNextLetter() {
//         if (i < message.length) {
//             document.getElementById(elementId).innerHTML += message.charAt(i);
//             i++;
//             setTimeout(displayNextLetter, 20); // Delay between letters
//         } else if (callback) {
//             callback(); // Call the callback function after the message is fully displayed
//         }
//     }
//     displayNextLetter();
// }

function typeSalesMessage(message, elementId, callback) {
    let i = 0;

    // Split the message into characters, but keep HTML tags intact
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = message;
    const contentNodes = Array.from(tempDiv.childNodes);

    // Target element where the message will be displayed
    const targetElement = document.getElementById(elementId);
    targetElement.innerHTML = ""; // Clear previous content

    function displayNextLetter() {
        if (contentNodes.length > 0) {
            const currentNode = contentNodes[0]; // Get the first node
            if (currentNode.nodeType === Node.TEXT_NODE) {
                // Add text content one character at a time
                targetElement.innerHTML += currentNode.textContent.charAt(0);
                currentNode.textContent = currentNode.textContent.slice(1);
                if (currentNode.textContent.length === 0) contentNodes.shift(); // Remove node when done
            } else {
                // Directly append non-text nodes (e.g., <span>)
                targetElement.appendChild(currentNode);
                contentNodes.shift();
            }
            setTimeout(displayNextLetter, 20);
        } else if (callback) {
            callback(); // Call the callback function after the message is fully displayed
        }
    }

    displayNextLetter();
}


// function convertToBold(text){
//     return `<b>${text}</b>`;
// }

// Consolidated function for fading in elements
function fadeInSalesElements() {
    $(".a1").fadeIn(500);
    $(".a2").fadeIn(2000);
    $(".a3").fadeIn(4000);
    $(".a4").fadeIn(5000);
    $(".a5").fadeIn(5000);
    $(".a6").fadeIn(5000);
    $(".a7").fadeIn(5000);
    $(".a8").fadeIn(5000);
}

let itemSalesHtml = '';
let todoListSakesPopulated = false; // Flag to track if the To-Do list is populated
let messageSalesTyped = false; // Flag to track if the message has been typed

function initializeSalesBotDialog(height, width, position) {
    const username = $v('P0_USERNAME');
    const $botDialog = $("#botsSales_id");


    // Function to capitalize the first letter of a string
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    // If position is passed, use it; otherwise, retain current position
    const dialogPosition = position || $botDialog.dialog("option", "position");

    $botDialog.dialog("option", "height", height);
    $botDialog.dialog("option", "width", width);
    $botDialog.dialog("option", "position", dialogPosition); // Set the position

    // Open the dialog if it's not already open
    if (!$botDialog.dialog("isOpen")) {
        $botDialog.dialog({
            dialogClass: "no-titlebar",
            show: 'slideDown',
            open: function (event, ui) {
                $('.ui-widget-overlay').addClass('overlay-hidden');
                $('.ui-widget-overlay').bind('click', function () { $botDialog.dialog('close'); });
                $('#botSales_oq').hide();
                fadeInSalesElements(); // Call the function to fade in elements

                // Start typing the message when the dialog opens
                // const message = `Hello  John, I am EVA, your AI Copilot. How can I assist you today?`;
                // const message = `Hello John, I am EVA, your AI Copilot.
                //                      How can I assist you today?`;
                // const botMessageElementId = 'botMessage';

                const message = `<span style="font-weight: bold; font-size: 2rem;">Hello John, I am EVA, your AI Copilot.</span><br> How can I assist you today?`;
                const botMessageElementId = "botMessage";


                if (!messageSalesTyped) { // Check if the message has already been typed
                    // Show the message board
                    document.querySelector('.post-bot').style.display = 'block';

                    // Type the message letter by letter
                    typeSalesMessage(message, botMessageElementId, function () {
                        // After the message is fully displayed, show the To-Do list
                        if (!todoListSakesPopulated) { // Only fetch if not already populated
                            fetchToDoSalesList(); // Fetch the To-Do list when the message is fully displayed
                        }
                    });
                    messageSalesTyped = true; // Set the flag to true after typing the message
                }
            },
            beforeClose: function (event, ui) {
                $('.ui-widget-overlay').removeClass('overlay-hidden');
                $('#botSales_oq').show();
            }
        });
        $botDialog.dialog("open");
    }
}

function callbotnewSales() {
    initializeSalesBotDialog(680, 450, { my: "right bottom", at: "right bottom", of: window });
}

function callbotmediumSalessize() {
    initializeSalesBotDialog(680, 750, { my: "right bottom", at: "right bottom", of: window }); // Medium size
}

function callbotlargeSalessize() {
    initializeSalesBotDialog(680, 1200, { my: "right bottom", at: "right bottom", of: window }); // Large size
}

function mainmenuSales() {
    const username = $v('P0_USERNAME');

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    const message = `<b style="font-size: 2rem;">Hello ${capitalizeFirstLetter('John')}, I am EVA, your AI Copilot.</b><br> How can i assist you today?`;
    postBotSalesReply(message);
    fetchToDoSalesList();
}
// Back arrow button
$("#back-button").on("click", () => {
    $("#botsSales_id").dialog('close');
});

// Menu - navigation
$("#nav-icon").on("click", () => {
    $("#nav-containerSales").show();
});

$("#nav-containerSales").on("mouseleave", function () {
    $(this).slideUp(200);
});

// Event handlers for the nav links
$(".nav-link").on("click", function () {
    $("#nav-containerSales").slideToggle(200);
});

$("#av-iconn").on("click", function () {
    $("#nav-containerSales").slideToggle(200);
});

// Adjust bot size
$("#medium-size").on("click", () => {
    callbotmediumSalessize(); // Call medium size bot dialog
});

$("#normal-size").on("click", () => {
    callbotnewSales(); // Call normal size bot dialog
});

$("#large-size").on("click", () => {
    callbotlargeSalessize(); // Call large size bot dialog
});

function fetchToDoSalesList() {
    const compCode = '01';//$v('P0_COMP_CODE');
    const userCode = '01';//$v('P0_USERCODE');
    const taskcode = ("32");

    $.ajax({
        url: 'http://192.168.5.190:8080/ords/wsts/account_dtl/todolist?compcode=' + compCode + '&usercode=' + userCode + '&taskcode=' + taskcode,

        method: 'GET',
        success: function (todolist) {
            console.log("To do list fetched successfully:", todolist);
            const todolistSalesdata = todolist.items;
            displayToDoSalesList(todolistSalesdata); // Display the fetched To-Do list
            todoListSakesPopulated = true; // Set the flag to true
            /// postBotSalesNewReply('Would you like to take action on any of the above items? Please respond with the number of the item.');
        },
        error: function (xhr, status, error) {
            console.error(error);
            const reply = "Error fetching suggested items. Please try again later.";
            postBotSalesNewReply(reply);
        }
    });
}


function displayToDoSalesList(todolistSalesdata) {
    console.log('todolistSalesdata', todolistSalesdata);
    const todoContainer = $("#todo-container");
    todoContainer.empty();

    // Filter tasks with a four-character taskcode
    const filteredTasks = todolistSalesdata.filter(item => item.taskcode.length === 4);

    if (filteredTasks.length > 0) {
        let itemSalesHtml = `
            <div class="brply a2" style="display: flex; flex-wrap: wrap; gap: 10px;">
        `;

        // Assign different classes to the tasks
        filteredTasks.forEach((item, index) => {
            // Use `option2`, `optionSales3`, `optionSales4`, `option5` for the first four items
            const itemClass = `optionSales${index + 2}`;
            itemSalesHtml += `
                <div class="${itemClass}" data-taskcode="${item.taskcode}" data-index="${index}" data-item="${item.taskname}"
                     style="display: inline-block; cursor: pointer;">
                    <span style="font-weight: bold;"></span> ${item.taskname}
                </div>
            `;
        });
        itemSalesHtml += '</div>';

        // Post the formatted HTML as the bot reply
        // postBotSalesReply(itemSalesHtml);
        postBotListSalesReply(itemSalesHtml);

        userInputSalesState = 'awaiting_todo_list';

        // Remove any previous click handlers to avoid duplicates
        $(document).off('click', '.optionSales2, .optionSales3, .optionSales4, .optionSales5');

        // Add click event listener for all item classes
        $(document).on('click', '.optionSales2, .optionSales3, .optionSales4, .optionSales5', function(event) {
            event.preventDefault();
            const taskcode = $(this).data("taskcode");
            console.log(`Option number ${taskcode} clicked`);
            const index = $(this).data("index");
            const itemname = $(this).data("item");
            const item = filteredTasks[index];

            if (item) {
                // Remove 'selected' class from all items and add it to the clicked item
                $('.optionSales2, .optionSales3, .optionSales4, .optionSales5').removeClass('selected');
                $(this).addClass('selected');

                $('#messageSales').text(`${itemname}`);
                $('#sendSales').click();
            }
        });

    } else {
        todoContainer.append("<div>No double-digit to-do items found.</div>");
    }
}
// Sign out
$("#sign-out").on("click", () => {
    $("#message-boardSales").empty();
    $("#message").empty();
    $("#landingSales").show();
    $("#username").val("");
    $("#start-chat").html("Start chat");
});


// $(document).ready(() => {

// $('#username_o').keypress(function (e) {                                       
//        if (e.which == 13) {
//             e.preventDefault();
//            botcall(); //do something   
//        }
// });
/******************/
/*** START CHAT ***/
/******************/


// // set visitor name
// let $userName =$("#username_o").val();


/*****************/
/*** USER CHAT ***/
/*****************/


// Post a message to the board
// function $postMessage() {
//     // Remove any <br> tags within the message text
//     $("#messageSales").find("br").remove();

//     // Get and trim the message text
//     let $message = $("#messageSales").html().trim();
//     $message = $message.replace(/<div>/, "<br>").replace(/<div>/g, "").replace(/<\/div>/g, "<br>").replace(/<br>/g, " ").trim();

//     if ($message) {
//         // Define the user's profile image URL
//         const userProfileImageUrl = "https://example.com/path/to/user/profile.jpg";

//         // Define the fallback bot image if the profile image fails to load
//         const botImg = "r/wsts/125/files/static/v270/bot_User_Image.png"; // Default bot image

//         // Preload the image by creating an image object
//         var img = new Image();
//         img.src = userProfileImageUrl;

//         // Set the onload event to append the message only after the image is loaded
//         img.onload = function () {
//             // HTML structure for a full-width gradient background with message and profile image
//             const userHtml = `
//                  <div class="post post-user">
//                      <div class="user-message-content">
//                          ${$message}
//                      </div>
//                      <div class="user-profile">
//                          <img src="${userProfileImageUrl}" 
//                               alt="User Profile" 
//                               class="user-profile-img" 
//                               onerror="this.onerror=null; this.src='${botImg}';" />
//                      </div>
//                  </div>
//              `;
//             $("#message-boardSales").append(userHtml);

//             // Append the user message HTML to the message board
//             $("#message-boardSales").append(userHtml);

//             // Scroll to the bottom of the chat to keep the latest message in view
//             $scrollSalesDown();

//             // Call botReply after the user message is posted
//             botReply($message);

//             // Empty the message input field
//             $("#messageSales").empty();
//         };

//         // If the image fails to load (error case), use the default bot image
//         img.onerror = function () {
//             const userHtml = `
//                 <div class="post-user-wrapper">
//                     <div class="user-message-content">
//                         ${$message}
//                     </div>
//                     <div class="user-profile">
//                         <img src="${botImg}" alt="Default Bot Profile" class="user-profile-img" />
//                     </div>
//                 </div>
//             `;
//             // Append the message with default bot image if loading fails
//             $("#message-boardSales").append(userHtml);

//             // Scroll to the bottom of the chat to keep the latest message in view
//             $scrollSalesDown();

//             // Call botReply after the user message is posted
//             postBotSalesReply($message);

//             // Empty the message input field
//             $("#messageSales").empty();
//         };
//     }
// }


function $postMessage() {
    // Remove any <br> tags within the message text
    $("#messageSales").find("br").remove();

    // Get and trim the message text
    let $message = $("#messageSales").html().trim();
    // $message = $message.replace(/<div>/g, "<br>").replace(/<\/div>/g, "");
    	$message = $message.replace(/<div>/, "<br>").replace(/<div>/g, "").replace(/<\/div>/g, "<br>").replace(/<br>/g, " ").trim();

    if ($message) {
        // Define the user's profile image URL and fallback bot image URL
        const userProfileImageUrl = "https://example.com/path/to/user/profile.jpg";
        const botImg = "r/wsts/117/files/static/v271/bot_User_Image.png"; // Default bot image

        // HTML structure for message with user profile image (uses bot image as fallback)
        const userHtml = `
       
            <div class="post-user-wrapper">
                <div class="user-message-content">
                    ${$message}
                </div>
                <div class="user-profile">
                    <img src="${botImg}" 
                         alt="User Profile" 
                         class="user-profile-img" 
                         onerror="this.onerror=null; this.src='${botImg}';" />
                </div>
            </div>
  
        `;

        // Append the user message HTML to the message board immediately
        $("#message-boardSales").append(userHtml);

        // Scroll to the bottom of the chat to keep the latest message in view
        $scrollSalesDown();

        // Call botReply after the user message is posted
        botSalesReply($message);

        // Empty the message input field
        $("#messageSales").empty();
    }
}


// Chat input
$("#messageSales").on("keyup", (event) => {
    if (event.which === 13) $postMessage(); // Use enter to send
}).on("focus", () => {
    $("#messageSales").addClass("focus");
}).on("blur", () => {
    $("#messageSales").removeClass("focus");
});
$("#sendSales").on("click", $postMessage);


/**********************/
/*** AUTO REPLY BOT ***///var compCode = $v('P0_COMPCODE');
/**********************/

let userInputSalesState = '';
// let itemData = null;
var graphData = [];

$('#sendSales').on('click', function () {
    var userMessage = $('#messageSales').text().trim();
    if (userMessage || attachedImage) {
        if (attachedImage) {
            Tesseract.recognize(attachedImage, 'eng', {
                logger: m => console.log(m)
            }).then(({ data: { text } }) => {
                console.log(text);
                $('#messageSales').text(text);
                sendUserMessage(text);
            }).catch(err => {
                console.error(err);
                alert("Failed to recognize text from the image.");
                sendUserMessage(userMessage);
            });
            attachedImage = null; // reset the image after processing
        } else {
            sendUserMessage(userMessage);
        }
    }
});

// function sendUserMessage(message) {
//     // fetchApiResponse(message); 
//     fetchGroqChatResponse(message); 
//     $('#message').text('');
// }

function sendUserMessage(message) {
    // Define the maximum length (example value, check your API's actual limit)
    const maxLength = 500;

    // Truncate message if it exceeds maxLength
    if (message.length > maxLength) {
        message = message.substring(0, maxLength);
    }

    //    fetchGroqChatResponse(message); 
    fetchApiResponse(message);
    $('#messageSales').text('');
}


function fetchApiResponse(userMessage) {

    const promptMessage = userMessage;

    const apiKey = 'AIzaSyA8eYi79NUdP4aS1LWRHukeemWlKPFGMvU';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const requestBody = {
        contents: [
            {
                parts: [
                    {
                        text: promptMessage
                    }
                ]
            }
        ]
    };

    $.ajax({
        url: apiUrl,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(requestBody),
        success: function (response) {
            console.log('API response:', response);

            try {
                // Check if candidates array exists and has at least one candidate
                if (response && response.candidates && response.candidates.length > 0) {
                    // Assuming we take the first candidate's content's text part
                    if (response.candidates[0].content && response.candidates[0].content.parts && response.candidates[0].content.parts.length > 0) {
                        var botResponse = response.candidates[0].content.parts[0].text.trim(); // Get the text and trim any whitespace
                        postBotSalesNewReply(botResponse);

                        // $s('P1_MAILBODY',botResponse);
                        userInputSalesState = 'awaiting_api_response';
                    } else {
                        postBotSalesReply('Unexpected response format: Missing content parts');
                    }
                } else {
                    postBotSalesReply('Unexpected response format: Missing candidates array');
                }
            } catch (error) {
                console.error('Error processing response:', error);
                // $('#message-boardSales').append('<div class="post post-bot" style="color:red;">Error: ' + error.message + '</div>');
            }
        },
        error: function (xhr, status, error) {
            console.error(`API call error: ${xhr.status} - ${xhr.statusText}`, xhr.responseText);
            // $('#message-boardSales').append('<div class="post post-bot" style="color:red;">Error: ' + xhr.responseText + '</div>');
        }
    });
}


function fetchApiResponseMail(userMessage) {

    const apiKey = 'AIzaSyA8eYi79NUdP4aS1LWRHukeemWlKPFGMvU'; // Replace with your valid API key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const requestBody = {
        contents: [
            {
                parts: [
                    {
                        text: userMessage
                    }
                ]
            }
        ]
    };

    $.ajax({
        url: apiUrl,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(requestBody),
        success: function (response) {
            console.log('API response:', response);

            try {
                if (response && response.candidates && response.candidates.length > 0) {
                    if (response.candidates[0].content && response.candidates[0].content.parts && response.candidates[0].content.parts.length > 0) {
                        var botResponse = response.candidates[0].content.parts[0].text.trim(); // Get the text and trim any whitespace
                        console.log('Bot response:', botResponse); // Debugging line to check the response

                        // Call postBotSalesReply and ensure it works
                        postBotMailReply(botResponse);

                        // Add buttons after the bot response
                        $('#message-boardSales').append(`
                            <div class="action-buttons">
                                <button class="action-btn" data-action="review">Review</button>
                                <button class="action-btn" data-action="send">Send</button
                            </div>
                        `);

                        $s('P0_MAILBODY', botResponse);
                        userInputSalesState = 'awaiting_api_details';
                    } else {
                        console.error('Unexpected response format: Missing content parts');
                        postBotSalesReply('Unexpected response format: Missing content parts');
                    }
                } else {
                    console.error('Unexpected response format: Missing candidates array');
                    postBotSalesReply('Unexpected response format: Missing candidates array');
                }
            } catch (error) {
                console.error('Error processing response:', error);
                postBotSalesReply('Error processing response');
            }
        },
        error: function (xhr, status, error) {
            console.error(`API call error: ${xhr.status} - ${xhr.statusText}`, xhr.responseText);
            $('#message-boardSales').append('<div class="post post-bot" style="color:red;">Error: ' + xhr.responseText + '</div>');
        }
    });
}

function redirectToApexPage(orderno, orderdate) {

    const req_no = '1265';
    console.log('req_no found:', req_no);
    let compCode = '01';

    // Get the application ID and session ID from the APEX environment
    const appId = $v('pFlowId'); // Retrieves the Application ID
    const sessionId = $v('pInstance'); // Retrieves the Session ID

    // Define the target page number
    const pageNumber = '600';

    // Define the additional parameters
    const params = 'P600_COMP_CODE,P600_REQ_NO';
    const values = `${compCode},${req_no}`;

    // Construct the URL with the retrieved values and additional parameters
    const redirectURL = `f?p=${appId}:${pageNumber}:${sessionId}:::600:${params}:${values}`;
    console.log('Constructed URL:', redirectURL);

    // Redirect to the constructed URL
    window.location.href = redirectURL;

}

async function fetchApiResponseSalesEmail(context) {
    const apiUrl = 'http://192.168.5.190:5000/chat';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: context })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Assuming the API returns both subject and response separately
        const emailSubject = data.subject || 'Request for Price Revision Quotation';
        const emailBody = data.response;

        // Post the email response
        postBotSalesNewReply(emailBody);
        console.log(emailBody);

        // Add Review and Send buttons after the bot response
        $('#message-boardSales').append(`
            <div class="action-buttons">
                <button class="action-btn" data-action="review">Send</button>
                <button class="action-btn" data-action="send">Next</button>
                <button id="approval-btn" class="response-button" type="button">Action</button>
                <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                
            </div>
        `);

        // Update form fields with the subject and message
        $s('P0_MAIL_SUBJECT', emailSubject);
        $s('P0_MAILBODY', emailBody);

        userInputSalesState = 'awaiting_api_details';
        return emailBody; // Return the generated email template
    } catch (error) {
        throw new Error(`Error generating email template: ${error.message}`);
    }
}

async function fetchApipricevarianceEmail(context) {
    const apiUrl = 'http://192.168.5.190:5000/chat';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: context })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Assuming the API returns both subject and response separately
        const emailSubject = data.subject || 'Request for Price Revision Quotation';
        const emailBody = data.response;

        // Post the email response
        postBotSalesNewReply(emailBody);
        console.log(emailBody);

        // Add Review and Send buttons after the bot response
        $('#message-boardSales').append(`
            <div class="action-buttons">
              <button id="price-btn" class="action-btn" data-action = "review" type="button">Send</button>
<button id="price-btn" class="action-btn" type="button" data-action = "send">Next</button>
<button id="approval-btn" class="response-button" type="button">Action</button>
<button id="back-btn" class="response-button" type="button">Back to Menu</button>

                
            </div>
        `);


        // Update form fields with the subject and message
        $s('P0_MAIL_SUBJECT', emailSubject);
        $s('P0_MAILBODY', emailBody);

        userInputSalesState = 'awaiting_priceapi_details';
        return emailBody; // Return the generated email template
    } catch (error) {
        throw new Error(`Error generating email template: ${error.message}`);
    }
}

$('#message-boardSales').on('click', '.price-btn', function (event) {
    event.preventDefault(); // Prevent the default action
    const action = $(this).data('action');

    if (action === 'review') {
        console.log('Review button clicked');
        // openMailDialog();
        sendEmail1();
        // Implement review functionality here
    } else if (action === 'send') {
        console.log('Send button clicked');
        // postBotSalesReply(`Email sent to Supplier <b>Supplier A</b>`);
        // Implement send functionality here
        console.log("outstanding payment next button")
        setTimeout(() => {
            postBotSalesReply(`Action Has been taken on invoice number 0105 of customer ZEST LIMITED:
             
         <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    </div>
                    `);
        }, 500);
        userInputSalesState = 'awaiting_stockcovrge_details';

    }
});


async function fetchApierllydelEmail(context) {
    const apiUrl = 'http://192.168.5.190:5000/chat';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: context })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Assuming the API returns both subject and response separately
        const emailSubject = data.subject || 'Request for Price Revision Quotation';
        const emailBody = data.response;

        // Post the email response
        postBotSalesNewReply(emailBody);
        console.log(emailBody);

        // Add Review and Send buttons after the bot response
        $('#message-boardSales').append(`
            <div class="action-buttons">
                <button class="action-buttn" data-action="review">Send</button>
                <button class="action-buttn" data-action="send">Next</button>
                <button id="approval-btn" class="response-button" type="button">Action</button>
<button id="back-btn" class="response-button" type="button">Back to Menu</button>                
            </div>
        `);

        // Update form fields with the subject and message
        $s('P0_MAIL_SUBJECT', emailSubject);
        $s('P0_MAILBODY', emailBody);

        userInputSalesState = 'awaiting_apierly_details';
        return emailBody; // Return the generated email template
    } catch (error) {
        throw new Error(`Error generating email template: ${error.message}`);
    }
}

async function fetchApierlydelEmail(context) {
    const apiUrl = 'http://192.168.5.190:5000/chat';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: context })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Assuming the API returns both subject and response separately
        const emailSubject = data.subject || 'Request for Early Delivery';
        const emailBody = data.response;

        // Post the email response
        postBotSalesNewReply(emailBody);
        console.log(emailBody);

        // Add Review and Send buttons after the bot response
        $('#message-boardSales').append(`
            <div class="action-buttons">
                <button class="action-butn" data-action="review">Send</button>
                <button class="action-butn" data-action="send">Next</button>
                <button id="approval-btn" class="response-button" type="button">Action</button>
<button id="back-btn" class="response-button" type="button">Back to Menu</button>                
            </div>
        `);

        // Update form fields with the subject and message
        $s('P0_MAIL_SUBJECT', emailSubject);
        $s('P0_MAILBODY', emailBody);

        userInputSalesState = 'awaiting_apierly_details';
        return emailBody; // Return the generated email template
    } catch (error) {
        throw new Error(`Error generating email template: ${error.message}`);
    }
}

async function fetchApierlydeliveryEmail(context) {
    const apiUrl = 'http://192.168.5.190:5000/chat';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: context })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Assuming the API returns both subject and response separately
        const emailSubject = data.subject || 'Request for Early Delivery';
        const emailBody = data.response;

        // Post the email response
        postBotSalesNewReply(emailBody);
        console.log(emailBody);

        // Add Review and Send buttons after the bot response
        $('#message-boardSales').append(`
            <div class="action-buttons">
                <button class="acction-butn" data-action="review">Send</button>
                <button class="acction-butn" data-action="send">Next</button>
                <button id="approval-btn" class="response-button" type="button">Action</button>
         <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                
            </div>
        `);

        // Update form fields with the subject and message
        $s('P0_MAIL_SUBJECT', emailSubject);
        $s('P0_MAILBODY', emailBody);

        userInputSalesState = 'awaiting_apierly_details';
        return emailBody; // Return the generated email template
    } catch (error) {
        throw new Error(`Error generating email template: ${error.message}`);
    }
}

// Use event delegation to handle button clicks
$('#message-boardSales').on('click', '.acction-butn', function (event) {
    event.preventDefault(); // Prevent the default action
    const action = $(this).data('action');

    if (action === 'review') {
        console.log('Review button clicked');
        // openMailDialog();
        sendEmail1();
        // Implement review functionality here
    } else if (action === 'send') {
        console.log('Send button clicked');
        // postBotSalesReply(`Email sent to Supplier <b>GlowCo</b>`);
        // Implement send functionality here
        setTimeout(() => {
            postBotSalesReply(`Here is the remaining recommendations.
        <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">1.</span> Request a new quotation from a different supplier with a shorter lead time.
            </div>
            <br> Would you like to take action on any of the above recommendations? Please click on the preferred recommendation or respond with the corresponding number.
            <div class="response-buttons" style="margin-top: 10px;">
            <button id="approval-btn" class="response-button" type="button">Action</button>
                    <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    
                    </div>
        `);
        }, 500);
        userInputSalesState = 'awaiting_supleaded_details';
    }
});

function postBotSalesNewReply(reply) {
    // Define the bot image HTML
    var bot_img = '<img src="r/wsts/117/files/static/v272/chat_bot_icon.png" alt="bot" width="41" height="41">'

    // Replace asterisks with <strong> tags for bold text
    let formattedReply = reply.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Replace newline characters with paragraph breaks
    const paragraphs = formattedReply.split('\n').filter(p => p.trim() !== '');

    // Generate a unique ID for the current bot response container
    const responseContainerId = `bot-response-container-${Date.now()}`;

    // Container for the full HTML content with unique ID
    let htmlContent = `
        <div class="post post-bot">
            <div id="${responseContainerId}" class="bot-response-container"></div>
            ${timeStamp()}
            <div class="bott" style="position: absolute; top: 4px; left: -42px;">
                ${bot_img}
            </div>
        </div>
    `;

    // Append the container to the message board
    $("#message-boardSales").append(htmlContent);

    // Function to display text one word at a time with a delay
    function displayTextOneWordAtATime(text, elementId, delay = 100) {
        return new Promise((resolve) => {
            const words = text.split(' ');
            let wordIndex = 0;

            const interval = setInterval(() => {
                if (wordIndex < words.length) {
                    document.getElementById(elementId).innerHTML += words[wordIndex] + ' ';
                    wordIndex++;
                } else {
                    clearInterval(interval);
                    resolve();  // Resolve the promise when the paragraph is fully displayed
                }
            }, delay);
        });
    }

    // Function to display paragraphs one after the other
    async function displayParagraphsSequentially(paragraphs, containerId) {
        for (let i = 0; i < paragraphs.length; i++) {
            const paragraphId = `${containerId}-paragraph-${i}`;
            $(`#${containerId}`).append(`<div id="${paragraphId}" class="post-paragraph"></div>`);
            await displayTextOneWordAtATime(paragraphs[i], paragraphId); // Wait for the current paragraph to complete
        }

        // Scroll down after all paragraphs are added
        if (typeof $scrollSalesDown === 'function') {
            $scrollSalesDown();
        } else {
            console.warn('$scrollSalesDown function is not defined.');
        }
    }

    // Start displaying the paragraphs sequentially
    displayParagraphsSequentially(paragraphs, responseContainerId);
}

// function sendEmail() {
//             const body = $v("P0_MAILBODY")
//             const subject = $v("P0_MAIL_SUBJECT")
//             const email_id = ('Vaibhav@gmail.com')
//             const mailtoLink = `mailto:${encodeURIComponent(email_id)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
//             window.location.href = mailtoLink;
//         }


function sendEmail1(subject, body) {
    const email_id = 'mailto:kunal.kishor@essindia.com';  // Email address

    // Encode the body, but handle spaces and newlines manually
    let encodedBody = encodeURIComponent(body)
        .replace(/%20/g, ' ')
        .replace(/%0A/g, '\r\n');  // Handle newlines properly

    // Construct the mailto link
    const mailtoLink = `mailto:${email_id}?subject=${encodeURIComponent(subject)}&body=${encodedBody}`;

    // Log the mailto link for debugging purposes
    console.log("Mailto link: ", mailtoLink);

    // Open the mail client
    window.location.href = mailtoLink;


    setTimeout(() => {

        postBotSalesReply(` Mail has been sent to chris@manyana.com. Would you like to take actions on the remaining sales orders?
        <div class="response-button" style="margin-top: 5px;">
                <button id="yes-btn" class="response-button" type="butten">Yes</button>
                <button id="no-btn" class="response-button" type="butten">No</button>
                <button id="back-btn" class="response-button" type="button">Back to Menu</button>
        </div>
    `);
    }, 3000);
}

// Use event delegation to handle button clicks
$('#message-boardSales').on('click', '.action-btn', function (event) {
    event.preventDefault(); // Prevent the default action
    const action = $(this).data('action');

    if (action === 'review') {
        console.log('Review button clicked');
        // openMailDialog();
        sendEmail1();
        // Implement review functionality here
    } else if (action === 'send') {
        console.log('Send button clicked');
        // postBotSalesReply(`Email sent to Supplier <b>GlowCo</b>`);
        // Implement send functionality here
        console.log("next button of 1st option of tdl")

        if (userInputSalesState = 'awaiting_suplead_details') {
            setTimeout(() => {
                postBotSalesReply(`<span style="font-size: 1.6rem">Action has been taken on the sales order number 0135 of customer Manyana Ltd. </span> 
        <div class="response-buttons" style="margin-top: 10px;">
         <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            
        </div>`);
            }, 500);
        }

        else if (userInputSalesState = 'awaiting_invoice_details') {

            setTimeout(() => {
                postBotSalesReply(`Action has been taken on the invoice number 0115 of customer <b> CHINA TOWN LTD </b>.  
        <div class="response-buttons" style="margin-top: 10px;">
         <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            
        </div>`);
            }, 500);
        }
        userInputSalesState = 'awaiting_suplead_details';

        // Add click event listeners to response buttons
        $(document).on('click', '#yes-btn', function (event) {
            event.preventDefault();  // Prevent default action
            $('#messageSales').text("yes");
            $('#sendSales').click();
        });

    }


    else if (action === 'send' && userInputSalesState === 'awaiting_invoice_details') {
        console.log('Send button clicked');
        // postBotSalesReply(`Email sent to Supplier <b>GlowCo</b>`);
        // Implement send functionality here
        console.log("next button of 1st option of tdl")
        setTimeout(() => {
            postBotSalesReply(`Action has been taken on the invoice number 0115 of customer <b> CHINA TOWN LTD </b>.  
        <div class="response-buttons" style="margin-top: 10px;">
         <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            
        </div>`);
        }, 500);
        userInputSalesState = 'awaiting_suplead_details';

        // Add click event listeners to response buttons
        $(document).on('click', '#yes-btn', function (event) {
            event.preventDefault();  // Prevent default action
            $('#messageSales').text("yes");
            $('#sendSales').click();
        });

    }
});

$('#message-boardSales').on('click', '.action-bttn', function (event) {
    event.preventDefault(); // Prevent the default action
    const action = $(this).data('action');

    if (action === 'review') {
        console.log('Review button clicked');
        // openMailDialog();
        sendEmail1();
        // Implement review functionality here
    } else if (action === 'send') {
        console.log('Send button clicked');
        // postBotSalesReply(`Email sent to Supplier <b>Supplier A</b>`);
        // Implement send functionality here
        setTimeout(() => {
            postBotSalesReply(`Here is the remaining critical insight for Sales Order No. 0130:
                    <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                    <span style="font-weight: bold;">1.</span> 3 items have price variation from previous sales.
                    </div>
                    To review this insight in more detail, click on the link.
                    <div class="response-buttons" style="margin-top: 10px;">
                    <button id="approval-btn" class="response-button" type="button">Action</button>
         <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    
                    </div>
                    `);
        }, 500);
        userInputSalesState = 'awaiting_ordere_details';

        // Add click event listeners to response buttons
        $(document).on('click', '#yes-btn', function (event) {
            event.preventDefault();  // Prevent default action
            $('#messageSales').text("yes");
            $('#sendSales').click();
        });

    }
});

$('#message-boardSales').on('click', '.action-buttn', function (event) {
    event.preventDefault(); // Prevent the default action
    const action = $(this).data('action');

    if (action === 'review') {
        console.log('Review button clicked');
        // openMailDialog();
        sendEmail1();
        // Implement review functionality here
    } else if (action === 'send') {
        console.log('Send button clicked');
        // postBotSalesReply(`Email sent to Supplier <b>Supplier A</b>`);
        // Implement send functionality here
        setTimeout(() => {
            postBotSalesReply(`Here is the remaining critical insight for Sales Order No. 0130:
                    <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                    <span style="font-weight: bold;">1.</span> 3 items have price variation from previous sales.
                    </div>
                    To review this insight in more detail, click on the link.
                    `);
        }, 500);
        userInputSalesState = 'awaiting_ordere_details';

        // Add click event listeners to response buttons
        $(document).on('click', '#yes-btn', function (event) {
            event.preventDefault();  // Prevent default action
            $('#messageSales').text("yes");
            $('#sendSales').click();
        });

    }
});


// Use event delegation to handle button clicks
$('#message-boardSales').on('click', '.action-btttn', function (event) {
    event.preventDefault(); // Prevent the default action
    const action = $(this).data('action');

    if (action === 'review') {
        console.log('Review button clicked');
        // openMailDialog();
        sendEmail();
        // Implement review functionality here
    } else if (action === 'send') {
        console.log('Send button clicked');
        // postBotSalesReply(`Email sent to Supplier <b>GlowCo</b>`);
        // Implement send functionality here
        setTimeout(() => {
            postBotSalesReply(`
        <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">1.</span> The current delivery date for the order is 16-09-2024. Please request the supplier for early delivery of these items.
                
            </div>
            <div class="response-buttons" style="margin-top: 10px;">
            <button id="approval-btn" class="response-button" type="button">Action</button>
         <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    
                    </div>
        `);
        }, 500);
        userInputSalesState = 'awaiting_suplllead_details';

        // Add click event listeners to response buttons
        $(document).on('click', '#yes-btn', function (event) {
            event.preventDefault();  // Prevent default action
            $('#messageSales').text("yes");
            $('#sendSales').click();
        });

    }
});


// Use event delegation to handle button clicks
$('#message-boardSales').on('click', '.action-butn', function (event) {
    event.preventDefault(); // Prevent the default action
    const action = $(this).data('action');

    if (action === 'review') {
        console.log('Review button clicked');
        // openMailDialog();
        sendEmail1();
        // Implement review functionality here
    } else if (action === 'send') {
        console.log('Send button clicked');
        // postBotSalesReply(`Email sent to Supplier <b>GlowCo</b>`);
        // Implement send functionality here
        setTimeout(() => {
            postBotSalesReply(`Here is the remaining recommendations.
        <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">1.</span> Request a new quotation from a different supplier with a shorter lead time.
            </div>
            <br> Would you like to take action on any of the above recommendations? Please click on the preferred recommendation or respond with the corresponding number.
            <div class="response-buttons" style="margin-top: 10px;">
            <button id="approval-btn" class="response-button" type="button">Action</button>
                    <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    </div>
        `);
        }, 500);
        userInputSalesState = 'awaiting_suplead_details';

        // Add click event listeners to response buttons
        $(document).on('click', '#yes-btn', function (event) {
            event.preventDefault();  // Prevent default action
            $('#messageSales').text("yes");
            $('#sendSales').click();
        });

    }
});

function openMailDialog() {
    $('#mail').dialog('open');
}

async function fetchApiResponseInsight(context) {
    const apiUrl = 'http://192.168.5.190:5000/chat';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: 'Provide market data on cold cream for Indian Market with relevant statistics' })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const appointmsg = data.response;
        postBotSalesNewReply(appointmsg);
        console.log(appointmsg);
        // $s('P3_EMAIL_BODY_APPOINT',appointmsg);
        return appointmsg; // Assuming the API returns an email template in JSON format
    } catch (error) {
        throw new Error(`Error generating email template: ${error.message}`);
    }
}



function postBotMailReply(reply) {
    // Define the bot image HTML
    var bot_img = '<img src="r/wsts/117/files/static/v272/chat_bot_icon.png" alt="bot" width="41" height="41">'

    // Split the response into paragraphs using '\n' or another delimiter
    let paragraphs = reply.split('\n').filter(paragraph => paragraph.trim() !== '');

    // Combine the paragraphs into a single formatted string with appropriate line breaks
    let formattedReply = paragraphs.map(paragraph => `${paragraph.trim()}`).join('<br><br>');

    // Container to hold the full HTML content
    let htmlContent = `
        <div class="post post-bot">
            <div id="bot-response-container">
            </div>
            ${timeStamp()}
            <div class="bott" style="position: absolute; top: 4px; left: -42px;">
                ${bot_img}
            </div>
        </div>
    `;

    // Append the container to the message board
    $("#message-boardSales").append(htmlContent);

    // Function to display text one word at a time
    function displayTextOneWordAtATime(text, elementId, delay = 50) {
        const words = text.split(' ');
        let wordIndex = 0;

        const interval = setInterval(() => {
            if (wordIndex < words.length) {
                document.getElementById(elementId).innerHTML += words[wordIndex] + ' ';
                wordIndex++;
            } else {
                clearInterval(interval);
            }
        }, delay);
    }

    // Display the formatted reply word by word
    $("#bot-response-container").append(`<div id="formatted-reply" class="post-paragraph"></div>`);
    displayTextOneWordAtATime(formattedReply, 'formatted-reply');

    // Call the function to scroll down if it exists
    if (typeof $scrollSalesDown === 'function') {
        $scrollSalesDown();
    } else {
        console.warn('$scrollSalesDown function is not defined.');
    }
}

async function fetchApiResponseRFQEmail(context) {
    const apiUrl = 'http://192.168.5.190:5000/chat';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: context })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Assuming the API returns both subject and response separately
        const emailSubject = data.subject || 'Request for Quotation for Cold Cream,Pet Food,Mango Juice & Organic Vegetables';
        const emailBody = data.response;

        // Post the email response
        postBotRFQReply(emailBody);
        console.log(emailBody);

        // Add Review and Send buttons after the bot response
        $('#message-boardSales').append(`
            <div class="action-buttons">
                <button class="action-bttn" data-action="review">Send</button>
                <button class="action-bttn" data-action="send">Next</button>
                <button id="approval-btn" class="response-button" type="button">Action</button>
              <button id="back-btn" class="response-button" type="button">Back to Menu</button>  
            </div>
        `);

        // Update form fields with the subject and message
        $s('P0_MAIL_SUBJECT', emailSubject);
        $s('P0_MAILBODY', emailBody);

        userInputSalesState = 'awaiting_rfqapi_details';
        return emailBody; // Return the generated email template
    } catch (error) {
        throw new Error(`Error generating email template: ${error.message}`);
    }
}

async function fetchApiResponseRFQEEmail(context) {
    const apiUrl = 'http://192.168.5.190:5000/chat';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: context })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Assuming the API returns both subject and response separately
        const emailSubject = data.subject || 'Request for Quotation for Cold Cream,Pet Food,Mango Juice & Organic Vegetables';
        const emailBody = data.response;

        // Post the email response
        postBotRFQReply(emailBody);
        console.log(emailBody);

        // Add Review and Send buttons after the bot response
        $('#message-boardSales').append(`
            <div class="action-buttons">
                <button class="actionn-bttnn" data-action="review">Send</button>
                <button class="actionn-bttnn" data-action="send">Next</button>
                <button id="approval-btn" class="response-button" type="button">Action</button>
                <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            </div>
        `);

        // Update form fields with the subject and message
        $s('P0_MAIL_SUBJECT', emailSubject);
        $s('P0_MAILBODY', emailBody);

        userInputSalesState = 'awaiting_rfqqapii_details';
        return emailBody; // Return the generated email template
    } catch (error) {
        throw new Error(`Error generating email template: ${error.message}`);
    }
}

// Use event delegation to handle button clicks
$('#message-boardSales').on('click', '.actionn-bttnn', function (event) {
    event.preventDefault(); // Prevent the default action
    const action = $(this).data('action');

    if (action === 'review') {
        console.log('Review button clicked');
        // openMailDialog();
        sendEmail1();
        // Implement review functionality here
    } else if (action === 'send') {
        console.log('Send button clicked');
        // postBotSalesReply(`Email sent to Supplier <b>GlowCo</b>`);
        // Implement send functionality here
        console.log("next button of 2nd option in tdl")
        setTimeout(() => {
            postBotSalesReply(`Action has been taken on the Sales order No. 0130. <br>Do you want to take action on the other pending sales Order? <br> 
        <div class="response-buttons" style="margin-top: 10px;">
            <button id="yes-btn" class="response-button" type="butten">Yes</button>
            <button id="no-btn" class="response-button" type="butten">No</button>
   
         <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            
        </div>`);
        }, 500);
        userInputSalesState = 'awaiting_purchorder_details';

        // Add click event listeners to response buttons
        $(document).on('click', '#yes-btn', function (event) {
            event.preventDefault();  // Prevent default action
            $('#messageSales').text("yes");
            $('#sendSales').click();
        });

        $(document).on('click', '#no-btn', function (event) {
            event.preventDefault();  // Prevent default action
            $('#messageSales').text("no");
            $('#sendSales').click();
        });
    }
});


async function fetchApiResponseRFQQEmail(context) {
    const apiUrl = 'http://192.168.5.190:5000/chat';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: context })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Assuming the API returns both subject and response separately
        const emailSubject = data.subject || 'Request for Quotation for Cold Cream,Pet Food,Mango Juice & Organic Vegetables';
        const emailBody = data.response;

        // Post the email response
        postBotRFQReply(emailBody);
        console.log(emailBody);

        // Add Review and Send buttons after the bot response
        $('#message-boardSales').append(`
            <div class="action-buttons">
                <button class="action-btttn" data-action="review">Send</button>
                <button class="action-btttn" data-action="send">Next</button>
                <div class="response-buttons" style="margin-top: 10px;">
                <button id="approval-btn" class="response-button" type="button">Action</button>
        <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    
                    </div>
            </div>
            
        `);

        // Update form fields with the subject and message
        $s('P0_MAIL_SUBJECT', emailSubject);
        $s('P0_MAILBODY', emailBody);

        userInputSalesState = 'awaiting_rfqqapi_details';
        return emailBody; // Return the generated email template
    } catch (error) {
        throw new Error(`Error generating email template: ${error.message}`);
    }
}


async function fetchApiRFQEmail(context) {
    const apiUrl = 'http://192.168.5.190:5000/chat';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: context })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Assuming the API returns both subject and response separately
        const emailSubject = data.subject || 'Request for Quotation for Cold Cream,Pet Food,Mango Juice & Organic Vegetables';
        const emailBody = data.response;

        // Post the email response
        postBotRFQReply(emailBody);
        console.log(emailBody);

        // Add Review and Send buttons after the bot response
        $('#message-boardSales').append(`
            <div class="action-buttons">
                <button class="action-butttn" data-action="review">Send</button>
                <button class="action-butttn" data-action="send">Next</button>
                <div class="response-buttons" style="margin-top: 10px;">
                <button id="approval-btn" class="response-button" type="button">Action</button>
          <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    </div>
            </div>
            
        `);

        // Update form fields with the subject and message
        $s('P0_MAIL_SUBJECT', emailSubject);
        $s('P0_MAILBODY', emailBody);

        userInputSalesState = 'awaiting_rfqqapi_details';
        return emailBody; // Return the generated email template
    } catch (error) {
        throw new Error(`Error generating email template: ${error.message}`);
    }
}

// Use event delegation to handle button clicks
$('#message-boardSales').on('click', '.action-butttn', function (event) {
    event.preventDefault(); // Prevent the default action
    const action = $(this).data('action');

    if (action === 'review') {
        console.log('Review button clicked');
        // openMailDialog();
        sendEmail1();
        // Implement review functionality here
    } else if (action === 'send') {
        console.log('Send button clicked');
        // postBotSalesReply(`Email sent to Supplier <b>GlowCo</b>`);
        // Implement send functionality here
        setTimeout(() => {
            postBotSalesReply(`
        <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">1.</span> The current delivery date for the order is 16-09-2024. Please request the supplier for early delivery of these items.
                
            </div>
            <div class="response-buttons" style="margin-top: 10px;">
            <button id="approval-btn" class="response-button" type="button">Action</button>
                <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    </div>
        `);
        }, 500);
        userInputSalesState = 'awaiting_supllierlead_details';
    }
});



function postBotRFQReply(reply) {
    // Define the bot image HTML
    var bot_img = '<img src="r/wsts/117/files/static/v272/chat_bot_icon.png" alt="bot" width="41" height="41">'
    // Replace asterisks with <strong> tags for bold text
    let formattedReply = reply.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Replace newline characters with paragraph breaks
    const paragraphs = formattedReply.split('\n').filter(p => p.trim() !== '');

    // Generate a unique ID for the current bot response container
    const responseContainerId = `bot-response-container-${Date.now()}`;

    // Container for the full HTML content with unique ID
    let htmlContent = `
        <div class="post post-bot">
            <div id="${responseContainerId}" class="bot-response-container"></div>
            ${timeStamp()}
            <div class="bott" style="position: absolute; top: 4px; left: -42px;">
                ${bot_img}
            </div>
        </div>
    `;

    // Append the container to the message board
    $("#message-boardSales").append(htmlContent);

    // Function to display text one word at a time with a delay
    function displayTextOneWordAtATime(text, elementId, delay = 100) {
        return new Promise((resolve) => {
            const words = text.split(' ');
            let wordIndex = 0;

            const interval = setInterval(() => {
                if (wordIndex < words.length) {
                    document.getElementById(elementId).innerHTML += words[wordIndex] + ' ';
                    wordIndex++;
                } else {
                    clearInterval(interval);
                    resolve();  // Resolve the promise when the paragraph is fully displayed
                }
            }, delay);
        });
    }

    // Function to display paragraphs one after the other
    async function displayParagraphsSequentially(paragraphs, containerId) {
        for (let i = 0; i < paragraphs.length; i++) {
            const paragraphId = `${containerId}-paragraph-${i}`;
            $(`#${containerId}`).append(`<div id="${paragraphId}" class="post-paragraph"></div>`);
            await displayTextOneWordAtATime(paragraphs[i], paragraphId); // Wait for the current paragraph to complete
        }

        // Scroll down after all paragraphs are added
        if (typeof $scrollSalesDown === 'function') {
            $scrollSalesDown();
        } else {
            console.warn('$scrollSalesDown function is not defined.');
        }
    }

    // Start displaying the paragraphs sequentially
    displayParagraphsSequentially(paragraphs, responseContainerId);
}



function botSalesReply(userMessage) {
    const sessionId = $v('pInstance');
    if (!userMessage) return;
    const message = userMessage.trim().toLowerCase();
    console.log('message', message);


    if (message.includes('open')) {
        // Extract the command after 'open'
        const command = message.split('open ')[1];  // Get the command after 'open'

        // If there's a command, process it
        if (command) {
            console.log('command', command);
            processVCmd(command);  // Call the function to handle 'open' commands
            return;  // Exit the function after handling the command
        }
    }

    if (userInputSalesState === 'awaiting_todo_list' || userInputSalesState == ! 'awaiting_ordere_details' || userInputSalesState == ! 'awaiting_price_details') {
    if (message.includes('one') || message.includes('1') || message.includes('to do list for the day')) {
        let reply = [
            `<span style="font-size: 1.6rem">Here are the items on your to-do list:</span>`,
            `<div class="brply a2 todo-list">
        <div class="option1 todo-item" data-number="Approval pending for 3 sales orders">
            <div class="todo-text"><span><b>1.</b></span> Approval pending for 3 sales orders</div>
            <div class="todo-arrow">   <span class="right"></span></div>
        </div>
        <div class="option1 todo-item" data-number="2">
            <div class="todo-text"><span><b>2.</b></span> Daily review of the Sales Pipeline with the team</div>
            <div class="todo-arrow">   <span class="right"></span></div>
        </div>
        <div class="option1 todo-item" data-number="3">
            <div class="todo-text"><span><b>3.</b></span> Weekly review of sales targets vs. actual performance</div>
            <div class="todo-arrow">   <span class="right"></span></div>
        </div>
        <div class="option1 todo-item" data-number="4">
            <div class="todo-text"><span><b>4.</b></span> Monthly MIS reporting for stakeholders</div>
            <div class="todo-arrow">   <span class="right"></span></div>
        </div>
            <span style="font-size: 1.6rem">Would you like to take action on any of the above items ? Click on the option button or reply with the preferred option.</span>
        <div class="response-buttons" style="margin-top: 10px;">
     <button id="back-btn" class="response-button" type="button">Back to Menu</button></div>
    </div>`

        ];

        $(document).on('click', '.option1', function (event) {
            var number = $(this).data('number');
            $('#messageSales').text('Approval pending for 3 sales orders');
            $('#sendSales').click();
        });
        postBotSalesReply(reply);

        // postBotReply(``);

        userInputSalesState = 'awaiting_app_details';

        $(document).on('click', '#back-btn', function (event) {
            event.preventDefault();  // Prevent default action
            $('#messageSales').text("back to menu");
            $('#sendSales').click();
        });

        $(document).on('click', '#approval-btn', function (event) {
            event.preventDefault();  // Prevent default action
            $('#messageSales').text("action");
            $('#sendSales').click();
        });
        } else if ((message.includes('two') || message.includes('2') || message.includes('important updates for the day'))) {
            let reply = [
                `<span style="font-size: 1.6rem">Here are the important updates for the day:</span>
        <div class="todo-list brply a2" style="display: block; margin-top: 10px; font-size: 16px;">
          <div class="option1 todo-item" data-number="Outstanding payment USD 2,000,000 >180 days.">
                <div class="todo-text"><span><b>1.</b></span> Outstanding payment USD 2,000,000 >180 days. </div>
                <div class="todo-arrow">   <span class="right"></span></div>
            </div>
          <div class="option1 todo-item" data-number="Top quotation: Melcom Ltd, USD 150,000 with Peter.">
                <div class="todo-text"><span><b>2.</b></span> Top quotation: Melcom Ltd, USD 150,000 with Peter. </div>
                <div class="todo-arrow">   <span class="right"></span></div>
            </div>
            <div class="option1 todo-item" data-number="Monthly Sales: USD 500,000 against USD 700,000 target."> 
                <div class="todo-text"><span><b>3.</b></span> Monthly Sales: USD 500,000 against USD 700,000 target. </div>
                <div class="todo-arrow">   <span class="right"></span></div>
            </div>
           <div class="option1 todo-item" data-number="5 Quotation lost today worth USD 5,000,000.">
                <div class="todo-text"><span><b>4.</b></span> 5 Quotation lost today worth USD 5,000,000. </div>
                <div class="todo-arrow">   <span class="right"></span></div>
            </div>
             <div class="option1 todo-item" data-number="5 Invoices made awaiting deliveries..">
                <div class="todo-text"><span><b>5.</b></span> 5 Invoices made awaiting deliveries.. </div>
                <div class="todo-arrow">   <span class="right"></span></div>
            </div>
         
            <br>Would you like to take action on any of the above items? Please respond with the number of the item.
            <div class="response-buttons" style="margin-top: 10px;">
<button id="back-btn" class="response-button" type="button">Back to Menu</button></div>
        </div>`

            ];

            $(document).on('click', '.option1', function (event) {
                var number = $(this).data('number');
                $('#messageSales').text(number);
                $('#sendSales').click();
            });
            postBotSalesReply(reply);

            userInputSalesState = 'awaiting_updates_details';
        }
        else if ((message.includes('three') || message.includes('3') || message.includes('request insights'))) {
            let reply = [
                `<span style="font-size: 1.6rem">Here are the list of graph:</span>`,
                `<div class="brply a2 todo-list" style="display: block; margin-top: 10px; font-size: 16px;">
          <div class="option1 todo-item" data-number="1">
                <div class="todo-text"><span><b>1.</b></span> Product Groupwise Sales </div>
                <div class="todo-arrow">   <span class="right"></span></div>
            </div>
            <div class="option1 todo-item" data-number="2">
                <div class="todo-text"><span><b>2.</b></span> Customer Categorywise Sales </div>
                <div class="todo-arrow">   <span class="right"></span></div>
            </div>
             <div class="option1 todo-item" data-number="3">
                <div class="todo-text"><span><b>3.</b></span> Half Yearly Revenue </div>
                <div class="todo-arrow">   <span class="right"></span></div>
            </div>
            <div class="option1 todo-item" data-number="4">
                <div class="todo-text"><span><b>4.</b></span> Quarter Wise Revenue </div>
                <div class="todo-arrow">   <span class="right"></span></div>
            </div>
            <div class="option1 todo-item" data-number="5">
                <div class="todo-text"><span><b>5.</b></span> Month Wise Revenue </div>
                <div class="todo-arrow">   <span class="right"></span></div>
            </div>
            <br>Would you like to take action on any of the above items? Please respond with the number of the item.
            <div class="response-buttons" style="margin-top: 10px;">
         <button id="back-btn" class="response-button" type="button">Back to Menu</button></div>
        </div>`

            ];
            $(document).on('click', '.option1', function (event) {
                var number = $(this).data('number');
                $('#messageSales').text(number);
                $('#sendSales').click();
            });
            postBotSalesReply(reply);

            userInputSalesState = 'awaiting_graphinsight_details';
        }

        else if ((message.includes('four') || message.includes('4') || message.includes('erp assistance'))) {
    postBotSalesReply(`<span style="font-size: 1.6rem">This system is equipped with voice-enabled functionality. You can simply speak your commands, and I'll respond to help you accomplish your tasks.</span>`);

            $(document).on('click', '.option1', function (event) {
                var number = $(this).data('number');
                $('#messageSales').text(number);
                $('#sendSales').click();
            });
            postBotSalesReply(reply);

            userInputSalesState = 'awaiting_assistance_details';
        }
    }
    else if (message.includes('back')) {
        mainmenuSales();
        userInputSalesState = 'awaiting_start_details';
    }
    else if (message.includes('action')) {
        redirectToApexPage('00000118', '13-08-2024');
    }
    else if (userInputSalesState === 'awaiting_start_details' || userInputSalesState == ! 'awaiting_ordere_details' || userInputSalesState == ! 'awaiting_price_details') {
        if (message.includes('one') || message.includes('1')) {
            let reply = [
                `<span style="font-size: 1.3rem">Here are the items on your to-do list:</span>`,
                `<div class="brply a2" style="display: block; margin-top: 10px; font-size: 16px;">
            <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">1.</span> Approval pending for 4 Sales Orders.
            </div>
            <div class="option1" data-number="2" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">2.</span> GRN Completed - Pending bill Processing
            </div>
            <div class="option1" data-number="3" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">3.</span> Daily MIS to Manager
            </div>
            <div class="option1" data-number="4" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">4.</span> Weekly sales Order Delivery Tracking
            </div>
            <br><br>
            <span style="font-size: 1.3rem" >Would you like to take action on any of the above items? Please respond with the number of the item.</span>
            <div class="response-buttons" style="margin-top: 10px;">
         <button id="back-btn" class="response-button" type="button">Back to Menu</button></div>
        </div>`

            ];
            postBotSalesReply(reply);


            userInputSalesState = 'awaiting_app_details';

            $(document).on('click', '#back-btn', function (event) {
                event.preventDefault();  // Prevent default action
                $('#messageSales').text("back to menu");
                $('#sendSales').click();
            });
        } else if ((message.includes('two') || message.includes('2'))) {
            let reply = [
                `Here are the important updates for the day:`,
                `<div class="brply a2" style="display: block; margin-top: 5px; font-size: 16px;">
            <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">1.</span> Bill Due/Overdue Alert for Supplier Payments
            </div>
            <br>Would you like to take action on any of the above items? Please respond with the number of the item.
            <div class="response-buttons" style="margin-top: 10px;">
          <button id="back-btn" class="response-button" type="button">Back to Menu</button></div>
        </div>`

            ];

            $(document).on('click', '.option1', function (event) {
                var number = $(this).data('number');
                $('#messageSales').text(number);
                $('#sendSales').click();
            });
            postBotSalesReply(reply);

            userInputSalesState = 'awaiting_alert_details';
        }

        else if ((message.includes('three') || message.includes('3'))) {
            let reply = [
                `Here are the list of graph:`,
                `<div class="brply a2" style="display: block; margin-top: 10px; font-size: 16px;">
            <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">1.</span> sales order trend.
            </div>
            <div class="option1" data-number="2" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">2.</span> Month wise Consignment counting.
            </div>
            <div class="option1" data-number="3" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">3.</span> Month wise sales Bill Booked.
            </div>
            <div class="option1" data-number="4" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">4.</span> Top 5 Supplier
            </div>
            <br>Would you like to take action on any of the above items? Please respond with the number of the item.
            <div class="response-buttons" style="margin-top: 10px;">
         <button id="back-btn" class="response-button" type="button">Back to Menu</button>
</div>
        </div>`

            ];
            $(document).on('click', '.option1', function (event) {
                var number = $(this).data('number');
                $('#messageSales').text(number);
                $('#sendSales').click();
            });
            postBotSalesReply(reply);

            //  userInputSalesState = 'awaiting_graph_details';
            userInputSalesState = 'awaiting_graphinsight_details';
        }
    }
    else if (message.includes('back')) {

        fetchToDoSalesList();
        postBotSalesReply(reply);
        userInputSalesState = 'awaiting_start_details';
    }
    else if (message.includes('action')) {
        redirectToApexPage('00000118', '13-08-2024');
    }
    else {
        if (userInputSalesState === 'awaiting_app_details') {
            if (message === '1' || message.includes('approval pending for 3 sales orders') || message.includes('one') || message.includes('1')) {
                formatsalesOrders(salesOrderData);
                // displayPOappDetails();
                userInputSalesState = 'awaiting_order_details';
                console.log("order number 0135");
            } else if (message === '2' || message.includes('pending bill') || message.includes('2') || message.includes('two')) {
                generatePendingRFQsList();

            } else if (message === '3' || message.includes('daily mis to manager') || message.includes('') || message.includes('three')) {

                generatePendingQuotationsList();
                // userInputSalesState = 'awaiting_mis_details'; 
            } else if (message === '4' || message.includes('daily mis to manager') || message.includes('4') || message.includes('four')) {
                formatInvoiceData(invoiceData);
                userInputSalesState = 'awaiting_taskcomp_details';

                $(document).on('click', '#yes-btn', function (event) {
                    event.preventDefault();  // Prevent default action
                    $('#messageSales').text("yes");
                    $('#sendSales').click();
                });

                $(document).on('click', '#no-btn', function (event) {
                    event.preventDefault();
                    $('#messageSales').val("no");
                    $('#sendSales').click();
                });
            }
        }

        else if (userInputSalesState === 'awaiting_order_details') 
        {
            if (message === '1' || message.includes('select one') || message.includes('sales order no. 0130')) {
                postBotSalesReply(`<div style="font-size: 11px; margin-bottom: 10px;"></div>

                <div style="font-size: 1.6rem;">
                    What would you like to do next for Sales Order No. 0130?
                    <div class="response-buttons" style="margin-top: 8px;">
                        <button id="insight-btn" class="response-button" style="padding: 6px 12px; border-radius: 15px; color: white; border: none; cursor: pointer;" type="button">Insight</button>
                        <button id="approval-btn" class="response-button" style="padding: 6px 12px; border-radius: 15px; color: white; border: none; cursor: pointer;" type="button">Action</button>
                        <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    </div>
                </div>`
                );
                userInputSalesState = 'awaiting_insgt_details';
                $(document).on('click', '#insight-btn', function (event) {
                    event.preventDefault();  // Prevent default action
                    $('#messageSales').text("Insight");
                    $('#sendSales').click();
                });
            }


            else if (message === '2' || message.includes('select two')|| message.includes('sales order no. 0135')) {
                console.log("order number 0135");
                postBotSalesReply(`<div style="font-size: 11px; "></div>

                <div style="font-size: 17px;">
                    What would you like to do next for Sales Order No. 0135?
                    <div class="response-buttons" style="margin-top: 8px;">
                        <button id="insight-btn" class="response-button" style="padding: 6px 12px; border-radius: 15px; color: white; border: none; cursor: pointer;" type="button">Insight</button>
                        <button id="approval-btn" class="response-button" style="padding: 6px 12px; border-radius: 15px; color: white; border: none; cursor: pointer;" type="button">Action</button>
                        <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    </div>
                </div>`
                );
                userInputSalesState = 'awaiting_insgt0135_details';
                $(document).on('click', '#insight-btn', function (event) {
                    event.preventDefault();  // Prevent default action
                    $('#messageSales').text("Insight");
                    $('#sendSales').click();
                });
            }


            else if (message === '3' || message.includes('select three') || message.includes('sales order no. 0145')) {
                console.log("order number 0135");
                postBotSalesReply(`<div style="font-size: 11px; margin-bottom: 10px;"></div>

                <div style="font-size: 17px;">
                    What would you like to do next for Sales Order No. 0145?
                    <div class="response-buttons" style="margin-top: 8px;">
                        <button id="insight-btn" class="response-button" style="padding: 6px 12px; border-radius: 15px; color: white; border: none; cursor: pointer;" type="button">Insight</button>
                        <button id="approval-btn" class="response-button" style="padding: 6px 12px; border-radius: 15px; color: white; border: none; cursor: pointer;" type="button">Action</button>
                        <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    </div>
                </div>`
                );
                userInputSalesState = 'awaiting_insgt0145_details';
                $(document).on('click', '#insight-btn', function (event) {
                    event.preventDefault();  // Prevent default action
                    $('#messageSales').text("Insight");
                    $('#sendSales').click();
                });
            }
        } 
        
        
        else if (userInputSalesState === 'awaiting_insight_details') {
            if (message === '1' || message.includes('one') || message.includes('1') || message.includes('send mail')) {
                formatsalesstockItems(salesOrderitem);
                console.log("order number 0135");
            } else if (message === '2' || message.includes('two') || message.includes('2')) {
                formatsalesPriceIItems(poPriceVeriance);
                console.log("order number 0135");
            }

        } else if (userInputSalesState === 'awaiting_taskcomp_details') {
            if (message.includes('yes')) {
                postBotSalesReply(` OK, Your task has been complete.
                <div class="response-buttons" style="margin-top: 10px;">
                    <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    </div>     
        `);

            } else if (message.includes('no')) {
                // formatsalesPriceIItems(poPriceVeriance);    
            }
        }
        else if (userInputSalesState === 'awaiting_insgt_details') 
        {
            if (message === '1' || message.includes('insight')) {
                    postBotSalesReply(`No insights for Sales Order No. 0130

                    <div class="response-buttons" style="margin-top: 10px;">
                    <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    </div>   `);
                console.log("insight 1");
            }

        } else if (userInputSalesState === 'awaiting_insgt0135_details') {
            if (message.includes('insight')){
                  formatsalesOrdersInsight(salesOrderDataInsight);
            
            }
        }
          else if (userInputSalesState === 'awaiting_insgt0145_details'){
                if (message.includes('insight')){
                 postBotSalesReply(`No insights for Sales Order No. 0145
                    <div class="response-buttons" style="margin-top: 10px;">
                    <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    </div>   `);
            }
          }
        
        else if (userInputSalesState === 'awaiting_newquot_details') {
            if (message === '1' || message.includes('insight')) {
                formatsalesOrdersInsight(salesOrderDataInsight);
            }
        } else if (userInputSalesState === 'awaiting_stockcovrge_details') {
            if (message === '1' || message.includes('one') || message.includes('1')) {
                formatsalesstockItems(salesOrderitem);
            }
        }

        else if (userInputSalesState === 'awaiting_delivery_details') {

            if (message === '1' || message.includes('one') || message.includes('1')) {
                // getsalesOrderDetails(1);
                // Display the datepicker input
                const calendarHtml = '<input type="text" id="datepicker" placeholder="Select a date" style="width: 116px;border-radius: 5px;">';
                // postBotSalesReply(`Please select the preferred delivery date ${calendarHtml}`);
                // postBotSalesReply('do you want to send a reminder email to customer to reduce the outstanding balance?');
                formatDueOverdueBills(dueoverduebills);
                fetchApipricevarianceEmail('Request HOD to clear ₹5,000,000 to approve sales order. Include table: Invoice #0105 (30-Nov-2023): ₹3M, 8 months; Invoice #0115 (30-Dec-2023): ₹2M, 7 months' + salesOrderitem);
                console.log("Fourth option of to-do-list")
                // sendEmail();

                let selectedDateId = null;
                // Initialize datepicker and handle date selection
                $("#datepicker").datepicker({
                    onSelect: function (dateText) {
                        // Display the selected date
                        if (selectedDateId) {
                            $(`#${selectedDateId}`).text(`You have selected: ${dateText} as the delivery date. <br> Reason - High demand`);
                        } else {
                            selectedDateId = `date-${new Date().getTime()}`;
                            postBotSalesReply(`<div id="${selectedDateId}">You have selected: ${dateText} as the delivery date. <br> Reason - High demand</div>`);
                            // Post the question for price variation after selecting the date
                            setTimeout(() => {
                                postBotSalesReply(`Would you like to send an email to the supplier requesting early delivery for these items?<br> 
                    <div class="response-buttons" style="margin-top: 10px;">
                    <button id="yes-btn" class="response-button" type="button">Yes</button>
                     <button id="no-btn" class="response-button" type="button">No</button>
                    </div>`);
                                userInputSalesState = 'awaiting_erlymail_details';
                            }, 500);
                        }

                        // Bind click events to the price variation buttons
                        $(document).on('click', '#yes-btn', function (event) {
                            event.preventDefault();  // Prevent default action
                            $('#messageSales').text("yes");
                            $('#sendSales').click();
                        });

                        $(document).on('click', '#no-btn', function (event) {
                            event.preventDefault();
                            $('#messageSales').val("no");
                            $('#sendSales').click();
                        });
                    }
                });
            }

            else if (message === '2' || message.includes('two') || message.includes('2')) {
                formatsalesleadsuppItemss(salessuppleaditem);
            }
        }
        else if (userInputSalesState === 'awaiting_suplllead_details') {

            if (message === '1' || message.includes('one') || message.includes('1')) {
                // getsalesOrderDetails(1);
                // Display the datepicker input
                const calendarHtml = '<input type="text" id="datepicker" placeholder="Select a date" style="width: 116px;border-radius: 5px;">';
                // postBotSalesReply(`Please select the preferred delivery date ${calendarHtml}`);
                //  postBotSalesReply('do you want to send a reminder email to customer to reduce the outstanding balance?');  not working
                formatDueOverdueBills(dueoverduebills);
                fetchApipricevarianceEmail('Request HOD to clear ₹5,000,000 to approve sales order. Include table: Invoice #0105 (30-Nov-2023): ₹3M, 8 months; Invoice #0115 (30-Dec-2023): ₹2M, 7 months' + salesOrderitem);
                console.log("Fifth option of to-do-list")
                // sendEmail();

                let selectedDateId = null;
                // Initialize datepicker and handle date selection
                $("#datepicker").datepicker({
                    onSelect: function (dateText) {
                        // Display the selected date
                        if (selectedDateId) {
                            $(`#${selectedDateId}`).text(`You have selected: ${dateText} as the delivery date. <br> Reason - High demand`);
                        } else {
                            selectedDateId = `date-${new Date().getTime()}`;
                            postBotSalesReply(`<div id="${selectedDateId}">You have selected: ${dateText} as the delivery date.<br> Reason - High demand</div>`);
                            // Post the question for price variation after selecting the date
                            setTimeout(() => {
                                postBotSalesReply(`Would you like to send an email to the supplier requesting early delivery for these items?<br> 
                    <div class="response-buttons" style="margin-top: 10px;">
                    <button id="yes-btn" class="response-button" type="button">Yes</button>
                     <button id="no-btn" class="response-button" type="button">No</button>
                    </div>`);
                                userInputSalesState = 'awaiting_erlyymail_details';
                            }, 500);
                        }

                        // Bind click events to the price variation buttons
                        $(document).on('click', '#yes-btn', function (event) {
                            event.preventDefault();  // Prevent default action
                            $('#messageSales').text("yes");
                            $('#sendSales').click();
                        });

                        $(document).on('click', '#no-btn', function (event) {
                            event.preventDefault();
                            $('#messageSales').val("no");
                            $('#sendSales').click();
                        });
                    }
                });
            }

            else if (message === '2' || message.includes('two') || message.includes('2')) {
                formatsalesleadsupplierItemss(salessuppleaditem);
            }
        } else if (userInputSalesState === 'awaiting_deliveryy_details') {
            if (message === '1' || message.includes('one') || message.includes('1')) {
                // Display the datepicker input
                const calendarHtml = '<input type="text" id="datepicker" placeholder="Select a date" style="width: 116px;border-radius: 5px;">'; //WORKING 
                // postBotSalesReply(`Please select the preferred delivery date ${calendarHtml}`);
                // postBotSalesReply('Do you want to send a reminder email to customer to clear the outstanding balance?');
                formatDueOverdueBills(dueoverduebills);
                console.log("sixth option of to-do-list")
                // fetchApipricevarianceEmail('Request HOD to clear ₹5,000,000 to approve sales order. Include table: Invoice #0105 (30-Nov-2023): ₹3M, 8 months; Invoice #0115 (30-Dec-2023): ₹2M, 7 months'+ salesOrderitem);

                // sendEmail();
                let selectedDateId = null;
                // Initialize datepicker and handle date selection
                $("#datepicker").datepicker({
                    onSelect: function (dateText) {
                        // Display the selected date
                        if (selectedDateId) {
                            $(`#${selectedDateId}`).text(`You have selected: ${dateText} as the delivery date. <br> Reason - High demand`);
                        } else {
                            selectedDateId = `date-${new Date().getTime()}`;
                            postBotSalesReply(`<div id="${selectedDateId}">You have selected: ${dateText} as the delivery date. <br> Reason - High demand</div>`);
                            // Post the question for price variation after selecting the date
                            setTimeout(() => {
                                postBotSalesReply(`Would you like to send an email to the supplier requesting early delivery for these items?<br> 
                    <div class="response-buttons" style="margin-top: 10px;">
                    <button id="yes-btn" class="response-button" type="button">Yes</button>
                     <button id="no-btn" class="response-button" type="button">No</button>
                    </div>`);
                                userInputSalesState = 'awaiting_erlymaill_details';
                            }, 500);
                        }

                        // Bind click events to the price variation buttons
                        $(document).on('click', '#yes-btn', function (event) {
                            event.preventDefault();  // Prevent default action
                            $('#messageSales').text("yes");
                            $('#sendSales').click();
                        });

                        $(document).on('click', '#no-btn', function (event) {
                            event.preventDefault();
                            $('#messageSales').val("no");
                            $('#sendSales').click();
                        });
                    }
                });
            }

            else if (message === '2' || message.includes('two') || message.includes('2')) {
                formatsalesleadsuppItemss(salessuppleaditem);
            }
        } else if (userInputSalesState === 'awaiting_supllierlead_details') {

            if (message === '1' || message.includes('one') || message.includes('1')) {
                // getsalesOrderDetails(1);
                // Display the datepicker input
                const calendarHtml = '<input type="text" id="datepicker" placeholder="Select a date" style="width: 116px;border-radius: 5px;">';
                // postBotSalesReply(`Please select the preferred delivery date ${calendarHtml}`); postBotSalesReply('Please select the user to whom you would like to send the email.');
                postBotSalesReply('do you want to send a reminder email to customer to clear the outstanding balance?');
                formatDueOverdueBills(dueoverduebills);
                console.log("seventh option of to-do-list")
                //fetchApipricevarianceEmail('Request HOD to clear ₹5,000,000 to approve sales order. Include table: Invoice #0105 (30-Nov-2023): ₹3M, 8 months; Invoice #0115 (30-Dec-2023): ₹2M, 7 months'+ salesOrderitem);

                // sendEmail();

                let selectedDateId = null;
                // Initialize datepicker and handle date selection
                $("#datepicker").datepicker({
                    onSelect: function (dateText) {
                        // Display the selected date
                        if (selectedDateId) {
                            $(`#${selectedDateId}`).text(`You have selected: ${dateText} as the delivery date. <br> Reason - High demand`);
                        } else {
                            selectedDateId = `date-${new Date().getTime()}`;
                            postBotSalesReply(`<div id="${selectedDateId}">You have selected: ${dateText} as the delivery date.<br> Reason - High demand</div>`);
                            // Post the question for price variation after selecting the date
                            setTimeout(() => {
                                postBotSalesReply(`Would you like to send an email to the supplier requesting early delivery for these items?<br> 
                    <div class="response-buttons" style="margin-top: 10px;">
                    <button id="yes-btn" class="response-button" type="button">Yes</button>
                     <button id="no-btn" class="response-button" type="button">No</button>
                    </div>`);
                                userInputSalesState = 'awaiting_erlyymail_details';
                            }, 500);
                        }

                        // Bind click events to the price variation buttons
                        $(document).on('click', '#yes-btn', function (event) {
                            event.preventDefault();  // Prevent default action
                            $('#messageSales').text("yes");
                            $('#sendSales').click();
                        });

                        $(document).on('click', '#no-btn', function (event) {
                            event.preventDefault();
                            $('#messageSales').val("no");
                            $('#sendSales').click();
                        });
                    }
                });
            }

            else postBotSalesReply('no task please give correct ')
        }

        else if (userInputSalesState === 'awaiting_erlymail_details') {
            if (message === 'no' || message.includes('no')) {
                // getsalesOrderDetails(1);
                // fetchApiResponseInsight('recommendations for the Cold Cream product for business purposes');
                setTimeout(() => {
                    postBotSalesReply(`Here is the remaining recommendations.
                <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">1.</span> Request a new quotation from a different supplier with a shorter lead time.
                </div>
                <br> Would you like to take action on any of the above recommendations? Please click on the preferred recommendation or respond with the corresponding number.
                <div class="response-buttons" style="margin-top: 10px;">
                <button id="approval-btn" class="response-button" type="button">Action</button>
                    <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    
                    </div>     
        `);
                }, 500);
                // userInputSalesState = 'awaiting_ordere_details';
                userInputSalesState = 'awaiting_suplead_details';
            }
            else if (message === 'yes' || message.includes('yes')) {

            }
        } else if (userInputSalesState === 'awaiting_erlymaill_details') {
            if (message === 'no' || message.includes('no')) {
                setTimeout(() => {
                    postBotSalesReply(`Here is the remaining recommendations.
                <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">1.</span> Request a new quotation from a different supplier with a shorter lead time.
                </div>
                <br> Would you like to take action on any of the above recommendations? Please click on the preferred recommendation or respond with the corresponding number.
                <div class="response-buttons" style="margin-top: 10px;">
                <button id="approval-btn" class="response-button" type="button">Action</button>
         <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    </div>     
        `);
                }, 500);
                userInputSalesState = 'awaiting_supleaded_details';
            }

        }
        else if (userInputSalesState === 'awaiting_apierly_details') {
            fetchApierlydelEmail(`Summarize write a email to supplier(Kunal) to the supplier requesting early delivery for the item- Cold Cream,Pet Food & Mango Juice,Organic Vegetables Against sales order no 0130, Current delivery date 30-09-2024,reason for high demand, Upadted date 27-09-2024, regrds Saurav Sharma without subject` + message);
        }
        else if (userInputSalesState === 'awaiting_erlyymail_details') {
            if (message === 'no' || message.includes('no')) {
                // getsalesOrderDetails(1);
                // fetchApiResponseInsight('recommendations for the Cold Cream product for business purposes');
                setTimeout(() => {
                    postBotSalesReply(`Here is the remaining critical insight for Sales Order No. 0130:
                    <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                    <span style="font-weight: bold;">1.</span> 3 items have price variation from previous sales.
                    </div>
                    To review this insight in more detail, click on the link.
                    `);
                }, 500);
                userInputSalesState = 'awaiting_ordere_details';
            }

        }
        else if (userInputSalesState === 'awaiting_apierly_details') {
            fetchApierllydelEmail(`Summarize write a email to supplier(Kunal) to the supplier requesting early delivery for the item- Cold Cream,Pet Food & Mango Juice,Organic Vegetables Against sales order no 0130, Current delivery date 30-09-2024, Upadted date 27-09-2024,reason for high demand, regrds Saurav Sharma without subject` + message);
        }

        else if (userInputSalesState === 'awaiting_ordere_details') {
            if (message === '1' || message.includes('one') || message.includes('1')) {
                formatDueOverdueBills(dueoverduebills);
                console.log("Make a call")
            }
        }

        else if (userInputSalesState === 'awaiting_price_details') {
            if (message === '1' || message.includes('glowco')) {
                fetchApiResponseInsight('recommendations for the Cold Cream product for business purposes');
                console.log("cold cream product")
            }
            else if (message === 'send email' || message.includes('send') | message.includes('yes')) { // --> sending email for the first option of the to-do-list
                postBotSalesNewReply(`<b>Customer Name</b>:ACHELIS (TANGANYIKA) LIMITED<br><b>Email id</b>: Vaibhav@gmail.com<br> <b>Subject</b>:Request to Clear outstanding balance then to approve the current <br><br>Here is the draft email to customer to clear the outstanding payment `)
                fetchApiResponseSalesEmail('Request Vaibhav to clear ₹5,000,000 to approve sales order. Include table: Invoice #0105 (30-Nov-2023): ₹3M, pending 8 months; Invoice #0115 (30-Dec-2023): ₹2M, pending 7 months. Regards, Saurav Sharma without subject' + poPriceVeriance);
                console.log("First option of to-do-list")
            }
        } else if (userInputSalesState === 'awaiting_secondprice_details') {
            if (message === 'send email' || message.includes('send') | message.includes('yes')) {
                // postBotSalesNewReply(`<b>Customer Name</b>: ACHIELIS TANGANYIKA LIMITED<br><b>Email id</b>: sabir.khan@ebizframe.com<br> <b>Subject</b>:Request to reduce outstanding balance then to approve the current <br><br>Here is the draft email for supplier requesting an early delivery.`)
                fetchApipricevarianceEmail('Request HOD to clear ₹5,000,000 to approve sales order. Include table: Invoice #0105 (30-Nov-2023): ₹3M, 8 months; Invoice #0115 (30-Dec-2023): ₹2M, 7 months' + salesOrderitem);
                console.log("second option of to-do-list")
            }
        }

        else if (userInputSalesState === 'awaiting_suplead_details') {
            if (message === '1' || message === 'one' || message.includes('one') || message.includes('1')) {
                // getsalesOrderDetails(1);
                console.log('achlies ltd');
                formatsalesleadsuppItems(salessuppleaditem);

            }
        } else if (userInputSalesState === 'awaiting_supleaded_details') {

            if (message === '1' || message === 'one' || message.includes('one') || message.includes('1')) {
                // getsalesOrderDetails(1);
                console.log('zest ltd');
                formatsalesleadsuppItems2nd(salessuppleaditem);

            }
        }

        else if (userInputSalesState === 'awaiting_purchapp_details') {
            if (message === '1' || message.includes('glowco')) {
                // getsalesOrderDetails(1);
                fetchApiResponseInsight('recommendations for the Cold Cream product for business purposes');
            }
            else if (message === 'yes' || message.includes('yes')) {
                // getsalesOrderDetails(1);
                postBotMailReply('sales Order has been approved.');
                // fetchApiResponseRFQEmail('write a email to supplier(Kunal Kishor) for a request for quotation for items- Face Wash & Fresh Herbs, regrds Saurav Sharma');
                // // userInputSalesState ='awaiting_supplead_details';
            }
        }

        else if (userInputSalesState === 'awaiting_supplirlead_details') {
            if (message === '1' || message.includes('glowco')) {
                // getsalesOrderDetails(1);
                fetchApiResponseInsight('recommendations for the Cold Cream product for business purposes');
            }
            else if (message === 'yes' || message.includes('yes')) {
                // getsalesOrderDetails(1);
                let reply = [
                    `Here are the items on your to-do list:`,
                    `<div class="brply a2" style="display: block; margin-top: 10px; font-size: 16px;">
            <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">1. </span> Approval pending for 4 Sales Orders.
            </div>
            <div class="option1" data-number="2" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">2.</span> GRN Completed - Pending bill Processing.
            </div>
            <div class="option1" data-number="3" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">3.</span> Run month-end close activity.
            </div>
            <div class="option1" data-number="4" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">4.</span> Month-end close is pending for two days.
            </div>
            <div class="option1" data-number="5" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">4.</span> Weekly sales Order Delivery Tracking
            </div>
            <div class="response-buttons" style="margin-top: 10px;">
 <button id="back-btn" class="response-button" type="button">Back to Menu</button></div>
        </div>`
                ];
                postBotSalesReply(reply);
                userInputSalesState = 'awaiting_app_details';
            }
        }

        else if (userInputSalesState === 'awaiting_rfq_details') {
            if (message === '1' || message.includes('one') || message.includes('1')) {
                // generateRFQDetails();
                // formatRFQItems();
                postBotSalesNewReply(`<b>Customer Name</b>:ZEST LIMITED<br><b>Email id</b>: Vaibhav@gmail.com<br> <b>Subject</b>:Request to Clear the outstanding payment<br><br>Here is the draft email to customer to clear the outstanding payment `)
                fetchApipricevarianceEmail('"Write a strict email requesting the customer to clear an outstanding payment of ₹3,000,000 (invoice 0105, dated 30-Nov-2023, pending 8 months). Include a table with relevant invoice details. State that clearing dues is necessary to proceed with further transactions, without mentioning service continuity or future transactions. End with "Best regards" and a courteous sign-off."');
                console.log("Third option of to-do-list")
            } else if (message === '2' || message.includes('two') || message.includes('2')) {
                // generateRFQDetails();
                fetchApibilldetails('wrte a message to be displayed, GRN receip no 25, GRN receipt date 10 days ago, GRN value 	4,237,288.14, credit days 30 supplier -ACHELIS (TANGANYIKA) LIMITED and average bill processing days 16');
            }
        } else if (userInputSalesState === 'awaiting_mail_details') {
            if (message === '1') {
                postBotSalesReply('Here is the draft email to the team with a request to reassess the addition of CoolSkin for Cold Cream:');
                fetchApiResponseMail('draft email to the team with a request to reassess the addition of CoolSkin for Cold Cream');
            }
        }
        else if (userInputSalesState === 'awaiting_api_details') {
            // fetchApiResponseMail('draft email to the team with a request to reassess the addition of CoolSkin for Cold Cream' + message);
            fetchApiResponseSalesEmail('Summarize write a email to supplier(Kunal) to get a price revision quotation for items- 1.Soda, 2.Apple Juice & 3.Organic Fruits, Last Price - 1. 30,2. 120, 3. 300 & Current Price - 1. 40, 2. 130, 3. 320 regrds Saurav Sharma without subject' + message);
        }
        else if (userInputSalesState === 'awaiting_rfqapi_details') {
            // fetchApiResponseMail('draft email to the team with a request to reassess the addition of CoolSkin for Cold Cream' + message);
            // fetchApiResponseSalesEmail('write a email to supplier(Kunal Kishor) to get a price revision quotation for items- Soda,Apple Juice & Organic Fruits, regrds Saurav Sharma without subject' + message);
            fetchApiResponseRFQEmail('Summarize write a email to supplier(Anil) for a request for quotation for items- Cold Cream,Pet Food,Mango Juice & Organic Vegetables which we wnat to scheduled data 27-09-2024 regrds Saurav Sharma without subject' + message);
        } else if (userInputSalesState === 'awaiting_rfqqapi_details') {
            // fetchApiResponseMail('draft email to the team with a request to reassess the addition of CoolSkin for Cold Cream' + message);
            // fetchApiResponseSalesEmail('write a email to supplier(Kunal Kishor) to get a price revision quotation for items- Soda,Apple Juice & Organic Fruits, regrds Saurav Sharma without subject' + message);
            fetchApiResponseRFQQEmail('Summarize write a email to supplier(Anil) for a request for quotation for items- Cold Cream,Pet Food,Mango Juice & Organic Vegetables which we wnat to scheduled data 27-09-2024 regrds Saurav Sharma without subject' + message);
        }

        else if (userInputSalesState === 'awaiting_salesapp_details') {
            if (message === 'yes') {
                postBotSalesReply('sales Order 001 has been Approved');
            }
        } else if (userInputSalesState === 'awaiting_graph_details') {
            if (message.includes('one') || message.includes('1')) {
                let reply = [
                    `Here are the list of graph:`,
                    `<div class="brply a2" style="display: block; margin-top: 10px; font-size: 16px;">
            <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">1.</span> sales Order Trend.
            </div>
            <br><br>Would you like to take action on any of the above items? Please respond with the number of the item.
            <div class="response-buttons" style="margin-top: 10px;">
         <button id="back-btn" class="response-button" type="button">Back to Menu</button></div>
        </div>`

                ];
                postBotSalesReply(reply);
                userInputSalesState = 'awaiting_graphinsight_details';
            }
        } else if (userInputSalesState === 'awaiting_graphinsight_details') {
            if (message.includes('one') || message.includes('1')) {
                //  fetchgraphData();
                ProductGroupwiseSales();
            } else if (message.includes('two') || message.includes('2')) {
                customerCategoryWiseSales();
            } else if (message.includes('three') || message.includes('3')) {
                fetchHalfYearlyRevenue();
            } else if (message.includes('four') || message.includes('4')) {
                fetchQuarterWiseRevenue();
            }
            else if (message.includes('five') || message.includes('5')) {
                fetchMonthWiseSales();
            } 
            // else if (message.includes('yes') || message.includes('')  || message.includes('yes')) {
            //         if (graphData.length > 0) {
            //        const formattedContext = Object.entries(graphData)
            //         .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
            //         .join('\n');
            //       fetchSalesApilangchain(`GSI${sessionId}`,`Given the following product group wise sales pie chart data:${formattedContext}\nPlease analyze this data and provide the summarize insights or Recommendations in 250 words.`);
            //     } else {
            //     console.error('No graph data available');
            // }
            // }
            else {
                postBotSalesReply('No details found');
            }
        // } else if (userInputSalesState === 'awaiting_graphinsigh_details') {
        //     if (message.includes('yes')) {
        //         // generateGraphTemplate(graphData);
        //         console.log("hey i am working here");
        //         if (graphData.length > 0) {
        //             // generateGraphTemplate(graphData);
        //             fetch(graphData);
        //             console.log("hey i am working here");
        //         } else {
        //             console.error('No graph data available');
        //         }
        //    }
        }

             else if (userInputSalesState === 'awaiting_graphinsight_details_productwise') {
             if (message.includes('yes')) {
                     if (graphData.length > 0) {
                   const formattedContext = Object.entries(graphData)
                    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
                    .join('\n');
                  fetchSalesApilangchain(`GSI${sessionId}`,`Given the following productwise sales data:${formattedContext}\nPlease analyze this data and provide the summarize insights or Recommendations in 250 words.`);
                } else {
                console.error('No graph data available');
            }
            } 
         }


            else if (userInputSalesState === 'awaiting_graphinsight_details_customer') {
             if (message.includes('yes') || message.includes('yes')) {
                     if (graphData.length > 0) {
                   const formattedContext = Object.entries(graphData)
                    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
                    .join('\n');
                  fetchSalesApilangchain(`GSI${sessionId}`,`Given the following customer category wise sales data:${formattedContext}\nPlease analyze this data and provide the summarize insights or Recommendations in 250 words.`);
                } else {
                console.error('No graph data available');
            }
            } 
         }


            else if (userInputSalesState === 'awaiting_graphinsight_details_halfyearly') {
             if (message.includes('yes') || message.includes('yes')) {
                     if (graphData.length > 0) {
                   const formattedContext = Object.entries(graphData)
                    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
                    .join('\n');
                  fetchSalesApilangchain(`GSI${sessionId}`,`Given the following half yearly revenue data:${formattedContext}\nPlease analyze this data and provide the summarize insights or Recommendations in 250 words.`);
                } else {
                console.error('No graph data available');
            }
            } 
         }



               else if (userInputSalesState === 'awaiting_graphinsight_details_quarterly') {
             if (message.includes('yes') || message.includes('yes')) {
                     if (graphData.length > 0) {
                   const formattedContext = Object.entries(graphData)
                    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
                    .join('\n');
                  fetchSalesApilangchain(`GSI${sessionId}`,`Given the following quarterly yearly revenue data:${formattedContext}\nPlease analyze this data and provide the summarize insights or Recommendations in 250 words.`);
                } else {
                console.error('No graph data available');
            }
            } 
         }



            else if (userInputSalesState === 'awaiting_graphinsight_details_monthly') {
             if (message.includes('yes') || message.includes('yes')) {
                     if (graphData.length > 0) {
                   const formattedContext = Object.entries(graphData)
                    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
                    .join('\n');
                  fetchSalesApilangchain(`GSI${sessionId}`,`Given the following monthly revenue data:${formattedContext}\nPlease analyze this data and provide the summarize insights or Recommendations in 250 words.`);
                } else {
                console.error('No graph data available');
            }
            } 
         }



            else if (userInputSalesState === 'awaiting_apiinsight_response') {
            fetchSalesApilangchain(`GSI${sessionId}`,message);
        }

         else if (userInputSalesState === 'awaiting_alert_details') {
            if (message.includes('one') || message.includes('1')) {
                formatexpitems(dueoverduebills);
            }
            if (userInputSalesState === 'awaiting_alert_details') {
                if (message.includes('two') || message.includes('2')) {
                    formatAcquiredCustomers(customerAcquired);
                }
            }
        } else if (userInputSalesState === 'awaiting_alertrecm_details') {
            if (message.includes('one') || message.includes('1')) {
                fetchduebillEmail('Summarize write a email to account user(Rohit Kumar) release the payment to avoid delays, Bill no - 10, supplier- HIGHTECH PVT. LTD, bill amount - 4,237,288.14, and due date 09-10-2024 regrds Saurav Sharma');
            }
        }
        else if (userInputSalesState === 'awaiting_bill_details') {
            if (message.includes('yes')) {
                // postBotSalesReply('Please select the user to whom you would like to send the email.');
                generateOptions(tasks);
            }
        } else if (userInputSalesState === 'awaiting_username_details') {
            if (message.includes('one') || message.includes('1')) {
                postBotSalesReply('You have selected Rohan Kumar');
                fetchpendingbillEmail('Summarize write a email to user(Rohan Kumar) mentioning to book sales bils for already done GRNs, with GRN value of 18,29,500 ,and GRN number 15 and suppier ABC DISTRIBUTORS with credit days of 21 and my average bill processing to payment release time is 15 days, and GRN date is 8 days ago regrds Saurav Sharma without subject');

            } else if (message.includes('two') || message.includes('2')) {
                postBotSalesReply('You have selected Anil Kumar');
                fetchpendingbillEmail('Summarize write a email to user(Anil Kumar) mentioning to book sales bils for already done GRNs, with GRN value of 18,29,500 ,and GRN number 15 and suppier ABC DISTRIBUTORS with credit days of 21 and my average bill processing to payment release time is 15 days, and GRN date is 8 days ago regrds Saurav Sharma without subject');
            }
        } else if (userInputSalesState === 'awaiting_rembill_details') {
            if (message.includes('yes')) {
                generatePendingRFQsList();

            } else if (message.includes('No')) {


            }
        } else if (userInputSalesState === 'awaiting_quotation_details') {
            if (message.includes('one') || message.includes('1')) {
                createCallUI();

            } else if (message.includes('two') || message.includes('2')) {
                postBotSalesReply('working');

            }
        }

        else if (userInputSalesState === 'awaiting_updates_details') {
            if (message.includes('one') || message.includes('1') || message.includes('outstanding payment USD 2,000,000 >180 days.')) {
                console.log('salestoconversion function');
                salesToConversion();
            }

            else if (message.includes('two') || message.includes('2') || message.includes('top quotation: Melcom Ltd, USD 150,000 with Peter.')) {
                console.log('newCustomerAcquired function');
                newCustomerAcquired();
            }

            else if (message.includes('three') || message.includes('3') || message.includes('monthly Sales: USD 500,000 against USD 700,000 target.')) {
                console.log('newCustomerAcquired function');
                topCustomerOfTheDay();
            }

            


        }


        else {
            const reply = generateReply(message); // Generic reply generation
            if (typeof reply === "string") {
                postBotSalesReply(reply);
            } else {
                createCallUI();
                console.log("ye kya kar raha hai")
                reply.forEach(str => postBotSalesReply(str));
            }
        }
    }
}


function displayTaskDetails(taskcode) {
    console.log('taskcode', taskcode);
    const compCode = $v('P0_COMP_CODE');
    const userCode = $v('P0_USERCODE');
    // const userCode = $v('P0_USERCODE');
    $.ajax({
        url: 'http://192.168.5.190:8080/ords/wsts/account_dtl/subtodolist?compcode=' + compCode + '&usercode=' + userCode + '&taskcode=' + taskcode,
        method: 'GET',
        success: function (subtodolist) {
            console.log("Sub to-do list fetched successfully:", subtodolist);
            const subtodolistdata = subtodolist.items;
            // Process and display subtodolistdata here
            if (subtodolistdata.length > 0) {
                let detailHtml = '<div class="brply a2" style="display: block;">';
                // detailHtml =  'Here are the items for your to-do list:'

                subtodolistdata.forEach((task, index) => {
                    detailHtml += `<div class="optionSales2" data-taskcode="${task.taskcode}" data-index="${index}"><span style="font-weight: bold;">${index + 1}.</span> ${task.taskname}</div>`;
                });

                detailHtml += '</div>';
                postBotSalesNewReply('Here are the items for your to-do list:');
                setTimeout(() => {
                    postBotSalesReply(detailHtml + `<br>Would you like to take action on any of the above items? Please respond with the number of the item.`);
                    // postBotSalesNewReply(`Would you like to take action on any of the above items? Please respond with the number of the item.`)

                }, 1100);
                userInputSalesState = 'awaiting_order_details';

                $(document).off('click', '.optionSales2');

                $(document).on('click', '.optionSales2', function (event) {
                    event.preventDefault(); // Prevent default link behavior
                    const taskcode = $(this).data("taskcode");
                    const index = $(this).data("index");
                    const task = subtodolistdata[index];
                    if (task) {
                        $('#messageSales').text(`${index + 1}`);
                        $('#sendSales').click();
                    }
                });

            } else {
                postBotSalesReply("No related tasks found.");
            }
        },
        error: function (xhr, status, error) {
            console.error(error);
            const reply = "Error fetching suggested items. Please try again later.";
            postBotSalesNewReply(reply);
        }
    });
}


async function generateGraphTemplate(contextData) {
    console.log('contextData', contextData);
    const apiUrl = 'http://192.168.5.190:5000/chat';

    // Format the context data into a more readable string
    const formattedContext = Object.entries(contextData)
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join('\n');

    console.log('formattedContext', formattedContext);

    const promptMessage = `Given the following sales and payment order booking data:\n${formattedContext}\n\nPlease analyze this data and provide the summarize insights or explanations about the trends.`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: promptMessage })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.response) {
            throw new Error('No response data received');
        }

        console.log(data.response);
        postBotSalesNewReply(data.response);

        userInputSalesState = 'awaiting_apiinsight_details';
        return data.response;

    } catch (error) {
        console.error('Error generating graph analysis:', error);
        postBotSalesReply('Failed to generate graph analysis. Please try again later.');
        return null;
    }
}


function getsalesOrderDetails(orderId) {
    const salesOrder = {
        supplierName: 'GlowCo',
        item: 'Cold Cream',
        quantity: 150,
        pricePerUnit: 135,
        totalCost: 20250,
        vat: 18,
        insights: {
            leadTime: 'The lead time for Cold Cream is 7 days, but the current stock coverage is 4 days, however the last order was delayed by 2 days.',
            priceVariation: 'The last sales price was ₹130, now increased to ₹135, showing a 3.8% increase.',
            paymentTerms: 'The payment cycle is 30 days, usually settled in 35 days.',
            seasonalDemand: "Based on your store's sales history, Cold Cream typically experiences a 20% increase in demand during the summer months. Consider increasing your order quantity to 180 units to meet the projected demand.",
            profitMargin: 'The current profit margin for Cold Cream is 25%. By negotiating a 5% discount with GlowCo, you could increase your margin to 28.75%, potentially generating an additional ₹1,125 in profit for this order.',
            marketTrends: "There's a growing trend towards organic and natural skincare products. Consider expanding your range of Cold Creams to include organic options to capture this market segment.",
            supplierPerformance: 'GlowCo has maintained a 95% on-time delivery rate over the past 6 months, with an average delay of 1.5 days for late deliveries. Their product quality rating is 4.7 out of 5 based on customer feedback.',
            competitiveAnalysis: 'Your main competitor, BeautyZone, currently prices similar Cold Cream products at ₹150 per unit. Maintaining your current price point of ₹135 could give you a competitive edge in the market.',
            inventoryTurnover: 'The inventory turnover ratio for Cold Cream is 8, which is above the industry average of 6. This indicates efficient inventory management for this product.'
        }
    };

    let details = `<h3>Details of sales Order ${orderId}</h3>`;
    details += `<ul>`;
    details += `<li><b>Supplier Name:</b> ${salesOrder.supplierName}</li>`;
    details += `<li><b>Item:</b> ${salesOrder.item}</li>`;
    details += `<li><b>Quantity:</b> ${salesOrder.quantity}</li>`;
    details += `<li><b>Price per Unit:</b> ₹${salesOrder.pricePerUnit}</li>`;
    details += `<li><b>Total Cost:</b> ₹${salesOrder.totalCost}</li>`;
    details += `<li><b>VAT:</b> ${salesOrder.vat}%</li>`;
    details += `</ul>`;

    details += `<h4>Insights on sales Order ${orderId}:</h4>`;
    details += `<ul>`;
    details += `<li><b>Lead Time:</b> ${salesOrder.insights.leadTime}</li>`;
    details += `<li><b>Price Variation:</b> ${salesOrder.insights.priceVariation}</li>`;
    details += `<li><b>Payment Terms:</b> ${salesOrder.insights.paymentTerms}</li>`;
    details += `<li><b>Seasonal Demand:</b> ${salesOrder.insights.seasonalDemand}</li>`;
    details += `<li><b>Profit Margin:</b> ${salesOrder.insights.profitMargin}</li>`;
    details += `<li><b>Market Trends:</b>${salesOrder.insights.marketTrends}</li>`;
    details += `<li><b>Supplier Performance:</b> ${salesOrder.insights.supplierPerformance}</li>`;
    details += `<li><b>Competitive Analysis:</b> ${salesOrder.insights.competitiveAnalysis}</li>`;
    details += `<li><b>Inventory Turnover:</b> ${salesOrder.insights.inventoryTurnover}</li>`;
    details += `</ul>`;
    details += `Do you want to Approved sales Order?</li>`;

    postBotSalesReply(details);
    // postBotSalesReply('Do you want to Approved sales Order?');
    userInputSalesState = 'awaiting_salesapp_details';
    $(document).on('click', '.recommendation-link', function (event) {
        event.preventDefault();
        const recommendationIndex = $(this).data('recommendation');
        handleRecommendationAction(recommendationIndex);
    });

}

function generateRFQDetails() {
    const rfqDetails = `
        <h3>Details of RFQ 1</h3>
        <h4>Supplier Information:</h4>
        <ul>
            <li><strong>Supplier Name:</strong> GlowCo</li>
            <li><strong>Item:</strong> Cold Cream</li>
            <li><strong>Quantity:</strong> 150</li>
            <li><strong>Price per Unit:</strong> ₹145</li>
        </ul>
        <h4>Insights on RFQ 1:</h4>
        <ul>
            <li><strong>Price Increase:</strong> The quoted price of ₹145 is 7.4% higher than our last sales price of ₹135.</li>
            <li><strong>Market Comparison:</strong> The average market price for similar products is ₹142, making this quote slightly above market rate.</li>
            <li><strong>Alternative Offers:</strong> Supplier CoolSkin offers Cold Cream at ₹140 per unit with similar quality.</li>
            <li><strong>Supplier Performance:</strong> GlowCo has an average delivery rating but offers a loyalty bonus for large orders.</li>
            <li><strong>Demand Forecast:</strong> Based on historical data, we expect a 15% increase in Cold Cream sales over the next quarter.</li>
            <li><strong>Profit Margin Impact:</strong> At this price, our profit margin would decrease from 25% to 22%, resulting in a potential profit loss of ₹450 for this order.</li>
        </ul>
        <h4>Recommendations:</h4>
        <ol>
            <li>Reassess Addition: Reconsider adding an alternative offer from CoolSkin to RFQ.</li>
            <li>Loyalty Discount: Discuss potential loyalty discounts for frequent orders with GlowCo.</li>
            <li>Bulk Order: Consider increasing the order quantity to 200 units to potentially qualify for bulk discounts.</li>
            <li>Price Negotiation: Attempt to negotiate the price down to ₹140 per unit, which would maintain our current profit margin.</li>
            <li>Long-term Contract: Explore the possibility of a long-term contract with GlowCo to secure better pricing.</li>
        </ol>
        <p>Do you want to take action on any of the above recommendations? Respond with the item number.</p>
    `;

    postBotSalesReply(rfqDetails);
    userInputSalesState = 'awaiting_mail_details';

    // Set up event listeners for user actions based on recommendations
    $(document).on('click', '.recommendation-link', function (event) {
        event.preventDefault();
        const recommendationIndex = $(this).data('recommendation');
        handleRecommendationAction(recommendationIndex);
    });
}

function postBotSalesReply(reply) {
    var bot_img = '<img src="r/wsts/117/files/static/v272/chat_bot_icon.png" alt="bot" width="41" height="41">'
    const html = `<div class="post post-bot">${reply + timeStamp()}
                    <div class="bott" style="position: absolute;top: -7px; left:-42px;">${bot_img}</div>
                </div>`;
    const timeTyping = 500 + Math.floor(Math.random() * 2000);
    $("#message-boardSales").append(html);
    $scrollSalesDown();
}


const salesOrderData = {
    orders: [
        {
            id: '0130',
            supplier: 'ACHIELIS TANGANYIKA LIMITED',
            item: 'Cold Cream',
            qty: 20,
            price: 135,
            vat: 18,
            date: '25-11-2021',
            sentBy: 'Supervisor',
            creditLimitUsage: '60%',
            orderValue: '$120,000'
        },
        {
            id: '0135',
            supplier: 'Manyana Ltd.',
            item: 'Cold Cream',
            qty: 15,
            price: 135,
            vat: 18,
            date: '26-11-2021',
            sentBy: 'Supervisor',
            creditLimitUsage: '90%',
            orderValue: '$168,000'
        },
        {
            id: '0145',
            supplier: 'KINYARA SUGARS LIMITED',
            item: 'Pet Food',
            qty: 50,
            price: 75,
            vat: 12,
            date: '01-12-2021',
            sentBy: 'Supervisor',
            creditLimitUsage: '30%',
            orderValue: '$95,000'
        }
    ],
    marketInsight: 'The FMCG sector has shown a 7% growth this quarter, with personal care and organic products leading the trend.'
};


const salesOrderitem = {
    customers: [
        { id: '001', name: 'ACHIELIS TANGANYIKA LIMITED', outstandingAmount: 5000000, timeSince: '2 months' }
    ],
};


// const expiring2Month = {
//     expiritem: [
//         { id: '12', item: 'Shaving Cream 80gm', stockQty: 500, expirydate: '15th Nov 2024' },
//     ],
// };

const customerAcquired = {
    customers: [
        {
            acquiredMonth: "Sep’2024",
            customerName: "Alfred Company",
            value: 660000
        },
        {
            acquiredMonth: "Sep’2024",
            customerName: "Shoprite Company",
            value: 390000
        }
    ],
    totalValue: 1050000 // Sum of all customer values
};


// const dueoverduebills = {
//     duebill: [
//         { id: '1', supplier: 'ACHELIS (TANGANYIKA) LIMITED', billno: 10, billamt: '4,237,288.14', duedate: '09-10-2024' },
//         // { id: '2', supplier: 'HIGHTECH PVT. LTD', billno: 12, billamt: '6,537,000.14',duedate:'09-10-2024'}
//     ],
// };


const salesOrderDataInsight = {
    insights: [
        { id: '1', item: 'Only $50,000 is available against total credit limit of $500,000' },
        { id: '2', item: '80% payment of ACME is overdue by 180 days' }
    ],

};

// const poPriceVeriance = {
//     priceitems: [
//         { id: '004', item: 'Soda', lastprice: 30, currentprice: 40, variance: '33.33%' },
//         { id: '005', item: 'Apple Juice', lastprice: 120, currentprice: 130, variance: '8.33%' },
//         { id: '006', item: 'Organic Fruits', lastprice: 300, currentprice: 320, variance: '6.67%' }
//     ],
// };


const salessuppleaditem = {
    suppleaditems: [
        { id: '001', item: 'Face Wash', currectleadtime: 7, othersuppiler: 'Supplier A', leadtime: 5 },
        { id: '002', item: 'Fresh Herbs', currectleadtime: 7, othersuppiler: 'Supplier B', leadtime: 6 },
        // { id: '003', item: 'Grape Juice', currectleadtime: 7, othersuppiler: 'Supplier C', leadtime: 5 },
        // { id: '004', item: 'Hand Lotion', currectleadtime: 7, othersuppiler: 'Supplier D', leadtime: 6 }
    ],
};

function displayPOappDetails(taskcode) {
    const compCode = $v('P0_COMP_CODE');
    const userCode = $v('P0_USERCODE');
    // if (taskcode === 320101) {
    $.ajax({
        url: `http://192.168.5.190:8080/ords/wsts/account_dtl/poapprove?compcode=${compCode}&usercode=${userCode}`,
        method: 'GET',
        success: function (poappist) {
            console.log("PO Approval list fetched successfully:", poappist);
            poappistdata = poappist.items;

            formatsalesOrders(poappistdata);

            window.reqdetails = poappistdata.map(item => ({
                orderno: item.orderno,
                reqno: item.reqno,
                orderdate: item.orderdate,
                suppcode: item.suppcode
            }));

        },
        error: function (xhr, status, error) {
            console.error("Error fetching PO items:", error);
            postBotSalesReply("Error fetching PO items. Please try again later.");
        }
    });
    // } else {
    //     postBotSalesNewReply('No details found.')
    // }
}

function formatAcquiredCustomers(data) {
    let formattedText = `
        <div class="customer-list" style="font-family: Arial, sans-serif; color: #333; margin-bottom: 20px;">
            <b>The following customers were acquired:</b>
            
            <div style="overflow-x: auto; margin-top: 10px;">
                <table class="styled-table" style="width: 100%; border-collapse: collapse; min-width: 600px;">
                    <thead>
                        <tr style="background-color: #f2f2f2; text-align: left;">
                            <th style="padding: 8px; width: 40px;">#</th>
                            <th style="padding: 8px; min-width: 150px;">Acquired Month</th>
                            <th style="padding: 8px; min-width: 200px;">Customer Name</th>
                            <th style="padding: 8px; min-width: 150px;">Value</th>
                        </tr>
                    </thead>
                    <tbody style="background-color: #fff;">
    `;

    data.customers.forEach((customer, index) => {
        formattedText += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 8px; text-align: center;">${index + 1}.</td>
                <td style="padding: 8px;">${customer.acquiredMonth}</td>
                <td style="padding: 8px;">
                    <a href="#" class="customer-item" data-index="${index}" style="color: #007bff; text-decoration: none;">
                        ${customer.customerName}
                    </a>
                </td>
                <td style="padding: 8px;">${customer.value.toLocaleString()}</td>
            </tr>`;
    });

    formattedText += `
                    </tbody>
                </table>
            </div>

            <div style="margin-top: 20px;">
                <b>Total Value of Acquired Customers:</b> ${data.totalValue.toLocaleString()}
            </div>
        </div>
    `;
}

function formatexpitems(data) {
    let formattedText = `
        <div class="quote-list" style="font-family: Arial, sans-serif; color: #333; margin-bottom: 20px;">
            <b>The following quotes are available:</b>
            
            <div style="overflow-x: auto; margin-top: 10px;">
                <table class="styled-table" style="width: 100%; border-collapse: collapse; min-width: 600px;">
                    <thead>
                        <tr style="background-color: #f2f2f2; text-align: left;">
                            <th style="padding: 8px; width: 40px;">#</th>
                            <th style="padding: 8px; min-width: 150px;">Customer</th>
                            <th style="padding: 8px; min-width: 100px;">Quote No</th>
                            <th style="padding: 8px; min-width: 120px;">Quote Value</th>
                            <th style="padding: 8px; min-width: 150px;">Sales Order Value</th>
                            <th style="padding: 8px; min-width: 110px;">Conversion %</th>
                            <th style="padding: 8px; min-width: 100px;">Quote Date</th>
                        </tr>
                    </thead>
                    <tbody style="background-color: #fff;">
    `;

    data.quotes.forEach((quote, index) => {
        formattedText += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 8px; text-align: center;">${index + 1}.</td>
                <td style="padding: 8px;">
                    <a href="#" class="quote-item" data-index="${index}" style="color: #007bff; text-decoration: none;">
                        ${quote.customer}
                    </a>
                </td>
                <td style="padding: 8px;">${quote.quotno}</td>
                <td style="padding: 8px;">${quote.quotval.toLocaleString()}</td>
                <td style="padding: 8px;">${quote.salesorderval.toLocaleString()}</td>
                <td style="padding: 8px;">${quote.conversion}</td>
                <td style="padding: 8px;">${quote.quotdate}</td>
            </tr>`;
    });

    formattedText += `
                    </tbody>
                </table>
            </div>

            <div style="margin-top: 20px;">
                <b>Total Quote Value:</b> ${data.totals.totalquotval.toLocaleString()} <br />
                <b>Total Sales Order Value:</b> ${data.totals.totalsalesorderval.toLocaleString()} <br />
                <b>Overall Conversion %:</b> ${data.totals.totalconversion}
            </div>
        </div>
    `;




    // Post the formatted Sales Orders list
    postBotSalesReply(formattedText);

    setTimeout(() => {
        postBotSalesReply(`Would you like to take action on any of the above Bill Due/Overdue? Please click on the preferred Bill Due/Overdue or respond with the corresponding number
                <div class="response-buttons" style="margin-top: 5px;">
         <button id="back-btn" class="response-button" type="button">Back to Menu</button></div>
    `);
    }, 1000);

    userInputSalesState = 'awaiting_alertrecm_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function (event) {
        event.preventDefault(); // Prevent default link behavior
        console.log('Link clicked'); // Check if the click event is triggered
        const index = parseInt($(this).data('index'), 10);
        const order = data.duebill[index];
        if (order) {
            $('#messageSales').text(`${index + 1}`);
            $('#sendSales').click();
        }
    });
}



function formatsalesOrders(data) {
    let formattedText = `
        <div class="sales-order-list" style="font-family: Arial, sans-serif; color: #333; margin-bottom: 20px;">
           <span style="font-size: 1.6rem"> Here is the list of Sales Orders pending for your approval: </span>
            <table class="styled-table" style=";width: 100%;border-collapse: collapse;margin-top: 10px;/* padding: 8px 12px; *//* text-align: center; *//* vertical-align: middle; */">
                <thead>
                    <tr style="background-color: #f2f2f2; text-align: left;">
                        <th style="padding: 8px; width: 30px;">#</th>
                        <th style="padding: 2px;text-align: center;  width: 70px;">Order</th>
                        <th style="padding: 8px;">Customer</th>
                        <th style="padding: 8px;">Order value</th>
                    </tr>
                </thead>
                <tbody style="background-color: #fff;">
    `;

    data.orders.forEach((order, index) => {
        formattedText += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 8px;">${index + 1}.</td>
                <td style="padding: 2px; text-align: center;">
                    <a href="#" class="order-item" data-index="${index}" style="color: #007bff; text-decoration: none;">
                        ${order.id}
                    </a>
                </td>
                <td style="padding: 8px;">${order.supplier}</td>
                <td style="padding: 8px; text-align: center;">${order.orderValue}</td>
            </tr>`;
    });

    formattedText += `
                </tbody>
            </table>
        </div>
    `;

    // Post the formatted Sales Orders list
    postBotSalesReply(formattedText);

    // Post additional instruction
    postBotSalesReply(`
            <span style="font-size: 1.6rem">To review the Sales Orders, click on the order link or reply with the corresponding number.</span>
            <div class="response-buttons" style="margin-top: 10px;">
         <button id="back-btn" class="response-button" type="button">Back to Menu</button></div>
    `);

    userInputSalesState = 'awaiting_order_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function (event) {
        event.preventDefault(); // Prevent default link behavior
        console.log('Link clicked'); // Check if the click event is triggered
        const index = parseInt($(this).data('index'), 10);
        const order = data.orders[index];
        // const order = data[index];
        if (order) {
            $('#messageSales').text(`Sales order no. ${order.id}`);
            $('#sendSales').click();
        }
    });
}
$(document).on('click', '#back-btn', function (event) {
    event.preventDefault();  // Prevent default action
    $('#messageSales').text("back to menu");
    $('#sendSales').click();
});


function formatsalesOrdersInsight(data) {
    let formattedText = `<div class="sales-order-list" style=" font-size: 16px;">`;

    formattedText += `<div> Here's order summary of order number 0135:  </div>
<table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px; font-family: Arial, sans-serif;">
        <thead>
            <tr style="background-color: #f2f2f2;">
                <th style="padding: 8px; text-align: left; width: 50px;">Sr No.</th>
                <th style="padding: 8px; text-align: left; width: 100px;">Item Code</th>
                <th style="padding: 8px; text-align: left; width: 140px;">Item Name</th>
                <th style="padding: 8px; text-align: right; width: 109px;">Quantity</th>
                <th style="padding: 8px; text-align: right; width: 100px;">Unit Price</th>
                <th style="padding: 8px; text-align: right; width: 120px;">Total Price</th>
            </tr>
        </thead>
       <tbody style="background-color: #fff;">
    <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 8px;">1</td>
        <td style="padding: 8px;">MBL12</td>
        <td style="padding: 8px;">Maybelline Lipgloss 12gm</td>
        <td style="padding: 8px;">200</td>
        <td style="padding: 8px; text-align: right;">100</td>
        <td style="padding: 8px; text-align: right;">20,000</td>
    </tr>
    <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 8px;">2</td>
        <td style="padding: 8px;">DIO10</td>
        <td style="padding: 8px;">Dior perfume 100ml</td>
        <td style="padding: 8px; ">100</td>
        <td style="padding: 8px; text-align: right;">150</td>
        <td style="padding: 8px; text-align: right;">15,000</td>
    </tr>
    <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 8px;">3</td>
        <td style="padding: 8px;">SEP10</td>
        <td style="padding: 8px;">Sephore lipgloss 10gm</td>
        <td style="padding: 8px;">300</td>
        <td style="padding: 8px; text-align: right;">100</td>
        <td style="padding: 8px; text-align: right;">30,000</td>
    </tr>
    <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 8px;">4</td>
        <td style="padding: 8px;">INF50</td>
        <td style="padding: 8px;">Inisfree serum 50ml</td>
        <td style="padding: 8px; ">200</td>
        <td style="padding: 8px; text-align: right;">180</td>
        <td style="padding: 8px; text-align: right;">36,000</td>
    </tr>
    <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 8px;">5</td>
        <td style="padding: 8px;">TBS50</td>
        <td style="padding: 8px;">The body shop lipstick 50gm</td>
        <td style="padding: 8px; ">200</td>
        <td style="padding: 8px; text-align: right;">150</td>
        <td style="padding: 8px; text-align: right;">30,000</td>
    </tr>
    <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 8px;">6</td>
        <td style="padding: 8px;">GAR10</td>
        <td style="padding: 8px;">Garnier charcoal mask 100gm</td>
        <td style="padding: 8px; ">250</td>
        <td style="padding: 8px; text-align: right;">150</td>
        <td style="padding: 8px; text-align: right;">37,500</td>
    </tr>
    <tr style="font-weight: bold;">
        <td colspan="5" style="padding: 8px; text-align: right;">Total</td>
        <td style="padding: 8px; text-align: right;">1,68,500</td>
    </tr>
</tbody>

    </table>
`

    formattedText += `Critical Insights for Sales Order No 0135:`;
    formattedText += '<ul class="styled-list" style="list-style-type: disc; padding-left: 20px; margin-top: 10px; font-size: 16px;">';

    data.insights.forEach((order) => {
        formattedText += `
            <li style="margin-bottom: 8px;">
                ${order.item}
            </li>`;
    });

    formattedText += '</ul>';

    formattedText += `</div>`;

    // Post the insights table
    postBotSalesReply(formattedText);

    // Post EVA recommendations
    postBotSalesReply(`
       <span style="font-size: 1.6rem"> EVA Recommendations : </span>
        <div class="brply a2 todo-list" style="display: block; margin-top: 10px; font-size: 16px;">
            <div class="option1 todo-item" data-number=" Send mail to customer to clear outstanding of atleast 1,20,000 for us to approve his recent order" >
                <div class = "todo-text"><span><b>1.</b></span> Send mail to customer to clear outstanding of atleast 1,20,000 for us to approve his recent order. </div>
                  <div class="todo-arrow"><span class="right"></span></div> 
            </div>

            <div class="option1 todo-item" data-number="1">
               <div class = "todo-text"><span><b>2.</b></span> Amend the order upto the value of 50,000. </div>
                  <div class="todo-arrow">   <span class="right"></span></div>
            </div>
        </div>
        <br>
        <span style="font-size: 1.6rem"> Would you like to take action on any of the above recommendations? Please click on the preferred recommendation or respond with the corresponding number.</span>
     <br><br>
            <div class="response-buttons" style="margin-top: 8px; display: flex; gap: 10px;">
                <button id="approval-btn" class="response-button" type="button">Action</button>
                <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                
            </div>
    `);

    userInputSalesState = 'awaiting_insight_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function (event) {
        event.preventDefault(); // Prevent default link behavior
        console.log('Link clicked'); // Check if the click event is triggered
        const index = parseInt($(this).data('index'), 10);
        const order = data.insights[index];
        if (order) {
            $('#messageSales').text(`${order.item}`);
            $('#sendSales').click();
        }
    });

    // Add click event listener for Send Email button
    $(document).on('click', '#send-btn', function () {
        postBotSalesNewReply(`<strong>Customer Name</strong>:Manyana Ltd<br><strong>Email ID</strong>: chris@manyana.com<br> <b>Subject</b>:Immediate Payment Required to Clear Overdue Balance <br><br>Here is the draft email to customer to clear the outstanding payment `);

        fetchApiResponseSalesEmail('Write a professional email urging ACHELIS (TANGANYIKA) LIMITED  to clear an overdue balance, mentioning only ₹50,000 remains available from a ₹5,00,000 credit limit and 80% of payments are overdue by 180 days, with a polite request for immediate payment of 120,000 to maintain their credit line. Regards, Saurav Sharma without subject' + poPriceVeriance);
    });
}


function formatsalesItems(data) {
    let formattedText = `
        <div class="sales-order-list" style="font-family: Arial, sans-serif; color: #333;">
            <b>The outstanding amount and time since pending of the customer:</b>
            <table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                    <tr style="background-color: #f2f2f2; text-align: left;">
                        <th style="padding: 4px; width: 28px; font-size: 12px;">Sr.</th>
                        <th style="padding: 4px; width: 98px; font-size: 12px;">Customer Name</th>
                        <th style="padding: 4px; font-size: 12px">Outstanding Amount</th>
                        <th style="padding: 4px; font-size: 12px">Time Since</th>
                    </tr>
                </thead>
                <tbody style="background-color: #fff;">
    `;

    data.items.forEach((order, index) => {
        formattedText += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 4px;">${index + 1}.</td>
                <td style="padding: 4px;">
                    <a href="#" class="order-item" data-index="${index}" style="color: #007bff; text-decoration: none;">${order.item}</a>
                </td>
                <td style="padding: 4px; text-align: right;">${order.leadtime}</td>
                <td style="padding: 4px; text-align: right;">${order.stokbal}</td>
                <td style="padding: 4px; text-align: right;">${order.avg}</td>
            </tr>`;
    });

    formattedText += `
                </tbody>
            </table>
        </div>
    `;

    // Render the sales items and ask about rescheduling the delivery date
    postBotSalesReply(formattedText);
    setTimeout(() => {
        postBotSalesReply(` EVA Recommendations-
        <div class="brply a2" style="display: block; margin-top: 10px; font-size: 16px;">
            <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;"></span> The outstanding balance is high and buying pattern is low with average 5,000,000 sales order. Put the Sales Order on Hold.
            </div>
            <div class="option1" data-number="2" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;"></span>2.Approve the 1st sales order due to low outstanding balance and average buying pattern is frequently once in month//twice in month with average 4,500,000 sales order value.
            </div>
        </div>
        <br>Would you like to take action on any of the above recommendations? Please click on the preferred recommendation or respond with the corresponding number
        <div class="response-buttons" style="margin-top: 10px;">
        <button id="approval-btn" class="response-button" type="button">Action</button>
                    <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    </div>
    `);
    }, 2000);

    userInputSalesState = 'awaiting_delivery_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function (event) {
        event.preventDefault(); // Prevent default link behavior
        const index = parseInt($(this).data('index'), 10);
        const order = data.items[index];
        if (order) {
            $('#messageSales').text(`${index + 1}`);
            $('#sendSales').click();
        }
    });

    // Add click event listeners to response buttons
    $(document).on('click', '#yes-btn', function (event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("yes");
        $('#sendSales').click();
    });

    $(document).on('click', '#no-btn', function (event) {
        event.preventDefault();
        $('#messageSales').text("no");
        $('#sendSales').click();
    });
}

function formatDueOverdueBills(data) {
    let formattedText = `<div class="sales-order-list" style="margin-top: 20px; font-size: 16px;">`;
    formattedText += `<b>The following bills are due for supplier payments:</b>`;
    formattedText += '<table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size:15px">';
    formattedText += '<thead><tr style="background-color: #f2f2f2;"><th style="width: 25px; padding: 4px;">#</th><th style="width: 90px; padding: 4px;">Supplier</th><th style="padding: 0px; width:60px">Bill No</th><th style="padding: 3px; width:110px">Bill Amount</th><th style="padding: 4px; width:90px">Due Date</th></tr></thead>';
    formattedText += '<tbody>';

    data.duebill.forEach((bill, index) => {
        formattedText += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 4px; text-align: center;">${index + 1}.</td>
                <td style="padding: 4px;">
                    <a href="#" class="bill-item" data-index="${index}" style="color: #007BFF; text-decoration: none;">
                        ${bill.supplier}
                    </a>
                </td>
                <td style="padding: 4px;">${bill.billno}</td>
                <td style="padding: 4px;">${bill.billamt}</td>
                <td style="padding: 4px;">${bill.duedate}</td>
            </tr>`;
    });

    formattedText += '</tbody></table></div>';
    formattedText += `</div>`;

    postBotSalesReply(formattedText);
    setTimeout(() => {
        postBotSalesReply(`
        <div style="margin-top: 15px; font-size: 16px;">
            Do you want to send a reminder email to customer<br> to clear the outstanding balance ?
            <br><br>
            <div class="response-buttons" style="margin-top: 8px; display: flex; gap: 10px;">
                <button id="send-btn" class="action-btn" type="button">Send Email</button>
                <button id="approval-btn" class="response-button" type="button">Action</button>
                <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                
            </div>
        </div>
    `);
    }, 500);

    userInputSalesState = 'awaiting_price_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function (event) {
        event.preventDefault(); // Prevent default link behavior
        const index = parseInt($(this).data('index'), 10);
        const order = data.priceitems[index];
        if (order) {
            $('#messageSales').text(`${index + 1}`);
            $('#sendSales').click();
        }
    });

    // Add click event listeners to response buttons
    $(document).on('click', '#send-btn', function (event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("send email");
        $('#sendSales').click();
    });

    $(document).on('click', '#no-btn', function (event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("no");
        $('#sendSales').click();
    });
}

function formatsalesPriceIItems(data) {
    let formattedText = `<div class="sales-order-list" style="margin-top: 20px; font-size: 16px;">`;
    formattedText += `<b> The list of items has a price variance compared to the previous sales:</b>`;
    formattedText += '<table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px;">';
    formattedText += '<thead><tr style="background-color: #f2f2f2;"><th style="width: 28px; padding: 4px;">Sr.</th><th style="width: 98px; padding: 4px;">Item Name</th><th style="padding: 4px;">Last Price</th><th style="padding: 10px;">Current Price</th><th style="padding: 4px; width: 68px;">Variance</th></tr></thead>';
    formattedText += '<tbody>';

    data.priceitems.forEach((order, index) => {
        formattedText += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 4px; text-align: center;">${index + 1}.</td>
                <td style="padding: 4px;">
                    <a href="#" class="order-item" data-index="${index}" style="color: #007BFF; text-decoration: none;">
                        ${order.item}
                    </a>
                </td>
                <td style="padding: 4px;">${order.lastprice}</td>
                <td style="padding: 4px;">${order.currentprice}</td>
                <td style="padding: 4px;">${order.variance}</td>
            </tr>`;
    });

    formattedText += '</tbody></table>';
    formattedText += `</div>`;

    postBotSalesReply(formattedText);
    setTimeout(() => {
        postBotSalesReply(`
        <div style="margin-top: 15px; font-size: 16px;">
            Do you want to send an email to the supplier to request a price revision quotation?
            <br><br>
            <div class="response-buttons" style="margin-top: 8px; display: flex; gap: 10px;">
                <button id="send-btn" class="action-btn" type="button">Send Email</button>
                <button id="approval-btn" class="response-button" type="button">Action</button>
                <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                
            </div>
        </div>
    `);
    }, 500);

    userInputSalesState = 'awaiting_secondprice_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function (event) {
        event.preventDefault(); // Prevent default link behavior
        const index = parseInt($(this).data('index'), 10);
        const order = data.priceitems[index];
        if (order) {
            $('#messageSales').text(`${index + 1}`);
            $('#sendSales').click();
        }
    });

    // Add click event listeners to response buttons
    $(document).on('click', '#send-btn', function (event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("send email");
        $('#sendSales').click();
    });

    $(document).on('click', '#no-btn', function (event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("no");
        $('#sendSales').click();
    });
}




function formatsalesleadsuppItems(data) {
    let formattedText = `<div class="sales-order-list" style="margin-top: 5px; font-size: 16px;">`;
    formattedText += `<b> The selected supplier has a lead time of 7 days. However, the delivery is scheduled for 30-09-2024. Here is a list of alternative suppliers with a shorter lead time for the items:</b>`;
    formattedText += '<table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px;">';
    formattedText += '<thead><tr style="background-color: #f2f2f2;"><th style="width: 28px; padding: 4px;">Sr.</th><th style="padding: 5px;">Other Supplier</th><th style="padding: 5px;">Supplier Lead Time</th></tr></thead>';
    formattedText += '<tbody>';

    data.suppleaditems.forEach((order, index) => {
        formattedText += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 4px; text-align: center;">${index + 1}.</td>
                <td style="padding: 4px;">
                    <a href="#" class="order-item" data-index="${index}" style="color: #007BFF; text-decoration: none; font-weight: bold;">
                        ${order.othersuppiler}
                    </a>
                </td>
                <td style="padding: 4px;">${order.leadtime}</td>
            </tr>`;
    });

    formattedText += '</tbody></table>';
    formattedText += `</div>`;

    postBotSalesReply(formattedText);
    setTimeout(() => {
        postBotSalesReply(`
        <div style="margin-top: 5px; font-size: 16px;">
            To send a request for quotation to a supplier, click on the supplier's name or reply with the corresponding number.
            <div class="response-buttons" style="margin-top: 10px;">
            <button id="approval-btn" class="response-button" type="button">Action</button>
                    <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    
                    </div>
        </div>
    `);
    }, 500);

    userInputSalesState = 'awaiting_suppplead_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function (event) {
        event.preventDefault(); // Prevent default link behavior
        const index = parseInt($(this).data('index'), 10);
        const order = data.suppleaditems[index];
        if (order) {
            $('#messageSales').text(`${index + 1}`);
            $('#sendSales').click();
        }
    });

    // Add click event listeners to response buttons
    $(document).on('click', '#yes-btn', function (event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("yes");
        $('#sendSales').click();
    });

    $(document).on('click', '#no-btn', function (event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("no");
        $('#sendSales').click();
    });
}

function formatsalesleadsuppItems2nd(data) {
    let formattedText = `<div class="sales-order-list" style="margin-top: 5px; font-size: 16px;">`;
    formattedText += `<b> The selected supplier has a lead time of 7 days. However, the delivery is scheduled for 30-09-2024. Here is a list of alternative suppliers with a shorter lead time for the items:</b>`;
    formattedText += '<table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px;">';
    formattedText += '<thead><tr style="background-color: #f2f2f2;"><th style="width: 28px; padding: 4px;">Sr.</th><th style="padding: 5px;">Other Supplier</th><th style="padding: 5px;">Supplier Lead Time</th></tr></thead>';
    formattedText += '<tbody>';

    data.suppleaditems.forEach((order, index) => {
        formattedText += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 4px; text-align: center;">${index + 1}.</td>
                <td style="padding: 4px;">
                    <a href="#" class="order-item" data-index="${index}" style="color: #007BFF; text-decoration: none; font-weight: bold;">
                        ${order.othersuppiler}
                    </a>
                </td>
                <td style="padding: 4px;">${order.leadtime}</td>
            </tr>`;
    });

    formattedText += '</tbody></table>';
    formattedText += `</div>`;

    postBotSalesReply(formattedText);
    setTimeout(() => {
        postBotSalesReply(`
        <div style="margin-top: 5px; font-size: 16px;">
            To send a request for quotation to a supplier, click on the supplier's name or reply with the corresponding number.
            <div class="response-buttons" style="margin-top: 10px;">
            <button id="approval-btn" class="response-button" type="button">Action</button>
                    <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    
                    </div>
        </div>
    `);
    }, 500);

    userInputSalesState = 'awaiting_supppleaded_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function (event) {
        event.preventDefault(); // Prevent default link behavior
        const index = parseInt($(this).data('index'), 10);
        const order = data.suppleaditems[index];
        if (order) {
            $('#messageSales').text(`${index + 1}`);
            $('#sendSales').click();
        }
    });

}


function formatsalesleadsupplierItemss(data) {
    let formattedText = `<div class="sales-order-list" style="margin-top: 20px; font-size: 16px;">`;
    formattedText += `Quotation vs Sales Order conversion current month (39M vs 9.50M. 25.93% quotation to Sales order conversion). If we increase conversion percentage of sales order than revenue will increase`;
    formattedText += '<table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px;">';
    formattedText += '<thead><tr style="background-color: #f2f2f2;"><th style="width: 28px; padding: 4px;">Sr.</th><th style="padding: 5px;">Other Supplier</th><th style="padding: 5px;">Supplier Lead Time</th></tr></thead>';
    formattedText += '<tbody>';

    data.suppleaditems.forEach((order, index) => {
        formattedText += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 4px; text-align: center;">${index + 1}.</td>
                <td style="padding: 4px;">
                    <a href="#" class="order-item" data-index="${index}" style="color: #007BFF; text-decoration: none; font-weight: bold;">
                        ${order.othersuppiler}
                    </a>
                </td>
                <td style="padding: 4px;">${order.leadtime}</td>
            </tr>`;
    });

    formattedText += '</tbody></table>';
    formattedText += `</div>`;

    postBotSalesReply(formattedText);
    setTimeout(() => {
        postBotSalesReply(`
        <div style="margin-top: 5px; font-size: 16px;">
            To send a request for quotation to a supplier, click on the supplier's name or reply with the corresponding number.
            <div class="response-buttons" style="margin-top: 10px;">
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            </div>
        </div>
    `);
    }, 500);

    userInputSalesState = 'awaiting_suppplirlead_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function (event) {
        event.preventDefault(); // Prevent default link behavior
        const index = parseInt($(this).data('index'), 10);
        const order = data.suppleaditems[index];
        if (order) {
            $('#messageSales').text(`${index + 1}`);
            $('#sendSales').click();
        }
    });
}

function formatsalesleadsuppItemss(data) {
    let formattedText = `<div class="sales-order-list" style="margin-top: 20px; font-size: 16px;">`;
    formattedText += `The selected supplier has a lead time of 7 days. However, the delivery is scheduled for 14-09-2024. Here is a list of alternative suppliers with a shorter lead time for the items:`;
    formattedText += '<table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px;">';
    formattedText += '<thead><tr style="background-color: #f2f2f2;"><th style="width: 28px; padding: 4px;">Sr.</th><th style="padding: 5px;">Other Supplier</th><th style="padding: 5px;">Supplier Lead Time</th></tr></thead>';
    formattedText += '<tbody>';

    data.suppleaditems.forEach((order, index) => {
        formattedText += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 4px; text-align: center;">${index + 1}.</td>
                <td style="padding: 4px;">
                    <a href="#" class="order-item" data-index="${index}" style="color: #007BFF; text-decoration: none; font-weight: bold;">
                        ${order.othersuppiler}
                    </a>
                </td>
                <td style="padding: 4px;">${order.leadtime}</td>
            </tr>`;
    });

    formattedText += '</tbody></table>';
    formattedText += `</div>`;

    postBotSalesReply(formattedText);
    setTimeout(() => {
        postBotSalesReply(`
        <div style="margin-top: 5px; font-size: 16px;">
            To send a request for quotation to a supplier, click on the supplier's name or reply with the corresponding number.
            <div class="response-buttons" style="margin-top: 10px;">
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            </div>
        </div>
    `);
    }, 500);

    userInputSalesState = 'awaiting_supppllead_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function (event) {
        event.preventDefault(); // Prevent default link behavior
        const index = parseInt($(this).data('index'), 10);
        const order = data.suppleaditems[index];
        if (order) {
            $('#messageSales').text(`${index + 1}`);
            $('#sendSales').click();
        }
    });

    // Add click event listeners to response buttons
    $(document).on('click', '#yes-btn', function (event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("yes");
        $('#sendSales').click();
    });

    $(document).on('click', '#no-btn', function (event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("no");
        $('#sendSales').click();
    });
}

// -----------------------------------Graph insight--------------------------------------------------------
// let graphData = [];
// let chartInstance; // Hold reference to chart to prevent duplicates

async function fetchGraphData() {
    const graphUrl = `http://192.168.5.190:8080/ords/wsts/account_dtl/monthtrend?comp_code=01`;

    try {
        const graphResponse = await fetch(graphUrl);
        if (!graphResponse.ok) {
            throw new Error('Network response was not ok ' + graphResponse.statusText);
        }
        const graphJson = await graphResponse.json();
        graphData = graphJson.items;

        // Call function to create the canvas dynamically and populate graph
        createDynamicChart(graphData);

    } catch (error) {
        console.error('Fetch error: ', error);
        postBotSalesReply('Error fetching data. Please try again later.');
    }
}


async function topFiveSupplier() {
    const graphUrl = `http://192.168.5.190:8080/ords/wsts/account_dtl/Top5supplier?global_comp_code=01`;

    try {
        const graphResponse = await fetch(graphUrl);
        if (!graphResponse.ok) {
            throw new Error('Network response was not ok ' + graphResponse.statusText);
        }
        const graphJson = await graphResponse.json();
        const graphData = graphJson.items;  // Directly store the 'items' array

        // Call function to create the canvas dynamically and populate graph
        createSupplierChart(graphData);

    } catch (error) {
        console.error('Fetch error: ', error);
        postBotSalesReply('Error fetching data. Please try again later.');
    }
}

function createDynamicChart(graphData) {
    console.log('data', graphData);
    // Remove existing canvas if present
    postBotSalesReply('Hear is sales Order Trend Graph');
    const existingCanvas = document.getElementById('myChart');
    if (existingCanvas) {
        existingCanvas.remove();
    }

    // Create a new canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'myChart';
    canvas.style.width = '100%';
    canvas.style.height = '300px'; // Adjust as per your layout requirements

    // Append the canvas to the container
    document.getElementById('message-boardSales').appendChild(canvas);

    // Get the context for Chart.js
    const ctx = canvas.getContext('2d');

    // Prepare the datasets
    const orderData = graphData.filter(item => item.type === 'MonthWise Order Booking');
    const salesData = graphData.filter(item => item.type === 'MonthWise sales Booking');

    const labels = [...new Set([...orderData.map(item => item.vmonth), ...salesData.map(item => item.vmonth)])];

    const datasets = [
        {
            label: 'Order Booking',
            data: labels.map(label => {
                const item = orderData.find(item => item.vmonth === label);
                return item ? item.order_value : 0;
            }),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 1,
            fill: false
        },
        {
            label: 'sales Booking',
            data: labels.map(label => {
                const item = salesData.find(item => item.vmonth === label);
                return item ? item.order_value : 0;
            }),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
            fill: false
        }
    ];

    // Destroy the previous chart instance if it exists to avoid conflicts
    if (chartInstance) {
        chartInstance.destroy();
    }

    // Create a new chart instance
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,  // Ensure chart adjusts to container
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    postBotSalesReply(`Do you want to see insight of sales Order Trend Graph? <br> 
        <div class="response-buttons" style="margin-top: 5px;">
            <button id="yes-btn" class="response-button" type="butten">Yes</button>
            <button id="no-btn" class="response-button" type="butten">No</button>
   
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            
        </div>`);

    userInputSalesState = 'awaiting_graphinsigh_details';

    // Handle button clicks
    $(document).on('click', '#yes-btn', function (event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("yes");
        $('#sendSales').click();
    });

    $(document).on('click', '#no-btn', function (event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("no");
        $('#sendSales').click();
    });

    $(document).on('click', '#back-btn', function (event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("back");
        $('#sendSales').click();
    });
}


// let chartInstance;

async function fetchConsignmentgraphData() {
    const graphUrl = `http://192.168.5.190:8080/ords/wsts/account_dtl/consignment?comp_code=01`;

    try {
        const graphResponse = await fetch(graphUrl);
        if (!graphResponse.ok) {
            throw new Error('Network response was not ok ' + graphResponse.statusText);
        }
        const graphJson = await graphResponse.json();
        graphData = graphJson.items;

        // Call function to create the canvas dynamically and populate graph
        createConsignmentChart(graphData);

    } catch (error) {
        console.error('Fetch error: ', error);
        postBotSalesReply('Error fetching data. Please try again later.');
    }
}

function createConsignmentChart(graphData) {
    console.log('Full graphData structure:', graphData); // Log the full structure for inspection

    // Check if graphData is an array and contains valid objects
    if (!Array.isArray(graphData) || graphData.length === 0) {
        console.error("Invalid graphData structure: data array is missing or undefined.");
        return; // Exit if data structure is incorrect
    }

    // Remove existing canvas if present
    postBotSalesReply('Here is the sales Order Trend Graph');
    const existingCanvas = document.getElementById('myChart');
    if (existingCanvas) {
        existingCanvas.remove();
    }

    // Create a new canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'myChart';
    canvas.style.width = '100%';
    canvas.style.height = '300px'; // Adjust as per your layout requirements

    // Append the canvas to the container
    document.getElementById('message-boardSales').appendChild(canvas);

    // Get the context for Chart.js
    const ctx = canvas.getContext('2d');

    // Extract labels and values from the data
    const labels = graphData.map(item => item.monthss); // Use monthss for labels (x-axis)
    const values = graphData.map(item => item.val);     // Use val for values (y-axis)

    // Destroy the previous chart instance if it exists to avoid conflicts
    if (chartInstance) {
        chartInstance.destroy();
    }

    // Create a new chart instance
    chartInstance = new Chart(ctx, {
        type: 'bar',  // Bar chart
        data: {
            labels: labels,  // Months on the x-axis
            datasets: [{
                label: 'Expense',  // Dataset label
                data: values,  // Values on the y-axis
                backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Bar color
                borderColor: 'rgba(75, 192, 192, 1)',  // Bar border color
                borderWidth: 1  // Border width
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,  // Ensure chart adjusts to container
            scales: {
                y: {
                    beginAtZero: true  // Start y-axis at zero
                }
            }
        }
    });

    postBotSalesReply(`Do you want to see insight of the sales Order Trend Graph? <br> 
        <div class="response-buttons" style="margin-top: 5px;">
            <button id="yes-btn" class="response-button" type="button">Yes</button>
            <button id="no-btn" class="response-button" type="button">No</button>
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
        </div>`);

    userInputSalesState = 'awaiting_graphinsigh_details';

    // Handle button clicks
    $(document).on('click', '#yes-btn', function (event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("yes");
        $('#sendSales').click();
    });

    $(document).on('click', '#no-btn', function (event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("no");
        $('#sendSales').click();
    });

    $(document).on('click', '#back-btn', function (event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("back");
        $('#sendSales').click();
    });
}

function createSupplierChart(graphData) {
    console.log('Full graphData structure:', graphData); // Log the full structure for inspection

    // Check if graphData is a valid array and contains at least one item
    if (!Array.isArray(graphData) || graphData.length === 0) {
        console.error("Invalid graphData structure: data array is missing or empty.");
        return; // Exit if data structure is incorrect
    }

    // Remove existing canvas if present
    postBotSalesReply('Here is the Top 5 Suppliers by Total Value Graph');
    const existingCanvas = document.getElementById('myChart');
    if (existingCanvas) {
        existingCanvas.remove();
    }

    // Create a new canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'myChart';
    canvas.style.width = '100%';
    canvas.style.height = '300px'; // Adjust as per your layout requirements
    document.getElementById('message-boardSales').appendChild(canvas); // Append the canvas to the container

    // Get the context for Chart.js
    const ctx = canvas.getContext('2d');

    // Extract labels and values from the API data (corrected to directly use 'graphData')
    const labels = graphData.map(item => item.supplier); // Use 'supplier' for labels (x-axis)
    const values = graphData.map(item => item.tot_value); // Use 'tot_value' for values (y-axis)

    console.log('Labels:', labels); // Debug labels
    console.log('Values:', values); // Debug values

    // Destroy the previous chart instance if it exists to avoid conflicts
    if (window.chartInstance) {
        window.chartInstance.destroy();
    }

    // Check if labels and values are populated correctly
    if (labels.length === 0 || values.length === 0) {
        console.error("No valid data available for chart generation.");
        return;
    }

    // Create a new chart instance
    window.chartInstance = new Chart(ctx, {
        type: 'bar',  // Bar chart
        data: {
            labels: labels,  // Supplier names on the x-axis
            datasets: [{
                label: 'Total Value',  // Dataset label
                data: values,  // Total values on the y-axis
                backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Bar color
                borderColor: 'rgba(75, 192, 192, 1)',  // Bar border color
                borderWidth: 1  // Border width
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,  // Ensure chart adjusts to container
            scales: {
                y: {
                    beginAtZero: true  // Start y-axis at zero
                }
            }
        }
    });

    // Check if the chart was created successfully
    if (window.chartInstance) {
        console.log("Chart created successfully.");
    } else {
        console.error("Failed to create the chart.");
    }

    postBotSalesReply(`Do you want to see insight of the Top 5 Suppliers by Total Value Graph? <br> 
        <div class="response-buttons" style="margin-top: 5px;">
            <button id="yes-btn" class="response-button" type="button">Yes</button>
            <button id="no-btn" class="response-button" type="button">No</button>
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
        </div>`);

    userInputSalesState = 'awaiting_graphinsigh_details';

    // Handle button clicks
    $(document).on('click', '#yes-btn', function (event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("yes");
        $('#sendSales').click();
    });

    $(document).on('click', '#no-btn', function (event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("no");
        $('#sendSales').click();
    });

    $(document).on('click', '#back-btn', function (event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("back");
        $('#sendSales').click();
    });
}
// function generatePendingRFQsList() {

//     const rfqsitem = [
//     { 
//         id: '1', 
//         invoiceNumber: '0105', 
//         invoiceDate: '30-Nov-2023', 
//         customerName: 'ZEST LIMITED', 
//         invoiceAmount: '3,000,000.00', 
//         paidAmount: '0', 
//         pendingSince: '8 Months' 
//     },
//     { 
//         id: '2', 
//         invoiceNumber: '0115', 
//         invoiceDate: '30-Dec-2023', 
//         customerName: 'DEMBE LIMITED', 
//         invoiceAmount: '2,000,000.00', 
//         paidAmount: '0', 
//         pendingSince: '7 Months' 
//     },
//     { 
//         id: '3', 
//         invoiceNumber: '0125', 
//         invoiceDate: '01-Dec-2021', 
//         customerName: 'LOOKS SALON', 
//         invoiceAmount: '1,500,000.00', 
//         paidAmount: '1,000,000.00', 
//         pendingSince: '4 Months' 
//     },
//     { 
//         id: '4', 
//         invoiceNumber: '0116', 
//         invoiceDate: '30-Dec-2023', 
//         customerName: 'ATLAS LTD', 
//         invoiceAmount: '2,500,000.00', 
//         paidAmount: '2,000,000.00', 
//         pendingSince: '8 Months' 
//     }
// ];

// let formattedText = `
//     <div class="sales-order-list" style="font-family: Arial, sans-serif; color: #333; margin-bottom: 20px;">
//         <b>Here is the list of Pending Bills:</b>
//         <table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px; ;">
//             <thead>
//                 <tr style="background-color: #f2f2f2; text-align: left;">
//                     <th style="padding: 8px; width: 35px;">Sr</th>
//                     <th style="padding: 5px; width: 60px;">Invoice No.</th>
//                     <th style="padding: 8px; width: 95px;">Invoice Date</th>
//                     <th style="padding: 8px; width: 100px;">Customer Name</th>
//                     <th style="padding: 8px; width: 100px;">Pending Amount</th>
//                     <th style="padding: 8px; width: 100px;">Pending Since</th>
//                 </tr>
//             </thead>
//             <tbody style="background-color: #fff;">
// `;

// rfqsitem.forEach((invoice, index) => {
//     formattedText += `
//         <tr style="border-bottom: 1px solid #ddd;">
//             <td style="padding: 8px;">${invoice.id}</td>
//             <td style="padding: 8px;">
//             <a href='#' class="order-item" data-index="${index}" style="color: #007bff; text-decoration: none;">
//             ${invoice.invoiceNumber}</td>
//             <td style="padding: 8px;">${invoice.invoiceDate}</td>
//             <td style="padding: 8px;">${invoice.customerName}</td>
//             <td style="padding: 8px;">${invoice.invoiceAmount}</td>
//             <td style="padding: 8px;">${invoice.pendingSince}</td>
//         </tr>`;
// });

// formattedText += `
//             </tbody>
//         </table>
//     </div>
// `;


//     // Post the formatted Sales Orders list
//     postBotSalesReply(formattedText);

//     // Post additional instruction
//     postBotSalesReply(`
//            Please select an invoice number to send a reminder email for the outstanding quotation.
//             <div class="response-buttons" style="margin-top: 10px;">
//                     <button id="back-btn" class="response-button" type="button">Back to Menu</button>
//                     </div>
//     `);

//     userInputSalesState = 'awaiting_rfq_details';

//     // Add click event listeners to order items
//     $(document).on('click', '.order-item', function(event) {
//         event.preventDefault(); // Prevent default link behavior
//         console.log('Link clicked'); // Check if the click event is triggered
//         const index = parseInt($(this).data('index'), 10);
//         const order = rfqsitem[index];
//         // const order = data[index];
//         if (order) {
//             $('#messageSales').text(`${index + 1}`);
//             $('#sendSales').click();
//         }
//     });
// }


// function generatePendingRFQsList() {
//     const rfqsitem = [
//         {
//             id: '1',
//             invoiceNumber: '0105',
//             invoiceDate: '30-Nov-2023',
//             customerName: 'ZEST LIMITED',
//             invoiceAmount: '3,000,000.00',
//             paidAmount: '0',
//             pendingSince: '8 Months'
//         },
//         {
//             id: '2',
//             invoiceNumber: '0115',
//             invoiceDate: '30-Dec-2023',
//             customerName: 'DEMBE LIMITED',
//             invoiceAmount: '2,000,000.00',
//             paidAmount: '0',
//             pendingSince: '7 Months'
//         },
//         {
//             id: '3',
//             invoiceNumber: '0125',
//             invoiceDate: '01-Dec-2021',
//             customerName: 'LOOKS SALON',
//             invoiceAmount: '1,500,000.00',
//             paidAmount: '1,000,000.00',
//             pendingSince: '4 Months'
//         },
//         {
//             id: '4',
//             invoiceNumber: '0116',
//             invoiceDate: '30-Dec-2023',
//             customerName: 'ATLAS LTD',
//             invoiceAmount: '2,500,000.00',
//             paidAmount: '2,000,000.00',
//             pendingSince: '8 Months'
//         }
//     ];

//     let formattedText = `
//         <div class="sales-order-list" style="font-family: Arial, sans-serif; color: #333; margin-bottom: 20px;">
//             <b>Here is the list of Pending Bills:</b>
//             <table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px; ;">
//                 <thead>
//                     <tr style="background-color: #f2f2f2; text-align: left;">
//                         <th style="padding: 8px; width: 35px;">Sr</th>
//                         <th style="padding: 5px; width: 62px;">Invoice No.</th>
//                         <th style="padding: 8px; width: 93px;">Invoice Date</th>
//                         <th style="padding: 8px; width: 100px;">Customer Name</th>
//                         <th style="padding: 8px; width: 105px;">Pending Amount</th>
//                     </tr>
//                 </thead>
//                 <tbody style="background-color: #fff;">
//     `;

//     rfqsitem.forEach((invoice, index) => {
//         formattedText += `
//             <tr style="border-bottom: 1px solid #ddd;">
//                 <td style="padding: 8px;">${invoice.id}</td>
//                 <td style="padding: 8px;">
//                     <a href='#' class="order-item" data-index="${index}" style="color: #007bff; text-decoration: none;">
//                     ${invoice.invoiceNumber}</a>
//                 </td>
//                 <td style="padding: 8px;">${invoice.invoiceDate}</td>
//                 <td style="padding: 8px;">${invoice.customerName}</td>
//                 <td style="padding: 8px;">${invoice.invoiceAmount}</td>
//             </tr>`;
//     });

//     formattedText += `
//                 </tbody>
//             </table>
//             <div style="margin-top: 15px; font-style: italic; color: #555;">
//                 Please click on the <b>Invoice Number</b> to <br> proceed with the next step.
//             </div>
//             <div id="action-buttons" style="display: none; margin-top: 10px;">
//                 <button id="send-email-btn" 
//                     class="response-button" type="button" 
//                     style="background-color: #28a745;color: white;padding: 5px 9px;border: none;border-radius: 5px;margin-right: 3px;font-size: 16px;">
//                     Send Email
//                 </button>
//                 <button id="book-appointment-btn" 
//                     class="response-button" type="button" 
//                     style="background-color: #007bff;color: white;padding: 5px 9px;border: none;border-radius: 5px;font-size: 16px;">
//                     Book Appointment
//                 </button>
//                 <button id="back-btn" class="response-button" type="button" 
//                     style="margin-top: 10px;">
//                     Back to Menu
//                 </button>
//             </div>
//         </div>
//     `;

//     postBotSalesReply(formattedText);

//     userInputSalesState = 'awaiting_rfq_details';

//     $(document).on('click', '.order-item', function(event) {
//         event.preventDefault();
//         const index = parseInt($(this).data('index'), 10);
//         const order = rfqsitem[index];

//         if (order) {
//             $('#action-buttons').show();
//             $('#action-buttons').data('selected-order-index', index);
//         }
//     });

//     $(document).on('click', '#send-email-btn', function() {
//         const index = $('#action-buttons').data('selected-order-index');
//         const order = rfqsitem[index];
//         if (order) {
//             $('#messageSales').text(`${index + 1}`);
//             $('#sendSales').click();
//         }
//     });

//     $(document).on('click', '#book-appointment-btn', function() {
//         openOutlookAppointment();
//     });
// }

// function openOutlookAppointment() {
//     const subject = "Invoice Follow-up Appointment";
//     const description =  
//   "I hope you are well. This is a polite follow-up regarding the pending invoice #0105 dated 30-Nov-2023, totaling 3,000,000.00. We would like to schedule a meeting to discuss and resolve this outstanding amount. Please confirm a convenient time for the meeting. I will ensure to join 5 minutes before the scheduled time to make the discussion smooth and efficient. We look forward to your prompt response and resolution.";


//     const location = "Conference Room";
//     const start = "2024-10-30T10:00:00"; 
//     const end = "2024-10-30T11:00:00";
//     const attendees = ["Zestltd@outlook.com"]; //Email address for TO
//     const icsURL = createICSFile(subject, description, location, start, end, attendees);
//     window.location.href = icsURL;
// }

// function createICSFile(subject, description, location, start, end, attendees) {
//     const attendeesICS = attendees.map(email => `ATTENDEE;RSVP=TRUE:MAILTO:${email}`).join('\n');

//     const icsContent = `
// BEGIN:VCALENDAR
// VERSION:2.0
// BEGIN:VEVENT
// SUMMARY:${subject}
// DESCRIPTION:${description}
// LOCATION:${location}
// DTSTART:${formatDateToICS(start)}
// DTEND:${formatDateToICS(end)}
// ${attendeesICS}
// END:VEVENT
// END:VCALENDAR
//     `.trim();

//     const blob = new Blob([icsContent], { type: 'text/calendar' });
//     const url = URL.createObjectURL(blob);
//     return url;
// }

// function formatDateToICS(dateStr) {
//     const date = new Date(dateStr);
//     return date.toISOString().replace(/-|:|\.\d{3}/g, '');
// }


function generatePendingRFQsList() {
    const rfqsitem = [
        {
            id: '1',
            invoiceNumber: '0105',
            invoiceDate: '30-Nov-2023',
            customerName: 'ZEST LIMITED',
            invoiceAmount: '3,000,000.00',
            paidAmount: '0',
            pendingSince: '8 Months'
        },
        {
            id: '2',
            invoiceNumber: '0115',
            invoiceDate: '30-Dec-2023',
            customerName: 'DEMBE LIMITED',
            invoiceAmount: '2,000,000.00',
            paidAmount: '0',
            pendingSince: '7 Months'
        },
        {
            id: '3',
            invoiceNumber: '0125',
            invoiceDate: '01-Dec-2021',
            customerName: 'LOOKS SALON',
            invoiceAmount: '1,500,000.00',
            paidAmount: '1,000,000.00',
            pendingSince: '4 Months'
        },
        {
            id: '4',
            invoiceNumber: '0116',
            invoiceDate: '30-Dec-2023',
            customerName: 'ATLAS LTD',
            invoiceAmount: '2,500,000.00',
            paidAmount: '2,000,000.00',
            pendingSince: '8 Months'
        }
    ];

    let formattedText = `
        <div class="sales-order-list" style="font-family: Arial, sans-serif; color: #333; margin-bottom: 20px;">
            <b>Here is the list of Pending Bills:</b>
            <table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                    <tr style="background-color: #f2f2f2; text-align: left;">
                        <th style="padding: 8px; width: 35px;">Sr</th>
                        <th style="padding: 5px; width: 62px;">Invoice No.</th>
                        <th style="padding: 8px; width: 93px;">Invoice Date</th>
                        <th style="padding: 8px; width: 100px;">Customer Name</th>
                        <th style="padding: 8px; width: 105px;">Pending Amount</th>
                    </tr>
                </thead>
                <tbody style="background-color: #fff;">
    `;

    rfqsitem.forEach((invoice, index) => {
        formattedText += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 8px;">${invoice.id}</td>
                <td style="padding: 8px;">
                    <a href='#' class="order-item" data-index="${index}" style="color: #007bff; text-decoration: none;">
                    ${invoice.invoiceNumber}</a>
                </td>
                <td style="padding: 8px;">${invoice.invoiceDate}</td>
                <td style="padding: 8px;">${invoice.customerName}</td>
                <td style="padding: 8px;">${invoice.invoiceAmount}</td>
            </tr>`;
    });

    formattedText += `
                </tbody>
            </table>
            <div style="margin-top: 15px; font-style: italic; color: #555;">
                Please click on the <b>Invoice Number</b> to <br> proceed with the next step.
            </div>
            <div id="action-buttons" style="display: none; margin-top: 10px;">
                <button id="send-email-btn" 
                    class="response-button" type="button" 
                    style="background-color: #28a745; color: white; padding: 5px 9px; border: none; border-radius: 5px; margin-right: 3px; font-size: 16px;">
                    Send Email
                </button>
                <button id="book-appointment-btn" 
                    class="response-button" type="button" 
                    style="background-color: #007bff; color: white; padding: 5px 9px; border: none; border-radius: 5px; font-size: 16px;">
                    Book Appointment
                </button>
                <button id="back-btn" class="response-button" type="button" 
                    style="margin-top: 10px;">
                    Back to Menu
                </button>
            </div>
        </div>
    `;

    postBotSalesReply(formattedText);

    userInputSalesState = 'awaiting_rfq_details';

    // Delegated event listener for dynamically generated elements
    $(document).on('click', '.order-item', function (event) {
        event.preventDefault();
        const index = parseInt($(this).data('index'), 10);
        const order = rfqsitem[index];

        if (order) {
            setTimeout(() => {  // Ensure DOM updates smoothly
                $('#action-buttons').fadeIn();
                $('#action-buttons').data('selected-order-index', index);
            }, 50);
        }
    });

    $(document).on('click', '#send-email-btn', function () {
        const index = $('#action-buttons').data('selected-order-index');
        const order = rfqsitem[index];
        if (order) {
            $('#messageSales').text(`${index + 1}`);
            $('#sendSales').click();  // Trigger email sending
        }
    });

    $(document).on('click', '#book-appointment-btn', function () {
        openOutlookAppointment();
    });

    $(document).on('click', '#back-btn', function () {
        $('#action-buttons').hide();  // Hide action buttons on Back
    });
}

function openOutlookAppointment() {
    const subject = "Invoice Follow-up Appointment";
    const description =
        "I hope you are well. This is a polite follow-up regarding the pending invoice #0105 dated 30-Nov-2023, totaling 3,000,000.00. We would like to schedule a meeting to discuss and resolve this outstanding amount. Please confirm a convenient time for the meeting. I will ensure to join 5 minutes before the scheduled time to make the discussion smooth and efficient. We look forward to your prompt response and resolution.";
    const location = "Conference Room";
    const start = "2024-10-30T10:00:00";
    const end = "2024-10-30T11:00:00";
    const attendees = ["Zestltd@outlook.com"];
    const icsURL = createICSFile(subject, description, location, start, end, attendees);
    window.location.href = icsURL;
}

function createICSFile(subject, description, location, start, end, attendees) {
    const attendeesICS = attendees.map(email => `ATTENDEE;RSVP=TRUE:MAILTO:${email}`).join('\n');

    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${subject}
DESCRIPTION:${description}
LOCATION:${location}
DTSTART:${formatDateToICS(start)}
DTEND:${formatDateToICS(end)}
${attendeesICS}
END:VEVENT
END:VCALENDAR
    `.trim();

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    return url;
}

function formatDateToICS(dateStr) {
    const date = new Date(dateStr);
    return date.toISOString().replace(/-|:|\.\d{3}/g, '');
}



function formatRFQItems(data) {
    const rfqsitem = [
        { id: '1', itemname: 'PROCESSOR (INTEL I5 8 GEN 2.4 GHZ)', qty: '100', price: '1200000' },
        { id: '2', itemname: 'COMPUTER CASE', qty: '25', price: '12500' },
        { id: '3', itemname: 'OPTICAL DRIVE (DVD RW AND SATA CAPABLE)', qty: '100', price: '120000' },
        { id: '4', itemname: 'MOTHERBOARD', qty: '30', price: '240000' },
        { id: '5', itemname: 'HARD DRIVE (500 GB)', qty: '23', price: '92000' },
        { id: '6', itemname: 'GRAPHIC CARD', qty: '5', price: '125000' },
        { id: '7', itemname: 'MOUSE (HP-USB X500 WIRED)', qty: '100', price: '40000' }
    ];
    let formattedText = `
        <div class="sales-order-list" style="font-family: Arial, sans-serif; color: #333;">
            <b>Here is the list of items from Receipt No. 15:</b>
            <table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                    <tr style="background-color: #f2f2f2; text-align: left;">
                        <th style="padding: 4px; width: 28px;">#</th>
                        <th style="padding: 4px; width: 184px;">itemname</th>
                        <th style="padding: 4px; text-align: right;">Qty</th>
                        <th style="padding: 4px; text-align: right;">Price</th>
                    </tr>
                </thead>
                <tbody style="background-color: #fff;">
    `;

    rfqsitem.forEach((order, index) => {
        formattedText += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 4px;">${index + 1}.</td>
                <td style="padding: 4px;">
                    <a href="#" class="order-item" data-index="${index}" style="color: #007bff; text-decoration: none;">${order.itemname}</a>
                </td>
                <td style="padding: 4px; text-align: right;">${order.qty}</td>
                <td style="padding: 4px; text-align: right;">${order.price}</td>
            </tr>`;
    });


    formattedText += `
                </tbody>
            </table>
        </div>
    `;
    // formattedText += ` 
    //     <div class="response-buttons" style="margin-top: 10px;">
    //                 <button id="back-btn" class="response-button" type="button">Back to Menu</button>
    //                 <button id="back" class="response-button" type="button">Back</button>
    //                 </div>
    // `;

    // Render the sales items and ask about rescheduling the delivery date
    postBotSalesReply(formattedText);

    setTimeout(() => {

        postBotSalesReply(`Do to want to take action this Pending Bill?
        <div class="response-buttons" style="margin-top: 10px;">
                <button id="yes-btn" class="response-button" type="butten">Yes</button>
                <button id="no-btn" class="response-button" type="butten">No</button>
                <button id="back-btn" class="response-button" type="button">Back to Menu</button>
        </div>
    `);
    }, 1000);

    userInputSalesState = 'awaiting_rfqdetails_details';


    $(document).on('click', '#yes-btn', function (event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("yes");
        $('#sendSales').click();
    });

    $(document).on('click', '#no-btn', function (event) {
        event.preventDefault();
        $('#messageSales').text("no");
        $('#sendSales').click();
    });
}

function formatRFQItems1() {
    const rfqsitem = [

        { id: '1', itemname: 'SPEAKERS (LG AUDIO X8900)', qty: '23', price: '34500' },
        { id: '2', itemname: 'PROCESSOR (INTEL I5 8 GEN 2.4 GHZ)', qty: '100', price: '1200000' },
        { id: '3', itemname: 'UPS(LUMINOUS-360 WAAT 600 VA)', qty: '23', price: '34,500' },
        { id: '4', itemname: 'HARD DRIVE (500 GB)', qty: '23', price: '92000' },
        { id: '5', itemname: 'GRAPHIC CARD', qty: '5', price: '125000' },
        { id: '6', itemname: 'MOUSE (HP-USB X500 WIRED)', qty: '100', price: '40000' }
    ];
    let formattedText = `
        <div class="sales-order-list" style="font-family: Arial, sans-serif; color: #333;">
            <b>Here is the list of items from Receipt No. 25:</b>
            <table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                    <tr style="background-color: #f2f2f2; text-align: left;">
                        <th style="padding: 4px; width: 28px;">#</th>
                        <th style="padding: 4px; width: 184px;">itemname</th>
                        <th style="padding: 4px; text-align: right;">Qty</th>
                        <th style="padding: 4px; text-align: right;">Price</th>
                    </tr>
                </thead>
                <tbody style="background-color: #fff;">
    `;

    rfqsitem.forEach((order, index) => {
        formattedText += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 4px;">${index + 1}.</td>
                <td style="padding: 4px;">
                    <a href="#" class="order-item" data-index="${index}" style="color: #007bff; text-decoration: none;">${order.itemname}</a>
                </td>
                <td style="padding: 4px; text-align: right;">${order.qty}</td>
                <td style="padding: 4px; text-align: right;">${order.price}</td>
            </tr>`;
    });


    formattedText += `
                </tbody>
            </table>
        </div>
    `;

    postBotSalesReply(formattedText);

    setTimeout(() => {

        postBotSalesReply(` Do to want to take action this Pending Bill?
        <div class="response-button" style="margin-top: 5px;">
                <button id="yes-btn" class="response-button" type="butten">Yes</button>
                <button id="no-btn" class="response-button" type="butten">No</button>
                <button id="back-btn" class="response-button" type="button">Back to Menu</button>
        </div>
    `);
    }, 1000);



}

function formatsalesstockItems(data) {
    postBotSalesNewReply(`<strong>Customer Name</strong>:Manyana Ltd<br><strong>Email ID</strong>:chris@manyana.com<br> <b>Subject</b>:Immediate Payment Required to Clear Overdue Balance <br><br>Here is the draft email to customer to clear the outstanding payment `);

    fetchApiResponseSalesEmail('Generate a short and professional email to Manyana Ltd regarding an overdue balance. Mention $50,000 available from a $500,000 credit limit, with 80% of payments overdue by 180 days. Request payment of $120,000 to maintain the credit line. Sign off with "Regards, Saurav Sharma." Do not include a subject line' + poPriceVeriance);


    // let formattedText = `
    //     The following customers have outstanding amounts:
    //     <div class="outstanding-customer-list" style="font-family: Arial, sans-serif; color: #333; max-width: 800px; margin: auto; border: 1px solid #ddd; border-radius: 5px; overflow: hidden;">
    //         <table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px; ;"> <!-- Reduced font size here -->
    //             <thead>
    //                 <tr style="background-color: #f2f2f2; text-align: left;">
    //                     <th style="padding: 8px; width: 35px; font-size: 11px;">Sr.</th> <!-- Reduced padding -->
    //                     <th style="padding: 8px; width: 150px; font-size: 13px;">Customer Name</th> <!-- Reduced padding -->
    //                     <th style="padding: 8px; text-align: center; font-size: 13px; width: 100px">Outstanding Amount</th> <!-- Reduced padding -->
    //                     <th style="padding: 8px; text-align: center; font-size: 13px;">Time Since</th> <!-- Reduced padding -->
    //                 </tr>
    //             </thead>
    //             <tbody style="background-color: #fff;">
    // `;

    // // Iterate over customers
    // data.customers.forEach((customer, index) => {
    //     // Alternate row colors for better readability
    //     const rowColor = index % 2 === 0 ? '#ffffff' : '#f9f9f9'; 
    //     formattedText += `
    //         <tr style="border-bottom: 1px solid #ddd; background-color: ${rowColor}; transition: background-color 0.3s;">
    //             <td style="padding: 8px; font-size: 12px;">${index + 1}.</td> <!-- Reduced font size -->
    //             <td style="padding: 8px; font-size: 12px;">
    //                 <a href="#" class="customer-item" data-index="${index}" style="color: #007bff; text-decoration: none;">${customer.name}</a>
    //             </td>
    //             <td style="padding: 8px; text-align: center; font-size: 12px;">${customer.outstandingAmount.toLocaleString()}</td> <!-- Reduced font size -->
    //             <td style="padding: 8px; text-align: center; font-size: 12px;">${customer.timeSince}</td> <!-- Reduced font size -->
    //         </tr>`;
    // });

    // formattedText += `
    //             </tbody>
    //         </table>
    //     </div>
    // `;

    // // Render the sales items and ask about rescheduling the delivery date
    // postBotSalesReply(formattedText);
    //  setTimeout(() => {
    // postBotSalesReply(` EVA Recommendations-
    //     <div class="brply a2" style="display: block; margin-top: 10px; font-size: 16px;">
    //         <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 20px; margin-bottom: 5px;">
    //             <span style="font-weight: bold;">1.</span> Unsettled dues of 5,000,000 and decreased <br> saless,  place sales order on hold.
    //         </div>

    //     </div>
    //     <br>Would you like to take action on any of the above recommendations? Please click on the preferred recommendation or respond with the corresponding number
    //     <br><br>
    //         <div class="response-buttons" style="margin-top: 8px; display: flex; gap: 10px;">
    //             <button id="send-btn" class="action-btn" type="button">Send Email</button>
    //             <button id="approval-btn" class="response-button" type="button">Action</button>
    //             <button id="back-btn" class="response-button" type="button">Back to Menu</button>

    //         </div>
    // `);
    // }, 1000);  

    // userInputSalesState = 'awaiting_deliveryy_details';

    // // Add click event listeners to order items
    // $(document).on('click', '.order-item', function(event) {
    //     event.preventDefault(); // Prevent default link behavior
    //     const index = parseInt($(this).data('index'), 10);
    //     const order = data.items[index];
    //     if (order) {
    //         $('#messageSales').text(`${index+1}`);
    //         $('#sendSales').click();  
    //     }
    // });
}


// const tasks = [
//     { taskcode: 1, name: 'Rohan Kumar' },
//     { taskcode: 2, name: 'Anil Kumar' },
//     { taskcode: 3, name: 'Aman Rawat' },
// ];

async function fetchApibilldetails(context) {
    const apiUrl = 'http://192.168.5.190:5000/chat';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: context })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Assuming the API returns both subject and response separately
        // const emailSubject = data.subject||'Request for Quotation for Cold Cream,Pet Food,Mango Juice & Organic Vegetables';
        const emailBody = data.response;

        // Post the email response
        postBotRFQReply(emailBody);
        console.log(emailBody);

        setTimeout(() => {
            postBotSalesReply(`Do you want to take action on this pending bill? <br> 
        <div class="response-buttons" style="margin-top: 5px;">
            <button id="yes-btn" class="response-button" type="butten">Yes</button>
            <button id="no-btn" class="response-button" type="butten">No</button>
   
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            
        </div>`);
        }, 5000);

        // Add click event listeners to response buttons
        $(document).on('click', '#yes-btn', function (event) {
            event.preventDefault();  // Prevent default action
            $('#messageSales').text("yes");
            $('#sendSales').click();
        });

        $(document).on('click', '#no-btn', function (event) {
            event.preventDefault();  // Prevent default action
            $('#messageSales').text("no");
            $('#sendSales').click();
        });

        userInputSalesState = 'awaiting_bill_details';
        return emailBody; // Return the generated email template
    } catch (error) {
        throw new Error(`Error generating email template: ${error.message}`);
    }
}

async function fetchpendingbillEmail(context) {
    const apiUrl = 'http://192.168.5.190:5000/chat';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: context })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Assuming the API returns both subject and response separately
        const emailSubject = data.subject || 'Request to Process sales Bills for GRN 15';
        const emailBody = data.response;

        // Post the email response
        postBotSalesNewReply(emailBody);
        console.log(emailBody);

        // Add Review and Send buttons after the bot response
        $('#message-boardSales').append(`
            <div class="action-bill">
                <button class="actionbill-btn" data-action="review">Send</button>
                <button class="actionbill-btn" data-action="send">Next</button>
                <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                
            </div>
        `);

        // Update form fields with the subject and message
        $s('P0_MAIL_SUBJECT', emailSubject);
        $s('P0_MAILBODY', emailBody);

        userInputSalesState = 'awaiting_apibill_details';
        return emailBody; // Return the generated email template
    } catch (error) {
        throw new Error(`Error generating email template: ${error.message}`);
    }
}

// Use event delegation to handle button clicks
$('#message-boardSales').on('click', '.actionbill-btn', function (event) {
    event.preventDefault(); // Prevent the default action
    const action = $(this).data('action');

    if (action === 'review') {
        console.log('Review button clicked');
        sendbillEmail();
        // Implement review functionality here
    } else if (action === 'send') {
        console.log('Send3 button clicked');
        // Implement send functionality here
        postBotSalesReply(`Action has been taken on the GRN No. 15. <br>Do you want to take action on the other pending bills? <br> 
        <div class="response-buttons" style="margin-top: 10px;">
            <button id="yes-btn" class="response-button" type="butten">Yes</button>
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            
        </div>`);
        userInputSalesState = 'awaiting_rembill_details';

        // Add click event listeners to response buttons
        $(document).on('click', '#yes-btn', function (event) {
            event.preventDefault();  // Prevent default action
            $('#messageSales').text("yes");
            $('#sendSales').click();
        });

        $(document).on('click', '#no-btn', function (event) {
            event.preventDefault();  // Prevent default action
            $('#messageSales').text("no");
            $('#sendSales').click();
        });
    }
});

function sendbillEmail() {
    const body = $v("P0_MAILBODY")
    const subject = $v("P0_MAIL_SUBJECT")
    const email_id = ('rohan.kumar@essindia.com')
    const mailtoLink = `mailto:${encodeURIComponent(email_id)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}

async function fetchduebillEmail(context) {
    const apiUrl = 'http://192.168.5.190:5000/chat';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: context })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Assuming the API returns both subject and response separately
        const emailSubject = data.subject || 'Request to Process sales Bills for GRN 15';
        const emailBody = data.response;

        // Post the email response
        postBotSalesNewReply(emailBody);
        console.log(emailBody);

        // Add Review and Send buttons after the bot response
        $('#message-boardSales').append(`
            <div class="action-bill">
                <button class="actiondue-btn" data-action="review">Send</button>
                <button class="actiondue-btn" data-action="send">Next</button>
                <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                
            </div>
        `);

        // Update form fields with the subject and message
        $s('P0_MAIL_SUBJECT', emailSubject);
        $s('P0_MAILBODY', emailBody);

        userInputSalesState = 'awaiting_apibill_details';
        return emailBody; // Return the generated email template
    } catch (error) {
        throw new Error(`Error generating email template: ${error.message}`);
    }
}

// Use event delegation to handle button clicks
$('#message-boardSales').on('click', '.actiondue-btn', function (event) {
    event.preventDefault(); // Prevent the default action
    const action = $(this).data('action');

    if (action === 'review') {
        console.log('Review button clicked');
        senddueEmail();
        // Implement review functionality here
    } else if (action === 'send') {
        console.log('Send3 button clicked');
        // Implement send functionality here
        postBotSalesReply(`Action has been taken on the bill No. 10. <br>Do you want to take action on the other due/overdue bills? <br> 
        <div class="response-buttons" style="margin-top: 10px;">
            <button id="yes-btn" class="response-button" type="butten">Yes</button>
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            
        </div>`);
        userInputSalesState = 'awaiting_duebill_details';

        // Add click event listeners to response buttons
        $(document).on('click', '#yes-btn', function (event) {
            event.preventDefault();  // Prevent default action
            $('#messageSales').text("yes");
            $('#sendSales').click();
        });

        $(document).on('click', '#no-btn', function (event) {
            event.preventDefault();  // Prevent default action
            $('#messageSales').text("no");
            $('#sendSales').click();
        });
    }
});

function senddueEmail() {
    const body = $v("P0_MAILBODY")
    const subject = $v("P0_MAIL_SUBJECT")
    const email_id = ('rohit.kumar@essindia.com')
    const mailtoLink = `mailto:${encodeURIComponent(email_id)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}


function generateOptions(tasks) {
    let formattedText = `
        <div class="sales-order-list" style="font-family: Arial, sans-serif; color: #333;">
            <b>Please select the user to whom you would like to send the email regarding receipt no. 15.</b>
            <table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                    <tr style="background-color: #f2f2f2; text-align: left;">
                        <th style="padding: 4px; width: 28px;">#</th>
                        <th style="padding: 4px; width: 98px;">User Name</th>
                    </tr>
                </thead>
                <tbody style="background-color: #fff;">
    `;

    tasks.forEach((order, index) => {
        formattedText += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 4px;">${index + 1}.</td>
                <td style="padding: 4px;">
                    <a href="#" class="order-item" data-index="${index}" style="color: #007bff; text-decoration: none;">${order.name}</a>
                </td>
            </tr>`;
    });

    formattedText += `
                </tbody>
            </table>
        </div>
    `;

    // Render the sales items and ask about rescheduling the delivery date
    postBotSalesReply(formattedText);

    userInputSalesState = 'awaiting_username_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function (event) {
        event.preventDefault(); // Prevent default link behavior
        const index = parseInt($(this).data('index'), 10);
        const order = data.items[index];
        if (order) {
            $('#messageSales').text(`${index + 1}`);
            $('#sendSales').click();
        }
    });
}



function generateReply(userMessage) {
    const message = userMessage.toLowerCase();
    //const username = $v('P0_USER_NAME');  // Fetch user name dynamically
    let reply = [];


    if (/test/.test(message)) {
        reply = [`Ok`, `Feel free to test as much as you want`];
    } else {
        console.log("Make a call LN->4892");
        //createCallUI();  // Execute the function here
        return;  // Stop further execution after calling createCallUI()
    }

    // If there is a reply, post it to the bot.
    if (reply.length > 0) {
        reply.forEach(str => postBotSalesReply(str));
    }
}


// -------------------------open forms----------------------------------

var roleCode = $v('01'); // Replace 'your_role_code' with the actual role code
var compCode = $v('01'); // Replace 'your_comp_code' with the actual company code

function processVCmd(command) {
    var roleCode = '01'; // Replace 'your_role_code' with the actual role code
    var compCode = '01';
    var usercode = '01';
    var url = 'http://192.168.5.190:8080/ords/wsts/account_dtl/pagename?ROLECODE=' + roleCode + '&COMPCODE=' + compCode + '&USERCODE=' + usercode;
    $.ajax({
        url: url,
        method: 'GET',
        success: function (data) {
            console.log("Data fetched successfully:", data);
            fetchedData = data;

            var matchedPageNumber = null;

            for (var i = 0; i < data.items.length; i++) {
                var item = data.items[i];
                // if (item.object_name.toLowerCase() === command.toLowerCase()) {
                if (item.object_name && item.object_name.toLowerCase() === command.toLowerCase()) {
                    matchedPageNumber = item.page_number;
                    break;
                }
            }
            console.log("Command:", command);
            console.log("Matched Page Number:", matchedPageNumber);

            if (matchedPageNumber) {
                openPage(matchedPageNumber, item.modul_ecode, item.args, item.manu_code);
            } else {
                var relatedObjectNames = findRelatedObjectNames(command);
                console.log("Related Object Names:", relatedObjectNames);
                if (relatedObjectNames.length > 0) {
                    openRelatedPage(relatedObjectNames);
                } else {
                    postBotSalesReply("No matching or related page found for the command: " + command);
                }
            }
        },
        error: function (xhr, status, error) {
            console.error('Error fetching data:', error);
            alert("Error fetching data. Please try again.");
        }
    });
}

function findRelatedObjectNames(command) {
    var relatedObjectNames = [];
    for (var i = 0; i < fetchedData.items.length; i++) {
        var item = fetchedData.items[i];
        // if (item.object_name.toLowerCase().includes(command)) {
        if (item.object_name && item.object_name.toLowerCase().includes(command.toLowerCase())) {
            relatedObjectNames.push(item.object_name);
        }
    }
    return relatedObjectNames;
}

function openRelatedPage(relatedObjectNames) {
    $("#relatedObjectNamesList").empty();

    relatedObjectNames.forEach(function (objectName) {
        var listItem = $("<li>").text(objectName);
        listItem.on("click", function () {
            openPageForObjectName(objectName);
            $("#relatedObjectNamesDialog").dialog("close");
        });
        $("#relatedObjectNamesList").append(listItem);
    });

    $("#relatedObjectNamesDialog").dialog({
        modal: true,
        title: "Related Object Names",
        width: 400,
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        }
    });
}

function openPageForObjectName(objectName) {
    for (var i = 0; i < fetchedData.items.length; i++) {
        var item = fetchedData.items[i];
        if (item.object_name === objectName) {
            openPage(item.page_number, item.modul_ecode, item.args, item.manu_code);
            return;
        }
    }
    postBotSalesReply("Page not found for object name: " + objectName);
}



function openPage(pageNumber, moduleCode, args, manuCode) {
    console.log("Opening page number:", pageNumber);
    console.log("Opening manuCode:", manuCode);
    const appId = $v('pFlowId'); // Retrieves the Application ID
    const sessionId = $v('pInstance'); // Retrieves the Session ID
    var redirectURL;
    if (manuCode && manuCode.length !== 2) {
        redirectURL = `f?p=${appId}:` + pageNumber + `:${sessionId}`;
    } else {
        redirectURL = `f?p=${appId}:` + pageNumber + `:${sessionId}`;
    }
    window.location.href = redirectURL;
}

// --------------------------------------------------------------------------------




/******************/
/*** TIMESTAMPS ***/
/******************/


function timeStamp() {
    const timestamp = new Date();
    const hours = timestamp.getHours();
    let minutes = timestamp.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    const html = `<span class="timestamp">${hours}:${minutes}</span>`;
    return html;
};




/***************/
/*** CHAT UI ***/
/***************/



/*********************/
/*** SCROLL TO END ***/
/*********************/


function $scrollSalesDown() {
    const $container = $("#message-boardSales");
    const $maxHeight = $container.height();
    const $scrollHeightSales = $container[0].scrollHeight;
    if ($scrollHeightSales > $maxHeight) $container.scrollTop($scrollHeightSales);
}
// });




/***************************/
/*** ALL CHART FUNCTIONS  ***/
/***************************/



function createDynamicBarChart(graphData) {
    console.log('data', graphData);
    // Remove existing canvas if present
    postBotSalesReply('Here is the sales Order Trend Bar Graph');
    const existingCanvas = document.getElementById('myBarChart');
    if (existingCanvas) {
        existingCanvas.remove();
    }

    // Create a new canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'myBarChart';
    canvas.style.width = '100%';
    canvas.style.height = '300px'; // Adjust as per your layout requirements

    // Append the canvas to the container
    document.getElementById('message-boardSales').appendChild(canvas);

    // Get the context for Chart.js
    const ctx = canvas.getContext('2d');

    // Prepare the datasets
    const orderData = graphData.filter(item => item.type === 'MonthWise Order Booking');
    const salesData = graphData.filter(item => item.type === 'MonthWise sales Booking');

    const labels = [...new Set([...orderData.map(item => item.vmonth), ...salesData.map(item => item.vmonth)])];

    const datasets = [
        {
            label: 'January',
            data: labels.map(label => {
                const item = orderData.find(item => item.vmonth === label);
                return item ? item.order_value : 0;
            }),
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: 'July',
            data: labels.map(label => {
                const item = salesData.find(item => item.vmonth === label);
                return item ? item.order_value : 0;
            }),
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }
    ];

    // Destroy the previous chart instance if it exists to avoid conflicts
    if (chartInstance) {
        chartInstance.destroy();
    }

    // Create a new chart instance
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,  // Ensure chart adjusts to container
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}




async function ProductGroupwiseSales() {
    const graphUrl = `http://192.168.5.190:8080/ords/wsts/account_dtl/Product_Groupwise_sales?global_comp_code=01`;

    try {
        const graphResponse = await fetch(graphUrl);
        if (!graphResponse.ok) {
            throw new Error('Network response was not ok ' + graphResponse.statusText);
        }
        const graphJson = await graphResponse.json();
         graphData = graphJson.items;

        // Call function to create the pie chart
        createProductGroupPieChart(graphData);
    } catch (error) {
        console.error('Fetch error: ', error);
        postBotSalesReply('Error fetching data. Please try again later.');
    }
}


function createProductGroupPieChart(graphData) {
    console.log('Full graphData structure:', graphData); // Log the full structure for inspection

    // Remove existing canvas if present
    postBotSalesReply(`<span style="font-size: 1.6rem">Here is the Product Group-wise Sales Pie Chart </span>`);
    const existingCanvas = document.getElementById('myChart');
    if (existingCanvas) {
        existingCanvas.remove();
    }

    // Create a new canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'myChart';
    canvas.style.width = '100%';
    canvas.style.height = '400px'; // Increased height for better visibility
    document.getElementById('message-boardSales').appendChild(canvas); // Append the canvas to the container

    // Get the context for Chart.js
    const ctx = canvas.getContext('2d');

    // Extract labels and values from the API data
    const labels = graphData.map(item => item.prod_group); // Use 'prod_group' for labels
    const values = graphData.map(item => item.val); // Use 'val' for values

    // Define color palette
    const vibrantColors = [
        'rgba(255, 99, 132, 0.8)',  // Strong Pink-Red
        'rgba(54, 162, 235, 0.8)',  // Clear Sky Blue
        'rgba(255, 159, 64, 0.8)',  // Vibrant Orange
        'rgba(75, 192, 192, 0.8)',  // Soft Teal
        'rgba(153, 102, 255, 0.8)', // Light Purple
        'rgba(201, 203, 207, 0.8)', // Light Gray
        'rgba(0, 204, 102, 0.8)',   // Emerald Green
        'rgba(102, 51, 153, 0.8)',  // Deep Violet
        'rgba(255, 205, 86, 0.8)',  // Golden Yellow
        'rgba(255, 80, 80, 0.8)'    // Coral Red
    ];

    // Destroy the previous chart instance if it exists to avoid conflicts
    if (window.chartInstance) {
        window.chartInstance.destroy();
    }

    // Create a new chart instance as a Pie chart
    window.chartInstance = new Chart(ctx, {
        type: 'pie',  // Pie chart
        data: {
            labels: labels,
            datasets: [{
                label: 'Sales by Product Group',
                data: values,
                backgroundColor: vibrantColors,
                borderColor: 'white',  // Border color for slices
                borderWidth: 2,
                hoverOffset: 10, // Makes the slice "pop" when hovered
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,  // Ensure chart adjusts to container
            plugins: {
                legend: {
                    display: true,
                    position: 'right', // Move legend to the right
                    labels: {
                        boxWidth: 20,
                        padding: 10,
                        font: {
                            size: 12
                        },
                        usePointStyle: true // Use dots instead of squares for legend
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            let value = tooltipItem.raw;
                            return `${tooltipItem.label}: ${value.toLocaleString()}M`; // Display value with 'M' for millions
                        }
                    }
                },
                datalabels: {
                    display: true, // Ensure labels are visible on slices
                    color: 'black',
                    font: {
                        weight: 'bold',
                        size: 14
                    },
                    formatter: (value) => value.toLocaleString() + 'M', // Format values inside slices
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 20,
                    bottom: 20
                }
            }
        }
    });

    // Check if the chart was created successfully
    if (window.chartInstance) {
        console.log("Chart created successfully.");
    } else {
        console.error("Failed to create the chart.");
    }

       postBotSalesReply(`<span style="font-size: 1.6rem">Do you want to see insight of product group-wise sales pie chart? </span><br> 
        <div class="response-buttons" style="margin-top: 5px;">
            <button id="yes-btn" class="response-button" type="butten">Yes</button>
            <button id="no-btn" class="response-button" type="butten">No</button>
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            
        </div>`);

        userInputSalesState = 'awaiting_graphinsight_details_productwise';

         // Handle button clicks
    $(document).on('click', '#yes-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("yes");
        $('#sendSales').click();
    });

    $(document).on('click', '#no-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("no");
        $('#sendSales').click();
    });

    $(document).on('click', '#back-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("back");
        $('#sendSales').click();
    });
}


async function customerCategoryWiseSales() {
    const graphUrl = `http://192.168.5.190:8080/ords/wsts/account_dtl/Customer_categorywise_sales?global_comp_code=01`;

    try {
        const graphResponse = await fetch(graphUrl);
        if (!graphResponse.ok) {
            throw new Error('Network response was not ok ' + graphResponse.statusText);
        }
        const graphJson = await graphResponse.json();
         graphData = graphJson.items;

        // Call function to create the radar chart
        createCustomerCategoryBarChart(graphData);
    } catch (error) {
        console.error('Fetch error: ', error);
        postBotSalesReply('Error fetching data. Please try again later.');
    }
}
function createCustomerCategoryBarChart(graphData) {
    console.log('Full graphData structure:', graphData); // Log the full structure for inspection

    // Remove existing canvas if present
    postBotSalesReply(`<span style="font-size: 1.6rem">Here is the Customer Category-wise Sales Bar Chart</span>`);
    const existingCanvas = document.getElementById('myBarChart');
    if (existingCanvas) {
        existingCanvas.remove();
    }

    // Create a new canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'myBarChart';
    canvas.style.width = '100%';
    canvas.style.height = '400px'; // Adjust height for better visibility
    document.getElementById('message-boardSales').appendChild(canvas); // Append the canvas to the container

    // Get the context for Chart.js
    const ctx = canvas.getContext('2d');

    // Extract labels and values from the data
    const labels = graphData.map(item => {
        const parts = item.cust_cat.split(' '); // Split by space or any other delimiter
        return parts.join('\n'); // Join with newline character for multi-line labels
    });
    const values = graphData.map(item => item.val); // 'val' as values

    // Define a pastel color palette
    const vibrantColors = [
        'rgba(255, 99, 71, 0.8)',   // Tomato Red
        'rgba(255, 69, 0, 0.8)',    // Red Orange
        'rgba(255, 165, 0, 0.8)',   // Bright Orange
        'rgba(255, 255, 0, 0.8)',   // Vivid Yellow
        'rgba(0, 255, 127, 0.8)',   // Spring Green
        'rgba(50, 205, 50, 0.8)',   // Lime Green
        'rgba(0, 191, 255, 0.8)',   // Deep Sky Blue
        'rgba(65, 105, 225, 0.8)',  // Royal Blue
        'rgba(186, 85, 211, 0.8)',  // Medium Orchid
        'rgba(255, 20, 147, 0.8)'   // Deep Pink
    ];


    // Destroy the previous chart instance to avoid conflicts
    if (window.barChartInstance) {
        window.barChartInstance.destroy();
    }

    // Create a new vertical bar chart
    window.barChartInstance = new Chart(ctx, {
        type: 'bar', // Vertical bar chart
        data: {
            labels: labels,
            datasets: [{
                label: 'Sales by Customer Category',
                data: values,
                backgroundColor: vibrantColors, // Use pastel colors for bars
                borderColor: 'rgba(0, 0, 0, 0.1)', // Light border color
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'x', // Change to vertical bar orientation
            responsive: true,
            maintainAspectRatio: false, // Adjust chart to fit container
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Customer Categories' // X-axis title
                    },
                    ticks: {
                        autoSkip: false, // Ensure all labels are displayed
                        maxRotation: 45, // Rotate labels 45 degrees for better readability
                        minRotation: 45, // Keep consistent slant angle
                        padding: 10, // Space between labels
                    }
                },
                y: {
                    beginAtZero: true,
                    suggestedMax: Math.max(...values) * 1.1, // Add some padding
                    title: {
                        display: true,
                        text: 'Sales Value' // Y-axis title
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw.toLocaleString();
                        }
                    }
                },
                legend: {
                    display: false // Hide default legend
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
            }
        }
    });

    // Check if the chart was created successfully
    if (window.barChartInstance) {
        console.log("Bar Chart created successfully.");
    } else {
        console.error("Failed to create the Bar Chart.");
    }

    postBotSalesReply(`<span style="font-size: 1.6rem">Do you want to see insight of customer category wise sales bar chart? </span><br> 
        <div class="response-buttons" style="margin-top: 5px;">
            <button id="yes-btn" class="response-button" type="butten">Yes</button>
            <button id="no-btn" class="response-button" type="butten">No</button>
   
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            
        </div>`);

        userInputSalesState = 'awaiting_graphinsight_details_customer';

         // Handle button clicks
    $(document).on('click', '#yes-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("yes");
        $('#sendSales').click();
    });

    $(document).on('click', '#no-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("no");
        $('#sendSales').click();
    });

    $(document).on('click', '#back-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("back");
        $('#sendSales').click();
    });
}


async function fetchHalfYearlyRevenue() {
    const revenueUrl = `http://192.168.5.190:8080/ords/wsts/account_dtl/Half_yearly_sales?global_comp_code=01`;

    try {
        const revenueResponse = await fetch(revenueUrl);
        if (!revenueResponse.ok) {
            throw new Error('Network response was not ok ' + revenueResponse.statusText);
        }
        const revenueJson = await revenueResponse.json();

        // Call function to create the half-yearly revenue chart
        halfYearlyRevenueChart(revenueJson);
    } catch (error) {
        console.error('Fetch error: ', error);
        postBotSalesReply('Error fetching data. Please try again later.');
    }
}




function halfYearlyRevenueChart(data) {
    console.log('Full data structure:', data); // Log the full structure for inspection

    // Remove existing canvas if present
    postBotSalesReply('<span style="font-size: 1.6rem">Here is the Half-Yearly Revenue Chart</span>');
    const existingCanvas = document.getElementById('halfYearlyRevenueChart');
    if (existingCanvas) {
        existingCanvas.remove();
    }

    // Create a new canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'halfYearlyRevenueChart';
    canvas.style.width = '100%';
    canvas.style.height = '400px'; // Adjust height for better visibility
    document.getElementById('message-boardSales').appendChild(canvas); // Append the canvas to the container

    // Get the context for Chart.js
    const ctx = canvas.getContext('2d');

    // Extract labels and values from the data
    const labels = data.items.map(item => item.type); // 'type' as labels
    const values = data.items.map(item => item.val); // 'val' as values

    // Define a vibrant color palette (poppy colors)
    const vibrantColors = [
        'rgba(255, 99, 132, 0.8)', // Red
        'rgba(54, 162, 235, 0.8)', // Blue
        'rgba(255, 206, 86, 0.8)', // Yellow
        'rgba(75, 192, 192, 0.8)', // Cyan
        'rgba(153, 102, 255, 0.8)', // Purple
        'rgba(255, 159, 64, 0.8)'  // Orange
    ];

    // Destroy the previous chart instance to avoid conflicts
    if (window.halfYearlyRevenueChartInstance) {
        window.halfYearlyRevenueChartInstance.destroy();
    }

    // Create a new vertical bar chart
    window.halfYearlyRevenueChartInstance = new Chart(ctx, {
        type: 'bar', // Vertical bar chart
        data: {
            labels: labels,
            datasets: [{
                label: 'Half-Yearly Revenue',
                data: values,
                backgroundColor: vibrantColors, // Use vibrant colors for bars
                borderColor: 'rgba(0, 0, 0, 0.1)', // Light border color
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'x', // Change to vertical bar orientation
            responsive: true,
            maintainAspectRatio: false, // Adjust chart to fit container
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Revenue Type' // X-axis title
                    },
                    ticks: {
                        autoSkip: false, // Ensure all labels are displayed
                        maxRotation: 0, // Prevent rotation of labels
                        minRotation: 0, // Keep rotation to 0 for readability
                        padding: 10, // Space between labels
                    }
                },
                y: {
                    beginAtZero: true,
                    suggestedMax: Math.max(...values) * 1.1, // Add some padding
                    title: {
                        display: true,
                        text: 'Revenue Value' // Y-axis title
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw.toLocaleString();
                        }
                    }
                },
                legend: {
                    display: false // Hide default legend
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
            }
        }
    });

    // Check if the chart was created successfully
    if (window.halfYearlyRevenueChartInstance) {
        console.log("Half-Yearly Revenue Chart created successfully.");
    } else {
        console.error("Failed to create the Half-Yearly Revenue Chart.");
    }

  postBotSalesReply(`<span style="font-size: 1.6rem">Do you want to see insight of half yearly revenue bar graph? </span><br> 
        <div class="response-buttons" style="margin-top: 5px;">
            <button id="yes-btn" class="response-button" type="butten">Yes</button>
            <button id="no-btn" class="response-button" type="butten">No</button>
   
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            
        </div>`);

        userInputSalesState = 'awaiting_graphinsight_details_halfyearly';

         // Handle button clicks
    $(document).on('click', '#yes-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("yes");
        $('#sendSales').click();
    });

    $(document).on('click', '#no-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("no");
        $('#sendSales').click();
    });

    $(document).on('click', '#back-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("back");
        $('#sendSales').click();
    });
}

async function fetchQuarterWiseRevenue() {
    const revenueUrl = `http://192.168.5.190:8080/ords/wsts/account_dtl/Quarterwise_revenue?global_comp_code=01`;

    try {
        const revenueResponse = await fetch(revenueUrl);
        if (!revenueResponse.ok) {
            throw new Error('Network response was not ok ' + revenueResponse.statusText);
        }
        const revenueJson = await revenueResponse.json();

        // Call function to create the quarter-wise revenue chart
        quarterWiseRevenueChart(revenueJson);
    } catch (error) {
        console.error('Fetch error: ', error);
        postBotSalesReply('Error fetching data. Please try again later.');
    }
}


function quarterWiseRevenueChart(data) {
    console.log('Full data structure:', data); // Log the full structure for inspection

    // Remove existing canvas if present
    postBotSalesReply('<span style="font-size: 1.6rem">Here is the Quarter-wise Revenue Chart</span>');
    const existingCanvas = document.getElementById('quarterWiseRevenueChart');
    if (existingCanvas) {
        existingCanvas.remove();
    }

    // Create a new canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'quarterWiseRevenueChart';
    canvas.style.width = '100%';
    canvas.style.height = '400px'; // Adjust height for better visibility
    document.getElementById('message-boardSales').appendChild(canvas); // Append the canvas to the container

    // Get the context for Chart.js
    const ctx = canvas.getContext('2d');

    // Extract labels and values from the data
    const labels = data.items.map(item => item.type); // 'type' as labels
    const values = data.items.map(item => item.val); // 'val' as values

    // Define a vibrant color palette (poppy colors)
    const vibrantColors = [
        'rgba(255, 99, 132, 0.8)', // Red
        'rgba(54, 162, 235, 0.8)', // Blue
        'rgba(255, 206, 86, 0.8)', // Yellow
        'rgba(75, 192, 192, 0.8)', // Cyan
        'rgba(153, 102, 255, 0.8)', // Purple
        'rgba(255, 159, 64, 0.8)'  // Orange
    ];

    // Destroy the previous chart instance to avoid conflicts
    if (window.quarterWiseRevenueChartInstance) {
        window.quarterWiseRevenueChartInstance.destroy();
    }

    // Create a new vertical bar chart
    window.quarterWiseRevenueChartInstance = new Chart(ctx, {
        type: 'bar', // Vertical bar chart
        data: {
            labels: labels,
            datasets: [{
                label: 'Quarter-wise Revenue',
                data: values,
                backgroundColor: vibrantColors.slice(0, values.length), // Use vibrant colors for bars
                borderColor: 'rgba(0, 0, 0, 0.1)', // Light border color
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'x', // Change to vertical bar orientation
            responsive: true,
            maintainAspectRatio: false, // Adjust chart to fit container
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Quarter' // X-axis title
                    },
                    ticks: {
                        autoSkip: false, // Ensure all labels are displayed
                        maxRotation: 0, // Prevent rotation of labels
                        minRotation: 0, // Keep rotation to 0 for readability
                        padding: 10, // Space between labels
                    }
                },
                y: {
                    beginAtZero: true,
                    suggestedMax: Math.max(...values) * 1.1, // Add some padding
                    title: {
                        display: true,
                        text: 'Revenue Value' // Y-axis title
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw.toLocaleString();
                        }
                    }
                },
                legend: {
                    display: false // Hide default legend
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
            }
        }
    });

    // Check if the chart was created successfully
    if (window.quarterWiseRevenueChartInstance) {
        console.log("Quarter-wise Revenue Chart created successfully.");
    } else {
        console.error("Failed to create the Quarter-wise Revenue Chart.");
    }

postBotSalesReply(`<span style="font-size: 1.6rem">Do you want to see insight of quarter wise revenue chart? </span><br> 
        <div class="response-buttons" style="margin-top: 5px;">
            <button id="yes-btn" class="response-button" type="butten">Yes</button>
            <button id="no-btn" class="response-button" type="butten">No</button>
   
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            
        </div>`);

        userInputSalesState = 'awaiting_graphinsight_details_quarterly';

         // Handle button clicks
    $(document).on('click', '#yes-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("yes");
        $('#sendSales').click();
    });

    $(document).on('click', '#no-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("no");
        $('#sendSales').click();
    });

    $(document).on('click', '#back-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("back");
        $('#sendSales').click();
    });
}


async function fetchMonthWiseSales() {
    const salesUrl = `http://192.168.5.190:8080/ords/wsts/account_dtl/Monthwise_sales?global_comp_code=01`;

    try {
        const salesResponse = await fetch(salesUrl);
        if (!salesResponse.ok) {
            throw new Error('Network response was not ok ' + salesResponse.statusText);
        }
        const salesJson = await salesResponse.json();

        // Call function to create the month-wise sales chart
        monthWiseSalesChart(salesJson);
    } catch (error) {
        console.error('Fetch error: ', error);
        postBotSalesReply('Error fetching data. Please try again later.');
    }
}

function monthWiseSalesChart(data) {
    console.log('Full data structure:', data); // Log the full structure for inspection

    // Remove existing canvas if present
    postBotSalesReply('<span style="font-size: 1.6rem">Here is the Month-wise Sales Chart</span>');
    const existingCanvas = document.getElementById('monthWiseSalesChart');
    if (existingCanvas) {
        existingCanvas.remove();
    }

    // Create a new canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'monthWiseSalesChart';
    canvas.style.width = '100%';
    canvas.style.height = '400px'; // Adjust height for better visibility
    document.getElementById('message-boardSales').appendChild(canvas); // Append the canvas to the container

    // Get the context for Chart.js
    const ctx = canvas.getContext('2d');

    // Extract labels and values from the data
    const labels = data.items.map(item => item.type); // 'type' as labels
    const values = data.items.map(item => item.val); // 'val' as values

    // Define a vibrant color palette (poppy colors)
    const vibrantColors = [
        'rgba(255, 99, 132, 0.8)', // Red
        'rgba(54, 162, 235, 0.8)', // Blue
        'rgba(255, 206, 86, 0.8)', // Yellow
        'rgba(75, 192, 192, 0.8)', // Cyan
        'rgba(153, 102, 255, 0.8)', // Purple
        'rgba(255, 159, 64, 0.8)',  // Orange
        'rgba(255, 20, 147, 0.8)',  // Deep Pink
        'rgba(255, 69, 0, 0.8)',     // Red Orange
        'rgba(30, 144, 255, 0.8)',   // Dodger Blue
        'rgba(255, 215, 0, 0.8)'     // Gold
    ];

    // Destroy the previous chart instance to avoid conflicts
    if (window.monthWiseSalesChartInstance) {
        window.monthWiseSalesChartInstance.destroy();
    }

    // Create a new vertical bar chart
    window.monthWiseSalesChartInstance = new Chart(ctx, {
        type: 'bar', // Vertical bar chart
        data: {
            labels: labels,
            datasets: [{
                label: 'Month-wise Sales',
                data: values,
                backgroundColor: vibrantColors.slice(0, values.length), // Use vibrant colors for bars
                borderColor: 'rgba(0, 0, 0, 0.1)', // Light border color
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'x', // Change to vertical bar orientation
            responsive: true,
            maintainAspectRatio: false, // Adjust chart to fit container
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Months' // X-axis title
                    },
                    ticks: {
                        autoSkip: false, // Ensure all labels are displayed
                        maxRotation: 0, // Prevent rotation of labels
                        minRotation: 0, // Keep rotation to 0 for readability
                        padding: 10, // Space between labels
                    }
                },
                y: {
                    beginAtZero: true,
                    min: 0, // Start y-axis at 0 to remove space for negative values
                    suggestedMax: Math.max(...values) * 1.1, // Add some padding
                    title: {
                        display: true,
                        text: 'Sales Value' // Y-axis title
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw.toLocaleString();
                        }
                    }
                },
                legend: {
                    display: false // Hide default legend
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
            }
        }
    });

    // Check if the chart was created successfully
    if (window.monthWiseSalesChartInstance) {
        console.log("Month-wise Sales Chart created successfully.");
    } else {
        console.error("Failed to create the Month-wise Sales Chart.");
    }

postBotSalesReply(`<span style="font-size: 1.6rem">Do you want to see insight of month wise sales chart? </span><br> 
        <div class="response-buttons" style="margin-top: 5px;">
            <button id="yes-btn" class="response-button" type="butten">Yes</button>
            <button id="no-btn" class="response-button" type="butten">No</button>
   
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            
        </div>`);

        userInputSalesState = 'awaiting_graphinsight_details_monthly';

         // Handle button clicks
    $(document).on('click', '#yes-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("yes");
        $('#sendSales').click();
    });

    $(document).on('click', '#no-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("no");
        $('#sendSales').click();
    });

    $(document).on('click', '#back-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messageSales').text("back");
        $('#sendSales').click();
    });
}


// Function to generate random colors
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function createCustomLegend(labels) {
    const legendContainer = document.createElement('div');
    legendContainer.id = 'customLegend';
    legendContainer.style.display = 'flex';
    legendContainer.style.flexWrap = 'wrap'; // Allow legend items to wrap
    legendContainer.style.marginTop = '20px';

    labels.forEach((label, index) => {
        const legendItem = document.createElement('div');
        legendItem.style.display = 'flex';
        legendItem.style.alignItems = 'center';
        legendItem.style.marginRight = '15px'; // Space between items
        legendItem.style.marginBottom = '10px'; // Space below items

        const colorBox = document.createElement('div');
        colorBox.style.width = '15px';
        colorBox.style.height = '15px';
        colorBox.style.backgroundColor = window.chartInstance.data.datasets[0].backgroundColor[index]; // Match color with the chart
        colorBox.style.marginRight = '5px';

        const labelText = document.createElement('span');
        labelText.textContent = label;
        labelText.style.fontSize = '14px'; // Adjust font size as needed

        legendItem.appendChild(colorBox);
        legendItem.appendChild(labelText);
        legendContainer.appendChild(legendItem);
    });

    const existingLegend = document.getElementById('customLegend');
    if (existingLegend) {
        existingLegend.remove(); // Remove old legend if it exists
    }

    document.getElementById('message-boardSales').appendChild(legendContainer); // Append the custom legend to the container
}


/*******************************/
/*** ALL CHART FUNCTIONS END ***/
/*******************************/





const pendingSalesOrders = {
    orders: [
        { id: '0130', date: '25-11-2021', customer: 'ACHIELIS TANGANYIKA LIMITED', sentBy: 'Supervisor', qty: '20 units', orderValue: '1,20,000' },
        { id: '0135', date: '26-11-2021', customer: 'Manyana Ltd.', sentBy: 'Supervisor', qty: '15 units', orderValue: '1,68,000' },
        { id: '0145', date: '01-12-2021', customer: 'KINYARA SUGARS LIMITED', sentBy: 'Supervisor', qty: '50 units', orderValue: '95,000' }
    ],
    status: 'Pending Approval'
};


async function fetchApibilldetails2(context) {
    const apiUrl = 'http://192.168.5.190:5000/chat';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: context })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const emailBody = data.response;

        // Post the email response
        postBotRFQReply(emailBody);
        console.log(emailBody);

        // Properly format the HTML inside setTimeout
        setTimeout(() => {
            postBotSalesReply(`
                Do you want to take action on this pending bill? <br> 
                <div class="response-buttons" style="margin-top: 5px;">
                    <!-- <button id="yes-btn" class="response-button" type="button">Yes</button> -->
                    <!-- <button id="no-btn" class="response-button" type="button">No</button> -->
                    <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                </div>
            `);
        }, 5000);



        userInputSalesState = 'awaiting_bill_details';

        return emailBody; // Return the generated email template

    } catch (error) {
        throw new Error(`Error generating email template: ${error.message}`);
    }
}

function generatePendingQuotationsList() {
    const rfqsitem = [
        {
            sr: '1',
            quotNo: '0127',
            quotDate: '15-Sep-2024',
            customerName: 'Shreekhand LTD.',
            amount: '3,000,000',
            days: Math.floor((new Date() - new Date('15-Sep-2024')) / (1000 * 60 * 60 * 24)),
            reason: 'fund issues'
        },
        {
            sr: '2',
            quotNo: '0116',
            quotDate: '18-Sep-2024',
            customerName: 'XYZ LIMITED',
            amount: '3,500,000',
            days: Math.floor((new Date() - new Date('18-Sep-2024')) / (1000 * 60 * 60 * 24)),
            reason: 'postponed'
        },
        {
            sr: '3',
            quotNo: '0119',
            quotDate: '20-Sep-2024',
            customerName: 'DYNABRADE LTD',
            amount: '1,500,000',
            days: Math.floor((new Date() - new Date('20-Sep-2024')) / (1000 * 60 * 60 * 24)),
            reason: 'Diverted'
        }
    ];

    let formattedText = `
        <div class="quotation-list" style="font-family: Arial, sans-serif; color: #333; ">
            <b> List of Pending Quotations:</b>
            <table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px; ;">
                <thead>
                    <tr style="background-color: #f2f2f2; text-align: left;">
                        <th style="padding: 8px; width: 35px;">Sr</th>
                        <th style="padding: 8px; width: 63px;">Quot No.</th>
                        <th style="padding: 8px; width: 95px;">Quot Date</th>
                        <th style="padding: 8px; width: 133px;">Customer Name</th>
                        <th style="padding: 8px; width: 120px;">Amount</th>
                        <th style="padding: 8px; width: 80px;">Days</th>
                    </tr>
                </thead>
                <tbody style="background-color: #fff;">
    `;

    rfqsitem.forEach((quote) => {
        formattedText += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 8px;">${quote.sr}</td>
                <td style="padding: 8px;">
                
<a href="#" class="quote-item" data-quotno="${quote.quotNo}" style="color: #007bff; text-decoration: none;">
                        ${quote.quotNo}
                    </a>                
                </td>
                <td style="padding: 8px;">${quote.quotDate}</td>
                <td style="padding: 8px;">${quote.customerName}</td>
                <td style="padding: 8px;">${quote.amount}</td>
                <td style="padding: 8px;">${quote.days}</td>
            </tr>`;
    });

    formattedText += `
                </tbody>
            </table>
            <b>Total Amount: 8,000,000.00</b>
        </div>
    `;

    // Post the formatted quotation list
    postBotSalesReply(formattedText);

    // Post additional instruction
    postBotSalesReply(`
       Would you like to take action on any of the following? Please select a quot date to follow up on the quotation
        <div class="response-buttons" style="margin-top: 10px;">
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
        </div>
    `);

    userInputSalesState = 'awaiting_quotation_details';

    // Add click event listeners to quotation items
    $(document).on('click', '.quote-item', function (event) {
        event.preventDefault(); // Prevent default link behavior
        console.log('Quotation link clicked'); // Verify event trigger
        const quotNo = $(this).data('quotno');
        $('#messageSales').text(`Quotation No: ${quotNo}`);
        $('#sendSales').click();
    });
}


function createCallUI() {
    console.log("Executing createCallUI..."); // Debugging log

    // Create the container div for the call UI
    const container = document.createElement('div');
    container.classList.add('call-ui');
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.display = 'flex';
    container.style.flexDirection = 'row';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'space-around';
    container.style.width = '100%';
    container.style.maxWidth = '400px';
    container.style.margin = '5px 0';
    container.style.backgroundColor = 'transparent';
    container.style.boxShadow = 'none';
    container.style.overflow = 'hidden';
    container.style.padding = '10px 0';

    // Create the main call button
    const callButton = document.createElement('button');
    callButton.textContent = '📞 Make a Call';
    callButton.classList.add('call-button');
    callButton.style.backgroundColor = '#4caf50';
    callButton.style.color = 'white';
    callButton.style.border = 'none';
    callButton.style.padding = '10px 15px';
    callButton.style.borderRadius = '8px';
    callButton.style.cursor = 'pointer';
    callButton.style.fontSize = '16px';

    // Create the dropdown menu (horizontal layout)
    const dropdownMenu = document.createElement('div');
    dropdownMenu.classList.add('call-dropdown');
    dropdownMenu.style.display = 'flex'; // Horizontal layout
    dropdownMenu.style.gap = '10px'; // Space between buttons
    dropdownMenu.style.marginLeft = '10px';
    dropdownMenu.style.overflow = 'hidden';
    dropdownMenu.style.maxHeight = '0'; // Hidden initially
    dropdownMenu.style.transition = 'max-height 0.4s ease-in-out'; // Sliding effect

    // Normal Call button
    const normalCallButton = document.createElement('a');
    normalCallButton.classList.add('call-option');
    normalCallButton.href = 'tel:8171576903';
    normalCallButton.style.backgroundColor = '#ff5722'; // New color for Normal Call
    normalCallButton.style.color = 'white';
    normalCallButton.style.border = 'none';
    normalCallButton.style.padding = '10px';
    normalCallButton.style.borderRadius = '8px';
    normalCallButton.style.cursor = 'pointer';
    normalCallButton.style.textDecoration = 'none';
    normalCallButton.style.textAlign = 'center';
    normalCallButton.innerHTML = '<i class="fas fa-phone"></i>';

    // Skype Call button
    const skypeCallButton = document.createElement('a');
    skypeCallButton.classList.add('call-option');
    skypeCallButton.href = 'skype:live:.cid.22bac1e2c7b4b650?call';
    skypeCallButton.style.backgroundColor = '#2196f3';
    skypeCallButton.style.color = 'white';
    skypeCallButton.style.border = 'none';
    skypeCallButton.style.padding = '10px';
    skypeCallButton.style.borderRadius = '8px';
    skypeCallButton.style.cursor = 'pointer';
    skypeCallButton.style.textDecoration = 'none';
    skypeCallButton.style.textAlign = 'center';
    skypeCallButton.innerHTML = '<i class="fab fa-skype"></i>';

    // WhatsApp Call button
    const whatsappCallButton = document.createElement('a');
    whatsappCallButton.classList.add('call-option');
    whatsappCallButton.href = 'https://wa.me/8171576903';
    whatsappCallButton.target = '_blank';
    whatsappCallButton.style.backgroundColor = '#25D366';
    whatsappCallButton.style.color = 'white';
    whatsappCallButton.style.border = 'none';
    whatsappCallButton.style.padding = '10px';
    whatsappCallButton.style.borderRadius = '8px';
    whatsappCallButton.style.cursor = 'pointer';
    whatsappCallButton.style.textDecoration = 'none';
    whatsappCallButton.style.textAlign = 'center';
    whatsappCallButton.innerHTML = '<i class="fab fa-whatsapp"></i>';

    // Add event listener for sliding effect
    callButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (dropdownMenu.style.maxHeight === '0px') {
            dropdownMenu.style.maxHeight = '100px'; // Slide open
        } else {
            dropdownMenu.style.maxHeight = '0'; // Slide closed
        }
    });

    // Append call options to the dropdown menu
    dropdownMenu.appendChild(normalCallButton);
    dropdownMenu.appendChild(skypeCallButton);
    dropdownMenu.appendChild(whatsappCallButton);

    // Add the call button and dropdown to the container
    container.appendChild(callButton);
    container.appendChild(dropdownMenu);

    // Append the container to the message board
    const messageBoard = document.querySelector('#message-boardSales');
    messageBoard.appendChild(container);

    // Post bot reply after 20 seconds
    setTimeout(() => {
        postBotSalesReply(`Call has been made to SHREEKHAND LIMITED regarding conversion of quotation to an order.  
        <div class="response-buttons" style="margin-top: 10px;">
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
        </div>`);
    }, 15000);
}


// Define the data object separately
const invoiceData = {
    invoices: [
        {
            sr: '01',
            orderNo: '0115',
            orderDate: '11-Sep-2024',
            customer: 'China Town LTD.',
            deliveryNo: '0119',
            deliveryDate: '15-Sep-2024',
            amount: '2,000,000.00'
        },
        {
            sr: '02',
            orderNo: '0118',
            orderDate: '14-Sep-2024',
            customer: 'Casements Africa Ltd',
            deliveryNo: '0126',
            deliveryDate: '16-Sep-2024',
            amount: '3,500,000.00'
        },
        {
            sr: '03',
            orderNo: '0125',
            orderDate: '19-Sep-2024',
            customer: 'Transtel Limited',
            deliveryNo: '0129',
            deliveryDate: '21-Sep-2024',
            amount: '1,500,000.00'
        }
    ],
    total: '7,000,000.00'
};

// Main function to format and display the invoice data
function formatInvoiceData(invoiceData) {
    let formattedText = `
        <div class="invoice-list" style="font-family: Arial, sans-serif; color: #333; ">
            <b>Pending Deliveries against Invoices:</b>
            <table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                    <tr style="background-color: #f2f2f2; text-align: left;">
                        <th style="padding: 8px; width: 20px;">#</th>
                        <th style="padding: 8px; width: 70px;">Invoice No.</th>
                        <th style="padding: 8px;width: 95px;">Invoice Date</th>
                        <th style="padding: 8px; width: 100px;">Customer</th>
                        <th style="padding: 8px; width: 100px;">Amount</th>
                    </tr>
                </thead>
                <tbody style="background-color: #fff;">
    `;

    // Generate table rows dynamically for each invoice
    invoiceData.invoices.forEach((invoice, index) => {
        formattedText += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 8px;">${index + 1}.</td>
                <td style="padding: 8px;">
                    <a href='#' class="invoice-item" data-index="${index}" style="color: #007bff; text-decoration: none;">
                        ${invoice.orderNo}
                    </a>
                </td>
                <td style="padding: 8px;">${invoice.orderDate}</td>
                <td style="padding: 8px;">${invoice.customer}</td>
                <td style="padding: 8px; text-align: right;">${invoice.amount}</td>
            </tr>`;
    });

    // Add total amount row
    formattedText += `
            <tr style="border-top: 2px solid #333; font-weight: bold;">
                <td colspan="5" style="padding: 8px; text-align: left;">Total: 7,000,000</td>
            </tr>
        </tbody>
    </table>
</div>
    `;

    postBotSalesReply(formattedText);

    // Post additional instructions
    postBotSalesReply(`
        Would you like to take action on any of the above items? Click on the invoice number or type the corresponding serial number.
        <div class="response-buttons" style="margin-top: 10px;">
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
        </div>
    `);

    userInputSalesState = 'awaiting_invoice_details';

    // Add click event listener to invoice items
    $(document).on('click', '.invoice-item', function (event) {
        event.preventDefault(); // Prevent default link behavior
        const index = parseInt($(this).data('index'), 10);
        const invoice = invoiceData.invoices[index];

        if (invoice) {
            showPeopleSelection(invoice); // Show the people selection after clicking on an invoice
        }
    });

    // Add event listener for Back button
    $(document).on('click', '#back-btn', function (event) {
        event.preventDefault(); // Prevent default action
        $('#messageSales').text("back to menu");
        $('#sendSales').click();
    });
}

// Function to display people selection after clicking on an invoice
function showPeopleSelection(invoice) {
    const people = [
        { name: 'Naman Singhal', email: 'naman@example.com' },
        { name: 'Bob Smith', email: 'bob@example.com' },
        { name: 'Charlie Brown', email: 'charlie@example.com' }
    ];

    let peopleList = `
        <div class="people-selection" style="margin-top: 15px;">
            These are the authorized persons to make delivery; please select one person to send an email regarding delivery.
            <table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                    <tr style="background-color: #f2f2f2; text-align: left;">
                        <th style="padding: 8px; width: 50%;">Name</th>
                        <th style="padding: 8px; width: 50%;">Email</th>
                    </tr>
                </thead>
                <tbody>
    `;

    people.forEach(person => {
        peopleList += `
            <tr>
                <td style="padding: 8px;">
                    <a href='#' class="person-item" data-name="${person.name}" data-email="${person.email}" style="color: #007bff; text-decoration: none;">
                        ${person.name}
                    </a>
                </td>
                <td style="padding: 8px;">${person.email}</td>
            </tr>
        `;
    });

    peopleList += `
                </tbody>
            </table>
        </div>
    `;

    postBotSalesReply(peopleList);
}

// Event listener for clicking on a person to send an email
$(document).on('click', '.person-item', function (event) {
    event.preventDefault();
    const personName = $(this).data('name');
    const personEmail = $(this).data('email');

    // Prompt for email confirmation without executing email sending
    promptEmailConfirmation(personName, personEmail);
});

// // Function to prompt for email confirmation
function promptEmailConfirmation(name, email) {
    postBotSalesReply(`
        <div style="margin-top: 15px; font-size: 16px;">
            Would you like to send an email to <b>${name}</b> at <b>${email}</b>?
            <div class="response-buttons" style="margin-top: 8px; display: flex; gap: 10px;">
                <button class="send-email-btn" data-name="${name}" data-email="${email}" type="button" style="margin-right: 5px; padding: 5px 10px; font-size: 16px; background-color: #008cba; border: none; color: white; border-radius: 4px; text-align: center; text-decoration: none; display: inline-block; margin: 4px 2px; cursor: pointer; margin-left: 0px;">Send Email</button>
                <button class="back-btn" type="button" style="padding: 5px 10px; border-radius: 5px; border: none; cursor: pointer; background-color: #f01d1d; color: white; margin :4px 2px">Back to Menu</button>
            </div>
        </div>
    `);
}

// Event listener for sending email
$(document).on('click', '.send-email-btn', function (event) {
    event.preventDefault(); // Prevent default action
    const name = $(this).data('name');
    const email = $(this).data('email');

    // Logic to send the email; replace this with actual email sending logic
    postBotSalesReply(`<b>Customer Name</b>: ${name}<br><b>Email id</b>: ${email}<br> <b>Subject</b>: Request to make dispatch against invoice number 0115 <br><br>Here is the draft email to customer to clear the outstanding payment.`);

    // Call to fetchApiResponseSalesEmail (replace with actual email sending logic)
    fetchApiResponseSalesEmail(`write an email to ${name} to facilitate delivery against pending delivery against invoice number 0115 dated 11-sep-2024 without subject regards Vaibhav`);
});

// Event listener for back buttons
$(document).on('click', '.back-btn', function (event) {
    event.preventDefault(); // Prevent default action
    $('#messageSales').text("back to menu");
    $('#sendSales').click();
});

const outstandingPayments = [
    {
        billNumber: 11234,
        customerName: "Glamour Beauty Co.",
        billDueDate: "20/04/24",
        outstandingAmount: "$400,000"
    },
    {
        billNumber: 22345,
        customerName: "Luxe Cosmetics LLC",
        billDueDate: "15/05/24",
        outstandingAmount: "$300,000"
    },
    {
        billNumber: 33456,
        customerName: "Radiant Skin Essentials",
        billDueDate: "18/03/24",
        outstandingAmount: "$350,000"
    },
    {
        billNumber: 44567,
        customerName: "PureGlow Organics",
        billDueDate: "10/02/24",
        outstandingAmount: "$500,000"
    },
    {
        billNumber: 55678,
        customerName: "Bella Vita Beauty",
        billDueDate: "05/01/24",
        outstandingAmount: "$450,000"
    }
];


function salesToConversion() {
    const conversionData = [
        {
            sr: 1,
            quotNo: '01002',
            quotDate: '01-JAN-2024',
            customerName: 'UVE Limited',
            quotVal: 4000000,
            salesOrderVal: 1000000,
            conversion: '25%'
        },
        {
            sr: 2,
            quotNo: '01004',
            quotDate: '06-JAN-2024',
            customerName: 'WER Limited',
            quotVal: 3000000,
            salesOrderVal: 1000000,
            conversion: '33%'
        },
        {
            sr: 3,
            quotNo: '0105',
            quotDate: '30-AUG-2023',
            customerName: 'TYH Limited',
            quotVal: 10000000,
            salesOrderVal: 3000000,
            conversion: '30%'
        },
        {
            sr: 4,
            quotNo: '0115',
            quotDate: '30-AUG-2023',
            customerName: 'TUJ Limited',
            quotVal: 12000000,
            salesOrderVal: 2000000,
            conversion: '16.67%'
        },
        {
            sr: 5,
            quotNo: '9116',
            quotDate: '30-AUG-2024',
            customerName: 'TUG Limited',
            quotVal: 10000000,
            salesOrderVal: 2500000,
            conversion: '25%'
        }
    ];

    // Calculate totals
    const totalQuotVal = conversionData.reduce((acc, item) => acc + item.quotVal, 0);
    const totalSalesOrderVal = conversionData.reduce((acc, item) => acc + item.salesOrderVal, 0);
    const totalConversion = ((totalSalesOrderVal / totalQuotVal) * 100).toFixed(2) + '%';

    // Generate HTML table with the provided data
    let formattedText = `
    <div class="outstanding-payments-list" style="font-family: Arial, sans-serif; color: #333;">
       <span style="font-size: 1.6rem"> <b>Outstanding Payments Report:</b> </span>
        <table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
                <tr style="background-color: #f2f2f2; text-align: left;">
                    <th style="padding: 8px; width: 35px;">Sr.</th>
                    <th style="padding: 8px; width: 57px;">Bill No.</th>
                    <th style="padding: 8px; width: 150px;">Customer Name</th>
                    <th style="padding: 8px; width: 100px;">Bill Due Date</th>
                    <th style="padding: 8px; width: 120px;">Outstanding Amount</th>
                </tr>
            </thead>
            <tbody style="background-color: #fff;">
`;

    outstandingPayments.forEach((item, index) => {
        formattedText += `
        <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px;">${index + 1}</td>
            <td style="padding: 8px;">
                <a href="#" style="color: #1a73e8; text-decoration: none;">${item.billNumber}</a>
            </td>
            <td style="padding: 8px;">${item.customerName}</td>
            <td style="padding: 8px;">${item.billDueDate}</td>
            <td style="padding: 8px; text-align: center;">${item.outstandingAmount}</td>
        </tr>`;
    });

    formattedText += `
        </tbody>
    </table>
</div>`;

    formattedText += `
        <div class="response-buttons" style="margin-top: 10px;">
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
        </div>
    `



    // Add total row
    // formattedText += `
    //         <tr style="border-top: 2px solid #333; font-weight: bold;">
    //             <td colspan="3" style="padding: 8px;">Total:</td>
    //             <td style="padding: 8px; text-align: right;">${totalQuotVal.toLocaleString()}</td>
    //             <td style="padding: 8px; text-align: right;">${totalSalesOrderVal.toLocaleString()}</td>
    //         </tr>
    //     </tbody>
    // </table>
    // </div>
    // `;

    // Post the formatted conversion list
    postBotSalesReply(formattedText);




    // Post additional instruction
    // postBotSalesReply(`
    //     Here is the quotation to sales conversion of current month report <br>
    //     <b> Total Quotation Value: </b> 39,000,000 <br> <b> Sales order value: </b> 9,500,000 <br> <b> Conversion percentage:</b> 24.36%  
    //     <div class="response-buttons" style="margin-top: 10px;">
    //         <button id="back-btn" class="response-button" type="button">Back to Menu</button>
    //     </div>
    // `);

    userInputSalesState = 'awaiting_conversion_details';

    // Add click event listeners to customer names
    $(document).on('click', '.conversion-list a', function (event) {
        event.preventDefault(); // Prevent default link behavior
        console.log('Customer link clicked'); // Verify event trigger
        const customer = $(this).text();
        $('#messageSales').text(`Follow up with ${customer}`);
        $('#sendSales').click();
    });

    // Add event listener for Back button
    $(document).on('click', '#back-btn', function (event) {
        event.preventDefault(); // Prevent default action
        $('#messageSales').text("back to menu");
        $('#sendSales').click();
    });
}

function newCustomerAcquired() {
    const acquiredData = [
        {
            month: 'Sep’2024',
            customerName: 'Alfred Company',
            value: 660000
        },
        {
            month: 'Sep’2024',
            customerName: 'Shoprite Company',
            value: 390000
        }
    ];

    // Calculate total value
    const totalValue = acquiredData.reduce((acc, item) => acc + item.value, 0);

    // Generate HTML table with the provided data
    let formattedText = `
        <div class="acquisition-list" style="font-family: Arial, sans-serif; color: #333;">
            <b>New Customer Acquisition Report:</b>
            <table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px; ;">
                <thead>
                    <tr style="background-color: #f2f2f2; text-align: left;">
                        <th style="padding: 8px; width: 100px;">Acquired Month</th>
                        <th style="padding: 8px; width: 150px;">Customer Name</th>
                        <th style="padding: 8px; width: 100px;">Value</th>
                    </tr>
                </thead>
                <tbody style="background-color: #fff;">
    `;

    acquiredData.forEach((item) => {
        formattedText += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 8px;">${item.month}</td>
                <td style="padding: 8px;">
                    <a href="#" class="customer-item" data-customer="${item.customerName}" style="color: #007bff; text-decoration: none;">
                        ${item.customerName}
                    </a>
                </td>
                <td style="padding: 8px; text-align: right;">${item.value.toLocaleString()}</td>
            </tr>`;
    });

    // Add total row
    formattedText += `
            <tr style="border-top: 2px solid #333; font-weight: bold;">
                <td colspan="2" style="padding: 8px;">Total Value:</td>
                <td style="padding: 8px; text-align: right;">${totalValue.toLocaleString()}</td>
            </tr>
        </tbody>
    </table>
    </div>
    `;

    // Post the formatted acquisition list
    postBotSalesReply(formattedText);

    // Post additional instruction
    postBotSalesReply(`
       Two new customers are aquired today adding a total value of <b> 1,050,000
        <div class="response-buttons" style="margin-top: 10px;">
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
        </div>
    `);

    userInputSalesState = 'awaiting_customer_action';

    // Add click event listeners to customer names
    $(document).on('click', '.customer-item', function (event) {
        event.preventDefault(); // Prevent default link behavior
        console.log('Customer link clicked'); // Verify event trigger
        const customer = $(this).data('customer');
        $('#messageSales').text(`Follow up with ${customer}`);
        $('#sendSales').click();
    });

    // Add event listener for Back button
    $(document).on('click', '#back-btn', function (event) {
        event.preventDefault(); // Prevent default action
        $('#messageSales').text("back to menu");
        $('#sendSales').click();
    });
}

function topCustomerOfTheDay() {
    // Generate today's date in the desired format (e.g., 26th Sep’2024)
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'short' });
    const year = today.getFullYear();

    // Add ordinal suffix to the day (1st, 2nd, 3rd, etc.)
    const dayWithSuffix = day + getOrdinalSuffix(day);

    const formattedDate = `${dayWithSuffix} ${month}’${year}`;

    const topCustomer = {
        day: formattedDate,
        customerName: 'M/S Dembe Enterprises',
        value: 1800000
    };

    // Generate HTML layout for the top customer
    let formattedText = `
        <div class="top-customer" style="font-family: Arial, sans-serif; color: #333; ">
            <b>Top Customer of the Day:</b>
            <table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px; ;">
                <thead>
                    <tr style="background-color: #f2f2f2; text-align: left;">
                        <th style="padding: 8px; width: 100px; text-align:center; padding:15px">Day</th>
                        <th style="padding: 8px; width: 170px; text-align:center;">Customer Name</th>
                        <th style="padding: 8px; width: 100px; text-align:center;">Value</th>
                    </tr>
                </thead>
                <tbody style="background-color: #fff;">
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 15px;">${topCustomer.day}</td>
                        <td style="padding: 8px;">
                            <a href="#" class="customer-item" data-customer="${topCustomer.customerName}" style="color: #007bff; text-decoration: none;">
                                ${topCustomer.customerName}
                            </a>
                        </td>
                        <td style="padding: 8px; text-align: right;">${topCustomer.value.toLocaleString()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    // Post the formatted customer data
    postBotSalesReply(formattedText);

    // Additional prompt to take action
    postBotSalesReply(`
        Here is the top customer of today
        <div class="response-buttons" style="margin-top: 10px;">
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
        </div>
    `);

    userInputSalesState = 'awaiting_top_customer_action';

    // Event listener for customer link
    $(document).on('click', '.customer-item', function (event) {
        event.preventDefault(); // Prevent default link behavior
        const customer = $(this).data('customer');
        $('#messageSales').text(`Follow up with ${customer}`);
        $('#sendSales').click();
    });

    // Event listener for Back button
    $(document).on('click', '#back-btn', function (event) {
        event.preventDefault(); // Prevent default action
        $('#messageSales').text("back to menu");
        $('#sendSales').click();
    });
}

// Helper function to get ordinal suffix for the day
function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th'; // Special case for 11th to 20th
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}


const voiceSalesContainer = document.getElementById('voice-container');
voiceSalesContainer.addEventListener('click', () => {
    // Add the active class to show dots and hide the mic
    voiceSalesContainer.classList.add('active');

    // Remove the active class after 5 seconds to revert to the mic icon
    setTimeout(() => {
        voiceSalesContainer.classList.remove('active');
    }, 5000); // 5 seconds
});


function postBotListSalesReply(reply) {
    var bot_img = '<img src="r/wsts/117/files/static/v271/chat_bot_icon-removebg-preview.png" alt="bot" width="125" height="72">'
    const html = `<div class="post post-bot">${reply + timeStamp()}               
                </div>`;
    const timeTyping = 500 + Math.floor(Math.random() * 2000);
    $("#message-boardSales").append(html);
    $scrollSalesDown();
}       


async function fetchSalesApilangchain(session, context) {
       const apiUrl = 'http://192.168.5.136:8004/generate-suggestions/';

    console.log('Request Body:', { session_ID: session, user_input: context });

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                session: session,
                question: context
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        const data = await response.json();
        console.log("API response data:", data);

        // Check if 'Answer_to_user_question' and 'Auto_prompt' fields exist and process them
        if (data.result && data.result.Answer_to_user_question) {
            const answer = data.result.Answer_to_user_question;

            // Log Answer_to_user_question
            console.log("Answer to user's question:", answer);

            // Display the main bot reply first
            await new Promise((resolve) => {
                // postBotRFQReply(answer); // Pass the answer to postBotRFQReply
                postBotSalesNewReply(answer);
                setTimeout(resolve, 100); // Delay for 2 seconds to allow the answer to display
            });

            // Process Auto_prompts if available
            if (data.result.Auto_prompt && typeof data.result.Auto_prompt === 'object') {
                const autoPrompts = data.result.Auto_prompt;
                console.log("Auto prompts:", autoPrompts);

                let promptsList = [];
                // Iterate over the Auto_prompt object to extract questions and make them clickable
                for (let key in autoPrompts) {
                    if (key.startsWith("Question_")) {
                        promptsList.push(autoPrompts[key]);
                    }
                }

                // Display clickable prompts one by one after the main reply
                if (promptsList.length > 0) {
                    promptsList.forEach((prompt, index) => {
                        setTimeout(() => {
                            postBotSalesReply(`
                                <div class="clickable-prompt option10" 
                                     style="padding: 5px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 1px; cursor: pointer;" 
                                     data-prompt="${prompt}">
                                     • ${prompt}
                                </div>    
                            `);
                            if (index === promptsList.length - 1) {
                                setTimeout(() => addSalesBackToMenuButton(), 1500);
                            }
                        }, index * 1500); // Display each prompt with a 1.5-second delay
                    });
                }
                
            }

            userInputSalesState = 'awaiting_apiinsight_response';
        } else {
            console.error("Invalid response format or missing fields in the API response.");
            postBotReply("Error: Invalid response format from the server.");
        }

    } catch (error) {
        console.error('Error during fetch:', error.message);
        postBotReply("Oops! Something went wrong while fetching data. Please try again later.");
    }
}

function addSalesBackToMenuButton() {
    const menuButtonHTML = `
        <div class="action-buttons">
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
        </div>
    `;
    $('#message-boardSales').append(menuButtonHTML);
}

// Event handler for dynamically added prompts
$(document).on('click', '.clickable-prompt', function(event) {
    event.preventDefault();
    const promptText = $(this).data('prompt');  // Get the prompt text
    $('#messageSales').text(promptText);           // Set it as the message text
    $('#sendSales').click();                       // Simulate clicking the send button
});
