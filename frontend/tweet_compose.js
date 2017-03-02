const APIUtil = require('./api_util.js');

class TweetCompose {
  constructor($el) {
    this.$el = $el;
    this.$inputs = $(":input");
    this.$strong = $("<strong>", {class: "chars-left"});
    this.listen();
    this.maxChars();
  }

  maxChars() {
    this.$el.append(this.$strong);

    this.$el.find("textarea").on("input", (event) => {
      $(".chars-left").text(`${140 - event.currentTarget.value.length} characters left!`);
    });
  }

  listen() {
    this.$el.on("submit", (event) => {
      event.preventDefault();
      this.submit();
    });
  }

  submit() {
    let data = this.$el.serializeJSON();
    this.disableForm();

    APIUtil.createTweet(data, this.handleSuccess.bind(this));
  }

  handleSuccess(tweet) {
    this.clearInput();
    this.enableForm();

    let $li = $("<li>");
    console.log(tweet);
    $li.append(`<span>${tweet.content} -- </span>`);
    $li.append(`<a href="/users/${tweet.user.id}">${tweet.user.username}</a>`);
    $li.append(`<span> -- ${tweet.created_at} </span>`);

    tweet.mentions.forEach(mention => {
      let $ul = $("<ul>");
      $ul.append(`<li><a href="/users/${mention.user.id}">${mention.user.username}</a></li>`);
      $li.append($ul);
    });

    $(this.$el.data("tweets-ul")).append($li);
  }

  clearInput() {
    $("label > :input").val('');
  }

  disableForm(){
    this.$inputs.prop("disabled", true);
  }

  enableForm(){
    this.$inputs.prop("disabled", false);
  }
}

module.exports = TweetCompose;
