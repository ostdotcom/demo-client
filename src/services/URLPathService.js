const URLPathService = {
  getBaseURL: function(tokenId, urlID) {
    return `/demo/api/${tokenId}/${urlID}/`;
  }
};

export default URLPathService;
