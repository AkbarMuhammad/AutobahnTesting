# autobahn-testing

This is a website automation test for Autobahn Sign Up page. This automation is using cypress for the framework.
https://autobahn.security/signup

![](header.png)

# How to Run
1. Open a Terminal
2. Clone this repository
3. Execute cypress with command : `./node_modules/.bin/cypress open`
4. This will open Cypress window
5. Click on `autobahn_signup_page.cy`
6. See the result

# Test Cases
This automation consist of 4 scenarios :
1. Autobahn Sign Up Page : Verify Elements are Present.
    To verify basic element of the pages are present such as : main attributes of the page, login option, term and privacy, as well as make sure the users are unable to signup when the fields are empty.
2. Happy Path.
    To execute basic E2E functionality of the pages. It tested with 2 different account and checked the password eye lash perfectly worked.
3. Test Email Field.
    To verify the format of the email must be valid.
4. Test Password Field.
    To verify those 6 criteria of the password are functioning, as well as make sure user has to submit a correct password.
    - at least 8 character
    - one uppercase letter
    - one lowercase letter
    - one number
    - one special character
    - no empty space
    
## Contributors
Akbar Muhammad
https://www.linkedin.com/in/akbar-muhammad-58b825155/
