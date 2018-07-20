/* feedreader.js
 *
 * This is the spec file thay contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS feeds definitions,
     * the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This test make sure that the allFeeds variable has been defined
         * and that it is not empty (array length!=0).
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in the allFeeds object
         * and make sure that it has a URL defined and not empty
         */
         it('all feeds urls are defined', function(){
            for(feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            }
        });

        /* This test loops through each feed in the allFeeds object
         * and make sure that it has a name defined and not empty
         */
         it('all feeds names are defined', function(){
            for(feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            }
        });

    });


    /* This suite is about the menu element */
    describe('The menu', function() {

        /* This test ensures the menu element is hidden by default.
         * it checks the position and ensure that body has the "munu-hidden"
         * class
        */
         it('menu is hidden by default', function(){
             let menu = document.querySelector('.slide-menu');
             let x = menu.getBoundingClientRect().left;
             expect(x).toBeLessThan(0);
             expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* This test ensures ensures the menu changes visibility when the menu
          * icon is clicked. It test left position and the css class.
          */
         it('menu shows and hides', function(){

             let burger = $('.menu-icon-link');//document.querySelector('.menu-icon-link');
             burger.click();
             expect($('body').hasClass('menu-hidden')).toBe(false);
             //now wait for css animation (0.2 sec) to complete, then test x position
             setTimeout(300, function(){
               let menu = document.querySelector('.slide-menu');
               let x = menu.getBoundingClientRect().left;
               expect(x).toBe(0);
             });

             burger.click();
             expect($('body').hasClass('menu-hidden')).toBe(true);
             //now wait for css animation (0.2 sec) to complete, then test x position
             setTimeout(300, function(){
               menu = document.querySelector('.slide-menu');
               x = menu.getBoundingClientRect().left;
               expect(x).toBeLessThan(0);
             });

         });

    });

    /* Initial Entries suite*/
    describe('Initial Entries', function() {
        /* loadFeed() is asynchronous so this test suite require beforeEach and
         * asynchronous done().
         */
        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });

        });
        /* This test ensures that the loadFeed function is called and completes
         * its work. That there is at least a single .entry element within the
         * feed container.
         */
         it('loadFeed completes its work', function(done){
             expect($('.feed').find('.entry').length).toBeGreaterThan(0);
             done();
         });
    });

    /* New Feed Selection suite*/
    describe('New Feed Selection', function() {
        /* loadFeed() is asynchronous so this test suite require beforeEach and
         * asynchronous done().
         */
        beforeEach(function(done){

            loadFeed(0, function(){
                start_html = $('.feed').html();
                loadFeed(1, function(){
                    done();
                });
            });

        });

        /* This test ensures that a new feed is loaded by the loadFeed function
         * testing that the content actually changes.
         */
         it('should change content when a new feed is loaded', function(done){
             expect($('.feed').html()).not.toBe(start_html);
             done();
         });

    });
}());
