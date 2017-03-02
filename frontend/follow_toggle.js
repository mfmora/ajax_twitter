const APIUtil = require("./api_util.js");

class FollowToggle {
  constructor($el) {
    this.$el = $el;
    this.userId = $el.data("user-id");
    this.followState = $el.data("follow-state");
    this.render();
    this.handleClick();
  }

  render() {
    if (this.followState === 'followed') {
      this.$el.text('Unfollow!');
    } else {
      this.$el.text('Follow!');
    }
  }

  handleClick() {
    this.$el.on("click", () => {
      this.disableButton();
      let methodName;

      if (this.followState === "followed") {
        methodName = APIUtil.unfollowUser;
      } else {
        methodName = APIUtil.followUser;
      }

      methodName(this.userId)
        .then(() => this.followSuccess());
    });
  }

  followSuccess() {
    if (this.followState === "followed") {
      this.followState = "unfollowed";
    } else {
      this.followState = "followed";
    }
    this.render();
    this.enableButton();
  }

  disableButton() {
    this.$el.prop("disabled", true);
  }

  enableButton() {
    this.$el.prop("disabled", false);
  }
}

module.exports = FollowToggle;
