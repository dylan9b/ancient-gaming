# AncientGaming

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Assumptions

During this test, some assumptions were taken:

## The users, comments and other related objects were not deemed necessry to include as they were not part of the task. Task included CRUD operations on posts only.
## Only the basic entities of the posts were included (id, body and title). Comments and other neted objects were omitted.
## Since the API does not update data within the database, some assumptions were made in this case:
### Searching is done through the API against an id or title which is present in the server. Hence new data, which is never persisted, will never be fetched.
### The search variable 'q' does not seem consistent. I tested with a partial title ('sed') and got incorrect results. The same result was produced on the online graphql environment provided in the test and locally.
### Pagination works well with the data retreived from the API. Upon creating new entries, the new data is appended to the state, which increases the response of the API result from say 15 (as per request) to 17 (if two new items are added). A solution which I thought of but is not feasible is to update the API result by reducing the limit per page, but this will not work well on subsequent pages.
#### For the scope of this task, the new items are added only to the first page but the items per page do not reflect the actual number of items in list. This is not normally the case as data is persisted in the db and a small chunk is retrieved.
