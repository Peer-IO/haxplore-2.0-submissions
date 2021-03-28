# HaXplore 2.0 - Submission Report Format

This is the official code repository for _Knightmode_ . This _Web Application_ was developed during HaXplore 2.0,
the online hackathon conducted by Codefest, the annual departmental fest of Computer Science department, IIT BHU Varanasi.

## KnightMode

* Purushottam Tiwari
* Madhava Dasari
* Lakshya Singh

## Peer IO

### Overview

There has been a surge in online classes, this increase in online teaching is aided by covid-19 pandemic and also partly by growing ed-tech culture.  Due to this most of the teaching has shifted to online mode, giving students a fairly less chance of interacting with their peers and share their knowledge. Students get very low chances for reviewing on the concepts of their fellow learners or get reviews from them. Increase in the amount of online learning, has also put pressure on mentors, teachers as they also have to suffer very high screen times checking/reviewing the works of their students. Now as their are often huge number of tasks and assignments which demand providing feedback to studens, teachers often end up giving approximate or mostly incorrect review without going through them properly as it has become a huge trouble for them to stare the screens going through the works of huge number of students. 
### How Does Peer IO help with this?
Peer IO helps both students and teachers to review and learn in collaborative way i.e. students get an opprtunity to comment on each other's work. So this opens up huge chances of peer learning among students, and reduces the burden of reviewing a huge piles of works from  teacher's shoulders. Peer IO provides following functionalities:
- Ability to create new assignments and courses for teachers.
- Anonymous Feedback and Review amongst students.(This eliminates discrepancy in reviewing)
- Students get avg. review marks with normalization(This motivates for a fair and honest review)
- Tracking of interaction among students for teachers.

With above functinalities teachers can review the works of students, and provide their own feedback and decide the scores of students according to both self and peer discretion. For students Peer IO helps by providing them and opportunity of collaborative learning even in online classes. So Peer IO provides benefits for both teachers and students, by providing a relative learning atmosphere.

### Technology used

- NuxtJS
  SSR Server built on top of VueJS to make API calls and handle component based javascript.
- Axios
  Library for making API Calls
- Firebase
  To Provide Social Media Authentication
- Vuetify
  Frontend Framework for components
- Express
  Backend API server framework
- MongoDB
  Databse used

### Screenshots/Demo Video

Drive Link for [demo video](https://drive.google.com/file/d/15PzEau8MiqYrKerO-qQP221lq4zbpLBr/view?usp=sharing).

### Usage

- Prerequisities
  - NodeJS 12+
  - Firebase App
  - Yarn Package Manager

- Install node dependencies
  ```bash
  yarn
  ```

- Running in development mode
  ```bash
  yarn dev
  ```

- Running in Production mode
  ```bash
  yarn build
  yarn start
  ```

### Tracks used

none

### AWS Services Used

Our backend is deployed on *AWS ec2 cloud instance*, through Heroku.
