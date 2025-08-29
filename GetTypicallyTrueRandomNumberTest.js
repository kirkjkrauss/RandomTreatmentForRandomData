// GetTypicallyTrueRandomNumberTest.js
// This is a small performance comparison test for a random number generator 
// routine vs. the built-in Math.random().
// Copyright 2018 Zettalocity Software.

// These values accumulate runtime performance metrics for comparison.
var tt_cumulative;
var tp_cumulative;

// This next value represents an interval set during the run.
//
var nInterval = 0;

// Accessor for DOM elements.
//
var $ = function(id)
{
	return document.getElementById(id);
}

// This routine generates a 16-bit random number using the built-in 
// Math.random() functionality.
//
function GetPseudoRandomNumber()
{
	return Math.floor(0xffff * Math.random());
}

// This function generates random numbers via each routine that's being 
// compared.  It waits briefly between calls to get true random number 
// behavior.
//
function GetTimings()
{
	let tt_delta = performance.now();
	let ttr = GetTypicallyTrueRandomNumber();
	tt_cumulative += (performance.now() - tt_delta);
	console.log(ttr);

	let tp_delta = performance.now();
	let tpr = GetPseudoRandomNumber();
	tp_cumulative += (performance.now() - tp_delta);
	return;
}

// Resets the DOM elements that may have been updated via the above code.
//
function ClearForm()
{
	//$("compare_form").reset();
	$("time1").firstChild.nodeValue = "";
	$("time2").firstChild.nodeValue = "";
	return;
}

// Ends the test run at the press of a button.
//
function StopTestRunner()
{
	// Shut down the calls to the random number generator routines.
	clearInterval(nInterval);
	$("starttestrun").disabled = false;
	$("stoptestrun").disabled = true;

	// Show the timing results.
	$("time1").firstChild.nodeValue = "GetTypicallyTrueRandomNumber: " + tt_cumulative.toFixed(2) + " ms";
	$("time2").firstChild.nodeValue = "GetPseudoRandomNumber: " + tp_cumulative.toFixed(2) + " ms";	
	return;
}

// Displays a "Running" status message.
// Kicks off the set of tests defined by the global values set at TOF.
//
function StartTestRunner()
{
	ClearForm();
	$("starttestrun").disabled = true;
	$("stoptestrun").disabled = false;
	$("time1").innerHTML = " &nbsp; &mdash; Running &mdash; &nbsp; ";

	// Reset global values that store performance comparison results.
	tt_cumulative = tp_cumulative = 0;

	// Accumulate the timings.  Kick off the random number generator routines 
	// with delays, to randomize the launch times some.
	nInterval = setInterval(GetTimings, 2000);
	return;
}

// Displays a random number.
//
function GetRandomNumber()
{
	$("randomnumber").innerHTML = 
	    "GetTypicallyTrueRandomNumber() returned: 0x" + 
		    GetTypicallyTrueRandomNumber().toString(16);
	return;
}

// Entry point.
//
window.onload = function()
{
	$("getrandomnumber").onclick = GetRandomNumber;
	$("starttestrun").onclick = StartTestRunner;
	$("stoptestrun").onclick = StopTestRunner;
	$("stoptestrun").disabled = true;
	return;
}