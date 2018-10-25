// GetBigTypicallyTrueRandomNumber.js
// Invokes an 8-bit random number generator at intervals to piece together
// a bigger random number.
// Copyright 2018 Zettalocity Software.

// This value represents the number of random bits to be generated.
var g_iRandomBits = 64;

// This string contains the concatenated 8-bit results of multiple calls to 
// GetTypicallyTrueRandomNumber().
var g_strRandomNumberInHex;

// This is the number of actual random bits in the above value.
// It serves as a placeholder as they're being accumulated.
var g_iRandomBitsInString;

// These next values represent a one second interval for timing calls to the 
// 8-bit routine.  You can tweak the timing by adjusting the first value here.
//
var g_iIntervalMs = 1000;
var g_objInterval;

// This event is set up at load time and fires once a big random number is 
// all in place.
var g_eventDone;

// Accessor for DOM elements.
//
var $ = function(id)
{
	return document.getElementById(id);
}

// Calls the random number generator at intervals.
//
function AccumlateRandomBits()
{
	if (g_iRandomBitsInString < g_iRandomBits)
	{
		g_iRandomBitsInString += 8;
		g_strRandomNumberInHex += GetTypicallyTrueRandomNumber().toString(16);
	}
	else
	{
		// Shut down the calls to the random number generator routine.
		clearInterval(g_objInterval);
		document.body.dispatchEvent(g_eventDone);		
	}
	
	return;
}

// Arranges calls to the random number generator at intervals.
//
function GetBigTypicallyTrueRandomNumber()
{
	// Reset the global values that represent the collected result as well as 
	// the placeholder maintained during the run.
	g_strRandomNumberInHex = "";
	g_iRandomBitsInString = 0;

	// Let 'em know we're going to take our time.
	$("randomnumber").innerHTML = " &mdash; Running &mdash; ";

	// Start up calls to the random number generator routine.
	g_objInterval = setInterval(AccumlateRandomBits, g_iIntervalMs);
	return;
}

// Displays a random number having the number of bits specified by the global 
// value that's set at TOF.
//
function DisplayRandomNumber()
{
	// Display the big random number.
	let iRandomNumber = parseInt(g_strRandomNumberInHex, 16);
	$("randomnumber").firstChild.nodeValue = iRandomNumber + " (0x" + g_strRandomNumberInHex +")";
	return;
}

// Resets the DOM elements that may have been updated via the above code.
//
function ClearForm()
{
	$("randomnumber").firstChild.nodeValue = "";
	return;
}

// Entry point.
//
window.onload = function()
{
	ClearForm();
	$("getrandomnumber").onclick = GetBigTypicallyTrueRandomNumber;
	g_eventDone = new CustomEvent("GotBigRandomNumber");
	document.body.addEventListener("GotBigRandomNumber", DisplayRandomNumber);	
	return;
}