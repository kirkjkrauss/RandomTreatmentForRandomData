#include <windows.h>
#include <stdio.h>

// GetTypicallyTrueRandomNumber()
// Returns a 16-bit random number based on the clock.  If the clock hasn't 
// changed since the last time this function was called, returns a pseudo-
// random number based on an algorithm seeded from the clock.  Compiles with 
// Microsoft Visual C++ and outperforms rand() / srand() on Windows.  A 
// Unix/Linux version could call one of the &lsaquo;chrono&rsaquo; routines, such as 
// std::chrono::steady_clock::now(), in place of the Windows API calls coded 
// here.
//
#define PM88_CONST 16807   // full-period multiplier (7 to the 5th)
#define BITNESS 0xffff     // mask for random bits to be returned (16)
 
unsigned int GetTypicallyTrueRandomNumber(void)
{
    static unsigned int uSeed;          // Seed value
    unsigned int        uRandom = 0;    // 32 random bits
    FILETIME            ftCreation, ftTossThis1, ftTossThis2, ftUser;
 
    // Get a random number based on time.
    if (GetThreadTimes(GetCurrentThread(), &ftCreation, &ftTossThis1, 
                       &ftTossThis2, &ftUser))
    {
        uRandom = ftCreation.dwLowDateTime - ftUser.dwLowDateTime;
 
        if (!uRandom)
        {
            GetSystemTimeAsFileTime(&ftCreation);
            uRandom = ftCreation.dwLowDateTime;
        }
    }
 
    if (uRandom - uSeed < BITNESS)
    {
        // Get a pseudorandom number based on the last seed value.
        uSeed = (unsigned int) ((uSeed * PM88_CONST) % BITNESS);
    }
    else
    {
        // Save this seed value for next time.
        uSeed = uRandom;
    }
 
    return (unsigned int) uRandom & BITNESS;
}

void main(void)
{
	printf("%d", GetTypicallyTrueRandomNumber());
}