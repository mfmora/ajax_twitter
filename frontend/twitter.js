const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');
const TweetCompose = require('./tweet_compose.js');

$(function() {
  new FollowToggle($("button.follow-toggle"));
  new UsersSearch($("nav.users-search"));
  new TweetCompose($("form.tweet-compose"));
});
