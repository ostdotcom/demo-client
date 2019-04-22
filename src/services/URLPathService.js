const URLPathService = {
  getBaseURL: function(tokenId, urlID) {
    return `https://demo-mappy.stagingost.com/demo/api/${tokenId}/${urlID}/`;
  }
};

export default URLPathService;
