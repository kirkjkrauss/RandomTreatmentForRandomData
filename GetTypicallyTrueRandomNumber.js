// GetTypicallyTrueRandomNumber()
// Returns an 8-bit random number based on the performance.now() timer.  In
// case the timer hasn't changed significantly since this function was last 
// called, returns a pseudorandom number based on a simple Park-Miller 
// algorithm seeded from the timer.  This code can be extended to return a 12-
// or 16-bit random number, but the randomness of the results will depend on 
// the timing resolution of performance.now(), which involves such factors as 
// browser security settings and overall timer resolution constraints.  
//
const g_iPM88_Const = 16807; // Full-period multiplier (7 to the 5th)
const g_iBitness = 0xff;     // Can add f's to get 12- or 16-bit output
var g_iSeed = 0;             // Stores last computed random number
 
function GetTypicallyTrueRandomNumber()
{
    // Get a random integer.
    let iRandom = performance.now();

    // Has the timer turned over, w/rt its least significant bits, since we 
    // were last here?
    if (iRandom - g_iSeed < g_iBitness)
    {
        // Get a pseudorandom number based on the last seed value.
        iRandom = g_iSeed = (g_iSeed * g_iPM88_Const) % g_iBitness;
    }
    else
    {
        // Save this seed value for next time.
        g_iSeed = iRandom;
    }
 
    return iRandom & g_iBitness;
}