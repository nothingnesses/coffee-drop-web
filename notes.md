A brand new start up, CoffeeDrop, have spotted a gap in the market to build an Android and IOS mobile app which shows their existing 16 national coffee shops, listing them as "locations" for recycling Nespresso coffee pods, for which the client will recieve "cashback" - money for each pod.

In addition to the app, they have commissioned a responsive single page website to advertise the service. This has been designed, and now needs building. The client has specified a specific stack of technologies that they would like to see on their site, which are described in the specification below.

### shall
1. The website shall be a single page site.
2. The website shall incorporate the content on the designs or in the repository.
3. The developer shall take as little or as long time as the applicant desires to develop the site.
4. The developer shall not be expected to spend any more than 4 hours on the project.
5. The website shall be fully responsive and tested on a number of mobile and desktop devices.
6. The website shall allow users to view a map with the CoffeeDrop locations marked upon it.

### should
1. The design files should be converted as accurately as possible.
2. The developer should use Bootstrap 4/5 or Tailwind and either jQuery or Vue.js.
3. These locations should be marked on the map using co-ordinates found in the following API call: http://coffeedrop.staging2.image-plus.co.uk/api/locations.
4. The map should update if a new location is added.

### could
1. The developer could use any images he/she likes found on any sites on the internet - as this is a programming challenge only there is no need to worry about copyright (as the site will never be published).
2. The developer could use Wordpress to allow content to be updated.
3. The map could take into account any additional information returned by the API call (but this is optional).

### What we are looking for
* Completion of a website that fulfills the specification
* Use of best practices for the appropriate programming language (Html, Sass, Wordpress, Vue, JQuery)
* Appropriate consumption and error handling of provided API
* Attractive styling matching the designs provided accurately
* Clean, well-commented code

### Technical Details
* The simple API can be consumed by using the url http://coffeedrop.staging2.image-plus.co.uk
* There is no authentication for the API
* There is rate limiting of no more than 90 requests per 10s on the API
* There is inherited rate limiting of one request per second on the "postcode" request as this will call the free postcode.io API behind

### Submission Instructions
* Please email your contact at Image+ with a link to a github repository containing your submission, as well as be prepared to discuss the technical apsects of the challenge at your interview.
* Uploading the site for us to view on some hosting would be appreciated but not required as long as all the assets required for us to test the site locally are included
