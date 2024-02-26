# Description

This is the Coaching Conundrum challenge

# Requirements

1. Coaches can add slots of availability to their calendars. These slots are always 2 hours long and each slot can be booked by exactly 1 student.
2. Coaches can view their own upcoming slots.
3. Students can book upcoming, available slots for any coach.
4. When a slot is booked, both the student and coach can view each other’s phone-number.
5. After they complete a call with a student, coaches will record the student’s satisfaction (an integer 1-5) and write some free-form notes.
6. Coaches should be able to review their past scores and notes for all of their calls.

For the sake of testing, we should be able to easily switch between being a coach vs. a student.

To save time, you don’t need to worry about a user-creation flow nor authentication, just make sure to create some users in your database for testing!

# To get started locally

You will need to have nvm, docker desktop, and a database client of your choosing intalled on your machine

Clone this repo

```bash
    $ git clone https://github.com/aidenzegil/coaching-conundrum.git
```

cd into rep

```bash
    $ cd coaching-conundrum
```

Make sure you're on the right node version

```bash
    $ nvm use
```

install node modules for the api

```bash
    $ cd api
    $ npm install
```

Start your node instance

```bash
    $ npm run start:dev
```

Make sure you have docker desktop open on your machine and run

```bash
    $ docker compose up -d
```

Ensure prisma is up and ready

```bash
    $ npm run db:migrate
    $ npm run db:seed
```

You can find database info in api/.env to view user seed data.

Now lets spin up the fe

```bash
    $ cd ..
    $ cd web
```

Install node modules

```bash
    $ npm install
```

Launch locally

```bash
    $ npm run dev
```

# Demoing

You should see a very bland screen right off the bat, that's not very fun so lets grab a user id from the seeded data and plug it in to the url as a query param.

```
http://localhost:3000/?userId=[YourUserIdHere]
```

if this user id belongs to a COACH type user, you will be able to see a way to add a time block, if not you wont see much.

find a COACH type user in the seed data and put their id in the url as a query param. Then make a few test slots!

After that's done, throw a user of the STUDENT type's id up there and book a time slot, the coaches phone number should show up imediately and the time slot should move to a booked section.

When you switch back to the coach user, you should see the student's phone number. If the start date/time < the current date/time, the coach will be able to leave notes/ratings.

# Boilerplate code to brush past

Some code is boilerplate code that has been written in the past to quickly set up fullstack applications. You can ignore the following if you happen to notice it.

- elegant network error handling
- genericized network methods
- generally genericized errors
- middleware

# Limitations

- The coach can make time slots in the past, I left this in for testing purposes
- User creation is non-existent
- User auth is non-existent
- Block CRUD auth is non-existent
- Orchestration layer for managing relationship between User and Block is done at rest layer (not ideal)
- Differentiation between Coach User and Student User is minimal
- Styling is minimal, but functionality seems to be spot on.
- User provider pattern is minimal; however, the block provider is a good example of patterns I typically like to employ.
- Error handling in Block and User provider was skipped
- Organization of components and code cleanlyness fell off at the component layer as I was out of time. Typically I would make several common components, as well as a compound component with a data layer.
