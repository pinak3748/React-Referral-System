
# Referral-Invite-System

It's an react web application for referral based registration system.
A user can sign up only if he has some one referral code.

It's is using MongoDB in backend and in your data based 
you shouls atleast have one user by default so that it can
 login into the dashboard and share invite code. We are creating the random 
 unique by encoding MongoDB index into base64 string and decoding in backend and checking if their is
 an user by that index if their is then we let him create new user.




## Installation

Install Backend with 

```bash
  cd Backend
  npm install
```
*If MongoDB throw any error 
try to changing the mongoDB url in ./config/db file


Install Frontend with 

```bash
  cd Frontend
  npm install
```
## Features

- Form Validation
- Referral links


