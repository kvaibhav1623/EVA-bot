

// // Consolidated function for fading in elements
// function fadeInElements() {
//     $(".a1").fadeIn(500);
//     $(".a2").fadeIn(2000);
//     $(".a3").fadeIn(4000);
//     $(".a4").fadeIn(5000);
//     $(".a5").fadeIn(5000);
//     $(".a6").fadeIn(5000);
//     $(".a7").fadeIn(5000);
//     $(".a8").fadeIn(5000);
// }

// function callbotnew() {
//     $("#bots_id").dialog({
//         dialogClass: "no-titlebar",
//         height: 580,
//         width: 430,
//         position: { my: "left top", at: "left bottom-50", of: "#botnew_oq" },
//         show: 'slideDown',
//         open: function (event, ui) {
//             $('.ui-widget-overlay').addClass('overlay-hidden');
//             $('.ui-widget-overlay').bind('click', function () { $("#bots_id").dialog('close'); });
//             $('#botnew_oq').hide();
//               fadeInElements(); // Call the function to fade in elements
//         },
//         beforeClose: function (event, ui) {
//             $('.ui-widget-overlay').removeClass('overlay-hidden');
//             $('#botnew_oq').show();
//         }
//     });

//     $("#bots_id").dialog("open");
// }

//     // function botcall(){
       
// 	// 	$("#landing").slideUp(300);
// 	// 	setTimeout(() => {
// 	// 		$("#start-chat").html("Continue chat")
// 	// 	}, 300);
//     // }

// // Back arrow button
// 	$("#back-button").on("click", () => {
// 		//$("#landing").show();
//         $("#bots_id").dialog('close'); 
// 	});


// 	// Menu - navigation
// 	$("#nav-icon").on("click", () => {
// 		$("#nav-containernew").show();
// 	});

// 	$("#nav-containernew").on("mouseleave", function() {
//         $(this).slideUp(200);
//     });

//     // Event handlers for the nav links
//     $(".nav-link").on("click", function() {
//         $("#nav-containernew").slideToggle(200);
//     });

// 	$("#av-iconn").on("click", function() {
//         $("#nav-containernew").slideToggle(200);
//     });

// 	// Clear history
// 	$("#clear-history").on("click", () => {
// 		$("#message-board").empty();
// 		$("#message").empty();
// 	});

//     function loadChatHistory() {
//         var chatHistory = [
//             'Approval pending For purchase order',
//             'Insights of Purchase Order',
//             'stock coverage',
//         ];

//         var chatHistoryList = $('#nav-containernew ul.nav');
//         chatHistoryList.empty(); // Clear previous history

//         chatHistory.forEach(function(chat) {
//             chatHistoryList.append('<li class="nav-link">' + chat + '</li>');
//         });
//     }

//     // Call loadChatHistory to populate the chat history list
//     loadChatHistory();

function typeMessage(message, elementId, callback) {
    let i = 0;

    function displayNextLetter() {
        if (i < message.length) {
            document.getElementById(elementId).innerHTML += message.charAt(i);
            i++;
            setTimeout(displayNextLetter, 20); // Delay between letters
        } else if (callback) {
            callback(); // Call the callback function after the message is fully displayed
        }
    }
    displayNextLetter();
}

// Consolidated function for fading in elements
function fadeInElements() {
    $(".a1").fadeIn(500);
    $(".a2").fadeIn(2000);
    $(".a3").fadeIn(4000);
    $(".a4").fadeIn(5000);
    $(".a5").fadeIn(5000);
    $(".a6").fadeIn(5000);
    $(".a7").fadeIn(5000);
    $(".a8").fadeIn(5000);
}

let itemHtml = '';
let todoListPopulated = false; // Flag to track if the To-Do list is populated
let messageTyped = false; // Flag to track if the message has been typed

function initializeBotDialog(height, width, position) {
    const username = $v('P0_USERNAME');
    const $botDialog = $("#bots_id");
    

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
                $('#botnew_oq').hide();
                fadeInElements(); // Call the function to fade in elements

                // Start typing the message when the dialog opens
                const message = `Hello ${capitalizeFirstLetter(username)}, I am EVA, your AI Copilot. How can i assist you today?`;
                const botMessageElementId = 'botMessage';

                if (!messageTyped) { // Check if the message has already been typed
                    // Show the message board
                    document.querySelector('.post-bot').style.display = 'block';

                    // Type the message letter by letter
                    typeMessage(message, botMessageElementId, function () {
                        // After the message is fully displayed, show the To-Do list
                        if (!todoListPopulated) { // Only fetch if not already populated
                            fetchToDoList(); // Fetch the To-Do list when the message is fully displayed
                        }
                    });
                    messageTyped = true; // Set the flag to true after typing the message
                }
            },
            beforeClose: function (event, ui) {
                $('.ui-widget-overlay').removeClass('overlay-hidden');
                $('#botnew_oq').show();
            }
        });
        $botDialog.dialog("open");
    }
}

function callbotnew() {
    initializeBotDialog(680, 450, { my: "right top", at: "right top", of: window });
}

function callbotmediumsize() {
    initializeBotDialog(680, 750); // Medium size
}

function callbotlargesize() {
    initializeBotDialog(680, 1200); // Large size
}

function mainmenu() {
    const username = $v('P0_USERNAME');

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    const message = `Hello ${capitalizeFirstLetter(username)}, I am EVA, your AI Copilot. How can i assist you today?`;
    postBotReply(message);
    fetchToDoList();
}
// Back arrow button
$("#back-button").on("click", () => {
    $("#bots_id").dialog('close');
});

// Menu - navigation
$("#nav-icon").on("click", () => {
    $("#nav-containernew").show();
});

$("#nav-containernew").on("mouseleave", function () {
    $(this).slideUp(200);
});

// Event handlers for the nav links
$(".nav-link").on("click", function () {
    $("#nav-containernew").slideToggle(200);
});

$("#av-iconn").on("click", function () {
    $("#nav-containernew").slideToggle(200);
});

// Adjust bot size
$("#medium-size").on("click", () => {
    callbotmediumsize(); // Call medium size bot dialog
});

$("#normal-size").on("click", () => {
    callbotnew(); // Call normal size bot dialog
});

$("#large-size").on("click", () => {
    callbotlargesize(); // Call large size bot dialog
});

function fetchToDoList() {
    const compCode = '01' ;//$v('P0_COMP_CODE');
    const userCode = '01' ;//$v('P0_USERCODE');
    const taskcode = ("32");

    $.ajax({
        url: 'http://192.168.5.190:8080/ords/wsts/account_dtl/todolist?compcode=' + compCode +'&usercode='+ userCode +'&taskcode=' + taskcode,
        
        method: 'GET',
        success: function (todolist) {
            console.log("To do list fetched successfully:", todolist);
            const todolistdata = todolist.items;
            displayToDoList(todolistdata); // Display the fetched To-Do list
            todoListPopulated = true; // Set the flag to true
            postBotNewReply('Would you like to take action on any of the above items? Please respond with the number of the item.');
        },
        error: function (xhr, status, error) {
            console.error(error);
            const reply = "Error fetching suggested items. Please try again later.";
            postBotNewReply(reply);
        }
    });
}


