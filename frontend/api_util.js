const APIUtil = {
  followUser: id => {
    return $.ajax({
      url: `/users/${id}/follow`,
      method: 'POST',
      dataType: "json",
    });
  },

  unfollowUser: id => {
    return $.ajax({
      url: `/users/${id}/follow`,
      method: 'DELETE',
      dataType: "json",
    });
  },

  searchUsers: (queryVal, callback) => {
    return $.ajax({
      url: '/users/search',
      method: 'GET',
      data: queryVal,
      dataType: 'json',
      success: (data) => callback(data)
    });
  },

  createTweet: (data, callback) => {
    return $.ajax({
      url: '/tweets',
      method: 'POST',
      data: data,
      dataType: 'json',
      success: (tweet) => callback(tweet)
    });
  }
};

module.exports = APIUtil;
