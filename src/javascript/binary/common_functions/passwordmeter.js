var text = require('../base/localize').text;

/* ************************************************************
Created: 20060120
Author:  Steve Moitozo <god at zilla dot us> -- geekwisdom.com
Description: This is a quick and dirty password quality meter
     written in JavaScript so that the password does
     not pass over the network.
License: MIT License (see below)
Modified: 20060620 - added MIT License
Modified: 20061111 - corrected regex for letters and numbers
                     Thanks to Zack Smith -- zacksmithdesign.com
---------------------------------------------------------------
Copyright (c) 2006 Steve Moitozo <god at zilla dot us>
Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:
   The above copyright notice and this permission notice shall
be included in all copies or substantial portions of the
Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
OR OTHER DEALINGS IN THE SOFTWARE.
---------------------------------------------------------------
Password Strength Factors and Weightings
password length:
level 0 (3 point): less than 4 characters
level 1 (6 points): between 5 and 7 characters
level 2 (12 points): between 8 and 15 characters
level 3 (18 points): 16 or more characters
letters:
level 0 (0 points): no letters
level 1 (5 points): all letters are lower case
level 2 (7 points): letters are mixed case
numbers:
level 0 (0 points): no numbers exist
level 1 (5 points): one number exists
level 1 (7 points): 3 or more numbers exists
special characters:
level 0 (0 points): no special characters
level 1 (5 points): one special character exists
level 2 (10 points): more than one special character exists
combinatons:
level 0 (1 points): letters and numbers exist
level 1 (1 points): mixed case letters
level 1 (2 points): letters, numbers and special characters
          exist
level 1 (2 points): mixed case letters, numbers and special
          characters exist
NOTE: Because I suck at regex the code might need work
NOTE: Instead of putting out all the logging information,
    the score, and the verdict it would be nicer to stretch
    a graphic as a method of presenting a visual strength
    guage.
************************************************************ */
function testPassword(passwd) {
    var intScore   = 0;
    var strVerdict = 'weak';

    // PASSWORD LENGTH
    // length 4 or less
    if (passwd.length < 5) {
        intScore += 3;
    } else if (passwd.length > 4 && passwd.length < 8) {
        // length between 5 and 7
        intScore += 6;
    } else if (passwd.length > 7 && passwd.length < 16) {
        // length between 8 and 15
        intScore += 12;
    } else if (passwd.length > 15) {
        // length 16 or more
        intScore += 18;
    }

    // LETTERS (Not exactly implemented as dictacted above because of my limited understanding of Regex)
    // [verified] at least one lower case letter
    if (passwd.match(/[a-z]/)) {
        intScore += 1;
    }
    // [verified] at least one upper case letter
    if (passwd.match(/[A-Z]/)) {
        intScore += 5;
    }

    // NUMBERS
    // [verified] at least one number
    if (passwd.match(/\d+/)) {
        intScore += 5;
    }
    // [verified] at least three numbers
    if (passwd.match(/(.*[0-9].*[0-9].*[0-9])/)) {
        intScore += 5;
    }

    // SPECIAL CHAR
    // [verified] at least one special character
    if (passwd.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)) {
        intScore += 5;
    }
    // [verified] at least two special characters
    if (passwd.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)) {
        intScore += 5;
    }

    // COMBOS
    // [verified] both upper and lower case
    if (passwd.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
        intScore += 2;
    }
    // [verified] both letters and numbers
    if (passwd.match(/([a-zA-Z])/) && passwd.match(/([0-9])/)) {
        intScore += 2;
    }
    // [verified] letters, numbers, and special characters
    if (passwd.match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/)) {
        intScore += 2;
    }

    if (intScore < 10) {
        strVerdict = text.localize('Password is weak');
    } else if (intScore > 9 && intScore < 20) {
        strVerdict = text.localize('Password is moderate');
    } else if (intScore > 19) {
        strVerdict = text.localize('Password is strong');
    } else {
        strVerdict = text.localize('Password is very strong');
    }

    var array = [intScore, strVerdict];
    return array;
}

module.exports = {
    testPassword: testPassword,
};
