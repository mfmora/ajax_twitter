const APIUtil = require('./api_util.js');
const FollowToggle = require('./follow_toggle.js');

class UsersSearch {
  constructor($el) {
    this.$el = $el;
    this.$input = $el.find("input");
    this.$results = $el.find("ul");
    this.handleInput();
  }

  handleInput() {
    this.$input.on("input", (event)=> {
      let queryString = {query: event.currentTarget.value};
      APIUtil.searchUsers(queryString, this.renderResults.bind(this));
    });
  }

  renderResults(users) {
    this.$results.children().remove();
    users.forEach(user => {
      let $li = $("<li>");
      let $button = $("<button>", {class: "follow-toggle"});
      $button.data("user-id", user.id);
      $button.data("follow-state", user.followed);
      new FollowToggle($button);
      $li.append($(`<a href='/users/${user.id}'>${user.username}</a>`));
      $li.append($button);
      this.$results.append($li);
    });
  }
}

module.exports = UsersSearch;