function displayToDoList(todolistdata) {
    console.log('todolistdata', todolistdata);
    const todoContainer = $("#todo-container"); // Assume you have a container in the dialog for the list
    todoContainer.empty(); // Clear any previous content

    // Filter tasks with double-digit taskcode
    const filteredTasks = todolistdata.filter(item => item.taskcode.length === 4);

    if (filteredTasks.length > 0) {
        let itemHtml = '<div class="brply a2" style="display: block;">';

        filteredTasks.forEach((item, index) => {
            itemHtml += `<div class="option1" data-taskcode="${item.taskcode}" data-index="${index}"><span style="font-weight: bold;">${index + 1}.</span> ${item.taskname}</div>`;
        });

        itemHtml += '</div>';

        // Post the formatted HTML as the bot reply
        postBotReply(itemHtml);
        userInputState = 'awaiting_todo_list';

        // // Add click event listener to each item
        // $(".option1").on("click", function() {
        //     const taskcode = $(this).data("taskcode");
        //     console.log(`Option number ${taskcode} clicked`);
        //     // console.log(`Option number ${number} clicked`);
        // });
         $(document).off('click', '.option1');

         $(document).on('click', '.option1', function(event) {
            event.preventDefault(); // Prevent default link behavior
            const taskcode = $(this).data("taskcode");
            console.log(`Option number ${taskcode} clicked`);
            const index = $(this).data("index");
            const item = filteredTasks[index];
            $(this).prop('disabled', true);
            if (item) {
            $('#messagenew').text(`${index + 1}`);
            $('#sendnew').click();
            }
        }); 

    } else {
        todoContainer.append("<div>No double-digit to-do items found.</div>");
    }
}

	// Sign out
	$("#sign-out").on("click", () => {
		$("#message-board").empty();
		$("#message").empty();
		$("#landing").show();
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
	function $postMessage() {
		$("#messagenew").find("br").remove();
		let $message = $("#messagenew").html().trim(); // get text from text box
		$message = $message.replace(/<div>/, "<br>").replace(/<div>/g, "").replace(/<\/div>/g, "<br>").replace(/<br>/g, " ").trim();
		if ($message) { // if text is not empty
			const html = `<div class="post post-user">${$message + timeStamp()}</span></div>`; // convert post to html
			$("#message-boardnew").append(html); // add post to board
			$scrollDown(); // stay at bottom of chat
			botReply($message);
		};
		$("#messagenew").empty();
	};

	// Chat input
	$("#messagenew").on("keyup", (event) => {
		if (event.which === 13) $postMessage(); // Use enter to send
	}).on("focus", () => {
		$("#messagenew").addClass("focus");
	}).on("blur", () => {
		$("#messagenew").removeClass("focus");
	});
	$("#sendnew").on("click", $postMessage);


	/**********************/
	/*** AUTO REPLY BOT ***///var compCode = $v('P0_COMPCODE');
	/**********************/

let userInputState = '';
let itemData = null;
var graphData = [];

$('#sendnew').on('click', function() {
        var userMessage = $('#messagenew').text().trim();
        if (userMessage || attachedImage) {
            if (attachedImage) {
                Tesseract.recognize(attachedImage, 'eng', {
                    logger: m => console.log(m)
                }).then(({ data: { text } }) => {
                    console.log(text);
                    $('#messagenew').text(text);
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
    $('#messagenew').text('');
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
        success: function(response) {
            console.log('API response:', response);

            try {
                // Check if candidates array exists and has at least one candidate
                if (response && response.candidates && response.candidates.length > 0) {
                    // Assuming we take the first candidate's content's text part
                    if (response.candidates[0].content && response.candidates[0].content.parts && response.candidates[0].content.parts.length > 0) {
                        var botResponse = response.candidates[0].content.parts[0].text.trim(); // Get the text and trim any whitespace
                        postBotNewReply(botResponse);

                        // $s('P1_MAILBODY',botResponse);
                        userInputState = 'awaiting_api_response';
                    } else {
                        postBotReply('Unexpected response format: Missing content parts');
                    }
                } else {
                    postBotReply('Unexpected response format: Missing candidates array');
                }
            } catch (error) {
                console.error('Error processing response:', error);
                // $('#message-board').append('<div class="post post-bot" style="color:red;">Error: ' + error.message + '</div>');
            }
        },
        error: function(xhr, status, error) {
            console.error(`API call error: ${xhr.status} - ${xhr.statusText}`, xhr.responseText);
            // $('#message-board').append('<div class="post post-bot" style="color:red;">Error: ' + xhr.responseText + '</div>');
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
        success: function(response) {
            console.log('API response:', response);

            try {
                if (response && response.candidates && response.candidates.length > 0) {
                    if (response.candidates[0].content && response.candidates[0].content.parts && response.candidates[0].content.parts.length > 0) {
                        var botResponse = response.candidates[0].content.parts[0].text.trim(); // Get the text and trim any whitespace
                        console.log('Bot response:', botResponse); // Debugging line to check the response
                        
                        // Call postBotReply and ensure it works
                        postBotMailReply(botResponse);

                        // Add buttons after the bot response
                        $('#message-boardnew').append(`
                            <div class="action-buttons">
                                <button class="action-btn" data-action="review">Review</button>
                                <button class="action-btn" data-action="send">Send</button
                            </div>
                        `);

                        $s('P0_MAILBODY', botResponse);
                        userInputState = 'awaiting_api_details';
                    } else {
                        console.error('Unexpected response format: Missing content parts');
                        postBotReply('Unexpected response format: Missing content parts');
                    }
                } else {
                    console.error('Unexpected response format: Missing candidates array');
                    postBotReply('Unexpected response format: Missing candidates array');
                }
            } catch (error) {
                console.error('Error processing response:', error);
                postBotReply('Error processing response');
            }
        },
        error: function(xhr, status, error) {
            console.error(`API call error: ${xhr.status} - ${xhr.statusText}`, xhr.responseText);
            $('#message-board').append('<div class="post post-bot" style="color:red;">Error: ' + xhr.responseText + '</div>');
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

async function fetchApiResponseEmail(context) {
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
        const emailSubject = data.subject||'Request for Price Revision Quotation' ;
        const emailBody = data.response;

        // Post the email response
        postBotNewReply(emailBody);
        console.log(emailBody);

        // Add Review and Send buttons after the bot response
        $('#message-boardnew').append(`
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

        userInputState = 'awaiting_api_details';
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
        const emailSubject = data.subject||'Request for Price Revision Quotation' ;
        const emailBody = data.response;

        // Post the email response
        postBotNewReply(emailBody);
        console.log(emailBody);

        // Add Review and Send buttons after the bot response
        $('#message-boardnew').append(`
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

        userInputState = 'awaiting_priceapi_details';
        return emailBody; // Return the generated email template
    } catch (error) {
        throw new Error(`Error generating email template: ${error.message}`);
    }
}

$('#message-boardnew').on('click', '.price-btn', function(event) {
    event.preventDefault(); // Prevent the default action
    const action = $(this).data('action');

    if (action === 'review') {
        console.log('Review button clicked');
        // openMailDialog();
        sendEmail();
        // Implement review functionality here
    } else if (action === 'send') {
        console.log('Send button clicked');
        // postBotReply(`Email sent to Supplier <b>Supplier A</b>`);
        // Implement send functionality here
        console.log("outstanding payment next button")
         setTimeout(() => {
        postBotReply(`Action Has been taken on invoice number 0105 of customer ZEST LIMITED:
             
         <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    </div>
                    `);
        }, 500);  
        userInputState = 'awaiting_stockcovrge_details';

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
        const emailSubject = data.subject||'Request for Price Revision Quotation' ;
        const emailBody = data.response;

        // Post the email response
        postBotNewReply(emailBody);
        console.log(emailBody);

        // Add Review and Send buttons after the bot response
        $('#message-boardnew').append(`
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

        userInputState = 'awaiting_apierly_details';
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
        const emailSubject = data.subject||'Request for Early Delivery' ;
        const emailBody = data.response;

        // Post the email response
        postBotNewReply(emailBody);
        console.log(emailBody);

        // Add Review and Send buttons after the bot response
        $('#message-boardnew').append(`
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

        userInputState = 'awaiting_apierly_details';
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
        const emailSubject = data.subject||'Request for Early Delivery' ;
        const emailBody = data.response;

        // Post the email response
        postBotNewReply(emailBody);
        console.log(emailBody);

        // Add Review and Send buttons after the bot response
        $('#message-boardnew').append(`
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

        userInputState = 'awaiting_apierly_details';
        return emailBody; // Return the generated email template
    } catch (error) {
        throw new Error(`Error generating email template: ${error.message}`);
    }
}

// Use event delegation to handle button clicks
$('#message-boardnew').on('click', '.acction-butn', function(event) {
    event.preventDefault(); // Prevent the default action
    const action = $(this).data('action');

    if (action === 'review') {
        console.log('Review button clicked');
        // openMailDialog();
        sendEmail();
        // Implement review functionality here
    } else if (action === 'send') {
        console.log('Send button clicked');
        // postBotReply(`Email sent to Supplier <b>GlowCo</b>`);
        // Implement send functionality here
         setTimeout(() => {
        postBotReply(`Here is the remaining recommendations.
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
        userInputState = 'awaiting_supleaded_details';
    }
});

function postBotNewReply(reply) {
    // Define the bot image HTML
    var bot_img = '<img src="r/wsts/123/files/static/v270/chat_bot_icon.png" alt="bot" width="30" height="30">';

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
    $("#message-boardnew").append(htmlContent);

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
        if (typeof $scrollDown === 'function') {
            $scrollDown();
        } else {
            console.warn('$scrollDown function is not defined.');
        }
    }

    // Start displaying the paragraphs sequentially
    displayParagraphsSequentially(paragraphs, responseContainerId);
}

function sendEmail() {
            const body = $v("P0_MAILBODY")
            const subject = $v("P0_MAIL_SUBJECT")
            const email_id = ('Vaibhav@gmail.com')
            const mailtoLink = `mailto:${encodeURIComponent(email_id)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
        }

// Use event delegation to handle button clicks
$('#message-boardnew').on('click', '.action-btn', function(event) {
    event.preventDefault(); // Prevent the default action
    const action = $(this).data('action');

    if (action === 'review') {
        console.log('Review button clicked');
        // openMailDialog();
        sendEmail();
        // Implement review functionality here
    } else if (action === 'send') {
        console.log('Send button clicked');
        // postBotReply(`Email sent to Supplier <b>GlowCo</b>`);
        // Implement send functionality here
        console.log("next button of 1st option of tdl")
         setTimeout(() => {
        postBotReply(`Action has been taken on the order number 0130 of customer ACHELIS (TANGANYIKA) LIMITED.  
        <div class="response-buttons" style="margin-top: 10px;">
         <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            
        </div>`);
        }, 500);  
        userInputState = 'awaiting_suplead_details';

        // Add click event listeners to response buttons
    $(document).on('click', '#yes-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("yes");
        $('#sendnew').click();
    });

    }
});

$('#message-boardnew').on('click', '.action-bttn', function(event) {
    event.preventDefault(); // Prevent the default action
    const action = $(this).data('action');

    if (action === 'review') {
        console.log('Review button clicked');
        // openMailDialog();
        sendEmail();
        // Implement review functionality here
    } else if (action === 'send') {
        console.log('Send button clicked');
        // postBotReply(`Email sent to Supplier <b>Supplier A</b>`);
        // Implement send functionality here
         setTimeout(() => {
        postBotReply(`Here is the remaining critical insight for Sales Order No. 0130:
                    <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                    <span style="font-weight: bold;">1.</span> 3 items have price variation from previous Purchase.
                    </div>
                    To review this insight in more detail, click on the link.
                    <div class="response-buttons" style="margin-top: 10px;">
                    <button id="approval-btn" class="response-button" type="button">Action</button>
         <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    
                    </div>
                    `);
        }, 500);  
        userInputState = 'awaiting_ordere_details';

        // Add click event listeners to response buttons
    $(document).on('click', '#yes-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("yes");
        $('#sendnew').click();
    });

    }
});

$('#message-boardnew').on('click', '.action-buttn', function(event) {
    event.preventDefault(); // Prevent the default action
    const action = $(this).data('action');

    if (action === 'review') {
        console.log('Review button clicked');
        // openMailDialog();
        sendEmail();
        // Implement review functionality here
    } else if (action === 'send') {
        console.log('Send button clicked');
        // postBotReply(`Email sent to Supplier <b>Supplier A</b>`);
        // Implement send functionality here
         setTimeout(() => {
        postBotReply(`Here is the remaining critical insight for Sales Order No. 0130:
                    <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                    <span style="font-weight: bold;">1.</span> 3 items have price variation from previous Purchase.
                    </div>
                    To review this insight in more detail, click on the link.
                    `);
        }, 500);  
        userInputState = 'awaiting_ordere_details';

        // Add click event listeners to response buttons
    $(document).on('click', '#yes-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("yes");
        $('#sendnew').click();
    });

    }
});


// Use event delegation to handle button clicks
$('#message-boardnew').on('click', '.action-btttn', function(event) {
    event.preventDefault(); // Prevent the default action
    const action = $(this).data('action');

    if (action === 'review') {
        console.log('Review button clicked');
        // openMailDialog();
        sendEmail();
        // Implement review functionality here
    } else if (action === 'send') {
        console.log('Send button clicked');
        // postBotReply(`Email sent to Supplier <b>GlowCo</b>`);
        // Implement send functionality here
         setTimeout(() => {
        postBotReply(`
        <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">1.</span> The current delivery date for the order is 16-09-2024. Please request the supplier for early delivery of these items.
                
            </div>
            <div class="response-buttons" style="margin-top: 10px;">
            <button id="approval-btn" class="response-button" type="button">Action</button>
         <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    
                    </div>
        `);
        }, 500);  
        userInputState = 'awaiting_suplllead_details';

        // Add click event listeners to response buttons
    $(document).on('click', '#yes-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("yes");
        $('#sendnew').click();
    });

    }
});


// Use event delegation to handle button clicks
$('#message-boardnew').on('click', '.action-butn', function(event) {
    event.preventDefault(); // Prevent the default action
    const action = $(this).data('action');

    if (action === 'review') {
        console.log('Review button clicked');
        // openMailDialog();
        sendEmail();
        // Implement review functionality here
    } else if (action === 'send') {
        console.log('Send button clicked');
        // postBotReply(`Email sent to Supplier <b>GlowCo</b>`);
        // Implement send functionality here
         setTimeout(() => {
        postBotReply(`Here is the remaining recommendations.
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
        userInputState = 'awaiting_suplead_details';

        // Add click event listeners to response buttons
    $(document).on('click', '#yes-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("yes");
        $('#sendnew').click();
    });

    }
});

function openMailDialog(){
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
        postBotNewReply(appointmsg);
        console.log(appointmsg);
        // $s('P3_EMAIL_BODY_APPOINT',appointmsg);
        return appointmsg; // Assuming the API returns an email template in JSON format
    } catch (error) {
        throw new Error(`Error generating email template: ${error.message}`);
    }
}



function postBotMailReply(reply) {
    // Define the bot image HTML
    var bot_img = '<img src="r/wsts/108/files/static/v270/chat_bot_icon.png" alt="bot" width="30" height="30">';

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
    $("#message-boardnew").append(htmlContent);
    
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
    if (typeof $scrollDown === 'function') {
        $scrollDown();
    } else {
        console.warn('$scrollDown function is not defined.');
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
        const emailSubject = data.subject||'Request for Quotation for Cold Cream,Pet Food,Mango Juice & Organic Vegetables';
        const emailBody = data.response;

        // Post the email response
        postBotRFQReply(emailBody);
        console.log(emailBody);

        // Add Review and Send buttons after the bot response
        $('#message-boardnew').append(`
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

        userInputState = 'awaiting_rfqapi_details';
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
        const emailSubject = data.subject||'Request for Quotation for Cold Cream,Pet Food,Mango Juice & Organic Vegetables';
        const emailBody = data.response;

        // Post the email response
        postBotRFQReply(emailBody);
        console.log(emailBody);

        // Add Review and Send buttons after the bot response
        $('#message-boardnew').append(`
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

        userInputState = 'awaiting_rfqqapii_details';
        return emailBody; // Return the generated email template
    } catch (error) {
        throw new Error(`Error generating email template: ${error.message}`);
    }
}

// Use event delegation to handle button clicks
$('#message-boardnew').on('click', '.actionn-bttnn', function(event) {
    event.preventDefault(); // Prevent the default action
    const action = $(this).data('action');

    if (action === 'review') {
        console.log('Review button clicked');
        // openMailDialog();
        sendEmail();
        // Implement review functionality here
    } else if (action === 'send') {
        console.log('Send button clicked');
        // postBotReply(`Email sent to Supplier <b>GlowCo</b>`);
        // Implement send functionality here
        console.log("next button of 2nd option in tdl")
         setTimeout(() => {
        postBotReply(`Action has been taken on the Sales order No. 0130. <br>Do you want to take action on the other pending Purchase Order? <br> 
        <div class="response-buttons" style="margin-top: 10px;">
            <button id="yes-btn" class="response-button" type="butten">Yes</button>
            <button id="no-btn" class="response-button" type="butten">No</button>
   
         <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            
        </div>`);
        }, 500);  
        userInputState = 'awaiting_purchorder_details';

        // Add click event listeners to response buttons
    $(document).on('click', '#yes-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("yes");
        $('#sendnew').click();
    });

    $(document).on('click', '#no-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("no");
        $('#sendnew').click();
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
        const emailSubject = data.subject||'Request for Quotation for Cold Cream,Pet Food,Mango Juice & Organic Vegetables';
        const emailBody = data.response;

        // Post the email response
        postBotRFQReply(emailBody);
        console.log(emailBody);

        // Add Review and Send buttons after the bot response
        $('#message-boardnew').append(`
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

        userInputState = 'awaiting_rfqqapi_details';
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
        const emailSubject = data.subject||'Request for Quotation for Cold Cream,Pet Food,Mango Juice & Organic Vegetables';
        const emailBody = data.response;

        // Post the email response
        postBotRFQReply(emailBody);
        console.log(emailBody);

        // Add Review and Send buttons after the bot response
        $('#message-boardnew').append(`
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

        userInputState = 'awaiting_rfqqapi_details';
        return emailBody; // Return the generated email template
    } catch (error) {
        throw new Error(`Error generating email template: ${error.message}`);
    }
}

// Use event delegation to handle button clicks
$('#message-boardnew').on('click', '.action-butttn', function(event) {
    event.preventDefault(); // Prevent the default action
    const action = $(this).data('action');

    if (action === 'review') {
        console.log('Review button clicked');
        // openMailDialog();
        sendEmail();
        // Implement review functionality here
    } else if (action === 'send') {
        console.log('Send button clicked');
        // postBotReply(`Email sent to Supplier <b>GlowCo</b>`);
        // Implement send functionality here
         setTimeout(() => {
        postBotReply(`
        <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">1.</span> The current delivery date for the order is 16-09-2024. Please request the supplier for early delivery of these items.
                
            </div>
            <div class="response-buttons" style="margin-top: 10px;">
            <button id="approval-btn" class="response-button" type="button">Action</button>
                <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    </div>
        `);
        }, 500);  
        userInputState = 'awaiting_supllierlead_details';
    }
});



function postBotRFQReply(reply) {
    // Define the bot image HTML
    var bot_img = '<img src="r/wsts/108/files/static/v270/chat_bot_icon.png" alt="bot" width="30" height="30">';

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
    $("#message-boardnew").append(htmlContent);

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
        if (typeof $scrollDown === 'function') {
            $scrollDown();
        } else {
            console.warn('$scrollDown function is not defined.');
        }
    }

    // Start displaying the paragraphs sequentially
    displayParagraphsSequentially(paragraphs, responseContainerId);
}



function botReply(userMessage) {
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

if (userInputState === 'awaiting_todo_list' || userInputState ==! 'awaiting_ordere_details' || userInputState ==! 'awaiting_price_details'){
    if (message.includes('one') || message.includes('1')) {
    let reply = [
        `Here are the items on your to-do list:`,
        `<div class="brply a2" style="display: block; margin-top: 10px; font-size: 16px;">
            <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">1.</span> Approval pending for 3 sales order
            </div>
            <div class="option1" data-number="2" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">2.</span> Outstanding Payments more than 180 days:  (5 customers) -> 6,000,000.

            </div>
            <div class="option1" data-number="3" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">3.</span> Conversion pending for 3 qoutations 
            </div>
            <div class="option1" data-number="4" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">4.</span> Invoices completed 3 awaiting delivery
            </div>
           <br><br> Would you like to take action on any of the above items? Please respond with the number of the item.
            <div class="response-buttons" style="margin-top: 10px;">
         <button id="back-btn" class="response-button" type="button">Back to Menu</button></div>
        </div>`

    ];

      $(document).on('click', '.option1', function(event) {
        var number = $(this).data('number');
        $('#messagenew').text(number);
        $('#sendnew').click();
    });
    postBotReply(reply);

    // postBotReply(``);
    
    userInputState = 'awaiting_app_details';

    $(document).on('click', '#back-btn', function(event) {
                        event.preventDefault();  // Prevent default action
                        $('#messagenew').text("back to menu");
                        $('#sendnew').click();
                    });

                      $(document).on('click', '#approval-btn', function(event) {
                        event.preventDefault();  // Prevent default action
                        $('#messagenew').text("action");
                        $('#sendnew').click();
                    });
} else if ((message.includes('two') || message.includes('2'))){
           let reply = [
        `Here are the important updates for the day:`,
        `<div class="brply a2" style="display: block; margin-top: 10px; font-size: 16px;">
            <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">1.</span> 	Quotation vs. Sales Order Conversion: 39M quotations, 9.50M sales orders (25.93% conversion); would you like insights on this?
            </div>
            <div class="option1" data-number="2" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">2.</span>	Two new customers Aquired 
            </div>
         
            <br>Would you like to take action on any of the above items? Please respond with the number of the item.
            <div class="response-buttons" style="margin-top: 10px;">
<button id="back-btn" class="response-button" type="button">Back to Menu</button></div>
        </div>`

    ];

    $(document).on('click', '.option1', function(event) {
        var number = $(this).data('number');
        $('#messagenew').text(number);
        $('#sendnew').click();
    });
    postBotReply(reply);

     userInputState = 'awaiting_alert_details';
    }
    else if ((message.includes('three') || message.includes('3'))){
           let reply = [
        `Here are the list of graph:`,
        `<div class="brply a2" style="display: block; margin-top: 10px; font-size: 16px;">
            <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">1.</span> Product Groupwise Sales
            </div>
            <div class="option1" data-number="2" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">2.</span> Customer Categorywise Sales
            </div>
            <div class="option1" data-number="3" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">3.</span> Half Yearly Revenue
            </div>
            <div class="option1" data-number="4" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">4.</span> Quarter Wise Revenue 
            </div>
            <br>Would you like to take action on any of the above items? Please respond with the number of the item.
            <div class="response-buttons" style="margin-top: 10px;">
         <button id="back-btn" class="response-button" type="button">Back to Menu</button></div>
        </div>`

    ];
    $(document).on('click', '.option1', function(event) {
        var number = $(this).data('number');
        $('#messagenew').text(number);
        $('#sendnew').click();
    });
    postBotReply(reply);

     userInputState = 'awaiting_graphinsight_details';
    }
}
 else if (message.includes('back')) {
    mainmenu();
    userInputState = 'awaiting_start_details';
}
else if (message.includes('action')) {
    redirectToApexPage('00000118', '13-08-2024');
}
else if (userInputState === 'awaiting_start_details' || userInputState ==! 'awaiting_ordere_details' || userInputState ==! 'awaiting_price_details'){
    if (message.includes('one') || message.includes('1')) {
    let reply = [
        `Here are the items on your to-do list:`,
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
                <span style="font-weight: bold;">4.</span> Weekly Purchase Order Delivery Tracking
            </div>
            <br><br>Would you like to take action on any of the above items? Please respond with the number of the item.
            <div class="response-buttons" style="margin-top: 10px;">
         <button id="back-btn" class="response-button" type="button">Back to Menu</button></div>
        </div>`

    ];
    postBotReply(reply);

    
    userInputState = 'awaiting_app_details';

    $(document).on('click', '#back-btn', function(event) {
                        event.preventDefault();  // Prevent default action
                        $('#messagenew').text("back to menu");
                        $('#sendnew').click();
                    });
    } else if ((message.includes('two') || message.includes('2'))){
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

    $(document).on('click', '.option1', function(event) {
        var number = $(this).data('number');
        $('#messagenew').text(number);
        $('#sendnew').click();
    });
    postBotReply(reply);

     userInputState = 'awaiting_alert_details';
    }

    else if ((message.includes('three') || message.includes('3'))){
            let reply = [
        `Here are the list of graph:`,
        `<div class="brply a2" style="display: block; margin-top: 10px; font-size: 16px;">
            <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">1.</span> Purchase order trend.
            </div>
            <div class="option1" data-number="2" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">2.</span> Month wise Consignment counting.
            </div>
            <div class="option1" data-number="3" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">3.</span> Month wise Purchase Bill Booked.
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
    $(document).on('click', '.option1', function(event) {
        var number = $(this).data('number');
        $('#messagenew').text(number);
        $('#sendnew').click();
    });
    postBotReply(reply);

    //  userInputState = 'awaiting_graph_details';
        userInputState = 'awaiting_graphinsight_details';
    }
}
 else if (message.includes('back')) {
  
    fetchToDoList();
    postBotReply(reply);
    userInputState = 'awaiting_start_details';
}
else if (message.includes('action')) {
    redirectToApexPage('00000118', '13-08-2024');
}
 else {
        if (userInputState === 'awaiting_app_details') {
            if (message === '1' || message.includes('approval pending for 4 Sales Orders') || message.includes('one') || message.includes('1')) {
                formatPurchaseOrders(purchaseOrderData); 
                // displayPOappDetails();
                userInputState = 'awaiting_order_details';
            } else if (message === '2' || message.includes('pending bill') || message.includes('2') || message.includes('two')) {
                generatePendingRFQsList();
            } else if (message === '3' || message.includes('daily mis to manager') || message.includes('3') || message.includes('three')) {
                
                generatePendingQuotationsList();
                // userInputState = 'awaiting_mis_details'; 
            } else if (message === '4' || message.includes('daily mis to manager') || message.includes('4') || message.includes('four')) {
                formatInvoiceData(invoiceData);
                userInputState = 'awaiting_taskcomp_details';

                  $(document).on('click', '#yes-btn', function(event) {
                        event.preventDefault();  // Prevent default action
                        $('#messagenew').text("yes");
                        $('#sendnew').click();
                    });

                $(document).on('click', '#no-btn', function(event) {
                    event.preventDefault();
                    $('#messagenew').val("no");
                    $('#sendnew').click();
                });
            }
        } else if (userInputState === 'awaiting_order_details') {
            if (message === '1' || message.includes('select one')) {
            postBotReply(`
                    <div style="font-size: 18.5px;">
                        What would you like to do next for Sales Order No. 0130?
                        <div class="response-buttons" style="margin-top: 8px;">
                            <button id="insight-btn" class="response-button" style="padding: 6px 12px; border-radius: 4px;  color: white; border: none; cursor: pointer;" type="button">Insight</button>
                            <button id="approval-btn" class="response-button" style="padding: 6px 12px; border-radius: 4px; color: white; border: none; cursor: pointer;" type="button">Action</button>
         <button id="back-btn" class="response-button" type="button">Back to Menu</button></div>
                    </div>
                `);

                userInputState = 'awaiting_insgt_details';
             $(document).on('click', '#insight-btn', function(event) {
                        event.preventDefault();  // Prevent default action
                        $('#messagenew').text("insight");
                        $('#sendnew').click();
                    });

            }
        }  else if (userInputState === 'awaiting_insight_details') {
            if (message === '1' || message.includes('one') || message.includes('1')) {
                formatPurchasestockItems(purchaseOrderitem);    
            } else if (message === '2' || message.includes('two') || message.includes('2')) {
                formatPurchasePriceIItems(poPriceVeriance);    
            }

        } else if (userInputState === 'awaiting_taskcomp_details') {
            if (message.includes('yes')) {
                postBotReply(` OK, Your task has been complete.
                <div class="response-buttons" style="margin-top: 10px;">
                    <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    </div>     
        `);

            } else if (message.includes('no')) {
                // formatPurchasePriceIItems(poPriceVeriance);    
            }
        }
         else if (userInputState === 'awaiting_insgt_details') {
            if (message === '1' || message.includes('insight')) {
                formatPurchaseOrdersInsight(purchaseOrderDataInsight);   
            }
        } else if (userInputState === 'awaiting_newquot_details') {
            if (message === '1' || message.includes('insight')) {
                formatPurchaseOrdersInsight(purchaseOrderDataInsight);   
            }
        } else if (userInputState === 'awaiting_stockcovrge_details') {
            if (message === '1' || message.includes('one') || message.includes('1')) {
                formatPurchasestockItems(purchaseOrderitem);    
            }
        }

        else if (userInputState === 'awaiting_delivery_details') {

             if (message === '1' || message.includes('one') || message.includes('1') ) {
                // getPurchaseOrderDetails(1);
                 // Display the datepicker input
        const calendarHtml = '<input type="text" id="datepicker" placeholder="Select a date" style="width: 116px;border-radius: 5px;">';
        // postBotReply(`Please select the preferred delivery date ${calendarHtml}`);
        // postBotReply('do you want to send a reminder email to customer to reduce the outstanding balance?');
        formatDueOverdueBills(dueoverduebills);
        fetchApipricevarianceEmail('Request HOD to clear ₹5,000,000 to approve sales order. Include table: Invoice #0105 (30-Nov-2023): ₹3M, 8 months; Invoice #0115 (30-Dec-2023): ₹2M, 7 months'+ purchaseOrderitem);
        console.log("Fourth option of to-do-list")
        // sendEmail();

let selectedDateId = null;
        // Initialize datepicker and handle date selection
        $("#datepicker").datepicker({
            onSelect: function(dateText) {
                // Display the selected date
                if (selectedDateId) {
                    $(`#${selectedDateId}`).text(`You have selected: ${dateText} as the delivery date. <br> Reason - High demand`);
                } else {
                    selectedDateId = `date-${new Date().getTime()}`;
                    postBotReply(`<div id="${selectedDateId}">You have selected: ${dateText} as the delivery date. <br> Reason - High demand</div>`);
                     // Post the question for price variation after selecting the date
               setTimeout(() => {
                postBotReply(`Would you like to send an email to the supplier requesting early delivery for these items?<br> 
                    <div class="response-buttons" style="margin-top: 10px;">
                    <button id="yes-btn" class="response-button" type="button">Yes</button>
                     <button id="no-btn" class="response-button" type="button">No</button>
                    </div>`);
                    userInputState = 'awaiting_erlymail_details';
                     }, 500); 
                }

              // Bind click events to the price variation buttons
                $(document).on('click', '#yes-btn', function(event) {
                        event.preventDefault();  // Prevent default action
                        $('#messagenew').text("yes");
                        $('#sendnew').click();
                    });

                $(document).on('click', '#no-btn', function(event) {
                    event.preventDefault();
                    $('#messagenew').val("no");
                    $('#sendnew').click();
                });
            }
        });
    } 

    else if(message === '2' || message.includes('two') || message.includes('2') ){
            formatPurchaseleadsuppItemss(purchasesuppleaditem);
    }
}
    else if (userInputState === 'awaiting_suplllead_details') {
 
             if (message === '1' || message.includes('one') || message.includes('1') ) {
                // getPurchaseOrderDetails(1);
                 // Display the datepicker input
        const calendarHtml = '<input type="text" id="datepicker" placeholder="Select a date" style="width: 116px;border-radius: 5px;">';
        // postBotReply(`Please select the preferred delivery date ${calendarHtml}`);
        //  postBotReply('do you want to send a reminder email to customer to reduce the outstanding balance?');  not working
        formatDueOverdueBills(dueoverduebills);
        fetchApipricevarianceEmail('Request HOD to clear ₹5,000,000 to approve sales order. Include table: Invoice #0105 (30-Nov-2023): ₹3M, 8 months; Invoice #0115 (30-Dec-2023): ₹2M, 7 months'+ purchaseOrderitem);
        console.log("Fifth option of to-do-list")
        // sendEmail();

        let selectedDateId = null;
        // Initialize datepicker and handle date selection
        $("#datepicker").datepicker({
            onSelect: function(dateText) {
                // Display the selected date
                if (selectedDateId) {
                    $(`#${selectedDateId}`).text(`You have selected: ${dateText} as the delivery date. <br> Reason - High demand`);
                } else {
                    selectedDateId = `date-${new Date().getTime()}`;
                    postBotReply(`<div id="${selectedDateId}">You have selected: ${dateText} as the delivery date.<br> Reason - High demand</div>`);
                     // Post the question for price variation after selecting the date
               setTimeout(() => {
                postBotReply(`Would you like to send an email to the supplier requesting early delivery for these items?<br> 
                    <div class="response-buttons" style="margin-top: 10px;">
                    <button id="yes-btn" class="response-button" type="button">Yes</button>
                     <button id="no-btn" class="response-button" type="button">No</button>
                    </div>`);
                    userInputState = 'awaiting_erlyymail_details';
                     }, 500); 
                }

              // Bind click events to the price variation buttons
                $(document).on('click', '#yes-btn', function(event) {
                        event.preventDefault();  // Prevent default action
                        $('#messagenew').text("yes");
                        $('#sendnew').click();
                    });

                $(document).on('click', '#no-btn', function(event) {
                    event.preventDefault();
                    $('#messagenew').val("no");
                    $('#sendnew').click();
                });
            }
        });
    } 

    else if(message === '2' || message.includes('two') || message.includes('2') ){
            formatPurchaseleadsupplierItemss(purchasesuppleaditem);
    }
}   else if (userInputState === 'awaiting_deliveryy_details') {
             if (message === '1' || message.includes('one') || message.includes('1') ) {
                 // Display the datepicker input
        const calendarHtml = '<input type="text" id="datepicker" placeholder="Select a date" style="width: 116px;border-radius: 5px;">'; //WORKING 
        // postBotReply(`Please select the preferred delivery date ${calendarHtml}`);
         postBotReply('do you want to send a reminder email to customer to clear the outstanding balance?');
     formatDueOverdueBills(dueoverduebills);
     console.log("sixth option of to-do-list")
        // fetchApipricevarianceEmail('Request HOD to clear ₹5,000,000 to approve sales order. Include table: Invoice #0105 (30-Nov-2023): ₹3M, 8 months; Invoice #0115 (30-Dec-2023): ₹2M, 7 months'+ purchaseOrderitem);
          
        // sendEmail();
let selectedDateId = null;
        // Initialize datepicker and handle date selection
        $("#datepicker").datepicker({
            onSelect: function(dateText) {
                // Display the selected date
                if (selectedDateId) {
                    $(`#${selectedDateId}`).text(`You have selected: ${dateText} as the delivery date. <br> Reason - High demand`);
                } else {
                    selectedDateId = `date-${new Date().getTime()}`;
                    postBotReply(`<div id="${selectedDateId}">You have selected: ${dateText} as the delivery date. <br> Reason - High demand</div>`);
                     // Post the question for price variation after selecting the date
               setTimeout(() => {
                postBotReply(`Would you like to send an email to the supplier requesting early delivery for these items?<br> 
                    <div class="response-buttons" style="margin-top: 10px;">
                    <button id="yes-btn" class="response-button" type="button">Yes</button>
                     <button id="no-btn" class="response-button" type="button">No</button>
                    </div>`);
                    userInputState = 'awaiting_erlymaill_details';
                     }, 500); 
                }

              // Bind click events to the price variation buttons
                $(document).on('click', '#yes-btn', function(event) {
                        event.preventDefault();  // Prevent default action
                        $('#messagenew').text("yes");
                        $('#sendnew').click();
                    });

                $(document).on('click', '#no-btn', function(event) {
                    event.preventDefault();
                    $('#messagenew').val("no");
                    $('#sendnew').click();
                });
            }
        });
    } 

    else if(message === '2' || message.includes('two') || message.includes('2') ){
            formatPurchaseleadsuppItemss(purchasesuppleaditem);
    }
}   else if (userInputState === 'awaiting_supllierlead_details') {
 
             if (message === '1' || message.includes('one') || message.includes('1') ) {
                // getPurchaseOrderDetails(1);
                 // Display the datepicker input
        const calendarHtml = '<input type="text" id="datepicker" placeholder="Select a date" style="width: 116px;border-radius: 5px;">';
        // postBotReply(`Please select the preferred delivery date ${calendarHtml}`); postBotReply('Please select the user to whom you would like to send the email.');
        postBotReply('do you want to send a reminder email to customer to clear the outstanding balance?');
        formatDueOverdueBills(dueoverduebills);
        console.log("seventh option of to-do-list")
         //fetchApipricevarianceEmail('Request HOD to clear ₹5,000,000 to approve sales order. Include table: Invoice #0105 (30-Nov-2023): ₹3M, 8 months; Invoice #0115 (30-Dec-2023): ₹2M, 7 months'+ purchaseOrderitem);
        
        // sendEmail();

        let selectedDateId = null;
        // Initialize datepicker and handle date selection
        $("#datepicker").datepicker({
            onSelect: function(dateText) {
                // Display the selected date
                if (selectedDateId) {
                    $(`#${selectedDateId}`).text(`You have selected: ${dateText} as the delivery date. <br> Reason - High demand`);
                } else {
                    selectedDateId = `date-${new Date().getTime()}`;
                    postBotReply(`<div id="${selectedDateId}">You have selected: ${dateText} as the delivery date.<br> Reason - High demand</div>`);
                     // Post the question for price variation after selecting the date
               setTimeout(() => {
                postBotReply(`Would you like to send an email to the supplier requesting early delivery for these items?<br> 
                    <div class="response-buttons" style="margin-top: 10px;">
                    <button id="yes-btn" class="response-button" type="button">Yes</button>
                     <button id="no-btn" class="response-button" type="button">No</button>
                    </div>`);
                    userInputState = 'awaiting_erlyymail_details';
                     }, 500); 
                }

              // Bind click events to the price variation buttons
                $(document).on('click', '#yes-btn', function(event) {
                        event.preventDefault();  // Prevent default action
                        $('#messagenew').text("yes");
                        $('#sendnew').click();
                    });

                $(document).on('click', '#no-btn', function(event) {
                    event.preventDefault();
                    $('#messagenew').val("no");
                    $('#sendnew').click();
                });
            }
        });
    } 

    else postBotReply('no task please give correct ')
}

         else if (userInputState === 'awaiting_erlymail_details') {
            if (message === 'no' || message.includes('no')) {
                // getPurchaseOrderDetails(1);
                // fetchApiResponseInsight('recommendations for the Cold Cream product for business purposes');
                setTimeout(() => {
                postBotReply(`Here is the remaining recommendations.
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
        // userInputState = 'awaiting_ordere_details';
            userInputState = 'awaiting_suplead_details';
            }
            else if (message === 'yes' || message.includes('yes')) {
                
                }
        }    else if (userInputState === 'awaiting_erlymaill_details') {
            if (message === 'no' || message.includes('no')) {
                setTimeout(() => {
                postBotReply(`Here is the remaining recommendations.
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
            userInputState = 'awaiting_supleaded_details';
            }
            
        }
            else if (userInputState === 'awaiting_apierly_details') {
            fetchApierlydelEmail(`Summarize write a email to supplier(Kunal) to the supplier requesting early delivery for the item- Cold Cream,Pet Food & Mango Juice,Organic Vegetables Against sales order no 0130, Current delivery date 30-09-2024,reason for high demand, Upadted date 27-09-2024, regrds Saurav Sharma without subject`+ message);
        }
            else if (userInputState === 'awaiting_erlyymail_details') {
            if (message === 'no' || message.includes('no')) {
                // getPurchaseOrderDetails(1);
                // fetchApiResponseInsight('recommendations for the Cold Cream product for business purposes');
                 setTimeout(() => {
                 postBotReply(`Here is the remaining critical insight for Sales Order No. 0130:
                    <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                    <span style="font-weight: bold;">1.</span> 3 items have price variation from previous Purchase.
                    </div>
                    To review this insight in more detail, click on the link.
                    `);
                }, 500);  
                userInputState = 'awaiting_ordere_details';
            }
            
        }
        else if (userInputState === 'awaiting_apierly_details') {
         fetchApierllydelEmail(`Summarize write a email to supplier(Kunal) to the supplier requesting early delivery for the item- Cold Cream,Pet Food & Mango Juice,Organic Vegetables Against sales order no 0130, Current delivery date 30-09-2024, Upadted date 27-09-2024,reason for high demand, regrds Saurav Sharma without subject`+ message);
        }

        else if (userInputState === 'awaiting_ordere_details') {
            if (message === '1' || message.includes('one') || message.includes('1')) {
                formatDueOverdueBills(dueoverduebills);
                console.log("Make a call")
            }
        }

        else if (userInputState === 'awaiting_price_details') {
            if (message === '1' || message.includes('glowco')) {
                fetchApiResponseInsight('recommendations for the Cold Cream product for business purposes');
                console.log("cold cream product")
            }
            else if (message === 'send email' || message.includes('send') | message.includes('yes')) { // --> sending email for the first option of the to-do-list
                postBotNewReply(`<b>Customer Name</b>:ACHELIS (TANGANYIKA) LIMITED<br><b>Email id</b>: Vaibhav@gmail.com<br> <b>Subject</b>:Request to Clear outstanding balance then to approve the current <br><br>Here is the draft email to customer to clear the outstanding payment `)
               fetchApiResponseEmail('Request Vaibhav to clear ₹5,000,000 to approve sales order. Include table: Invoice #0105 (30-Nov-2023): ₹3M, pending 8 months; Invoice #0115 (30-Dec-2023): ₹2M, pending 7 months. Regards, Saurav Sharma without subject'+ poPriceVeriance);  
               console.log("First option of to-do-list")
            }
        } else if (userInputState === 'awaiting_secondprice_details') {
            if (message === 'send email' || message.includes('send') | message.includes('yes')) {
                // postBotNewReply(`<b>Customer Name</b>: ACHIELIS TANGANYIKA LIMITED<br><b>Email id</b>: sabir.khan@ebizframe.com<br> <b>Subject</b>:Request to reduce outstanding balance then to approve the current <br><br>Here is the draft email for supplier requesting an early delivery.`)
               fetchApipricevarianceEmail('Request HOD to clear ₹5,000,000 to approve sales order. Include table: Invoice #0105 (30-Nov-2023): ₹3M, 8 months; Invoice #0115 (30-Dec-2023): ₹2M, 7 months'+ purchaseOrderitem);
               console.log("second option of to-do-list")
            }
        }

        else if (userInputState === 'awaiting_suplead_details') {          
            if (message === '1' || message === 'one' || message.includes('one') || message.includes('1')) {
                // getPurchaseOrderDetails(1);
                 console.log('achlies ltd');
                formatPurchaseleadsuppItems(purchasesuppleaditem);
               
            }
        } else if (userInputState === 'awaiting_supleaded_details') {
          
             if (message === '1' || message === 'one' || message.includes('one') || message.includes('1')) {
                // getPurchaseOrderDetails(1);
                 console.log('zest ltd');
                formatPurchaseleadsuppItems2nd(purchasesuppleaditem);
               
            }
        }

         else if (userInputState === 'awaiting_purchapp_details') {
            if (message === '1' || message.includes('glowco')) {
                // getPurchaseOrderDetails(1);
                fetchApiResponseInsight('recommendations for the Cold Cream product for business purposes');
            }
            else if (message === 'yes' || message.includes('yes')) {
                // getPurchaseOrderDetails(1);
                postBotMailReply('Purchase Order has been approved.');
                // fetchApiResponseRFQEmail('write a email to supplier(Kunal Kishor) for a request for quotation for items- Face Wash & Fresh Herbs, regrds Saurav Sharma');
                // // userInputState ='awaiting_supplead_details';
            }
        }

        else if (userInputState === 'awaiting_supplirlead_details') {
            if (message === '1' || message.includes('glowco')) {
                // getPurchaseOrderDetails(1);
                fetchApiResponseInsight('recommendations for the Cold Cream product for business purposes');
            }
            else if (message === 'yes' || message.includes('yes')) {
                // getPurchaseOrderDetails(1);
                let reply = [
            `Here are the items on your to-do list:`,
        `<div class="brply a2" style="display: block; margin-top: 10px; font-size: 16px;">
            <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">1.</span> Approval pending for 4 Sales Orders.
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
                <span style="font-weight: bold;">4.</span> Weekly Purchase Order Delivery Tracking
            </div>
            <div class="response-buttons" style="margin-top: 10px;">
 <button id="back-btn" class="response-button" type="button">Back to Menu</button></div>
        </div>`
        ];
        postBotReply(reply);
        userInputState = 'awaiting_app_details';
            }
        }
        
        else if (userInputState === 'awaiting_rfq_details') {
            if (message === '1' || message.includes('one') || message.includes('1')) {
                // generateRFQDetails();
                // formatRFQItems();
                postBotNewReply(`<b>Customer Name</b>:ZEST LIMITED<br><b>Email id</b>: Vaibhav@gmail.com<br> <b>Subject</b>:Request to Clear the outstanding payment<br><br>Here is the draft email to customer to clear the outstanding payment `)
                fetchApipricevarianceEmail('"Write a strict email requesting the customer to clear an outstanding payment of ₹3,000,000 (invoice 0105, dated 30-Nov-2023, pending 8 months). Include a table with relevant invoice details. State that clearing dues is necessary to proceed with further transactions, without mentioning service continuity or future transactions. End with "Best regards" and a courteous sign-off."');
                console.log("Third option of to-do-list")
            } else if (message === '2' || message.includes('two') || message.includes('2')) {
                // generateRFQDetails();
                fetchApibilldetails('wrte a message to be displayed, GRN receip no 25, GRN receipt date 10 days ago, GRN value 	4,237,288.14, credit days 30 supplier -ACHELIS (TANGANYIKA) LIMITED and average bill processing days 16');
            }
        } else if (userInputState === 'awaiting_mail_details') {
            if (message === '1' ) {
                postBotReply('Here is the draft email to the team with a request to reassess the addition of CoolSkin for Cold Cream:');
                fetchApiResponseMail('draft email to the team with a request to reassess the addition of CoolSkin for Cold Cream');
            }    
        } 
        else if (userInputState === 'awaiting_api_details'){
            // fetchApiResponseMail('draft email to the team with a request to reassess the addition of CoolSkin for Cold Cream' + message);
            fetchApiResponseEmail('Summarize write a email to supplier(Kunal) to get a price revision quotation for items- 1.Soda, 2.Apple Juice & 3.Organic Fruits, Last Price - 1. 30,2. 120, 3. 300 & Current Price - 1. 40, 2. 130, 3. 320 regrds Saurav Sharma without subject' + message);
        } 
        else if (userInputState === 'awaiting_rfqapi_details'){
            // fetchApiResponseMail('draft email to the team with a request to reassess the addition of CoolSkin for Cold Cream' + message);
            // fetchApiResponseEmail('write a email to supplier(Kunal Kishor) to get a price revision quotation for items- Soda,Apple Juice & Organic Fruits, regrds Saurav Sharma without subject' + message);
            fetchApiResponseRFQEmail('Summarize write a email to supplier(Anil) for a request for quotation for items- Cold Cream,Pet Food,Mango Juice & Organic Vegetables which we wnat to scheduled data 27-09-2024 regrds Saurav Sharma without subject'+ message);
        } else if (userInputState === 'awaiting_rfqqapi_details'){
            // fetchApiResponseMail('draft email to the team with a request to reassess the addition of CoolSkin for Cold Cream' + message);
            // fetchApiResponseEmail('write a email to supplier(Kunal Kishor) to get a price revision quotation for items- Soda,Apple Juice & Organic Fruits, regrds Saurav Sharma without subject' + message);
            fetchApiResponseRFQQEmail('Summarize write a email to supplier(Anil) for a request for quotation for items- Cold Cream,Pet Food,Mango Juice & Organic Vegetables which we wnat to scheduled data 27-09-2024 regrds Saurav Sharma without subject'+ message);
        } 

        else if (userInputState === 'awaiting_purchaseapp_details') {
            if (message === 'yes' ) {
                postBotReply('Purchase Order 001 has been Approved');
            }
        }  else if (userInputState === 'awaiting_graph_details') {
            if (message.includes('one') || message.includes('1')) {
                 let reply = [
        `Here are the list of graph:`,
        `<div class="brply a2" style="display: block; margin-top: 10px; font-size: 16px;">
            <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;">1.</span> Purchase Order Trend.
            </div>
            <br><br>Would you like to take action on any of the above items? Please respond with the number of the item.
            <div class="response-buttons" style="margin-top: 10px;">
         <button id="back-btn" class="response-button" type="button">Back to Menu</button></div>
        </div>`

    ];
    postBotReply(reply);
     userInputState = 'awaiting_graphinsight_details';
            } 
        } else if (userInputState === 'awaiting_graphinsight_details') {
            if (message.includes('one') || message.includes('1')) {
                //  fetchgraphData();
                fetchAndCreateProductGroupChart();
            } else if (message.includes('two') || message.includes('2')) {
                 fetchConsignmentgraphData();
            } else if (message.includes('three') || message.includes('3')) {
                 fetchGraphData();
            } else if (message.includes('four') || message.includes('4')) {
                 topFiveSupplier();
            } else {
                postBotReply('No details found');
            }
        } else if (userInputState === 'awaiting_graphinsigh_details') {
            if (message.includes('yes')) {
                // generateGraphTemplate(graphData);
                if (graphData.length > 0) {
                // generateGraphTemplate(graphData);
                fetchApiResponse(graphData);
            } else {
                console.error('No graph data available');
            }
            }
        } else if (userInputState === 'awaiting_alert_details') {
            if (message.includes('one') || message.includes('1')) {
                formatexpitems(dueoverduebills);
            }
             if(userInputState === 'awaiting_alert_details'){
                if(message.includes('two') || message.includes('2')){
                    formatAcquiredCustomers(customerAcquired);
                }
            }
        } else if (userInputState === 'awaiting_alertrecm_details') {
            if (message.includes('one') || message.includes('1')) {
                fetchduebillEmail('Summarize write a email to account user(Rohit Kumar) release the payment to avoid delays, Bill no - 10, supplier- HIGHTECH PVT. LTD, bill amount - 4,237,288.14, and due date 09-10-2024 regrds Saurav Sharma');
            }
        }
        else if (userInputState === 'awaiting_bill_details') {
            if (message.includes('yes') ) {
                // postBotReply('Please select the user to whom you would like to send the email.');
                generateOptions(tasks);
            }
        } else if (userInputState === 'awaiting_username_details') {
           if (message.includes('one') || message.includes('1')) {
               postBotReply('You have selected Rohan Kumar');
               fetchpendingbillEmail('Summarize write a email to user(Rohan Kumar) mentioning to book purchase bils for already done GRNs, with GRN value of 18,29,500 ,and GRN number 15 and suppier ABC DISTRIBUTORS with credit days of 21 and my average bill processing to payment release time is 15 days, and GRN date is 8 days ago regrds Saurav Sharma without subject');
                
            } else if (message.includes('two') || message.includes('2')) {
               postBotReply('You have selected Anil Kumar');
               fetchpendingbillEmail('Summarize write a email to user(Anil Kumar) mentioning to book purchase bils for already done GRNs, with GRN value of 18,29,500 ,and GRN number 15 and suppier ABC DISTRIBUTORS with credit days of 21 and my average bill processing to payment release time is 15 days, and GRN date is 8 days ago regrds Saurav Sharma without subject');   
            }
        } else if (userInputState === 'awaiting_rembill_details') {
           if (message.includes('yes')) {
               generatePendingRFQsList();
                
            } else if (message.includes('No')) {
               
                
            }
        } else if (userInputState === 'awaiting_quotation_details') {
           if (message.includes('one') || message.includes('1')) {
               createCallUI();
                
            } else if (message.includes('two') || message.includes('2'))  {
               postBotReply('working');
               
            }
        }

        else if (userInputState === 'awaiting_invoice_details') {
            if (message.includes('one') || message.includes('1'))
            {
                console.log("create invoice email ")
            }
        }


        else {
            const reply = generateReply(message); // Generic reply generation
            if (typeof reply === "string") {
                postBotReply(reply);
            } else {
                createCallUI();
                console.log("ye kya kar raha hai")
                reply.forEach(str => postBotReply(str));
            }
        }
    }
}


function displayTaskDetails(taskcode) {
    console.log('taskcode',taskcode);
    const compCode = $v('P0_COMP_CODE');
    const userCode = $v('P0_USERCODE');
    // const userCode = $v('P0_USERCODE');
    $.ajax({
        url: 'http://192.168.5.190:8080/ords/wsts/account_dtl/subtodolist?compcode=' + compCode +'&usercode='+ userCode +'&taskcode=' + taskcode,
        method: 'GET',
        success: function(subtodolist) {
            console.log("Sub to-do list fetched successfully:", subtodolist);
            const subtodolistdata = subtodolist.items;
            // Process and display subtodolistdata here
        if (subtodolistdata.length > 0)  {
        let detailHtml = '<div class="brply a2" style="display: block;">';
            // detailHtml =  'Here are the items for your to-do list:'

        subtodolistdata.forEach((task, index) => {
            detailHtml += `<div class="option2" data-taskcode="${task.taskcode}" data-index="${index}"><span style="font-weight: bold;">${index + 1}.</span> ${task.taskname}</div>`;
        });

        detailHtml += '</div>';
        postBotNewReply('Here are the items for your to-do list:');
        setTimeout(() => {
        postBotReply(detailHtml + `<br>Would you like to take action on any of the above items? Please respond with the number of the item.`);
        // postBotNewReply(`Would you like to take action on any of the above items? Please respond with the number of the item.`)

        }, 1100); 
        userInputState = 'awaiting_order_details';

             $(document).off('click', '.option2');

             $(document).on('click', '.option2', function(event) {
                event.preventDefault(); // Prevent default link behavior
                const taskcode = $(this).data("taskcode");
                const index = $(this).data("index");
                const task = subtodolistdata[index];
                if (task) {
                $('#messagenew').text(`${index + 1}`);
                $('#sendnew').click();
                }
            }); 

            } else {
                postBotReply("No related tasks found.");
            }
        },
        error: function(xhr, status, error) {
            console.error(error);
            const reply = "Error fetching suggested items. Please try again later.";
            postBotReply(reply);
        }
    });
}


async function generateGraphTemplate(contextData) {
    console.log('contextData',contextData);
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
        postBotNewReply(data.response);

        userInputState = 'awaiting_apiinsight_details';
        return data.response;

    } catch (error) {
        console.error('Error generating graph analysis:', error);
        postBotReply('Failed to generate graph analysis. Please try again later.');
        return null;
    }
}


function getPurchaseOrderDetails(orderId) {
    const purchaseOrder = {
        supplierName: 'GlowCo',
        item: 'Cold Cream',
        quantity: 150,
        pricePerUnit: 135,
        totalCost: 20250,
        vat: 18,
        insights: {
            leadTime: 'The lead time for Cold Cream is 7 days, but the current stock coverage is 4 days, however the last order was delayed by 2 days.',
            priceVariation: 'The last purchase price was ₹130, now increased to ₹135, showing a 3.8% increase.',
            paymentTerms: 'The payment cycle is 30 days, usually settled in 35 days.',
            seasonalDemand: "Based on your store's sales history, Cold Cream typically experiences a 20% increase in demand during the summer months. Consider increasing your order quantity to 180 units to meet the projected demand.",
            profitMargin: 'The current profit margin for Cold Cream is 25%. By negotiating a 5% discount with GlowCo, you could increase your margin to 28.75%, potentially generating an additional ₹1,125 in profit for this order.',
            marketTrends: "There's a growing trend towards organic and natural skincare products. Consider expanding your range of Cold Creams to include organic options to capture this market segment.",
            supplierPerformance: 'GlowCo has maintained a 95% on-time delivery rate over the past 6 months, with an average delay of 1.5 days for late deliveries. Their product quality rating is 4.7 out of 5 based on customer feedback.',
            competitiveAnalysis: 'Your main competitor, BeautyZone, currently prices similar Cold Cream products at ₹150 per unit. Maintaining your current price point of ₹135 could give you a competitive edge in the market.',
            inventoryTurnover: 'The inventory turnover ratio for Cold Cream is 8, which is above the industry average of 6. This indicates efficient inventory management for this product.'
        }
    };

    let details = `<h3>Details of Purchase Order ${orderId}</h3>`;
    details += `<ul>`;
    details += `<li><b>Supplier Name:</b> ${purchaseOrder.supplierName}</li>`;
    details += `<li><b>Item:</b> ${purchaseOrder.item}</li>`;
    details += `<li><b>Quantity:</b> ${purchaseOrder.quantity}</li>`;
    details += `<li><b>Price per Unit:</b> ₹${purchaseOrder.pricePerUnit}</li>`;
    details += `<li><b>Total Cost:</b> ₹${purchaseOrder.totalCost}</li>`;
    details += `<li><b>VAT:</b> ${purchaseOrder.vat}%</li>`;
    details += `</ul>`;

    details += `<h4>Insights on Purchase Order ${orderId}:</h4>`;
    details += `<ul>`;
    details += `<li><b>Lead Time:</b> ${purchaseOrder.insights.leadTime}</li>`;
    details += `<li><b>Price Variation:</b> ${purchaseOrder.insights.priceVariation}</li>`;
    details += `<li><b>Payment Terms:</b> ${purchaseOrder.insights.paymentTerms}</li>`;
    details += `<li><b>Seasonal Demand:</b> ${purchaseOrder.insights.seasonalDemand}</li>`;
    details += `<li><b>Profit Margin:</b> ${purchaseOrder.insights.profitMargin}</li>`;
    details += `<li><b>Market Trends:</b>${purchaseOrder.insights.marketTrends}</li>`;
    details += `<li><b>Supplier Performance:</b> ${purchaseOrder.insights.supplierPerformance}</li>`;
    details += `<li><b>Competitive Analysis:</b> ${purchaseOrder.insights.competitiveAnalysis}</li>`;
    details += `<li><b>Inventory Turnover:</b> ${purchaseOrder.insights.inventoryTurnover}</li>`;
    details += `</ul>`;
    details += `Do you want to Approved Purchase Order?</li>`;

    postBotReply(details);
    // postBotReply('Do you want to Approved Purchase Order?');
    userInputState = 'awaiting_purchaseapp_details';
     $(document).on('click', '.recommendation-link', function(event) {
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
            <li><strong>Price Increase:</strong> The quoted price of ₹145 is 7.4% higher than our last purchase price of ₹135.</li>
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

    postBotReply(rfqDetails);
    userInputState = 'awaiting_mail_details';

    // Set up event listeners for user actions based on recommendations
    $(document).on('click', '.recommendation-link', function(event) {
        event.preventDefault();
        const recommendationIndex = $(this).data('recommendation');
        handleRecommendationAction(recommendationIndex);
    });
}

function postBotReply(reply) {
    var bot_img = '<img src="r/wsts/108/files/static/v270/chat_bot_icon.png" alt="bot" width="30" height="30">'
    const html = `<div class="post post-bot">${reply + timeStamp()}
                    <div class="bott" style="position: absolute;top: 4px; left:-42px;">${bot_img}</div>
                </div>`;
    const timeTyping = 500 + Math.floor(Math.random() * 2000);
    $("#message-boardnew").append(html);
    $scrollDown();
}

const purchaseOrderData = {
    orders: [
        { 
            id: '0130', 
            supplier: 'ACHIELIS TANGANYIKA LIMITED', 
            item: 'Cold Cream', 
            qty: 20, 
            price: 135, 
            vat: 18, 
            date: '25-11-2021', 
            sentBy: 'Supervisor' 
        },
        { 
            id: '0135', 
            supplier: 'ABC LIMITED', 
            item: 'Cold Cream', 
            qty: 15, 
            price: 135, 
            vat: 18, 
            date: '26-11-2021', 
            sentBy: 'Supervisor' 
        },
        { 
            id: '0145', 
            supplier: 'KINYARA SUGARS LIMITED', 
            item: 'Pet Food', 
            qty: 50, 
            price: 75, 
            vat: 12, 
            date: '01-12-2021', 
            sentBy: 'Supervisor' 
        }
    ],
    marketInsight: 'The FMCG sector has shown a 7% growth this quarter, with personal care and organic products leading the trend.'
};


const purchaseOrderitem = {
    customers: [
        { id: '001', name: 'ACHIELIS TANGANYIKA LIMITED', outstandingAmount: 5000000, timeSince: '2 months' }
    ],
};


const expiring2Month = {
    expiritem: [
        { id: '12', item: 'Shaving Cream 80gm', stockQty: 500, expirydate: '15th Nov 2024'},
    ],
};

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


const dueoverduebills = {
    duebill: [
        { id: '1', supplier: 'ACHELIS (TANGANYIKA) LIMITED', billno: 10, billamt: '4,237,288.14',duedate:'09-10-2024'},
       // { id: '2', supplier: 'HIGHTECH PVT. LTD', billno: 12, billamt: '6,537,000.14',duedate:'09-10-2024'}
    ],
};


const purchaseOrderDataInsight = {
    insights: [
        { id: '1', item: 'The Customer doesn’t make the payment on time and has an outstanding amount of 5,000,000 aginst the credit limit of 5,000,000' },
        { id: '2', item: 'The customers average buying pattern is infrequent, with purchases occurring once every 45 days'},
        // { id: '3', item: 'Another supplier has lesser lead time for 2 items' },
    ],
    
};

const poPriceVeriance = {
    priceitems: [
        { id: '004', item: 'Soda', lastprice: 30, currentprice: 40, variance: '33.33%' },
        { id: '005', item: 'Apple Juice', lastprice: 120, currentprice: 130, variance: '8.33%' },
        { id: '006', item: 'Organic Fruits', lastprice: 300, currentprice: 320, variance: '6.67%' }
    ],
};


const purchasesuppleaditem = {
    suppleaditems: [
        { id: '001', item: 'Face Wash', currectleadtime: 7, othersuppiler: 'Supplier A', leadtime: 5 },
        { id: '002', item: 'Fresh Herbs', currectleadtime: 7, othersuppiler: 'Supplier B', leadtime: 6 },
        // { id: '003', item: 'Grape Juice', currectleadtime: 7, othersuppiler: 'Supplier C', leadtime: 5 },
        // { id: '004', item: 'Hand Lotion', currectleadtime: 7, othersuppiler: 'Supplier D', leadtime: 6 }
    ],
};

function displayPOappDetails(taskcode) {
    const compCode =  $v('P0_COMP_CODE');
    const userCode = $v('P0_USERCODE');
// if (taskcode === 320101) {
    $.ajax({
        url: `http://192.168.5.190:8080/ords/wsts/account_dtl/poapprove?compcode=${compCode}&usercode=${userCode}`,
        method: 'GET',
        success: function(poappist) {
            console.log("PO Approval list fetched successfully:", poappist);
            poappistdata = poappist.items;

            formatPurchaseOrders(poappistdata);
            
            window.reqdetails = poappistdata.map(item => ({
                orderno: item.orderno,
                reqno: item.reqno,
                orderdate: item.orderdate,
                suppcode: item.suppcode
            }));
            
        },
        error: function(xhr, status, error) {
            console.error("Error fetching PO items:", error);
            postBotReply("Error fetching PO items. Please try again later.");
        }
    });
    // } else {
    //     postBotNewReply('No details found.')
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
    postBotReply(formattedText);

    setTimeout(() => {
    postBotReply(`Would you like to take action on any of the above Bill Due/Overdue? Please click on the preferred Bill Due/Overdue or respond with the corresponding number
                <div class="response-buttons" style="margin-top: 5px;">
         <button id="back-btn" class="response-button" type="button">Back to Menu</button></div>
    `);
    }, 1000);

    userInputState = 'awaiting_alertrecm_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function(event) {
        event.preventDefault(); // Prevent default link behavior
        console.log('Link clicked'); // Check if the click event is triggered
        const index = parseInt($(this).data('index'), 10);
        const order = data.duebill[index];
        if (order) {
            $('#messagenew').text(`${index + 1}`);
            $('#sendnew').click();
        }
    });
}



function formatPurchaseOrders(data) {
    let formattedText = `
        <div class="purchase-order-list" style="font-family: Arial, sans-serif; color: #333; margin-bottom: 20px;">
            <b> Here is the list of Sales Orders pending for your approval:</b>
            <table class="styled-table" style="table-layout: fixed;width: 100%;border-collapse: collapse;margin-top: 10px;/* padding: 8px 12px; *//* text-align: center; *//* vertical-align: middle; */">
                <thead>
                    <tr style="background-color: #f2f2f2; text-align: left;">
                        <th style="padding: 8px; width: 28px;">#</th>
                        <th style="padding: 2px;text-align: center;">Order</th>
                        <th style="padding: 8px;">Customer</th>
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
            </tr>`;
    });

    formattedText += `
                </tbody>
            </table>
        </div>
    `;

    // Post the formatted Sales Orders list
    postBotReply(formattedText);

    // Post additional instruction
    postBotReply(`
            To review the Sales Orders, click on the order link or reply with the corresponding number.
            <div class="response-buttons" style="margin-top: 10px;">
         <button id="back-btn" class="response-button" type="button">Back to Menu</button></div>
    `);

    userInputState = 'awaiting_order_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function(event) {
        event.preventDefault(); // Prevent default link behavior
        console.log('Link clicked'); // Check if the click event is triggered
        const index = parseInt($(this).data('index'), 10);
        const order = data.orders[index];
        // const order = data[index];
        if (order) {
            $('#messagenew').text(`${index + 1}`);
            $('#sendnew').click();
        }
    });
}
 $(document).on('click', '#back-btn', function(event) {
                        event.preventDefault();  // Prevent default action
                        $('#messagenew').text("back to menu");
                        $('#sendnew').click();
                    });


function formatPurchaseOrdersInsight(data) {
    let formattedText = `<div class="purchase-order-list" style="margin-top: 20px; font-size: 16px;">`;
    formattedText += `<b> Critical insights for Sales Order No 0130:</b>`;
    formattedText += '<table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 16px">';
    formattedText += '<tbody>';

    data.insights.forEach((order, index) => {
        formattedText += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 8px; width: 30px; font-weight: bold;">${index + 1}.</td>
                <td style="padding: 8px;">
                    <a href="#" class="order-item" data-index="${index}" style="color: #007BFF; text-decoration: none; font-weight: bold;">
                        ${order.item}
                    </a>
                </td>
            </tr>`;
    });

    formattedText += '</tbody></table>';
    formattedText += `</div>`;

    postBotReply(formattedText);

    postBotReply(`
                    To review these insights in detail, either click on the insight link or respond with the corresponding number.<br>
                    <div class="response-buttons" style="margin-top: 10px;">
                    <button id="approval-btn" class="response-button" type="button">Action</button>
                    <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    </div>
                `);
    
    userInputState = 'awaiting_insight_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function(event) {
        event.preventDefault(); // Prevent default link behavior
        console.log('Link clicked'); // Check if the click event is triggered
        const index = parseInt($(this).data('index'), 10);
        const order = data.insights[index];
        if (order) {
            $('#messagenew').text(`${order.item}`);
            $('#sendnew').click();
        }
    });
}


function formatPurchaseItems(data) {
    let formattedText = `
        <div class="purchase-order-list" style="font-family: Arial, sans-serif; color: #333;">
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

    // Render the purchase items and ask about rescheduling the delivery date
    postBotReply(formattedText);
     setTimeout(() => {
    postBotReply(` EVA Recommendations-
        <div class="brply a2" style="display: block; margin-top: 10px; font-size: 16px;">
            <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold;"></span> The outstanding balance is high and buying pattern is low with average 2,500,000 sales order. Put the Sales Order on Hold.
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

    userInputState = 'awaiting_delivery_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function(event) {
        event.preventDefault(); // Prevent default link behavior
        const index = parseInt($(this).data('index'), 10);
        const order = data.items[index];
        if (order) {
            $('#messagenew').text(`${index+1}`);
            $('#sendnew').click();  
        }
    });

    // Add click event listeners to response buttons
    $(document).on('click', '#yes-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("yes");
        $('#sendnew').click();
    });

    $(document).on('click', '#no-btn', function(event) {
        event.preventDefault();
        $('#messagenew').text("no");
        $('#sendnew').click();
    });
}

function formatDueOverdueBills(data) {
    let formattedText = `<div class="purchase-order-list" style="margin-top: 20px; font-size: 16px;">`;
    formattedText += `<b>The following bills are due/overdue for supplier payments:</b>`;
    formattedText += '<table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px;">';
    formattedText += '<thead><tr style="background-color: #f2f2f2;"><th style="width: 28px; padding: 4px;">#</th><th style="width: 150px; padding: 4px;">Supplier</th><th style="padding: 4px;">Bill No</th><th style="padding: 10px;">Bill Amount</th><th style="padding: 4px;">Due Date</th></tr></thead>';
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

    postBotReply(formattedText);
    setTimeout(() => {
    postBotReply(`
        <div style="margin-top: 15px; font-size: 16px;">
            Would you like to send an email to the customer about the holding of sales order requesting payment of outstanding balance from the customer?
            <br><br>
            <div class="response-buttons" style="margin-top: 8px; display: flex; gap: 10px;">
                <button id="send-btn" class="action-btn" type="button">Send Email</button>
                <button id="approval-btn" class="response-button" type="button">Action</button>
                <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                
            </div>
        </div>
    `);
    }, 500);  

    userInputState = 'awaiting_price_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function(event) {
        event.preventDefault(); // Prevent default link behavior
        const index = parseInt($(this).data('index'), 10);
        const order = data.priceitems[index];
        if (order) {
            $('#messagenew').text(`${index+1}`);
            $('#sendnew').click();  
        }
    });

    // Add click event listeners to response buttons
    $(document).on('click', '#send-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("send email");
        $('#sendnew').click();
    });

    $(document).on('click', '#no-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("no");
        $('#sendnew').click();
    });
}

function formatPurchasePriceIItems(data) {
    let formattedText = `<div class="purchase-order-list" style="margin-top: 20px; font-size: 16px;">`;
    formattedText += `<b> The list of items has a price variance compared to the previous purchase:</b>`;
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

    postBotReply(formattedText);
    setTimeout(() => {
    postBotReply(`
        <div style="margin-top: 15px; font-size: 16px;">
            Do you want to send an email to the supplier to request a price revision quotation?
            <br><br>
            <div class="response-buttons" style="margin-top: 8px; display: flex; gap: 10px;">
                <button id="send-btn" class="response-button" type="button">Send Email</button>
                <button id="approval-btn" class="response-button" type="button">Action</button>
                <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                
            </div>
        </div>
    `);
    }, 500);  

    userInputState = 'awaiting_secondprice_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function(event) {
        event.preventDefault(); // Prevent default link behavior
        const index = parseInt($(this).data('index'), 10);
        const order = data.priceitems[index];
        if (order) {
            $('#messagenew').text(`${index+1}`);
            $('#sendnew').click();  
        }
    });

    // Add click event listeners to response buttons
    $(document).on('click', '#send-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("send email");
        $('#sendnew').click();
    });

    $(document).on('click', '#no-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("no");
        $('#sendnew').click();
    });
}




function formatPurchaseleadsuppItems(data) {
    let formattedText = `<div class="purchase-order-list" style="margin-top: 5px; font-size: 16px;">`;
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

    postBotReply(formattedText);
 setTimeout(() => {
    postBotReply(`
        <div style="margin-top: 5px; font-size: 16px;">
            To send a request for quotation to a supplier, click on the supplier's name or reply with the corresponding number.
            <div class="response-buttons" style="margin-top: 10px;">
            <button id="approval-btn" class="response-button" type="button">Action</button>
                    <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    
                    </div>
        </div>
    `);
    }, 500);  

    userInputState = 'awaiting_suppplead_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function(event) {
        event.preventDefault(); // Prevent default link behavior
        const index = parseInt($(this).data('index'), 10);
        const order = data.suppleaditems[index];
        if (order) {
            $('#messagenew').text(`${index+1}`);
            $('#sendnew').click();  
        }
    });

    // Add click event listeners to response buttons
    $(document).on('click', '#yes-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("yes");
        $('#sendnew').click();
    });

    $(document).on('click', '#no-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("no");
        $('#sendnew').click();
    });
}

function formatPurchaseleadsuppItems2nd(data) {
    let formattedText = `<div class="purchase-order-list" style="margin-top: 5px; font-size: 16px;">`;
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

    postBotReply(formattedText);
 setTimeout(() => {
    postBotReply(`
        <div style="margin-top: 5px; font-size: 16px;">
            To send a request for quotation to a supplier, click on the supplier's name or reply with the corresponding number.
            <div class="response-buttons" style="margin-top: 10px;">
            <button id="approval-btn" class="response-button" type="button">Action</button>
                    <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    
                    </div>
        </div>
    `);
    }, 500);  

    userInputState = 'awaiting_supppleaded_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function(event) {
        event.preventDefault(); // Prevent default link behavior
        const index = parseInt($(this).data('index'), 10);
        const order = data.suppleaditems[index];
        if (order) {
            $('#messagenew').text(`${index+1}`);
            $('#sendnew').click();  
        }
    });

}


function formatPurchaseleadsupplierItemss(data) {
    let formattedText = `<div class="purchase-order-list" style="margin-top: 20px; font-size: 16px;">`;
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

    postBotReply(formattedText);
 setTimeout(() => {
    postBotReply(`
        <div style="margin-top: 5px; font-size: 16px;">
            To send a request for quotation to a supplier, click on the supplier's name or reply with the corresponding number.
            <div class="response-buttons" style="margin-top: 10px;">
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            </div>
        </div>
    `);
    }, 500);  

    userInputState = 'awaiting_suppplirlead_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function(event) {
        event.preventDefault(); // Prevent default link behavior
        const index = parseInt($(this).data('index'), 10);
        const order = data.suppleaditems[index];
        if (order) {
            $('#messagenew').text(`${index+1}`);
            $('#sendnew').click();  
        }
    });
}

function formatPurchaseleadsuppItemss(data) {
    let formattedText = `<div class="purchase-order-list" style="margin-top: 20px; font-size: 16px;">`;
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

    postBotReply(formattedText);
 setTimeout(() => {
    postBotReply(`
        <div style="margin-top: 5px; font-size: 16px;">
            To send a request for quotation to a supplier, click on the supplier's name or reply with the corresponding number.
            <div class="response-buttons" style="margin-top: 10px;">
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            </div>
        </div>
    `);
    }, 500);  

    userInputState = 'awaiting_supppllead_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function(event) {
        event.preventDefault(); // Prevent default link behavior
        const index = parseInt($(this).data('index'), 10);
        const order = data.suppleaditems[index];
        if (order) {
            $('#messagenew').text(`${index+1}`);
            $('#sendnew').click();  
        }
    });

    // Add click event listeners to response buttons
    $(document).on('click', '#yes-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("yes");
        $('#sendnew').click();
    });

    $(document).on('click', '#no-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("no");
        $('#sendnew').click();
    });
}

// -----------------------------------Graph insight--------------------------------------------------------
// let graphData = [];
let chartInstance; // Hold reference to chart to prevent duplicates

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
        postBotReply('Error fetching data. Please try again later.');
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
        postBotReply('Error fetching data. Please try again later.');
    }
}

function createDynamicChart(graphData) {
    console.log('data',graphData);
    // Remove existing canvas if present
    postBotReply('Hear is Purchase Order Trend Graph');
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
    document.getElementById('message-boardnew').appendChild(canvas);

    // Get the context for Chart.js
    const ctx = canvas.getContext('2d');

    // Prepare the datasets
    const orderData = graphData.filter(item => item.type === 'MonthWise Order Booking');
    const purchaseData = graphData.filter(item => item.type === 'MonthWise Purchase Booking');

    const labels = [...new Set([...orderData.map(item => item.vmonth), ...purchaseData.map(item => item.vmonth)])];
    
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
            label: 'Purchase Booking',
            data: labels.map(label => {
                const item = purchaseData.find(item => item.vmonth === label);
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

    postBotReply(`Do you want to see insight of Purchase Order Trend Graph? <br> 
        <div class="response-buttons" style="margin-top: 5px;">
            <button id="yes-btn" class="response-button" type="butten">Yes</button>
            <button id="no-btn" class="response-button" type="butten">No</button>
   
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            
        </div>`);

        userInputState = 'awaiting_graphinsigh_details';

         // Handle button clicks
    $(document).on('click', '#yes-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("yes");
        $('#sendnew').click();
    });

    $(document).on('click', '#no-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("no");
        $('#sendnew').click();
    });

    $(document).on('click', '#back-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("back");
        $('#sendnew').click();
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
        postBotReply('Error fetching data. Please try again later.');
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
    postBotReply('Here is the Purchase Order Trend Graph');
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
    document.getElementById('message-boardnew').appendChild(canvas);

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

    postBotReply(`Do you want to see insight of the Purchase Order Trend Graph? <br> 
        <div class="response-buttons" style="margin-top: 5px;">
            <button id="yes-btn" class="response-button" type="button">Yes</button>
            <button id="no-btn" class="response-button" type="button">No</button>
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
        </div>`);

    userInputState = 'awaiting_graphinsigh_details';

    // Handle button clicks
    $(document).on('click', '#yes-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("yes");
        $('#sendnew').click();
    });

    $(document).on('click', '#no-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("no");
        $('#sendnew').click();
    });

    $(document).on('click', '#back-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("back");
        $('#sendnew').click();
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
    postBotReply('Here is the Top 5 Suppliers by Total Value Graph');
    const existingCanvas = document.getElementById('myChart');
    if (existingCanvas) {
        existingCanvas.remove();
    }

    // Create a new canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'myChart';
    canvas.style.width = '100%';
    canvas.style.height = '300px'; // Adjust as per your layout requirements
    document.getElementById('message-boardnew').appendChild(canvas); // Append the canvas to the container

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

    postBotReply(`Do you want to see insight of the Top 5 Suppliers by Total Value Graph? <br> 
        <div class="response-buttons" style="margin-top: 5px;">
            <button id="yes-btn" class="response-button" type="button">Yes</button>
            <button id="no-btn" class="response-button" type="button">No</button>
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
        </div>`);

    userInputState = 'awaiting_graphinsigh_details';

    // Handle button clicks
    $(document).on('click', '#yes-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("yes");
        $('#sendnew').click();
    });

    $(document).on('click', '#no-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("no");
        $('#sendnew').click();
    });

    $(document).on('click', '#back-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("back");
        $('#sendnew').click();
    });
}
function generatePendingRFQsList() {
    // const rfqs = [
    //     { id: '0000023', supplier: 'ACHELIS (TANGANYIKA) LIMITED', item: 'Cold Cream' },
    //     { id: '0000024', supplier: 'ABC DISTRIBUTORS', item: 'Pet Food' }
    // ];
    // const rfqsitem = [
    //     { id: '1', supplier: 'ABC DISTRIBUTORS', rsptno: '15',rsptdate:'19-JUN-2024', grnval:'18,29,500'},
    //     { id: '2', supplier: 'ACHELIS (TANGANYIKA) LIMITED', rsptno: '25',rsptdate:'11-JUL-2024',grnval:'4,237,288.14' },
    //     { id: '3', supplier: 'ABC LIMITED', rsptno: '21',rsptdate:'13-JUL-2024', grnval:'35,000.00'},
    //     { id: '4', supplier: 'ABC DISTRIBUTORS', rsptno: '23',rsptdate:'17-JUL-2024', grnval:'45,762.71'}
    // ];

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
    <div class="purchase-order-list" style="font-family: Arial, sans-serif; color: #333; margin-bottom: 20px;">
        <b>Here is the list of Pending Bills:</b>
        <table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px; table-layout: fixed;">
            <thead>
                <tr style="background-color: #f2f2f2; text-align: left;">
                    <th style="padding: 8px; width: 35px;">Sr</th>
                    <th style="padding: 8px; width: 60px;">Invoice No.</th>
                    <th style="padding: 8px; width: 95px;">Invoice Date</th>
                    <th style="padding: 8px; width: 100px;">Customer Name</th>
                    <th style="padding: 8px; width: 100px;">Paid Amount</th>
                    <th style="padding: 8px; width: 100px;">Pending Since</th>
                </tr>
            </thead>
            <tbody style="background-color: #fff;">
`;

rfqsitem.forEach((invoice, index) => {
    formattedText += `
        <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px;">${invoice.id}</td>
            <td style="padding: 8px;">${invoice.invoiceNumber}</td>
            <td style="padding: 8px;">${invoice.invoiceDate}</td>
            <td style="padding: 8px;">
                <a href="#" class="order-item" data-index="${index}" style="color: #007bff; text-decoration: none;">
                    ${invoice.customerName}
                </a>
            </td>
            <td style="padding: 8px;">${invoice.paidAmount}</td>
            <td style="padding: 8px;">${invoice.pendingSince}</td>
        </tr>`;
});

formattedText += `
            </tbody>
        </table>
    </div>
`;


    // Post the formatted Sales Orders list
    postBotReply(formattedText);

    // Post additional instruction
    postBotReply(`
           Please select a customer name to send a reminder email for the outstanding quotation.
            <div class="response-buttons" style="margin-top: 10px;">
                    <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    </div>
    `);

    userInputState = 'awaiting_rfq_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function(event) {
        event.preventDefault(); // Prevent default link behavior
        console.log('Link clicked'); // Check if the click event is triggered
        const index = parseInt($(this).data('index'), 10);
        const order = rfqsitem[index];
        // const order = data[index];
        if (order) {
            $('#messagenew').text(`${index + 1}`);
            $('#sendnew').click();
        }
    });
}



function formatRFQItems(data) {
    const rfqsitem = [
        { id: '1', itemname: 'PROCESSOR (INTEL I5 8 GEN 2.4 GHZ)', qty: '100',price:'1200000'},
        { id: '2', itemname: 'COMPUTER CASE', qty: '25',price:'12500' },
        { id: '3', itemname: 'OPTICAL DRIVE (DVD RW AND SATA CAPABLE)', qty: '100',price:'120000'},
        { id: '4', itemname: 'MOTHERBOARD', qty: '30',price:'240000'},
        { id: '5', itemname: 'HARD DRIVE (500 GB)', qty: '23',price:'92000'},
        { id: '6', itemname: 'GRAPHIC CARD', qty: '5',price:'125000'},
        { id: '7', itemname: 'MOUSE (HP-USB X500 WIRED)', qty: '100',price:'40000'}
    ];
    let formattedText = `
        <div class="purchase-order-list" style="font-family: Arial, sans-serif; color: #333;">
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

    // Render the purchase items and ask about rescheduling the delivery date
    postBotReply(formattedText);
    
     setTimeout(() => {

    postBotReply(`Do to want to take action this Pending Bill?
        <div class="response-buttons" style="margin-top: 10px;">
                <button id="yes-btn" class="response-button" type="butten">Yes</button>
                <button id="no-btn" class="response-button" type="butten">No</button>
                <button id="back-btn" class="response-button" type="button">Back to Menu</button>
        </div>
    `);
    }, 1000);  

    userInputState = 'awaiting_rfqdetails_details';


    $(document).on('click', '#yes-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("yes");
        $('#sendnew').click();
    });

    $(document).on('click', '#no-btn', function(event) {
        event.preventDefault();
        $('#messagenew').text("no");
        $('#sendnew').click();
    });
}

function formatRFQItems1() {
    const rfqsitem = [
        
        { id: '1', itemname: 'SPEAKERS (LG AUDIO X8900)', qty: '23',price:'34500' },
        { id: '2', itemname: 'PROCESSOR (INTEL I5 8 GEN 2.4 GHZ)', qty: '100',price:'1200000'},
        { id: '3', itemname: 'UPS(LUMINOUS-360 WAAT 600 VA)', qty: '23',price:'34,500'},
        { id: '4', itemname: 'HARD DRIVE (500 GB)', qty: '23',price:'92000'},
        { id: '5', itemname: 'GRAPHIC CARD', qty: '5',price:'125000'},
        { id: '6', itemname: 'MOUSE (HP-USB X500 WIRED)', qty: '100',price:'40000'}
    ];
    let formattedText = `
        <div class="purchase-order-list" style="font-family: Arial, sans-serif; color: #333;">
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
   
    postBotReply(formattedText);
    
   setTimeout(() => {

    postBotReply(` Do to want to take action this Pending Bill?
        <div class="response-button" style="margin-top: 5px;">
                <button id="yes-btn" class="response-button" type="butten">Yes</button>
                <button id="no-btn" class="response-button" type="butten">No</button>
                <button id="back-btn" class="response-button" type="button">Back to Menu</button>
        </div>
    `);
    }, 1000); 



}

function formatPurchasestockItems(data) {
    let formattedText = `
        <div class="outstanding-customer-list" style="font-family: Arial, sans-serif; color: #333; max-width: 800px; margin: auto; border: 1px solid #ddd; border-radius: 5px; overflow: hidden;">
            <b style="display: block; text-align: center; padding: 10px; font-size: 16px;">The following customers have outstanding amounts:</b>
            <table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px; table-layout: fixed;"> <!-- Reduced font size here -->
                <thead>
                    <tr style="background-color: #f2f2f2; text-align: left;">
                        <th style="padding: 8px; width: 35px; font-size: 11px;">Sr.</th> <!-- Reduced padding -->
                        <th style="padding: 8px; width: 150px; font-size: 13px;">Customer Name</th> <!-- Reduced padding -->
                        <th style="padding: 8px; text-align: right; font-size: 11px;">Outstanding Amount</th> <!-- Reduced padding -->
                        <th style="padding: 8px; text-align: right; font-size: 13px;">Time Since</th> <!-- Reduced padding -->
                    </tr>
                </thead>
                <tbody style="background-color: #fff;">
    `;

    // Iterate over customers
    data.customers.forEach((customer, index) => {
        // Alternate row colors for better readability
        const rowColor = index % 2 === 0 ? '#ffffff' : '#f9f9f9'; 
        formattedText += `
            <tr style="border-bottom: 1px solid #ddd; background-color: ${rowColor}; transition: background-color 0.3s;">
                <td style="padding: 8px; font-size: 12px;">${index + 1}.</td> <!-- Reduced font size -->
                <td style="padding: 8px; font-size: 12px;">
                    <a href="#" class="customer-item" data-index="${index}" style="color: #007bff; text-decoration: none;">${customer.name}</a>
                </td>
                <td style="padding: 8px; text-align: right; font-size: 12px;">${customer.outstandingAmount.toLocaleString()}</td> <!-- Reduced font size -->
                <td style="padding: 8px; text-align: right; font-size: 12px;">${customer.timeSince}</td> <!-- Reduced font size -->
            </tr>`;
    });

    formattedText += `
                </tbody>
            </table>
        </div>
    `;

    // Render the purchase items and ask about rescheduling the delivery date
    postBotReply(formattedText);
     setTimeout(() => {
    postBotReply(` EVA Recommendations-
        <div class="brply a2" style="display: block; margin-top: 10px; font-size: 16px;">
            <div class="option1" data-number="1" style="padding: 10px; border: 1px solid #ccc; border-radius: 20px; margin-bottom: 5px;">
                <span style="font-weight: bold;">1.</span> Unsettled dues of 2,500,000 and decreased purchases,  place sales order on hold.
            </div>
           
        </div>
        <br>Would you like to take action on any of the above recommendations? Please click on the preferred recommendation or respond with the corresponding number
        <div class="response-buttons" style="margin-top: 10px;">
        <button id="approval-btn" class="response-button" type="button">Action</button>
                    <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                    
                    </div>
    `);
    }, 1000);  

    userInputState = 'awaiting_deliveryy_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function(event) {
        event.preventDefault(); // Prevent default link behavior
        const index = parseInt($(this).data('index'), 10);
        const order = data.items[index];
        if (order) {
            $('#messagenew').text(`${index+1}`);
            $('#sendnew').click();  
        }
    });
}


const tasks = [
    { taskcode: 1, name: 'Rohan Kumar' },
    { taskcode: 2, name: 'Anil Kumar' },
    { taskcode: 3, name: 'Aman Rawat' },
];

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
        postBotReply(`Do you want to take action on this pending bill? <br> 
        <div class="response-buttons" style="margin-top: 5px;">
            <button id="yes-btn" class="response-button" type="butten">Yes</button>
            <button id="no-btn" class="response-button" type="butten">No</button>
   
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            
        </div>`);
        }, 5000);  

             // Add click event listeners to response buttons
    $(document).on('click', '#yes-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("yes");
        $('#sendnew').click();
    });

    $(document).on('click', '#no-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("no");
        $('#sendnew').click();
    });

        userInputState = 'awaiting_bill_details';
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
        const emailSubject = data.subject||'Request to Process Purchase Bills for GRN 15' ;
        const emailBody = data.response;

        // Post the email response
        postBotNewReply(emailBody);
        console.log(emailBody);

        // Add Review and Send buttons after the bot response
        $('#message-boardnew').append(`
            <div class="action-bill">
                <button class="actionbill-btn" data-action="review">Send</button>
                <button class="actionbill-btn" data-action="send">Next</button>
                <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                
            </div>
        `);

        // Update form fields with the subject and message
        $s('P0_MAIL_SUBJECT', emailSubject);
        $s('P0_MAILBODY', emailBody);

        userInputState = 'awaiting_apibill_details';
        return emailBody; // Return the generated email template
    } catch (error) {
        throw new Error(`Error generating email template: ${error.message}`);
    }
}

// Use event delegation to handle button clicks
$('#message-boardnew').on('click', '.actionbill-btn', function(event) {
    event.preventDefault(); // Prevent the default action
    const action = $(this).data('action');

    if (action === 'review') {
        console.log('Review button clicked');
        sendbillEmail();
        // Implement review functionality here
    } else if (action === 'send') {
        console.log('Send3 button clicked');
        // Implement send functionality here
        postBotReply(`Action has been taken on the GRN No. 15. <br>Do you want to take action on the other pending bills? <br> 
        <div class="response-buttons" style="margin-top: 10px;">
            <button id="yes-btn" class="response-button" type="butten">Yes</button>
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            
        </div>`);
        userInputState = 'awaiting_rembill_details';

        // Add click event listeners to response buttons
    $(document).on('click', '#yes-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("yes");
        $('#sendnew').click();
    });

    $(document).on('click', '#no-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("no");
        $('#sendnew').click();
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
        const emailSubject = data.subject||'Request to Process Purchase Bills for GRN 15' ;
        const emailBody = data.response;

        // Post the email response
        postBotNewReply(emailBody);
        console.log(emailBody);

        // Add Review and Send buttons after the bot response
        $('#message-boardnew').append(`
            <div class="action-bill">
                <button class="actiondue-btn" data-action="review">Send</button>
                <button class="actiondue-btn" data-action="send">Next</button>
                <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                
            </div>
        `);

        // Update form fields with the subject and message
        $s('P0_MAIL_SUBJECT', emailSubject);
        $s('P0_MAILBODY', emailBody);

        userInputState = 'awaiting_apibill_details';
        return emailBody; // Return the generated email template
    } catch (error) {
        throw new Error(`Error generating email template: ${error.message}`);
    }
}

// Use event delegation to handle button clicks
$('#message-boardnew').on('click', '.actiondue-btn', function(event) {
    event.preventDefault(); // Prevent the default action
    const action = $(this).data('action');

    if (action === 'review') {
        console.log('Review button clicked');
        senddueEmail();
        // Implement review functionality here
    } else if (action === 'send') {
        console.log('Send3 button clicked');
        // Implement send functionality here
        postBotReply(`Action has been taken on the bill No. 10. <br>Do you want to take action on the other due/overdue bills? <br> 
        <div class="response-buttons" style="margin-top: 10px;">
            <button id="yes-btn" class="response-button" type="butten">Yes</button>
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            
        </div>`);
        userInputState = 'awaiting_duebill_details';

        // Add click event listeners to response buttons
    $(document).on('click', '#yes-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("yes");
        $('#sendnew').click();
    });

    $(document).on('click', '#no-btn', function(event) {
        event.preventDefault();  // Prevent default action
        $('#messagenew').text("no");
        $('#sendnew').click();
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


function generateOptions(tasks)  {
    let formattedText = `
        <div class="purchase-order-list" style="font-family: Arial, sans-serif; color: #333;">
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

    // Render the purchase items and ask about rescheduling the delivery date
    postBotReply(formattedText);
    
    userInputState = 'awaiting_username_details';

    // Add click event listeners to order items
    $(document).on('click', '.order-item', function(event) {
        event.preventDefault(); // Prevent default link behavior
        const index = parseInt($(this).data('index'), 10);
        const order = data.items[index];
        if (order) {
            $('#messagenew').text(`${index+1}`);
            $('#sendnew').click();  
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
        reply.forEach(str => postBotReply(str));
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
            success: function(data) {
                console.log("Data fetched successfully:", data);
                fetchedData = data;

                var matchedPageNumber = null;

                for (var i = 0; i < data.items.length; i++) {
                    var item = data.items[i];
                    // if (item.object_name.toLowerCase() === command.toLowerCase()) {
                    if (item.object_name && item.object_name.toLowerCase() === command.toLowerCase()){
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
                        postBotReply("No matching or related page found for the command: " + command);
                    }
                }
            },
            error: function(xhr, status, error) {
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

        relatedObjectNames.forEach(function(objectName) {
            var listItem = $("<li>").text(objectName);
            listItem.on("click", function() {
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
                "Close": function() {
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
        postBotReply("Page not found for object name: " + objectName);
    }

 

     function openPage(pageNumber, moduleCode, args, manuCode) {
        console.log("Opening page number:", pageNumber);
        console.log("Opening manuCode:", manuCode);
        const appId = $v('pFlowId'); // Retrieves the Application ID
        const sessionId = $v('pInstance'); // Retrieves the Session ID
        var redirectURL;
        if (manuCode && manuCode.length !== 2) {
            redirectURL = `f?p=${appId}:` + pageNumber + `:${sessionId}` ;
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


	function $scrollDown() {
		const $container = $("#message-boardnew");
		const $maxHeight = $container.height();
		const $scrollHeight = $container[0].scrollHeight;
		if ($scrollHeight > $maxHeight) $container.scrollTop($scrollHeight);
	}
// });

function createDynamicBarChart(graphData) {
    console.log('data', graphData);
    // Remove existing canvas if present
    postBotReply('Here is the Purchase Order Trend Bar Graph');
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
    document.getElementById('message-boardnew').appendChild(canvas);

    // Get the context for Chart.js
    const ctx = canvas.getContext('2d');

    // Prepare the datasets
    const orderData = graphData.filter(item => item.type === 'MonthWise Order Booking');
    const purchaseData = graphData.filter(item => item.type === 'MonthWise Purchase Booking');

    const labels = [...new Set([...orderData.map(item => item.vmonth), ...purchaseData.map(item => item.vmonth)])];

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
                const item = purchaseData.find(item => item.vmonth === label);
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




async function fetchAndCreateProductGroupChart() {
    const graphUrl = `http://192.168.5.190:8080/ords/wsts/account_dtl/Product_Groupwise_sales?global_comp_code=01`;

    try {
        const graphResponse = await fetch(graphUrl);
        if (!graphResponse.ok) {
            throw new Error('Network response was not ok ' + graphResponse.statusText);
        }
        const graphJson = await graphResponse.json();
        const graphData = graphJson.items;

        // Call function to create the pie chart
        createProductGroupPieChart(graphData);
    } catch (error) {
        console.error('Fetch error: ', error);
        postBotReply('Error fetching data. Please try again later.');
    }
}
function createProductGroupPieChart(graphData) {
    console.log('Full graphData structure:', graphData); // Log the full structure for inspection

    // Remove existing canvas if present
    postBotReply('Here is the Product Group-wise Sales Pie Chart');
    const existingCanvas = document.getElementById('myChart');
    if (existingCanvas) {
        existingCanvas.remove();
    }

    // Create a new canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'myChart';
    canvas.style.width = '100%';
    canvas.style.height = '400px'; // Increased height for better visibility
    document.getElementById('message-boardnew').appendChild(canvas); // Append the canvas to the container

    // Get the context for Chart.js
    const ctx = canvas.getContext('2d');

    // Extract labels and values from the API data
    const labels = graphData.map(item => item.prod_group); // Use 'prod_group' for labels
    const values = graphData.map(item => item.val); // Use 'val' for values

    // Define pastel color palette
    const pastelColors = [
        'rgba(255, 182, 193, 0.6)', // Light Pink
        'rgba(173, 216, 230, 0.6)', // Light Blue
        'rgba(144, 238, 144, 0.6)', // Light Green
        'rgba(255, 255, 224, 0.6)', // Light Yellow
        'rgba(255, 160, 122, 0.6)', // Light Salmon
        'rgba(221, 160, 221, 0.6)', // Plum
        'rgba(255, 218, 185, 0.6)', // Light Peach
        'rgba(240, 230, 140, 0.6)', // Pale Goldenrod
        'rgba(255, 228, 225, 0.6)', // Misty Rose
        'rgba(255, 240, 245, 0.6)'  // Lavender Blush
    ];

    // Assign colors for each product group, including a default pastel color for zero values
    const backgroundColors = values.map((value, index) => {
        return value > 0 ? pastelColors[index % pastelColors.length] : 'rgba(200, 200, 200, 0.6)'; // Use gray for zero values
    });

    // Destroy the previous chart instance if it exists to avoid conflicts
    if (window.chartInstance) {
        window.chartInstance.destroy();
    }

    // Create a new chart instance with 3D effect
    window.chartInstance = new Chart(ctx, {
        type: 'doughnut',  // Doughnut chart for 3D effect
        data: {
            labels: labels,
            datasets: [{
                label: 'Sales by Product Group',
                data: values,
                backgroundColor: backgroundColors,
                borderColor: 'white',  // Border color for slices
                borderWidth: 2,
                hoverOffset: 10, // Makes the slice "pop" when hovered
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,  // Ensure chart adjusts to container
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2);
                        }
                    }
                },
                legend: {
                    display: false // Disable default legend
                }
            },
            cutout: '50%', // Adjust cutout for doughnut effect
            animation: {
                animateScale: true,
                animateRotate: true,
            },
            layout: {
                padding: {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20
                }
            }
        }
    });

    // Create a custom legend
    createCustomLegend(labels);

    // Check if the chart was created successfully
    if (window.chartInstance) {
        console.log("Chart created successfully.");
    } else {
        console.error("Failed to create the chart.");
    }
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

    document.getElementById('message-boardnew').appendChild(legendContainer); // Append the custom legend to the container
}


const pendingSalesOrders = {
    orders: [
        { id: '0130', date: '25-11-2021', customer: 'ACHIELIS TANGANYIKA LIMITED', sentBy: 'Supervisor', qty: '20 units' },
        { id: '0135', date: '26-11-2021', customer: 'ABC LIMITED', sentBy: 'Supervisor', qty: '15 units' },
        { id: '0145', date: '01-12-2021', customer: 'KINYARA SUGARS LIMITED', sentBy: 'Supervisor', qty: '50 units' }
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
            postBotReply(`
                Do you want to take action on this pending bill? <br> 
                <div class="response-buttons" style="margin-top: 5px;">
                    <!-- <button id="yes-btn" class="response-button" type="button">Yes</button> -->
                    <!-- <button id="no-btn" class="response-button" type="button">No</button> -->
                    <button id="back-btn" class="response-button" type="button">Back to Menu</button>
                </div>
            `);
        }, 5000);


        
        userInputState = 'awaiting_bill_details';

        return emailBody; // Return the generated email template

    } catch (error) {
        throw new Error(`Error generating email template: ${error.message}`);
    }
}

function generatePendingQuotationsList() {
    const rfqsitem = [
        { 
            sr : '01',
            quotNo: '0127', 
            quotDate: '15-Sep-2024', 
            customerName: 'Shreekhand LTD.', 
            amount: '3,000,000.00', 
            days:Math.floor((new Date() - new Date('15-Sep-2024')) / (1000 * 60 * 60 * 24)), 
            reason: 'fund issues' 
        },
        { 
            sr : '02',
            quotNo: '0116', 
            quotDate: '18-Sep-2024', 
            customerName: 'XYZ LIMITED', 
            amount: '3,500,000.00', 
            days:Math.floor((new Date() - new Date('18-Sep-2024')) / (1000 * 60 * 60 * 24)), 
            reason: 'postponed' 
        },
        { 
            sr : '03',
            quotNo: '0119', 
            quotDate: '20-Sep-2024', 
            customerName: 'DYNABRADE LTD', 
            amount: '1,500,000.00', 
            days:Math.floor((new Date() - new Date('20-Sep-2024')) / (1000 * 60 * 60 * 24)), 
            reason: 'Diverted' 
        }
    ];

    let formattedText = `
        <div class="quotation-list" style="font-family: Arial, sans-serif; color: #333; margin-bottom: 20px;">
            <b> List of Pending Quotations:</b>
            <table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px; table-layout: fixed;">
                <thead>
                    <tr style="background-color: #f2f2f2; text-align: left;">
                        <th style="padding: 8px; width: 35px;">Sr</th>
                        <th style="padding: 8px; width: 60px;">Quot No.</th>
                        <th style="padding: 8px; width: 95px;">Quot Date</th>
                        <th style="padding: 8px; width: 110px;">Customer Name</th>
                        <th style="padding: 8px; width: 120px;">Amount</th>
                        <th style="padding: 8px; width: 80px;">Days</th>
                        <th style="padding: 8px; width: 150px;">Reason</th>
                    </tr>
                </thead>
                <tbody style="background-color: #fff;">
    `;

    rfqsitem.forEach((quote) => {
        formattedText += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 8px;">${quote.sr}</td>
                <td style="padding: 8px;">${quote.quotNo}</td>
                <td style="padding: 8px;">${quote.quotDate}</td>
                <td style="padding: 8px;">
                    <a href="#" class="quote-item" data-quotno="${quote.quotNo}" style="color: #007bff; text-decoration: none;">
                        ${quote.customerName}
                    </a>
                </td>
                <td style="padding: 8px;">${quote.amount}</td>
                <td style="padding: 8px;">${quote.days}</td>
                <td style="padding: 8px;">${quote.reason}</td>
            </tr>`;
    });

    formattedText += `
                </tbody>
            </table>
            <b>Total Amount: 8,000,000.00</b>
        </div>
    `;

    // Post the formatted quotation list
    postBotReply(formattedText);

    // Post additional instruction
    postBotReply(`
       Would you like to take action on any of the following? Please select a customer name to follow up on the quotation
        <div class="response-buttons" style="margin-top: 10px;">
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
        </div>
    `);

    userInputState = 'awaiting_quotation_details';

    // Add click event listeners to quotation items
    $(document).on('click', '.quote-item', function(event) {
        event.preventDefault(); // Prevent default link behavior
        console.log('Quotation link clicked'); // Verify event trigger
        const quotNo = $(this).data('quotno');
        $('#messagenew').text(`Quotation No: ${quotNo}`);
        $('#sendnew').click();
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
    const messageBoard = document.querySelector('#message-boardnew');
    messageBoard.appendChild(container);

    // Post bot reply after 20 seconds
    setTimeout(() => {
        postBotReply(`Call has been made to SHREEKHAND LIMITED regarding conversion of quotation to an order.  
        <div class="response-buttons" style="margin-top: 10px;">
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
        </div>`);
    }, 20000);
}


// Define the data object separately
const invoiceData = {
    invoices: [
        {   
            sr:'01',
            orderNo: '0115',
            orderDate: '11-Sep-2024',
            customer: 'China town LTD.',
            deliveryNo: '0119',
            deliveryDate: '15-Sep-2024',
            amount: '2,000,000.00'
        },
        {
            sr:'02',
            orderNo: '0118',
            orderDate: '14-Sep-2024',
            customer: 'Casements Africa Ltd',
            deliveryNo: '0126',
            deliveryDate: '16-Sep-2024',
            amount: '3,500,000.00'
        },
        {
            sr:'03',
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

function formatInvoiceData(invoiceData) {
    let formattedText = `
        <div class="invoice-list" style="font-family: Arial, sans-serif; color: #333; margin-bottom: 20px;">
            <b>Pending Deliveries for Invoices:</b>
            <table class="styled-table" style="width: 100%; border-collapse: collapse; margin-top: 10px; table-layout: fixed;">
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

    // Loop through each invoice and add a row
    invoiceData.invoices.forEach((invoice, index) => {
        formattedText += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 8px;">${index + 1}.</td>
                <td style="padding: 8px;">${invoice.orderNo}</td>
                <td style="padding: 8px;">${invoice.orderDate}</td>
                <td style="padding: 8px;">
                    <a href='#' class="invoice-item" data-index="${index}" style="color: #007bff; text-decoration: none;">
                        ${invoice.customer}
                    </a>
                </td>
                <td style="padding: 8px; text-align: right;">${invoice.amount}</td>
            </tr>`;
    });

    // Add total amount row
    formattedText += `
            <tr style="border-top: 2px solid #333; font-weight: bold;">
                <td colspan="6" style="padding: 8px; text-align: left;">Total: 7,000,000</td>
            </tr>
        </tbody>
    </table>
</div>
    `;

    // Post the formatted Invoice list
    postBotReply(formattedText);

    // Post additional instruction
    postBotReply(`
        Would you like to take action on any of the above items? Click on the customer name or reply with the corresponding number.
        <div class="response-buttons" style="margin-top: 10px;">
            <button id="back-btn" class="response-button" type="button">Back to Menu</button>
        </div>
    `);

    userInputState = 'awaiting_invoice_details';

    // Add click event listener to customer names
    $(document).on('click', '.invoice-item', function (event) {
        event.preventDefault(); // Prevent default link behavior
        const index = parseInt($(this).data('index'), 10);
        const invoice = invoiceData.invoices[index];

        if (invoice) {
            promptEmailConfirmation(invoice.customer, invoice.amount);
        }
    });

    // Add click event listener for Back button
    $(document).on('click', '#back-btn', function (event) {
        event.preventDefault(); // Prevent default action
        $('#messagenew').text("back to menu");
        $('#sendnew').click();
    });
}

// Function to prompt for email confirmation
function promptEmailConfirmation(customer, amount) {
    postBotReply(`
        <div style="margin-top: 15px; font-size: 16px;">
            Would you like to send an email regarding the pending deliveries for <b>${customer}</b> with an amount of <b>${amount}</b>?
            <div class="response-buttons" style="margin-top: 8px; display: flex; gap: 10px;">
                <button id="send-email-btn" class="action-btn" type="button">Send Email</button>
                <button id="approval-btn" class="response-button" type="button">Action</button>
                <button id="back-btn" class="response-button" type="button">Back to Menu</button>
            </div>
        </div>
    `);

    // Attach event listener to Send Email button
    $(document).on('click', '#send-email-btn', function (event) {
        event.preventDefault(); // Prevent default action
        const prompt = `Make deliveries of the invoices made for customer ${customer} with a total amount of ${amount}.`;
        postBotNewReply(`<b>Customer Name</b>:China Town Ltd<br><b>Email id</b>: ctown@gmail.com<br> <b>Subject</b>:Request to make the delivery note<br><br>Here is the draft email to China Town Ltd to make a delivery note `);
        fetchApipricevarianceEmail("Compose an email to China Town Limited informing them that an invoice of 2,000,000 has been generated on 11-Sep-2024 and requesting them to create a delivery note as soon as possible.'Regards, Vaibhav.");
    });
}